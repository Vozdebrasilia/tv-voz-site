(() => {
  'use strict';

  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  if (!studio) return;

  studio.querySelectorAll('video, iframe, embed, .v33-real-source-frame, .v33-presenter-video').forEach(el => el.remove());
  studio.classList.remove('v33-media-ready');
  studio.classList.add('v33-static-presenters');

  const setStatus = text => { if (status) status.textContent = text; };
  const hideControl = id => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
    button.hidden = true;
    button.style.display = 'none';
  };

  ['startLiveNews', 'enterLiveButton', 'nextHeadline', 'stopLiveNews'].forEach(hideControl);
  overlay?.classList.remove('show');
  if (overlay) overlay.hidden = true;

  setStatus('Apresentadores em imagem real.');
})();
