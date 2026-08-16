function authHeader() {
  const key = String(process.env.DID_API_KEY || '').trim();
  if (!key) throw new Error('DID_API_KEY ausente');
  return key.startsWith('Basic ') ? key : `Basic ${key}`;
}

async function did(path, options = {}) {
  const response = await fetch(`https://api.d-id.com${path}`, {
    ...options,
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json',
      ...(options.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
  const text = await response.text();
  let data = {};
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }
  if (!response.ok) {
    const error = new Error(data.description || data.message || `D-ID ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

const BASE = 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main';
const SCRIPT = [
  { presenter:'paulo', voice:'U6LxHR0vu0MhG5Nqp5ID', image:`${BASE}/studio-paulo-real-source.jpg`, text:'Seja muito bem-vindo. O portal do futuro já chegou.' },
  { presenter:'deijanete', voice:'Dimf6681ffz3PTVPPAEX', image:`${BASE}/studio-deijanete-real-source.jpg`, text:'Você está em um ambiente criado para mostrar a Brasília, ao Brasil e ao mundo o que há de mais relevante, inovador e inspirador.' },
  { presenter:'paulo', voice:'U6LxHR0vu0MhG5Nqp5ID', image:`${BASE}/studio-paulo-real-source.jpg`, text:'Aqui, informação, credibilidade e visão de futuro caminham juntas.' },
  { presenter:'deijanete', voice:'Dimf6681ffz3PTVPPAEX', image:`${BASE}/studio-deijanete-real-source.jpg`, text:'E agora, vamos ao destaque viral do dia.' },
  { presenter:'paulo', voice:'U6LxHR0vu0MhG5Nqp5ID', image:`${BASE}/studio-paulo-real-source.jpg`, text:'O assunto que domina o debate neste momento é a política brasileira.' },
  { presenter:'deijanete', voice:'Dimf6681ffz3PTVPPAEX', image:`${BASE}/studio-deijanete-real-source.jpg`, text:'Segundo o Tribunal Superior Eleitoral, a propaganda eleitoral geral, inclusive na internet, começa amanhã, dezesseis de agosto.' },
  { presenter:'paulo', voice:'U6LxHR0vu0MhG5Nqp5ID', image:`${BASE}/studio-paulo-real-source.jpg`, text:'Isso marca o início oficial de uma nova fase da disputa eleitoral, com mais visibilidade para candidaturas, agendas, discursos e estratégias de campanha.' },
  { presenter:'deijanete', voice:'Dimf6681ffz3PTVPPAEX', image:`${BASE}/studio-deijanete-real-source.jpg`, text:'No VOZ NEWS, você acompanha esse processo com presença, credibilidade e visão de futuro.' },
  { presenter:'paulo', voice:'U6LxHR0vu0MhG5Nqp5ID', image:`${BASE}/studio-paulo-real-source.jpg`, text:'Fique conosco.' },
  { presenter:'deijanete', voice:'Dimf6681ffz3PTVPPAEX', image:`${BASE}/studio-deijanete-real-source.jpg`, text:'O futuro da informação já começou.' }
];

module.exports = async function handler(req, res) {
  if (String(req.query?.token || '') !== 'V33-REAL-160826-K9M4') {
    return res.status(401).json({ error: 'unauthorized' });
  }
  try {
    const results = [];
    for (let index = 0; index < SCRIPT.length; index += 1) {
      const item = SCRIPT[index];
      const data = await did('/talks', {
        method: 'POST',
        body: JSON.stringify({
          source_url: item.image,
          driver_url: 'bank://lively/driver-06',
          script: {
            type: 'text',
            input: item.text,
            provider: {
              type: 'elevenlabs',
              voice_id: item.voice,
              voice_config: { stability: 0.62, similarity_boost: 0.86 }
            }
          },
          config: { stitch: true, fluent: true, result_format: 'mp4', pad_audio: 0 },
          name: `V33 REAL FINAL ${String(index + 1).padStart(2, '0')} ${item.presenter}`,
          user_data: JSON.stringify({ project:'V33', source:'real-user-video', order:index + 1, presenter:item.presenter })
        })
      });
      results.push({ order:index + 1, presenter:item.presenter, id:data.id, status:data.status });
    }
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ count:results.length, results });
  } catch (error) {
    return res.status(error.status || 500).json({ error:error.message, details:error.data || null });
  }
};
