const handler = require('../api/mobilidade-search');
const fetchedUrls = [];

global.fetch = async (url) => {
  const value = String(url);
  fetchedUrls.push(value);

  if (value.includes('nominatim.openstreetmap.org/search') && !value.includes('bounded=1')) {
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

  if (value.includes('nominatim.openstreetmap.org/search') && value.includes('bounded=1')) {
    return {
      ok: true,
      json: async () => [{
        place_id: 20,
        name: 'Localiza',
        display_name: 'Localiza, Asa Norte, Brasília, Distrito Federal, Brasil',
        lat: '-15.7800',
        lon: '-47.8900',
        type: 'car_rental',
        category: 'amenity',
        address: {city:'Brasília', state:'Distrito Federal', country:'Brasil'},
        extratags: {'contact:website':'https://www.localiza.com/', 'contact:phone':'+55 61 0000-0000'}
      }]
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
  if(fetchedUrls.length !== 2) throw new Error(`esperadas 2 consultas Nominatim, recebidas ${fetchedUrls.length}`);
  if(!fetchedUrls[0].includes('Bras')) throw new Error('localização não foi geocodificada primeiro');
  const localUrl = fetchedUrls[1];
  if(!localUrl.includes('bounded=1')) throw new Error('segunda consulta não está limitada à área geográfica');
  if(!localUrl.includes('viewbox=')) throw new Error('segunda consulta não recebeu viewbox da cidade');
  if(!decodeURIComponent(localUrl).includes('q=Localiza')) throw new Error('empresa não entrou na consulta local');
  if(decodeURIComponent(localUrl).includes('SUV') || decodeURIComponent(localUrl).includes('aluguel')) throw new Error('filtros de intenção não devem tornar a busca por empresa excessivamente restritiva');
  if(res.payload.externalStatus !== 'ok') throw new Error('busca local deve concluir sem degradação');
  if(!res.payload.results[0] || res.payload.results[0].name !== 'Localiza') throw new Error('resultado não normalizado');
  if(res.payload.results[0].city !== 'Brasília') throw new Error('resultado não preservou a cidade pesquisada');
  console.log('Mobilidade API: busca local rápida, limitada e normalizada OK');
})().catch(e=>{console.error(e); process.exit(1)});
