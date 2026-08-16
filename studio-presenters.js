(() => {
  'use strict';

  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  if (!studio) return;

  // Only final, editorially approved human footage may be mounted in the studio.
  // Until that footage is part of the release, no synthetic or third-party player
  // is allowed to replace the presenters' official photographs.
  studio.querySelectorAll('video, iframe, embed').forEach(element => element.remove());

  const hideControl = id => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = true;
    button.hidden = true;
    button.style.display = 'none';
  };

  ['startLiveNews', 'enterLiveButton', 'nextHeadline', 'stopLiveNews'].forEach(hideControl);
  if (overlay) overlay.hidden = true;
  if (status) status.hidden = true;
})();
