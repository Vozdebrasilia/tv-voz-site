# Guia Voz News Gastronomia Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar busca gastronômica híbrida e resiliente com índice próprio Brasil/Mundo, complementação pública e Renata La Porta em destaque editorial.

**Architecture:** Um catálogo JSON versionado fornece resultados imediatos e independentes de terceiros. A API `/api/restaurants` consulta esse catálogo antes de Nominatim/Photon/Overpass e combina/deduplica os resultados. O cliente exibe resultados próprios imediatamente, filtros e atalhos, mantendo os resultados se a camada pública falhar.

**Tech Stack:** HTML/CSS/JavaScript sem framework, Vercel Functions Node.js, JSON versionado, OpenStreetMap/Nominatim/Photon/Overpass, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-27-guia-voznews-gastronomia-design.md`

## Global Constraints
- Não copiar banco de dados, textos, estrelas ou classificações proprietárias do Guia Quatro Rodas.
- Anunciantes compatíveis aparecem antes de parceiros, editoriais e resultados públicos.
- Resultados próprios permanecem visíveis quando serviços externos falham.
- Renata La Porta: título exato “Autoridade em Gastronomia e Eventos”.
- `/gastronomia` e `/gastronomia/` precisam carregar a mesma experiência.
- Preservar os 40 portais Voz News.

---

### Task 1: Índice próprio Brasil e Mundo

**Files:**
- Create: `gastronomia/data/restaurants.json`
- Modify: `tests/gastronomia-portal-test.js`

**Interfaces:**
- Produces: array JSON de restaurantes com `id,name,city,state,country,cuisine,category,priceBand,profile,address,url,tier,source,featured,tags`.

- [ ] **Step 1: Write the failing test**

Adicionar ao teste validações de existência do catálogo, pelo menos 60 registros, cobertura Brasil + exterior, todas as cidades obrigatórias e campos essenciais.

```js
const catalog = JSON.parse(read('gastronomia/data/restaurants.json'));
must(Array.isArray(catalog) && catalog.length >= 60, 'catálogo gastronômico insuficiente');
for (const city of ['Brasília','São Paulo','Rio de Janeiro','Salvador','Recife','Curitiba','Nova York','Miami','Paris','Lisboa','Roma','Londres','Madri','Buenos Aires','Tóquio','Dubai']) {
  must(catalog.some(r => r.city === city), `cidade ausente no catálogo: ${city}`);
}
```

- [ ] **Step 2: Verify test fails** — `node tests/gastronomia-portal-test.js`.
- [ ] **Step 3: Create catalog** com registros reais e conservadores, sem inventar notas ou estrelas.
- [ ] **Step 4: Verify test passes for catalog**.
- [ ] **Step 5: Commit** `feat: add Brazil and world gastronomy catalog`.

### Task 2: API híbrida e tolerante a falhas

**Files:**
- Modify: `api/restaurants.js`
- Modify: `tests/gastronomia-portal-test.js`

**Interfaces:**
- Consumes: `gastronomia/data/restaurants.json`.
- Produces: `GET /api/restaurants?term=<string>&location=<string>` -> `{source, location, results, ownCount, externalCount, externalStatus}`.

- [ ] **Step 1: Add failing contract tests** para catálogo próprio e status externo.
- [ ] **Step 2: Verify failure**.
- [ ] **Step 3: Implement local search** com normalização, localização e prioridade `sponsored < partner < editorial`.
- [ ] **Step 4: Make external layer optional**, mantendo HTTP 200 e resultados próprios em timeout.
- [ ] **Step 5: Verify** `node --check api/restaurants.js && node tests/gastronomia-portal-test.js`.
- [ ] **Step 6: Commit** `feat: make restaurant search hybrid and resilient`.

### Task 3: Busca e guia no front-end

**Files:**
- Modify: `gastronomia/gastronomia.js`
- Modify: `gastronomia/index.html`
- Modify: `tests/gastronomia-portal-test.js`

**Interfaces:**
- Consumes API fields `results,ownCount,externalCount,externalStatus`.
- Produces UI com busca, filtros rápidos e badges de origem.

- [ ] **Step 1: Add failing UI tests** para destinos Brasil/Mundo, Renata e degradação externa.
- [ ] **Step 2: Verify failure**.
- [ ] **Step 3: Replace duplicated client directory with API-driven search**.
- [ ] **Step 4: Add destination shortcuts and filters**.
- [ ] **Step 5: Add Renata La Porta authority block** com atuação desde 1998 e reconhecimento 2026.
- [ ] **Step 6: Verify** `node --check gastronomia/gastronomia.js && node tests/gastronomia-portal-test.js`.
- [ ] **Step 7: Commit** `feat: turn gastronomy search into Voz News guide`.

### Task 4: Integração, CI e produção

- [ ] **Step 1: Run acceptance checks**.
- [ ] **Step 2: Open PR and require** `Gastronomia Portal = success` e `Proteção dos 40 Portais VOZ NEWS = success`.
- [ ] **Step 3: Merge with squash** `Gastronomia: guia Brasil e Mundo com busca híbrida`.
- [ ] **Step 4: Verify Vercel production `READY`**.
- [ ] **Step 5: Test live endpoints** em Brasília, São Paulo e Paris.
- [ ] **Step 6: Confirm `/gastronomia`, `/gastronomia/` e `/gastronomia.js` HTTP 200**.
