const { didFetch } = require('./_did');

module.exports = async function handler(req,res){
  try{
    const data = await didFetch('/talks?limit=100');
    const talks = Array.isArray(data) ? data : (data.talks || []);
    const found = talks
      .filter(x => String(x.name || '').includes('CONTROLADO'))
      .map(x => ({
        id: x.id,
        name: x.name,
        status: x.status,
        result_url: x.result_url || null,
        error: x.error || null
      }));

    res.setHeader('Cache-Control','no-store');
    res.status(200).json({ found });
  }catch(e){
    res.status(e.status || 500).json({
      error:e.message,
      details:e.data || null
    });
  }
};
