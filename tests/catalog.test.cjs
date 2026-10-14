"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const catalog = require("../data/catalog.js");
const { normalizeText, buildSearchIndex, getCatalogPage } = require("../lib/catalog-tools.js");
const { validateCatalog } = require("../lib/catalog-validator.js");
const index = buildSearchIndex(catalog.species, catalog.regions);

test("curated catalog contains 50 species and excludes general groups", () => {
  assert.equal(catalog.species.length, 50);
  assert.equal(getCatalogPage(index).total, 50);
  assert.deepEqual(validateCatalog(catalog).errors, []);
  assert.equal(validateCatalog(catalog).warnings.length, 38);
  assert.equal(getCatalogPage(index, { query: "tiburones" }).total, 0);
});

test("search handles aliases, accents, case, scientific names and blank input", () => {
  assert.equal(normalizeText("  PIRARUCÚ  "), "pirarucu");
  assert.equal(getCatalogPage(index, { query: "PIRARUCU" }).entries[0].id, "arapaima");
  assert.equal(getCatalogPage(index, { query: "HIPPOCAMPUS INGENS" }).entries[0].id, "seahorse");
  assert.equal(getCatalogPage(index, { query: "   " }).total, 50);
  assert.equal(getCatalogPage(index, { query: "Atlantico SALMON" }).entries[0].id, "salmon-del-atlantico");
});

test("environment and native region are applied before pagination", () => {
  for (const environment of ["all", "marine", "freshwater", "brackish"]) {
    for (const region of ["all", ...Object.keys(catalog.regions)]) {
      const expected = catalog.species.filter(fish => (environment === "all" || fish.environments.includes(environment)) && (region === "all" || fish.regions.includes(region)));
      const result = getCatalogPage(index, { environment, region });
      assert.equal(result.total, expected.length);
      assert.ok(result.entries.length <= 12);
      assert.ok(result.entries.every(fish => expected.includes(fish)));
    }
  }
  // A species present in introduced regions must not enter the native-region filter.
  assert.equal(getCatalogPage(index, { query: "Pterois volitans", region: "atlantic" }).total, 0);
  assert.equal(getCatalogPage(index, { query: "trucha", environment: "brackish" }).entries[0].id, "trout");
});

test("paging covers each species exactly once and clamps out-of-range pages", () => {
  const ids = [];
  for (let page = 1; page <= 5; page++) {
    const result = getCatalogPage(index, { page });
    assert.equal(result.page, page);
    assert.equal(result.entries.length, page === 5 ? 2 : 12);
    ids.push(...result.entries.map(fish => fish.id));
  }
  assert.equal(new Set(ids).size, 50);
  assert.equal(getCatalogPage(index, { page: -5 }).page, 1);
  assert.equal(getCatalogPage(index, { page: 999 }).page, 5);
  assert.equal(getCatalogPage(index, { page: NaN }).page, 1);
  const empty = getCatalogPage(index, { query: "no-such-species", page: 999 });
  assert.deepEqual([empty.total, empty.totalPages, empty.page, empty.entries.length], [0, 0, 0, 0]);
});

test("alphabetical sorting applies to the whole matching catalog", () => {
  const asc = getCatalogPage(index, { sort: "name-asc", pageSize: 100 }).entries;
  const desc = getCatalogPage(index, { sort: "name-desc", pageSize: 100 }).entries;
  assert.deepEqual(desc.map(fish => fish.id), asc.toReversed().map(fish => fish.id));
  for (let i = 1; i < asc.length; i++) assert.ok(asc[i - 1].name.localeCompare(asc[i].name, "es", { sensitivity: "base", numeric: true }) <= 0);
});

test("validator detects duplicates and missing essential fields", () => {
  const broken = structuredClone(catalog);
  broken.species.push(structuredClone(broken.species[0]));
  delete broken.species[1].scientificName;
  delete broken.species[2].sources;
  const { errors } = validateCatalog(broken);
  assert.ok(errors.some(error => error.includes("Identificador repetido")));
  assert.ok(errors.some(error => error.includes("científico duplicado")));
  assert.ok(errors.some(error => error.includes("esencial scientificName")));
  assert.ok(errors.some(error => error.includes("Faltan fuentes")));
});

test("validator detects bad local image paths, missing files and absent licensing", () => {
  const broken = structuredClone(catalog);
  broken.species[0].photo.path = "../outside.jpg";
  delete broken.species[1].photo.author;
  const { errors } = validateCatalog(broken, { fileExists: () => false });
  assert.ok(errors.some(error => error.includes("sin salir del proyecto")));
  assert.ok(errors.some(error => error.includes("No existe la imagen local")));
  assert.ok(errors.some(error => error.includes("photo.author")));
});

test("invalid arrays, dates, measurements and references produce errors without crashing", () => {
  const broken = structuredClone(catalog);
  broken.species[0].regions = "asia";
  broken.species[0].environments = "marine";
  broken.species[0].reviewedAt = "2026-02-31";
  broken.species[1].sources = null;
  broken.groups = "sharks";
  assert.doesNotThrow(() => validateCatalog(broken));
  assert.ok(validateCatalog(broken).errors.length >= 6);
});
