"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const os = require("node:os");
const { createClient, assertAllowedUrl } = require("../tools/phase-2/http-client.cjs");
const { assessCandidate, assessResponse, assessPhoto } = require("../tools/phase-2/assess-records.cjs");

const endpoint = "https://api.gbif.org/v1/species/match?name=Engraulis%20ringens";
const candidate = { externalId: "123", name: "Engraulis ringens", rank: "species", status: "accepted", lineage: ["Animalia", "Chordata", "Actinopterygii"], matchType: "exact" };

async function temporaryCache(t) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "atlas-phase-2-test-"));
  t.after(async () => {
    const resolved = path.resolve(directory);
    assert.ok(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep));
    assert.ok(path.basename(resolved).startsWith("atlas-phase-2-test-"));
    for (const name of await fs.readdir(directory)) {
      assert.match(name, /^[a-f0-9]{64}\.json$/);
      await fs.unlink(path.join(directory, name));
    }
    await fs.rmdir(directory);
  });
  return directory;
}

test("only documented read-only routes are allowed", () => {
  assert.doesNotThrow(() => assertAllowedUrl(endpoint));
  assert.throws(() => assertAllowedUrl("https://api.gbif.org/v1/occurrence/download"));
  assert.throws(() => assertAllowedUrl("https://commons.wikimedia.org/w/api.php?action=edit"));
  assert.throws(() => assertAllowedUrl("https://upload.wikimedia.org/wikipedia/commons/image.jpg"));
  assert.throws(() => assertAllowedUrl("http://api.gbif.org/v1/species/match"));
});

test("cache replay avoids network and preserves original retrieval date", async t => {
  const cacheDirectory = await temporaryCache(t);
  let calls = 0;
  const client = createClient({ cacheDirectory, minimumInterval: 0, pause: async () => {}, fetcher: async () => { calls++; return new Response('{"usageKey":123}', { status: 200 }); } });
  const first = await client.get(endpoint, "gbif");
  const second = await client.get(endpoint, "gbif");
  assert.equal(calls, 1);
  assert.equal(second.cached, true);
  assert.equal(second.fetchedAt, first.fetchedAt);
  const offline = createClient({ cacheDirectory, offline: true, fetcher: () => { throw new Error("Offline must not fetch"); } });
  assert.equal((await offline.get(endpoint, "gbif")).ok, true);
  assert.equal((await offline.get(endpoint + "&strict=true", "gbif")).ok, false);
  assert.equal(offline.networkRequests, 0);
});

test("Retry-After is respected and long requested delays are deferred", async t => {
  const cacheDirectory = await temporaryCache(t);
  let calls = 0;
  const pauses = [];
  const client = createClient({ cacheDirectory, minimumInterval: 0, pause: async value => pauses.push(value), fetcher: async () => {
    calls++;
    return calls === 1 ? new Response("{}", { status: 429, headers: { "Retry-After": "1" } }) : new Response("{}", { status: 200 });
  } });
  assert.equal((await client.get(endpoint, "gbif")).ok, true);
  assert.ok(pauses.includes(1000));
  const deferred = createClient({ cacheDirectory, minimumInterval: 0, pause: async () => {}, fetcher: async () => new Response("{}", { status: 429, headers: { "Retry-After": "60" } }) });
  const result = await deferred.get(endpoint + "&verbose=true", "gbif");
  assert.equal(result.deferred, true);
  assert.equal(deferred.networkRequests, 1);
});

test("API errors on HTTP 200 do not become successful identifications", async t => {
  const cacheDirectory = await temporaryCache(t);
  const client = createClient({ cacheDirectory, userAgent: "AtlasTest/1.0 (https://example.org/; mocked requests only)", maxAttempts: 2, minimumInterval: 0, pause: async () => {}, fetcher: async () => new Response('{"error":{"code":"maxlag"}}', { status: 200 }) });
  const result = await client.get("https://commons.wikimedia.org/w/api.php?action=query&format=json", "commons");
  assert.equal(result.ok, false);
  assert.equal(client.networkRequests, 2);
  assert.equal(assessResponse("gbif", { ok: true, data: {}, status: 200 }, candidate.name).status, "no-candidate");
});

test("TLS certificate errors are permanent and cannot disable certificate verification", async t => {
  const cacheDirectory = await temporaryCache(t);
  const client = createClient({ cacheDirectory, minimumInterval: 0, pause: async () => {}, fetcher: async () => { throw new Error("fetch failed", { cause: { code: "DEPTH_ZERO_SELF_SIGNED_CERT" } }); } });
  assert.equal((await client.get(endpoint, "gbif")).ok, false);
  assert.equal(client.networkRequests, 1);
});

test("new Wikimedia requests require real operator contact without inventing credentials", async t => {
  const cacheDirectory = await temporaryCache(t);
  const client = createClient({ cacheDirectory, fetcher: () => { throw new Error("Must not reach the network"); } });
  const result = await client.get("https://commons.wikimedia.org/w/api.php?action=query&format=json", "commons");
  assert.equal(result.ok, false);
  assert.equal(client.networkRequests, 0);
  assert.match(result.error, /ATLAS_SOURCE_USER_AGENT/);
});

test("synonyms, higher taxa, non-fish lineages and fuzzy matches require review", () => {
  for (const change of [{ status: "synonym" }, { rank: "genus" }, { name: "Engraulis" }, { matchType: "fuzzy" }, { lineage: ["Animalia", "Chordata", "Tetrapoda"] }, { resultMatch: false }]) {
    assert.equal(assessCandidate(candidate.name, { ...candidate, ...change }).assessment, "needs-review");
  }
  const valid = assessCandidate(candidate.name, candidate);
  assert.equal(valid.assessment, "exact-accepted-candidate");
  assert.equal(valid.importApproved, false);
  assert.equal(valid.reviewRequired, true);
});

test("multiple WoRMS results are explicitly ambiguous", () => {
  const row = { AphiaID: 1, scientificname: candidate.name, rank: "Species", status: "accepted", kingdom: "Animalia", phylum: "Chordata", class: "Teleostei", match_type: "exact" };
  const result = assessResponse("worms", { ok: true, data: [row, { ...row, AphiaID: 2 }], status: 200 }, candidate.name);
  assert.equal(result.ambiguous, true);
  assert.equal(result.status, "ambiguous");
  assert.equal(result.importApproved, false);
});

test("photo search hits require species evidence and a reviewed individual license", () => {
  const page = { pageid: 1, title: "File:Pacu.jpg", imageinfo: [{ descriptionurl: "https://commons.wikimedia.org/wiki/File:Pacu.jpg", url: "https://upload.wikimedia.org/pacu.jpg", extmetadata: { Artist: { value: "Author" }, License: { value: "cc-by-sa-4.0" }, LicenseShortName: { value: "CC BY-SA 4.0" }, LicenseUrl: { value: "https://creativecommons.org/licenses/by-sa/4.0/" }, ImageDescription: { value: "Piaractus sp." } } }] };
  const fish = { id: "gamitana", scientificName: "Colossoma macropomum" };
  assert.equal(assessPhoto(page, fish, {}).status, "discarded");
  page.title = "File:Colossoma macropomum.jpg";
  page.imageinfo[0].extmetadata.ImageDescription.value = "Colossoma macropomum";
  assert.equal(assessPhoto(page, fish, {}).status, "metadata-candidate-needs-manual-review");
  page.imageinfo[0].extmetadata.License.value = "cc-by-nc-4.0";
  assert.equal(assessPhoto(page, fish, {}).status, "discarded");
});
