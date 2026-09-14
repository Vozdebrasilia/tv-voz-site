/*
 * VOZ NEWS BRASIL — compatibilidade do antigo ecossistema.
 *
 * Este arquivo permanece neste caminho para não alterar o carregamento,
 * o layout, as rotas nem os demais recursos já existentes no site.
 * O antigo conjunto de 40 verticais foi substituído visualmente pelo
 * Portal Nota 10, cuja estrutura oficial está em /top10-runtime.js.
 */
(() => {
  function atualizarSeguidoresInstagram() {
    const contador = document.querySelector('.eco-stat.featured-stat .count-up') ||
      [...document.querySelectorAll('.eco-stat .count-up')].find(el => /seguidores no Instagram/i.test(el.parentElement?.textContent || ''));
    if (contador) {
      contador.dataset.target = '250';
      contador.dataset.format = 'mil';
      contador.dataset.suffix = '+';
      if (contador.dataset.animated === 'true') contador.textContent = '250 mil+';
    }
  }

  atualizarSeguidoresInstagram();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', atualizarSeguidoresInstagram, { once: true });
  }
  window.addEventListener('load', atualizarSeguidoresInstagram, { once: true });

  if (document.getElementById('voznews-top10-runtime')) return;
  const script = document.createElement('script');
  script.id = 'voznews-top10-runtime';
  script.src = '/top10-runtime.js';
  script.async = false;
  document.head.appendChild(script);
})();
