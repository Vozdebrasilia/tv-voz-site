const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'VozNewsBrasil-Mobilidade/1.2 (https://www.voznewsbrasil.com.br/)';

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

async function geocodeLocation(location) {
  const q = safeText(location, 120);
  if (!q) return null;
  const url = `${NOMINATIM}?format=jsonv2&addressdetails=1&limit=1&q=${encodeURIComponent(q)}`;
  const data = await fetchJson(url, 4500);
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

function localSearchTerm(fields) {
  if (fields.term) return fields.term;
  const intent = `${fields.category} ${fields.service} ${fields.vehicle}`.toLowerCase();
  if (/locadora|aluguel|rental|assinatura|compartilhamento/.test(intent)) return 'car rental';
  if (/concession|seminovo|compra|venda|montadora/.test(intent)) return 'car dealer';
  if (/oficina|manuten/.test(intent)) return 'car repair';
  if (/moto/.test(intent)) return 'motorcycle';
  if (/bike|bici/.test(intent)) return 'bicycle';
  if (/n[aá]ut|barco|embarca/.test(intent)) return 'marina';
  if (/avia|aeronave|aeroporto/.test(intent)) return 'airport';
  if (/el[eé]tric/.test(intent)) return 'electric vehicle';
  return safeText([fields.category, fields.service, fields.vehicle].filter(Boolean).join(' '), 90) || 'mobility';
}

function buildViewbox(geo) {
  const latDelta = 0.35;
  const cos = Math.max(Math.cos((geo.lat * Math.PI) / 180), 0.35);
  const lonDelta = Math.min(0.65, latDelta / cos);
  const left = geo.lon - lonDelta;
  const top = geo.lat + latDelta;
  const right = geo.lon + lonDelta;
  const bottom = geo.lat - latDelta;
  return [left, top, right, bottom].map(value => value.toFixed(6)).join(',');
}

async function searchBounded(fields, geo) {
  const term = localSearchTerm(fields);
  const viewbox = buildViewbox(geo);
  const url = `${NOMINATIM}?format=jsonv2&addressdetails=1&extratags=1&namedetails=1&limit=30&bounded=1&viewbox=${encodeURIComponent(viewbox)}&q=${encodeURIComponent(term)}`;
  const data = await fetchJson(url, 5000);
  return Array.isArray(data) ? data : [];
}


const OVERPASS = 'https://overpass-api.de/api/interpreter';
function automotiveType(fields) {
  const words = [fields.category, fields.service, fields.term].filter(Boolean).join(' ').toLowerCase();
  if (/oficina|mec[aâ]nic|revis[aã]o|car.repair|manuten[cç][aã]o|bosch car service/.test(words)) return 'car_repair';
  if (/locadora|aluguel|rent.a.car|localiza|movida|unidas|foco rent|hertz|avis/.test(words)) return 'car_rental';
  if (/concession|seminov|revenda|carros|autom[oó]ve|ve[ií]culo|loja/.test(words)) return 'car';
  return '';
}
function overpassNameFilter(term) {
  const name = safeText(term, 50);
  if (!name || /^(oficina|mec[aâ]nica|revis[aã]o|loja|lojas|concession[aá]ria|concession[aá]rias|locadora|locadoras|carro|carros|autom[oó]veis|seminovos|aluguel|manuten[cç][aã]o)$/i.test(name)) return '';
  const escaped = name.replace(/[.*+?^$()|[\]{}\\]/g, '\\function websiteValue(extra) {').replace(/["\\]/g, '');
  return '["name"~"' + escaped + '",i]';
}
async function searchAutomotivePlaces(fields, geo) {
  const type = automotiveType(fields);
  if (!type) return null;
  const lat = Number(geo.lat), lon = Number(geo.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return [];
  const filter = type === 'car_rental' ? '["amenity"="car_rental"]' : '["shop"="' + type + '"]';
  const named = overpassNameFilter(fields.term);
  const q = '[out:json][timeout:9];nwr' + filter + named + '(around:22000,' + lat.toFixed(6) + ',' + lon.toFixed(6) + ');out center 75;';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 7500);
  try {
    const response = await fetch(OVERPASS, {
      method: 'POST',
      signal: controller.signal,
      headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8','User-Agent':USER_AGENT,'Accept':'application/json'},
      body: new URLSearchParams({data:q}).toString()
    });
    if (!response.ok) throw new Error('Overpass HTTP ' + response.status);
    const body = await response.json();
    if (!body || !Array.isArray(body.elements)) return [];
    const rows = body.elements.map(item => normalizeOverpassPlace(item, geo)).filter(Boolean);
    return dedupeResults(rows).slice(0,30);
  } finally {
    clearTimeout(timer);
  }
}
function normalizeOverpassPlace(item, geo) {
  const tags = item.tags || {};
  const name = safeText(tags.name || tags.brand || tags.operator || '', 100);
  if (!name) return null;
  const lat = Number(item.lat ?? (item.center && item.center.lat));
  const lon = Number(item.lon ?? (item.center && item.center.lon));
  const place = [tags['addr:street'],tags['addr:housenumber']].filter(Boolean).join(', ');
  const city = tags['addr:city'] || geo.address.city || geo.address.town || geo.address.municipality || '';
  const state = tags['addr:state'] || geo.address.state || '';
  const country = geo.address.country || 'Brasil';
  const mapUrl = Number.isFinite(lat) && Number.isFinite(lon) ? 'https://www.openstreetmap.org/?mlat=' + encodeURIComponent(lat) + '&mlon=' + encodeURIComponent(lon) + '#map=17/' + lat + '/' + lon : '';
  return {name,category:tags.shop === 'car_repair' ? 'Oficina mecânica' : tags.amenity === 'car_rental' ? 'Locadora de veículos' : 'Concessionária ou revenda',address:[place,city,state].filter(Boolean).join(' • ') || geo.displayName,city,state,country,phone:tags.phone || tags['contact:phone'] || '',site:websiteValue(tags),lat,lon,mapUrl,source:'OpenStreetMap'};
}

function websiteValue(extra) {
  const raw = extra.website || extra['contact:website'] || extra.url || '';
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^www\./i.test(raw)) return `https://${raw}`;
  return raw;
}

function normalizeNominatimPlace(item, geo) {
  const address = item.address || {};
  const extra = item.extratags || {};
  const lat = Number(item.lat);
  const lon = Number(item.lon);
  const city = address.city || address.town || address.village || address.municipality || geo.address.city || geo.address.town || geo.address.municipality || '';
  const state = address.state || geo.address.state || '';
  const country = address.country || geo.address.country || '';
  const mapUrl = Number.isFinite(lat) && Number.isFinite(lon)
    ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}`
    : '';

  return {
    name: item.name || (item.namedetails && (item.namedetails.name || item.namedetails['name:pt'])) || (item.display_name || '').split(',')[0] || 'Empresa de mobilidade',
    category: [item.type, item.category].filter(Boolean).join(' • ') || 'mobilidade',
    address: item.display_name || [city, state, country].filter(Boolean).join(' • '),
    city,
    state,
    country,
    phone: extra.phone || extra['contact:phone'] || '',
    site: websiteValue(extra),
    lat,
    lon,
    mapUrl,
    source: 'OpenStreetMap'
  };
}

function dedupeResults(results) {
  const seen = new Set();
  return results.filter(item => {
    const lat = Number.isFinite(Number(item.lat)) ? Number(item.lat).toFixed(5) : '';
    const lon = Number.isFinite(Number(item.lon)) ? Number(item.lon).toFixed(5) : '';
    const key = `${String(item.name).toLowerCase()}|${lat}|${lon}`;
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

    let results = [];
    let externalStatus = 'ok';
    const autoType = automotiveType(fields);
    if (autoType) {
      try {
        results = await searchAutomotivePlaces(fields, geo);
      } catch (e) {
        console.error('[automotive-overpass]', e && e.message ? e.message : e);
        externalStatus = 'degraded';
      }
      if (!results.length && fields.term && !/^(oficina|oficinas|locadora|locadoras|concession[aá]rias?|seminovos|lojas?)$/i.test(fields.term)) {
        try {
          const data = await searchBounded(fields, geo);
          results = dedupeResults(data.map(item => normalizeNominatimPlace(item, geo))).slice(0, 30);
        } catch (e) {
          externalStatus = 'degraded';
        }
      }
    } else {
      const data = await searchBounded(fields, geo);
      results = dedupeResults(data.map(item => normalizeNominatimPlace(item, geo))).slice(0, 30);
    }

    return res.status(200).json({
      query,
      resolvedLocation: geo.displayName,
      source: 'OpenStreetMap',
      results,
      externalStatus,
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
  localSearchTerm,
  buildViewbox,
  normalizeNominatimPlace,
  dedupeResults,
  automotiveType,
  overpassNameFilter,
  normalizeOverpassPlace
};
