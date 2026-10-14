"use strict";

// Phase 2 only: inspect a fixed sample, save raw evidence outside production, never import.
const fs = require("node:fs/promises");
const path = require("node:path");
const catalog = require("../data/catalog.js");
const { createClient } = require("./phase-2/http-client.cjs");
const { assessResponse, assessPhoto } = require("./phase-2/assess-records.cjs");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "evaluation", "phase-2");
const sampleIds = ["clownfish", "seahorse", "engraulis-ringens", "gamitana", "paco", "betta", "salmon-del-atlantico", "trout"];
const client = createClient({ cacheDirectory: path.join(output, "cache"), offline: process.argv.includes("--offline"), userAgent: process.env.ATLAS_SOURCE_USER_AGENT });
const urlFor = (base, params) => `${base}?${new URLSearchParams(params)}`;

async function probeServices() {
  await fs.mkdir(output, { recursive: true });
  const metadata = await client.get("https://api.checklistbank.org/dataset/COL2025", "col-metadata");
  const colKey = metadata.ok ? metadata.data?.key : null;
  const backbone = await client.get("https://api.gbif.org/v1/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c", "gbif-dataset-metadata");
  const fishbase = await client.get(urlFor("https://fishbase.ropensci.org/species", { Genus: "Engraulis", Species: "ringens", limit: "1" }), "fishbase-legacy-probe");
  const probe = {};
  probe.colMetadata = metadata;
  probe.gbifMetadata = backbone;
  probe.fishbase = fishbase;
  probe.gbif = await client.get(urlFor("https://api.gbif.org/v1/species/match", { name: "Engraulis ringens", kingdom: "Animalia", phylum: "Chordata", rank: "SPECIES", strict: "true", verbose: "true" }), "gbif");
  if (colKey) probe.col = await client.get(urlFor(`https://api.checklistbank.org/dataset/${colKey}/match/nameusage`, { scientificName: "Engraulis ringens", kingdom: "Animalia", phylum: "Chordata", rank: "species" }), "col");
  probe.worms = await client.get(urlFor("https://www.marinespecies.org/rest/AphiaRecordsByName/Engraulis%20ringens", { like: "false", marine_only: "false" }), "worms");
  probe.commons = await client.get(urlFor("https://commons.wikimedia.org/w/api.php", { action: "query", format: "json", formatversion: "2", generator: "search", gsrsearch: '"Colossoma macropomum" filetype:bitmap', gsrnamespace: "6", gsrlimit: "3", prop: "imageinfo", iiprop: "url|extmetadata|sha1", maxlag: "5" }), "commons");
  await fs.writeFile(path.join(output, "probe.json"), JSON.stringify(probe, null, 2) + "\n", "utf8");
  console.log(JSON.stringify({ colKey, responses: Object.fromEntries(Object.entries(probe).map(([key, value]) => [key, { status: value.status, ok: value.ok, error: value.error }])), networkRequests: client.networkRequests }));
}

