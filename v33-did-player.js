(()=>{if(!document.getElementById('voznews-accessibilidade-runtime')){const s=document.createElement('script');s.id='voznews-accessibilidade-runtime';s.src='/voznews-accessibilidade.js?v=20260904-selos';s.async=false;document.head.appendChild(s)}})();
(()=>{
  const studio=document.getElementById('tv-ao-vivo');
  if(!studio)return;

  /* Regra desta versão: nenhum elemento visual do Studio anterior é reaproveitado.
     Únicos arquivos preservados: as imagens-base dos dois avatares. */
  studio.innerHTML=`
    <div class="vn-studio-bg" aria-hidden="true">
      <div class="vn-ceiling">
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
      <div class="vn-stars"></div>
      <div class="vn-brand">
        <strong><span>VOZ</span> NEWS</strong>
        <b>VISIBILIDADE</b>
        <small>BRASÍLIA • BRASIL • MUNDO</small>
      </div>
      <div class="vn-city vn-city-bsb"><div class="vn-city-art bsb"></div><span>BRASÍLIA<small>BRASIL</small></span></div>
      <div class="vn-city vn-city-sp"><div class="vn-city-art sp"></div><span>SÃO PAULO<small>BRASIL</small></span></div>
      <div class="vn-city vn-city-ny"><div class="vn-city-art ny"></div><span>NOVA YORK<small>ESTADOS UNIDOS</small></span></div>
      <div class="vn-desk"><div class="vn-desk-logo"><strong>VOZ NEWS</strong><b>VISIBILIDADE</b><small>40 ANOS DE CREDIBILIDADE</small></div></div>
    </div>

    <div class="vn-live">● AO VIVO</div>
    <div class="vn-values">JORNALISMO<br>VISIBILIDADE<br>RESULTADOS</div>

    <div class="vn-presenters" aria-label="Apresentadores VOZ NEWS">
      <div class="vn-presenter vn-deijanete"><img src="./studio-deijanete-source.png" alt="Deijanete Fayad"><div class="vn-name">Deijanete Fayad</div></div>
      <div class="vn-presenter vn-paulo"><img src="./studio-paulo-source.png" alt="Paulo Fayad"><div class="vn-name">Paulo Fayad</div></div>
    </div>

    <div class="vn-market" aria-label="Mercado e clima">
      <div class="vn-market-label">MERCADO &amp; CLIMA</div>
      <div class="vn-market-track"><div class="vn-market-runner"><span id="marketInfo">Dólar • Euro • Ibovespa • Brasília • São Paulo • Rio de Janeiro</span><span id="marketInfoClone" aria-hidden="true">Dólar • Euro • Ibovespa • Brasília • São Paulo • Rio de Janeiro</span></div></div>
    </div>

    <div class="vn-hot" aria-label="Notícias quentes">
      <div class="vn-hot-label">🔥 NOTÍCIAS QUENTES</div>
      <div class="vn-hot-track"><div class="vn-hot-runner"><span id="visibleNewsTicker">Notícias em tempo real • Brasília • Brasil • Mundo</span><span id="visibleNewsTickerClone" aria-hidden="true">Notícias em tempo real • Brasília • Brasil • Mundo</span></div></div>
    </div>
  `;

  const oldStyle=document.getElementById('voznews-new-studio-only');if(oldStyle)oldStyle.remove();
  const style=document.createElement('style');style.id='voznews-new-studio-only';style.textContent=`
#tv-ao-vivo{position:relative!important;aspect-ratio:16/9!important;min-height:0!important;height:auto!important;overflow:hidden!important;border-radius:26px!important;background:#020b1b!important;isolation:isolate!important;box-shadow:0 30px 80px rgba(0,0,0,.52),0 0 36px rgba(0,119,255,.2)!important}
#tv-ao-vivo>*{box-sizing:border-box}.vn-studio-bg{position:absolute;inset:0;z-index:1;background:radial-gradient(circle at 50% 34%,rgba(24,105,255,.24),transparent 30%),linear-gradient(180deg,#03122c 0%,#06235b 44%,#03132d 100%);overflow:hidden}.vn-studio-bg:before{content:"";position:absolute;inset:0;background:linear-gradient(105deg,transparent 0 36%,rgba(126,208,255,.11) 46%,transparent 55%);animation:vnSweep 7s linear infinite;pointer-events:none}.vn-ceiling{position:absolute;left:6%;right:6%;top:2%;height:8%;display:flex;justify-content:space-between;align-items:flex-start;z-index:3}.vn-ceiling i{width:6%;height:20%;border-radius:999px;background:#57c7ff;box-shadow:0 0 8px #57c7ff,0 0 22px rgba(87,199,255,.66);animation:vnLed 1.7s ease-in-out infinite alternate}.vn-ceiling i:nth-child(even){animation-delay:-.85s}.vn-stars{position:absolute;inset:7% 17% 27% 17%;opacity:.9;background-image:radial-gradient(circle at 10% 18%,#fff 0 1.2px,transparent 2px),radial-gradient(circle at 24% 45%,#85cfff 0 1.3px,transparent 2.1px),radial-gradient(circle at 38% 17%,#fff 0 1px,transparent 2px),radial-gradient(circle at 51% 38%,#bde6ff 0 1.2px,transparent 2.1px),radial-gradient(circle at 67% 22%,#fff 0 1.2px,transparent 2px),radial-gradient(circle at 78% 48%,#6cc7ff 0 1.2px,transparent 2px),radial-gradient(circle at 91% 25%,#fff 0 1px,transparent 2px);animation:vnStars 2.6s ease-in-out infinite alternate}.vn-brand{position:absolute;left:50%;top:12%;transform:translateX(-50%);z-index:5;width:44%;text-align:center}.vn-brand strong{display:block;color:#eef6ff;font-size:clamp(30px,4.7vw,76px);line-height:.86;letter-spacing:-.055em;text-shadow:0 5px 16px rgba(0,0,0,.45)}.vn-brand strong span{color:#f4c744}.vn-brand b{display:block;color:#f4c744;font-size:clamp(14px,2vw,31px);letter-spacing:.16em;margin-top:1.2%}.vn-brand small{display:block;color:#d8e8ff;font-size:clamp(7px,.82vw,13px);font-weight:900;letter-spacing:.18em;margin-top:1.2%}.vn-city{position:absolute;top:10%;bottom:23%;width:18%;border:1px solid rgba(232,194,67,.32);background:linear-gradient(180deg,rgba(5,34,79,.88),rgba(2,15,39,.95));overflow:hidden}.vn-city-bsb{left:1.4%}.vn-city-sp{right:19.7%}.vn-city-ny{right:1.4%}.vn-city span{position:absolute;left:9%;bottom:7%;border-left:3px solid #f1c746;padding-left:8px;color:#fff;font-size:clamp(8px,.95vw,15px);font-weight:950;line-height:1.05;text-shadow:0 2px 5px #000}.vn-city span small{display:block;margin-top:3px;font-size:.66em}.vn-city-art{position:absolute;inset:12% 9% 17%;filter:drop-shadow(0 0 9px rgba(255,224,146,.2))}.vn-city-art.bsb:before,.vn-city-art.bsb:after{content:"";position:absolute;bottom:10%;width:38%;height:16%;border:4px solid #eef5ff;border-radius:50% 50% 10% 10%/100% 100% 18% 18%}.vn-city-art.bsb:before{left:2%}.vn-city-art.bsb:after{right:2%}.vn-city-art.bsb{background:linear-gradient(90deg,transparent 42%,#eef5ff 43% 47%,transparent 48% 53%,#eef5ff 54% 58%,transparent 59%) center bottom 22%/100% 66% no-repeat}.vn-city-art.sp{background:linear-gradient(90deg,transparent 0 15%,#e8f1ff 16% 19%,transparent 20% 32%,#e8f1ff 33% 37%,transparent 38% 52%,#e8f1ff 53% 58%,transparent 59% 70%,#e8f1ff 71% 75%,transparent 76%),linear-gradient(180deg,transparent 62%,#f0c748 63% 65%,transparent 66%)}.vn-city-art.ny{background:linear-gradient(90deg,transparent 0 8%,#c9dbf4 9% 19%,transparent 20% 25%,#edf4ff 26% 38%,transparent 39% 45%,#bdd4ef 46% 57%,transparent 58% 63%,#edf4ff 64% 80%,transparent 81%);clip-path:polygon(0 100%,0 50%,8% 50%,8% 34%,19% 34%,19% 56%,27% 56%,27% 26%,38% 26%,38% 47%,46% 47%,46% 12%,58% 12%,58% 42%,65% 42%,65% 29%,80% 29%,80% 58%,88% 58%,88% 39%,100% 39%,100% 100%)}.vn-desk{position:absolute;left:17%;right:17%;bottom:12.2%;height:27%;z-index:9;background:linear-gradient(180deg,#e9f3ff 0 5%,#1b4b90 6% 16%,#071832 17% 100%);border:2px solid rgba(240,196,62,.65);border-radius:46% 46% 5% 5%/20% 20% 8% 8%;clip-path:polygon(2% 0,98% 0,92% 100%,8% 100%);box-shadow:0 18px 30px rgba(0,0,0,.52),inset 0 0 30px rgba(31,114,255,.28)}.vn-desk-logo{position:absolute;left:33%;right:33%;top:28%;bottom:10%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 30%,#0b4aa1,#041327 75%);border:1px solid rgba(238,193,61,.42)}.vn-desk-logo strong{color:#fff;font-size:clamp(12px,1.7vw,27px);line-height:.9}.vn-desk-logo b{color:#f2c847;font-size:clamp(7px,.9vw,14px);letter-spacing:.12em}.vn-desk-logo small{color:#fff;font-size:clamp(5px,.58vw,9px);letter-spacing:.1em;margin-top:4px}.vn-live{position:absolute;z-index:30;left:1.5%;top:2%;background:#e51d2d;color:#fff;font-size:clamp(10px,1.2vw,19px);font-weight:950;padding:.7% 1.25%;border-radius:9px;box-shadow:0 8px 22px rgba(0,0,0,.35)}.vn-values{position:absolute;z-index:30;right:1.8%;top:3%;border-left:4px solid #f1c746;padding-left:9px;color:#fff;font-size:clamp(7px,.75vw,12px);font-weight:900;line-height:1.45;letter-spacing:.05em}.vn-presenters{position:absolute;inset:0;z-index:14;pointer-events:none}.vn-presenter{position:absolute;top:25%;width:27%;height:48%;display:flex;align-items:flex-end;justify-content:center}.vn-deijanete{left:21%}.vn-paulo{left:52%}.vn-presenter img{display:block;width:100%;height:100%;object-fit:contain;object-position:center bottom;image-rendering:auto;filter:contrast(1.06) saturate(1.04) drop-shadow(0 15px 16px rgba(0,0,0,.44))}.vn-name{position:absolute;bottom:-4%;left:50%;transform:translateX(-50%);min-width:64%;padding:2.8% 8%;border:1px solid #e4ba43;border-radius:6px;background:linear-gradient(180deg,#19437f,#071a38);color:#fff;text-align:center;font-size:clamp(9px,1vw,16px);font-weight:950;white-space:nowrap;box-shadow:0 7px 14px rgba(0,0,0,.4)}.vn-market{position:absolute;z-index:50;left:0;right:0;bottom:6.2%;height:6.2%;display:flex;background:#fff;color:#07172f;overflow:hidden;border-top:1px solid rgba(0,0,0,.12)}.vn-market-label{flex:0 0 auto;display:flex;align-items:center;padding:0 15px;background:#081a37;color:#fff;font-size:clamp(8px,.9vw,14px);font-weight:950;white-space:nowrap;border-right:3px solid #f1c746}.vn-market-track{flex:1;min-width:0;overflow:hidden;display:flex;align-items:center}.vn-market-runner{display:flex;align-items:center;width:max-content;min-width:max-content;animation:vnMarket 26s linear infinite;will-change:transform}.vn-market-runner span{display:block;flex:0 0 auto;white-space:nowrap;padding-right:90px;font-size:clamp(8px,.9vw,14px);font-weight:900}.vn-hot{position:absolute;z-index:51;left:0;right:0;bottom:0;height:6.2%;display:flex;background:#07172f;color:#fff;overflow:hidden}.vn-hot-label{flex:0 0 auto;display:flex;align-items:center;padding:0 15px;background:#e61d2b;font-size:clamp(8px,.85vw,13px);font-weight:950;white-space:nowrap}.vn-hot-track{flex:1;min-width:0;overflow:hidden;display:flex;align-items:center}.vn-hot-runner{display:flex;align-items:center;width:max-content;min-width:max-content;animation:vnHot 32s linear infinite;will-change:transform}.vn-hot-runner span{display:block;flex:0 0 auto;white-space:nowrap;padding-right:100px;font-size:clamp(8px,.85vw,13px);font-weight:850}.vn-market-runner span+span,.vn-hot-runner span+span{padding-left:20px}@keyframes vnSweep{from{transform:translateX(-45%)}to{transform:translateX(45%)}}@keyframes vnLed{from{opacity:.45;transform:scaleX(.9)}to{opacity:1;transform:scaleX(1.08)}}@keyframes vnStars{from{opacity:.42}to{opacity:1}}@keyframes vnMarket{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}@keyframes vnHot{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@media(max-width:760px){#tv-ao-vivo{border-radius:16px!important}.vn-values{display:none}.vn-brand{top:13%;width:47%}.vn-city{top:11%;bottom:23%;width:19%}.vn-city-bsb{left:.5%}.vn-city-sp{right:19.6%}.vn-city-ny{right:.5%}.vn-presenter{top:26%;height:47%;width:28%}.vn-deijanete{left:20%}.vn-paulo{left:52%}.vn-market-label,.vn-hot-label{padding:0 7px}.vn-market-runner span,.vn-hot-runner span{padding-right:42px}.vn-city span{font-size:5px!important;border-left-width:2px;padding-left:3px}.vn-desk-logo small{display:none}}
@media(prefers-reduced-motion:reduce){.vn-ceiling i,.vn-stars,.vn-studio-bg:before,.vn-market-runner,.vn-hot-runner{animation:none!important}}
`;
  document.head.appendChild(style);

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