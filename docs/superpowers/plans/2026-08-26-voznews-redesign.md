# VOZ NEWS Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganizar a home do VOZ NEWS Brasil e a home do VOZ NEWS Energia com hierarquia editorial internacional, mantendo conteúdo e URLs existentes.

**Architecture:** Criar `home.html` como nova home editorial e apontar apenas a rota `/` para ela. Atualizar `energia/home.html`, que já funciona como shell público de `/energia`, mantendo `energia/index.html` como fonte de conteúdo. Preservar o restante do ecossistema.

**Tech Stack:** HTML, CSS, JavaScript, Vercel rewrites, GitHub.

**Spec:** `docs/superpowers/specs/2026-08-26-voznews-redesign-design.md`

## Global Constraints
- Não apagar `index.html` nem `energia/index.html`.
- Não alterar avatares, D-ID ou assets V33.
- Preservar todas as rewrites existentes em `vercel.json`.
- Exibir “230 mil+ seguidores” na home institucional.
- Manter responsividade mobile.

---

### Task 1: Definir testes de regressão do redesign

**Files:**
- Create: `tests/voznews-redesign-test.js`

**Interfaces:**
- Consumes: arquivos HTML e `vercel.json` do repositório.
- Produces: validações estáticas para rota raiz, preservação de Energia e métricas.

- [ ] **Step 1: Write the failing test**

Criar teste Node que exige `home.html`, valida 230 mil+, editorias principais, link para `/energia`, e exige que `vercel.json` reescreva `/` para `/home.html` sem remover `/energia`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/voznews-redesign-test.js`
Expected: FAIL porque `home.html` e a rewrite da raiz ainda não existem.

- [ ] **Step 3: Commit**

Commit: `test: define Voz News redesign regression checks`

### Task 2: Implementar nova home editorial

**Files:**
- Create: `home.html`

**Interfaces:**
- Produces: página pública da raiz com navegação editorial, métricas, seções temáticas e acesso ao acervo.

- [ ] **Step 1: Implement minimal page to satisfy the failing checks**

Criar HTML sem dependências de build, com header, hero editorial, barra de editorias, bloco de métricas, seções Brasília, Política, Negócios, Saúde, Turismo, Entrevistas, Energia, institucional e acervo.

- [ ] **Step 2: Run static checks**

Run: `node tests/voznews-redesign-test.js`
Expected: ainda FAIL apenas na rewrite `/` até Task 4.

- [ ] **Step 3: Commit**

Commit: `feat: add international editorial home`

### Task 3: Reorganizar VOZ NEWS Energia

**Files:**
- Modify: `energia/home.html`

**Interfaces:**
- Consumes: `/energia/index.html`.
- Produces: shell editorial setorial que injeta o conteúdo legado após a nova capa.

- [ ] **Step 1: Preserve loader behavior**

Manter fetch de `/energia/index.html` e clonagem do conteúdo a partir de `#petrobras`.

- [ ] **Step 2: Improve header and editorial hierarchy**

Adicionar navegação setorial, manchete, métricas 230 mil+/200 milhões+/1000+/10000+, cards de temas e CTA para entrevistas.

- [ ] **Step 3: Commit**

Commit: `feat: reorganize Voz News Energia homepage`

### Task 4: Ativar nova home na Vercel

**Files:**
- Modify: `vercel.json`

**Interfaces:**
- Produces: rewrite `/` → `/home.html`, mantendo todas as rewrites existentes.

- [ ] **Step 1: Add root rewrite**

Inserir `{ "source": "/", "destination": "/home.html" }` como primeira rewrite.

- [ ] **Step 2: Run full static check**

Run: `node tests/voznews-redesign-test.js`
Expected: PASS.

- [ ] **Step 3: Commit**

Commit: `feat: publish redesigned Voz News home`

### Task 5: Verificar publicação

- [ ] **Step 1:** Confirmar deployment READY na Vercel.
- [ ] **Step 2:** Conferir `/` e `/energia` em produção.
- [ ] **Step 3:** Confirmar que `/index.html` e `/energia/index.html` continuam acessíveis e que as rewrites especializadas permanecem intactas.
