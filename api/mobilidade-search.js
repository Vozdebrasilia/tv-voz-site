const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter'
];
const USER_AGENT = 'VozNewsBrasil-Mobilidade/1.1 (https://www.voznewsbrasil.com.br/)';
const SEARCH_RADIUS_METERS = 35000;

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

function escapeOverpassRegex(value) {
  return safeText(value, 70)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function fetchJson(url, timeoutMs = 7000) {
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

async function geocodeLocation(location) {
  const q = safeText(location, 120);
  if (!q) return null;
  const url = `${NOMINATIM}?format=jsonv2&addressdetails=1&limit=1&q=${encodeURIComponent(q)}`;
  const data = await fetchJson(url, 5500);
  const first = Array.isArray(data) ? data[0] : null;
  if (!first) return null;
  const lat = Number(first.lat);
  const lon = Number(first.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return {
    lat,
    lon,
    displayName: first.display_name || q,
    type: first.addresstype || first.type || '',
    address: first.address || {}
  };
}

function genericSelectors(fields, around) {
  const intent = `${fields.category} ${fields.service} ${fields.vehicle}`.toLowerCase();
  const selectors = [];
  const add = selector => selectors.push(`nwr${selector}(${around});`);

  if (/locadora|aluguel|rental|assinatura|compartilhamento/.test(intent)) {
    add('["amenity"="car_rental"]');
    add('["amenity"="car_sharing"]');
  }
  if (/concession|seminovo|compra|venda|montadora|carro|suv|sed[aã]|hatch|picape|luxo|el[eé]tric/.test(intent)) {
    add('["shop"="car"]');
  }
  if (/moto/.test(intent)) add('["shop"="motorcycle"]');
  if (/bike|bici/.test(intent)) add('["shop"="bicycle"]');
  if (/oficina|manuten/.test(intent)) add('["shop"="car_repair"]');
  if (/n[aá]ut|barco|embarca/.test(intent)) {
    add('["shop"="boat"]');
    add('["leisure"="marina"]');
  }
  if (/avia|aeronave|aeroporto/.test(intent)) {
    add('["aeroway"="terminal"]');
    add('["aeroway"="aerodrome"]');
  }

  if (!selectors.length) {
    add('["amenity"="car_rental"]');
    add('["shop"="car"]');
    add('["shop"="motorcycle"]');
    add('["shop"="bicycle"]');
    add('["shop"="car_repair"]');
  }
  return selectors;
}

function buildOverpassQuery(fields, geo) {
  const around = `around:${SEARCH_RADIUS_METERS},${geo.lat},${geo.lon}`;
  const term = escapeOverpassRegex(fields.term);
  const selectors = term
    ? [
        `nwr["name"~"${term}",i](${around});`,
        `nwr["brand"~"${term}",i](${around});`,
        `nwr["operator"~"${term}",i](${around});`
      ]
    : genericSelectors(fields, around);
  return `[out:json][timeout:9];(${selectors.join('')});out center tags 50;`;
}

async function queryOverpass(query) {
  let lastError;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      return await fetchJson(`${endpoint}?data=${encodeURIComponent(query)}`, 9000);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('Overpass indisponível');
}

function websiteValue(tags) {
  const raw = tags.website || tags['contact:website'] || tags.url || '';
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^www\./i.test(raw)) return `https://${raw}`;
  return raw;
}

function normalizeOverpassPlace(item, geo) {
  const tags = item.tags || {};
  const center = item.center || {};
  const lat = Number(item.lat ?? center.lat);
  const lon = Number(item.lon ?? center.lon);
  const city = tags['addr:city'] || tags['addr:municipality'] || geo.address.city || geo.address.town || geo.address.municipality || '';
  const state = tags['addr:state'] || geo.address.state || '';
  const taggedCountry = tags['addr:country'] || '';
  const country = taggedCountry.length > 3 ? taggedCountry : (geo.address.country || taggedCountry || '');
  const street = [tags['addr:street'], tags['addr:housenumber']].filter(Boolean).join(', ');
  const address = [street, city, state, country].filter(Boolean).join(' • ') || geo.displayName;
  const category = [tags.amenity, tags.shop, tags.aeroway, tags.leisure, tags.office].filter(Boolean).join(' • ');
  const mapUrl = Number.isFinite(lat) && Number.isFinite(lon)
    ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}`
    : '';

  return {
    name: tags.name || tags.brand || tags.operator || 'Empresa de mobilidade',
    category: category || 'mobilidade',
    address,
    city,
    state,
    country,
    phone: tags.phone || tags['contact:phone'] || '',
    site: websiteValue(tags),
    lat,
    lon,
    mapUrl,
    source: 'OpenStreetMap'
  };
}

function dedupeResults(results) {
  const seen = new Set();
  return results.filter(item => {
    const key = `${String(item.name).toLowerCase()}|${Number(item.lat).toFixed(5)}|${Number(item.lon).toFixed(5)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
  if (!fields.location) {
    return res.status(400).json({error: 'Informe uma cidade, estado ou país para ancorar a pesquisa.'});
  }

  try {
    const geo = await geocodeLocation(fields.location);
    if (!geo) {
      return res.status(200).json({
        query,
        source: 'OpenStreetMap',
        results: [],
        externalStatus: 'ok',
        locationStatus: 'not_found'
      });
    }

    const overpassQuery = buildOverpassQuery(fields, geo);
    const data = await queryOverpass(overpassQuery);
    const elements = data && Array.isArray(data.elements) ? data.elements : [];
    const results = dedupeResults(elements.map(item => normalizeOverpassPlace(item, geo))).slice(0, 30);

    return res.status(200).json({
      query,
      resolvedLocation: geo.displayName,
      source: 'OpenStreetMap',
      results,
      externalStatus: 'ok',
      locationStatus: 'resolved'
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

module.exports._test = {
  safeText,
  buildQuery,
  escapeOverpassRegex,
  buildOverpassQuery,
  normalizeOverpassPlace,
  dedupeResults
};
