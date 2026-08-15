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

  const deijanete = document.getElementById('idleDeijanete');
  const paulo = document.getElementById('idlePaulo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');

  if (!deijanete || !paulo) return;

  const css = document.createElement('style');
  css.textContent = `
    #tv-ao-vivo .v33-did-video{
      position:absolute!important;
      inset:0!important;
      width:100%!important;
      height:100%!important;
      object-fit:contain!important;
      object-position:center top!important;
      z-index:30!important;
      display:none!important;
      background:transparent!important;
      pointer-events:none!important;
    }

    #tv-ao-vivo .idle-avatar.v33-did-active .v33-did-video{
      display:block!important;
    }

    #tv-ao-vivo .idle-avatar.v33-did-active .idle-avatar-body{
      visibility:hidden!important;
    }

    #tv-ao-vivo .idle-avatar.v33-did-active .instant-mouth,
    #tv-ao-vivo .idle-avatar.v33-did-active .avatar-eyelids{
      display:none!important;
    }
  `;
  document.head.appendChild(css);

  function createVideo(host, id) {
    const video = document.createElement('video');
    video.id = id;
    video.className = 'v33-did-video';
    video.playsInline = true;
    video.preload = 'auto';
    video.controls = false;
    video.muted = false;
    video.setAttribute('playsinline', '');
    host.appendChild(video);
    return video;
  }

  const videos = {
    deijanete: createVideo(deijanete, 'v33DidDeijanete'),
    paulo: createVideo(paulo, 'v33DidPaulo')
  };

  let running = false;
  let index = 0;

  function cancelBrowserVoice() {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch(e) {}
  }

  function resetHost(host) {
    host.classList.remove(
      'v33-did-active',
      'active-speaker',
      'instant-speaking',
      'listening-avatar'
    );
  }

  function resetVideo(video) {
    try {
      video.pause();
      video.currentTime = 0;
      video.removeAttribute('src');
      video.load();
    } catch(e) {}
  }

  function resetAll() {
    resetVideo(videos.deijanete);
    resetVideo(videos.paulo);
    resetHost(deijanete);
    resetHost(paulo);
  }

  function finishSequence() {
    running = false;
    cancelBrowserVoice();
    resetAll();

    if (status) {
      status.textContent = 'Apresentação concluída.';
    }
  }

  function playCurrent() {
    if (!running) return;

    if (index >= playlist.length) {
      finishSequence();
      return;
    }

    cancelBrowserVoice();

    const item = playlist[index];

    const activeHost =
      item.presenter === 'deijanete' ? deijanete : paulo;

    const inactiveHost =
      item.presenter === 'deijanete' ? paulo : deijanete;

    const activeVideo = videos[item.presenter];

    const inactiveVideo =
      item.presenter === 'deijanete'
        ? videos.paulo
        : videos.deijanete;

    resetVideo(inactiveVideo);
    resetHost(inactiveHost);

    activeHost.classList.add('v33-did-active', 'active-speaker');

    if (status) {
      status.textContent =
        item.presenter === 'deijanete'
          ? 'Dra. Deijanete Fayad no ar.'
          : 'Paulo Fayad no ar.';
    }

    activeVideo.onended = () => {
      resetHost(activeHost);
      resetVideo(activeVideo);
      index += 1;
      playCurrent();
    };

    activeVideo.onerror = () => {
      running = false;
      resetHost(activeHost);
      resetVideo(activeVideo);
      cancelBrowserVoice();

      if (status) {
        status.textContent =
          'Vídeo indisponível. Apresentador mantido em repouso.';
      }
    };

    activeVideo.src = item.src;
    activeVideo.currentTime = 0;
    activeVideo.load();

    const playback = activeVideo.play();

    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        running = false;
        resetHost(activeHost);

        if (status) {
          status.textContent =
            'Clique em INICIAR AVATARES AO VIVO para liberar o áudio.';
        }
      });
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

    if (status) {
      status.textContent = 'Boletim pausado.';
    }
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

    element.addEventListener(
      'click',
      event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        handler();
      },
      true
    );
  }

  intercept('startLiveNews', startV33DidSequence);
  intercept('enterLiveButton', startV33DidSequence);
  intercept('stopLiveNews', stopV33DidSequence);
  intercept('nextHeadline', nextV33DidClip);

  cancelBrowserVoice();
})();
