(() => {
  const studio=document.getElementById('tv-ao-vivo');
  if(!studio)return;
  const h=document.getElementById('visibleMainHeadline');
  const s=document.getElementById('visibleNewsSummary');
  const t=document.getElementById('visibleNewsTicker');
  const src=document.getElementById('visibleNewsSource');
  studio.querySelectorAll('video,iframe,embed').forEach(e=>e.remove());
  studio.querySelectorAll('.studio-presenters,.studio-overlay-logo,.anchor-name-tag,.studio-headline-panel,.studio-controls,.studio-status,.did-loading,.market-strip,.ticker,.enter-live-overlay,.live-badge,.studio-topline').forEach(e=>e.style.setProperty('display','none','important'));
  document.getElementById('v33-text-style')?.remove();
  document.getElementById('v33-text-news')?.remove();
  const style=document.createElement('style');
  style.id='v33-text-style';
  style.textContent=`#tv-ao-vivo{min-height:540px!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:28px!important;background:linear-gradient(145deg,#061326,#0b2c50 55%,#06101c)!important}#tv-ao-vivo:before,#tv-ao-vivo:after{display:none!important}#v33-text-news{position:relative;z-index:80;width:min(940px,94%);padding:44px;border-radius:26px;background:rgba(4,18,36,.96);border:1px solid rgba(255,255,255,.16);box-shadow:0 25px 65px rgba(0,0,0,.4);color:#fff}.v33-brand{font-size:34px;font-weight:1000}.v33-speaker{margin-top:26px;color:#d4af37;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:1px}.v33-head{margin-top:12px;font-size:clamp(32px,5vw,62px);line-height:1.03;font-weight:1000}.v33-sum{margin-top:18px;font-size:20px;line-height:1.45;color:#dce8f5}.v33-meta{margin-top:22px;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);font-size:13px;color:#a9c4de;display:flex;justify-content:space-between;gap:14px}.v33-bar{height:4px;margin-top:24px;background:rgba(255,255,255,.1);overflow:hidden;border-radius:10px}.v33-bar span{display:block;height:100%;background:#d4af37;animation:v33bar 7s linear infinite}@keyframes v33bar{from{width:0}to{width:100%}}@media(max-width:620px){#tv-ao-vivo{min-height:450px!important;padding:14px!important}#v33-text-news{padding:28px 20px}.v33-head{font-size:34px}.v33-sum{font-size:16px}.v33-meta{flex-direction:column}}`;
  document.head.appendChild(style);
  const box=document.createElement('div');
  box.id='v33-text-news';
  box.innerHTML='<div class="v33-brand">VOZ NEWS</div><div class="v33-speaker" id="v33speaker"></div><div class="v33-head" id="v33head"></div><div class="v33-sum" id="v33sum"></div><div class="v33-bar"><span></span></div><div class="v33-meta"><span id="v33ticker"></span><span id="v33time"></span></div>';
  studio.appendChild(box);
  const speakers=['Paulo Fayad','Dra. Deijanete Fayad'];let i=0;
  const text=(el,f)=>(el?.textContent||'').replace(/\s+/g,' ').trim()||f;
  function refresh(){document.getElementById('v33speaker').textContent=speakers[i++%2];document.getElementById('v33head').textContent=text(h,'Principais manchetes do Brasil e do mundo');document.getElementById('v33sum').textContent=text(s,'Informação clara, direta e atualizada ao longo do dia.');document.getElementById('v33ticker').textContent=text(t,'Notícias em tempo real • Brasil • Mundo • Brasília');document.getElementById('v33time').textContent=new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});}
  refresh();setInterval(refresh,7000);
})();