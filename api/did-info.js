const { didFetch } = require('./_did');

module.exports = async function handler(req,res){
  try{
    const [voicesRaw,talksRaw] = await Promise.all([
      didFetch('/tts/voices'),
      didFetch('/talks?limit=100')
    ]);

    const voices = Array.isArray(voicesRaw) ? voicesRaw : (voicesRaw.voices || []);
    const talks = Array.isArray(talksRaw) ? talksRaw : (talksRaw.talks || talksRaw.items || []);

    const privateVoices = voices.filter(v =>
      v.access && String(v.access).toLowerCase() !== 'public'
    );

    const relevantTalks = talks.filter(t => {
      const s = JSON.stringify(t).toLowerCase();
      return s.includes('deijanete') ||
             s.includes('paulo') ||
             s.includes('fayad') ||
             s.includes('voz news');
    });

    res.setHeader('Cache-Control','no-store');
    res.status(200).json({
      privateVoices,
      relevantTalks: relevantTalks.slice(0,30)
    });
  }catch(e){
    res.status(e.status || 500).json({
      error:e.message,
      details:e.data || null
    });
  }
};
