(() => {
  const playlist = [
    { presenter:'paulo', src:'./assets/v33-original/01-paulo-ola.mp4' },
    { presenter:'deijanete', src:'./assets/v33-original/02-deijanete-ola.mp4' }
  ];

  const deijanete = document.getElementById('idleDeijanete');
  const paulo = document.getElementById('idlePaulo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  const startButton = document.getElementById('startLiveNews');
  const enterButton = document.getElementById('enterLiveButton');
  const didLoading = document.getElementById('didLoading');
  if (!deijanete || !paulo) return;

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
  css.id = 'v33-presenter-fix';
  css.textContent = `
    #tv-ao-vivo .studio-status::after{content:" • AO VIVO"!important;color:#9fdfff!important;font-weight:900!important;letter-spacing:.4px!important}
    #tv-ao-vivo .did-loading{display:none!important}
    #tv-ao-vivo .instant-mouth,#tv-ao-vivo .avatar-eyelids{display:none!important;opacity:0!important;animation:none!important}

    /* Cada apresentador ocupa somente sua área da bancada. */
    #tv-ao-vivo .studio-presenter{
      overflow:visible!important;
      isolation:isolate!important;
      background:transparent!important;
      filter:none!important;
    }
    #tv-ao-vivo .idle-deijanete{left:18%!important;top:24%!important;width:29%!important;height:55%!important}
    #tv-ao-vivo .idle-paulo{left:53%!important;top:24%!important;width:29%!important;height:55%!important}

    #tv-ao-vivo .idle-avatar-body{
      opacity:1!important;
      object-fit:contain!important;
      object-position:center bottom!important;
      transition:opacity .16s linear,transform .28s ease!important;
      will-change:transform,opacity!important;
    }

    /* Os MP4 têm cenário incorporado. A máscara elimina as bordas retangulares
       e mantém apenas a região do apresentador integrada ao cenário principal. */
    #tv-ao-vivo .v33-did-video{
      position:absolute!important;
      inset:-3% -5% 0 -5%!important;
      width:110%!important;
      height:103%!important;
      object-fit:cover!important;
      object-position:center bottom!important;
      z-index:8!important;
      display:block!important;
      opacity:0!important;
      visibility:hidden!important;
      background:transparent!important;
      pointer-events:none!important;
      transition:opacity .14s linear!important;
      transform:none!important;
      border:0!important;
      border-radius:0!important;
      -webkit-mask-image:radial-gradient(ellipse 54% 64% at 50% 55%,#000 0%,#000 58%,rgba(0,0,0,.92) 67%,rgba(0,0,0,.42) 78%,transparent 91%)!important;
      mask-image:radial-gradient(ellipse 54% 64% at 50% 55%,#000 0%,#000 58%,rgba(0,0,0,.92) 67%,rgba(0,0,0,.42) 78%,transparent 91%)!important;
      -webkit-mask-repeat:no-repeat!important;
      mask-repeat:no-repeat!important;
      -webkit-mask-size:100% 100%!important;
      mask-size:100% 100%!important;
    }
    #tv-ao-vivo .idle-avatar.v33-did-active .v33-did-video.v33-current{opacity:1!important;visibility:visible!important}
    #tv-ao-vivo .idle-avatar.v33-did-active .idle-avatar-body{opacity:0!important}
    #tv-ao-vivo .anchor-name-tag{z-index:42!important}

    #tv-ao-vivo .idle-avatar.v33-listening .idle-avatar-body{animation-duration:3.1s!important;animation-timing-function:ease-in-out!important;animation-iteration-count:infinite!important}
    #tv-ao-vivo .idle-deijanete.v33-listening .idle-avatar-body{transform-origin:52% 78%!important;animation-name:v33ListenRight!important}
    #tv-ao-vivo .idle-paulo.v33-listening .idle-avatar-body{transform-origin:48% 78%!important;animation-name:v33ListenLeft!important}
    @keyframes v33ListenRight{0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}28%{transform:translate3d(1.5px,-1px,0) rotate(.22deg) scale(1.002)}60%{transform:translate3d(2.5px,-.5px,0) rotate(.34deg) scale(1.003)}82%{transform:translate3d(1px,-1px,0) rotate(.15deg) scale(1.002)}}
    @keyframes v33ListenLeft{0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}28%{transform:translate3d(-1.5px,-1px,0) rotate(-.22deg) scale(1.002)}60%{transform:translate3d(-2.5px,-.5px,0) rotate(-.34deg) scale(1.003)}82%{transform:translate3d(-1px,-1px,0) rotate(-.15deg) scale(1.002)}}

    @media(max-width:620px){
      #tv-ao-vivo .idle-deijanete{left:10%!important;top:18%!important;width:39%!important;height:59%!important}
      #tv-ao-vivo .idle-paulo{left:51%!important;top:18%!important;width:39%!important;height:59%!important}
      #tv-ao-vivo .v33-did-video{
        inset:-2% -3% 0 -3%!important;
        width:106%!important;
        height:102%!important;
        object-position:center bottom!important;
        -webkit-mask-image:radial-gradient(ellipse 52% 62% at 50% 56%,#000 0%,#000 56%,rgba(0,0,0,.9) 66%,rgba(0,0,0,.38) 77%,transparent 90%)!important;
        mask-image:radial-gradient(ellipse 52% 62% at 50% 56%,#000 0%,#000 56%,rgba(0,0,0,.9) 66%,rgba(0,0,0,.38) 77%,transparent 90%)!important;
      }
    }
  `;
  document.head.appendChild(css);

  function createVideo(host, item, clipIndex) {
    const video = document.createElement('video');
    video.id = `v33DidClip${clipIndex + 1}`;
    video.className = 'v33-did-video';
    video.playsInline = true;
    video.preload = 'auto';
    video.controls = false;
    video.muted = false;
    video.disablePictureInPicture = true;
    video.setAttribute('playsinline', '');
    video.src = item.src;
    host.appendChild(video);
    try { video.load(); } catch(e) {}
    return video;
  }

  const clipVideos = playlist.map((item, i) => createVideo(item.presenter === 'deijanete' ? deijanete : paulo, item, i));
  let running = false;
  let index = 0;
  let transitionTimer = null;

  function clearTransitionTimer(){ if(transitionTimer){ clearTimeout(transitionTimer); transitionTimer=null; } }
  function clearHostState(host){ host.classList.remove('v33-did-active','v33-listening','active-speaker','instant-speaking','listening-avatar'); }
  function pauseClip(video, rewind=true){ try{ video.pause(); video.classList.remove('v33-current'); if(rewind) video.currentTime=0; }catch(e){} }
  function resetAll(){ clearTransitionTimer(); clipVideos.forEach(v=>pauseClip(v)); clearHostState(deijanete); clearHostState(paulo); }
  function finishSequence(){ running=false; resetAll(); if(status) status.textContent='Apresentação concluída.'; }

  function playCurrent(){
    if(!running) return;
    if(index>=playlist.length){ finishSequence(); return; }
    clearTransitionTimer();
    const item=playlist[index];
    const activeHost=item.presenter==='deijanete'?deijanete:paulo;
    const inactiveHost=item.presenter==='deijanete'?paulo:deijanete;
    const activeVideo=clipVideos[index];
    clearHostState(activeHost); clearHostState(inactiveHost);
    clipVideos.forEach((video,i)=>{ if(i!==index) pauseClip(video,true); });
    inactiveHost.classList.add('v33-listening');
    if(status) status.textContent=item.presenter==='deijanete'?'Dra. Deijanete Fayad no ar.':'Paulo Fayad no ar.';
    const startPlayback=()=>{
      if(!running || clipVideos[index]!==activeVideo) return;
      activeVideo.classList.add('v33-current');
      activeHost.classList.add('v33-did-active','active-speaker');
      const playback=activeVideo.play();
      if(playback && typeof playback.catch==='function') playback.catch(()=>{
        running=false; resetAll();
        if(status) status.textContent='Clique em ENTRAR NO JORNAL AO VIVO para liberar o áudio.';
        overlay?.classList.add('show');
      });
    };
    activeVideo.onended=()=>{
      activeVideo.classList.remove('v33-current'); activeHost.classList.remove('v33-did-active','active-speaker');
      transitionTimer=setTimeout(()=>{ pauseClip(activeVideo,true); index+=1; playCurrent(); },90);
    };
    activeVideo.onerror=()=>{ running=false; resetAll(); if(status) status.textContent='Apresentação temporariamente indisponível.'; };
    try{ activeVideo.currentTime=0; }catch(e){}
    if(activeVideo.readyState>=3) startPlayback();
    else { activeVideo.addEventListener('canplay',startPlayback,{once:true}); try{activeVideo.load();}catch(e){} }
  }

  function startV33DidSequence(){ resetAll(); running=true; index=0; overlay?.classList.remove('show'); playCurrent(); }
  function stopV33DidSequence(){ running=false; resetAll(); if(status) status.textContent='Apresentação pausada.'; }
  function nextV33DidClip(){ if(!running){ startV33DidSequence(); return; } resetAll(); index+=1; if(index>=playlist.length){ finishSequence(); return; } playCurrent(); }

  window.startV33DidSequence=startV33DidSequence;
  window.stopV33DidSequence=stopV33DidSequence;
  function intercept(id,handler){
    const element=document.getElementById(id); if(!element) return;
    element.addEventListener('click',event=>{ event.preventDefault(); event.stopImmediatePropagation(); handler(); },true);
  }
  intercept('startLiveNews',startV33DidSequence);
  intercept('enterLiveButton',startV33DidSequence);
  intercept('stopLiveNews',stopV33DidSequence);
  intercept('nextHeadline',nextV33DidClip);
})();