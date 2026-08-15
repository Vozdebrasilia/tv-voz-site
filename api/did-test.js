const { didFetch } = require('./_did');

const config = {
  deijanete: {
    image: 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-deijanete-source.jpg',
    voice: 'Dimf6681ffz3PTVPPAEX',
    text: 'Olá. Eu sou Deijanete Fayad. Este é um teste de voz da V33.'
  },
  paulo: {
    image: 'https://raw.githubusercontent.com/Vozdebrasilia/tv-voz-site/main/studio-paulo-source.jpg',
    voice: 'U6LxHR0vu0MhG5Nqp5ID',
    text: 'Olá. Eu sou Paulo Fayad. Este é um teste de voz da V33.'
  }
};

module.exports = async function handler(req,res){
  try{
    const presenter = req.query?.presenter === 'paulo' ? 'paulo' : 'deijanete';
    const c = config[presenter];

    const payload = {
      source_url: c.image,
      script: {
        type: 'text',
        input: c.text,
        provider: {
          type: 'elevenlabs',
          voice_id: c.voice,
          voice_config: {
            stability: 0.55,
            similarity_boost: 0.8
          }
        }
      },
      config: {
        stitch: true,
        fluent: true,
        result_format: 'mp4'
      },
      name: `V33 TESTE ${presenter}`
    };

    const data = await didFetch('/talks',{
      method:'POST',
      body:JSON.stringify(payload)
    });

    res.status(200).json({
      presenter,
      id:data.id,
      status:data.status
    });

  }catch(e){
    res.status(e.status||500).json({
      error:e.message,
      details:e.data||null
    });
  }
};
