const assert = require('assert');

const calls = [];
global.fetch = async function(url) {
  const value = String(url);
  calls.push(value);

  if (value.startsWith('https://nominatim.openstreetmap.org/search') && value.includes('limit=1')) {
    return {
      ok: true,
      json: async () => [{lat:'-15.793889', lon:'-47.882778', display_name:'Brasília, DF, Brasil'}]
    };
  }

  if (value.includes('overpass')) {
    const query = decodeURIComponent(new URL(value).searchParams.get('data') || '');
    assert(query.includes('fast_food'), 'consulta de hambúrguer precisa incluir fast_food');
    assert(/burger|hamburger/i.test(query), 'consulta de hambúrguer precisa usar sinônimos em inglês');
    return {
      ok: true,
      json: async () => ({
        elements: Array.from({length: 12}, (_, index) => ({
          type: 'node',
          id: index + 1,
          lat: -15.79 + index * 0.001,
          lon: -47.88,
          tags: {
            name: `Hamburgueria Teste ${index + 1}`,
            amenity: 'fast_food',
            cuisine: 'burger',
            'addr:city': 'Brasília'
          }
        }))
      })
    };
  }

  if (value.startsWith('https://photon.komoot.io/api/')) {
    return {ok:true,json:async()=>({features:[]})};
  }

  throw new Error(`fetch inesperado: ${value}`);
};

const handler = require('../api/restaurants.js');

function makeResponse(){
  return {
    statusCode: 200,
    payload: null,
    headers: {},
    setHeader(name,value){ this.headers[name]=value; },
    status(code){ this.statusCode=code; return this; },
    json(payload){ this.payload=payload; return this; }
  };
}

(async () => {
  const res = makeResponse();
  await handler({method:'GET',query:{term:'hambúrguer',location:'Brasília, DF, Brasil'}},res);
  assert.strictEqual(res.statusCode,200,'API deve responder 200');
  assert(res.payload && Array.isArray(res.payload.results),'API deve retornar results');
  assert(res.payload.results.length >= 10,`esperados pelo menos 10 resultados, recebidos ${res.payload.results.length}`);
  assert(res.payload.externalCount >= 10,`camada pública deveria retornar pelo menos 10, recebeu ${res.payload.externalCount}`);
  console.log('restaurants-search-test: PASS');
})().catch(error => {
  console.error(error.stack || error);
  process.exit(1);
});
