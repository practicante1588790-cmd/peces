"use strict";

// Successful transport is evidence to assess, never permission to import or proof of identity.
const normalize = value => String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
const fishClades = new Set(["actinopterygii", "actinopteri", "teleostei", "chondrichthyes", "elasmobranchii", "holocephali", "dipnoi", "actinistia", "coelacanthimorpha", "myxini", "petromyzontida", "petromyzonti", "cyclostomata", "hyperoartia", "cephalaspidomorphi"]);

function assessCandidate(expectedName, candidate) {
  const reasons = [];
  const names = (candidate.lineage || []).map(item => normalize(typeof item === "string" ? item : item.name));
  const exactName = normalize(candidate.name) === normalize(expectedName);
  if (!exactName) reasons.push("El nombre recibido no coincide exactamente con el nombre científico esperado.");
  if (normalize(candidate.rank) !== "species") reasons.push("El rango recibido no es especie.");
  if (normalize(candidate.status) !== "accepted") reasons.push("El registro no declara un nombre aceptado; resolver sinónimo o estado antes de vincular.");
  if (!names.includes("animalia") || !names.includes("chordata")) reasons.push("Falta confirmar Animalia y Chordata.");
  if (names.includes("tetrapoda") || !names.some(name => fishClades.has(name))) reasons.push("El linaje no confirma un pez dentro del alcance propuesto.");
  if (candidate.isExtinct === true || candidate.isExtinct === 1) reasons.push("Registro extinto fuera del primer lote propuesto.");
  if (candidate.matchType && !["exact", "variant"].includes(normalize(candidate.matchType))) reasons.push("Coincidencia aproximada o de rango superior: requiere revisión.");
  if (candidate.confidence !== undefined && candidate.confidence < 95) reasons.push("Confianza de coincidencia menor de 95; no es un umbral de certeza biológica.");
  if (candidate.resultMatch === false) reasons.push("El servicio declara match=false.");
  if (candidate.issues && Object.keys(candidate.issues).length) reasons.push("El servicio informó incidencias: revisar la respuesta original.");
  return {
    ...candidate,
    assessment: reasons.length ? "needs-review" : "exact-accepted-candidate",
    exactName, reviewRequired: true, reasons,
    importApproved: false
  };
}

function assessResponse(source, response, expectedName, datasetKey, extraLineage) {
  const base = { source, queriedName: expectedName, requestedUrl: response.url, fetchedAt: response.fetchedAt, httpStatus: response.status, cacheFile: response.cacheFile, candidates: [], importApproved: false };
  if (!response.ok) return { ...base, status: "blocked", ambiguous: false, error: response.error };
  const data = response.data;
  let candidates = [];
  if (source === "col" && data?.usage) {
    const usage = data.usage;
    candidates.push({ externalId: String(usage.id), datasetKey: String(datasetKey), name: usage.name, authority: usage.authorship || "", rank: usage.rank, status: usage.status, acceptedId: usage.status === "accepted" ? String(usage.id) : usage.accepted?.id || usage.acceptedId || null, lineage: usage.classification || [], matchType: data.type, family: usage.classification?.find(item => item.rank === "family")?.name || "", order: usage.classification?.find(item => item.rank === "order")?.name || "", issues: data.issues, sourceSector: usage.sectorKey, resultMatch: data.match, isExtinct: usage.extinct });
  } else if (source === "gbif" && data?.usageKey) {
    candidates.push({ externalId: String(data.usageKey), datasetKey, name: data.canonicalName, authority: data.scientificName, rank: data.rank, status: data.status, acceptedId: data.acceptedUsageKey ? String(data.acceptedUsageKey) : data.status === "ACCEPTED" ? String(data.usageKey) : null, lineage: [data.kingdom, data.phylum, data.class, ...(extraLineage || []).map(item => item.canonicalName || item.scientificName)].filter(Boolean), matchType: data.matchType, confidence: data.confidence, family: data.family || "", order: data.order || "", alternatives: data.alternatives || [] });
  } else if (source === "worms" && Array.isArray(data)) {
    candidates = data.map(item => ({ externalId: String(item.AphiaID), datasetKey: "WoRMS-live", name: item.scientificname, authority: item.authority, rank: item.rank, status: item.status, acceptedId: item.valid_AphiaID ? String(item.valid_AphiaID) : null, acceptedName: item.valid_name, lineage: [item.kingdom, item.phylum, item.class], matchType: item.match_type, family: item.family || "", order: item.order || "", isExtinct: item.isExtinct, environments: { marine: item.isMarine, freshwater: item.isFreshwater, brackish: item.isBrackish }, citation: item.citation, modifiedAt: item.modified }));
  }
  candidates = candidates.map(candidate => assessCandidate(expectedName, candidate));
  if (!candidates.length) return { ...base, status: "no-candidate", ambiguous: false, error: "Respuesta sin candidato taxonómico interpretable; no confirma ausencia de la especie." };
  const ambiguous = candidates.length !== 1 || candidates.some(candidate => candidate.alternatives?.length);
  const status = ambiguous ? "ambiguous" : candidates[0].assessment;
  return { ...base, status, ambiguous, candidates };
}

