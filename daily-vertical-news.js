(()=>{const PATH=location.pathname.toLowerCase();const map=[["/energia","energia"],["/agronegocio","agronegocio"],["/sustentabilidade","sustentabilidade"],["/economia-negocios-consumo","economia-negocios-consumo"],["/educacao-carreiras-cultura","educacao-carreiras-cultura"],["/estilo-esporte-experiencias","estilo-esporte-experiencias"],["/gastronomia","gastronomia"],["/mobilidade","mobilidade"],["/moveis-decoracao","moveis-decoracao"],["/poder-justica-cidadania","poder-justica-cidadania"],["/saude-beleza","saude-beleza"],["/tecnologia-ia-midia","tecnologia-ia-midia"],["/turismo","turismo"]];let vertical="voznews";for(const [p,v] of map){if(PATH.startsWith(p)){vertical=v;break;}}
const imgs={
energia:"/assets-v23/top10-hq/top-03.webp",
"economia-negocios-consumo":"/assets-v23/top10-hq/top-02.webp",
"educacao-carreiras-cultura":"/assets-v23/top10-hq/top-09.webp",
"estilo-esporte-experiencias":"/assets-v23/top10-hq/top-10.webp",
gastronomia:"/assets-v23/top10-hq/top-08.webp",
mobilidade:"/assets-v23/top10-hq/top-04.webp",
"moveis-decoracao":"/assets-v23/top10-hq/top-07.webp",
"poder-justica-cidadania":"/assets-v23/top10-hq/top-01.webp",
"saude-beleza":"/assets-v23/top10-hq/top-06.webp",
"tecnologia-ia-midia":"/assets-v23/top10-hq/top-05.webp",
voznews:"/logo-voznews-oficial.png"
};
/* Fallbacks externos escolhidos apenas entre arquivos marcados como domínio público no Wikimedia Commons. */
const fallbackImgs={
  energia:[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Bankersmith%20TX%20Wind%20Turbines.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Solar_panels_on_a_roof.jpg"
  ],
  "economia-negocios-consumo":[
    "https://commons.wikimedia.org/wiki/Special:FilePath/B3_Sao_Paulo_Stock_Exchange.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Shopping_mall_in_Brazil.jpg"
  ],
  "educacao-carreiras-cultura":[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Students_in_a_classroom.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Books_on_a_shelf.jpg"
  ],
  "estilo-esporte-experiencias":[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Athletics_competition.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Fashion_show.jpg"
  ],
  gastronomia:[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Brazilian_food.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Restaurant_table.jpg"
  ],
  mobilidade:[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Traffic_in_Brasilia.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Bus_in_Brazil.jpg"
  ],
  "moveis-decoracao":[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Living_room_interior.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Modern_office_interior.jpg"
  ],
  "poder-justica-cidadania":[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Congresso%20Nacional%20Bras%C3%ADlia.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Congresso%20Nacional%20Bras%C3%ADlia%202015.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Brazil%20National%20Congress.jpg"
  ],
  "saude-beleza":[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Hospital_room.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Doctor_and_patient.jpg"
  ],
  "tecnologia-ia-midia":[
    "https://commons.wikimedia.org/wiki/Special:FilePath/Computer_lab.jpg",
    "https://commons.wikimedia.org/wiki/Special:FilePath/Artificial_intelligence_concept.jpg"
  ]
};
function fallbackImage(vertical,index){const a=fallbackImgs[vertical]||[];return a.length?a[index%a.length]:"";}
function esc(s){return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
async function run(){try{if(vertical==="voznews")return;const r=await fetch("/api/headlines?vertical="+encodeURIComponent(vertical));if(!r.ok)return;const d=await r.json();if(!d.items||!d.items.length)return;document.getElementById("voznews-daily")?.remove();const s=document.createElement("section");s.id="voznews-daily";s.innerHTML='<style>#voznews-daily{width:min(1220px,94%);margin:34px auto;padding:28px;border-radius:22px;background:#061525;border:1px solid rgba(212,175,55,.32);font-family:Arial,sans-serif;color:#fff;box-shadow:0 22px 55px rgba(0,0,0,.22)}#voznews-daily .vn-head{display:flex;justify-content:space-between;gap:16px;align-items:end;margin:0 0 18px}#voznews-daily h2{margin:0;font-size:clamp(30px,4vw,48px)}#voznews-daily .vn-date{font-size:12px;font-weight:900;color:#f2c55b}#voznews-daily .vn-grid{display:grid;grid-template-columns:1.35fr 1fr 1fr;gap:16px}#voznews-daily article{background:#071525;border:1px solid rgba(212,175,55,.28);border-radius:18px;overflow:hidden;position:relative}#voznews-daily .vn-card-link{display:block;color:inherit;text-decoration:none;height:100%}#voznews-daily .vn-card-link:hover h3{color:#ffe16a}#voznews-daily .vn-card-link:focus-visible{outline:3px solid #f2c55b;outline-offset:-3px}#voznews-daily article:first-child{grid-row:span 2}#voznews-daily img{width:100%;height:150px;object-fit:cover;object-position:center;background:#0b2030;display:block}#voznews-daily article:first-child img{height:320px}#voznews-daily .vn-b{padding:17px}#voznews-daily .vn-tag{font-size:11px;font-weight:900;color:#f2c55b;letter-spacing:.7px}#voznews-daily h3{font-size:20px;line-height:1.16;margin:8px 0;color:#fff}#voznews-daily article:first-child h3{font-size:31px}#voznews-daily p{color:#c8d5e2;line-height:1.48;margin:0 0 12px}#voznews-daily a{color:#ffe16a;font-weight:900;text-decoration:none}@media(max-width:850px){#voznews-daily .vn-grid{grid-template-columns:1fr}#voznews-daily article:first-child{grid-row:auto}#voznews-daily article:first-child img{height:220px}}</style><div class="vn-head"><div><h2>Últimas notícias</h2></div></div><div class="vn-grid">'+d.items.map((x,i)=>'<article><a class="vn-card-link" href="'+esc(x.link)+'" target="_blank" rel="noopener noreferrer" aria-label="Abrir fonte oficial: '+esc(x.title)+'">'+('<img src="'+esc(x.image||fallbackImage(vertical,i))+'" alt="'+esc(x.title)+'" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=\''+esc(fallbackImage(vertical,i))+'\'">')+'<div class="vn-b"><div class="vn-tag">'+(i===0?"DESTAQUE PRINCIPAL":"NOTÍCIA DO DIA")+' • '+esc(x.source)+'</div><h3>'+esc(x.title)+'</h3><p>'+esc(x.summary)+'</p><span style="color:#ffe16a;font-weight:900">CONSULTAR FONTE OFICIAL →</span></div></a></article>').join("")+'</div>';const anchor=document.querySelector("main")||document.body;
const hero=anchor.querySelector(".vn-energy-pattern");
if(hero && hero.nextSibling) anchor.insertBefore(s,hero.nextSibling);
else if(hero) anchor.appendChild(s);
else anchor.insertBefore(s,anchor.firstChild);}catch(e){}}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();})();