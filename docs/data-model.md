# Modelo del catálogo — versión 1

`data/catalog.js` es el único catálogo activo. Un script clásico con `defer` permite usarlo tanto con `file://` como con HTTP. La exportación condicional al final permite ejecutar el mismo catálogo desde Node para validación; no requiere compilación.

## Campos de una especie

| Campo | Tipo | Criterio |
| --- | --- | --- |
| `id` | cadena no vacía | Slug único y estable; no reutilizar para otra especie. |
| `scientificName` | cadena no vacía | Nombre científico aceptado según la fuente consultada. Sin autor ni nombre de grupo. |
| `name` | cadena no vacía | Nombre común educativo en español. |
| `alternativeNames` | arreglo de cadenas | Sinónimos comunes o científicos verificables; `[]` si no hay. |
| `family`, `order` | cadenas | Taxonomía verificada; `""` si no se revisó o existe un conflicto sin resolver. |
| `environments` | arreglo no vacío | Uno o varios de `marine`, `freshwater`, `brackish`. |
| `regions` | arreglo no vacío | Claves del mapa `regions`; áreas nativas representativas para filtrar. |
| `nativeDistribution` | cadena no vacía | Resumen nativo respaldado por fuentes. No inferirlo de registros de acuario. |
| `introducedDistribution` | cadena | Introducciones verificadas; `""` significa que no se documentaron en esta revisión. |
| `habitat`, `diet`, `description` | cadenas | Contenido educativo propio; `""` si no se verificó. |
| `curiosities` | arreglo de cadenas | Afirmaciones respaldadas; puede ser `[]`. |
| `notes` | cadena opcional | Contexto, discrepancias o advertencias de identificación. Se conservaron aquí las notas originales. |
| `size` | objeto o `null` | Valor, unidad, máximo o típico, método de medición y fuente. |
| `photo` | objeto o `null` | Fotografía identificada con créditos completos. |
| `sources` | arreglo no vacío | Procedencia, fecha y campos respaldados de cada referencia. |
| `reviewedAt` | `AAAA-MM-DD` | Fecha real de revisión del registro. |

## Tamaño

Ejemplo real utilizado para el caballito del Pacífico:

```js
size: {
  value: 30,
  unit: "cm",
  type: "maximum",
  measurement: "TL",
  sourceUrl: "https://www.fishbase.se/summary/Hippocampus-ingens.html"
}
```

`type` admite `maximum` o `typical`; `unit`, `mm`, `cm` o `m`. La interfaz explica TL y SL; también admite FL u otra descripción explícita del método. La fuente del tamaño debe estar en `sources` e incluir `size` en sus `fields`. No convertir un tamaño habitual en máximo ni trasladar una cifra de otro taxón. Usa `null` cuando no esté verificado.

## Fotografía

`photo` incluye `path`, `alt`, `author`, `license`, `licenseUrl`, `source`. Puede incluir `originalUrl` para el archivo y `changes` para modificaciones o encuadre. `source` debe apuntar a la página con identificación y créditos, y `licenseUrl` a la licencia. `path` debe ser local y relativa. Ningún registro usa una foto remota temporal.

Las fotografías originales y `assets/images/credits.json` se preservan. En la nueva organización, se edita `photo` dentro del registro; la interfaz muestra esos créditos automáticamente. `photo: null` produce el marcador sin iniciar una petición de imagen; los errores de carga de archivos declarados tienen el mismo respaldo.

## Fuentes

Ejemplo real:

```js
{
  title: "FishBase — Hippocampus ingens",
  url: "https://www.fishbase.se/summary/Hippocampus-ingens.html",
  accessedAt: "2026-10-13",
  fields: ["scientificName", "family", "order", "size"]
}
```

`fields` permite ver qué referencia respalda cada parte de una ficha. Consultar una página no da permiso para copiar toda su información ni sus fotografías: textos breves propios y licencias de imagen se revisan por separado. Un nombre común traducido como etiqueta educativa no debe presentarse como denominación oficial de una institución.

## Regiones y grupos

`regions` es un mapa de códigos a etiquetas españolas. No incluye poblaciones introducidas ni afirma cobertura exhaustiva. La interfaz solo ofrece regiones presentes en especies del catálogo. Para este tamaño se utilizan continentes y océanos; la Fase 2 deberá valorar cuencas, países y precisión geográfica.

`groups` es un arreglo independiente. Cada grupo tiene `id`, `name` y `speciesIds`, que referencian identificadores de especies. El grupo inicial «Tiburones» no se incorpora al arreglo `species`, a sus tarjetas ni a su contador. No se deduce pertenencia taxonómica a partir de los nombres comunes.
