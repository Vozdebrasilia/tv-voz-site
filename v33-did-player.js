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
    #tv-ao-vivo .studio-status::after{
      content:" • AO VIVO"!important;
      color:#9fdfff!important;
      font-weight:900!important;
      letter-spacing:.4px!important;
    }
    #tv-ao-vivo .did-loading{display:none!important}
    #tv-ao-vivo .instant-mouth,
    #tv-ao-vivo .avatar-eyelids{
      display:none!important;
      opacity:0!important;
      animation:none!important;
    }
    #tv-ao-vivo .idle-avatar{
      overflow:hidden!important;
      isolation:isolate!important;
    }
    #tv-ao-vivo .idle-avatar-body{
      opacity:1!important;
      transition:opacity .16s linear,transform .28s ease!important;
      will-change:transform,opacity!important;
    }
    #tv-ao-vivo .v33-did-video{
      position:absolute!important;
      inset:-9%!important;
      width:118%!important;
      height:118%!important;
      object-fit:cover!important;
      object-position:center 22%!important;
      z-index:8!important;
      display:block!important;
      opacity:0!important;
      visibility:hidden!important;
      background:transparent!important;
      pointer-events:none!important;
      transition:opacity .14s linear!important;
      clip-path:inset(0 round 18px)!important;
      transform:translateZ(0) scale(1.04)!important;
    }
    #tv-ao-vivo .idle-avatar.v33-did-active .v33-did-video.v33-current{
      opacity:1!important;
      visibility:visible!important;
    }
    #tv-ao-vivo .idle-avatar.v33-did-active .idle-avatar-body{
      opacity:.02!important;
    }
    #tv-ao-vivo .deijanete-live-blazer{
      z-index:35!important;
      pointer-events:none!important;
    }
    #tv-ao-vivo .anchor-name-tag{z-index:42!important}
    #tv-ao-vivo .idle-avatar.v33-listening .idle-avatar-body{
      animation-duration:3.1s!important;
      animation-timing-function:ease-in-out!important;
      animation-iteration-count:infinite!important;
    }
    #tv-ao-vivo .idle-deijanete.v33-listening .idle-avatar-body{
      transform-origin:52% 78%!important;
      animation-name:v33ListenRight!important;
    }
    #tv-ao-vivo .idle-paulo.v33-listening .idle-avatar-body{
      transform-origin:48% 78%!important;
      animation-name:v33ListenLeft!important;
    }
    @keyframes v33ListenRight{
      0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}
      28%{transform:translate3d(1.5px,-1px,0) rotate(.22deg) scale(1.002)}
      60%{transform:translate3d(2.5px,-.5px,0) rotate(.34deg) scale(1.003)}
      82%{transform:translate3d(1px,-1px,0) rotate(.15deg) scale(1.002)}
    }
    @keyframes v33ListenLeft{
      0%,100%{transform:translate3d(0,0,0) rotate(0deg) scale(1)}
      28%{transform:translate3d(-1.5px,-1px,0) rotate(-.22deg) scale(1.002)}
      60%{transform:translate3d(-2.5px,-.5px,0) rotate(-.34deg) scale(1.003)}
      82%{transform:translate3d(-1px,-1px,0) rotate(-.15deg) scale(1.002)}
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

  const clipVideos = playlist.map((item, i) =>
    createVideo(item.presenter === 'deijanete' ? deijanete : paulo, item, i)
  );

  let running = false;
  let index = 0;
  let transitionTimer = null;

  function cancelBrowserVoice() {}

  function clearTransitionTimer() {
    if (transitionTimer) {
      clearTimeout(transitionTimer);
      transitionTimer = null;
    }
  }

  function clearHostState(host) {
    host.classList.remove('v33-did-active','v33-listening','active-speaker','instant-speaking','listening-avatar');
  }

  function pauseClip(video, rewind = true) {
    try {
      video.pause();
      video.classList.remove('v33-current');
      if (rewind) video.currentTime = 0;
    } catch(e) {}
  }

  function resetAll() {
    clearTransitionTimer();
    clipVideos.forEach(v => pauseClip(v));
    clearHostState(deijanete);
    clearHostState(paulo);
  }

  function finishSequence() {
    running = false;
    cancelBrowserVoice();
    resetAll();
    if (status) status.textContent = 'Apresentação concluída.';
  }

  function playCurrent() {
    if (!running) return;
    if (index >= playlist.length) {
      finishSequence();
      return;
    }

    cancelBrowserVoice();
    clearTransitionTimer();

    const item = playlist[index];
    const activeHost = item.presenter === 'deijanete' ? deijanete : paulo;
    const inactiveHost = item.presenter === 'deijanete' ? paulo : deijanete;
    const activeVideo = clipVideos[index];

    clearHostState(activeHost);
    clearHostState(inactiveHost);
    clipVideos.forEach((video, i) => {
      if (i !== index) pauseClip(video, true);
    });

    inactiveHost.classList.add('v33-listening');

    if (status) {
      status.textContent = item.presenter === 'deijanete'
        ? 'Dra. Deijanete Fayad no ar.'
        : 'Paulo Fayad no ar.';
    }

    const startPlayback = () => {
      if (!running || clipVideos[index] !== activeVideo) return;
      activeVideo.classList.add('v33-current');
      activeHost.classList.add('v33-did-active','active-speaker');
      const playback = activeVideo.play();
      if (playback && typeof playback.catch === 'function') {
        playback.catch(() => {
          running = false;
          resetAll();
          if (status) status.textContent = 'Clique em ENTRAR NO JORNAL AO VIVO para liberar o áudio.';
          overlay?.classList.add('show');
        });
      }
    };

    activeVideo.onended = () => {
      activeVideo.classList.remove('v33-current');
      activeHost.classList.remove('v33-did-active','active-speaker');
      transitionTimer = setTimeout(() => {
        pauseClip(activeVideo, true);
        index += 1;
        playCurrent();
      }, 90);
    };

    activeVideo.onerror = () => {
      running = false;
      resetAll();
      cancelBrowserVoice();
      if (status) status.textContent = 'Apresentação temporariamente indisponível.';
    };

    try { activeVideo.currentTime = 0; } catch(e) {}
    if (activeVideo.readyState >= 3) {
      startPlayback();
    } else {
      activeVideo.addEventListener('canplay', startPlayback, { once:true });
      try { activeVideo.load(); } catch(e) {}
    }
  }

  function startV33DidSequence() {
    cancelBrowserVoice();
    resetAll();
    running = true;
    index = 0;
    overlay?.classList.remove('show');
    playCurrent();
  }

  function stopV33DidSequence() {
    running = false;
    cancelBrowserVoice();
    resetAll();
    if (status) status.textContent = 'Apresentação pausada.';
  }

  function nextV33DidClip() {
    cancelBrowserVoice();
    if (!running) {
      startV33DidSequence();
      return;
    }
    resetAll();
    index += 1;
    if (index >= playlist.length) {
      finishSequence();
      return;
    }
    playCurrent();
  }

  window.startV33DidSequence = startV33DidSequence;
  window.stopV33DidSequence = stopV33DidSequence;

  function intercept(id, handler) {
    const element = document.getElementById(id);
    if (!element) return;
    element.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      handler();
    }, true);
  }

  intercept('startLiveNews', startV33DidSequence);
  intercept('enterLiveButton', startV33DidSequence);
  intercept('stopLiveNews', stopV33DidSequence);
  intercept('nextHeadline', nextV33DidClip);

  cancelBrowserVoice();
})();
