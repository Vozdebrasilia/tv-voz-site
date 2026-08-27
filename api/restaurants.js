const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const PHOTON = 'https://photon.komoot.io/api/';
const OVERPASS_ENDPOINTS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter'
];
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
    if (!response.ok) throw new Error(`${new URL(url).hostname}: HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

async function geocodeWithNominatim(location) {
  const url = `${NOMINATIM}?format=jsonv2&limit=1&q=${encodeURIComponent(location)}`;
  const data = await fetchJson(url, {headers: {'User-Agent': USER_AGENT, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7'}});
  if (!Array.isArray(data) || !data.length) return null;
  const first = data[0];
  return {lat: Number(first.lat), lon: Number(first.lon), displayName: first.display_name || location};
}

async function geocodeWithPhoton(location) {
  const url = `${PHOTON}?limit=1&q=${encodeURIComponent(location)}`;
  const data = await fetchJson(url, {headers: {'User-Agent': USER_AGENT, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7'}});
  const feature = data && Array.isArray(data.features) ? data.features[0] : null;
  if (!feature || !feature.geometry || !Array.isArray(feature.geometry.coordinates)) return null;
  const [lon, lat] = feature.geometry.coordinates;
  const props = feature.properties || {};
  const displayName = [props.name, props.city, props.state, props.country].filter(Boolean).join(', ') || location;
  return {lat: Number(lat), lon: Number(lon), displayName};
}

async function geocode(location) {
  const errors = [];
  for (const provider of [geocodeWithNominatim, geocodeWithPhoton]) {
    try {
      const result = await provider(location);
      if (result && Number.isFinite(result.lat) && Number.isFinite(result.lon)) return result;
    } catch (error) {
      errors.push(error.message);
    }
  }
  throw new Error(`Geocodificação indisponível: ${errors.join(' | ')}`);
}

function buildOverpassQuery(lat, lon, term) {
  const radius = 14000;
  const filter = term ? `["name"~"${escapeRegex(term)}",i]` : '';
  const cuisineFilter = term ? `["cuisine"~"${escapeRegex(term)}",i]` : '';
  return `[out:json][timeout:12];(
    nwr["amenity"="restaurant"]${filter}(around:${radius},${lat},${lon});
    nwr["amenity"="restaurant"]${cuisineFilter}(around:${radius},${lat},${lon});
  );out center tags 40;`;
}

async function fetchOverpass(query) {
  const errors = [];
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const getUrl = `${endpoint}?data=${encodeURIComponent(query)}`;
      return await fetchJson(getUrl, {headers: {'User-Agent': USER_AGENT, 'Accept': 'application/json'}}, 11000);
    } catch (error) {
      errors.push(error.message);
    }
  }
  throw new Error(`Overpass indisponível: ${errors.join(' | ')}`);
}

async function fallbackNominatimRestaurants(term, location) {
  const query = `${term ? `${term} ` : ''}restaurant ${location}`;
  const url = `${NOMINATIM}?format=jsonv2&addressdetails=1&extratags=1&limit=25&q=${encodeURIComponent(query)}`;
  const data = await fetchJson(url, {headers: {'User-Agent': USER_AGENT, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7'}}, 9000);
  if (!Array.isArray(data)) return [];
  return data.map(item => {
    const address = item.address || {};
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    return {
      name: item.name || (item.display_name || '').split(',')[0] || 'Restaurante',
      cuisine: (item.extratags && item.extratags.cuisine) || '',
      address: item.display_name || [address.road, address.city, address.state, address.country].filter(Boolean).join(', '),
      lat,
      lon,
      mapUrl: Number.isFinite(lat) && Number.isFinite(lon) ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}` : ''
    };
  });
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

function dedupe(results) {
  const seen = new Set();
  return results.filter(item => {
    const key = `${String(item.name || '').toLowerCase()}|${item.lat}|${item.lon}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 30);
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=900');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') return res.status(405).json({error: 'Método não permitido'});

  const term = safeText(req.query.term || '', 70);
  const location = safeText(req.query.location || 'Brasília, DF, Brasil', 120);
  if (!location) return res.status(400).json({error: 'Informe uma cidade, estado ou país.'});

  try {
    const center = await geocode(location);
    const query = buildOverpassQuery(center.lat, center.lon, term);
    try {
      const data = await fetchOverpass(query);
      const results = dedupe((data.elements || []).map(normalizeElement));
      if (results.length) return res.status(200).json({source: 'OpenStreetMap', location: center.displayName, results});
    } catch (overpassError) {
      console.error('[restaurants] overpass fallback:', overpassError.message);
    }

    try {
      const results = dedupe(await fallbackNominatimRestaurants(term, location));
      return res.status(200).json({source: 'OpenStreetMap/Nominatim', location: center.displayName, results});
    } catch (fallbackError) {
      console.error('[restaurants] nominatim fallback:', fallbackError.message);
      return res.status(200).json({source: 'OpenStreetMap', location: center.displayName, results: []});
    }
  } catch (error) {
    console.error('[restaurants] search failure:', error && error.message ? error.message : error);
    return res.status(503).json({error: 'A busca externa está temporariamente indisponível.', results: []});
  }
};
