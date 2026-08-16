(() => {
  'use strict';

  // Modo seguro da V33: nenhum vídeo gerado é exibido enquanto os arquivos
  // finais não forem aprovados visualmente. Isso evita figurino incorreto,
  // marca do fornecedor e lip-sync artificial no portal público.
  const studio = document.getElementById('tv-ao-vivo');
  const status = document.getElementById('studioStatus');
  const overlay = document.getElementById('enterLiveOverlay');
  if (!studio) return;

  studio.classList.remove('v33-media-ready');
  studio.classList.add('v33-static-presenters');

  // Remove qualquer vídeo de apresentador que possa ter sido injetado por
  // cache/navegação anterior e mantém somente as imagens reais do estúdio.
  studio.querySelectorAll('.v33-presenter-video,.v33-did-video').forEach(el => el.remove());

  const setStatus = text => { if (status) status.textContent = text; };
  const disable = id => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = true;
    button.setAttribute('aria-disabled', 'true');
  };

  disable('startLiveNews');
  disable('enterLiveButton');
  disable('nextHeadline');
  disable('stopLiveNews');

  overlay?.classList.remove('show');
  setStatus('Apresentadores em imagem real.');
})();
