(()=>{if(!document.getElementById('voznews-accessibilidade-runtime')){const s=document.createElement('script');s.id='voznews-accessibilidade-runtime';s.src='/voznews-accessibilidade.js?v=20260904-selos';s.async=false;document.head.appendChild(s)}})();

(()=>{
  const studio=document.getElementById('tv-ao-vivo');
  if(!studio)return;

  studio.innerHTML=`
    <img class="vn-approved-image" alt="Estúdio futurista VOZ NEWS com Deijanete Fayad e Paulo Fayad" fetchpriority="high">
    <div class="vn-image-status" aria-live="polite">Carregando estúdio VOZ NEWS…</div>
    <div class="vn-market" aria-label="Mercado e clima">
      <div class="vn-market-label">MERCADO &amp; CLIMA</div>
      <div class="vn-market-track"><div class="vn-market-runner"><span id="marketInfo">Dólar • Euro • Brasília • São Paulo • Rio de Janeiro</span><span id="marketInfoClone" aria-hidden="true">Dólar • Euro • Brasília • São Paulo • Rio de Janeiro</span></div></div>
    </div>
    <div class="vn-hot" aria-label="Notícias quentes">
      <div class="vn-hot-label">🔥 NOTÍCIAS QUENTES</div>
      <div class="vn-hot-track"><div class="vn-hot-runner"><span id="visibleNewsTicker">Notícias em tempo real • Brasília • Brasil • Mundo</span><span id="visibleNewsTickerClone" aria-hidden="true">Notícias em tempo real • Brasília • Brasil • Mundo</span></div></div>
    </div>
  `;

  const oldStyle=document.getElementById('voznews-new-studio-only');if(oldStyle)oldStyle.remove();
  const style=document.createElement('style');
  style.id='voznews-new-studio-only';
  style.textContent=`
#tv-ao-vivo{position:relative!important;aspect-ratio:800/440!important;min-height:0!important;height:auto!important;overflow:hidden!important;border-radius:26px!important;background:#04142b!important;isolation:isolate!important;box-shadow:0 30px 80px rgba(0,0,0,.52),0 0 36px rgba(0,119,255,.20)!important}
#tv-ao-vivo::before,#tv-ao-vivo::after{content:none!important;display:none!important}
#tv-ao-vivo>*{box-sizing:border-box}
.vn-approved-image{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;display:block!important;visibility:visible!important;opacity:1!important;z-index:1!important;object-fit:cover!important;object-position:center center!important;background:#04142b!important}
.vn-image-status{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%);padding:10px 16px;border-radius:999px;background:rgba(4,20,43,.82);border:1px solid rgba(212,175,55,.45);color:#fff;font-size:12px;font-weight:900;letter-spacing:.4px;pointer-events:none}.vn-image-status.ready{display:none}.vn-image-status.error{background:#7d1320;border-color:#ff6070}
.vn-market{position:absolute!important;z-index:50!important;left:0!important;right:0!important;bottom:5.2%!important;height:5.2%!important;display:flex!important;background:#fff!important;color:#07172f!important;overflow:hidden!important;border-top:1px solid rgba(0,0,0,.12)!important}
.vn-market-label{flex:0 0 auto;display:flex;align-items:center;padding:0 15px;background:#081a37;color:#fff;font-size:clamp(8px,.9vw,14px);font-weight:950;white-space:nowrap;border-right:3px solid #f1c746}.vn-market-track{flex:1;min-width:0;overflow:hidden;display:flex;align-items:center}.vn-market-runner{display:flex;align-items:center;width:max-content;min-width:max-content;animation:vnMarket 26s linear infinite;will-change:transform}.vn-market-runner span{display:block;flex:0 0 auto;white-space:nowrap;padding-right:90px;font-size:clamp(8px,.9vw,14px);font-weight:900}
.vn-hot{position:absolute!important;z-index:51!important;left:0!important;right:0!important;bottom:0!important;height:5.2%!important;display:flex!important;background:#07172f!important;color:#fff!important;overflow:hidden!important}.vn-hot-label{flex:0 0 auto;display:flex;align-items:center;padding:0 15px;background:#e61d2b;font-size:clamp(8px,.85vw,13px);font-weight:950;white-space:nowrap}.vn-hot-track{flex:1;min-width:0;overflow:hidden;display:flex;align-items:center}.vn-hot-runner{display:flex;align-items:center;width:max-content;min-width:max-content;animation:vnHot 32s linear infinite;will-change:transform}.vn-hot-runner span{display:block;flex:0 0 auto;white-space:nowrap;padding-right:100px;font-size:clamp(8px,.85vw,13px);font-weight:850}.vn-market-runner span+span,.vn-hot-runner span+span{padding-left:20px}
@keyframes vnMarket{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}@keyframes vnHot{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@media(max-width:760px){#tv-ao-vivo{border-radius:16px!important}.vn-market-label,.vn-hot-label{padding:0 7px}.vn-market-runner span,.vn-hot-runner span{padding-right:42px}.vn-image-status{font-size:10px;padding:8px 12px}}
@media(prefers-reduced-motion:reduce){.vn-market-runner,.vn-hot-runner{animation:none!important}}
`;
  document.head.appendChild(style);

  const imageLayer=studio.querySelector('.vn-approved-image');
  const imageStatus=studio.querySelector('.vn-image-status');
  const parts=[1,2,3,4,5,6].map(n=>`/studio-final-20260905-part${n}.b64?v=final2`);
  Promise.all(parts.map(url=>fetch(url,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`${url}:${r.status}`);return r.text()})))
    .then(chunks=>{
      const data=chunks.join('').replace(/\s+/g,'');
      if(data.length!==41740 || !data.startsWith('UklG'))throw new Error(`payload:${data.length}`);
      imageLayer.onload=()=>{imageStatus.classList.add('ready');document.documentElement.dataset.voznewsStudio='ready'};
      imageLayer.onerror=()=>{imageStatus.textContent='Erro ao carregar a imagem do estúdio';imageStatus.classList.add('error');document.documentElement.dataset.voznewsStudio='error'};
      imageLayer.src=`data:image/webp;base64,${data}`;
    })
    .catch(err=>{console.error('VOZ NEWS Studio:',err);imageStatus.textContent='Erro ao carregar a imagem do estúdio';imageStatus.classList.add('error');document.documentElement.dataset.voznewsStudio='error'});

  const marketInfo=document.getElementById('marketInfo');
  const marketInfoClone=document.getElementById('marketInfoClone');
  const ticker=document.getElementById('visibleNewsTicker');
  const tickerClone=document.getElementById('visibleNewsTickerClone');
  const money=v=>Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const pct=v=>`${Number(v)>=0?'▲':'▼'} ${Math.abs(Number(v)).toFixed(2)}%`;
  async function get(url){try{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw 0;return await r.json()}catch(e){return null}}
  async function updateMarket(){
    const p=[];
    const fx=await get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
    if(fx?.USDBRL)p.push(`Dólar ${money(fx.USDBRL.bid)} ${pct(fx.USDBRL.pctChange)}`);
    if(fx?.EURBRL)p.push(`Euro ${money(fx.EURBRL.bid)} ${pct(fx.EURBRL.pctChange)}`);
    const cities=[['Brasília',-15.7939,-47.8828],['São Paulo',-23.5505,-46.6333],['Rio de Janeiro',-22.9068,-43.1729]];
    for(const [name,lat,lon] of cities){const w=await get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`);if(w?.current)p.push(`${name} ${Math.round(w.current.temperature_2m)}°C`)}
    const text=(p.length?p:['Mercado e clima em atualização']).join('   •   ')+'   •   ';
    marketInfo.textContent=text;marketInfoClone.textContent=text;
  }
  async function updateNews(){
    let items=[];const n=await get('/api/news');if(Array.isArray(n?.items))items=n.items.map(x=>x?.title).filter(Boolean).slice(0,8);
    if(!items.length)items=['Notícias em tempo real','Brasília em destaque','Brasil e mundo agora'];
    const text=items.join('   •   ')+'   •   ';ticker.textContent=text;tickerClone.textContent=text;
  }
  updateMarket();updateNews();setInterval(updateMarket,600000);setInterval(updateNews,300000);
})();