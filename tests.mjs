import assert from "node:assert/strict";
import { hospitals, getHospital, getTopic, validateCatalog, catalogMode } from "./data.js";
assert.equal(catalogMode,"synthetic-demo");
assert.equal(validateCatalog().length,0,"O catálogo precisa ser consistente");
assert.deepEqual(hospitals.map(h=>h.id),["aurora","horizonte"]);
assert.ok(hospitals.every(h=>h.topics.length>=4));
assert.notEqual(getTopic("aurora","chegada").intro,getTopic("horizonte","chegada").intro);
assert.notDeepEqual(getTopic("aurora","visitas").sectorOptions,getTopic("horizonte","visitas").sectorOptions);
assert.ok(getTopic("aurora","visitas").sectorDetails["Enfermaria Modelo"].body);
assert.ok(getTopic("horizonte","visitas").sectorDetails["Setor Verde"].body);
assert.equal(getHospital("fcv"),null);assert.equal(getHospital("hsp"),null);
for(const h of hospitals){assert.match(h.short,/fictícia/);for(const t of h.topics){assert.ok(t.sections.length>0);assert.ok(t.checklist.length>0);assert.ok(!("sourceUrl" in t),"O catálogo sintético não deve aparentar ter fonte institucional");}}
console.log("Cuidar Muriaé 0.2: catálogo fictício e jornadas validadas.");
