(() => {
  const studio=document.getElementById('tv-ao-vivo');if(!studio)return;
  studio.querySelectorAll('video,iframe,embed').forEach(e=>e.remove());
  studio.querySelectorAll('.studio-presenters,.studio-overlay-logo,.anchor-name-tag,.studio-headline-panel,.studio-controls,.studio-status,.did-loading,.market-strip,.ticker,.enter-live-overlay,.live-badge,.studio-topline').forEach(e=>e.style.setProperty('display','none','important'));
  document.getElementById('v33-text-style')?.remove();document.getElementById('v33-text-news')?.remove();
  const presenters=[{name:'Dra. Deijanete Fayad',img:'./studio-deijanete-source.png'},{name:'Paulo Fayad',img:'./studio-paulo-source.png'}];
  const slugify=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,120);
  const analysisUrl=item=>'/analises/'+slugify(item.title)+'--deijanete-e-paulo-fayad';
  const style=document.createElement('style');style.id='v33-text-style';style.textContent=`
  #tv-ao-vivo{min-height:560px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:22px!important;background:linear-gradient(145deg,#0b2745,#174f7d 55%,#0d2034)!important}#tv-ao-vivo:before,#tv-ao-vivo:after{display:none!important}
  #v33-text-news{position:relative;z-index:80;width:min(1180px,97%);padding:26px;border-radius:26px;background:rgba(9,34,61,.97);border:1px solid rgba(255,255,255,.22);color:#fff;display:grid;grid-template-columns:360px minmax(0,1fr);gap:30px;align-items:center;overflow:hidden}
  .v33-duo{display:grid;grid-template-columns:1fr 1fr;gap:10px}.v33-person{min-width:0;background:#fff;border:2px solid #d4af37;border-radius:20px;overflow:hidden;text-align:center}.v33-person img{display:block;width:100%;height:285px;object-fit:contain;object-position:center bottom;background:#edf6fc;filter:brightness(1.5) contrast(.88) saturate(.98)}.v33-person strong{display:block;padding:10px 4px 3px;color:#10243a;font-size:13px}.v33-person span{display:block;padding:0 4px 11px;color:#9b7100;font-size:9px;font-weight:900;text-transform:uppercase}
  .v33-center{min-width:0;position:relative;padding:0 58px}.v33-top{display:flex;align-items:center;justify-content:space-between;gap:14px}.v33-brand{font-size:31px;font-weight:1000}.v33-live{padding:7px 11px;border-radius:999px;background:#c92828;font-size:10px;font-weight:1000}.v33-speaker{margin-top:14px;color:#d4af37;font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:.8px}.v33-head{display:block;margin-top:9px;max-width:760px;font-size:clamp(22px,2.5vw,34px);line-height:1.12;font-weight:1000;color:#fff;text-decoration:none}.v33-head:hover{text-decoration:underline;text-decoration-color:#d4af37}.v33-source{margin-top:11px;font-size:13px;line-height:1.4;color:#dcecf8;font-weight:700}.v33-meta{margin-top:15px;padding-top:12px;border-top:1px solid rgba(255,255,255,.18);font-size:11px;color:#d2e3f2;display:flex;justify-content:space-between;gap:12px}.v33-bar{height:3px;margin-top:15px;background:rgba(255,255,255,.18);overflow:hidden}.v33-bar span{display:block;height:100%;background:#d4af37;animation:v33bar 10s linear infinite}@keyframes v33bar{from{width:0}to{width:100%}}.v33-nav{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:52px;border:1px solid rgba(255,255,255,.35);border-radius:13px;background:rgba(255,255,255,.1);color:#fff;font-size:32px;cursor:pointer}.v33-nav.prev{left:2px}.v33-nav.next{right:2px}.v33-strip{grid-column:1/-1;overflow:hidden;border-radius:10px;background:#d4af37;color:#09111b;font-weight:900;height:44px;display:flex;align-items:center}.v33-strip-track{display:flex;align-items:center;gap:60px;width:max-content;padding-left:100%;animation:v33ticker 150s linear infinite}.v33-ticker-link{color:#09111b;text-decoration:none;white-space:nowrap;font-size:14px}@keyframes v33ticker{from{transform:translateX(0)}to{transform:translateX(-100%)}}
  @media(max-width:820px){#v33-text-news{grid-template-columns:260px minmax(0,1fr);gap:16px}.v33-person img{height:220px}.v33-center{padding:0 44px}.v33-head{font-size:27px}}
  @media(max-width:620px){#tv-ao-vivo{padding:9px!important}#v33-text-news{grid-template-columns:1fr;padding:14px;gap:14px}.v33-duo{width:min(330px,96%);margin:auto}.v33-person img{height:190px}.v33-center{padding:0 34px}.v33-brand{font-size:23px}.v33-head{font-size:23px}.v33-source{font-size:12px}.v33-nav{width:29px;height:42px;font-size:25px}.v33-strip{height:42px}.v33-ticker-link{font-size:13px}.v33-strip-track{animation-duration:180s}}
  `;document.head.appendChild(style);
  const box=document.createElement('div');box.id='v33-text-news';box.innerHTML=`<div class="v33-duo"><div class="v33-person"><img src="${presenters[0].img}" alt="${presenters[0].name}"><strong>${presenters[0].name}</strong><span>Jornalista • VOZ NEWS</span></div><div class="v33-person"><img src="${presenters[1].img}" alt="${presenters[1].name}"><strong>${presenters[1].name}</strong><span>Jornalista • VOZ NEWS</span></div></div><div class="v33-center"><div class="v33-top"><div class="v33-brand">VOZ NEWS</div><div class="v33-live">HOJE</div></div><div class="v33-speaker" id="v33speaker">DEIJANETE & PAULO • MANCHETES</div><button class="v33-nav prev" id="v33prev" aria-label="Notícia anterior">‹</button><a class="v33-head" id="v33head" href="#">Atualizando as notícias de hoje...</a><button class="v33-nav next" id="v33next" aria-label="Próxima notícia">›</button><div class="v33-source" id="v33source"></div><div class="v33-bar"><span id="v33progress"></span></div><div class="v33-meta"><span id="v33count"></span><span id="v33time"></span></div></div><div class="v33-strip"><div class="v33-strip-track" id="v33ticker"></div></div>`;studio.appendChild(box);
  let headlines=[],index=0,updatedAt=null,rotateTimer=null;const head=document.getElementById('v33head'),source=document.getElementById('v33source'),count=document.getElementById('v33count'),time=document.getElementById('v33time'),ticker=document.getElementById('v33ticker'),progress=document.getElementById('v33progress'),prev=document.getElementById('v33prev'),next=document.getElementById('v33next');const fmt=d=>new Date(d||Date.now()).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});function showAt(pos){if(!headlines.length)return;index=(pos+headlines.length)%headlines.length;const item=headlines[index];head.textContent=item.title;head.href=analysisUrl(item);source.textContent=`${item.topic||'Atualidade'} • cobertura rápida VOZ NEWS`;count.textContent=`${index+1} / ${headlines.length}`;time.textContent=`Atualizado às ${fmt(updatedAt)}`;progress.style.animation='none';void progress.offsetWidth;progress.style.animation='v33bar 10s linear infinite'}function nextItem(){showAt(index+1)}function restart(){clearInterval(rotateTimer);rotateTimer=setInterval(nextItem,10000)}prev.onclick=()=>{showAt(index-1);restart()};next.onclick=()=>{showAt(index+1);restart()};function renderTicker(){ticker.innerHTML='';headlines.forEach(item=>{const a=document.createElement('a');a.className='v33-ticker-link';a.href=analysisUrl(item);a.textContent=item.title;ticker.appendChild(a)})}async function load(){try{const r=await fetch('/api/headlines?ts='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error();const data=await r.json();if(!Array.isArray(data.headlines)||!data.headlines.length)throw new Error();headlines=data.headlines.slice(0,20);updatedAt=data.updatedAt||new Date().toISOString();index=0;renderTicker();showAt(0);restart()}catch(e){head.textContent='As manchetes de hoje estão sendo atualizadas.';source.textContent='Nova tentativa automática em instantes.';ticker.textContent='VOZ NEWS • atualização contínua'}}load();setInterval(load,15*60*1000);
  if(!document.querySelector('script[data-voznews-a11y]')){const s=document.createElement('script');s.src='/voznews-accessibilidade.js';s.defer=true;s.dataset.voznewsA11y='1';document.head.appendChild(s)}

  // Correção editorial do card Canon: remove a arte com nome incorreto,
  // preserva Fábio Zuccaratto no texto e acrescenta Paulo Fayad como entrevistador.
  const fixCanonCard=()=>{
    const cards=[...document.querySelectorAll('#empresas .visual-card')];
    const card=cards.find(c=>/F[ÁA]BIO\s+ZUCCARATTO/i.test(c.textContent||''));
    if(!card)return;
    const img=card.querySelector('img');
    if(img){
      img.src='./studio-paulo-source.png';
      img.alt='Paulo Fayad em entrevista para a TV Voz de Brasília — matéria com Fábio Zuccaratto, Canon do Brasil';
      img.style.objectFit='cover';
      img.style.objectPosition='center 18%';
      img.style.background='linear-gradient(180deg,#0a1d34,#061423)';
    }
    card.classList.add('canon-card-corrigido');
    const h3=card.querySelector('h3');
    if(h3)h3.textContent='FÁBIO ZUCCARATTO | CANON DO BRASIL';
    const p=card.querySelector('p');
    if(p)p.textContent='Paulo Fayad entrevista Fábio Zuccaratto sobre tecnologia, fotografia, inovação e estratégia empresarial da Canon do Brasil.';
    if(!card.querySelector('.canon-interviewer-badge')){
      const badge=document.createElement('div');
      badge.className='canon-interviewer-badge';
      badge.innerHTML='<strong>ENTREVISTA: PAULO FAYAD</strong><span>TV Voz de Brasília • VOZ NEWS</span>';
      card.querySelector('.visual-body')?.prepend(badge);
    }
  };
  const canonStyle=document.createElement('style');
  canonStyle.textContent=`
    #empresas .canon-card-corrigido{position:relative;overflow:hidden;border:1px solid rgba(212,175,55,.55)!important;box-shadow:0 18px 46px rgba(0,0,0,.28)}
    #empresas .canon-card-corrigido img{width:100%;height:330px!important;object-fit:cover!important;object-position:center 18%!important}
    #empresas .canon-interviewer-badge{display:flex;flex-direction:column;gap:3px;margin-bottom:12px;padding:10px 12px;border-radius:12px;background:linear-gradient(90deg,#d4af37,#f0cf69);color:#07172f}
    #empresas .canon-interviewer-badge strong{font-size:12px;letter-spacing:.5px}
    #empresas .canon-interviewer-badge span{font-size:10px;font-weight:800}
  `;
  document.head.appendChild(canonStyle);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fixCanonCard);else fixCanonCard();
})();