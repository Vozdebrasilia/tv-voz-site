(() => {
  'use strict';

  const studio = document.getElementById('tv-ao-vivo');
  if (!studio) return;

  // Safe mode is intentionally static until approved, clean human media exists.
  studio.classList.add('v33-static-presenters');
  studio.querySelectorAll('video, iframe, audio').forEach(element => element.remove());
})();
