const { didFetch } = require('./_did');

module.exports = async function handler(req,res){
  try{
    const id = String(req.query?.id || '').trim();
    if(!id) return res.status(400).json({ error:'ID ausente' });

    const data = await didFetch('/talks/' + encodeURIComponent(id));

    res.setHeader('Cache-Control','no-store');
    res.status(200).json({
      id: data.id,
      status: data.status,
      result_url: data.result_url || null,
      error: data.error || null
    });
  } catch (e) {
    res.status(e.status || 500).json({
      error: e.message,
      details: e.data || null
    });
  }
};
