(() => {
  const studio=document.getElementById('tv-ao-vivo');
  if(!studio)return;
  studio.querySelectorAll('video,iframe,embed').forEach(e=>e.remove());
  studio.querySelectorAll('.studio-presenters,.studio-overlay-logo,.anchor-name-tag,.studio-headline-panel,.studio-controls,.studio-status,.did-loading,.market-strip,.ticker,.enter-live-overlay,.live-badge,.studio-topline').forEach(e=>e.style.setProperty('display','none','important'));
  document.getElementById('v33-text-style')?.remove();
  document.getElementById('v33-text-news')?.remove();

  const style=document.createElement('style');
  style.id='v33-text-style';
  style.textContent=`#tv-ao-vivo{min-height:540px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:28px!important;background:linear-gradient(145deg,#061326,#0b2c50 55%,#06101c)!important}#tv-ao-vivo:before,#tv-ao-vivo:after{display:none!important}#v33-text-news{position:relative;z-index:80;width:min(980px,94%);padding:44px;border-radius:26px;background:rgba(4,18,36,.97);border:1px solid rgba(255,255,255,.16);box-shadow:0 25px 65px rgba(0,0,0,.4);color:#fff}.v33-top{display:flex;align-items:center;justify-content:space-between;gap:16px}.v33-brand{font-size:34px;font-weight:1000}.v33-live{padding:7px 11px;border-radius:999px;background:#c92828;font-size:11px;font-weight:1000;letter-spacing:.8px}.v33-speaker{margin-top:26px;color:#d4af37;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:1px}.v33-head{margin-top:12px;font-size:clamp(31px,5vw,60px);line-height:1.04;font-weight:1000;min-height:2.08em}.v33-source{margin-top:16px;font-size:14px;color:#9fc7eb;font-weight:800}.v33-meta{margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:#a9c4de;display:flex;justify-content:space-between;gap:14px}.v33-bar{height:4px;margin-top:24px;background:rgba(255,255,255,.1);overflow:hidden;border-radius:10px}.v33-bar span{display:block;height:100%;background:#d4af37;animation:v33bar 9s linear infinite}@keyframes v33bar{from{width:0}to{width:100%}}.v33-strip{margin-top:20px;overflow:hidden;border-radius:8px;background:#d4af37;color:#09111b;font-weight:1000;height:38px;display:flex;align-items:center}.v33-strip-track{white-space:nowrap;display:inline-block;padding-left:100%;animation:v33ticker 42s linear infinite}@keyframes v33ticker{from{transform:translateX(0)}to{transform:translateX(-100%)}}@media(max-width:620px){#tv-ao-vivo{min-height:460px!important;padding:14px!important}#v33-text-news{padding:28px 20px}.v33-head{font-size:33px;min-height:3.1em}.v33-meta{flex-direction:column}.v33-brand{font-size:28px}}`;
  document.head.appendChild(style);

  const box=document.createElement('div');
  box.id='v33-text-news';
  box.innerHTML='<div class="v33-top"><div class="v33-brand">VOZ NEWS</div><div class="v33-live">AO VIVO</div></div><div class="v33-speaker" id="v33speaker">MANCHETES AGORA</div><div class="v33-head" id="v33head">Carregando as principais notícias...</div><div class="v33-source" id="v33source">Brasil • Brasília • Mundo</div><div class="v33-bar"><span id="v33progress"></span></div><div class="v33-meta"><span id="v33count"></span><span id="v33time"></span></div><div class="v33-strip"><div class="v33-strip-track" id="v33ticker">Atualizando manchetes...</div></div>';
  studio.appendChild(box);

  let headlines=[];
  let index=0;
  let updatedAt=null;
  let rotateTimer=null;

  const head=document.getElementById('v33head');
  const source=document.getElementById('v33source');
  const count=document.getElementById('v33count');
  const time=document.getElementById('v33time');
  const ticker=document.getElementById('v33ticker');
  const progress=document.getElementById('v33progress');

  function fmtTime(date){
    return new Date(date||Date.now()).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});
  }

  function render(){
    if(!headlines.length)return;
    const item=headlines[index%headlines.length];
    head.textContent=item.title;
    source.textContent='VOZ NEWS • seleção das principais manchetes';
    count.textContent=`Manchete ${index%headlines.length+1} de ${headlines.length}`;
    time.textContent=`Atualizado às ${fmtTime(updatedAt)}`;
    progress.style.animation='none';
    void progress.offsetWidth;
    progress.style.animation='v33bar 9s linear infinite';
    index=(index+1)%headlines.length;
  }

  function renderTicker(){
    ticker.textContent=headlines.map(h=>h.title).join('   •   ');
  }

  async function loadHeadlines(){
    try{
      const r=await fetch('/api/headlines?ts='+Date.now(),{cache:'no-store'});
      if(!r.ok)throw new Error('status '+r.status);
      const data=await r.json();
      if(!Array.isArray(data.headlines)||!data.headlines.length)throw new Error('sem manchetes');
      headlines=data.headlines.slice(0,15);
      updatedAt=data.updatedAt||new Date().toISOString();
      index=0;
      renderTicker();
      render();
      clearInterval(rotateTimer);
      rotateTimer=setInterval(render,9000);
    }catch(e){
      head.textContent='As manchetes estão sendo atualizadas.';
      source.textContent='Nova tentativa automática em instantes.';
      count.textContent='VOZ NEWS';
      time.textContent=`Última tentativa às ${fmtTime()}`;
      ticker.textContent='VOZ NEWS • informação atualizada ao longo do dia';
    }
  }

  loadHeadlines();
  setInterval(loadHeadlines,60*60*1000);
})();