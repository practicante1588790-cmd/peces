# Atlas Azul — evaluación de fuentes, licencias e importación

**Fase 2 solamente. Consulta: 13 de octubre de 2026, zona America/Lima.** Los registros de red conservan marcas UTC del 14 de octubre; no se han cambiado las fechas ni las citas que devolvieron los proveedores. Se inspeccionaron código, catálogo, README e informe de Fase 1 antes de trabajar.

El catálogo sigue con 50 especies, 12 fotografías de especies y una portada. No se editaron `index.html`, `style.css`, `script.js`, `data/catalog.js`, bibliotecas del sitio ni `assets`. No se crearon cuentas, contrataron servicios, implementaron bases de datos o backend, ni se publicó el proyecto.

## Decisión recomendada

Usar **Catalogue of Life Base, con versión fijada**, para la identidad taxonómica transversal; **WoRMS** como cotejo especializado, especialmente marino; **GBIF** para correspondencias y evidencia de ocurrencia claramente separada de distribución nativa; **FishBase** como complemento biológico sujeto a sus condiciones y referencias originales; **Wikimedia Commons** para una búsqueda de fotografías independiente y revisada por archivo.

La prueba fijó **Annual Checklist 2025, dataset 310463**, para reproducibilidad; no lo presenta como la versión más reciente. Antes del primer lote se deberá escoger y registrar una versión Base vigente, su licencia y DOI. Las incorporaciones XR son útiles como candidatas, pero no se equiparan automáticamente a las entradas revisadas de Base. La documentación oficial explica esa distinción y la permanencia de versiones anuales, frente a la retención limitada de mensuales. [COL: descargas y versiones](https://www.catalogueoflife.org/data/download), [composición del catálogo](https://www.catalogueoflife.org/building/assembly).

Ninguna fuente se considera completa ni suficiente para taxonomía, biología, distribución y fotografías a la vez. Esta es una estrategia editorial y técnica; **no autoriza la importación automática de los resultados**.

## Comparación de fuentes

| Fuente | Información, cobertura y límites | Identidad y español | Acceso y formatos |
| --- | --- | --- | --- |
| **GBIF** | Checklists, nombres, observaciones y especímenes de proveedores distintos. Hay sesgos de muestreo y calidad variable. Una coordenada confirma, como máximo, evidencia de un registro interpretado, no origen nativo. | `usageKey`, `acceptedUsageKey` y `datasetKey`; conservar estado, rango y diagnósticos. Vernáculos con idioma y procedencia; la muestra obtuvo español, pero no uniformemente ni sin duplicados. | API REST JSON. Se probó `/v1/species/match`, padres y vernaculares, no descargas de ocurrencias. Los archivos de datos pueden usar Darwin Core Archive. Documentación: [API oficial](https://techdocs.gbif.org/en/openapi/), [Species API](https://techdocs.gbif.org/en/openapi/v1/species), [uso de datos](https://techdocs.gbif.org/en/data-use/). |
| **Catalogue of Life / ChecklistBank** | Clasificación, conceptos aceptados, sinónimos, referencias y vernaculares aportados por sus sectores. Base prioriza revisión; XR amplía cobertura programáticamente. No es una guía universal de hábitat o dieta. | El par `datasetKey` + ID de uso taxonómico identifica el registro de una versión. Distingue usos aceptados, sinónimos y nombres sin ubicación. El español depende de las fuentes; no se comprobó una lista española completa. | API pública JSON y formatos de intercambio ColDP, DwCA y TextTree. Fijar una versión concreta, no usar un alias móvil como identidad permanente. [API COL](https://www.catalogueoflife.org/tools/api), [guía oficial de ChecklistBank](https://github.com/CatalogueOfLife/backend/blob/master/API.md). |
| **WoRMS** | Taxonomía, referencias, atributos y distribuciones de alcance principalmente marino y registros asociados. `marine_only=false` permitió encontrar también los dulceacuícolas de la muestra; eso no demuestra cobertura continental completa. | `AphiaID`, LSID y `valid_AphiaID` enlazan un nombre con el aceptado. Hay estados no aceptados y marcadores de ambiente. Soporta vernaculares; ninguno de los tres ejemplos revisados devolvió español. | REST JSON y SOAP; se usaron búsquedas exactas por nombre y vernaculares. API de clasificación, fuentes y modificaciones disponible, pero no probada en su totalidad. [Servicios oficiales](https://www.marinespecies.org/aphia.php?p=webservice), [OpenAPI](https://www.marinespecies.org/rest/). |
| **FishBase** | Datos centrados en peces: nombres, distribución, ambiente, rasgos, dieta y biología. Distinguir especie, población, ejemplar, método y referencia; no todos los valores son comparables. | `SpecCode` relaciona especies y tablas; sinónimos y nombres comunes tienen sus propios registros. Hay nombres españoles con cobertura irregular. No se obtuvieron IDs mediante su API en esta prueba. | La API histórica documenta JSON y filtros. `rfishbase` actual utiliza tablas Parquet en Source Cooperative/S3; no es la misma API. No se instaló R ni se descargaron tablas completas. [API histórica](https://fishbaseapi.readme.io/reference/species), [rfishbase mantenido](https://docs.ropensci.org/rfishbase/). |
| **Wikimedia Commons** | Archivos multimedia y metadatos. Una búsqueda puede devolver un pez parecido, un dibujo, una sección microscópica o un depredador con una presa. Su cobertura fotográfica es desigual. | `pageid`, título, SHA-1 y página original; no sustituye una autoridad taxonómica. Captions y descripciones pueden tener varios idiomas, sin garantía de español. | Action API: `query`, `generator=search`, `imageinfo`, `extmetadata`, URLs de originales y miniaturas. Consultas limitadas al namespace de archivos. [Search](https://www.mediawiki.org/wiki/API:Search), [Imageinfo](https://www.mediawiki.org/wiki/API:Imageinfo). |

### Acceso gratuito, autenticación y límites

| Fuente | Autenticación | Límites y uso permitido relevantes |
| --- | --- | --- |
| GBIF | Lecturas usadas sin cuenta. Las descargas asincrónicas y operaciones de escritura requieren autenticación según la operación. No se usaron. | El límite de búsquedas depende de carga; HTTP 429 exige reducir ritmo. No hay una tasa fija universal garantizada. Usar la API apropiada y no raspar el portal para reemplazarla. [Referencia y límites](https://techdocs.gbif.org/en/openapi/), [restricciones de acceso](https://www.gbif.org/restricted). |
| COL | La mayoría de lecturas son anónimas. Descargas personalizadas, trabajos de matching masivo y escritura necesitan cuenta GBIF/ChecklistBank. | La guía restringe paginación a 100.000 registros; eso no es permiso de cosecha ilimitada. No se encontró una cuota pública fija de solicitudes por minuto en la documentación revisada. [Guía API](https://github.com/CatalogueOfLife/backend/blob/master/API.md). |
| WoRMS | Los GET usados no pidieron autenticación. | No cosechar toda WoRMS mediante los servicios. La redistribución de la base completa necesita acuerdo escrito; una aplicación a gran escala exige revisar el alcance y condiciones. No se encontró una cuota fija por minuto. [Webservices](https://www.marinespecies.org/aphia.php?p=webservice), [condiciones](https://www.marinespecies.org/about.php). |
| FishBase | La documentación histórica indica API sin autenticación. No se pudo comprobar una respuesta de datos válida. | No se encontró cuota documentada fija; el problema observado fue TLS. No se desactivó la comprobación de certificados ni se cambió a HTTP para eludirlo. [Autenticación](https://fishbaseapi.readme.io/reference/authentication), [parámetros](https://fishbaseapi.readme.io/reference/parameters). |
| Commons | Lectura pública sin cuenta; no se realizó ninguna edición o subida. | Peticiones secuenciales, caché, `maxlag`, respuesta a limitaciones y User-Agent identificable. No se inventa contacto del operador. Los límites pueden cambiar y no se deben eludir. [Etiqueta API](https://www.mediawiki.org/wiki/API:Etiquette), [política de uso](https://foundation.wikimedia.org/wiki/Policy:Wikimedia_Foundation_API_Usage_Guidelines), [User-Agent](https://foundation.wikimedia.org/wiki/Policy:User-Agent_policy). |

Los intervalos de **2 segundos**, máximo de **90 solicitudes de API por ejecución**, timeout de **12 segundos** y hasta **3 intentos** son límites conservadores de nuestra herramienta, no cuotas prometidas por los proveedores. Si `Retry-After` exige más de 30 segundos, se deja pendiente sin reintentar antes de ese tiempo. Se reconoce también `maxlag` cuando aparece dentro de una respuesta HTTP 200.

La ejecución inicial identificó el cliente por nombre, sin contacto público del operador. Al completar la revisión de la política de Wikimedia se corrigió la herramienta: las siguientes solicitudes nuevas a Wikimedia exigen `ATLAS_SOURCE_USER_AGENT` con una URL pública o correo real. Las respuestas ya guardadas se pueden consultar sin red. No se creó una cuenta ni se inventó una dirección para completar ese campo.

### Licencias concretas y atribución

| Recurso evaluado | Licencia comprobada y alcance | Atribución / decisión |
| --- | --- | --- |
| **GBIF Backbone Taxonomy**, UUID `d7dddbf4-2cf0-4f39-9b2a-bb099caae36c` | La API de metadatos devolvió `http://creativecommons.org/licenses/by/4.0/legalcode`. Esto corresponde al dataset consultado, no a toda observación o fotografía disponible en GBIF. | Conservar dataset, productor, DOI `10.15468/39omei` y cita devuelta. Para otra fuente, comprobar su licencia de nuevo. [Metadatos exactos](https://api.gbif.org/v1/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c), [acuerdo de uso](https://www.gbif.org/terms/data-user). |
| **COL Annual Checklist 2025**, dataset `310463`, DOI `10.48580/dgr6n` | Metadatos: `license: "cc by"`; el valor no explicita versión. El portal ofrece CC BY 4.0 salvo excepciones y el modelo ColDP contempla CC-BY-4.0 para COL. Se conserva el valor literal y se debe comprobar la licencia del manifiesto del lote futuro, sin rellenar versiones por suposición. | Preservar la cita de Bánki y colaboradores, versión, DOI y sectores. No presentar la licencia del pie del sitio como licencia de cada foto. [Metadatos de la versión](https://api.checklistbank.org/dataset/310463), [API COL](https://www.catalogueoflife.org/tools/api), [modelo oficial de metadatos](https://github.com/CatalogueOfLife/coldp/blob/master/metadata.yaml). |
| **WoRMS**, registros individuales de la muestra | El enlace de sus condiciones para texto conduce a **CC BY 4.0**; comprobar excepciones de la página concreta. Imágenes: por defecto **CC BY-NC-SA 4.0**, salvo declaración individual distinta. Sigue existiendo la condición específica sobre redistribuir la base completa. | Guardar `citation` de cada registro, fuente o subregistro y fecha. Cita general: WoRMS Editorial Board, año, VLIZ, DOI `10.14284/170`. Las citas automáticas pueden usar fecha UTC distinta de la fecha local de consulta. [Condiciones y citas](https://www.marinespecies.org/about.php). |
| **FishBase web / API histórica** | El sitio consultado indica **CC BY-NC 4.0**; la documentación histórica de API dice **CC BY-NC 3.0 Unported**. No se obtuvo un snapshot que resuelva qué versión rige ese recurso. No se considera una licencia comercial general. | Referencia específica del dato y cita de Froese/Pauly con versión. Fotografías y dibujos pertenecen a los autores indicados y tienen sus propias condiciones. La discrepancia queda pendiente antes de automatizar reutilización. [Sitio y copyright](https://www.fishbase.se/), [licencia API](https://fishbaseapi.readme.io/reference/license). |
| **Commons: cinco archivos retenidos** | CC BY 2.0, CC BY-SA 3.0, CC BY-SA 4.0, CC BY-SA 2.5 y CC0 1.0, detalladas abajo. La licencia del archivo es independiente del texto de su página y de los datos estructurados. | Autor real, título cuando corresponda, página, enlace a condiciones y cambios. Para SA, conservar obligaciones de adaptaciones; no asumir que obliga a licenciar toda la interfaz igual. CC0 no exige atribución por copyright, pero mantenemos procedencia. [Reutilización en Commons](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia), [CC BY](https://creativecommons.org/licenses/by/4.0/), [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/), [CC0](https://creativecommons.org/publicdomain/zero/1.0/). |

Los datasets de ocurrencias de GBIF pueden declarar CC0, CC BY o CC BY-NC; no se probó un dataset de ocurrencias aquí. Se deben conservar licencias por dataset y por elemento multimedia, además de autoría y procedencia. Que una lectura no cueste dinero no significa que cualquier combinación de datos pueda redistribuirse bajo una licencia única. [Política de licencias GBIF](https://www.gbif.org/terms?preview=true).

El documento de ejemplo de ColDP contiene valores de ejemplo de FishBase: **no se interpreta su `license: CC0-1.0` como una nueva licencia de todo FishBase**. Tampoco se atribuye la licencia de código de `rfishbase` a los datos que consulta.

## Prueba real y aislada

Herramienta: [`tools/evaluate-sources.cjs`](../tools/evaluate-sources.cjs), con cliente y evaluación semántica en `tools/phase-2/`. Todo resultado queda en `evaluation/phase-2/`; el navegador no carga esos archivos.

Se eligieron **ocho especies existentes**, sin cambiar sus IDs. Se solicitaron metadatos de dos datasets, matching exacto en COL/GBIF/WoRMS, padres de GBIF y un pequeño muestreo de vernaculares. No se consultaron coordenadas ni se descargaron datasets completos.

| ID interno conservado | Especie | Ambientes existentes | COL `310463` | GBIF | AphiaID |
| --- | --- | --- | --- | --- | --- |
| `clownfish` | Amphiprion ocellaris | Marino | `D55Y` | `5212106` | `278400` |
| `seahorse` | Hippocampus ingens | Marino; Pacífico hasta Perú | `3LZM9` | `5201050` | `275197` |
| `engraulis-ringens` | Engraulis ringens | Marino; Perú | `39TNG` | `2414014` | `272287` |
| `gamitana` | Colossoma macropomum | Dulceacuícola; Amazonía | `X8BJ` | `2353152` | `1020122` |
| `paco` | Piaractus brachypomus | Dulceacuícola; Amazonía | `4HPKY` | `2353225` | `1022721` |
| `betta` | Betta splendens | Dulceacuícola | `LP2V` | `2393998` | `862539` |
| `salmon-del-atlantico` | Salmo salar | Dulceacuícola, salobre y marino | `6XCXT` | `7595433` | `127186` |
| `trout` | Oncorhynchus mykiss | Dulceacuícola, marino y salobre | `49JFF` | `5204019` | `127185` |

La correspondencia propuesta se guarda en [`external-id-map.json`](../evaluation/phase-2/external-id-map.json), **fuera del catálogo activo**, con dataset, ID aceptado, consulta y evidencia de caché. Los IDs internos no cambian aunque un proveedor modifique el nombre aceptado o se divida un concepto.

### Resultados y cautelas observadas

- **24 respuestas taxonómicas interpretables**, ocho por servicio; ninguna se importa. COL y WoRMS dieron 16 candidatos de nombre exacto, rango especie, estado aceptado y linaje compatible con peces. Siguen con `reviewRequired: true` y `importApproved: false`.
- GBIF devolvió nombres exactos y aceptados para las ocho, pero ni matching ni padres de esta muestra incluyeron una clase o clado de peces. El evaluador conservador las dejó como **`needs-review`**. No convierte «Chordata» por sí solo en prueba de que sea un pez.
- Se detectaron **dos conflictos de orden**: el pez payaso tiene `Perciformes` en GBIF y `Ovalentaria incertae sedis` en WoRMS; COL no aporta orden para esa respuesta. Betta tiene `Perciformes` en GBIF frente a `Anabantiformes` en COL y WoRMS. No se modificó la taxonomía visible ni se convirtió una agrupación de posición incierta en un orden formal.
- No se observó una respuesta múltiple ambigua en los ocho nombres de esta ejecución. Los casos de sinónimos, coincidencia difusa, rango superior y varias respuestas se probaron **con fixtures sintéticos**, identificados como tales; no se presentan como resultados consultados al proveedor.
- El muestreo de español obtuvo nombres en GBIF para payaso, anchoveta y gamitana. Para gamitana, GBIF incluye también «Paco»: un nombre común no es una clave única. WoRMS no devolvió español para esas tres consultas; no se generaliza esa ausencia a toda la base.
- COL, GBIF y WoRMS pueden compartir fuentes taxonómicas. Los metadatos anuales de COL mencionan FishBase vía Aphia/VLIZ: tres servicios coincidentes no equivalen a tres revisiones científicas independientes.
- La consulta a `https://fishbase.ropensci.org/species?Genus=Engraulis&Species=ringens&limit=1` falló por **`DEPTH_ZERO_SELF_SIGNED_CERT`**. Hubo tres intentos en el sondeo inicial; se corrigió el cliente para no reintentar errores de certificado permanentes. No se desactivó TLS. Su respuesta de datos y `SpecCode` quedan pendientes.

Evidencia: [sondeo y fallo FishBase](../evaluation/phase-2/probe.json), [ejecución con búsquedas completas](../evaluation/phase-2/run-2026-10-14T00-15-30-076Z.json), [reproducción offline](../evaluation/phase-2/run-2026-10-14T00-17-08-881Z.json). Los archivos de `cache/` conservan URL, fuente, hora, HTTP y cuerpo JSON. La consulta de páginas oficiales mediante navegador de investigación se registra con los enlaces de este informe; no se confunde con una respuesta de API almacenada.

### Criterios de identificación y alcance

Requerir rango **especie**, estado aceptado y evidencia de linaje de peces. El alcance propuesto incluye peces con aletas radiadas, cartilaginosos, dipnoos, celacantos, mixinos y lampreas; excluye tetrápodos, invertebrados y grupos superiores. No utilizar `Animalia`/`Chordata`, la palabra «pez» o un nombre de familia aislado como único criterio.

En un futuro lote se deben fijar los **IDs de clados** en la versión elegida y revisarlos antes de extraer descendientes; los nombres de clados del evaluador son solo una comprobación conservadora de esta muestra. Excluir extintos confirmados del primer lote, híbridos y registros de rango incierto; desconocido no equivale a falso. No se intentó cobertura completa de estos grupos.

Los sinónimos se conservan como relaciones hacia el concepto aceptado, no como nuevas especies. Un sinónimo no resuelto o un homónimo sin autoría suficiente permanece pendiente. Desduplicar por concepto aceptado y versión; el nombre normalizado sirve para detectar conflictos, no para fusionar automáticamente. Antes de aprobar una correspondencia revisar nombre, autoridad, rango, linaje y literatura relevante, no solo HTTP, puntuación o número de coincidencias.

## Cinco fotografías candidatas

Se buscaron seis especies para conservar cinco candidatas y descartar la fotografía de paco que no permite resolver el concepto revisado. Se revisaron páginas originales, metadatos y **miniaturas de 500 píxeles**. No se descargaron originales ni se incorporó ninguna imagen a la web. Las seis miniaturas, incluida la descartada, permanecen únicamente en `evaluation/phase-2/previews` como evidencia.

| Especie / ID | Página original y archivo | Autor y licencia exacta | Evidencia y limitación |
| --- | --- | --- | --- |
| **Gamitana — Colossoma macropomum** / `gamitana` | [Página](https://commons.wikimedia.org/wiki/File:Colossoma_macropomum_-_Flickr_-_Dick_Culbert.jpg) · [JPG](https://upload.wikimedia.org/wikipedia/commons/8/8c/Colossoma_macropomum_-_Flickr_-_Dick_Culbert.jpg) | Dick Culbert, de Gibsons, B.C., Canadá · [CC BY 2.0 Generic](https://creativecommons.org/licenses/by/2.0/) | Binomio en título y metadatos del archivo; licencia de Flickr revisada por Commons. Foto de ejemplar cautivo en Panamá: no implica distribución nativa allí. |
| **Pez cebra — Danio rerio** / `pez-cebra` | [Página](https://commons.wikimedia.org/wiki/File:Danio_rerio.JPG) · [JPG](https://upload.wikimedia.org/wikipedia/commons/e/e8/Danio_rerio.JPG) | Pogrebnoj-Alexandroff · [CC BY-SA 3.0 Unported](https://creativecommons.org/licenses/by-sa/3.0/) | Título y descripción multilingüe identifican el binomio; cámara y miniatura muestran peces fotografiados. La página declara explícitamente CC BY-SA; EXIF conserva una etiqueta antigua «All Right Reserved». Mantener prueba de la declaración de licencia y revisar antes de uso final. |
| **Lubina europea — Dicentrarchus labrax** / `dicentrarchus-labrax` | [Página](https://commons.wikimedia.org/wiki/File:Dicentrarchus_labrax_LoroParqueTenerife_seabass_IMG_4959.JPG) · [JPG](https://upload.wikimedia.org/wikipedia/commons/5/5f/Dicentrarchus_labrax_LoroParqueTenerife_seabass_IMG_4959.JPG) | Bjoertvedt · [CC BY-SA 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) | Descripción del autor identifica la especie en el acuario Loro Parque. La miniatura muestra un ejemplar completo. La localización del acuario no determina origen nativo. |
| **Lucio — Esox lucius** / `lucio` | [Página](https://commons.wikimedia.org/wiki/File:Esox_Lucius.JPG) · [JPG](https://upload.wikimedia.org/wikipedia/commons/9/9c/Esox_Lucius.JPG) | Georg Mittenecker · [CC BY-SA 2.5 Generic](https://creativecommons.org/licenses/by-sa/2.5/) | Descripción bilingüe identifica el lucio del Maretarium de Finlandia. Hay otras especies al fondo: la futura ficha debe señalar al ejemplar en primer plano. |
| **Perca europea — Perca fluviatilis** / `perca-europea` | [Página](https://commons.wikimedia.org/wiki/File:Perche_commune_perca_fluviatilis_Alfort.jpg) · [JPG](https://upload.wikimedia.org/wikipedia/commons/6/65/Perche_commune_perca_fluviatilis_Alfort.jpg) | Jebulon · [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) | Descripción identifica un ejemplar naturalizado del Museo Fragonard, Alfort. Es fotografía de un espécimen preservado; no presentarlo como pez vivo. El archivo también tiene identificación estructurada de Perca fluviatilis. |

Los enlaces de archivo deben verificarse contra los metadatos guardados antes de cualquier incorporación; la evidencia canónica es [`photo-candidates.json`](../evaluation/phase-2/photo-candidates.json), con URL exacta, autor, licencia, SHA-1, fecha, miniatura y decisiones. La identificación se apoya en la declaración específica del archivo y en revisión de miniatura, **no en una certificación taxonómica independiente**. No se autoriza una importación automática por superar un filtro de metadatos.

### Atribución propuesta

Para cada foto BY/BY-SA: **«Título del archivo — Autor, licencia exacta, vía Wikimedia Commons. Página original y enlace a la licencia. Cambios: [descripción real de los cambios, si los hay]».** `photo-candidates.json` contiene la línea específica para cada archivo. Debe conservarse el título indicado en las licencias anteriores a 4.0, respetar las indicaciones del autor y declarar adaptaciones cuando corresponda. Para CC0, conservar autor y enlace como buena práctica de procedencia aunque no sea requisito de atribución por copyright.

Las líneas guardadas dicen «Sin modificaciones en esta evaluación» porque los originales no se editaron. No copiar esa frase a una futura imagen que haya sido recortada, retocada o transformada sin revisar las condiciones. La licencia de un archivo SA y la de una eventual adaptación se gestionan por separado de la interfaz. [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/).

### Descartes documentados

- `Piaractus sp, Zoo Leipzig 01.jpg`: solo identifica el género; no sirve para gamitana ni paco.
- `Schwarzer Pacu Piaractus Tierpark Hellabrunn-1.jpg`: descripción Colossoma, título/categoría Piaractus; conflicto explícito.
- `Piaractus brachypomus in Minsk Zoo 02.JPG`: licencia CC BY-SA 3.0 clara, pero foto anterior a 2019 sin procedencia del ejemplar. No permite resolver con seguridad el concepto amazónico tras separar P. orinoquensis; descartada para incorporación hasta evidencia adicional. La redescripción estaba registrada en Fase 1: [referencia primaria](https://pubmed.ncbi.nlm.nih.gov/31017302/).
- `Zebrafish 30hpf larvae.tif`: identifica Danio y tiene licencia, pero es TIFF microscópico; no se propone como fotografía representativa de la tarjeta. Esto no equivale a identificación falsa.
- `Zebrafisch.jpg`: permiso de tipo «Copyrighted free use», excluido por la política conservadora de esta prueba; no se declara ilegal ni automáticamente inválido. Requiere evaluar sus condiciones específicas por separado.
- Imágenes de anatomía, aves con peces y otros resultados sin binomio específico se excluyeron. «Dominio público» sin condiciones verificadas en los metadatos también se dejó fuera del filtro automático; no significa que todo archivo PD deba descartarse.

El JSON conserva 16 descartes de filtro o revisión, con motivos y enlaces; no se borró ninguna evidencia. La selección y descartes manuales permanecen separados de los resultados automáticos para que una repetición no los sobrescriba.

## Cómo combinar fuentes sin perder correcciones

### Procedencia por campo propuesta para Fase 3

Cada valor importable debe tener su propia evidencia, no solo una lista de enlaces al final de la especie. Propuesta conceptual, **no implementada**:

```text
internalId
fieldPath                         # e.g. nativeDistribution[0].region
value / unit / measurement / locale
sourceName / sourceDatasetKey / sourceRecordId
sourceVersion / sourceUrl / originalReference / DOI
licenseCode / licenseUrl / licenseEvidence
retrievedAt / sourceModifiedAt / evidenceHash
transformation                    # translation, unit conversion, concise editorial summary
scope                             # species, population, specimen, life stage
reviewStatus / reviewedBy / reviewedAt
manualOverride / locked / justification
```

Una distribución debe conservar región o cuenca, si es nativa, introducida o incierta, periodo y referencia que afirma ese origen. No derivarla de una observación, coordenada, fotografía de acuario o banderas de salinidad. Las ocurrencias de GBIF, si se añaden después, deberán ir en un recurso separado y señalar evidencia observacional y sus incertidumbres.

El tamaño debe guardar típico/máximo, unidad, TL/SL/FL, sexo o etapa cuando la fuente los distingue. Dieta y hábitat no se extrapolan desde una población o un ejemplar a toda la especie sin revisión. Nombres comunes necesitan idioma y, cuando se conozca, región de uso; no elegir automáticamente el primer nombre español devuelto.

### Actualización propuesta

1. Conservar la última respuesta original, versión y hash del valor importado. Una nueva consulta crea otra instantánea y un candidato de actualización.
2. Comparar el valor anterior del proveedor, el nuevo y el valor editorial vigente. Si este último tiene corrección manual o bloqueo, mantenerlo y registrar el cambio como conflicto, sin sobrescribirlo.
3. Las fusiones y divisiones taxonómicas crean relaciones entre conceptos y una tarea de revisión. Mantener los IDs de Atlas Azul; no reciclar IDs para representar un taxón distinto ni fusionar por nombre común.
4. Ausencia en una nueva fuente, respuesta vacía o HTTP 204 no implica extinción, inexistencia ni permiso para borrar. Un campo incompleto se mantiene pendiente.
5. Aprobar cambios por campo con responsable, fecha, motivo y referencias. Conservar historial y posibilidad de revertir el lote. Actualizar atribución y licencia junto al dato aprobado.

### Conflictos y registros incompletos

La cola de revisión debe separar ambigüedad de nombres, conflicto taxonómico, licencia no resuelta, información insuficiente y archivo no identificado. No resolver por mayoría de servicios: pueden compartir la misma fuente de origen. Priorizar una revisión taxonómica especializada y reciente que trate el concepto concreto; registrar por qué se aparta de COL, si corresponde.

En la muestra, las diferencias de orden de payaso y betta no autorizan a cambiar las fichas automáticamente. Para paco, la literatura que delimita el concepto actual prima sobre una distribución antigua de Orinoco o una foto de acuario sin procedencia. Si falta evidencia, conservar campo vacío o «Información no disponible» y dejar el registro fuera del lote aprobado.

### Papel de las fuentes complementarias

- **Distribución nativa:** referencias curadas que la declaren expresamente; revisar las fuentes biológicas actuales y registros de distribución con estado y referencia. WoRMS puede aportar distribuciones, pero no todas equivalen a una declaración de origen. El endpoint de distribuciones no se evaluó aquí.
- **Hábitat, dieta y tamaño:** FishBase y referencias primarias, con método y licencia del recurso concreto. Por ahora, conservar la curación existente. El acceso Parquet actual no se probó y la API histórica falló; no hay importación biológica comprobada que recomendar como lista para ejecutar.
- **Identidad:** COL Base fijado; WoRMS como cotejo y literatura especializada para excepciones. GBIF aporta enlace útil, pero la muestra aconseja revisión de su linaje y clasificación antes de usarlo como autoridad principal.
- **Fotografías:** flujo separado, archivo individual y autor real. Priorizar CC0/CC BY o CC BY-SA cuando se puedan cumplir sus condiciones. No usar como atajo la licencia de GBIF, FishBase o WoRMS para todo su contenido visual.

## Primer lote posterior propuesto

Primero reconciliar **las ocho especies de la muestra**, sin añadir especies: aprobar sus correspondencias, resolver los dos conflictos, comprobar licencia/versiones y completar evidencia por campo. En una fase de incorporación posterior, evaluar las cinco fotografías retenidas con sus advertencias y captions; paco seguirá sin foto hasta resolver la identificación.

Después, preparar un lote máximo de **20 especies nuevas**, con reparto editorial orientativo entre marinas, continentales y migratorias, incluyendo Perú/Amazonía. La lista exacta se decidirá contra una versión fijada y fuentes biológicas utilizables. Cada candidata debe cumplir: nombre aceptado y linaje, deduplicación, licencia documentada, procedencia por campo, revisión y validador. Una foto ausente no se sustituye por una de otra especie; un conflicto no resuelto impide aprobar ese campo o el registro si afecta su identidad.

No se descargaron archivos completos ni se creó ese lote. Antes de una importación a escala se deberán confirmar condiciones vigentes y autorización de mecanismos más amplios; no se propone recorrer APIs de consulta para reconstruir las bases completas.

## Requisitos concretos de Fase 3

1. Modelar especie interna, conceptos taxonómicos versionados, correspondencias externas y relaciones de sinónimos/fusiones/divisiones; claves independientes del nombre común.
2. Separar afirmaciones biológicas, distribución nativa/introducida, observaciones y multimedia. Mantener procedencia y licencia por campo/archivo.
3. Reservar un área de evaluación y cola de revisión separadas de producción; ninguna respuesta externa se publica por recibir HTTP 200.
4. Implementar historial, correcciones manuales bloqueables, comparación de tres vías y reversión de lotes.
5. Diseñar búsqueda/paginación mediante API manteniendo el contrato y la interfaz de Fase 1. No se implementa en esta entrega.
6. Añadir caché, tiempos de espera, límites configurables por proveedor, `Retry-After`, registro de errores, verificación de certificados y credenciales solo si un mecanismo autorizado las necesita.
7. Controlar licencias por versión y por archivo; construir atribuciones y exports que no atribuyan una licencia uniforme a recursos incompatibles o pendientes.
8. Extender validación a conceptos, procedencia, unidades, idioma, rango, clados, licencias y estado de revisión. Los tests de fixtures deben distinguirse de consultas reales.
9. Confirmar versión de COL para el lote, la transición/API de matching de GBIF que se vaya a usar, condiciones de WoRMS al aumentar el alcance y recurso concreto de FishBase. Ninguno de esos accesos futuros se da por garantizado.
10. Evaluar infraestructura y costes antes de escoger proveedores. No se recomienda un servicio de pago ni se ha contratado ninguno.

## Ejecutar y reproducir la evaluación

Herramientas de Node con módulos integrados, sin npm ni dependencia del sitio:

```text
node tools/evaluate-sources.cjs --offline
node --test tests/phase-2.test.cjs
node tools/validate-catalog.cjs
```

`--offline` exige reutilizar caché; una consulta no guardada se registra como pendiente. El comando sin ese indicador usa caché con vigencia de 30 días para respuestas válidas y 6 horas para errores. No cambia la fecha original de consulta al reproducir datos. Genera un nuevo `run-*.json` y no sobrescribe decisiones manuales. `--probe` ejecuta únicamente el sondeo documentado, incluido el intento a la API histórica FishBase.

Para nuevas consultas a Wikimedia, configurar `ATLAS_SOURCE_USER_AGENT` con nombre y versión del cliente y **contacto real del operador**. No escribir una dirección ficticia ni reutilizar la de un proveedor. `tools/phase-2/review-photos.cjs` permite preparar las miniaturas de las cinco candidatas fijadas; reutiliza vistas previas con hash verificado, no sobrescribe archivos y nunca toca `assets`.

Las decisiones revisadas están en `photo-candidates.json`; el generador de miniaturas crea evidencias pendientes separadas, no revoca ni reemplaza esas decisiones. La caché contiene metadatos y cuerpos de respuesta sujetos a sus fuentes: no se propone servirla públicamente como un dataset independiente.

## Verificación y límites finales

- Validador existente: **50 especies, 1 grupo separado, 0 errores y 38 avisos esperados** por imágenes pendientes.
- **9 pruebas nuevas aprobadas**: allowlist de GET, caché/offline, `Retry-After`, errores de API dentro de HTTP 200, TLS, contacto de User-Agent, rangos/sinónimos/linajes, ambigüedad y licencias fotográficas. Las respuestas sintéticas no cuentan como consultas de especies.
- Reproducción offline real: ocho especies, **0 solicitudes de red**, mismos identificadores externos.
- Se conserva un manifiesto SHA-256 de **21 archivos de producción**, incluidas todas las imágenes y créditos originales, para comprobar que esta fase no los alteró.
- Comparación final: **21 archivos sin diferencias**, registrada en [verification.json](../evaluation/phase-2/verification.json).
- No se repitieron pruebas visuales del sitio porque la interfaz no cambió. La revisión visual se limitó a fotografías candidatas aisladas.
- FishBase API quedó bloqueada por certificado; sus datos y límites efectivos no fueron comprobados. No se probó el acceso S3/Parquet, una API de ocurrencias, matching de v2 de GBIF ni descargas autenticadas.
- No se garantiza cobertura mundial, identificación científica independiente de las fotos, español para toda especie ni vigencia perpetua de APIs y enlaces. Las cinco fotos son candidatas documentadas, no activos publicados ni aprobados automáticamente.

El siguiente paso es revisar estos requisitos para **Fase 3**, cuando se solicite. No se inició esa fase.
