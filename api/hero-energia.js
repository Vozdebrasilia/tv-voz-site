export default async function handler(req, res) {
  try {
    const source = 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/energia/hero-energia-hq.jpg';
    const r = await fetch(source, { cache: 'no-store' });
    if (!r.ok) throw new Error('Falha ao carregar imagem');
    const buffer = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(buffer);
  } catch (e) {
    res.status(500).send('');
  }
}
