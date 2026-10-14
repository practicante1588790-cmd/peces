"use strict";

// Data and pure operations are loaded first through deferred classic scripts.
const catalog = AtlasCatalog;
let searchIndex = [];
const environmentLabels = { marine: "Agua salada", freshwater: "Agua dulce", brackish: "Agua salobre" };
const pageSize = 12;
const unavailable = "Información no disponible";
const grid = document.querySelector("#fish-grid");
const searchInput = document.querySelector("#search");
const regionFilter = document.querySelector("#region-filter");
const sortOrder = document.querySelector("#sort-order");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const pagination = document.querySelector("#pagination");
const pageInput = document.querySelector("#page-input");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const dialog = document.querySelector("#fish-dialog");
const dialogContent = document.querySelector("#dialog-content");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");
let activeEnvironment = "all";
let currentPage = 1;
let dialogTrigger = null;

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function getEnvironmentLabel(fish) {
  return fish.environments.map(value => environmentLabels[value]).join(" · ");
}

function createPlaceholder() {
  const placeholder = createElement("div", "image-placeholder");
  placeholder.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="8" width="34" height="32" rx="5"/><circle cx="18" cy="19" r="3"/><path d="m9 34 10-10 7 7 6-5 8 9"/></svg>';
  placeholder.append(createElement("span", "", "Imagen no disponible"));
  return placeholder;
}

function createImage(photo, eager = false) {
  if (!photo) return createPlaceholder();
  const image = new Image();
  image.alt = photo.alt;
  image.loading = eager ? "eager" : "lazy";
  image.decoding = "async";
  if (eager) image.fetchPriority = "high";
  image.addEventListener("error", () => image.replaceWith(createPlaceholder()), { once: true });
  image.src = photo.path;
  return image;
}

function createImageFrame(fish, eager = false) {
  const frame = createElement("div", "image-frame");
  const badgeClass = fish.environments.includes("freshwater") ? "freshwater" : fish.environments[0];
  frame.append(createImage(fish.photo, eager), createElement("span", `environment-badge ${badgeClass}`, getEnvironmentLabel(fish)));
  return frame;
}

function createCard(fish) {
  const card = createElement("article", "fish-card");
  card.dataset.speciesId = fish.id;
  const content = createElement("div", "card-content");
  const region = createElement("p", "card-region");
  region.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></svg>';
  region.append(createElement("span", "", fish.nativeDistribution));
  const button = createElement("button", "more-button");
  button.type = "button";
  button.setAttribute("aria-label", `Ver más sobre ${fish.name.toLowerCase()}`);
  button.setAttribute("aria-haspopup", "dialog");
  button.append(createElement("span", "", "Ver más"), createElement("span", "", "↗"));
  button.lastChild.setAttribute("aria-hidden", "true");
  button.addEventListener("click", () => openFishDialog(fish, button));
  content.append(createElement("h3", "", fish.name), createElement("p", "scientific-name", fish.scientificName), region, createElement("p", "card-description", fish.description || unavailable), button);
  card.append(createImageFrame(fish), content);
  return card;
}

function renderCatalog() {
  const result = CatalogTools.getCatalogPage(searchIndex, {
    query: searchInput.value, environment: activeEnvironment,
    region: regionFilter.value, sort: sortOrder.value,
    page: currentPage, pageSize
  });
  currentPage = result.page;
  const fragment = document.createDocumentFragment();
  // Create only the current page, never all records in the DOM.
  result.entries.forEach(fish => fragment.append(createCard(fish)));
  grid.replaceChildren(fragment);
  resultCount.textContent = `${result.total} ${result.total === 1 ? "especie encontrada" : "especies encontradas"} · ${result.total ? `Página ${result.page} de ${result.totalPages}` : "Sin páginas para mostrar"}`;
  emptyState.hidden = result.total !== 0;
  pagination.hidden = result.total === 0;
  previousButton.disabled = result.page <= 1;
  nextButton.disabled = result.page >= result.totalPages;
  pageInput.value = String(result.page || 1);
  pageInput.max = String(result.totalPages || 1);
  document.querySelector("#page-total").textContent = `de ${result.totalPages}`;
}

