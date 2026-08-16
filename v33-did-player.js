(() => {
  'use strict';

  const clips = [
    { host: 'deijanete', src: './assets/v33-did/02-deijanete.mp4', rate: 1 },
    { host: 'paulo', src: './assets/v33-did/01-paulo.mp4', rate: 0.86 }
  ];
  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  const positions = {
    deijanete: document.getElementById('idleDeijanete'),
    paulo: document.getElementById('idlePaulo')
  };
  if (!studio || !positions.deijanete || !positions.paulo) return;

  const videos = new Map();
  let sequence = 0;
  let running = false;

  clips.forEach(({ host, src, rate }) => {
    const video = document.createElement('video');
    video.className = 'v33-presenter-video';
    video.preload = 'auto';
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('aria-label', `${host === 'paulo' ? 'Paulo' : 'Deijanete'} Fayad no jornal`);
    video.defaultPlaybackRate = rate;
    video.playbackRate = rate;
    video.preservesPitch = true;
    video.src = src;
    positions[host].appendChild(video);
    videos.set(host, video);
  });

  const setStatus = text => { if (status) status.textContent = text; };
  const prepare = video => new Promise((resolve, reject) => {
    if (video.readyState >= 2) return resolve();
    const clear = () => {
      video.removeEventListener('loadeddata', done);
      video.removeEventListener('error', fail);
    };
    const done = () => { clear(); resolve(); };
    const fail = () => { clear(); reject(new Error('media')); };
    video.addEventListener('loadeddata', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    video.load();
  });
  const playToEnd = video => new Promise((resolve, reject) => {
    const clear = () => {
      video.removeEventListener('ended', done);
      video.removeEventListener('error', fail);
    };
    const done = () => { clear(); resolve(); };
    const fail = () => { clear(); reject(new Error('playback')); };
    video.addEventListener('ended', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    video.play().catch(fail);
  });

  function pause(showStatus = true) {
    running = false;
    sequence += 1;
    videos.forEach(video => video.pause());
    if (showStatus) setStatus('Apresentação pausada.');
  }

  async function start() {
    pause(false);
    const currentSequence = ++sequence;
    running = true;
    overlay?.classList.remove('show');
    setStatus('Preparando jornal ao vivo…');
    try {
      await Promise.all(clips.map(({ host }) => prepare(videos.get(host))));
      if (!running || currentSequence !== sequence) return;
      clips.forEach(({ host, rate }) => {
        const video = videos.get(host);
        video.currentTime = 0;
        video.playbackRate = rate;
      });
      studio.classList.add('v33-media-ready');
      for (const { host } of clips) {
        if (!running || currentSequence !== sequence) return;
        setStatus(host === 'paulo' ? 'Paulo Fayad no ar.' : 'Deijanete Fayad no ar.');
        await playToEnd(videos.get(host));
      }
      if (currentSequence === sequence) {
        running = false;
        setStatus('Apresentação concluída.');
      }
    } catch {
      pause(false);
      studio.classList.remove('v33-media-ready');
      setStatus('Transmissão temporariamente indisponível.');
      overlay?.classList.add('show');
    }
  }

  document.getElementById('startLiveNews')?.addEventListener('click', start);
  document.getElementById('enterLiveButton')?.addEventListener('click', start);
  document.getElementById('stopLiveNews')?.addEventListener('click', () => pause(true));
  document.getElementById('nextHeadline')?.addEventListener('click', () => {
    const active = clips.map(({ host }) => videos.get(host)).find(video => !video.paused);
    if (active && Number.isFinite(active.duration)) active.currentTime = active.duration;
  });
})();