async function evaluateSample() {
  await fs.mkdir(output, { recursive: true });
  const startedAt = new Date().toISOString();
  const colMetadata = await client.get("https://api.checklistbank.org/dataset/COL2025", "col-metadata");
  const gbifMetadata = await client.get("https://api.gbif.org/v1/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c", "gbif-dataset-metadata");
  const colKey = colMetadata.ok ? colMetadata.data?.key : null;
  const records = [];
  for (const id of sampleIds) {
    const fish = catalog.species.find(item => item.id === id);
    if (!fish) throw new Error(`La muestra incluye un ID inexistente: ${id}`);
    const gbifRaw = await client.get(urlFor("https://api.gbif.org/v1/species/match", { name: fish.scientificName, kingdom: "Animalia", phylum: "Chordata", rank: "SPECIES", strict: "true", verbose: "true" }), "gbif");
    let parents = null;
    if (gbifRaw.ok && Number.isInteger(gbifRaw.data?.usageKey)) parents = await client.get(`https://api.gbif.org/v1/species/${gbifRaw.data.usageKey}/parents`, "gbif-parents");
    const gbif = assessResponse("gbif", gbifRaw, fish.scientificName, gbifMetadata.data?.key || null, parents?.ok && Array.isArray(parents.data) ? parents.data : []);
    gbif.lineageEvidence = parents ? { fetchedAt: parents.fetchedAt, url: parents.url, cacheFile: parents.cacheFile, ok: parents.ok } : null;
    let col;
    if (colKey) {
      const raw = await client.get(urlFor(`https://api.checklistbank.org/dataset/${colKey}/match/nameusage`, { scientificName: fish.scientificName, kingdom: "Animalia", phylum: "Chordata", rank: "species" }), "col");
      col = assessResponse("col", raw, fish.scientificName, colKey);
    } else col = { source: "col", status: "blocked", error: colMetadata.error, candidates: [], importApproved: false };
    const wormsRaw = await client.get(urlFor(`https://www.marinespecies.org/rest/AphiaRecordsByName/${encodeURIComponent(fish.scientificName)}`, { like: "false", marine_only: "false" }), "worms");
    const worms = assessResponse("worms", wormsRaw, fish.scientificName);
    const matches = [col, gbif, worms];
    const conflicts = [];
    for (const field of ["name", "family", "order"]) {
      const values = matches.flatMap(match => match.candidates.slice(0, 1).filter(candidate => candidate[field]).map(candidate => ({ source: match.source, value: candidate[field] })));
      if (new Set(values.map(item => item.value.toLowerCase())).size > 1) conflicts.push({ field, values });
    }
    const record = { internalId: fish.id, scientificName: fish.scientificName, existingEnvironments: fish.environments, matches, conflicts, reviewRequired: true, importApproved: false };
    records.push(record);
    console.log(JSON.stringify({ species: fish.scientificName, results: matches.map(match => `${match.source}:${match.status}`), conflicts: conflicts.length }));
  }
  // A tiny language-coverage sample; absence here is not a claim about the whole source.
  const vernacularSample = [];
  for (const record of records.filter(item => ["clownfish", "engraulis-ringens", "gamitana"].includes(item.internalId))) {
    const gbifId = record.matches.find(match => match.source === "gbif")?.candidates[0]?.externalId;
    const wormsId = record.matches.find(match => match.source === "worms")?.candidates[0]?.externalId;
    if (gbifId) {
      const raw = await client.get(urlFor(`https://api.gbif.org/v1/species/${gbifId}/vernacularNames`, { limit: "100" }), "gbif-vernaculars");
      const names = raw.ok ? (raw.data?.results || []).filter(name => /^(spa|es)(?:-|$)/i.test(name.language || "")) : [];
      vernacularSample.push({ internalId: record.internalId, source: "gbif", externalId: gbifId, spanishNames: names, totalReturned: raw.data?.results?.length || 0, moreResults: raw.data?.endOfRecords === false, fetchedAt: raw.fetchedAt, url: raw.url, cacheFile: raw.cacheFile, ok: raw.ok, error: raw.error });
    }
    if (wormsId) {
      const raw = await client.get(`https://www.marinespecies.org/rest/AphiaVernacularsByAphiaID/${wormsId}`, "worms-vernaculars");
      vernacularSample.push({ internalId: record.internalId, source: "worms", externalId: wormsId, spanishNames: raw.ok && Array.isArray(raw.data) ? raw.data.filter(name => /^(spa|es|spanish)$/i.test(name.language_code || name.language || "")) : [], totalReturned: Array.isArray(raw.data) ? raw.data.length : 0, fetchedAt: raw.fetchedAt, url: raw.url, cacheFile: raw.cacheFile, ok: raw.ok, error: raw.error });
    }
  }
  // Six searches allow five retained candidates plus the unresolved pre-revision paco photo.
  const photoIds = ["gamitana", "paco", "pez-cebra", "dicentrarchus-labrax", "lucio", "perca-europea"];
  const photoResults = [];
  for (const id of photoIds) {
    const fish = catalog.species.find(item => item.id === id);
    if (!fish || fish.photo !== null) throw new Error(`La prueba de imágenes requiere una especie sin fotografía: ${id}`);
    const raw = await client.get(urlFor("https://commons.wikimedia.org/w/api.php", { action: "query", format: "json", formatversion: "2", generator: "search", gsrsearch: `"${fish.scientificName}" filetype:bitmap`, gsrnamespace: "6", gsrlimit: "3", prop: "imageinfo", iiprop: "url|extmetadata|sha1", maxlag: "5" }), "commons");
    const candidates = raw.ok ? (raw.data?.query?.pages || []).map(page => assessPhoto(page, fish, raw)) : [];
    const searches = [{ url: raw.url, fetchedAt: raw.fetchedAt, cacheFile: raw.cacheFile, ok: raw.ok, error: raw.error }];
    if (raw.ok && !candidates.some(candidate => candidate.status === "metadata-candidate-needs-manual-review")) {
      const fallback = await client.get(urlFor("https://commons.wikimedia.org/w/api.php", { action: "query", format: "json", formatversion: "2", generator: "search", gsrsearch: `intitle:"${fish.scientificName}" filetype:bitmap`, gsrnamespace: "6", gsrlimit: "3", prop: "imageinfo", iiprop: "url|extmetadata|sha1", maxlag: "5" }), "commons-targeted");
      searches.push({ url: fallback.url, fetchedAt: fallback.fetchedAt, cacheFile: fallback.cacheFile, ok: fallback.ok, error: fallback.error });
      if (fallback.ok) {
        for (const page of fallback.data?.query?.pages || []) {
          if (!candidates.some(candidate => candidate.externalId === String(page.pageid))) candidates.push(assessPhoto(page, fish, fallback));
        }
      }
    }
    photoResults.push({ internalId: id, scientificName: fish.scientificName, ok: raw.ok, error: raw.error, candidates, searches, fetchedAt: raw.fetchedAt, requestUrl: raw.url, cacheFile: raw.cacheFile });
    console.log(JSON.stringify({ photoSearch: fish.scientificName, candidates: candidates.map(candidate => candidate.status) }));
  }
  const result = {
    phase: 2, startedAt, finishedAt: new Date().toISOString(), localDate: new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()),
    productionModified: false, speciesSampleSize: records.length, records, vernacularSample, photoResults,
    datasets: {
      col: { key: colKey, version: colMetadata.data?.version, issued: colMetadata.data?.issued, doi: colMetadata.data?.doi, licenseAsReturned: colMetadata.data?.license, citationAsReturned: colMetadata.data?.citation, fetchedAt: colMetadata.fetchedAt, cacheFile: colMetadata.cacheFile },
      gbif: { key: gbifMetadata.data?.key, title: gbifMetadata.data?.title, licenseAsReturned: gbifMetadata.data?.license, doi: gbifMetadata.data?.doi, citationAsReturned: gbifMetadata.data?.citation, fetchedAt: gbifMetadata.fetchedAt, cacheFile: gbifMetadata.cacheFile },
      worms: { key: "WoRMS-live", version: "Los registros conservan modifiedAt y la cita del proveedor; no se descargó una versión completa." }
    },
    execution: { offline: process.argv.includes("--offline"), networkRequests: client.networkRequests, events: client.events, minimumIntervalMs: 2000, timeoutMs: 12000, maxAttempts: 3, maximumRequests: 90 }
  };
  const filename = `run-${result.finishedAt.replace(/[:.]/g, "-")}.json`;
  await fs.writeFile(path.join(output, filename), JSON.stringify(result, null, 2) + "\n", "utf8");
  console.log(JSON.stringify({ saved: path.relative(root, path.join(output, filename)), species: records.length, networkRequests: client.networkRequests, errors: records.flatMap(record => record.matches.filter(match => match.status === "blocked")).length }));
}

if (require.main === module) (process.argv.includes("--probe") ? probeServices() : evaluateSample()).catch(error => { console.error(error.message); process.exitCode = 1; });
module.exports = { sampleIds };
