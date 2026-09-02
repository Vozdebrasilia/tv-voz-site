# VOZ NEWS Mobilidade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar `/mobilidade` em uma vertical funcional de mobilidade com foco inicial em locadoras e pesquisa mundial por empresa, localização, tipo de veículo, serviço e categoria.

**Architecture:** Manter a página estática atual em `mobilidade/index.html`, acrescentando uma interface de pesquisa que consulta um endpoint serverless `api/mobilidade-search.js`. O endpoint normaliza filtros, consulta uma fonte pública global (OpenStreetMap/Nominatim, com dados estruturados e sem chave exposta) e devolve cards padronizados; a página mantém atalhos editoriais de grandes locadoras sem afirmar parceria. O `vercel.json` passa a garantir `/mobilidade` e `/mobilidade/` apontando para o mesmo `index.html`.

**Tech Stack:** HTML/CSS/JavaScript, Vercel Serverless Functions (Node.js/CommonJS), OpenStreetMap/Nominatim, GitHub Actions, Node.js 20.

**Spec:** `docs/superpowers/specs/2026-09-02-voz-news-mobilidade-design.md`

## Global Constraints

- Manter o cabeçalho visual atual da vertical Mobilidade e não alterar os demais portais.
- Manter a URL principal em `/mobilidade`.
- Atualizar a métrica para **240K+ seguidores**.
- A pesquisa não pode depender de cadastro manual de empresas.
- Permitir pesquisa por empresa, cidade/estado/país, tipo de veículo, serviço e categoria.
- Permitir consultas em Brasília, em qualquer cidade do Brasil e no exterior.
- Não afirmar parceria para empresas que não sejam parceiras confirmadas.
- Busca deve funcionar em desktop e celular.
- Não armazenar dados pessoais do usuário.
- Erros da fonte externa não podem derrubar a página.

---

### Task 1: Contratos de teste da nova experiência

**Files:**
- Modify: `tests/mobilidade-links-test.js`
- Create: `tests/mobilidade-search-test.js`

**Interfaces:**
- Consumes: `mobilidade/index.html` e futuro `api/mobilidade-search.js`.
- Produces: contrato automatizado para métrica 240K+, controles da busca, locadoras iniciais e resposta normalizada do endpoint.

- [ ] **Step 1: Atualizar o teste estático para a nova métrica e UI**

```js
const fs = require('fs');
const html = fs.readFileSync('mobilidade/index.html','utf8');
const must=(c,m)=>{if(!c) throw new Error(m)};
['240K+','200M+','1.000+','10.000+','40 anos'].forEach(v=>must(html.includes(v),`métrica ausente: ${v}`));
['mobility-search','search-term','search-location','search-vehicle','search-service','search-category','search-results'].forEach(v=>must(html.includes(v),`controle de pesquisa ausente: ${v}`));
['Localiza','Movida','Unidas','Foco','Avis','Hertz','Europcar','Sixt','Enterprise'].forEach(v=>must(html.includes(v),`locadora inicial ausente: ${v}`));
must(html.includes('/api/mobilidade-search'),'endpoint de pesquisa não conectado');
must(fs.existsSync('api/mobilidade-search.js'),'endpoint de pesquisa ausente');
must(fs.existsSync('mobilidade/tema.html'),'página temática ausente');
console.log('Mobilidade: estrutura, pesquisa e números OK');
```

- [ ] **Step 2: Criar teste comportamental do endpoint com `fetch` simulado**

```js
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
```

- [ ] **Step 3: Rodar testes e confirmar falha antes da implementação**

Run: `node tests/mobilidade-links-test.js && node tests/mobilidade-search-test.js`
Expected: FAIL porque a página ainda contém `230K+` e `api/mobilidade-search.js` ainda não existe.

- [ ] **Step 4: Commit dos testes**

```bash
git add tests/mobilidade-links-test.js tests/mobilidade-search-test.js
git commit -m "test: definir busca global de mobilidade"
```

---

### Task 2: Endpoint serverless de pesquisa mundial

**Files:**
- Create: `api/mobilidade-search.js`
- Test: `tests/mobilidade-search-test.js`

**Interfaces:**
- Consumes: query params `term`, `location`, `vehicle`, `service`, `category`.
- Produces: JSON `{query, source, results, externalStatus}`; cada resultado possui `name`, `category`, `address`, `city`, `state`, `country`, `phone`, `site`, `lat`, `lon`, `mapUrl`, `source`.

- [ ] **Step 1: Implementar sanitização e montagem da consulta**

