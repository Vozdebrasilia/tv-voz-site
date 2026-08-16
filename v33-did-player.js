(() => {
  'use strict';

  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  if (!studio) return;

  studio.querySelectorAll('.v33-presenter-video,.v33-did-video,.v33-real-source-frame').forEach(el => el.remove());
  studio.classList.remove('v33-media-ready');
  studio.classList.add('v33-static-presenters');

  const setStatus = text => { if (status) status.textContent = text; };
  const disable = id => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
  };

  ['startLiveNews','enterLiveButton','nextHeadline','stopLiveNews'].forEach(disable);
  overlay?.classList.remove('show');
  setStatus('Apresentadores em imagem real.');
})();
