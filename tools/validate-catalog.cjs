"use strict";

// Optional maintenance tool using only Node built-ins. Not required to run the website.
const fs = require("node:fs");
const path = require("node:path");
const catalog = require("../data/catalog.js");
const { validateCatalog } = require("../lib/catalog-validator.js");
const root = path.resolve(__dirname, "..");
const report = validateCatalog(catalog, {
  fileExists: imagePath => {
    const resolved = path.resolve(root, imagePath);
    return resolved.startsWith(root + path.sep) && fs.existsSync(resolved) && fs.statSync(resolved).isFile();
  }
});
console.log(`${catalog.species.length} especies; ${catalog.groups.length} grupos separados.`);
console.log(`${report.errors.length} errores; ${report.warnings.length} avisos.`);
report.errors.forEach(error => console.error(`ERROR: ${error}`));
report.warnings.forEach(warning => console.log(`AVISO: ${warning}`));
if (report.errors.length) process.exitCode = 1;
