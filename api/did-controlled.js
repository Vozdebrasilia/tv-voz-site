const { didFetch } = require('./_did');

const ITEMS = [
  {
    name: 'CONTROLADO PAULO',
    presenter: 'paulo',
    source_url: 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.png',
    voice_id: 'U6LxHR0vu0MhG5Nqp5ID',
    text: 'Seja bem-vindo ao VOZ NEWS.'
  },
  {
    name: 'CONTROLADO DEIJANETE',
    presenter: 'deijanete',
    source_url: 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.png',
    voice_id: 'Dimf6681ffz3PTVPPAEX',
    text: 'Agora, o destaque do dia.'
  }
];

module.exports = async function handler(req,res){
  try{
    const token = String(req.query?.token || '');
    if(token !== 'V33-CONTROLADO-150826'){
      return res.status(401).json({ error:'Não autorizado' });
    }

    const results = [];

    for (const item of ITEMS) {
      const payload = {
        source_url: item.source_url,
        script: {
          type: 'text',
          input: item.text,
          provider: {
            type: 'elevenlabs',
            voice_id: item.voice_id,
            voice_config: {
              stability: 0.72,
              similarity_boost: 0.9
            }
          }
        },
        config: {
          stitch: true,
          fluent: true,
          result_format: 'mp4',
          pad_audio: 0,
          auto_match: true,
          normalization_factor: 1
        },
        name: item.name,
        user_data: JSON.stringify({
          project: 'V33',
          mode: 'controlado',
          presenter: item.presenter
        })
      };

      const data = await didFetch('/talks', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      results.push({
        presenter: item.presenter,
        id: data.id,
        status: data.status
      });
    }

    res.setHeader('Cache-Control','no-store');
    res.status(200).json({ results });
  } catch (e) {
    res.status(e.status || 500).json({
      error: e.message,
      details: e.data || null
    });
  }
};
