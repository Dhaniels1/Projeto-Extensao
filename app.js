import { hospitals, getHospital, getTopic, validateCatalog, catalogMode } from "./data.js";

const root = document.getElementById("app");
const badge = document.getElementById("stage-badge");
const stepper = document.getElementById("stepper");
const state = { query:"", font:0, sector:"Visão geral", completed:new Set() };
if (catalogMode !== "synthetic-demo" || validateCatalog().length) console.error("Catálogo demonstrativo inválido:", validateCatalog());

const enc = v => String(v ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]);
const norm = s => String(s).toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const goHospital = id => "#/hospital/"+encodeURIComponent(id);
const goTopic = (h,t) => goHospital(h)+"/assunto/"+encodeURIComponent(t);
const back = (target,label) => '<button type="button" class="mini-link" data-route="'+enc(target)+'">← '+enc(label)+'</button>';
const banner = '<div class="demo-panel" role="note"><strong>Ambiente de demonstração</strong><p>Unidades, setores, processos e orientações são fictícios. Não utilize estas informações para atendimento, visitas ou internação reais.</p></div>';

function route(){
 const p=location.hash.replace(/^#\/?/,"").split("/").filter(Boolean).map(s=>decodeURIComponent(s));
 if(p[0]==="sobre")return {page:"sobre",step:0};
 const h=p[0]==="hospital"?getHospital(p[1]):null;
 if(h){const t=p[2]==="assunto"?getTopic(h.id,p[3]):null;return t?{page:"resultado",step:3,h,t}:{page:"assuntos",step:2,h};}
 return {page:"hospitais",step:1};
}
function steps(n){
 badge.textContent=n?"Etapa "+n+" de 3":"Sobre o projeto";
 stepper.style.display=n?"flex":"none";
 stepper.querySelectorAll(".step").forEach((el,i)=>{
  el.className="step"+(i+1===n?" step-active":i+1<n?" step-done":"");
  el.querySelector("i").textContent=i+1<n?"✓":i+1;
 });
}
function renderHospitais(){
 return '<div class="section-top"><h2>Qual unidade deseja explorar?</h2></div><p class="helper">Escolha um cenário fictício. As orientações mudam de acordo com a unidade e o assunto selecionados.</p>'+
 '<div class="choice-list">'+hospitals.map(h=>'<button class="choice-card" type="button" data-route="'+goHospital(h.id)+'"><span class="choice-symbol" aria-hidden="true">'+enc(h.initials)+'</span><span class="choice-content"><strong>'+enc(h.name)+'</strong><small>'+enc(h.short)+'</small><p>'+enc(h.description)+'</p></span><span class="arrow" aria-hidden="true">→</span></button>').join("")+'</div>'+banner;
}
function matchTopic(t,q){
 const text=[t.title,t.label,t.summary,t.intro,...t.sections.map(s=>s.title+" "+s.body),...(t.sectorOptions||[])].join(" ");
 return norm(text).includes(norm(q.trim()));
}
function topicCard(h,t){
 return '<button class="choice-card topic-card" type="button" data-route="'+goTopic(h.id,t.id)+'"><span class="choice-symbol" aria-hidden="true">☷</span><span class="choice-content"><strong>'+enc(t.title)+'</strong><small>'+enc(t.label)+'</small><p>'+enc(t.summary)+'</p><span class="status-line"><span class="status-dot documented" aria-hidden="true"></span>Conteúdo fictício para testes</span></span><span class="arrow" aria-hidden="true">→</span></button>';
}
function renderAssuntos(h){
 const topics=h.topics.filter(t=>matchTopic(t,state.query));
 return '<div class="section-top"><h2>O que deseja consultar?</h2>'+back("#/inicio","Trocar unidade")+'</div><div class="selected-hospital"><div><strong>'+enc(h.name)+'</strong><small>Unidade inteiramente fictícia</small></div><span class="pill pill-ok">Cenário selecionado</span></div>'+
 '<div class="search-row"><label class="sr-only" for="topic-search">Buscar assunto</label><span class="search-icon" aria-hidden="true">⌕</span><input id="topic-search" type="search" autocomplete="off" placeholder="Buscar assunto, etapa ou setor..." value="'+enc(state.query)+'"></div>'+
 '<div id="topic-list" class="choice-list">'+(topics.length?topics.map(t=>topicCard(h,t)).join(""):empty())+'</div>'+banner;
}
function empty(){return '<div class="empty-state"><strong>Nenhum assunto encontrado.</strong><p>Experimente outra palavra ou limpe a busca.</p></div>';}
function taskKey(h,t,sector,i){return [h.id,t.id,sector,i].join("::");}
function renderResultado(h,t){
 const sectors=t.sectorOptions||[];
 const selected=sectors.includes(state.sector)?state.sector:"Visão geral";
 const specific=t.sectorDetails?.[selected]||null;
 const sections=t.sections.map(s=>'<section class="topic-block"><h3>'+enc(s.title)+'</h3><p>'+enc(s.body)+'</p></section>').join("");
 const sectorSelect=sectors.length?'<div class="sector-block"><label class="field-label" for="sector-select">Escolha um setor fictício</label><select id="sector-select" class="select-field">'+sectors.map(v=>'<option value="'+enc(v)+'"'+(v===selected?' selected':'')+'>'+enc(v)+'</option>').join("")+'</select><p class="helper">A orientação muda conforme o setor selecionado.</p></div>':"";
 const detail=specific?'<section class="sector-result" aria-live="polite"><h3>'+enc(specific.title)+'</h3><p>'+enc(specific.body)+'</p></section>':"";
 const tasks=specific?.steps||t.checklist;
 const inputs=tasks.map((v,i)=>{const key=taskKey(h,t,selected,i);return '<label class="demo-check"><input type="checkbox" data-check="'+enc(key)+'"'+(state.completed.has(key)?" checked":"")+'><span>'+enc(v)+'</span></label>';}).join("");
 const n=tasks.filter((v,i)=>state.completed.has(taskKey(h,t,selected,i))).length;
 return '<div class="section-top"><h2 class="topic-title">'+enc(t.title)+'</h2>'+back(goHospital(h.id),"Ver assuntos")+'</div>'+
 '<div class="selected-hospital"><div><strong>'+enc(h.name)+'</strong><small>'+enc(h.type)+'</small></div><button type="button" data-route="#/inicio" class="mini-link">Alterar</button></div>'+
 '<span class="pill pill-warn">100% demonstrativo</span><p class="result-intro">'+enc(t.intro)+'</p>'+sectorSelect+sections+detail+
 '<section class="task-panel"><div class="section-top"><h3>Checklist interativo</h3><span id="check-count" class="progress-text" aria-live="polite">'+n+' de '+tasks.length+' itens</span></div><p class="helper">Marque as etapas para experimentar a interface. As marcações não são enviadas a um servidor e desaparecem ao recarregar a página.</p><div class="check-list">'+inputs+'</div></section>'+banner+
 '<div class="actions"><button class="btn btn-secondary" type="button" data-route="'+goHospital(h.id)+'">Escolher outro assunto</button><button class="btn btn-primary" type="button" data-route="#/inicio">Explorar outra unidade →</button></div>';
}
function renderSobre(){
 return '<div class="about-copy"><div class="section-top"><h2>Sobre o Cuidar Muriaé</h2>'+back("#/inicio","Início")+'</div>'+
 '<p><strong>Versão 0.2 — demonstração acadêmica de experiência do usuário.</strong> Este protótipo demonstra como organizar orientações administrativas por unidade e setor usando exclusivamente dados sintéticos.</p>'+
 '<h3>O que pode ser testado</h3><ul><li>Seleção de duas unidades fictícias com conteúdos diferentes.</li><li>Busca de assuntos, navegação em três etapas e orientação contextual por setor.</li><li>Checklists interativos sem coleta de dados pessoais.</li><li>Leitura em telas pequenas e ampliação dos textos.</li></ul>'+
 '<h3>O que não representa</h3><ul><li>Não existe parceria ou aprovação declarada de instituições de saúde.</li><li>Não apresenta regras de hospitais reais, horários de visita, disponibilidade de leitos ou documentos obrigatórios.</li><li>Não realiza triagem, diagnóstico, agendamento ou internação e não coleta informações de pacientes.</li></ul>'+
 '<div class="about-box"><strong>Próxima etapa acadêmica</strong><p>A evolução de um protótipo para um projeto de extensão exige orientação docente, interação autorizada com a comunidade e validação das informações com as instituições envolvidas. Resultados de testes internos não devem ser apresentados como impacto social comprovado.</p></div>'+banner+'</div>';
}
function render({focus=false}={}){
 const r=route();steps(r.step);
 root.innerHTML=r.page==="hospitais"?renderHospitais():r.page==="assuntos"?renderAssuntos(r.h):r.page==="resultado"?renderResultado(r.h,r.t):renderSobre();
 document.title=(r.page==="resultado"?r.t.title+" | ":"")+"Cuidar Muriaé | Demonstração";
 if(focus){const h=root.querySelector("h2");h?.setAttribute("tabindex","-1");h?.focus({preventScroll:true});window.scrollTo({top:0,behavior:"instant"});}
}
function navigate(target){
 if(route().page!=="assuntos"||!target.includes("/assunto/"))state.query="";
 state.sector="Visão geral";
 if(location.hash===target)render({focus:true});else location.hash=target;
}
document.addEventListener("click",e=>{
 const btn=e.target.closest("[data-route],[data-go]");
 if(btn){e.preventDefault();navigate(btn.dataset.route||(btn.dataset.go==="sobre"?"#/sobre":"#/inicio"));return;}
 if(e.target.closest("[data-font]")){
  state.font=(state.font+1)%3;
  document.documentElement.style.fontSize=["16px","18px","20px"][state.font];
  e.target.closest("[data-font]").setAttribute("aria-label",state.font?"Alterar tamanho do texto":"Aumentar texto");
 }
});
document.addEventListener("input",e=>{
 if(e.target.id!=="topic-search")return;
 state.query=e.target.value;
 const r=route();if(r.page!=="assuntos")return;
 const result=r.h.topics.filter(t=>matchTopic(t,state.query));
 document.getElementById("topic-list").innerHTML=result.length?result.map(t=>topicCard(r.h,t)).join(""):empty();
});
document.addEventListener("change",e=>{
 if(e.target.id==="sector-select"){state.sector=e.target.value;render();document.getElementById("sector-select")?.focus();return;}
 if(e.target.matches("[data-check]")){
  const key=e.target.dataset.check;
  if(e.target.checked)state.completed.add(key);else state.completed.delete(key);
  const controls=[...root.querySelectorAll("[data-check]")];
  const completed=controls.filter(el=>el.checked).length;
  const label=document.getElementById("check-count");if(label)label.textContent=completed+" de "+controls.length+" itens";
 }
});
window.addEventListener("hashchange",()=>render({focus:true}));
render();
