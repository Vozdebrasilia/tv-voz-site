(() => {
  'use strict';

  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  if (!studio) return;

  const setStatus = text => { if (status) status.textContent = text; };
  const ids = ['startLiveNews','enterLiveButton','nextHeadline','stopLiveNews'];
  const setDisabled = (id, value) => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = value;
    button.setAttribute('aria-disabled', String(value));
  };

  // Remove definitivamente qualquer mídia D-ID da interface pública/teste.
  studio.querySelectorAll('.v33-presenter-video,.v33-did-video,.v33-real-source-frame').forEach(el => el.remove());
  studio.classList.remove('v33-media-ready');

  const testMode = new URLSearchParams(location.search).get('v33test') === '1';
  if (!testMode) {
    studio.classList.add('v33-static-presenters');
    ids.forEach(id => setDisabled(id, true));
    overlay?.classList.remove('show');
    setStatus('Apresentadores em imagem real.');
    return;
  }

  studio.classList.remove('v33-static-presenters');

  // Fonte real autorizada pelo usuário. Sem D-ID, sem geração paga e sem lip-sync artificial.
  const frame = document.createElement('iframe');
  frame.className = 'v33-real-source-frame';
  frame.title = 'VOZ NEWS — fonte real dos apresentadores';
  frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  frame.src = 'https://www.youtube-nocookie.com/embed/BcZnEUc1zvU?autoplay=1&playsinline=1&rel=0&modestbranding=1';
  frame.style.setProperty('position','absolute','important');
  frame.style.setProperty('left','50%','important');
  frame.style.setProperty('top','50%','important');
  frame.style.setProperty('transform','translate(-50%,-50%)','important');
  frame.style.setProperty('width','92%','important');
  frame.style.setProperty('height','82%','important');
  frame.style.setProperty('border','0','important');
  frame.style.setProperty('border-radius','18px','important');
  frame.style.setProperty('z-index','8','important');
  frame.style.setProperty('background','#000','important');
  frame.style.setProperty('box-shadow','0 24px 80px rgba(0,0,0,.55)','important');
  frame.style.setProperty('display','none','important');
  studio.appendChild(frame);

  const start = event => {
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();
    overlay?.classList.remove('show');
    frame.style.setProperty('display','block','important');
    setStatus('Fonte real dos apresentadores no ar.');
  };

  const reset = event => {
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();
    frame.style.setProperty('display','none','important');
    setStatus('Pronto para iniciar.');
  };

  setDisabled('startLiveNews', false);
  setDisabled('enterLiveButton', false);
  setDisabled('stopLiveNews', false);
  setDisabled('nextHeadline', true);

  document.getElementById('startLiveNews')?.addEventListener('click', start, true);
  document.getElementById('enterLiveButton')?.addEventListener('click', start, true);
  document.getElementById('stopLiveNews')?.addEventListener('click', reset, true);

  overlay?.classList.add('show');
  setStatus('Prévia com fonte real pronta.');
})();
