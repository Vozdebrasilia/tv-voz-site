const restaurantCatalog = require('../gastronomia/data/restaurants.json');
const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const PHOTON = 'https://photon.komoot.io/api/';
const OVERPASS_ENDPOINTS = [
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter'
];
const USER_AGENT = 'VozNewsBrasil-Gastronomia/2.0 (https://www.voznewsbrasil.com.br/)';
const TIER_WEIGHT = {sponsored: 0, partner: 1, editorial: 2, public: 3};

function safeText(value, max = 120) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max);
}

function normalize(value) {
  return safeText(value, 300)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/"/g, '\\"');
}

function ownRestaurantResult(item) {
  return {
    id: item.id,
    name: item.name,
    cuisine: item.cuisine,
    category: item.category,
    priceBand: item.priceBand,
    profile: item.profile,
    address: item.address || [item.city, item.state, item.country].filter(Boolean).join(', '),
    city: item.city,
    state: item.state,
    country: item.country,
    url: item.url,
    mapUrl: item.url,
    tier: item.tier,
    source: 'voznews',
    featured: Boolean(item.featured),
    tags: Array.isArray(item.tags) ? item.tags : []
  };
}

function locationMatches(item, location) {
  const l = normalize(location);
  if (!l) return true;
  const city = normalize(item.city);
  const state = normalize(item.state);
  const country = normalize(item.country);
  const locationHaystack = normalize([item.city, item.state, item.country].filter(Boolean).join(' '));
  return locationHaystack.includes(l) || l.includes(city) || (state && l.includes(state)) || l.includes(country);
}

function termMatches(item, term) {
  const t = normalize(term);
  if (!t) return true;
  const haystack = normalize([
    item.name,
    item.cuisine,
    item.category,
    item.profile,
    ...(Array.isArray(item.tags) ? item.tags : [])
  ].join(' '));
  return haystack.includes(t);
}

function searchOwnCatalog(term, location) {
  return restaurantCatalog
    .filter(item => locationMatches(item, location) && termMatches(item, term))
    .sort((a, b) => {
      const tier = (TIER_WEIGHT[a.tier] ?? 9) - (TIER_WEIGHT[b.tier] ?? 9);
      if (tier) return tier;
      const featured = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      if (featured) return featured;
      return a.name.localeCompare(b.name, 'pt-BR');
    })
    .slice(0, 30)
    .map(ownRestaurantResult);
}

