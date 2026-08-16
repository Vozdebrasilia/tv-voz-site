(() => {
  'use strict';
  const clips = [
    { presenter: 'deijanete', src: './assets/v33-did/02-deijanete.mp4', playbackRate: 1 },
    { presenter: 'paulo', src: './assets/v33-did/01-paulo.mp4', playbackRate: 0.86 }
  ];
  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  const hosts = { paulo: document.getElementById('idlePaulo'), deijanete: document.getElementById('idleDeijanete') };
  if (!studio || !hosts.paulo || !hosts.deijanete) return;

  const videos = new Map();
  let runToken = 0;
  let running = false;

  clips.forEach(clip => {
    const video = document.createElement('video');
    video.className = 'v33-presenter-video';
    video.preload = 'auto';
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('aria-label', `${clip.presenter === 'paulo' ? 'Paulo' : 'Deijanete'} Fayad no jornal`);
    video.defaultPlaybackRate = clip.playbackRate;
    video.playbackRate = clip.playbackRate;
    video.preservesPitch = true;
    video.src = clip.src;
    hosts[clip.presenter].appendChild(video);
    videos.set(clip.presenter, video);
  });

  const setStatus = text => { if (status) status.textContent = text; };
  const ready = video => new Promise((resolve, reject) => {
    if (video.readyState >= 2) return resolve();
    const done = () => { clear(); resolve(); };
    const fail = () => { clear(); reject(new Error('media')); };
    const clear = () => { video.removeEventListener('loadeddata', done); video.removeEventListener('error', fail); };
    video.addEventListener('loadeddata', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    video.load();
  });
  const playToEnd = video => new Promise((resolve, reject) => {
    const done = () => { clear(); resolve(); };
    const fail = () => { clear(); reject(new Error('playback')); };
    const clear = () => { video.removeEventListener('ended', done); video.removeEventListener('error', fail); };
    video.addEventListener('ended', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    video.play().catch(fail);
  });

  function stop(showStatus = true) {
    running = false;
    runToken += 1;
    videos.forEach(video => video.pause());
    if (showStatus) setStatus('Apresentação pausada.');
  }

  async function start() {
    stop(false);
    const token = ++runToken;
    running = true;
    overlay?.classList.remove('show');
    setStatus('Preparando jornal ao vivo…');
    try {
      await Promise.all(clips.map(clip => ready(videos.get(clip.presenter))));
      if (!running || token !== runToken) return;
      // Both video frames appear atomically and remain fixed for the whole bulletin.
      clips.forEach(clip => {
        const video = videos.get(clip.presenter);
        video.currentTime = 0;
        video.playbackRate = clip.playbackRate;
      });
      studio.classList.add('v33-media-ready');
      for (const clip of clips) {
        if (!running || token !== runToken) return;
        setStatus(clip.presenter === 'paulo' ? 'Paulo Fayad no ar.' : 'Deijanete Fayad no ar.');
        await playToEnd(videos.get(clip.presenter));
      }
      if (token === runToken) { running = false; setStatus('Apresentação concluída.'); }
    } catch {
      stop(false);
      studio.classList.remove('v33-media-ready');
      setStatus('Transmissão temporariamente indisponível.');
      overlay?.classList.add('show');
    }
  }

  document.getElementById('startLiveNews')?.addEventListener('click', start);
  document.getElementById('enterLiveButton')?.addEventListener('click', start);
  document.getElementById('stopLiveNews')?.addEventListener('click', () => stop(true));
  document.getElementById('nextHeadline')?.addEventListener('click', () => {
    const active = clips.map(clip => videos.get(clip.presenter)).find(video => !video.paused);
    if (active && Number.isFinite(active.duration)) active.currentTime = active.duration;
  });
  window.startV33News = start;
  window.stopV33News = () => stop(true);
})();
