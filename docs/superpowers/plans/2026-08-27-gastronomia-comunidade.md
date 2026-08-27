# Voz News Gastronomia Comunidade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tornar `/gastronomia` mais visual, participativo e comercial, com avaliadores, sabores do Cerrado, envio de receitas/vídeos e busca que prioriza anunciantes.

**Architecture:** A página permanece HTML/CSS/JS estático na Vercel. `gastronomia/index.html` concentra a composição visual; `gastronomia/gastronomia.js` controla busca, ordenação comercial, cards e interações. O recebimento de conteúdo usa FormSubmit via formulário multipart, evitando introduzir banco de dados ou armazenamento próprio nesta etapa.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla, Vercel Functions já existentes, FormSubmit.

**Spec:** `docs/superpowers/specs/2026-08-27-gastronomia-comunidade-design.md`

## Global Constraints
- Preservar a identidade VOZ NEWS e o fundo escuro/dourado.
- Não remover a busca pública existente em `/api/restaurants`.
- Anunciantes devem aparecer antes de parceiros e resultados públicos.
- Conteúdo enviado pelo público nunca é publicado automaticamente.
- Fotos reais de Paulo Filho e Isabella só entram quando existirem arquivos identificados com segurança.

---

### Task 1: Reestruturar a home gastronômica

**Files:**
- Modify: `gastronomia/index.html`

**Interfaces:**
- Consumes: IDs já usados por `gastronomia.js`: `restaurant-search`, `search-term`, `search-location`, `search-results`, `featured-restaurants`.
- Produces: novas âncoras `#editores`, `#adolescentes`, `#cerrado`, `#videos`, `#comunidade` e formulário `community-form`.

- [ ] **Step 1:** preservar os IDs da busca atual.
- [ ] **Step 2:** adicionar Deijanete e Paulo no topo como painel editorial.
- [ ] **Step 3:** adicionar editoria adolescente com Paulo Filho e Isabella.
- [ ] **Step 4:** transformar sabores do Cerrado em cards fotográficos com breve história.
- [ ] **Step 5:** adicionar faixa visual de cozinha em ação e galerias animadas.
- [ ] **Step 6:** adicionar seção Você na Cozinha com formulário multipart, autorização e alternativa por link.
- [ ] **Step 7:** validar HTML por inspeção estrutural e responsividade CSS.

### Task 2: Priorizar anunciantes na busca

**Files:**
- Modify: `gastronomia/gastronomia.js`

**Interfaces:**
- Consumes: `/api/restaurants?term=&location=`.
- Produces: `directory` com campo `tier` (`sponsored`, `partner`, `editorial`) e renderização ordenada.

- [ ] **Step 1:** adicionar metadados comerciais aos restaurantes locais.
- [ ] **Step 2:** ordenar locais por prioridade comercial antes de resultados externos.
- [ ] **Step 3:** exibir selo `PATROCINADO`/`PARCEIRO` e CTA específico.
- [ ] **Step 4:** manter fallback da busca externa quando a API estiver indisponível.
- [ ] **Step 5:** verificar que links de anunciantes abrem o destino comercial configurado.

### Task 3: Padronizar comentários nas matérias existentes

**Files:**
- Modify: `gastronomia/materias/mane-mercado.html`
- Modify: `gastronomia/materias/pastelaria-vicosa.html`
- Modify: `gastronomia/materias/renata-la-porta.html`
- Modify: `gastronomia/materias/sabores-brasilia-cerrado.html`

**Interfaces:**
- Produces: bloco visual `Opinião Voz News` em todas as matérias.

- [ ] **Step 1:** inserir comentário de Deijanete ou Paulo em cada matéria.
- [ ] **Step 2:** inserir pelo menos uma imagem adicional quando a matéria comportar.
- [ ] **Step 3:** adicionar CTA de retorno ao Guia Voz News Gastronomia.
- [ ] **Step 4:** verificar que os links relativos continuam válidos.

### Task 4: Verificação e publicação

**Files:**
- Verify: `gastronomia/index.html`
- Verify: `gastronomia/gastronomia.js`
- Verify: `gastronomia/materias/*.html`

- [ ] **Step 1:** confirmar que não há IDs duplicados críticos.
- [ ] **Step 2:** confirmar sintaxe JavaScript com `node --check` em cópia local ou inspeção equivalente.
- [ ] **Step 3:** publicar a branch e abrir/verificar preview Vercel.
- [ ] **Step 4:** promover/mesclar somente após confirmar o preview carregando e a busca funcionando.
