(() => {
  'use strict';

  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  const hosts = {
    deijanete: document.getElementById('idleDeijanete'),
    paulo: document.getElementById('idlePaulo')
  };
  if (!studio || !hosts.deijanete || !hosts.paulo) return;

  const clips = [
    { host: 'deijanete', src: './assets/v33-human/deijanete.mp4', rate: 1 },
    { host: 'paulo', src: './assets/v33-human/paulo.mp4', rate: 1 }
  ];
  const videos = new Map();
  let sequence = 0;
  let running = false;

  studio.querySelectorAll('.v33-presenter-video,.v33-did-video,.v33-real-source-frame').forEach(el => el.remove());
  studio.classList.remove('v33-static-presenters');

  const setStatus = text => { if (status) status.textContent = text; };
  const setControl = (id, enabled) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.hidden = false;
    button.style.display = '';
    button.disabled = false;
    if (!enabled) button.disabled = true;
    button.setAttribute('aria-disabled', String(!enabled));
  };

  for (const { host, src, rate } of clips) {
    const video = document.createElement('video');
    video.className = 'v33-presenter-video';
    video.preload = 'auto';
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute('playsinline', '');
    video.defaultPlaybackRate = rate;
    video.playbackRate = rate;
    video.preservesPitch = true;
    video.src = src;
    hosts[host].appendChild(video);
    videos.set(host, video);
  }

  const prepare = video => new Promise((resolve, reject) => {
    if (video.readyState >= 2) return resolve();
    const cleanup = () => {
      video.removeEventListener('loadeddata', done);
      video.removeEventListener('error', fail);
    };
    const done = () => { cleanup(); resolve(); };
    const fail = () => { cleanup(); reject(new Error('media')); };
    video.addEventListener('loadeddata', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    video.load();
  });

  const playToEnd = video => new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener('ended', done);
      video.removeEventListener('error', fail);
    };
    const done = () => { cleanup(); resolve(); };
    const fail = () => { cleanup(); reject(new Error('playback')); };
    video.addEventListener('ended', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    video.play().catch(fail);
  });

  function fallback() {
    running = false;
    sequence += 1;
    videos.forEach(video => {
      try { video.pause(); video.currentTime = 0; } catch {}
    });
    studio.classList.remove('v33-media-ready');
    studio.classList.add('v33-static-presenters');
    ['startLiveNews','enterLiveButton','nextHeadline','stopLiveNews'].forEach(id => setControl(id, false));
    overlay?.classList.remove('show');
    if (overlay) overlay.hidden = true;
    setStatus('Apresentadores em imagem real.');
  }

  function pause() {
    running = false;
    sequence += 1;
    videos.forEach(video => video.pause());
    setStatus('Apresentação pausada.');
  }

  async function start() {
    sequence += 1;
    const current = sequence;
    running = true;
    overlay?.classList.remove('show');
    if (overlay) overlay.hidden = true;
    setStatus('Preparando jornal ao vivo…');
    try {
      await Promise.all(clips.map(({ host }) => prepare(videos.get(host))));
      if (!running || current !== sequence) return;
      clips.forEach(({ host, rate }) => {
        const video = videos.get(host);
        video.currentTime = 0;
        video.playbackRate = rate;
      });
      studio.classList.add('v33-media-ready');
      for (const { host } of clips) {
        if (!running || current !== sequence) return;
        setStatus(host === 'deijanete' ? 'Dra. Deijanete Fayad no ar.' : 'Paulo Fayad no ar.');
        await playToEnd(videos.get(host));
      }
      if (current === sequence) {
        running = false;
        studio.classList.remove('v33-media-ready');
        setStatus('Apresentação concluída.');
      }
    } catch {
      fallback();
    }
  }

  setControl('startLiveNews', true);
  setControl('enterLiveButton', true);
  setControl('nextHeadline', true);
  setControl('stopLiveNews', true);
  document.getElementById('startLiveNews')?.addEventListener('click', start);
  document.getElementById('enterLiveButton')?.addEventListener('click', start);
  document.getElementById('stopLiveNews')?.addEventListener('click', pause);
  document.getElementById('nextHeadline')?.addEventListener('click', () => {
    const active = clips.map(({ host }) => videos.get(host)).find(video => !video.paused);
    if (active && Number.isFinite(active.duration)) active.currentTime = active.duration;
  });
  if (overlay) overlay.hidden = false;
  overlay?.classList.add('show');
  setStatus('Pronto para iniciar.');
})();
