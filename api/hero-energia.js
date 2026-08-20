export default async function handler(req, res) {
  try {
    const source = 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/energia/hero-man.b64';
    const r = await fetch(source, { cache: 'no-store' });
    if (!r.ok) throw new Error('Falha ao carregar imagem base64');
    const b64 = (await r.text()).trim();
    const buffer = Buffer.from(b64, 'base64');
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(buffer);
  } catch (e) {
    res.status(500).send('');
  }
}
