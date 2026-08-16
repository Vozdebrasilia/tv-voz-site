(() => {
  const playlist = [
    { presenter: 'paulo', src: './assets/v33-original/01-paulo-ola.mp4' },
    { presenter: 'deijanete', src: './assets/v33-original/02-deijanete-ola.mp4' }
  ];

  const studio = document.getElementById('tv-ao-vivo');
  const deijanete = document.getElementById('idleDeijanete');
  const paulo = document.getElementById('idlePaulo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  const startButton = document.getElementById('startLiveNews');
  const enterButton = document.getElementById('enterLiveButton');
  if (!studio || !deijanete || !paulo) return;

  const css = document.createElement('style');
  css.id = 'v33-bancada-final';
  css.textContent = `
    #tv-ao-vivo{position:relative!important;overflow:hidden!important;isolation:isolate!important;background-position:center!important;background-size:cover!important}
    #tv-ao-vivo .studio-presenters{position:absolute!important;inset:0!important;z-index:8!important;overflow:hidden!important;pointer-events:none!important;isolation:isolate!important}
    #tv-ao-vivo .studio-presenters::before{content:""!important;position:absolute!important;left:8%!important;right:8%!important;bottom:16.5%!important;height:6.5%!important;z-index:40!important;border-radius:50% 50% 14px 14px/70% 70% 20px 20px!important;background:linear-gradient(180deg,#eef5fb 0%,#a9b9ca 42%,#6e7c8c 100%)!important;border:2px solid rgba(255,255,255,.65)!important;box-shadow:0 -8px 18px rgba(122,217,255,.18),0 8px 20px rgba(0,0,0,.38)!important}
    #tv-ao-vivo .studio-presenters::after{content:"VOZ NEWS"!important;position:absolute!important;left:10%!important;right:10%!important;bottom:-1%!important;height:22%!important;z-index:39!important;display:flex!important;align-items:center!important;justify-content:center!important;border-radius:28px 28px 0 0!important;background:linear-gradient(180deg,#f5f8fb 0%,#bfcbd8 18%,#7b8998 44%,#27394d 45%,#0c2039 100%)!important;border:2px solid rgba(255,255,255,.48)!important;box-shadow:0 -10px 28px rgba(0,188,255,.18),0 18px 36px rgba(0,0,0,.5)!important;color:#081a31!important;font-size:clamp(28px,4vw,58px)!important;font-weight:1000!important;letter-spacing:3px!important;text-shadow:0 1px 0 rgba(255,255,255,.7)!important}
    #tv-ao-vivo .studio-presenter{position:absolute!important;top:19%!important;width:29%!important;height:61%!important;overflow:hidden!important;display:block!important;visibility:visible!important;opacity:1!important;background:transparent!important;filter:drop-shadow(0 14px 16px rgba(0,0,0,.34))!important;transform:none!important;z-index:12!important}
    #tv-ao-vivo .idle-deijanete{left:18%!important}
    #tv-ao-vivo .idle-paulo{left:53%!important}
    #tv-ao-vivo .studio-presenter-image,#tv-ao-vivo .v33-did-video{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;background:transparent!important;border:0!important;border-radius:0!important;transform:none!important}
    #tv-ao-vivo .studio-presenter-image{z-index:1!important;opacity:1!important}
    #tv-ao-vivo .v33-did-video{z-index:2!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    #tv-ao-vivo .studio-presenter.v33-did-active .v33-did-video.v33-current{opacity:1!important;visibility:visible!important}
    #tv-ao-vivo .studio-presenter.v33-did-active .studio-presenter-image{opacity:0!important;visibility:hidden!important}
    #tv-ao-vivo .studio-presenter.v33-listening{animation:v33Listen 3.2s ease-in-out infinite!important}
    @keyframes v33Listen{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
    #tv-ao-vivo .anchor-name-tag{z-index:50!important;bottom:18.7%!important;width:210px!important;min-width:210px!important;max-width:210px!important;height:38px!important;padding:0 10px!important;border-radius:6px!important;transform:translateX(-50%)!important;background:linear-gradient(180deg,#0c315c,#071d38)!important;border:1px solid #d4af37!important;box-shadow:0 5px 14px rgba(0,0,0,.38)!important}
    #tv-ao-vivo .anchor-name-tag strong{font-size:15px!important;line-height:38px!important;color:#fff!important}
    #tv-ao-vivo .tag-deijanete{left:32.5%!important}
    #tv-ao-vivo .tag-paulo{left:67.5%!important;right:auto!important}
    #tv-ao-vivo .studio-overlay-logo.main{top:18%!important;z-index:30!important}
    #tv-ao-vivo .studio-status{display:block!important;z-index:60!important;top:58px!important}
    #tv-ao-vivo .did-loading,#tv-ao-vivo .instant-mouth,#tv-ao-vivo .avatar-eyelids{display:none!important}
    @media(max-width:980px){
      #tv-ao-vivo .studio-presenter{top:21%!important;width:31%!important;height:58%!important}
      #tv-ao-vivo .idle-deijanete{left:17%!important}#tv-ao-vivo .idle-paulo{left:52%!important}
      #tv-ao-vivo .studio-presenters::after{left:7%!important;right:7%!important;height:21%!important}
      #tv-ao-vivo .anchor-name-tag{bottom:17.5%!important;width:160px!important;min-width:160px!important;max-width:160px!important;height:32px!important}
      #tv-ao-vivo .anchor-name-tag strong{font-size:11px!important;line-height:32px!important}
    }
    @media(max-width:620px){
      #tv-ao-vivo .studio-presenter{top:24%!important;width:34%!important;height:53%!important}
      #tv-ao-vivo .idle-deijanete{left:10%!important}#tv-ao-vivo .idle-paulo{left:56%!important}
      #tv-ao-vivo .studio-presenters::before{bottom:15%!important}
      #tv-ao-vivo .studio-presenters::after{left:3%!important;right:3%!important;height:19%!important;font-size:24px!important}
      #tv-ao-vivo .anchor-name-tag{bottom:16.5%!important;width:108px!important;min-width:108px!important;max-width:108px!important;height:24px!important;padding:0 4px!important}
      #tv-ao-vivo .anchor-name-tag strong{font-size:8px!important;line-height:24px!important}
      #tv-ao-vivo .tag-deijanete{left:29%!important}#tv-ao-vivo .tag-paulo{left:72%!important}
    }
  `;
  document.head.appendChild(css);

  if (startButton) startButton.textContent = '▶ INICIAR JORNAL AO VIVO';
  if (enterButton) enterButton.textContent = '▶ ENTRAR NO JORNAL AO VIVO';
  const overlayText = overlay?.querySelector('span');
  if (overlayText) overlayText.textContent = 'Clique para iniciar os apresentadores.';

  function createVideo(host, item, index) {
    const video = document.createElement('video');
    video.id = `v33DidClip${index + 1}`;
    video.className = 'v33-did-video';
    video.playsInline = true;
    video.preload = 'auto';
    video.controls = false;
    video.muted = false;
    video.disablePictureInPicture = true;
    video.setAttribute('playsinline', '');
    video.src = item.src;
    host.appendChild(video);
    try { video.load(); } catch (_) {}
    return video;
  }

  const videos = playlist.map((item, index) => createVideo(item.presenter === 'deijanete' ? deijanete : paulo, item, index));
  let running = false;
  let index = 0;

  function clearState() {
    [deijanete, paulo].forEach(host => host.classList.remove('v33-did-active', 'v33-listening', 'active-speaker'));
    videos.forEach(video => { try { video.pause(); video.classList.remove('v33-current'); video.currentTime = 0; } catch (_) {} });
  }

  function finish() { running = false; clearState(); if (status) status.textContent = 'Apresentação concluída.'; }

  function playCurrent() {
    if (!running) return;
    if (index >= playlist.length) return finish();
    clearState();
    const item = playlist[index];
    const activeHost = item.presenter === 'deijanete' ? deijanete : paulo;
    const listener = item.presenter === 'deijanete' ? paulo : deijanete;
    const video = videos[index];
    listener.classList.add('v33-listening');
    if (status) status.textContent = item.presenter === 'deijanete' ? 'Dra. Deijanete Fayad no ar.' : 'Paulo Fayad no ar.';
    video.classList.add('v33-current');
    activeHost.classList.add('v33-did-active', 'active-speaker');
    video.onended = () => { index += 1; setTimeout(playCurrent, 120); };
    video.onerror = () => { running = false; clearState(); if (status) status.textContent = 'Vídeo temporariamente indisponível.'; };
    const p = video.play();
    if (p && typeof p.catch === 'function') p.catch(() => { running = false; clearState(); overlay?.classList.add('show'); if (status) status.textContent = 'Clique em ENTRAR NO JORNAL AO VIVO para liberar o áudio.'; });
  }

  function start() { clearState(); running = true; index = 0; overlay?.classList.remove('show'); playCurrent(); }
  function stop() { running = false; clearState(); if (status) status.textContent = 'Apresentação pausada.'; }
  function next() { if (!running) return start(); index += 1; if (index >= playlist.length) return finish(); playCurrent(); }

  function bind(id, handler) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', event => { event.preventDefault(); event.stopImmediatePropagation(); handler(); }, true);
  }

  bind('startLiveNews', start);
  bind('enterLiveButton', start);
  bind('stopLiveNews', stop);
  bind('nextHeadline', next);
  window.startV33DidSequence = start;
  window.stopV33DidSequence = stop;
})();