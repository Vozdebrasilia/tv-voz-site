(() => {
  if (!document.querySelector('base[data-voz-gastronomia]')) {
    const base = document.createElement('base');
    base.href = '/gastronomia/';
    base.dataset.vozGastronomia = 'true';
    document.head.prepend(base);
  }
  const script = document.createElement('script');
  script.src = '/gastronomia/gastronomia.js';
  script.defer = true;
  document.body.appendChild(script);
})();
