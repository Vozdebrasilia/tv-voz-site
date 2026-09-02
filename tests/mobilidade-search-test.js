const handler = require('../api/mobilidade-search');
const fetchedUrls = [];

global.fetch = async (url) => {
  const value = String(url);
  fetchedUrls.push(value);

  if (value.includes('nominatim.openstreetmap.org/search')) {
    return {
      ok: true,
      json: async () => [{
        place_id: 10,
        display_name: 'Brasília, Distrito Federal, Região Centro-Oeste, Brasil',
        lat: '-15.7934036',
        lon: '-47.8823172',
        type: 'city',
        addresstype: 'city',
        address: {city:'Brasília', state:'Distrito Federal', country:'Brasil'}
      }]
    };
  }

  if (value.includes('overpass')) {
    return {
      ok: true,
      json: async () => ({
        elements: [{
          type: 'node', id: 20, lat: -15.794, lon: -47.89,
          tags: {
            name: 'Localiza',
            amenity: 'car_rental',
            'addr:city': 'Brasília',
            'addr:state': 'Distrito Federal',
            'addr:country': 'BR',
            'contact:website': 'https://www.localiza.com/',
            'contact:phone': '+55 61 0000-0000'
          }
        }]
      })
    };
  }

  throw new Error(`URL inesperada: ${value}`);
};

const req = {method:'GET', query:{term:'Localiza', location:'Brasília, DF, Brasil', vehicle:'SUV', service:'aluguel', category:'locadora'}};
const res = {
  headers:{}, statusCode:200, payload:null,
  setHeader(k,v){this.headers[k]=v},
  status(code){this.statusCode=code; return this},
  json(value){this.payload=value; return this}
};

(async()=>{
  await handler(req,res);
  if(res.statusCode!==200) throw new Error('status inesperado');
  if(fetchedUrls.length < 2) throw new Error('busca deve geocodificar e depois pesquisar na área');
  if(!fetchedUrls[0].includes('Bras')) throw new Error('localização não foi geocodificada primeiro');
  const overpassUrl = fetchedUrls.find(url => url.includes('overpass')) || '';
  const decoded = decodeURIComponent(overpassUrl);
  if(!decoded.includes('around:35000,-15.7934036,-47.8823172')) throw new Error('pesquisa não ficou ancorada em Brasília');
  if(!decoded.includes('Localiza')) throw new Error('empresa não entrou no filtro da área');
  if(!res.payload.results[0] || res.payload.results[0].name !== 'Localiza') throw new Error('resultado não normalizado');
  if(res.payload.results[0].city !== 'Brasília') throw new Error('resultado não preservou a cidade pesquisada');
  console.log('Mobilidade API: localização ancorada e resultado normalizado OK');
})().catch(e=>{console.error(e); process.exit(1)});
