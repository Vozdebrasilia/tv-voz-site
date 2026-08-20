export default async function handler(req, res) {
  try {
    const base = 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/energia/';
    const names = [
      'hero-hd-p01.bin',
      'hero-hd-p02.bin',
      'hero-hd-p03.bin',
      'hero-hd-p04.bin',
      'hero-hd-p05.bin'
    ];
    const parts = [];
    for (const name of names) {
      const r = await fetch(base + name, { cache: 'no-store' });
      if (!r.ok) throw new Error('Falha ao carregar ' + name);
      parts.push(Buffer.from(await r.arrayBuffer()));
    }
    const buffer = Buffer.concat(parts);
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Content-Length', String(buffer.length));
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(buffer);
  } catch (e) {
    res.status(500).send('');
  }
}
