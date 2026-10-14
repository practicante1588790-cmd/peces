# Evidencia aislada de Fase 2

Estos archivos no se cargan desde `index.html` ni modifican el catálogo visible. No son un dataset de producción ni un paquete con licencia uniforme.

- `production-before.json`: hashes SHA-256 de los 21 archivos de producción al iniciar esta fase.
- `probe.json`: respuestas del sondeo, incluido el fallo de certificado de la API histórica de FishBase.
- `run-*.json`: instantáneas inmutables de cada ejecución, con fuente, IDs, fecha y decisiones automáticas pendientes. Los timestamps de nombres de archivo están en UTC; la consulta local ocurrió el 13 de octubre de 2026 en Lima.
- `cache/`: cuerpos JSON de GET acotados, identificados por SHA-256 de URL. La caché conserva hora original, URL, fuente, HTTP, errores y datos. No contiene tokens ni contraseñas.
- `external-id-map.json`: propuesta de correspondencia para ocho IDs internos existentes; no se fusionan conceptos ni se aprueban importaciones.
- `photo-review-*.json`: selecciones y evidencias de miniaturas. Son resultados pendientes del generador, separados de decisiones editoriales.
- `photo-candidates.json`: cinco candidatas retenidas después de consultar página original y miniatura, y 16 descartes de filtro o revisión. La foto antigua de paco se descarta hasta resolver su identificación bajo el concepto revisado.
- `previews/`: seis miniaturas pequeñas de Commons, incluyendo la descartada de paco. No hay originales descargados ni fotos incorporadas a `assets`.

Las cinco candidatas tienen sus propias licencias: gamitana CC BY 2.0; pez cebra CC BY-SA 3.0; lubina CC BY-SA 4.0; lucio CC BY-SA 2.5; perca CC0 1.0. La miniatura descartada de paco tiene CC BY-SA 3.0. Créditos, páginas originales, enlaces de condiciones y evidencia figuran en sus respectivos JSON. Las miniaturas son reducciones servidas por Commons; no se editó el original. La evaluación no constituye una certificación taxonómica ni una aprobación de publicación.

Los cuerpos de respuesta y citas mantienen las condiciones de sus fuentes. No atribuirles automáticamente la licencia del código de las herramientas. La [evaluación completa](../../docs/phase-2-sources.md) documenta el alcance y las licencias específicas comprobadas.

Reproducción sin red:

```text
node tools/evaluate-sources.cjs --offline
```

Ejecuta desde la raíz del proyecto. Crea otra instantánea y conserva las decisiones manuales. Una caché ausente deja la consulta pendiente; no genera respuestas ficticias.

## Archivos publicados en Git

`cache/` se excluye del repositorio por ser contenido regenerable. Los resultados
JSON y las miniaturas pequeñas se conservan como evidencia de la evaluación.
En un clon nuevo, `--offline` no reproduce las respuestas originales si falta la
caché: las consultas quedan pendientes. Para una nueva evaluación completa,
ejecuta `node tools/evaluate-sources.cjs` con conexión y configura previamente
`ATLAS_SOURCE_USER_AGENT` con tu contacto real para las consultas a Wikimedia.
Los backups locales tampoco se publican; las comprobaciones históricas que los
usan requieren conservarlos por separado.
