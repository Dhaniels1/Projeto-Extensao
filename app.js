import { hospitals, getHospital, getTopic, validateCatalog } from "./data.js";

const root = document.getElementById("app");
const badge = document.getElementById("stage-badge");
const stepper = document.getElementById("stepper");
const ephemeral = { query: "", font: 0, sector: "Visão geral" };
const errors = validateCatalog();
if (errors.length) console.error("Falhas no catálogo:", errors);

const enc = v => String(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]);
const normalized = text => text.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const link = (url, label) => `<a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${enc(url)}">${enc(label)} <span aria-hidden="true">↗</span></a>`;
const backButton = (target, label = "Voltar") => `<button class="mini-link" type="button" data-route="${enc(target)}" aria-label="${enc(label)}">← ${enc(label)}</button>`;
const stateLink = id => `#/hospital/${encodeURIComponent(id)}`;
const topicLink = (h,t) => `#/hospital/${encodeURIComponent(h)}/assunto/${encodeURIComponent(t)}`;

function currentRoute() {
  const tokens = decodeURIComponent(location.hash.replace(/^#\/?/, "")).split("/").filter(Boolean);
  if (tokens[0] === "sobre") return { screen: "sobre", step: 0 };
  const h = tokens[0] === "hospital" ? getHospital(tokens[1]) : null;
  if (h) {
    const topic = tokens[2] === "assunto" ? getTopic(h.id, tokens[3]) : null;
    return topic ? { screen: "resultado", step: 3, hospital:h, topic } : { screen: "assuntos", step: 2, hospital:h };
  }
  return { screen: "hospitais", step: 1 };
}
function setSteps(step){
  badge.textContent = step ? `Etapa ${step} de 3` : "Informações do projeto";
  const parts = [...stepper.querySelectorAll(".step")];
  parts.forEach((p,i) => {
    const n=i+1;
    p.className = "step" + (n===step?" step-active":n<step?" step-done":"");
    p.querySelector("i").textContent = n < step ? "✓" : n;
  });
  stepper.style.display = step ? "flex" : "none";
}
function hospitalCard(h){return `<button class="choice-card" type="button" data-route="${stateLink(h.id)}"><span class="choice-symbol" aria-hidden="true">${enc(h.initials)}</span><span class="choice-content"><strong>${enc(h.name)}</strong><small>${enc(h.short)}</small><p>${enc(h.description)}</p></span><span class="arrow" aria-hidden="true">→</span></button>`;}
function renderHospitals(){
  return `<div class="section-top"><h2>Qual hospital você procura?</h2></div>
    <p class="helper">Selecione a unidade onde você já pretende buscar atendimento. Esta ferramenta não decide onde procurar assistência.</p>
    <div class="choice-list">${hospitals.map(hospitalCard).join("")}</div>
    <p class="subtle-note">As informações são organizadas por hospital e ainda dependem de verificação quanto à vigência. O protótipo não possui vínculo oficial com as instituições.</p>`;
}
function topicCard(h,t){
  return `<button class="choice-card topic-card" type="button" data-route="${topicLink(h.id,t.id)}">
    <span class="choice-symbol" aria-hidden="true">${t.id==="casa-de-apoio"?"⌂":t.id==="documentos"?"▤":t.id==="visitantes"?"♙": "ℹ"}</span>
    <span class="choice-content"><strong>${enc(t.title)}</strong><small>${enc(t.label)}</small><p>${enc(t.summary)}</p><span class="status-line"><span class="status-dot ${t.status === "documented"?"documented":""}" aria-hidden="true"></span>${t.status === "documented"?"Fonte pública localizada · em revisão":"Confirmação pendente"}</span></span>
    <span class="arrow" aria-hidden="true">→</span></button>`;
}
function renderTopics(h){
  const topics = h.topics.filter(t => normalized(t.title+" "+t.label+" "+t.summary).includes(normalized(ephemeral.query.trim())));
  return `<div class="section-top"><h2>Sobre o que você precisa saber?</h2>${backButton("#/inicio", "Trocar hospital")}</div>
    <div class="selected-hospital"><div><strong>${enc(h.name)}</strong><small>${enc(h.short)}</small></div><span class="pill pill-ok">Selecionado</span></div>
    <div class="search-row"><label class="sr-only" for="topic-search">Buscar assunto</label><span class="search-icon" aria-hidden="true">⌕</span><input type="search" id="topic-search" placeholder="Buscar assunto ou setor..." autocomplete="off" value="${enc(ephemeral.query)}"></div>
    <div class="choice-list" id="topic-list">${topics.length ? topics.map(t=>topicCard(h,t)).join("") : '<div class="empty-state"><strong>Nenhum assunto encontrado.</strong> Experimente outra palavra ou limpe a busca.</div>'}</div>
    <p class="subtle-note">Os assuntos disponíveis podem variar conforme o hospital. As orientações específicas são publicadas apenas após curadoria adequada.</p>`;
}
function renderResult(h,t){
  const doc=t.status === "documented";
  const pclass=doc?"pill-ok":"pill-warn";
  const ptext=doc?"Fonte institucional localizada · em revisão":"Informação não verificada para publicação";
  const sector=t.sectorOptions?.length ? `<label class="field-label" for="sector-select">Escolha o setor sobre o qual deseja consultar os documentos</label><select id="sector-select" class="select-field">${t.sectorOptions.map(x=>`<option value="${enc(x)}" ${x===ephemeral.sector?"selected":""}>${enc(x)}</option>`).join("")}</select>` : "";
  const caution=t.sectorOptions?.length && ephemeral.sector!=="Visão geral" ? `Atenção: documentos do setor “${enc(ephemeral.sector)}” podem estar desatualizados. Consulte a publicação oficial e confirme diretamente com o hospital.` : enc(t.caution);
  return `<div class="section-top"><h2 class="topic-title">${enc(t.title)}</h2>${backButton(stateLink(h.id),"Voltar aos assuntos")}</div>
  <div class="selected-hospital"><div><strong>${enc(h.name)}</strong><small>${enc(h.short)}</small></div><button class="mini-link" data-route="#/inicio" type="button">Alterar</button></div>
  <span class="pill ${pclass}" role="status">${ptext}</span>
  ${sector}
  <div class="details-panel ${doc?"documented":"pending"}"><h3>${doc?"O que foi encontrado":"O que precisa ser confirmado"}</h3><p>${enc(t.paragraph)}</p><div class="caution"><strong>Importante:</strong> ${caution}</div></div>
  <section class="source-card" aria-label="Origem e validação da orientação"><h3>Origem e situação da informação</h3><dl>
  <div><dt>Instituição</dt><dd>${enc(h.name)}</dd></div>
  <div><dt>Fonte</dt><dd><a href="${enc(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${enc(t.sourceTitle)} ↗</a></dd></div>
  <div><dt>Última validação</dt><dd>Não confirmada institucionalmente</dd></div>
  <div><dt>Publicação</dt><dd>Somente caráter demonstrativo — conferir vigência na origem</dd></div>
  </dl></section>
  <div class="actions">${link(t.sourceUrl,"Abrir fonte oficial")}
  <button class="btn btn-secondary" type="button" data-route="${stateLink(h.id)}">Ver outro assunto</button></div>
  <p class="disclaimer">Não é orientação clínica nem substitui instruções fornecidas pelos profissionais ou pelo hospital.</p>`;
}
function renderAbout(){
  return `<div class="about-copy"><div class="section-top"><h2>Sobre o Cuidar Muriaé</h2>${backButton("#/inicio","Ir para o início")}</div>
  <p>O Cuidar Muriaé é um <strong>protótipo independente de projeto acadêmico de extensão</strong>, em planejamento, para facilitar a navegação por informações institucionais públicas dos hospitais de Muriaé.</p>
  <h3>O que faz</h3><ul><li>Permite escolher FCV ou Hospital São Paulo.</li><li>Organiza os assuntos conforme a instituição.</li><li>Apresenta fontes e sinaliza informações sem validação institucional.</li><li>Funciona no celular e oferece texto ampliado.</li></ul>
  <h3>O que não faz</h3><ul><li>Não diagnostica, avalia sintomas, determina urgência ou aconselha tratamentos.</li><li>Não consulta vagas, realiza internações, faz reservas ou agendamentos.</li><li>Não acessa prontuários, sistemas internos nem coleta dados de pacientes.</li></ul>
  <div class="about-box"><strong>Um compromisso com informações confiáveis</strong><p>A publicação de orientações hospitalares específicas depende de verificação documental e, quando necessário, confirmação pela instituição. As regras de visitação do HSP ainda não são apresentadas como vigentes.</p></div>
  <p>A proposta deve passar pela avaliação acadêmica e pelas autorizações institucionais e éticas aplicáveis antes de qualquer atividade com a comunidade.</p></div>`;
}
function render({ focus=false }={}) {
  const s=currentRoute();
  setSteps(s.step);
  root.innerHTML = s.screen === "hospitais" ? renderHospitals() : s.screen === "assuntos" ? renderTopics(s.hospital) : s.screen === "resultado" ? renderResult(s.hospital,s.topic) : renderAbout();
  document.title=(s.screen==="resultado"?s.topic.title+" | ":s.screen==="assuntos"?s.hospital.name+" | ":"")+"Cuidar Muriaé";
  if(focus){const heading=root.querySelector("h2");heading?.setAttribute("tabindex","-1");heading?.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});}
}
function navigate(route){
  if (currentRoute().screen !== "assuntos" || !route.includes("/assunto/")) ephemeral.query="";
  ephemeral.sector="Visão geral";
  if (location.hash === route) render({focus:true}); else location.hash=route;
}
document.addEventListener("click",evt=>{
  const routed=evt.target.closest("[data-route],[data-go]");
  if(routed){evt.preventDefault();navigate(routed.dataset.route || (routed.dataset.go==="sobre"?"#/sobre":"#/inicio"));return;}
  if(evt.target.closest("[data-font]")){
    ephemeral.font=(ephemeral.font+1)%3;
    document.documentElement.style.fontSize=["16px","18px","20px"][ephemeral.font];
    evt.target.closest("[data-font]").setAttribute("aria-label",ephemeral.font?"Alterar novamente o tamanho dos textos":"Aumentar o tamanho dos textos");
  }
});
document.addEventListener("input",evt=>{
  if(evt.target.id!=="topic-search")return;
  ephemeral.query=evt.target.value;
  const s=currentRoute();if(s.screen!=="assuntos")return;
  const list=document.getElementById("topic-list");
  const filtered=s.hospital.topics.filter(t=>normalized(t.title+" "+t.label+" "+t.summary).includes(normalized(ephemeral.query.trim())));
  list.innerHTML=filtered.length?filtered.map(t=>topicCard(s.hospital,t)).join(""):'<div class="empty-state"><strong>Nenhum assunto encontrado.</strong> Experimente outra palavra ou limpe a busca.</div>';
});
document.addEventListener("change",evt=>{
  if(evt.target.id==="sector-select") { ephemeral.sector=evt.target.value; const current=document.activeElement?.id; render(); if(current==="sector-select")document.getElementById("sector-select")?.focus(); }
});
window.addEventListener("hashchange",()=>render({focus:true}));
render();