```js
const NOMINATIM = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'VozNewsBrasil-Mobilidade/1.0 (https://www.voznewsbrasil.com.br/)';

function safeText(value, max = 100) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g,' ').trim().slice(0,max);
}

function buildQuery({term, location, vehicle, service, category}) {
  return [safeText(term,70), safeText(service,50), safeText(vehicle,50), safeText(category,50), safeText(location,120)]
    .filter(Boolean).join(' ');
}
```

- [ ] **Step 2: Implementar consulta externa com timeout e cache HTTP**

```js
async function fetchJson(url, timeoutMs = 5500) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {signal: controller.signal, headers:{'User-Agent':USER_AGENT,'Accept-Language':'pt-BR,pt;q=0.9,en;q=0.7'}});
    if(!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally { clearTimeout(timer); }
}
```

- [ ] **Step 3: Normalizar dados do estabelecimento**

```js
function normalizePlace(item) {
  const a = item.address || {};
  const x = item.extratags || {};
  const lat = Number(item.lat), lon = Number(item.lon);
  return {
    name: item.name || (item.display_name || '').split(',')[0] || 'Empresa de mobilidade',
    category: [item.type, item.category].filter(Boolean).join(' • '),
    address: item.display_name || '',
    city: a.city || a.town || a.village || '',
    state: a.state || '',
    country: a.country || '',
    phone: x.phone || x['contact:phone'] || '',
    site: x.website || x['contact:website'] || '',
    lat, lon,
    mapUrl: Number.isFinite(lat) && Number.isFinite(lon) ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}` : '',
    source: 'OpenStreetMap'
  };
}
```

- [ ] **Step 4: Implementar handler GET e degradação segura**

```js
module.exports = async function handler(req,res){
  res.setHeader('Cache-Control','s-maxage=600, stale-while-revalidate=3600');
  res.setHeader('Content-Type','application/json; charset=utf-8');
  if(req.method!=='GET') return res.status(405).json({error:'Método não permitido'});
  const fields = {
    term:safeText(req.query.term,70), location:safeText(req.query.location,120),
    vehicle:safeText(req.query.vehicle,50), service:safeText(req.query.service,50), category:safeText(req.query.category,50)
  };
  const query = buildQuery(fields);
  if(!query) return res.status(400).json({error:'Informe uma empresa, localização ou filtro de mobilidade.'});
  try {
    const url = `${NOMINATIM}?format=jsonv2&addressdetails=1&extratags=1&namedetails=1&limit=25&q=${encodeURIComponent(query)}`;
    const data = await fetchJson(url);
    return res.status(200).json({query, source:'OpenStreetMap', results:(Array.isArray(data)?data:[]).map(normalizePlace), externalStatus:'ok'});
  } catch(error) {
    console.error('[mobilidade-search]', error && error.message ? error.message : error);
    return res.status(200).json({query, source:'OpenStreetMap', results:[], externalStatus:'degraded'});
  }
};
```

- [ ] **Step 5: Rodar teste comportamental**

Run: `node tests/mobilidade-search-test.js`
Expected: PASS e saída `Mobilidade API: busca normalizada OK`.

- [ ] **Step 6: Commit do endpoint**

```bash
git add api/mobilidade-search.js tests/mobilidade-search-test.js
git commit -m "feat: adicionar busca mundial de mobilidade"
```

---

### Task 3: Interface de pesquisa e foco inicial em locadoras

**Files:**
- Modify: `mobilidade/index.html`
- Test: `tests/mobilidade-links-test.js`

**Interfaces:**
- Consumes: `GET /api/mobilidade-search?term=&location=&vehicle=&service=&category=`.
- Produces: formulário `#mobility-search`, contêiner `#search-results`, cards externos e atalhos de locadoras.

- [ ] **Step 1: Atualizar métrica institucional**

Trocar `230K+` por `240K+` sem alterar as demais métricas.

- [ ] **Step 2: Inserir bloco de pesquisa após as métricas**

```html
<section class="section search-shell" id="pesquisa">
  <div class="container">
    <div class="section-head"><span class="eyebrow">PESQUISA MUNDIAL</span><h2>Encontre mobilidade em Brasília, no Brasil ou no mundo.</h2></div>
    <form id="mobility-search" class="mobility-search">
      <input id="search-term" name="term" placeholder="Empresa ou palavra-chave — ex.: Localiza" />
      <input id="search-location" name="location" placeholder="Cidade, estado ou país" value="Brasília, DF, Brasil" />
      <select id="search-vehicle" name="vehicle"><option value="">Tipo de veículo</option><option>SUV</option><option>hatch</option><option>sedã</option><option>van</option><option>picape</option><option>moto</option><option>caminhão</option><option>ônibus</option><option>elétrico</option><option>luxo</option></select>
      <select id="search-service" name="service"><option value="">Serviço</option><option>aluguel</option><option>assinatura</option><option>compra</option><option>venda</option><option>manutenção</option><option>transporte</option></select>
      <select id="search-category" name="category"><option value="">Categoria</option><option>locadora</option><option>montadora</option><option>concessionária</option><option>seminovos</option><option>oficina</option><option>náutica</option><option>aviação</option></select>
      <button type="submit">PESQUISAR</button>
    </form>
    <div class="quick-searches" aria-label="Pesquisas rápidas"></div>
    <div id="search-results" class="search-results" aria-live="polite"></div>
  </div>
</section>
```

