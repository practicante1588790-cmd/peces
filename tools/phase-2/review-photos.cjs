"use strict";

// Inspect five declared candidates as small local previews, without changing website assets.
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { setTimeout: delay } = require("node:timers/promises");
const { createClient } = require("./http-client.cjs");

const root = path.resolve(__dirname, "../..");
const output = path.join(root, "evaluation/phase-2");
const selections = {
  gamitana: "File:Colossoma macropomum - Flickr - Dick Culbert.jpg",
  "pez-cebra": "File:Danio rerio.JPG",
  "dicentrarchus-labrax": "File:Dicentrarchus labrax LoroParqueTenerife seabass IMG 4959.JPG",
  lucio: "File:Esox Lucius.JPG",
  "perca-europea": "File:Perche commune perca fluviatilis Alfort.jpg"
};

async function main() {
  const runFiles = (await fs.readdir(output)).filter(name => /^run-.*\.json$/.test(name)).sort();
  const run = JSON.parse(await fs.readFile(path.join(output, runFiles.at(-1)), "utf8"));
  const candidates = Object.entries(selections).map(([id, title]) => {
    const candidate = run.photoResults.find(item => item.internalId === id)?.candidates.find(item => item.pageTitle === title);
    if (!candidate || candidate.status !== "metadata-candidate-needs-manual-review") throw new Error(`Candidata no elegible: ${title}`);
    return candidate;
  });
  const client = createClient({ cacheDirectory: path.join(output, "cache"), offline: process.argv.includes("--offline"), userAgent: process.env.ATLAS_SOURCE_USER_AGENT });
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ action: "query", format: "json", formatversion: "2", titles: candidates.map(item => item.pageTitle).join("|"), prop: "imageinfo", iiprop: "url|mime|sha1", iiurlwidth: "500", maxlag: "5" });
  const raw = await client.get(url, "commons-preview-metadata");
  const directory = path.join(output, "previews");
  await fs.mkdir(directory, { recursive: true });
  const previousReviews = [];
  for (const name of (await fs.readdir(output)).filter(name => /^photo-review-.*\.json$/.test(name))) previousReviews.push(JSON.parse(await fs.readFile(path.join(output, name), "utf8")));
  for (const candidate of candidates) {
    const info = raw.ok ? raw.data?.query?.pages.find(page => page.title === candidate.pageTitle)?.imageinfo?.[0] : null;
    candidate.preview = { url: info?.thumburl || null, downloaded: false, error: raw.error || null };
    const previous = previousReviews.flatMap(review => review.candidates).find(item => item.externalId === candidate.externalId && item.preview?.downloaded && item.preview.url === info?.thumburl);
    if (previous) {
      const bytes = await fs.readFile(path.join(root, previous.preview.path));
      if (crypto.createHash("sha256").update(bytes).digest("hex") === previous.preview.sha256) candidate.preview = { ...previous.preview, reused: true };
    }
    if (info?.thumburl && !candidate.preview.downloaded && !process.argv.includes("--offline")) {
      const imageUrl = new URL(info.thumburl);
      if (!["upload.wikimedia.org", "thumb.wikimedia.org"].includes(imageUrl.hostname) || imageUrl.protocol !== "https:" || !imageUrl.pathname.startsWith("/wikipedia/commons/thumb/")) throw new Error("La vista previa no procede del mecanismo de miniaturas documentado de Commons.");
      await delay(2000);
      try {
        if (!/(?:https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(process.env.ATLAS_SOURCE_USER_AGENT || "")) throw new Error("Configura ATLAS_SOURCE_USER_AGENT con contacto real antes de descargar una miniatura nueva; no se inventa una dirección.");
        const response = await fetch(imageUrl, { redirect: "error", signal: AbortSignal.timeout(12000), headers: { "User-Agent": process.env.ATLAS_SOURCE_USER_AGENT || "AtlasAzulSourceEvaluation/1.0 (local manual research; five previews only)" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}; vista previa pendiente, sin reintento.`);
        if (!/^image\/(?:jpeg|png)$/.test(response.headers.get("content-type") || "")) throw new Error("Vista previa no JPEG/PNG.");
        const bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.length > 1048576) throw new Error("Vista previa excede el tamaño permitido de 1 MiB.");
        const filename = `${candidate.internalId}.jpg`;
        await fs.writeFile(path.join(directory, filename), bytes, { flag: "wx" });
        candidate.preview = { url: imageUrl.href, downloaded: true, path: `evaluation/phase-2/previews/${filename}`, bytes: bytes.length, sha256: crypto.createHash("sha256").update(bytes).digest("hex"), fetchedAt: new Date().toISOString() };
      } catch (error) {
        candidate.preview.error = error.message;
      }
    }
    // No species identification is certified by image search or this download.
    candidate.manualReview = { status: "pending", sourcePageChecked: false, visualReview: "pending", identificationConfidence: "declared-by-source", useApproved: false };
    console.log(JSON.stringify({ id: candidate.internalId, preview: candidate.preview.downloaded, error: candidate.preview.error }));
  }
  const filename = `photo-review-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
  await fs.writeFile(path.join(output, filename), JSON.stringify({ sourceRun: runFiles.at(-1), candidates, downloadedOriginalImages: 0, productionModified: false, metadataNetworkRequests: client.networkRequests }, null, 2) + "\n", "utf8");
  console.log(filename);
}

if (require.main === module) main().catch(error => { console.error(error.message); process.exitCode = 1; });
