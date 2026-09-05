const { didFetch } = require('./_did');

module.exports = async function handler(req,res){
  try {
    const [voices, avatars, presenters] = await Promise.all([
      didFetch('/tts/voices'),
      didFetch('/scenes/avatars?limit=200').catch(()=>[]),
      didFetch('/clips/presenters?limit=1000').catch(()=>[])
    ]);

    const arr = x => Array.isArray(x) ? x : (x?.voices || x?.avatars || x?.presenters || []);
    const wanted = item => {
      const s = JSON.stringify(item).toLowerCase();
      return s.includes('deijanete') || s.includes('paulo') || s.includes('fayad') || s.includes('custom') || s.includes('clone');
    };

    res.setHeader('Cache-Control','no-store');
    res.status(200).json({
      voices: arr(voices).filter(wanted),
      avatars: arr(avatars).filter(wanted),
      presenters: arr(presenters).filter(wanted)
    });
  } catch(e) {
    res.status(e.status || 500).json({error:e.message, details:e.data || null});
  }
};