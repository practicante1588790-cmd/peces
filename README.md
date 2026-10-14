# Atlas Azul — Peces del mundo

Fase 1: catálogo educativo local de **50 especies**, incluidas las 12 originales. HTML, CSS y JavaScript puro, sin frameworks, npm, compilación, backend ni servicios de pago. No se publicó ni desplegó el proyecto.

## Ejecutar

Abre `index.html` directamente con un navegador moderno o abre esta carpeta en VS Code y elige **Open with Live Server** sobre `index.html`. Ambas formas funcionan: los datos se cargan con scripts clásicos locales y `defer`, sin `fetch` ni módulos que exijan HTTP. El catálogo y las fotografías locales funcionan sin internet; consultar las referencias externas requiere conexión.

Los controles ofrecen búsqueda por nombre común, científico, alternativo y región, filtros combinados por ambiente y región nativa, orden del atlas o alfabético y paginación de 12 registros. El orden inicial conserva las 12 especies originales como primera página. «Limpiar filtros» restablece también búsqueda, orden y página. Las páginas fuera de rango se ajustan al límite válido.

## Organización

| Archivo o carpeta | Responsabilidad |
| --- | --- |
| `index.html` | Estructura original y controles nuevos del catálogo. |
| `style.css` | Reglas originales intactas y un bloque adicional para los nuevos controles. |
| `script.js` | Tarjetas de la página actual, fichas, créditos, controles y menú. |
| `data/catalog.js` | Fuente única de datos activos: especies, regiones, grupos y fotografía de portada. |
| `lib/catalog-tools.js` | Índice de búsqueda, filtros, orden y paginación; funciones sin dependencia del DOM. |
| `lib/catalog-validator.js` | Validación reutilizable de estructura, identificadores, fuentes e imágenes. |
| `tools/validate-catalog.cjs` | Comprobación opcional del catálogo y rutas locales con Node, sin paquetes. |
| `assets/images/` | Las 13 fotografías originales y su registro original `credits.json`, conservados. |
| `backups/phase-1-original/` | Copia anterior de los cuatro archivos y de todos los recursos, con manifiesto SHA-256. |
| `docs/` | Modelo, revisión de fuentes y evidencia de la Fase 1. |
| `tests/` | Pruebas de catálogo y verificación opcional en navegador. |

El archivo `assets/images/credits.json` conserva el registro histórico original. Para nuevos registros, los créditos activos se guardan junto a la fotografía dentro de `data/catalog.js`; no hay que duplicarlos en otro archivo. Las fichas y la sección de créditos leen esa misma información.

## Modelo y rigor de los datos

Consulta [el modelo](docs/data-model.md) y las notas de [especies originales](docs/original-research.md), [marinas](docs/marine-research.md) y [continentales](docs/freshwater-research.md).

- `scientificName` contiene el nombre de especie utilizado como aceptado en las referencias consultadas, sin autor taxonómico. La validación estructural no certifica la aceptación taxonómica: esa revisión es editorial.
- Los ambientes son un arreglo: `marine`, `freshwater`, `brackish`. Una especie puede aparecer en varios filtros. La trucha incluye el ciclo de la forma migratoria, además de la residente original.
- `regions` se refiere exclusivamente a la distribución **nativa** resumida. La distribución introducida tiene su propio campo. Las regiones son categorías amplias para navegar, no mapas exhaustivos ni listas de países. Buscar por texto también permite encontrar menciones de introducciones.
- Un campo de introducciones vacío significa «Información no disponible», no ausencia demostrada de introducciones. Los otros datos desconocidos quedan como `""`, `[]` o `null`, según su tipo.
- Los tamaños incluyen unidad, método de medición y distinción entre máximo publicado o tamaño típico. TL significa longitud total; SL, longitud estándar. No se comparan como si fueran la misma medición ni como límites absolutos.
- Cada fuente indica URL, fecha de consulta y campos respaldados. Los nombres comunes pueden variar por región; algunos son etiquetas educativas en español, no nombres oficiales universales.
- Los grupos generales están separados de `species`. «Tiburones» es un grupo, no una especie, y no incrementa el contador.

## Agregar una especie

1. Verifica el nombre científico aceptado y consulta fuentes específicas de la especie. Separa la distribución nativa de las introducciones y redacta resúmenes propios breves. Si las fuentes discrepan, registra la decisión y la referencia que la respalda; no rellenes por suposición.
2. Añade un objeto al arreglo `species` de `data/catalog.js`, siguiendo [el modelo](docs/data-model.md). Usa un `id` único y estable; no lo cambies al corregir el nombre común.
3. Registra las fuentes en `sources`, indicando qué campos respalda cada una y la fecha real de consulta. Usa `reviewedAt` para la fecha de revisión del registro. Familia, orden, tamaño y curiosidades se pueden dejar vacíos si no están verificados.
4. Si tienes una fotografía correctamente identificada y reutilizable, guárdala en `assets/images/` y rellena `photo` con la ruta relativa, texto alternativo, autor, licencia, enlace a la licencia y página original. Si no, usa `photo: null`: aparecerá «Imagen no disponible». No uses fotografías de especies parecidas.
5. Asigna al menos un ambiente y un código de región nativa de `regions`. Si agregas una región nueva al mapa, el menú de regiones se actualiza automáticamente cuando exista una especie asociada.
6. Ejecuta la validación opcional y recarga el navegador. No debes editar el HTML ni la lógica de las tarjetas para sumar especies.

