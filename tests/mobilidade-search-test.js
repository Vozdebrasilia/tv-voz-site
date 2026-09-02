const handler = require('../api/mobilidade-search');
let fetchedUrl = '';
global.fetch = async (url) => {
  fetchedUrl = String(url);
  return {
    ok: true,
    json: async () => [{
      place_id: 1,
      name: 'Localiza Rent a Car',
      display_name: 'Brasília, Distrito Federal, Brasil',
      lat: '-15.79',
      lon: '-47.88',
      address: {city:'Brasília', state:'Distrito Federal', country:'Brasil'},
      extratags: {'contact:website':'https://www.localiza.com/', phone:'+55 61 0000-0000'}
    }]
  };
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
  if(!fetchedUrl.includes('Localiza')) throw new Error('empresa não entrou na consulta');
  if(!fetchedUrl.includes('Bras')) throw new Error('localização não entrou na consulta');
  if(!res.payload.results[0].name.includes('Localiza')) throw new Error('resultado não normalizado');
  console.log('Mobilidade API: busca normalizada OK');
})().catch(e=>{console.error(e); process.exit(1)});
