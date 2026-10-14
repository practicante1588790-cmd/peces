# Entrega de Fase 1

Fecha: 13 de octubre de 2026. Proyecto local, sin publicación ni despliegue.

## Alcance implementado

50 especies individuales con fuentes específicas y fechas de consulta: 12 conservadas y revisadas, 19 marinas nuevas y 19 continentales o migratorias nuevas. Entre los registros peruanos y amazónicos están anchoveta, bonito del Pacífico, paiche, gamitana, paco, boquichico y arahuana plateada.

Se incorporaron modelo de datos separado, identificadores estables, nombres alternativos, taxonomía cuando fue cotejada, varios ambientes, distribución nativa e introducida, tamaños con unidad y método, procedencia por campo y grupos independientes de las especies. Se preservó la información contextual inicial.

Búsqueda y filtros actúan sobre toda la colección antes de paginar. La página dibuja como máximo 12 tarjetas. Hay filtros combinados por ambiente y región nativa, orden alfabético común o científico, limpieza de filtros, contador real, estado de página y navegación directa a una página. Todos los cambios de búsqueda, filtro u orden reinician la página; los límites se ajustan y los resultados vacíos tienen restablecimiento.

## Fotografías y campos pendientes

Las 12 fotografías de especies y la portada originales se mantienen, al igual que los créditos originales. Las 38 especies nuevas tienen `photo: null`. No se descargaron fotografías masivamente ni se sustituyeron por imágenes de otro taxón.

En la revisión quedaron vacíos dos campos de familia, quince de orden y una dieta; 29 registros tienen un tamaño verificado. Los otros campos opcionales desconocidos se muestran como «Información no disponible». Las fuentes de cada ficha explican qué información respaldan. Un registro verificado no significa que cada campo posible esté completo.

La clasificación y los nombres aceptados siguen las referencias consultadas. La revisión editorial no equivale a validar todos los registros de una autoridad taxonómica global. Las regiones son resúmenes amplios, no cobertura mundial exhaustiva. Los enlaces externos pueden sufrir errores temporales o cambiar después de la consulta.

## Evidencia del diseño conservado

Antes de editar se capturó el proyecto desde la copia protegida, sin depender de capturas de otra conversación. Las reglas CSS originales se conservaron íntegramente y se comprobó que el archivo actual empieza con el contenido original; el bloque añadido contiene únicamente estilos para los nuevos controles y soporte de etiquetas de ambientes múltiples.

Se compararon 12 propiedades de 10 componentes en vistas de escritorio y móvil: colores, fondo, tipografía, tamaño y peso de texto, interlineado, bordes, radios, padding, gap, sombras y proporciones. No se encontraron cambios en esas propiedades de los componentes originales. Se equipararon únicamente las representaciones CSS equivalentes de una sombra completamente transparente y `none` al terminar una transición.

Capturas disponibles:

| Vista | Antes | Después |
| --- | --- | --- |
| Portada y encabezado de escritorio | [Antes](verification/before-desktop.png) | [Después](verification/after-desktop.png) |
| Portada móvil | [Antes](verification/before-mobile.png) | [Después](verification/after-mobile.png) |
| Tarjeta de escritorio | [Antes](verification/before-card-desktop.png) | [Después](verification/after-card-desktop.png) |
| Tarjeta móvil | [Antes](verification/before-card-mobile.png) | [Después](verification/after-card-mobile.png) |
| Ficha de escritorio | [Antes](verification/before-dialog-desktop.png) | [Después](verification/after-dialog-desktop.png) |
| Ficha móvil | [Antes](verification/before-dialog-mobile.png) | [Después](verification/after-dialog-mobile.png) |

Las fichas mantienen sus contenedores, tipografía, imagen y estilo de detalles; ahora tienen más campos y por ello más contenido desplazable. Las diferencias de contenido, controles y foco en las capturas no se presentan como una comparación de píxeles idénticos de toda la página.

Los archivos originales de fotografías y créditos se comprobaron con SHA-256 contra el manifiesto del backup, sin diferencias.

## Verificación ejecutada

- `node tools/validate-catalog.cjs`: 50 especies, un grupo independiente, 0 errores y 38 avisos esperados de imágenes pendientes.
- `node --test tests/catalog.test.cjs`: 8 pruebas aprobadas; casos de búsqueda con tildes y aliases, combinaciones de ambientes y regiones, orden, paginación, límites, duplicados, campos ausentes, fuentes, fechas y rutas inválidas.
- Sintaxis de los cuatro scripts del navegador comprobada con `node --check`.
- Chrome con vistas de 360, 390, 768 y 1440 píxeles, apertura por `file://` y por HTTP local.
- Las cinco páginas recorren las 50 especies una sola vez, sin duplicados ni más de 12 tarjetas simultáneas.
- Apertura de las 50 fichas, navegación con Tab y Shift+Tab, cierre con Escape, botón de cierre y devolución del foco.
- Reinicio de paginación al buscar, filtrar u ordenar; búsquedas vacías o sin resultados, restablecimiento y límites de página.
- Filtros de región nativa independientes de menciones de distribución introducida. Especies con varios ambientes incluidas en cada filtro correspondiente.
- Menú móvil, ausencia de desbordamiento horizontal, preferencia de movimiento reducido y respaldo tanto de fotografías ausentes como de errores de carga.
- Sin errores de JavaScript en estas comprobaciones.

El [informe automático de navegador](verification/browser-report.json) conserva los resultados. Las pruebas de navegador utilizaron herramientas ya instaladas, sin añadir dependencias al sitio. No se probaron dispositivos físicos, otros navegadores, lectores de pantalla reales ni accesibilidad mediante una auditoría externa. Tampoco se hizo una prueba de rendimiento con miles de especies reales.

## Próximo paso propuesto

Fase 2: evaluar fuentes de taxonomía, distribución e imágenes, sus licencias, cobertura y formas permitidas de importación. Fase 3: base de datos y API. Fase 4: incorporaciones graduales con validación, deduplicación y seguimiento de cobertura. Fase 5: rendimiento y preparación de publicación cuando se solicite. Ninguna de esas fases se implementó en esta entrega.
