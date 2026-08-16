(() => {
  const playlist = [
    { presenter: 'paulo', src: './assets/v33-original/01-paulo-ola.mp4' },
    { presenter: 'deijanete', src: './assets/v33-original/02-deijanete-ola.mp4' }
  ];

  const studio = document.getElementById('tv-ao-vivo');
  const presenters = studio?.querySelector('.studio-presenters');
  const deijanete = document.getElementById('idleDeijanete');
  const paulo = document.getElementById('idlePaulo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  if (!studio || !presenters || !deijanete || !paulo) return;

  document.getElementById('v33-bancada-final')?.remove();
  document.getElementById('v33-bancada-cenario')?.remove();

  const desk = document.createElement('div');
  desk.id = 'v33-bancada-cenario';
  desk.innerHTML = '<div class="v33-desk-top"></div><div class="v33-desk-front"><img src="./logo-voznews-oficial.png" alt="VOZ NEWS"></div>';
  studio.appendChild(desk);

  const css = document.createElement('style');
  css.id = 'v33-bancada-final';
  css.textContent = `
    #tv-ao-vivo{position:relative!important;overflow:hidden!important;isolation:isolate!important;background-position:center!important;background-size:cover!important}
    #tv-ao-vivo .studio-presenters{position:absolute!important;inset:0!important;z-index:10!important;overflow:hidden!important;pointer-events:none!important}
    #tv-ao-vivo .studio-presenter{position:absolute!important;top:16.5%!important;width:31%!important;height:58%!important;display:block!important;visibility:visible!important;opacity:1!important;overflow:hidden!important;background:transparent!important;filter:drop-shadow(0 18px 18px rgba(0,0,0,.34))!important;z-index:12!important;transform:none!important}
    #tv-ao-vivo .idle-deijanete{left:17%!important}
    #tv-ao-vivo .idle-paulo{left:52%!important}
    #tv-ao-vivo .studio-presenter-image,#tv-ao-vivo .v33-did-video{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center bottom!important;background:transparent!important;border:0!important;transform:none!important}
    #tv-ao-vivo .studio-presenter-image{z-index:1!important;opacity:1!important}
    #tv-ao-vivo .v33-did-video{z-index:2!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}
    #tv-ao-vivo .studio-presenter.v33-did-active .v33-did-video.v33-current{opacity:1!important;visibility:visible!important}
    #tv-ao-vivo .studio-presenter.v33-did-active .studio-presenter-image{opacity:0!important;visibility:hidden!important}
    #tv-ao-vivo .studio-presenter.v33-listening{animation:v33Listen 3.2s ease-in-out infinite!important}
    @keyframes v33Listen{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}

    #v33-bancada-cenario{position:absolute!important;left:7%!important;right:7%!important;top:56%!important;height:31%!important;z-index:28!important;pointer-events:none!important;filter:drop-shadow(0 18px 28px rgba(0,0,0,.46))}
    #v33-bancada-cenario .v33-desk-top{position:absolute;left:0;right:0;top:0;height:22%;border-radius:50% 50% 12px 12px/75% 75% 12px 12px;background:linear-gradient(180deg,#ffffff 0%,#e3ebf2 22%,#aebdca 58%,#6a7887 100%);border:2px solid rgba(255,255,255,.78);box-shadow:0 -8px 20px rgba(113,216,255,.24),inset 0 -4px 7px rgba(0,0,0,.18)}
    #v33-bancada-cenario .v33-desk-front{position:absolute;left:3.5%;right:3.5%;top:14%;bottom:0;border-radius:26px 26px 8px 8px;background:linear-gradient(180deg,#697888 0%,#30455c 18%,#0d2b4c 19%,#071b35 62%,#041126 100%);border:2px solid rgba(255,255,255,.38);box-shadow:inset 0 0 0 1px rgba(73,204,255,.13),inset 0 14px 30px rgba(255,255,255,.05)}
    #v33-bancada-cenario .v33-desk-front::before{content:"";position:absolute;left:12%;right:12%;top:17%;bottom:18%;border-radius:18px;background:linear-gradient(90deg,rgba(21,112,176,.15),rgba(36,195,239,.33),rgba(212,175,55,.18),rgba(36,195,239,.33),rgba(21,112,176,.15));border:1px solid rgba(87,210,255,.25);box-shadow:inset 0 0 28px rgba(45,186,255,.14)}
    #v33-bancada-cenario img{position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);width:min(240px,28%);max-height:58%;object-fit:contain;filter:drop-shadow(0 8px 16px rgba(0,0,0,.42));z-index:2}

    #tv-ao-vivo .anchor-name-tag{z-index:35!important;bottom:28.5%!important;width:200px!important;min-width:200px!important;max-width:200px!important;height:36px!important;padding:0 10px!important;border-radius:6px!important;transform:translateX(-50%)!important;background:linear-gradient(180deg,#0d3767,#061d39)!important;border:1px solid #d4af37!important;box-shadow:0 6px 14px rgba(0,0,0,.4)!important}
    #tv-ao-vivo .anchor-name-tag strong{font-size:14px!important;line-height:36px!important;color:#fff!important}
    #tv-ao-vivo .tag-deijanete{left:32.5%!important}
    #tv-ao-vivo .tag-paulo{left:67.5%!important;right:auto!important}
    #tv-ao-vivo .studio-overlay-logo.main{top:17%!important;z-index:20!important}
    #tv-ao-vivo .market-strip{z-index:45!important}
    #tv-ao-vivo .ticker{z-index:46!important}
    #tv-ao-vivo .studio-status{display:block!important;z-index:60!important;top:58px!important}
    #tv-ao-vivo .did-loading,#tv-ao-vivo .instant-mouth,#tv-ao-vivo .avatar-eyelids{display:none!important}

    @media(max-width:980px){
      #tv-ao-vivo .studio-presenter{top:19%!important;width:32%!important;height:55%!important}
      #tv-ao-vivo .idle-deijanete{left:16%!important}#tv-ao-vivo .idle-paulo{left:52%!important}
      #v33-bancada-cenario{left:5%!important;right:5%!important;top:57%!important;height:29%!important}
      #tv-ao-vivo .anchor-name-tag{bottom:27%!important;width:154px!important;min-width:154px!important;max-width:154px!important;height:30px!important}
      #tv-ao-vivo .anchor-name-tag strong{font-size:11px!important;line-height:30px!important}
    }
    @media(max-width:620px){
      #tv-ao-vivo .studio-presenter{top:23%!important;width:36%!important;height:50%!important}
      #tv-ao-vivo .idle-deijanete{left:8%!important}#tv-ao-vivo .idle-paulo{left:56%!important}
      #v33-bancada-cenario{left:2%!important;right:2%!important;top:58%!important;height:27%!important}
      #v33-bancada-cenario .v33-desk-front{left:1%!important;right:1%!important}
      #v33-bancada-cenario img{width:min(135px,34%)}
      #tv-ao-vivo .anchor-name-tag{bottom:25.5%!important;width:106px!important;min-width:106px!important;max-width:106px!important;height:23px!important;padding:0 4px!important}
      #tv-ao-vivo .anchor-name-tag strong{font-size:8px!important;line-height:23px!important}
      #tv-ao-vivo .tag-deijanete{left:28%!important}#tv-ao-vivo .tag-paulo{left:72%!important}
    }
  `;
  document.head.appendChild(css);

  const startButton = document.getElementById('startLiveNews');
  const enterButton = document.getElementById('enterLiveButton');
  if (startButton) startButton.textContent = '▶ INICIAR JORNAL AO VIVO';
  if (enterButton) enterButton.textContent = '▶ ENTRAR NO JORNAL AO VIVO';

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

  deijanete.querySelectorAll('.v33-did-video').forEach(v => v.remove());
  paulo.querySelectorAll('.v33-did-video').forEach(v => v.remove());
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
    video.onended = () => { index += 1; setTimeout(playCurrent, 100); };
    video.onerror = () => { running = false; clearState(); if (status) status.textContent = 'Vídeo temporariamente indisponível.'; };
    const p = video.play();
    if (p?.catch) p.catch(() => { running = false; clearState(); overlay?.classList.add('show'); if (status) status.textContent = 'Clique em ENTRAR NO JORNAL AO VIVO para liberar o áudio.'; });
  }
  function start() { clearState(); running = true; index = 0; overlay?.classList.remove('show'); playCurrent(); }
  function stop() { running = false; clearState(); if (status) status.textContent = 'Apresentação pausada.'; }
  function next() { if (!running) return start(); index += 1; if (index >= playlist.length) return finish(); playCurrent(); }
  function bind(id, handler) { const el = document.getElementById(id); if (!el) return; el.addEventListener('click', e => { e.preventDefault(); e.stopImmediatePropagation(); handler(); }, true); }
  bind('startLiveNews', start); bind('enterLiveButton', start); bind('stopLiveNews', stop); bind('nextHeadline', next);
  window.startV33DidSequence = start; window.stopV33DidSequence = stop;
})();