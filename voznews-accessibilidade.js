(() => {
  if (window.__vozNewsA11yLoaded) return;
  window.__vozNewsA11yLoaded = true;

  const synth = window.speechSynthesis;
  const supportsSpeech = !!(synth && window.SpeechSynthesisUtterance);
  let activeUtterance = null;
  let speechRun = 0;
  let fontScale = 1;

  const style = document.createElement('style');
  style.id = 'voznews-a11y-style';
  style.textContent = `
    #voznews-a11y-launcher{position:fixed;right:18px;bottom:20px;z-index:2147483000;border:2px solid #d4af37;border-radius:999px;background:#062443;color:#fff;padding:13px 17px;font:900 15px Arial,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.38);cursor:pointer;display:flex;align-items:center;gap:8px}
    #voznews-a11y-launcher:hover,#voznews-a11y-launcher:focus-visible{outline:3px solid #fff;outline-offset:3px;background:#0c4f83}
    #voznews-a11y-panel{position:fixed;right:18px;bottom:78px;z-index:2147482999;width:min(390px,calc(100vw - 28px));background:#fff;color:#10243a;border:3px solid #d4af37;border-radius:20px;padding:18px;box-shadow:0 18px 55px rgba(0,0,0,.42);font-family:Arial,sans-serif;display:none}
    #voznews-a11y-panel.open{display:block}
    #voznews-a11y-panel h2{font-size:21px;margin:0 42px 5px 0;color:#082e55}
    #voznews-a11y-panel p{font-size:13px;line-height:1.45;margin:0 0 13px;color:#44576a}
    #voznews-a11y-close{position:absolute;top:10px;right:10px;width:38px;height:38px;border:0;border-radius:50%;background:#082e55;color:#fff;font:900 22px/1 Arial,sans-serif;cursor:pointer;display:grid;place-items:center}
    #voznews-a11y-close:hover,#voznews-a11y-close:focus-visible{outline:3px solid #d4af37;outline-offset:2px;background:#0c4f83}
    .voznews-a11y-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .voznews-a11y-btn{min-height:46px;border:1px solid #b9c9d8;border-radius:12px;background:#eef6fb;color:#092b4b;padding:9px 10px;font:800 14px Arial,sans-serif;cursor:pointer}
    .voznews-a11y-btn:hover,.voznews-a11y-btn:focus-visible{outline:3px solid #d4af37;outline-offset:2px;background:#dceefa}
    .voznews-a11y-wide{grid-column:1/-1;background:#082e55;color:#fff;border-color:#082e55}
    #voznews-a11y-status{margin-top:11px;padding:9px 10px;background:#f5f6f7;border-radius:10px;font-size:12px;line-height:1.35}
    body.voznews-high-contrast{background:#000!important;color:#fff!important}
    body.voznews-high-contrast *:not(img):not(video){border-color:#fff!important}
    body.voznews-high-contrast a,body.voznews-high-contrast button{color:#ffeb3b!important}
    body.voznews-high-contrast #voznews-a11y-panel{background:#000!important;color:#fff!important}
    body.voznews-high-contrast #voznews-a11y-panel p,body.voznews-high-contrast #voznews-a11y-panel h2{color:#fff!important}
    body.voznews-high-contrast .voznews-a11y-btn,body.voznews-high-contrast #voznews-a11y-close{background:#000!important}
    @media(max-width:620px){#voznews-a11y-launcher{right:10px;bottom:12px;font-size:13px;padding:11px 13px}#voznews-a11y-panel{right:10px;bottom:66px}.voznews-a11y-grid{grid-template-columns:1fr}.voznews-a11y-wide{grid-column:1}}
  `;
  document.head.appendChild(style);

  const launcher = document.createElement('button');
  launcher.id = 'voznews-a11y-launcher';
  launcher.type = 'button';
  launcher.setAttribute('aria-expanded', 'false');
  launcher.setAttribute('aria-controls', 'voznews-a11y-panel');
  launcher.setAttribute('aria-label', 'Abrir recursos de acessibilidade do VOZ NEWS');
  launcher.innerHTML = '<span aria-hidden="true">♿</span> VOZ NEWS Acessível';

  const panel = document.createElement('section');
  panel.id = 'voznews-a11y-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Recursos de acessibilidade VOZ NEWS');
  panel.innerHTML = `
    <button id="voznews-a11y-close" type="button" aria-label="Fechar acessibilidade" title="Fechar">×</button>
    <h2>VOZ NEWS Acessível</h2>
    <p>Informação para todos. Use leitura em voz alta, contraste e tamanho de texto.</p>
    <div class="voznews-a11y-grid">
      <button class="voznews-a11y-btn voznews-a11y-wide" type="button" data-a11y="summary">🔊 Ouvir resumo</button>
      <button class="voznews-a11y-btn voznews-a11y-wide" type="button" data-a11y="full">🔊 Ouvir notícia</button>
      <button class="voznews-a11y-btn" type="button" data-a11y="pause">⏸ Pausar</button>
      <button class="voznews-a11y-btn" type="button" data-a11y="resume">▶ Continuar</button>
      <button class="voznews-a11y-btn" type="button" data-a11y="stop">⏹ Parar</button>
      <button class="voznews-a11y-btn" type="button" data-a11y="contrast">◐ Alto contraste</button>
      <button class="voznews-a11y-btn" type="button" data-a11y="smaller">A− Diminuir texto</button>
      <button class="voznews-a11y-btn" type="button" data-a11y="larger">A+ Aumentar texto</button>
    </div>
    <div id="voznews-a11y-status" role="status" aria-live="polite">Pronto para usar.</div>
  `;
  document.body.append(panel, launcher);

  const status = panel.querySelector('#voznews-a11y-status');
  const closeButton = panel.querySelector('#voznews-a11y-close');
  const setStatus = text => { status.textContent = text; };
  const closePanel = () => {
    panel.classList.remove('open');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.focus();
  };

  function cleanForSpeech(text='') {
    return String(text)
      .replace(/VOZ NEWS/gi, 'Voz News')
      .replace(/\bDF\b/g, 'Distrito Federal')
      .replace(/\bSTF\b/g, 'Supremo Tribunal Federal')
      .replace(/\bTSE\b/g, 'Tribunal Superior Eleitoral')
      .replace(/\bGDF\b/g, 'Governo do Distrito Federal')
      .replace(/\s*•\s*/g, '. ')
      .replace(/\s*[|–—]\s*/g, '. ')
      .replace(/\s+/g, ' ')
      .replace(/([.!?])(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ])/g, '$1 ')
      .trim();
  }

  function currentHomepageText(full) {
    const title = document.querySelector('#v33head')?.innerText?.trim();
    if (!title) return '';
    const summary = document.querySelector('#v33source')?.innerText?.trim() || '';
    const analyst = document.querySelector('#v33analystname')?.innerText?.trim() || '';
    if (!full) return cleanForSpeech(`Manchete. ${title}. ${summary}`);
    return cleanForSpeech(`Voz News. Manchete. ${title}. Análise de ${analyst || 'Voz News'}. ${summary}. Para ler a análise completa, abra esta notícia. Aconteceu? A Voz fala!`);
  }

  function articleText(full) {
    const article = document.querySelector('[data-voznews-readable="article"], article');
    if (!article) return '';
    const h1 = article.querySelector('h1')?.innerText?.trim() || '';
    if (!full) {
      const firstParagraph = [...article.querySelectorAll('p')].find(p => !p.classList.contains('slogan'))?.innerText?.trim() || '';
      return cleanForSpeech(`Manchete. ${h1}. ${firstParagraph}`);
    }
    const paragraphs = [...article.querySelectorAll('p')]
      .filter(p => !p.closest('.source') && !p.classList.contains('slogan'))
      .map(p => p.innerText.trim()).filter(Boolean);
    return cleanForSpeech(`${h1}. ${paragraphs.join(' ')}. Aconteceu? A Voz fala!`);
  }

  function preferredText(full) {
    return currentHomepageText(full) || articleText(full) || cleanForSpeech(document.title);
  }

  function chooseVoice() {
    const voices = synth?.getVoices?.() || [];
    const br = voices.filter(v => /^pt-BR$/i.test(v.lang));
    return br.find(v => /luciana|francisca|antonio|maria|google|premium|natural|enhanced/i.test(v.name)) || br[0] || voices.find(v => /^pt/i.test(v.lang)) || null;
  }

  function sentenceChunks(text) {
    const chunks = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    return chunks.map(s => s.trim()).filter(Boolean);
  }

  function stopSpeech(message='Leitura interrompida.') {
    speechRun += 1;
    if (supportsSpeech) synth.cancel();
    activeUtterance = null;
    setStatus(message);
  }

  function speak(full) {
    if (!supportsSpeech) {
      setStatus('Este navegador não oferece leitura em voz alta. O conteúdo continua compatível com leitores de tela.');
      return;
    }
    const text = preferredText(full);
    if (!text) { setStatus('Não encontrei a notícia atual para leitura.'); return; }
    synth.cancel();
    const run = ++speechRun;
    const chunks = sentenceChunks(text);
    const voice = chooseVoice();
    let pos = 0;
    setStatus(full ? 'Lendo a notícia atual.' : 'Lendo o resumo da notícia atual.');

    const nextChunk = () => {
      if (run !== speechRun) return;
      if (pos >= chunks.length) {
        activeUtterance = null;
        setStatus('Leitura concluída. Aconteceu? A VOZ fala!');
        return;
      }
      const phrase = chunks[pos++];
      const u = new SpeechSynthesisUtterance(phrase);
      u.lang = 'pt-BR';
      u.rate = 0.86;
      u.pitch = 1.03;
      u.volume = 1;
      if (voice) u.voice = voice;
      u.onend = () => {
        if (run !== speechRun) return;
        const delay = /[!?]$/.test(phrase) ? 420 : 260;
        setTimeout(nextChunk, delay);
      };
      u.onerror = () => {
        if (run === speechRun) setStatus('Não foi possível concluir a leitura. Tente novamente.');
      };
      activeUtterance = u;
      synth.speak(u);
    };
    nextChunk();
  }

  function scalableElements() {
    return [...document.querySelectorAll('body h1,body h2,body h3,body h4,body p,body li,body a,body span,body strong,body em,body small,body button')]
      .filter(el => !el.closest('#voznews-a11y-panel') && el.id !== 'voznews-a11y-launcher' && !el.closest('#voznews-a11y-launcher'));
  }

  function applyFontScale(next) {
    fontScale = Math.max(.8, Math.min(1.5, next));
    scalableElements().forEach(el => {
      if (!el.dataset.voznewsBaseFontSize) {
        const size = parseFloat(getComputedStyle(el).fontSize);
        if (Number.isFinite(size) && size > 0) el.dataset.voznewsBaseFontSize = String(size);
      }
      const base = parseFloat(el.dataset.voznewsBaseFontSize || '');
      if (Number.isFinite(base) && base > 0) el.style.fontSize = `${Math.round(base * fontScale * 100) / 100}px`;
    });
    setStatus(`Tamanho do texto: ${Math.round(fontScale * 100)}%.`);
  }

  launcher.addEventListener('click', () => {
    const open = !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    launcher.setAttribute('aria-expanded', String(open));
    if (open) closeButton?.focus();
  });

  closeButton?.addEventListener('click', closePanel);

  panel.addEventListener('click', e => {
    const action = e.target.closest('[data-a11y]')?.dataset.a11y;
    if (!action) return;
    if (action === 'summary') speak(false);
    if (action === 'full') speak(true);
    if (action === 'pause' && supportsSpeech) { synth.pause(); setStatus('Leitura pausada.'); }
    if (action === 'resume' && supportsSpeech) { synth.resume(); setStatus('Leitura retomada.'); }
    if (action === 'stop') stopSpeech();
    if (action === 'contrast') { document.body.classList.toggle('voznews-high-contrast'); setStatus(document.body.classList.contains('voznews-high-contrast') ? 'Alto contraste ativado.' : 'Alto contraste desativado.'); }
    if (action === 'smaller') applyFontScale(fontScale - .1);
    if (action === 'larger') applyFontScale(fontScale + .1);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) closePanel();
  });
})();