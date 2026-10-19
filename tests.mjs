import assert from "node:assert/strict";
import { hospitals, getHospital, getTopic, validateCatalog } from "./data.js";

assert.equal(validateCatalog().length, 0, "Fontes devem possuir dados mínimos");
assert.deepEqual(hospitals.map(h => h.id), ["fcv", "hsp"]);
assert.ok(getTopic("fcv", "casa-de-apoio"));
assert.ok(getTopic("hsp", "visitantes"));
assert.equal(getTopic("hsp", "visitantes").status, "pending", "Visitação HSP não pode aparecer validada");
assert.ok(getTopic("hsp", "visitantes").sectorOptions.length >= 5);
assert.ok(getTopic("fcv", "casa-de-apoio").paragraph.toLowerCase().includes("diferente dos leitos"));
assert.equal(getTopic("hsp", "internacao").status, "pending");
assert.equal(getTopic("fcv", "internacao").status, "pending");
assert.equal(getHospital("inexistente"), null);
for (const h of hospitals) {
  for (const t of h.topics) {
    assert.match(t.sourceUrl, /^https:\/\//);
    assert.ok(t.caution.length > 30, `Falta ressalva em ${t.id}`);
  }
}
console.log("Todos os testes de catálogo e limites informacionais passaram.");
