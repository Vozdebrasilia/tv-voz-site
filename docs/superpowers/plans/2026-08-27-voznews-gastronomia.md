# Voz News Gastronomia Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar a vertical `/gastronomia/` com identidade Voz News, conteúdo gastronômico herdado do portal-mãe, análise editorial de Deijanete Fayad/Paulo Fayad, diretório e busca mundial de restaurantes, publicidade premium do Mané Mercado e matérias completas.

**Architecture:** A vertical será estática no front-end (`gastronomia/index.html`) com dados editoriais estruturados em JavaScript (`gastronomia/gastronomia.js`) e um endpoint serverless Vercel (`api/restaurants.js`) para busca ampliada por localidade via Nominatim + OpenStreetMap/Overpass. Matérias completas ficarão em `gastronomia/materias/`, preservando o site-mãe e expondo apenas um link para a nova vertical.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla, Node.js/Vercel serverless, OpenStreetMap Nominatim/Overpass.

**Spec:** `docs/superpowers/specs/2026-08-27-voznews-gastronomia-design.md`

## Global Constraints

- Preservar o restante do site-mãe e as demais verticais.
- Manter identidade azul-escuro/dourado do VOZ NEWS e responsividade mobile.
- Toda matéria gastronômica deve conter análise/comentário editorial identificado, com Deijanete Fayad predominante e Paulo Fayad em menor frequência.
- Conteúdo patrocinado deve ser claramente distinguível de conteúdo editorial.
- Mané Mercado deve aparecer como anúncio premium em Brasília.
- Busca deve permitir Brasília, Brasil e exterior.
- Links essenciais não podem apontar para `#`.

---

### Task 1: Contrato de aceitação da vertical

**Files:**
- Create: `tests/gastronomia-portal-test.js`

**Interfaces:**
- Consumes: caminhos e requisitos do spec.
- Produces: teste Node que falha enquanto a vertical, endpoint e matérias não existirem.

- [ ] **Step 1: Write the failing test** com assertivas para: arquivo principal, identidade Voz News, busca, seções Brasília/Brasil/Mundo, Mané Mercado, Renata La Porta, boxes Deijanete/Paulo, matérias herdadas Vasto/Coco Bambu/Mangai/Piselli/Rubaiyat/Kubitschek/Pastelaria Viçosa, endpoint `/api/restaurants.js` e ausência de `href="#"`.
- [ ] **Step 2: Run test to verify it fails** com `node tests/gastronomia-portal-test.js`; esperado: FAIL por arquivos ausentes.

### Task 2: Portal, diretório e experiência editorial

**Files:**
- Create: `gastronomia/index.html`
- Create: `gastronomia/gastronomia.js`

**Interfaces:**
- Consumes: `GET /api/restaurants?term=<string>&location=<string>`.
- Produces: formulário `#restaurant-search`, grade `#search-results`, cards editoriais e links de matérias.

- [ ] **Step 1: Implement minimal portal** com hero, métricas, navegação, diretório herdado, Sabores de Brasília e Cerrado, Personalidades, Brasil, Mundo, Eventos e Publicidade.
- [ ] **Step 2: Implement client search** priorizando diretório Voz News e consultando o endpoint para resultados externos.
- [ ] **Step 3: Run acceptance test**; esperado: ainda falha apenas por endpoint/matérias pendentes.

### Task 3: Busca mundial e matérias completas

**Files:**
- Create: `api/restaurants.js`
- Create: `gastronomia/materias/renata-la-porta.html`
- Create: `gastronomia/materias/sabores-brasilia-cerrado.html`
- Create: `gastronomia/materias/pastelaria-vicosa.html`
- Create: `gastronomia/materias/mane-mercado.html`

**Interfaces:**
- `GET /api/restaurants?term=&location=` retorna `{ results: [{name,cuisine,address,lat,lon,mapUrl}], source }`.
- Matérias retornam páginas HTML completas com análise editorial.

- [ ] **Step 1: Implement endpoint** geocodificando localidade no Nominatim e consultando Overpass em raio controlado, com timeout, normalização e fallback de erro JSON.
- [ ] **Step 2: Implement matérias** com conteúdo factual, autoria analítica claramente identificada e links de retorno.
- [ ] **Step 3: Run acceptance test**; esperado: PASS.

### Task 4: Integração, SEO e publicação

**Files:**
- Modify: `ecossistema-40-portais.js`
- Modify: `sitemap.xml`

**Interfaces:**
- Produces: link público `/gastronomia/` no ecossistema e URL indexável no sitemap.

- [ ] **Step 1: Write/extend regression assertions** para exigir o link `/gastronomia/` e URL no sitemap.
- [ ] **Step 2: Run test to verify it fails** antes das alterações de integração.
- [ ] **Step 3: Update integration files** preservando todos os demais portais.
- [ ] **Step 4: Run `node tests/gastronomia-portal-test.js`**; esperado: PASS.
- [ ] **Step 5: Validate JavaScript syntax** de `gastronomia/gastronomia.js` e `api/restaurants.js` com `node --check`.
- [ ] **Step 6: Create PR, review diff and merge** somente após verificação dos arquivos e testes.
