const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'VozNewsBrasil-Mobilidade/1.0 (https://www.voznewsbrasil.com.br/)';

function safeText(value, max = 100) {
  return String(value || '')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function buildQuery({term, location, vehicle, service, category}) {
  return [
    safeText(term, 70),
    safeText(service, 50),
    safeText(vehicle, 50),
    safeText(category, 50),
    safeText(location, 120)
  ].filter(Boolean).join(' ');
}

async function fetchJson(url, timeoutMs = 5500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': USER_AGENT,
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7',
        Accept: 'application/json'
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function normalizePlace(item) {
  const address = item.address || {};
  const extra = item.extratags || {};
  const lat = Number(item.lat);
  const lon = Number(item.lon);
  const mapUrl = Number.isFinite(lat) && Number.isFinite(lon)
    ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}`
    : '';

  return {
    name: item.name || (item.display_name || '').split(',')[0] || 'Empresa de mobilidade',
    category: [item.type, item.category].filter(Boolean).join(' • '),
    address: item.display_name || '',
    city: address.city || address.town || address.village || address.municipality || '',
    state: address.state || '',
    country: address.country || '',
    phone: extra.phone || extra['contact:phone'] || '',
    site: extra.website || extra['contact:website'] || '',
    lat,
    lon,
    mapUrl,
    source: 'OpenStreetMap'
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'GET') {
    return res.status(405).json({error: 'Método não permitido'});
  }

  const fields = {
    term: safeText(req.query.term, 70),
    location: safeText(req.query.location, 120),
    vehicle: safeText(req.query.vehicle, 50),
    service: safeText(req.query.service, 50),
    category: safeText(req.query.category, 50)
  };

  const query = buildQuery(fields);
  if (!query) {
    return res.status(400).json({error: 'Informe uma empresa, localização ou filtro de mobilidade.'});
  }

  try {
    const url = `${NOMINATIM}?format=jsonv2&addressdetails=1&extratags=1&namedetails=1&limit=25&q=${encodeURIComponent(query)}`;
    const data = await fetchJson(url);
    const results = (Array.isArray(data) ? data : []).map(normalizePlace);

    return res.status(200).json({
      query,
      source: 'OpenStreetMap',
      results,
      externalStatus: 'ok'
    });
  } catch (error) {
    console.error('[mobilidade-search]', error && error.message ? error.message : error);
    return res.status(200).json({
      query,
      source: 'OpenStreetMap',
      results: [],
      externalStatus: 'degraded'
    });
  }
};

module.exports._test = {safeText, buildQuery, normalizePlace};