## Validar

El sitio no necesita Node para abrirse. Si tienes Node disponible, desde esta carpeta puedes ejecutar:

```text
node tools/validate-catalog.cjs
node --test tests/catalog.test.cjs
node --check script.js
```

El validador detecta identificadores repetidos, nombres científicos duplicados, campos esenciales ausentes, grupos mezclados con especies, ambientes o regiones desconocidos, fechas y tamaños inválidos, créditos incompletos y rutas locales de imágenes inexistentes. Devuelve errores y avisos por separado. `photo: null` es válido y genera un aviso esperado; en esta entrega hay **38 avisos por fotografías pendientes** y **0 errores**.

La misma función `CatalogValidator.validateCatalog(catalog, { fileExists })` se reutiliza desde navegador o Node. En el navegador comprueba la estructura; Node añade la revisión de archivos mediante la función `fileExists`. No descarga contenido ni determina automáticamente si una afirmación científica es verdadera.

La verificación de navegador usa una instalación ya disponible de Python, Playwright y Chrome; estas herramientas son opcionales de desarrollo, no dependencias del sitio. No se añadió ningún entorno ni se instalaron paquetes. `tests/browser_check.py` compara con las capturas y estilos guardados en `docs/verification`; `tests/capture_baseline.py` permite capturar de nuevo únicamente la versión protegida en `backups/phase-1-original`.

Resultado de esta entrega: **8 pruebas de catálogo aprobadas**, 50 fichas recorridas con teclado y navegación comprobada en Chrome mediante archivo local y HTTP. Se probaron vistas de 360, 390, 768 y 1440 píxeles, respaldo de imágenes y movimiento reducido. El [informe](docs/phase-1-report.md) enlaza las capturas y describe los límites: no hubo pruebas en dispositivos físicos ni en Safari, Firefox o lectores de pantalla reales.

## Diseño y recuperación

Las reglas CSS originales se conservaron literalmente; se añadió un bloque al final para filtros, selectores y paginación. Se mantuvieron colores, tipografías, encabezado, portada, secciones, tarjetas y diálogo. Las fichas muestran más campos dentro de su estructura visual original. Los recursos originales tienen el mismo contenido binario que la copia de recuperación.

Antes de editar se revisó Git: existía un commit inicial, `README.md` tenía cambios y los archivos del sitio y recursos estaban sin seguimiento. No se creó un commit ni se restableció el índice. Para recuperar la versión anterior, copia desde `backups/phase-1-original/` los archivos que quieras recuperar; guarda antes cualquier trabajo posterior que quieras conservar. El backup no incluye `.git` y no cambia el historial.

## Límites y siguientes fases

Se verificaron 50 registros de diversas regiones y ambientes. **No es cobertura mundial completa**. Se conservan 12 fotografías de especies y una de portada; las 38 nuevas fichas no tienen aún fotografía. Familia, orden o tamaño permanecen vacíos donde no se verificaron. La distribución es un resumen, no un inventario mundial de poblaciones. Los enlaces externos pueden cambiar o quedar temporalmente inaccesibles después de la consulta.

La búsqueda filtra datos en memoria y dibuja solamente la página actual. Esta base evita saturar el DOM, pero todavía carga todo el catálogo al abrir: no sustituye una API para cientos de miles de registros.

Fases propuestas, **sin implementar**:

2. Evaluar autoridades taxonómicas, fuentes de distribución, licencias, cobertura y mecanismos de importación permitidos. Priorizar también fotografías identificadas. Explicar costes antes de elegir servicios de pago.
3. Incorporar una base de datos y una API con búsqueda y paginación a gran escala, conservando esta interfaz.
4. Importar gradualmente con validación, deduplicación, procedencia por campo y seguimiento de cobertura.
5. Medir y optimizar rendimiento, caché e imágenes; preparar publicación cuando se solicite.

El siguiente paso recomendado es la Fase 2: evaluar fuentes y permisos antes de automatizar importaciones.


## Fase 2: fuentes y mecanismos de importación

La evaluación de Fase 2 está completada y documentada en [docs/phase-2-sources.md](docs/phase-2-sources.md). La página, el catálogo y sus fotografías permanecen intactos. Incluye documentación oficial de GBIF, Catalogue of Life, WoRMS, FishBase y Wikimedia Commons; una muestra real de ocho especies; cinco fotografías candidatas y descartes documentados; y requisitos para una futura Fase 3, que no se implementó.

La herramienta de evaluación usa únicamente módulos integrados de Node. Para reproducir la evidencia guardada sin consultar servicios externos:

```text
node tools/evaluate-sources.cjs --offline
node --test tests/phase-2.test.cjs
node tools/validate-catalog.cjs
```

Resultados y caché aislados: `evaluation/phase-2/`. La correspondencia de identificadores externos y las decisiones sobre fotografías no se cargan en la web ni sobrescriben los registros de producción. Las miniaturas sirven exclusivamente para evaluación; no sustituyen las fotografías del catálogo. Para consultas nuevas a Wikimedia se exige configurar `ATLAS_SOURCE_USER_AGENT` con un contacto real, según su política; no se necesita una cuenta para las lecturas probadas. FishBase API quedó pendiente por un error de certificado y una discrepancia de versión de licencia documentada.
