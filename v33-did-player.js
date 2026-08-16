(() => {
  const studio=document.getElementById('tv-ao-vivo'); if(!studio)return;
  studio.querySelectorAll('video,iframe,embed').forEach(e=>e.remove());
  studio.querySelectorAll('.studio-presenters,.studio-overlay-logo,.anchor-name-tag,.studio-headline-panel,.studio-controls,.studio-status,.did-loading,.market-strip,.ticker,.enter-live-overlay,.live-badge,.studio-topline').forEach(e=>e.style.setProperty('display','none','important'));
  document.getElementById('v33-text-style')?.remove(); document.getElementById('v33-text-news')?.remove(); document.getElementById('v33-reader')?.remove();

  const analysts=[
    {name:'Dra. Deijanete Fayad',role:'Análise VOZ NEWS',img:'./studio-deijanete-source.png'},
    {name:'Paulo Fayad',role:'Jornalista • Análise VOZ NEWS',img:'./studio-paulo-source.png'}
  ];

  const style=document.createElement('style'); style.id='v33-text-style';
  style.textContent=`
  #tv-ao-vivo{min-height:590px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:26px!important;background:linear-gradient(145deg,#061326,#0b2c50 55%,#06101c)!important}#tv-ao-vivo:before,#tv-ao-vivo:after{display:none!important}
  #v33-text-news{position:relative;z-index:80;width:min(1160px,96%);padding:28px;border-radius:26px;background:rgba(4,18,36,.97);border:1px solid rgba(255,255,255,.16);box-shadow:0 25px 65px rgba(0,0,0,.4);color:#fff;display:grid;grid-template-columns:220px minmax(0,1fr) 220px;gap:28px;align-items:center}
  .v33-analyst{text-align:center;opacity:.7;transition:.25s}.v33-analyst.active{opacity:1;transform:translateY(-4px)}.v33-analyst img{width:190px;height:250px;object-fit:contain;object-position:center bottom;display:block;margin:auto}.v33-analyst strong{display:block;margin-top:10px;font-size:18px}.v33-analyst span{display:block;margin-top:4px;font-size:11px;color:#d4af37;font-weight:900;text-transform:uppercase;letter-spacing:.7px}
  .v33-center{min-width:0}.v33-top{display:flex;align-items:center;justify-content:space-between;gap:16px}.v33-brand{font-size:31px;font-weight:1000}.v33-live{padding:7px 11px;border-radius:999px;background:#c92828;font-size:11px;font-weight:1000;letter-spacing:.8px}.v33-speaker{margin-top:20px;color:#d4af37;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:1px}.v33-head{display:block;margin-top:10px;font-size:clamp(27px,4vw,48px);line-height:1.06;font-weight:1000;min-height:2.15em;color:#fff;text-decoration:none;cursor:pointer}.v33-head:hover{text-decoration:underline;text-decoration-color:#d4af37;text-decoration-thickness:3px}.v33-source{margin-top:13px;font-size:13px;color:#9fc7eb;font-weight:800}.v33-meta{margin-top:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,.1);font-size:12px;color:#a9c4de;display:flex;justify-content:space-between;gap:14px}.v33-bar{height:3px;margin-top:20px;background:rgba(255,255,255,.1);overflow:hidden;border-radius:10px}.v33-bar span{display:block;height:100%;background:#d4af37;animation:v33bar 11s linear infinite}@keyframes v33bar{from{width:0}to{width:100%}}.v33-strip{grid-column:1/-1;overflow:hidden;border-radius:8px;background:#d4af37;color:#09111b;font-weight:900;height:42px;display:flex;align-items:center}.v33-strip-track{display:flex;align-items:center;gap:52px;width:max-content;padding-left:100%;animation:v33ticker 145s linear infinite;will-change:transform}.v33-strip:hover .v33-strip-track{animation-play-state:paused}.v33-ticker-link{color:#09111b;text-decoration:none;white-space:nowrap;font-size:13px}.v33-ticker-link:hover{text-decoration:underline}@keyframes v33ticker{from{transform:translateX(0)}to{transform:translateX(-100%)}}
  #v33-reader{position:fixed;inset:0;z-index:99999;background:rgba(0,7,18,.9);backdrop-filter:blur(8px);display:none;overflow:auto;padding:28px}#v33-reader.open{display:block}.v33-reader-card{max-width:920px;margin:18px auto;background:#fff;color:#101820;border-radius:20px;padding:38px;box-shadow:0 30px 80px rgba(0,0,0,.5)}.v33-reader-close{float:right;border:0;background:#0a2948;color:#fff;border-radius:999px;width:40px;height:40px;font-size:22px;cursor:pointer}.v33-reader-author{display:flex;align-items:center;gap:14px;margin-bottom:20px}.v33-reader-author img{width:72px;height:72px;object-fit:contain}.v33-reader-author strong{display:block;font-size:18px}.v33-reader-author span{font-size:12px;color:#8a6500;font-weight:900}.v33-reader-topic{color:#9b7100;font-size:12px;font-weight:1000;letter-spacing:1px;text-transform:uppercase}.v33-reader-title{font-size:clamp(30px,5vw,48px);line-height:1.06;margin:12px 55px 24px 0}.v33-reader-body p{font-size:18px;line-height:1.68;margin:0 0 18px}.v33-reader-sources{margin-top:26px;padding-top:18px;border-top:1px solid #ddd}.v33-reader-sources h4{margin:0 0 8px}.v33-reader-source{display:inline-block;color:#083b70;font-weight:900;text-decoration:none}.v33-reader-note{font-size:12px;color:#65717d;margin-top:12px}
  @media(max-width:860px){#v33-text-news{grid-template-columns:120px minmax(0,1fr) 120px;gap:14px}.v33-analyst img{width:110px;height:160px}.v33-analyst strong{font-size:12px}.v33-analyst span{font-size:8px}}
  @media(max-width:620px){#tv-ao-vivo{min-height:560px!important;padding:12px!important}#v33-text-news{grid-template-columns:74px minmax(0,1fr) 74px;padding:20px 12px;gap:8px}.v33-analyst img{width:70px;height:105px}.v33-analyst strong{font-size:9px}.v33-analyst span{font-size:6.5px}.v33-brand{font-size:24px}.v33-live{font-size:8px;padding:5px 7px}.v33-head{font-size:27px;min-height:3em}.v33-meta{flex-direction:column}.v33-reader-card{padding:24px 20px}.v33-reader-body p{font-size:16px}.v33-strip-track{animation-duration:180s}}
  `;
  document.head.appendChild(style);

  const box=document.createElement('div'); box.id='v33-text-news';
  box.innerHTML=`
    <div class="v33-analyst" id="v33left"><img src="${analysts[0].img}" alt="${analysts[0].name}"><strong>${analysts[0].name}</strong><span>${analysts[0].role}</span></div>
    <div class="v33-center"><div class="v33-top"><div class="v33-brand">VOZ NEWS</div><div class="v33-live">ELEIÇÕES 2026</div></div><div class="v33-speaker" id="v33speaker">MANCHETES AGORA</div><a class="v33-head" id="v33head" href="#">Carregando as principais notícias...</a><div class="v33-source" id="v33source">Eleições • Brasil • Distrito Federal</div><div class="v33-bar"><span id="v33progress"></span></div><div class="v33-meta"><span id="v33count"></span><span id="v33time"></span></div></div>
    <div class="v33-analyst" id="v33right"><img src="${analysts[1].img}" alt="${analysts[1].name}"><strong>${analysts[1].name}</strong><span>${analysts[1].role}</span></div>
    <div class="v33-strip"><div class="v33-strip-track" id="v33ticker"></div></div>`;
  studio.appendChild(box);

  const reader=document.createElement('div'); reader.id='v33-reader';
  reader.innerHTML='<div class="v33-reader-card"><button class="v33-reader-close" aria-label="Fechar">×</button><div class="v33-reader-author"><img id="v33ReaderAvatar"><div><strong id="v33ReaderAuthor"></strong><span id="v33ReaderRole"></span></div></div><div class="v33-reader-topic" id="v33ReaderTopic"></div><h2 class="v33-reader-title" id="v33ReaderTitle"></h2><div class="v33-reader-body" id="v33ReaderBody"></div><div class="v33-reader-sources"><h4>Fontes e dados utilizados</h4><a class="v33-reader-source" id="v33ReaderSource" target="_blank" rel="noopener">Publicação original →</a><div class="v33-reader-note">A matéria de origem é utilizada como base factual. A interpretação, contexto e conclusão são análise editorial do VOZ NEWS.</div></div></div>';
  document.body.appendChild(reader);
  reader.querySelector('.v33-reader-close').onclick=()=>reader.classList.remove('open'); reader.onclick=e=>{if(e.target===reader)reader.classList.remove('open')};

  let headlines=[],index=0,updatedAt=null,rotateTimer=null,currentItem=null;
  const head=document.getElementById('v33head'),source=document.getElementById('v33source'),count=document.getElementById('v33count'),time=document.getElementById('v33time'),ticker=document.getElementById('v33ticker'),progress=document.getElementById('v33progress'),left=document.getElementById('v33left'),right=document.getElementById('v33right'),speaker=document.getElementById('v33speaker');
  const fmtTime=d=>new Date(d||Date.now()).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  const esc=s=>String(s||'').replace(/\s+/g,' ').trim();

  function analystFor(item){return analysts[item._order%2];}
  function analysisParagraphs(item,analyst){
    const title=esc(item.title),topic=esc(item.topic||'Eleições 2026');
    return [
      `A manchete “${title}” merece ser lida para além do impacto imediato. Em ${topic}, o ponto central é entender o que este fato altera no ambiente político, institucional e eleitoral, e não apenas quem ganhou espaço no noticiário de hoje.`,
      `Minha leitura é que a notícia ganha relevância porque ocorre num momento em que cada movimento dos principais atores passa a ser interpretado como sinal de força, fragilidade, aproximação ou distanciamento. Em campanha, forma e timing podem pesar tanto quanto o conteúdo da declaração ou decisão.`,
      `Também é preciso separar fato de narrativa. O fato é aquilo que pode ser confirmado pela publicação de origem e por dados verificáveis. A narrativa é a interpretação construída por partidos, candidatos, aliados e adversários. O eleitor ganha quando consegue distinguir claramente essas duas camadas.`,
      `Do ponto de vista estratégico, a repercussão desta notícia dependerá de quem consegue enquadrá-la melhor no debate público. Uma mesma informação pode fortalecer um candidato entre seus apoiadores e, ao mesmo tempo, mobilizar rejeição no campo adversário. É exatamente aí que a disputa eleitoral se torna mais complexa.`,
      `Há ainda uma dimensão institucional que não pode ser ignorada. Quando a pauta envolve governo, Justiça, Congresso, pesquisas ou decisões administrativas, o efeito eleitoral precisa ser analisado sem apagar as regras, competências e limites de cada instituição. Política e instituição se cruzam, mas não são a mesma coisa.`,
      `Para o eleitor, a pergunta mais útil é simples: o que muda concretamente depois deste fato? Se não houver mudança em alianças, agenda, intenção de voto, capacidade de campanha, decisão oficial ou comportamento dos atores, talvez estejamos diante de muito ruído e pouco efeito prático.`,
      `Nas próximas horas, vale observar as reações oficiais, eventuais pesquisas, novos pronunciamentos e a resposta dos adversários. São esses elementos que permitirão saber se a manchete terá vida longa ou se será substituída rapidamente por outro tema na disputa de 2026.`,
      `Esta é a análise do VOZ NEWS assinada por ${analyst.name}: informação verificada deve vir acompanhada de fonte, e opinião deve ser apresentada como opinião. Nosso compromisso é usar a notícia como ponto de partida para oferecer contexto, leitura crítica e consequência — sem confundir análise com fato.`
    ];
  }

  function openAnalysis(item){
    const analyst=analystFor(item),body=document.getElementById('v33ReaderBody');
    document.getElementById('v33ReaderAvatar').src=analyst.img; document.getElementById('v33ReaderAvatar').alt=analyst.name;
    document.getElementById('v33ReaderAuthor').textContent=analyst.name; document.getElementById('v33ReaderRole').textContent=analyst.role;
    document.getElementById('v33ReaderTopic').textContent=item.topic||'Eleições 2026'; document.getElementById('v33ReaderTitle').textContent=item.title;
    body.replaceChildren(...analysisParagraphs(item,analyst).map(p=>{const el=document.createElement('p');el.textContent=p;return el;}));
    const a=document.getElementById('v33ReaderSource'); a.href=item.link||'#'; a.textContent='Fonte factual: publicação original →';
    reader.classList.add('open');
  }

  function render(){if(!headlines.length)return; const item=headlines[index%headlines.length]; currentItem=item; const analyst=analystFor(item); head.textContent=item.title; head.onclick=e=>{e.preventDefault();openAnalysis(item)}; source.textContent=`${item.topic||'Eleições 2026'} • análise de ${analyst.name} • clique para abrir`; speaker.textContent=`ANÁLISE DE ${analyst.name.toUpperCase()}`; left.classList.toggle('active',analyst===analysts[0]); right.classList.toggle('active',analyst===analysts[1]); count.textContent=`Manchete ${index%headlines.length+1} de ${headlines.length}`; time.textContent=`Atualizado às ${fmtTime(updatedAt)}`; progress.style.animation='none';void progress.offsetWidth;progress.style.animation='v33bar 11s linear infinite';index=(index+1)%headlines.length;}
  function renderTicker(){ticker.innerHTML='';headlines.forEach(item=>{const a=document.createElement('a');a.className='v33-ticker-link';a.href='#';a.textContent=item.title;a.onclick=e=>{e.preventDefault();openAnalysis(item)};ticker.appendChild(a);});}
  async function loadHeadlines(){try{const r=await fetch('/api/headlines?ts='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error();const data=await r.json();if(!Array.isArray(data.headlines)||!data.headlines.length)throw new Error();headlines=data.headlines.slice(0,20).map((h,i)=>({...h,_order:i}));updatedAt=data.updatedAt||new Date().toISOString();index=0;renderTicker();render();clearInterval(rotateTimer);rotateTimer=setInterval(render,11000);}catch(e){head.textContent='As manchetes estão sendo atualizadas.';head.removeAttribute('href');source.textContent='Nova tentativa automática em instantes.';speaker.textContent='VOZ NEWS';count.textContent='VOZ NEWS';time.textContent=`Última tentativa às ${fmtTime()}`;ticker.textContent='ELEIÇÕES 2026 • cobertura em atualização';}}
  loadHeadlines(); setInterval(loadHeadlines,60*60*1000);
})();