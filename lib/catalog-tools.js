"use strict";

// Pure catalog operations shared by the page and the Node verification scripts.
const CatalogTools = (() => {
  const collator = new Intl.Collator("es", { sensitivity: "base", numeric: true });

  function normalizeText(value) {
    return String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  }

  function buildSearchIndex(species, regions) {
    return species.map(fish => ({
      fish,
      searchText: normalizeText([
        fish.name, fish.scientificName, ...fish.alternativeNames,
        fish.nativeDistribution, fish.introducedDistribution,
        ...fish.regions.map(id => regions[id] || "")
      ].join(" "))
    }));
  }

  function getCatalogPage(index, options = {}) {
    const { query = "", environment = "all", region = "all", sort = "catalog" } = options;
    const pageSize = Math.max(1, Math.floor(Number(options.pageSize) || 12));
    const terms = normalizeText(query).split(/\s+/).filter(Boolean);
    const matches = index.filter(({ fish, searchText }) =>
      (environment === "all" || fish.environments.includes(environment)) &&
      (region === "all" || fish.regions.includes(region)) &&
      terms.every(term => searchText.includes(term))
    ).map(entry => entry.fish);

    if (sort !== "catalog") matches.sort((left, right) => {
      const field = sort === "scientific-asc" ? "scientificName" : "name";
      const comparison = collator.compare(left[field], right[field]) || collator.compare(left.id, right.id);
      return sort === "name-desc" ? -comparison : comparison;
    });

    const total = matches.length;
    const totalPages = Math.ceil(total / pageSize);
    const requestedPage = Math.floor(Number(options.page));
    const page = totalPages ? Math.min(totalPages, Math.max(1, Number.isFinite(requestedPage) ? requestedPage : 1)) : 0;
    const start = page ? (page - 1) * pageSize : 0;
    return { total, totalPages, page, entries: matches.slice(start, start + pageSize) };
  }

  return { normalizeText, buildSearchIndex, getCatalogPage };
})();

if (typeof module !== "undefined" && module.exports) module.exports = CatalogTools;
