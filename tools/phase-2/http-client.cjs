"use strict";

// Read-only, bounded research client. Never writes production files or downloads images.
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { setTimeout: delay } = require("node:timers/promises");

const allowedRoutes = new Map([
  ["api.gbif.org", /^\/v1\/(?:species\/(?:match|\d+(?:\/(?:vernacularNames|parents))?)|dataset\/[a-f0-9-]+)$/],
  ["api.checklistbank.org", /^\/dataset\/(?:COL2025|\d+)(?:\/match\/nameusage|\/taxon\/[^/]+(?:\/classification)?)?$/],
  ["www.marinespecies.org", /^\/rest\/(?:AphiaRecordsByName\/[^/]+|AphiaRecordByAphiaID\/\d+|AphiaClassificationByAphiaID\/\d+|AphiaVernacularsByAphiaID\/\d+|AphiaExternalIDByAphiaID\/\d+|AphiaSourcesByAphiaID\/\d+)$/],
  ["commons.wikimedia.org", /^\/w\/api.php$/],
  ["fishbase.ropensci.org", /^\/species$/]
]);

function assertAllowedUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || !allowedRoutes.get(url.hostname)?.test(url.pathname)) {
    throw new Error("URL fuera de los mecanismos GET permitidos para esta evaluación acotada.");
  }
  if (url.hostname === "commons.wikimedia.org" && url.searchParams.get("action") !== "query") throw new Error("Solo se permite action=query en Commons.");
  return url;
}

function retryDelay(headers, attempt, now = Date.now()) {
  const value = headers.get("retry-after");
  if (value) {
    const milliseconds = /^\d+$/.test(value) ? Number(value) * 1000 : Date.parse(value) - now;
    if (Number.isFinite(milliseconds)) return Math.max(0, milliseconds);
  }
  return 2000 * 2 ** attempt;
}

function createClient(options) {
  const cacheDirectory = path.resolve(options.cacheDirectory);
  const fetcher = options.fetcher || fetch;
  const pause = options.pause || delay;
  const events = [];
  let lastRequestAt = 0;
  let networkRequests = 0;
  const offline = Boolean(options.offline);
  const minimumInterval = options.minimumInterval ?? 2000;
  const maxRequests = options.maxRequests ?? 90;
  const timeoutMilliseconds = options.timeoutMilliseconds ?? 12000;
  const maxAttempts = options.maxAttempts ?? 3;

  async function get(value, source) {
    const url = assertAllowedUrl(value).href;
    const hash = crypto.createHash("sha256").update(url).digest("hex");
    const cacheFile = path.join(cacheDirectory, `${hash}.json`);
    try {
      const cached = JSON.parse(await fs.readFile(cacheFile, "utf8"));
      const age = Date.now() - Date.parse(cached.fetchedAt);
      const ttl = cached.ok ? 30 * 86400000 : 6 * 3600000;
      if (cached.url === url && (offline || age < ttl)) {
        events.push({ source, url, status: cached.status, mode: "cache", fetchedAt: cached.fetchedAt });
        return { ...cached, cached: true, cacheFile: path.basename(cacheFile) };
      }
    } catch (error) {
      if (error.code !== "ENOENT" && !(error instanceof SyntaxError)) throw error;
    }
    if (offline) {
      events.push({ source, url, mode: "offline-miss" });
      return { source, url, ok: false, status: null, fetchedAt: null, error: "No hay respuesta en caché; consulta pendiente.", data: null, cached: false };
    }
    // Wikimedia asks for a way to contact the operator. Never invent an address.
    if (new URL(url).hostname === "commons.wikimedia.org" && !/(?:https?:\/\/|[\w.+-]+@[\w.-]+\.[a-z]{2,})/i.test(options.userAgent || "")) {
      events.push({ source, url, mode: "missing-user-agent-contact" });
      return { source, url, ok: false, status: null, fetchedAt: null, data: null, cached: false, error: "Configura ATLAS_SOURCE_USER_AGENT con una URL pública o un correo real del operador para consultas nuevas a Wikimedia. La caché y el modo offline siguen disponibles." };
    }

    let result;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (networkRequests >= maxRequests) throw new Error("Se alcanzó el límite local de solicitudes de esta prueba.");
      await pause(Math.max(0, minimumInterval - (Date.now() - lastRequestAt)));
      lastRequestAt = Date.now();
      networkRequests++;
      const fetchedAt = new Date().toISOString();
      let waitMilliseconds = 2000 * 2 ** attempt;
      let retryable = false;
      try {
        const response = await fetcher(url, {
          method: "GET", redirect: "error", signal: AbortSignal.timeout(timeoutMilliseconds),
          headers: { Accept: "application/json", "User-Agent": options.userAgent || "AtlasAzulSourceEvaluation/1.0 (local manual research; no bulk harvesting)" }
        });
        if (Number(response.headers.get("content-length")) > 524288) throw new Error("Respuesta demasiado grande para la prueba aislada.");
        const raw = await response.text();
        if (Buffer.byteLength(raw) > 524288) throw new Error("Respuesta demasiado grande para la prueba aislada.");
        let data = null;
        let parseError = null;
        if (raw) {
          try { data = JSON.parse(raw); } catch { parseError = "Respuesta no JSON; no se interpreta como identificación."; }
        }
        const apiError = data?.error?.code || null;
        const ok = response.ok && !parseError && !apiError;
        result = { source, url, fetchedAt, status: response.status, ok, data, error: parseError || (apiError ? `Error de API: ${apiError}` : response.ok ? null : `HTTP ${response.status}`), attempts: attempt + 1, retryAfter: response.headers.get("retry-after") };
        retryable = [429, 500, 502, 503, 504].includes(response.status) || ["maxlag", "ratelimited"].includes(apiError);
        waitMilliseconds = retryDelay(response.headers, attempt);
      } catch (error) {
        result = { source, url, fetchedAt, status: null, ok: false, data: null, error: `${error.message}${error.cause?.code ? ` (${error.cause.code})` : ""}`, attempts: attempt + 1 };
        retryable = !["EACCES", "ENOTFOUND", "DEPTH_ZERO_SELF_SIGNED_CERT", "CERT_HAS_EXPIRED", "UNABLE_TO_VERIFY_LEAF_SIGNATURE"].includes(error.cause?.code) && !/demasiado grande/.test(error.message);
      }
      events.push({ source, url, status: result.status, mode: "network", attempt: attempt + 1, ok: result.ok, fetchedAt, error: result.error });
      if (result.ok || !retryable || attempt + 1 === maxAttempts) break;
      if (waitMilliseconds > 30000) {
        result.deferred = true;
        result.error += "; Retry-After excede el tiempo de esta prueba: se deja pendiente sin adelantar el reintento.";
        break;
      }
      await pause(waitMilliseconds);
    }
    await fs.mkdir(cacheDirectory, { recursive: true });
    await fs.writeFile(cacheFile, JSON.stringify(result, null, 2) + "\n", "utf8");
    return { ...result, cached: false, cacheFile: path.basename(cacheFile) };
  }

  return { get, events, get networkRequests() { return networkRequests; } };
}

module.exports = { createClient, assertAllowedUrl, retryDelay };
