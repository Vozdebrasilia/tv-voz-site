const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const OVERPASS = 'https://overpass-api.de/api/interpreter';
const USER_AGENT = 'VozNewsBrasil-Gastronomia/1.0 (https://www.voznewsbrasil.com.br/)';

function safeText(value, max = 120) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/"/g, '\\"');
}

async function fetchJson(url, options = {}, timeoutMs = 8500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {...options, signal: controller.signal});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function geocode(location) {
  const url = `${NOMINATIM}?format=jsonv2&limit=1&q=${encodeURIComponent(location)}`;
  const data = await fetchJson(url, {headers: {'User-Agent': USER_AGENT, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7'}});
  if (!Array.isArray(data) || !data.length) return null;
  const first = data[0];
  return {lat: Number(first.lat), lon: Number(first.lon), displayName: first.display_name || location};
}

function buildOverpassQuery(lat, lon, term) {
  const radius = 14000;
  const filter = term ? `["name"~"${escapeRegex(term)}",i]` : '';
  const cuisineFilter = term ? `["cuisine"~"${escapeRegex(term)}",i]` : '';
  return `[out:json][timeout:14];(
    nwr["amenity"="restaurant"]${filter}(around:${radius},${lat},${lon});
    nwr["amenity"="restaurant"]${cuisineFilter}(around:${radius},${lat},${lon});
  );out center tags 40;`;
}

function normalizeElement(element) {
  const tags = element.tags || {};
  const lat = element.lat || (element.center && element.center.lat) || null;
  const lon = element.lon || (element.center && element.center.lon) || null;
  const addressParts = [
    tags['addr:street'],
    tags['addr:housenumber'],
    tags['addr:suburb'],
    tags['addr:city'],
    tags['addr:state'],
    tags['addr:country']
  ].filter(Boolean);
  return {
    name: tags.name || tags.brand || 'Restaurante',
    cuisine: tags.cuisine ? tags.cuisine.replace(/;/g, ', ') : '',
    address: addressParts.join(', ') || tags['contact:address'] || '',
    lat,
    lon,
    mapUrl: lat && lon ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}` : ''
  };
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') return res.status(405).json({error: 'Método não permitido'});

  const term = safeText(req.query.term || '', 70);
  const location = safeText(req.query.location || 'Brasília, DF, Brasil', 120);
  if (!location) return res.status(400).json({error: 'Informe uma cidade, estado ou país.'});

  try {
    const center = await geocode(location);
    if (!center || !Number.isFinite(center.lat) || !Number.isFinite(center.lon)) {
      return res.status(404).json({error: 'Localidade não encontrada.', results: []});
    }

    const query = buildOverpassQuery(center.lat, center.lon, term);
    const data = await fetchJson(OVERPASS, {
      method: 'POST',
      headers: {'User-Agent': USER_AGENT, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
      body: `data=${encodeURIComponent(query)}`
    }, 12000);

    const seen = new Set();
    const results = (data.elements || []).map(normalizeElement).filter(item => {
      const key = `${item.name.toLowerCase()}|${item.lat}|${item.lon}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 30);

    return res.status(200).json({source: 'OpenStreetMap', location: center.displayName, results});
  } catch (error) {
    return res.status(503).json({error: 'A busca externa está temporariamente indisponível.', results: []});
  }
};