- [ ] **Step 3: Inserir seção editorial de locadoras**

Exibir, como atalhos de pesquisa e sem selo de parceria: `Localiza`, `Movida`, `Unidas`, `Foco`, `Avis`, `Hertz`, `Europcar`, `Sixt`, `Enterprise`, além de categorias aeroporto, SUV, van, luxo e elétricos.

- [ ] **Step 4: Implementar JavaScript da busca**

```js
const form = document.getElementById('mobility-search');
const results = document.getElementById('search-results');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const params = new URLSearchParams(new FormData(form));
  results.innerHTML = '<div class="search-status">Pesquisando empresas de mobilidade…</div>';
  try {
    const response = await fetch('/api/mobilidade-search?' + params.toString());
    const data = await response.json();
    if(!response.ok) throw new Error(data.error || 'Falha na pesquisa');
    if(data.externalStatus === 'degraded') {
      results.innerHTML = '<div class="search-status">A busca externa está temporariamente indisponível. Tente novamente em instantes.</div>';
      return;
    }
    if(!data.results.length) {
      results.innerHTML = '<div class="search-status">Nenhuma empresa encontrada. Amplie a localização ou remova um dos filtros.</div>';
      return;
    }
    results.innerHTML = data.results.map(renderMobilityResult).join('');
  } catch(error) {
    results.innerHTML = `<div class="search-status">${escapeHtml(error.message || 'Não foi possível pesquisar agora.')}</div>`;
  }
});
```

- [ ] **Step 5: Implementar pesquisas rápidas**

Os chips `Aluguel de SUV em Brasília`, `Locadora de van em Goiânia`, `Carro de luxo em Miami` e `Veículo elétrico em São Paulo` devem preencher filtros e disparar o formulário.

- [ ] **Step 6: Rodar teste da página**

Run: `node tests/mobilidade-links-test.js`
Expected: PASS e saída `Mobilidade: estrutura, pesquisa e números OK`.

- [ ] **Step 7: Commit da interface**

```bash
git add mobilidade/index.html tests/mobilidade-links-test.js
git commit -m "feat: criar pesquisa e vitrine de locadoras em mobilidade"
```

---

### Task 4: Rota pública, integração e validação

**Files:**
- Modify: `vercel.json`
- Test: `.github/workflows/mobilidade-links.yml`

**Interfaces:**
- Consumes: `mobilidade/index.html`, `api/mobilidade-search.js`.
- Produces: `/mobilidade` e `/mobilidade/` servindo a mesma página em produção.

- [ ] **Step 1: Adicionar rewrites explícitos**

```json
{ "source": "/mobilidade", "destination": "/mobilidade/index.html" },
{ "source": "/mobilidade/", "destination": "/mobilidade/index.html" }
```

- [ ] **Step 2: Rodar suíte local da vertical**

Run: `node tests/mobilidade-links-test.js && node tests/mobilidade-search-test.js`
Expected: ambos PASS.

- [ ] **Step 3: Commit da rota**

```bash
git add vercel.json
git commit -m "chore: publicar rota principal de mobilidade"
```

- [ ] **Step 4: Abrir PR e aguardar GitHub Actions**

A workflow `Mobilidade Funcional` deve executar `node tests/mobilidade-links-test.js`; complementar a verificação conferindo também `node tests/mobilidade-search-test.js` na workflow se necessário.
Expected: checks verdes.

- [ ] **Step 5: Merge e validar produção no Vercel**

Verificar:
- `/mobilidade` responde sem erro;
- a página mostra `240K+`;
- o formulário está visível em desktop/mobile;
- uma busca por `locadora`, `Brasília, DF, Brasil` retorna resultados ou degrada de forma controlada;
- uma consulta internacional forma a URL correta e não quebra a página.

- [ ] **Step 6: Verificação final antes de declarar conclusão**

Executar os checks de produção e registrar qualquer limitação da fonte pública; não afirmar cobertura integral de todas as empresas do mundo, mas confirmar pesquisa mundial pela fonte externa disponível.
