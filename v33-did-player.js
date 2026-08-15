(() => {
  const playlist = [
    { presenter:'paulo',     src:'./assets/v33-did/01-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-did/02-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-did/03-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-did/04-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-did/05-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-did/06-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-did/07-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-did/08-deijanete.mp4' },
    { presenter:'paulo',     src:'./assets/v33-did/09-paulo.mp4' },
    { presenter:'deijanete', src:'./assets/v33-did/10-deijanete.mp4' }
  ];

  const hosts = {
    deijanete: document.getElementById('idleDeijanete'),
    paulo: document.getElementById('idlePaulo')
  };

  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');

  if (!hosts.deijanete || !hosts.paulo) return;

  const style = document.createElement('style');
  style.textContent = `
    #tv-ao-vivo .v33-did-video{
      position:absolute!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      object-fit:cover!important;
      object-position:center top!important;
      z-index:20!important;
      opacity:0!important;
      visibility:hidden!important;
      pointer-events:none!important;
      background:transparent!important;
    }

    #tv-ao-vivo .idle-avatar.v33-did-active .v33-did-video{
      opacity:1!important;
      visibility:visible!important;
    }

    #tv-ao-vivo .idle-avatar.v33-did-active .idle-avatar-body{
      opacity:0!important;
      visibility:hidden!important;
    }

    #tv-ao-vivo .instant-mouth,
    #tv-ao-vivo .avatar-eyelids{
      display:none!important;
    }

    #tv-ao-vivo .idle-avatar.v33-listening .idle-avatar-body{
      animation:v33Listening 4s ease-in-out infinite!important;
      transform-origin:50% 72%!important;
    }

    @keyframes v33Listening{
      0%,100%{transform:translate3d(0,0,0) rotate(0deg)}
      30%{transform:translate3d(0,-1px,0) rotate(.15deg)}
      65%{transform:translate3d(0,0,0) rotate(-.12deg)}
    }
  `;
  document.head.appendChild(style);

  function createVideo(host, id) {
    const video = document.createElement('video');
    video.id = id;
    video.className = 'v33-did-video';
    video.playsInline = true;
    video.preload = 'auto';
    video.controls = false;
    video.muted = false;
    video.setAttribute('playsinline','');
    host.appendChild(video);
    return video;
  }

  const videos = {
    deijanete: createVideo(hosts.deijanete, 'v33DidDeijanete'),
    paulo: createVideo(hosts.paulo, 'v33DidPaulo')
  };

  playlist.forEach(item => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'video';
    preload.href = item.src;
    document.head.appendChild(preload);
  });

  let running = false;
  let index = 0;

  function cancelBrowserVoice(){
    try{
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }catch(e){}
  }

  function clearHost(name){
    const host = hosts[name];
    host.classList.remove(
      'v33-did-active',
      'v33-listening',
      'active-speaker',
      'instant-speaking',
      'listening-avatar'
    );
  }

  function stopVideo(video){
    try{
      video.pause();
      video.currentTime = 0;
      video.removeAttribute('src');
      video.load();
    }catch(e){}
  }

  function resetAll(){
    stopVideo(videos.deijanete);
    stopVideo(videos.paulo);
    clearHost('deijanete');
    clearHost('paulo');
  }

  function finish(){
    running = false;
    cancelBrowserVoice();
    resetAll();

    if(status){
      status.textContent = 'Apresentação concluída.';
    }
  }

  function playCurrent(){
    if(!running) return;

    if(index >= playlist.length){
      finish();
      return;
    }

    cancelBrowserVoice();

    const item = playlist[index];
    const active = item.presenter;
    const listener = active === 'deijanete' ? 'paulo' : 'deijanete';

    clearHost(active);
    clearHost(listener);

    hosts[active].classList.add('v33-did-active','active-speaker');
    hosts[listener].classList.add('v33-listening');

    const activeVideo = videos[active];
    const listenerVideo = videos[listener];

    try{
      listenerVideo.pause();
    }catch(e){}

    if(status){
      status.textContent =
        active === 'deijanete'
          ? 'Dra. Deijanete Fayad no ar.'
          : 'Paulo Fayad no ar.';
    }

    activeVideo.onended = () => {
      clearHost(active);
      clearHost(listener);
      index += 1;
      playCurrent();
    };

    activeVideo.onerror = () => {
      running = false;
      clearHost(active);
      clearHost(listener);
      cancelBrowserVoice();

      if(status){
        status.textContent = 'Apresentação temporariamente indisponível.';
      }
    };

    activeVideo.src = item.src;
    activeVideo.currentTime = 0;
    activeVideo.load();

    const p = activeVideo.play();

    if(p && typeof p.catch === 'function'){
      p.catch(() => {
        running = false;
        clearHost(active);
        clearHost(listener);

        if(status){
          status.textContent = 'Clique em ENTRAR NO JORNAL AO VIVO.';
        }
      });
    }
  }

  function startV33DidSequence(){
    cancelBrowserVoice();
    resetAll();

    running = true;
    index = 0;

    if(overlay){
      overlay.classList.remove('show');
    }

    playCurrent();
  }

  function stopV33DidSequence(){
    running = false;
    cancelBrowserVoice();
    resetAll();

    if(status){
      status.textContent = 'Boletim pausado.';
    }
  }

  function nextV33DidClip(){
    if(!running){
      startV33DidSequence();
      return;
    }

    resetAll();
    index += 1;
    playCurrent();
  }

  window.startV33DidSequence = startV33DidSequence;
  window.stopV33DidSequence = stopV33DidSequence;

  function intercept(id, handler){
    const el = document.getElementById(id);
    if(!el) return;

    el.addEventListener('click', event => {
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
