"use strict";

// Inject fileExists when validating local images in Node; browsers cannot inspect disk paths.
const CatalogValidator = (() => {
  const environments = new Set(["marine", "freshwater", "brackish"]);
  const isText = value => typeof value === "string";
  const hasText = value => isText(value) && value.trim().length > 0;
  const isWebUrl = value => {
    try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; }
  };
  const isDate = value => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) return false;
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
  };
  const normalizeName = value => String(value || "").trim().replace(/\s+/g, " ").toLowerCase();

  function validateCatalog(catalog, options = {}) {
    const errors = [];
    const warnings = [];
    const ids = new Set();
    const scientificNames = new Set();
    const addError = (id, message) => errors.push(`${id}: ${message}`);

    if (!catalog || !Array.isArray(catalog.species)) {
      return { errors: ["Falta el arreglo species del catálogo."], warnings };
    }
    if (!catalog.regions || typeof catalog.regions !== "object") errors.push("Falta el mapa de regiones.");
    if (!Array.isArray(catalog.groups)) errors.push("Falta el arreglo separado de grupos.");

    function validatePhoto(photo, id) {
      if (!photo || typeof photo !== "object") { addError(id, "Fotografía inválida."); return; }
      for (const key of ["path", "alt", "author", "license", "licenseUrl", "source"]) {
        if (!hasText(photo[key])) addError(id, `Falta photo.${key}.`);
      }
      if (!isWebUrl(photo.source) || !isWebUrl(photo.licenseUrl)) addError(id, "La fotografía necesita enlaces válidos de fuente y licencia.");
      if (hasText(photo.path)) {
        if (/^(?:[a-z]+:|\/|\\)/i.test(photo.path) || photo.path.split(/[\\/]/).includes("..")) {
          addError(id, "La fotografía debe usar una ruta local relativa sin salir del proyecto.");
        } else if (options.fileExists && !options.fileExists(photo.path)) {
          addError(id, `No existe la imagen local ${photo.path}.`);
        }
      }
    }

    catalog.species.forEach((fish, index) => {
      const id = fish?.id || `Registro ${index + 1}`;
      if (!fish || typeof fish !== "object") { addError(id, "Registro inválido."); return; }
      for (const key of ["id", "scientificName", "name", "nativeDistribution"]) {
        if (!hasText(fish[key])) addError(id, `Falta el campo esencial ${key}.`);
      }
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fish.id || "")) addError(id, "Identificador inválido; usa un slug estable.");
      if (ids.has(fish.id)) addError(id, "Identificador repetido.");
      ids.add(fish.id);
      const scientificName = normalizeName(fish.scientificName);
      if (scientificNames.has(scientificName)) addError(id, "Nombre científico duplicado.");
      scientificNames.add(scientificName);
      if (!/^[A-Z][a-z]+ [a-z]+(?: [a-z]+)?$/.test(fish.scientificName || "")) addError(id, "Se espera un nombre de especie, sin autor ni un grupo general.");
      for (const key of ["family", "order", "introducedDistribution", "habitat", "diet", "description"]) {
        if (!isText(fish[key])) addError(id, `El campo ${key} debe ser texto; puede estar vacío si no se verificó.`);
      }
      for (const key of ["alternativeNames", "curiosities", "regions", "environments"]) {
        if (!Array.isArray(fish[key]) || fish[key].some(value => !hasText(value))) addError(id, `${key} debe ser un arreglo de textos.`);
      }
      if (!Array.isArray(fish.environments) || !fish.environments.length || fish.environments.some(value => !environments.has(value))) addError(id, "Ambiente ausente o desconocido.");
      if (!Array.isArray(fish.regions) || !fish.regions.length || fish.regions.some(value => !catalog.regions?.[value])) addError(id, "Región nativa ausente o desconocida.");
      if (!isDate(fish.reviewedAt)) addError(id, "Falta una fecha de revisión válida (AAAA-MM-DD).");
      if (!Array.isArray(fish.sources) || !fish.sources.length) {
        addError(id, "Faltan fuentes verificables.");
      } else {
        fish.sources.forEach(source => {
          if (!hasText(source?.title) || !isWebUrl(source?.url) || !isDate(source?.accessedAt) || !Array.isArray(source?.fields) || !source.fields.length) {
            addError(id, "Cada fuente necesita título, enlace, fecha de consulta y campos respaldados.");
          }
        });
      }
      if (!Object.hasOwn(fish, "photo")) addError(id, "Falta photo; usa null si no hay fotografía verificada.");
      else if (fish.photo === null) warnings.push(`${id}: imagen no disponible.`);
      else validatePhoto(fish.photo, id);

      if (!Object.hasOwn(fish, "size")) addError(id, "Falta size; usa null si no hay un tamaño verificado.");
      else if (fish.size !== null) {
        const size = fish.size;
        if (!size || !Number.isFinite(size.value) || size.value <= 0 || !["cm", "mm", "m"].includes(size.unit) || !["maximum", "typical"].includes(size.type) || !isText(size.measurement) || !isWebUrl(size.sourceUrl)) {
          addError(id, "Tamaño inválido: requiere valor, unidad, tipo, medición y fuente.");
        } else if (!Array.isArray(fish.sources) || !fish.sources.some(source => source?.url === size.sourceUrl && Array.isArray(source?.fields) && source.fields.includes("size"))) addError(id, "La fuente del tamaño debe estar registrada y respaldar size.");
      }
    });
    const groupIds = new Set();
    (Array.isArray(catalog.groups) ? catalog.groups : []).forEach(group => {
      if (!hasText(group?.id) || !hasText(group?.name) || !Array.isArray(group?.speciesIds)) errors.push("Grupo inválido.");
      if (groupIds.has(group?.id) || ids.has(group?.id)) errors.push(`Grupo ${group?.id}: identificador repetido o confundido con especie.`);
      groupIds.add(group?.id);
      (Array.isArray(group?.speciesIds) ? group.speciesIds : []).forEach(id => { if (!ids.has(id)) errors.push(`Grupo ${group.id}: especie ${id} inexistente.`); });
    });
    if (catalog.heroPhoto) validatePhoto(catalog.heroPhoto, "Portada");
    return { errors, warnings };
  }

  return { validateCatalog };
})();

if (typeof module !== "undefined" && module.exports) module.exports = CatalogValidator;
