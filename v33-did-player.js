(()=>{if(!document.getElementById('voznews-accessibilidade-runtime')){const s=document.createElement('script');s.id='voznews-accessibilidade-runtime';s.src='/voznews-accessibilidade.js?v=20260904-selos';s.async=false;document.head.appendChild(s)}})();

(()=>{
  function init(){
    const studio=document.getElementById('tv-ao-vivo');
    if(!studio)return false;

    studio.innerHTML=`
      <img class="vn-approved-image" src="/studio-voznews-final.png?v=20260905-hq-luzes" alt="Estúdio futurista VOZ NEWS com Deijanete Fayad e Paulo Fayad" fetchpriority="high" decoding="async">
      <div class="vn-avatar-stage" aria-hidden="true">
        <div class="vn-avatar-host vn-avatar-deijanete"><video class="vn-avatar-video" playsinline preload="metadata"></video></div>
        <div class="vn-avatar-host vn-avatar-paulo"><video class="vn-avatar-video" playsinline preload="metadata"></video></div>
      </div>
      <div class="vn-lightfx" aria-hidden="true"><span class="vn-ray vn-ray-a"></span><span class="vn-ray vn-ray-b"></span><span class="vn-ray vn-ray-c"></span></div>
      <div class="vn-image-status" aria-live="polite">Carregando estúdio VOZ NEWS…</div>
      <div class="vn-market" aria-label="Mercado e clima">
        <div class="vn-market-label">MERCADO &amp; CLIMA</div>
        <div class="vn-market-track"><div class="vn-market-runner"><span id="marketInfo">Dólar • Euro • Brasília • São Paulo • Rio de Janeiro</span><span id="marketInfoClone" aria-hidden="true">Dólar • Euro • Brasília • São Paulo • Rio de Janeiro</span></div></div>
      </div>
      <div class="vn-hot" aria-label="Notícias quentes">
        <div class="vn-hot-label">🔥 NOTÍCIAS QUENTES</div>
        <div class="vn-hot-track"><div class="vn-hot-runner"><span id="visibleNewsTicker">Notícias em tempo real • Brasília • Brasil • Mundo</span><span id="visibleNewsTickerClone" aria-hidden="true">Notícias em tempo real • Brasília • Brasil • Mundo</span></div></div>
      </div>`;

    const oldStyle=document.getElementById('voznews-new-studio-only');if(oldStyle)oldStyle.remove();
    const style=document.createElement('style');
    style.id='voznews-new-studio-only';
    style.textContent=`
#tv-ao-vivo{position:relative!important;aspect-ratio:800/440!important;min-height:0!important;height:auto!important;overflow:hidden!important;border-radius:26px!important;background:#04142b!important;isolation:isolate!important;box-shadow:0 30px 80px rgba(0,0,0,.52),0 0 36px rgba(0,119,255,.20)!important}
#tv-ao-vivo::before,#tv-ao-vivo::after{content:none!important;display:none!important}
#tv-ao-vivo>*{box-sizing:border-box}
.vn-approved-image{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;display:block!important;visibility:visible!important;opacity:1!important;z-index:1!important;object-fit:cover!important;object-position:center center!important;background:#04142b!important;image-rendering:auto!important}
.vn-avatar-stage{position:absolute!important;inset:0!important;z-index:4!important;pointer-events:none!important;overflow:hidden!important;clip-path:inset(0 0 10.4% 0)!important;opacity:0!important;transition:opacity .22s ease!important}
.vn-avatar-stage.vn-running{opacity:1!important}
.vn-avatar-host{position:absolute!important;top:18%!important;width:28%!important;height:57%!important;overflow:visible!important;opacity:0!important;transition:opacity .16s linear!important;transform-origin:50% 70%!important;will-change:transform,opacity!important}
.vn-avatar-deijanete{left:19%!important}.vn-avatar-paulo{left:53%!important}
.vn-avatar-host.vn-speaking,.vn-avatar-host.vn-listening,.vn-avatar-host.vn-has-frame{opacity:1!important}
.vn-avatar-video{position:absolute!important;inset:-5%!important;width:110%!important;height:110%!important;max-width:none!important;display:block!important;z-index:4!important;object-fit:cover!important;object-position:center 18%!important;background:transparent!important;border:0!important;pointer-events:none!important;opacity:0!important;visibility:hidden!important;transition:opacity .10s linear!important;backface-visibility:hidden!important;transform:translateZ(0);-webkit-mask-image:radial-gradient(ellipse 36% 42% at 50% 31%,#000 0%,#000 57%,rgba(0,0,0,.92) 69%,rgba(0,0,0,.42) 84%,transparent 100%);mask-image:radial-gradient(ellipse 36% 42% at 50% 31%,#000 0%,#000 57%,rgba(0,0,0,.92) 69%,rgba(0,0,0,.42) 84%,transparent 100%);-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%}
.vn-avatar-host.vn-speaking .vn-avatar-video,.vn-avatar-host.vn-listening .vn-avatar-video,.vn-avatar-host.vn-has-frame .vn-avatar-video{opacity:1!important;visibility:visible!important}
.vn-avatar-deijanete.vn-speaking .vn-avatar-video{animation:vnSpeakSoft 2.8s ease-in-out infinite}
.vn-avatar-paulo.vn-speaking .vn-avatar-video{animation:vnSpeakSoft 3.1s ease-in-out infinite}
.vn-avatar-deijanete.vn-listening .vn-avatar-video,.vn-avatar-deijanete.vn-turn-partner .vn-avatar-video{animation:vnPartnerRight 3.4s ease-in-out infinite}
.vn-avatar-paulo.vn-listening .vn-avatar-video,.vn-avatar-paulo.vn-turn-partner .vn-avatar-video{animation:vnPartnerLeft 3.4s ease-in-out infinite}
.vn-lightfx{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden;mix-blend-mode:screen}
.vn-lightfx::before{content:"";position:absolute;inset:-8%;pointer-events:none;background:radial-gradient(circle at 7% 5%,rgba(87,205,255,.52),transparent 4.5%),radial-gradient(circle at 15% 3%,rgba(180,239,255,.58),transparent 4.5%),radial-gradient(circle at 24% 5%,rgba(72,180,255,.48),transparent 4%),radial-gradient(circle at 34% 2%,rgba(216,248,255,.60),transparent 4.5%),radial-gradient(circle at 44% 4%,rgba(75,191,255,.48),transparent 4%),radial-gradient(circle at 55% 2%,rgba(205,246,255,.58),transparent 4.5%),radial-gradient(circle at 65% 4%,rgba(77,187,255,.48),transparent 4%),radial-gradient(circle at 76% 3%,rgba(206,247,255,.58),transparent 4.5%),radial-gradient(circle at 86% 5%,rgba(70,180,255,.48),transparent 4%),radial-gradient(circle at 95% 4%,rgba(163,232,255,.54),transparent 4.5%),radial-gradient(circle at 7% 28%,rgba(55,165,255,.28),transparent 3.5%),radial-gradient(circle at 18% 24%,rgba(82,203,255,.32),transparent 3.5%),radial-gradient(circle at 83% 24%,rgba(82,203,255,.32),transparent 3.5%),radial-gradient(circle at 94% 28%,rgba(55,165,255,.28),transparent 3.5%);animation:vnPulse 3.8s ease-in-out infinite alternate}
.vn-lightfx::after{content:none!important;display:none!important;animation:none!important}
.vn-ray{position:absolute;left:-42%;width:58%;height:2px;border-radius:999px;background:linear-gradient(90deg,transparent,rgba(90,220,255,.12),rgba(168,239,255,.88),rgba(71,184,255,.18),transparent);box-shadow:0 0 8px rgba(102,220,255,.5),0 0 20px rgba(35,135,255,.25);filter:blur(.15px);transform:rotate(-7deg)}
.vn-ray-a{top:24%;animation:vnRayA 8.5s linear infinite}
.vn-ray-b{top:49%;animation:vnRayB 10.5s linear infinite 1.2s;opacity:.72}
.vn-ray-c{top:68%;animation:vnRayA 12.5s linear infinite 2.4s;opacity:.48;transform:rotate(6deg)}
.vn-image-status{position:absolute;z-index:8;left:50%;top:50%;transform:translate(-50%,-50%);padding:10px 16px;border-radius:999px;background:rgba(4,20,43,.82);border:1px solid rgba(212,175,55,.45);color:#fff;font-size:12px;font-weight:900;letter-spacing:.4px;pointer-events:none}.vn-image-status.ready{display:none}.vn-image-status.error{background:#7d1320;border-color:#ff6070}
.vn-market{position:absolute!important;z-index:50!important;left:0!important;right:0!important;bottom:5.2%!important;height:5.2%!important;display:flex!important;background:#fff!important;color:#07172f!important;overflow:hidden!important;border-top:1px solid rgba(0,0,0,.12)!important}
.vn-market-label{flex:0 0 auto;display:flex;align-items:center;padding:0 15px;background:#081a37;color:#fff;font-size:clamp(8px,.9vw,14px);font-weight:950;white-space:nowrap;border-right:3px solid #f1c746}.vn-market-track{flex:1;min-width:0;overflow:hidden;display:flex;align-items:center}.vn-market-runner{display:flex;align-items:center;width:max-content;min-width:max-content;animation:vnMarket 18s linear infinite;will-change:transform}.vn-market-runner span{display:block;flex:0 0 auto;white-space:nowrap;padding-right:90px;font-size:clamp(8px,.9vw,14px);font-weight:900}
.vn-hot{position:absolute!important;z-index:51!important;left:0!important;right:0!important;bottom:0!important;height:5.2%!important;display:flex!important;background:#07172f!important;color:#fff!important;overflow:hidden!important}.vn-hot-label{flex:0 0 auto;display:flex;align-items:center;padding:0 15px;background:#e61d2b;font-size:clamp(8px,.85vw,13px);font-weight:950;white-space:nowrap}.vn-hot-track{flex:1;min-width:0;overflow:hidden;display:flex;align-items:center}.vn-hot-runner{display:flex;align-items:center;width:max-content;min-width:max-content;animation:vnHot 36s linear infinite;will-change:transform;backface-visibility:hidden;transform:translateZ(0)}.vn-hot-runner span{display:block;flex:0 0 auto;white-space:nowrap;padding:0 100px 0 20px;font-size:clamp(8px,.85vw,13px);font-weight:850}.vn-market-runner span+span,.vn-hot-runner span+span{padding-left:20px}
@keyframes vnSpeakSoft{0%,100%{transform:translate3d(0,0,0) scale(1)}45%{transform:translate3d(0,-.8px,0) scale(1.002)}72%{transform:translate3d(.5px,-.3px,0) scale(1.001)}}
@keyframes vnPartnerRight{0%,100%{transform:translate3d(0,0,0) perspective(700px) rotateY(0deg) rotate(0deg)}48%{transform:translate3d(1.5%,0,0) perspective(700px) rotateY(-2.2deg) rotate(.28deg)}72%{transform:translate3d(1%,.2%,0) perspective(700px) rotateY(-1.4deg) rotate(.16deg)}}
@keyframes vnPartnerLeft{0%,100%{transform:translate3d(0,0,0) perspective(700px) rotateY(0deg) rotate(0deg)}48%{transform:translate3d(-1.5%,0,0) perspective(700px) rotateY(2.2deg) rotate(-.28deg)}72%{transform:translate3d(-1%,.2%,0) perspective(700px) rotateY(1.4deg) rotate(-.16deg)}}
@keyframes vnPulse{0%{opacity:.32;filter:brightness(.94)}45%{opacity:.62;filter:brightness(1.08)}100%{opacity:.40;filter:brightness(1)}}
@keyframes vnLedSweep{0%{transform:translate3d(0,0,0) skewX(-14deg);opacity:.28}12%{opacity:.86}50%{opacity:1}88%{opacity:.78}100%{transform:translate3d(220%,0,0) skewX(-14deg);opacity:.24}}
@keyframes vnRayA{0%{transform:translate3d(0,0,0) rotate(-7deg);opacity:0}10%{opacity:.62}80%{opacity:.48}100%{transform:translate3d(265%,0,0) rotate(-7deg);opacity:0}}
@keyframes vnRayB{0%{transform:translate3d(250%,0,0) rotate(5deg);opacity:0}12%{opacity:.5}88%{opacity:.4}100%{transform:translate3d(-40%,0,0) rotate(5deg);opacity:0}}
@keyframes vnMarket{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}@keyframes vnHot{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
@media(max-width:760px){#tv-ao-vivo{border-radius:16px!important}.vn-market-label,.vn-hot-label{padding:0 7px}.vn-market-runner span,.vn-hot-runner span{padding-right:42px}.vn-image-status{font-size:10px;padding:8px 12px}.vn-ray{height:1px}.vn-lightfx::after{filter:blur(5px)}.vn-avatar-host{top:17%!important;width:31%!important;height:58%!important}.vn-avatar-deijanete{left:16%!important}.vn-avatar-paulo{left:53%!important}}
`;
    document.head.appendChild(style);

    const imageLayer=studio.querySelector('.vn-approved-image');
    const imageStatus=studio.querySelector('.vn-image-status');
    const fallbackSrc=imageLayer.getAttribute('src');
    let loadingLatest=false;
    imageLayer.onload=()=>{loadingLatest=false;imageStatus.classList.add('ready');document.documentElement.dataset.voznewsStudio='ready'};
    imageLayer.onerror=()=>{
      if(loadingLatest){loadingLatest=false;imageLayer.src=fallbackSrc;return}
      imageStatus.textContent='Erro ao carregar a imagem do estúdio';imageStatus.classList.add('error');document.documentElement.dataset.voznewsStudio='error';
    };

    const latestParts=Array.from({length:8},(_,i)=>`/studio-latest-20260905-part${i+1}.b64?v=20260905-1510`);
    Promise.all(latestParts.map(url=>fetch(url,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(`${url}:${r.status}`);return r.text()})))
      .then(chunks=>{
        const data=chunks.join('').replace(/\s+/g,'');
        if(data.length!==71564||!data.startsWith('UklG'))throw new Error(`payload:${data.length}`);
        loadingLatest=true;
        imageLayer.src=`data:image/webp;base64,${data}`;
      })
      .catch(err=>{console.error('VOZ NEWS Studio latest:',err);document.documentElement.dataset.voznewsStudio='fallback'});

    const avatarTurns=[
      {presenter:'paulo',src:'/assets/v33-real/01-paulo.mp4',mode:'camera'},
      {presenter:'deijanete',src:'/assets/v33-real/02-deijanete.mp4',mode:'partner'},
      {presenter:'paulo',src:'/assets/v33-real/03-paulo.mp4',mode:'partner'},
      {presenter:'deijanete',src:'/assets/v33-real/04-deijanete.mp4',mode:'camera'},
      {presenter:'paulo',src:'/assets/v33-real/05-paulo.mp4',mode:'camera'},
      {presenter:'deijanete',src:'/assets/v33-real/06-deijanete.mp4',mode:'partner'},
      {presenter:'paulo',src:'/assets/v33-real/07-paulo.mp4',mode:'partner'},
      {presenter:'deijanete',src:'/assets/v33-real/08-deijanete.mp4',mode:'camera'},
      {presenter:'paulo',src:'/assets/v33-real/09-paulo.mp4',mode:'partner'},
      {presenter:'deijanete',src:'/assets/v33-real/10-deijanete.mp4',mode:'partner'}
    ];
    const avatarStage=studio.querySelector('.vn-avatar-stage');
    const avatarHosts={deijanete:studio.querySelector('.vn-avatar-deijanete'),paulo:studio.querySelector('.vn-avatar-paulo')};
    const avatarVideos={deijanete:avatarHosts.deijanete.querySelector('.vn-avatar-video'),paulo:avatarHosts.paulo.querySelector('.vn-avatar-video')};
    let avatarIndex=0,avatarTimer=null,avatarRunning=false,audioEnabled=false;

    function enableAvatarAudio(){
      audioEnabled=true;
      Object.values(avatarVideos).forEach(video=>{video.muted=false});
    }
    document.addEventListener('pointerdown',enableAvatarAudio,{once:true,capture:true});

    function clearAvatarClasses(host){host.classList.remove('vn-speaking','vn-listening','vn-turn-partner','vn-turn-camera')}
    function scheduleAvatarNext(delay=380){
      clearTimeout(avatarTimer);
      avatarTimer=setTimeout(()=>{if(!avatarRunning)return;avatarIndex=(avatarIndex+1)%avatarTurns.length;playAvatarTurn()},delay);
    }
    function playAvatarTurn(){
      if(!avatarRunning)return;
      const turn=avatarTurns[avatarIndex];
      const active=avatarHosts[turn.presenter];
      const partnerName=turn.presenter==='deijanete'?'paulo':'deijanete';
      const partner=avatarHosts[partnerName];
      const video=avatarVideos[turn.presenter];
      const partnerVideo=avatarVideos[partnerName];

      clearAvatarClasses(active);clearAvatarClasses(partner);
      active.classList.add('vn-speaking',turn.mode==='partner'?'vn-turn-partner':'vn-turn-camera');
      if(partner.classList.contains('vn-has-frame'))partner.classList.add('vn-listening');

      try{partnerVideo.pause()}catch(e){}
      video.onended=()=>{active.classList.remove('vn-speaking','vn-turn-partner','vn-turn-camera');active.classList.add('vn-has-frame');scheduleAvatarNext()};
      video.onerror=()=>{active.classList.remove('vn-speaking','vn-turn-partner','vn-turn-camera');scheduleAvatarNext(180)};
      if(video.getAttribute('src')!==turn.src){video.src=turn.src}
      video.muted=!audioEnabled;
      video.playsInline=true;
      video.setAttribute('playsinline','');
      try{video.currentTime=0}catch(e){}
      const start=()=>{
        const p=video.play();
        if(p&&typeof p.catch==='function')p.catch(()=>{
          video.muted=true;
          const retry=video.play();
          if(retry&&typeof retry.catch==='function')retry.catch(()=>scheduleAvatarNext(180));
        });
      };
      if(video.readyState>=2)start();else{video.addEventListener('canplay',start,{once:true});try{video.load()}catch(e){scheduleAvatarNext(180)}}
    }
    function startAvatarConversation(){
      if(avatarRunning)return;
      avatarRunning=true;
      avatarStage.classList.add('vn-running');
      document.documentElement.dataset.voznewsAvatars='running';
      playAvatarTurn();
    }
    setTimeout(startAvatarConversation,900);

    const marketInfo=document.getElementById('marketInfo'),marketInfoClone=document.getElementById('marketInfoClone'),ticker=document.getElementById('visibleNewsTicker'),tickerClone=document.getElementById('visibleNewsTickerClone');
    const money=v=>Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
    const pct=v=>`${Number(v)>=0?'▲':'▼'} ${Math.abs(Number(v)).toFixed(2)}%`;
    async function get(url){try{const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw 0;return await r.json()}catch(e){return null}}
    async function updateMarket(){
      const p=[];const fx=await get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL');
      if(fx?.USDBRL)p.push(`Dólar ${money(fx.USDBRL.bid)} ${pct(fx.USDBRL.pctChange)}`);
      if(fx?.EURBRL)p.push(`Euro ${money(fx.EURBRL.bid)} ${pct(fx.EURBRL.pctChange)}`);
      for(const [name,lat,lon] of [['Brasília',-15.7939,-47.8828],['São Paulo',-23.5505,-46.6333],['Rio de Janeiro',-22.9068,-43.1729]]){const w=await get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`);if(w?.current)p.push(`${name} ${Math.round(w.current.temperature_2m)}°C`)}
      const text=(p.length?p:['Mercado e clima em atualização']).join('   •   ')+'   •   ';marketInfo.textContent=text;marketInfoClone.textContent=text;
    }
    async function updateNews(){
      let items=[];const n=await get('/api/news');if(Array.isArray(n?.items))items=n.items.map(x=>x?.title).filter(Boolean).slice(0,8);
      if(!items.length)items=['Notícias em tempo real','Brasília em destaque','Brasil e mundo agora'];
      const text=items.join('   •   ')+'   •   ';ticker.textContent=text;tickerClone.textContent=text;
    }
    updateMarket();updateNews();setInterval(updateMarket,600000);setInterval(updateNews,300000);
    return true;
  }
  if(!init()){document.addEventListener('DOMContentLoaded',init,{once:true});setTimeout(init,1200)}
})();