function updateCatalog() {
  currentPage = 1;
  renderCatalog();
}

function changePage(value) {
  currentPage = value;
  renderCatalog();
  // Bring the new page into view and announce it after keyboard navigation.
  resultCount.tabIndex = -1;
  resultCount.focus({ preventScroll: true });
  resultCount.scrollIntoView({ block: "start" });
}

function resetCatalog() {
  searchInput.value = "";
  activeEnvironment = "all";
  regionFilter.value = "all";
  sortOrder.value = "catalog";
  filterButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === "all")));
  updateCatalog();
  searchInput.focus({ preventScroll: true });
}

function createLink(label, url) {
  const link = createElement("a", "", label);
  link.href = url;
  return link;
}

function createPhotoCredit(photo) {
  const paragraph = createElement("p", "");
  if (!photo) {
    paragraph.textContent = "Fotografía no disponible. No se ha sustituido por otra especie.";
    return paragraph;
  }
  paragraph.append(document.createTextNode(`Fotografía: ${photo.author} · `), createLink(photo.license, photo.licenseUrl), document.createTextNode(" · "), createLink("Archivo original y créditos", photo.source), document.createTextNode(`. ${photo.changes || "El encuadre puede variar en pantalla."}`));
  return paragraph;
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

function formatSize(size) {
  if (!size) return unavailable;
  const measurement = { TL: "longitud total", SL: "longitud estándar", FL: "longitud hasta la horquilla de la cola" }[size.measurement] || size.measurement || "método de medición no indicado";
  return `${new Intl.NumberFormat("es-PE").format(size.value)} ${size.unit} · ${size.type === "maximum" ? "máximo publicado" : "tamaño típico"} · ${measurement}`;
}

function openFishDialog(fish, trigger) {
  dialogTrigger = trigger;
  const body = createElement("div", "dialog-body");
  const title = createElement("h2", "", fish.name);
  title.id = "dialog-title";
  body.append(title, createElement("p", "scientific-name", fish.scientificName), createElement("p", "", fish.description || unavailable));
  const details = createElement("dl", "detail-list");
  const values = [
    ["Ambientes", getEnvironmentLabel(fish)], ["Región nativa", fish.nativeDistribution],
    ["Hábitat", fish.habitat], ["Alimentación", fish.diet],
    ["Nombres alternativos", fish.alternativeNames.join(", ")],
    ["Familia", fish.family], ["Orden", fish.order], ["Tamaño", formatSize(fish.size)],
    ["Distribución introducida", fish.introducedDistribution || "Información no disponible. No implica ausencia de introducciones."],
    ...(fish.notes ? [["Distribución y contexto", fish.notes]] : [])
  ];
  values.forEach(([label, value]) => {
    const group = createElement("div", label.startsWith("Distribución") ? "detail-wide" : "");
    group.append(createElement("dt", "", label), createElement("dd", "", value || unavailable));
    details.append(group);
  });
  const curiosity = createElement("div", "curiosity");
  curiosity.append(createElement("strong", "", "¿Sabías que…?"));
  if (fish.curiosities.length) curiosity.append(document.createTextNode(fish.curiosities.join(" ")));
  else curiosity.append(document.createTextNode(unavailable));
  const references = createElement("div", "dialog-sources");
  references.append(createElement("strong", "", "Fuentes de los datos"));
  const list = createElement("ul", "");
  const fieldLabels = { scientificName: "nombre científico", name: "nombre común", alternativeNames: "nombres alternativos", family: "familia", order: "orden", environments: "ambientes", regions: "regiones", nativeDistribution: "distribución nativa", introducedDistribution: "introducciones", habitat: "hábitat", diet: "alimentación", description: "descripción", curiosities: "curiosidades", size: "tamaño", notes: "contexto" };
  fish.sources.forEach(source => {
    const item = createElement("li", "");
    item.append(createLink(source.title, source.url), document.createTextNode(` · Consulta: ${formatDate(source.accessedAt)}. Datos: ${source.fields.map(field => fieldLabels[field] || field).join(", ")}.`));
    list.append(item);
  });
  references.append(list, createPhotoCredit(fish.photo), createElement("p", "", `Ficha revisada el ${formatDate(fish.reviewedAt)}. Identificador: ${fish.id}.`));
  body.append(details, curiosity, references);
  dialogContent.replaceChildren(createImageFrame(fish, true), body);
  document.body.classList.add("dialog-open");
  dialog.showModal();
  dialog.scrollTop = 0;
}

document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
// The native dialog handles Escape. Keep Tab cycling within its controls.
dialog.addEventListener("keydown", event => {
  if (event.key !== "Tab") return;
  const controls = [...dialog.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')].filter(element => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
});
dialog.addEventListener("click", event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

searchInput.addEventListener("input", updateCatalog);
regionFilter.addEventListener("change", updateCatalog);
sortOrder.addEventListener("change", updateCatalog);
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeEnvironment = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
  updateCatalog();
}));
document.querySelector("#reset-search").addEventListener("click", resetCatalog);
document.querySelector("#clear-filters").addEventListener("click", resetCatalog);
previousButton.addEventListener("click", () => changePage(currentPage - 1));
nextButton.addEventListener("click", () => changePage(currentPage + 1));
document.querySelector("#page-form").addEventListener("submit", event => {
  event.preventDefault();
  changePage(Number(pageInput.value));
});