function stripHtml(value) {
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ", aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú", ntilde: "ñ", auml: "ä", ouml: "ö", uuml: "ü", Aacute: "Á", Eacute: "É" };
  return String(value || "").replace(/<[^>]*>/g, " ").replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) => {
    const number = code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : Number(code);
    return number <= 0x10ffff ? String.fromCodePoint(number) : "";
  }).replace(/&([a-z]+);/gi, (match, key) => entities[key] || match).replace(/\s+/g, " ").trim();
}

function assessPhoto(page, fish, response) {
  const info = page.imageinfo?.[0];
  const metadata = info?.extmetadata || {};
  const value = key => stripHtml(metadata[key]?.value);
  const reasons = [];
  const description = value("ImageDescription");
  const categories = value("Categories");
  const combinedIdentity = `${page.title} ${description}`;
  if (!normalize(combinedIdentity).includes(normalize(fish.scientificName))) reasons.push("Ni título ni descripción identifican explícitamente la especie; una búsqueda o categoría no basta.");
  const licenseCode = value("License");
  const licenseUrl = value("LicenseUrl");
  const license = value("LicenseShortName");
  const author = value("Artist");
  if (!/^(cc-by(?:-sa)?-(?:1\.0|2\.0|2\.5|3\.0|4\.0)|cc0)$/.test(licenseCode) || !/^https?:\/\/creativecommons\.org\//.test(licenseUrl)) reasons.push("Licencia no expresada como CC BY, CC BY-SA o CC0 con condiciones verificables en este filtro conservador.");
  if (!author) reasons.push("Autor ausente: revisar antes de preparar atribución.");
  if (/\.svg$/i.test(page.title) || /(?:illustration|drawing|ilustraci[oó]n|dibujo)/i.test(description)) reasons.push("Ilustración o dibujo; se requieren fotografías.");
  if (/\.(?:tif|tiff)$/i.test(page.title) || /(?:fluorescence microscopy|microscop|telencephalon|teléncefalo)/i.test(`${description} ${categories}`)) reasons.push("Detalle microscópico o TIFF: no se propone como fotografía representativa para la tarjeta educativa.");
  if (/\bPiaractus\b/i.test(`${page.title} ${categories}`) && fish.scientificName.startsWith("Colossoma")) reasons.push("Conflicto entre Colossoma en la descripción y Piaractus en el título o categorías.");
  return {
    internalId: fish.id, scientificName: fish.scientificName, source: "Wikimedia Commons",
    externalId: String(page.pageid), pageTitle: page.title,
    originalPage: info?.descriptionurl || null, fileUrl: info?.url ? info.url.split("?")[0] : null,
    fileSha1: info?.sha1 || null, author, authorHtml: metadata.Artist?.value || "",
    license, licenseCode, licenseUrl,
    attribution: `${value("ObjectName") || page.title} — ${author || "autor pendiente"}, ${license || "licencia pendiente"}, Wikimedia Commons (${info?.descriptionurl || "página pendiente"}); ${licenseUrl || "condiciones pendientes"}. Sin modificaciones en esta evaluación.`,
    evidence: { description, descriptionHtml: metadata.ImageDescription?.value || "", categories, credit: value("Credit"), metadataDate: value("DateTime"), attributionRequired: value("AttributionRequired") },
    fetchedAt: response.fetchedAt, requestUrl: response.url, cacheFile: response.cacheFile,
    status: reasons.length ? "discarded" : "metadata-candidate-needs-manual-review", reasons,
    imported: false, imageDownloaded: false, visualReview: "pending", identificationCertified: false
  };
}

module.exports = { assessCandidate, assessResponse, assessPhoto, stripHtml };
