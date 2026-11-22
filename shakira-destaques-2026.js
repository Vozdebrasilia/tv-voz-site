/* Destaque editorial autoral, atualização de 22/11/2026. */
(()=>{'use strict';
const path=location.pathname.replace(/\/+$/,'')||'/';
const editorias={
 '/':'VOZ NEWS BRASIL · CAPA · 22/11/2026',
 '/educacao-carreiras-cultura':'CULTURA E MÚSICA · 22/11/2026',
 '/estilo-esporte-experiencias':'ESTILO E EXPERIÊNCIAS · 22/11/2026',
 '/turismo':'TURISMO E EVENTOS · 22/11/2026',
 '/economia-negocios-consumo':'ECONOMIA DE EVENTOS · 22/11/2026'
};
if(!Object.prototype.hasOwnProperty.call(editorias,path)||document.getElementById('voz-shakira-2026'))return;
const url='/noticias/shakira-brasil-quatro-shows-2027/index.html';
const img='https://upload.wikimedia.org/wikipedia/commons/3/30/SHARIKA_MEDELLIN_13_04_2025_%28122%29.jpg';
const sec=document.createElement('section');
sec.id='voz-shakira-2026';
sec.setAttribute('aria-label','Shakira confirma quatro shows no Brasil');
sec.innerHTML=`<style>
#voz-shakira-2026{width:min(1250px,94%);margin:32px auto 42px;color:#fff;font-family:Arial,Helvetica,sans-serif}
#voz-shakira-2026 *{box-sizing:border-box}
#voz-shakira-2026 .sh-wrap{background:linear-gradient(125deg,#081831,#102e56);border:2px solid #e0bb51;border-radius:22px;box-shadow:0 22px 56px rgba(0,0,0,.24);overflow:hidden;display:grid;grid-template-columns:42% 58%}
#voz-shakira-2026 .sh-pic{position:relative;min-height:330px;overflow:hidden}
#voz-shakira-2026 .sh-pic img{height:100%;width:100%;object-fit:cover;object-position:center 36%;display:block}
#voz-shakira-2026 .sh-credit{position:absolute;bottom:8px;left:8px;right:8px;border-radius:6px;background:#000b;font:11px/1.3 Arial;padding:7px}
#voz-shakira-2026 .sh-text{padding:32px 37px;display:flex;flex-direction:column;justify-content:center}
#voz-shakira-2026 .sh-tag{font-size:12px;font-weight:900;letter-spacing:1.6px;color:#f6d775}
#voz-shakira-2026 h2{font-size:clamp(28px,3.4vw,49px);line-height:1.12;margin:12px 0;color:white;font-weight:900}
#voz-shakira-2026 p{font-size:17px;line-height:1.6;color:#e1ecf8;margin:0 0 14px}
#voz-shakira-2026 .sh-dates{display:flex;flex-wrap:wrap;gap:7px;margin:4px 0 20px}
#voz-shakira-2026 .sh-dates span{padding:7px 10px;background:#ffffff18;border:1px solid #ffffff35;border-radius:8px;font-size:12px;font-weight:800}
#voz-shakira-2026 .sh-link{background:#f3cc69;border-radius:9px;padding:13px 18px;color:#101c2b;font-weight:900;text-decoration:none;display:inline-block;align-self:flex-start}
#voz-shakira-2026 .sh-link:hover{background:#ffe396}
@media(max-width:790px){#voz-shakira-2026 .sh-wrap{grid-template-columns:1fr}#voz-shakira-2026 .sh-pic{height:350px}#voz-shakira-2026 .sh-text{padding:24px}#voz-shakira-2026 .sh-dates span{font-size:11px}}
</style>
<div class="sh-wrap"><div class="sh-pic"><a href="${url}"><img src="${img}" alt="Foto real de Shakira durante sua turnê, em abril de 2025" loading="eager"></a><span class="sh-credit">Fotografia real de arquivo: J.ébey / Wikimedia Commons (CC0)</span></div>
<div class="sh-text"><span class="sh-tag">${editorias[path]}</span><h2>Shakira volta ao Brasil com quatro megashows</h2><p>Réveillon em Santa Catarina e shows em Espírito Santo, Bahia e Ceará. Confira as datas e saiba quando começam as vendas.</p>
<div class="sh-dates"><span>31/12 · Balneário Camboriú</span><span>03/01 · Cariacica</span><span>06/01 · Salvador</span><span>09/01 · Fortaleza</span></div>
<a class="sh-link" href="${url}">VEJA DATAS, LOCAIS E INGRESSOS →</a></div></div>`;
function mount(){
const id=document.getElementById('voz-shakira-2026');if(id)return;
if(path==='/'){
 const hero=document.querySelector('.hero');
 if(hero){hero.parentNode.insertBefore(sec,hero);return;}
 const header=document.querySelector('header');if(header){header.insertAdjacentElement('afterend',sec);return;}
}else{
 const v=document.querySelector('.vertical-identidade');
 if(v){v.insertAdjacentElement('afterend',sec);return;}
 const main=document.querySelector('main');if(main){main.prepend(sec);return;}
}
(document.querySelector('main')||document.body).prepend(sec);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();