async function fetchJson(url, options = {}, timeoutMs = 5500) {
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
  const data = await fetchJson(url, {headers: {'User-Agent': USER_AGENT, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7'}}, 4500);
  if (!Array.isArray(data) || !data.length) return null;
  const first = data[0];
  return {lat: Number(first.lat), lon: Number(first.lon), displayName: first.display_name || location};
}

async function geocodeWithPhoton(location) {
  const url = `${PHOTON}?limit=1&q=${encodeURIComponent(location)}`;
  const data = await fetchJson(url, {headers: {'User-Agent': USER_AGENT, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7'}}, 4500);
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
  return `[out:json][timeout:7];(
    nwr["amenity"="restaurant"]${filter}(around:${radius},${lat},${lon});
    nwr["amenity"="restaurant"]${cuisineFilter}(around:${radius},${lat},${lon});
  );out center tags 35;`;
}

async function fetchOverpass(query) {
  const errors = [];
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const getUrl = `${endpoint}?data=${encodeURIComponent(query)}`;
      return await fetchJson(getUrl, {headers: {'User-Agent': USER_AGENT, 'Accept': 'application/json'}}, 6000);
    } catch (error) {
      errors.push(error.message);
    }
  }
  throw new Error(`Overpass indisponível: ${errors.join(' | ')}`);
}

async function fallbackNominatimRestaurants(term, location) {
  const query = `${term ? `${term} ` : ''}restaurant ${location}`;
  const url = `${NOMINATIM}?format=jsonv2&addressdetails=1&extratags=1&limit=20&q=${encodeURIComponent(query)}`;
  const data = await fetchJson(url, {headers: {'User-Agent': USER_AGENT, 'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.7'}}, 5000);
  if (!Array.isArray(data)) return [];
  return data.map(item => {
    const address = item.address || {};
    const lat = Number(item.lat);
    const lon = Number(item.lon);
    return {
      name: item.name || (item.display_name || '').split(',')[0] || 'Restaurante',
      cuisine: (item.extratags && item.extratags.cuisine) || '',
      category: 'resultado público',
      priceBand: '',
      profile: 'Resultado público complementar.',
      address: item.display_name || [address.road, address.city, address.state, address.country].filter(Boolean).join(', '),
      city: address.city || address.town || address.village || '',
      state: address.state || '',
      country: address.country || '',
      lat,
      lon,
      mapUrl: Number.isFinite(lat) && Number.isFinite(lon) ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}` : '',
      url: Number.isFinite(lat) && Number.isFinite(lon) ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}` : '',
      tier: 'public',
      source: 'public',
      featured: false,
      tags: []
    };
  });
}

function normalizeElement(element) {
  const tags = element.tags || {};
  const lat = element.lat || (element.center && element.center.lat) || null;
  const lon = element.lon || (element.center && element.center.lon) || null;
  const addressParts = [tags['addr:street'], tags['addr:housenumber'], tags['addr:suburb'], tags['addr:city'], tags['addr:state'], tags['addr:country']].filter(Boolean);
  const mapUrl = lat && lon ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}` : '';
  return {
    name: tags.name || tags.brand || 'Restaurante',
    cuisine: tags.cuisine ? tags.cuisine.replace(/;/g, ', ') : '',
    category: 'resultado público',
    priceBand: '',
    profile: 'Resultado público complementar.',
    address: addressParts.join(', ') || tags['contact:address'] || '',
    city: tags['addr:city'] || '',
    state: tags['addr:state'] || '',
    country: tags['addr:country'] || '',
    lat,
    lon,
    mapUrl,
    url: mapUrl,
    tier: 'public',
    source: 'public',
    featured: false,
    tags: []
  };
}

function dedupeAgainstOwn(ownResults, externalResults) {
  const seen = new Set(ownResults.map(item => normalize(item.name)));
  return externalResults.filter(item => {
    const key = normalize(item.name);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 20);
}

async function fetchExternalRestaurants(term, location) {
  const center = await geocode(location);
  try {
    const query = buildOverpassQuery(center.lat, center.lon, term);
    const data = await fetchOverpass(query);
    const results = (data.elements || []).map(normalizeElement).filter(item => item.name !== 'Restaurante');
    if (results.length) return {location: center.displayName, results};
  } catch (overpassError) {
    console.error('[restaurants] overpass fallback:', overpassError.message);
  }
  const results = await fallbackNominatimRestaurants(term, location);
  return {location: center.displayName, results};
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (req.method !== 'GET') return res.status(405).json({error: 'Método não permitido'});

  const term = safeText(req.query.term || '', 70);
  const location = safeText(req.query.location || 'Brasília, DF, Brasil', 120);
  if (!location) return res.status(400).json({error: 'Informe uma cidade, estado ou país.'});

  const ownResults = searchOwnCatalog(term, location);
  let externalResults = [];
  let externalStatus = 'ok';
  let resolvedLocation = location;

  try {
    const external = await fetchExternalRestaurants(term, location);
    resolvedLocation = external.location || location;
    externalResults = dedupeAgainstOwn(ownResults, external.results || []);
  } catch (error) {
    externalStatus = 'degraded';
    console.error('[restaurants] external layer degraded:', error && error.message ? error.message : error);
  }

  const results = [...ownResults, ...externalResults];
  return res.status(200).json({
    source: ownResults.length ? 'Voz News + OpenStreetMap' : 'OpenStreetMap',
    location: resolvedLocation,
    results,
    ownCount: ownResults.length,
    externalCount: externalResults.length,
    externalStatus,
    catalogSize: restaurantCatalog.length
  });
};
