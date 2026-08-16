(() => {
  const playlist = [
    { presenter:'paulo',     src:'./assets/v33-real/01-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-real/02-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-real/03-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-real/04-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-real/05-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-real/06-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-real/07-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-real/08-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-real/09-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-real/10-deijanete.mp4' }
  ];

  const deijanete = document.getElementById('idleDeijanete');
  const paulo = document.getElementById('idlePaulo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  const startButton = document.getElementById('startLiveNews');
  const enterButton = document.getElementById('enterLiveButton');
  const didLoading = document.getElementById('didLoading');
  if (!deijanete || !paulo) return;

  /* Preserva integralmente a composição original da bancada. */
  document.getElementById('v33-bancada-final')?.remove();
  document.getElementById('v33-bancada-cenario')?.remove();
  document.getElementById('v33-presenter-fix')?.remove();
  document.getElementById('v33-lipsync-style')?.remove();
  document.querySelectorAll('.v33-did-video,.v33-mouth-layer').forEach(el => el.remove());

  if (startButton) startButton.textContent = '▶ INICIAR JORNAL AO VIVO';
  if (enterButton) enterButton.textContent = '▶ ENTRAR NO JORNAL AO VIVO';
  const overlayText = overlay?.querySelector('span');
  if (overlayText) overlayText.textContent = 'Clique uma vez para iniciar a apresentação.';
  if (didLoading) didLoading.style.display = 'none';
  [startButton, enterButton, document.getElementById('nextHeadline'), document.getElementById('stopLiveNews')].forEach(button => {
    if (!button) return;
    button.hidden = false;
    button.disabled = false;
    button.removeAttribute('aria-disabled');
    button.style.display = '';
  });

  const css = document.createElement('style');
  css.id = 'v33-lipsync-style';
  css.textContent = `
    #tv-ao-vivo .studio-status::after{content:" • AO VIVO"!important;color:#9fdfff!important;font-weight:900!important}
    #tv-ao-vivo .did-loading{display:none!important}
    #tv-ao-vivo .v33-audio-source{position:absolute!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;left:-9999px!important;top:-9999px!important}
    #tv-ao-vivo .studio-presenter{isolation:isolate!important}
    #tv-ao-vivo .studio-presenter-image{opacity:1!important;visibility:visible!important}
    #tv-ao-vivo .v33-mouth-layer{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:inherit!important;object-position:inherit!important;z-index:12!important;pointer-events:none!important;opacity:0!important;visibility:hidden!important;transform:scaleY(var(--mouth-scale,1))!important;transition:opacity .05s linear!important;will-change:transform!important}
    #tv-ao-vivo .studio-presenter.v33-speaking .v33-mouth-layer{opacity:1!important;visibility:visible!important}
    #tv-ao-vivo .idle-deijanete .v33-mouth-layer{clip-path:polygon(42% 29%,58% 29%,58% 38%,42% 38%)!important;transform-origin:50% 33.5%!important}
    #tv-ao-vivo .idle-paulo .v33-mouth-layer{clip-path:polygon(42% 30%,58% 30%,58% 39%,42% 39%)!important;transform-origin:50% 34.5%!important}
    #tv-ao-vivo .studio-presenter.v33-listening .studio-presenter-image{animation:v33Listen 3.2s ease-in-out infinite!important;transform-origin:50% 78%!important}
    @keyframes v33Listen{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-1px,0)}}
  `;
  document.head.appendChild(css);

  function makeMouthLayer(host){
    const base = host.querySelector('.studio-presenter-image');
    if(!base) return null;
    const mouth = base.cloneNode(true);
    mouth.removeAttribute('id');
    mouth.classList.add('v33-mouth-layer');
    mouth.setAttribute('aria-hidden','true');
    host.appendChild(mouth);
    return mouth;
  }
  const mouths = { deijanete: makeMouthLayer(deijanete), paulo: makeMouthLayer(paulo) };

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const media = playlist.map((item,i) => {
    const el = document.createElement('video');
    el.className = 'v33-audio-source';
    el.id = `v33Audio${i+1}`;
    el.src = item.src;
    el.preload = 'auto';
    el.playsInline = true;
    el.controls = false;
    el.muted = false;
    el.setAttribute('playsinline','');
    document.getElementById('tv-ao-vivo')?.appendChild(el);

    const source = audioCtx.createMediaElementSource(el);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = .42;
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    return { el, analyser, data:new Uint8Array(analyser.frequencyBinCount) };
  });

  let running=false, index=0, transitionTimer=null, raf=0;

  function hostFor(name){ return name==='deijanete' ? deijanete : paulo; }
  function clearTimer(){ if(transitionTimer){clearTimeout(transitionTimer);transitionTimer=null;} }
  function stopLip(){ if(raf){cancelAnimationFrame(raf);raf=0;} [deijanete,paulo].forEach(h=>{h.classList.remove('v33-speaking','v33-listening','active-speaker');h.style.setProperty('--mouth-scale','1');}); }
  function pauseAll(rewind=true){ media.forEach(({el})=>{try{el.pause();if(rewind)el.currentTime=0;}catch(e){}}); }
  function resetAll(){ clearTimer(); stopLip(); pauseAll(true); }

  function animateLip(item, pack){
    const host = hostFor(item.presenter);
    const data = pack.data;
    let smooth = 0;
    const tick = () => {
      if(!running || media[index] !== pack || pack.el.paused){ host.style.setProperty('--mouth-scale','1'); return; }
      pack.analyser.getByteFrequencyData(data);
      let sum=0;
      for(let i=2;i<Math.min(28,data.length);i++) sum += data[i];
      const level = sum / (Math.min(28,data.length)-2) / 255;
      smooth = smooth*.58 + level*.42;
      const gate = smooth < .055 ? 0 : Math.min(1,(smooth-.055)*3.8);
      const pulse = 1 + gate*.34;
      host.style.setProperty('--mouth-scale', pulse.toFixed(3));
      raf=requestAnimationFrame(tick);
    };
    tick();
  }

  function finish(){ running=false; resetAll(); if(status) status.textContent='Apresentação concluída.'; }

  async function playCurrent(){
    if(!running) return;
    if(index>=playlist.length){ finish(); return; }
    clearTimer(); stopLip(); pauseAll(true);

    const item=playlist[index];
    const active=hostFor(item.presenter);
    const listener=item.presenter==='deijanete'?paulo:deijanete;
    const pack=media[index];

    active.classList.add('v33-speaking','active-speaker');
    listener.classList.add('v33-listening');
    if(status) status.textContent=item.presenter==='deijanete'?'Dra. Deijanete Fayad no ar.':'Paulo Fayad no ar.';

    try{
      if(audioCtx.state==='suspended') await audioCtx.resume();
      pack.el.currentTime=0;
      await pack.el.play();
      animateLip(item,pack);
    }catch(e){
      running=false; resetAll(); overlay?.classList.add('show');
      if(status) status.textContent='Clique em ENTRAR NO JORNAL AO VIVO para liberar o áudio.';
      return;
    }

    pack.el.onended=()=>{
      stopLip();
      transitionTimer=setTimeout(()=>{index+=1;playCurrent();},70);
    };
    pack.el.onerror=()=>{running=false;resetAll();if(status)status.textContent='Apresentação temporariamente indisponível.';};
  }

  function start(){ resetAll(); running=true; index=0; overlay?.classList.remove('show'); playCurrent(); }
  function stop(){ running=false; resetAll(); if(status) status.textContent='Apresentação pausada.'; }
  function next(){ if(!running){start();return;} stopLip(); pauseAll(true); index+=1; if(index>=playlist.length){finish();return;} playCurrent(); }

  window.startV33DidSequence=start;
  window.stopV33DidSequence=stop;
  function bind(id,handler){const el=document.getElementById(id);if(!el)return;el.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();handler();},true);}
  bind('startLiveNews',start); bind('enterLiveButton',start); bind('stopLiveNews',stop); bind('nextHeadline',next);
})();