function closeMenu(restoreFocus = false) {
  navigation.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navigation.classList.toggle("is-open", isOpen);
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  const target = document.querySelector(link.hash);
  closeMenu();
  if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
}));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") closeMenu(true);
});
document.addEventListener("click", event => { if (!event.target.closest(".site-header")) closeMenu(); });
window.matchMedia("(min-width: 641px)").addEventListener("change", event => {
  if (event.matches) {
    if (document.activeElement === menuButton) navigation.querySelector("a").focus();
    closeMenu();
  }
});

function initializeCatalog() {
  // Schema checks work offline. The CLI additionally checks paths against the disk.
  const validation = CatalogValidator.validateCatalog(catalog);
  if (validation.errors.length) {
    console.error(validation.errors);
    resultCount.textContent = "No se pudo cargar el catálogo: revisa la validación de los datos.";
    return;
  }
  searchIndex = CatalogTools.buildSearchIndex(catalog.species, catalog.regions);
  const availableRegions = new Set(catalog.species.flatMap(fish => fish.regions));
  Object.entries(catalog.regions).filter(([id]) => availableRegions.has(id)).sort((left, right) => left[1].localeCompare(right[1], "es")).forEach(([id, label]) => {
    const option = createElement("option", "", label);
    option.value = id;
    regionFilter.append(option);
  });
  document.querySelector("#hero-media").append(createImage(catalog.heroPhoto, true));
  // Populate photo credits only when requested; avoid a second full catalog DOM.
  const creditsDetails = document.querySelector("#image-credits").closest("details");
  creditsDetails.addEventListener("toggle", () => {
    const list = document.querySelector("#image-credits");
    if (!creditsDetails.open || list.childElementCount) return;
    const photos = catalog.species.filter(fish => fish.photo).map(fish => [fish.name, fish.photo]);
    photos.push(["Portada submarina", catalog.heroPhoto]);
    photos.forEach(([name, photo]) => {
      const item = createElement("li", "");
      item.append(createElement("strong", "", name), createPhotoCredit(photo));
      list.append(item);
    });
    list.append(createElement("li", "", `${catalog.species.filter(fish => !fish.photo).length} especies tienen el marcador «Imagen no disponible».`));
  });
  renderCatalog();
}

initializeCatalog();
