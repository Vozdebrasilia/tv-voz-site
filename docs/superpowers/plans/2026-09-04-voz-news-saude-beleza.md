# VOZ NEWS Saúde & Beleza Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar o novo vertical VOZ NEWS Saúde & Beleza com conteúdo editorial premium e arquitetura comercial explícita para marcas e agências.

**Architecture:** A primeira versão será estática, seguindo o padrão dos verticais existentes. O conteúdo principal ficará em `saude-beleza/index.html`; a integração com o portal-mãe será feita por rewrites em `vercel.json` e pelos `liveRoutes` do `ecossistema-40-portais.js`. A validação será feita por testes Node simples, preservando os 40 temas já protegidos.

**Tech Stack:** HTML5, CSS3, JavaScript vanilla, Vercel rewrites, testes Node.js 20.

**Spec:** `docs/superpowers/specs/2026-09-04-voz-news-saude-beleza-design.md`

## Global Constraints

- Usar exclusivamente as logomarcas oficiais já presentes no repositório, sem redesenho, alteração de proporção, cor, tipografia, símbolo ou composição.
- Rota pública: `/saude-beleza/`.
- Os slugs `saude-bem-estar` e `beleza` devem apontar para `/saude-beleza/`.
- Nenhum outro portal existente pode ser removido, renomeado ou redirecionado.
- Conteúdo patrocinado deve ser identificado de forma inequívoca.
- Não criar backend novo para a primeira versão.
- Métrica de seguidores deve usar `240K+`, consistente com o portal-mãe atual.

---

### Task 1: Especificar o contrato verificável do portal

**Files:**
- Create: `tests/saude-beleza-portal-test.js`
- Test: `tests/saude-beleza-portal-test.js`

**Interfaces:**
- Consumes: arquivos do novo vertical, `vercel.json` e `ecossistema-40-portais.js`.
- Produces: um teste único que falha se faltar rota, identidade, editoria, branded content, CTA ou integração com os dois slugs.

- [ ] **Step 1: Write the failing test**

```js
const fs=require('fs');
const path=require('path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const must=(c,m)=>{if(!c)throw new Error(m)};

must(exists('saude-beleza/index.html'),'saude-beleza/index.html ausente');
const html=read('saude-beleza/index.html');
const vercel=read('vercel.json');
const ecosystem=read('ecossistema-40-portais.js');

for(const token of ['VOZ NEWS','SAÚDE & BELEZA','240K+','Saúde','Estética','Dermatologia','Odontologia','Beleza','Bem-estar','Fitness','Inovação','BRANDED CONTENT','CONTEÚDO PATROCINADO','QUERO DESTACAR MINHA MARCA','CRIAR PROJETO DE CONTEÚDO','FALAR COM O COMERCIAL','AGÊNCIAS']) must(html.includes(token),`conteúdo obrigatório ausente: ${token}`);
must(html.includes('../logo-voznews-oficial.png'),'logo oficial não utilizada');
must(html.includes('https://www.voznewsbrasil.com.br/saude-beleza/'),'canonical ausente');
must(vercel.includes('"source": "/saude-beleza"'),'rewrite sem barra ausente');
must(vercel.includes('"source": "/saude-beleza/"'),'rewrite com barra ausente');
must(ecosystem.includes("'saude-bem-estar':'/saude-beleza/'"),'Saúde & Bem-estar não aponta para o vertical');
must(ecosystem.includes("'beleza':'/saude-beleza/'"),'Beleza não aponta para o vertical');
console.log('saude-beleza-portal-test: PASS');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/saude-beleza-portal-test.js`
Expected: FAIL com `saude-beleza/index.html ausente`.

- [ ] **Step 3: Commit the failing contract test**

```bash
git add tests/saude-beleza-portal-test.js
git commit -m "test: definir contrato do portal Saúde & Beleza"
```

### Task 2: Construir a página editorial e comercial

**Files:**
- Create: `saude-beleza/index.html`
- Test: `tests/saude-beleza-portal-test.js`

**Interfaces:**
- Consumes: `../logo-voznews-oficial.png` e padrões visuais dos verticais existentes.
- Produces: página responsiva com hero, métricas, oito editorias, conteúdo evergreen, marcas/especialistas, branded content, seção para agências e CTAs comerciais funcionais.

- [ ] **Step 1: Implement the minimal complete page**

Criar `saude-beleza/index.html` com:

```html
<link rel="canonical" href="https://www.voznewsbrasil.com.br/saude-beleza/">
<img src="../logo-voznews-oficial.png" alt="VOZ NEWS">
```

A página deve conter oito editorias; cards editoriais sem alegações factuais atuais não verificadas; um bloco `BRANDED CONTENT`; pelo menos um elemento rotulado `CONTEÚDO PATROCINADO`; seção `PARA AGÊNCIAS`; os três CTAs definidos no spec; modal de contato; busca/filtro local por texto e editoria; `prefers-reduced-motion`; e layout responsivo.

- [ ] **Step 2: Run the portal test**

Run: `node tests/saude-beleza-portal-test.js`
Expected: FAIL apenas nas integrações ainda não feitas em `vercel.json` e `ecossistema-40-portais.js`.

- [ ] **Step 3: Commit the page**

```bash
git add saude-beleza/index.html
git commit -m "feat: criar portal VOZ NEWS Saúde & Beleza"
```

### Task 3: Integrar rota e ecossistema de 40 portais

**Files:**
- Modify: `vercel.json`
- Modify: `ecossistema-40-portais.js`
- Test: `tests/saude-beleza-portal-test.js`
- Test: `tests/ecossistema-40-portais-lock-test.js`

**Interfaces:**
- Consumes: `/saude-beleza/index.html`.
- Produces: `/saude-beleza` e `/saude-beleza/` funcionando no Vercel; cards `saude-bem-estar` e `beleza` abrindo o novo vertical.

- [ ] **Step 1: Add Vercel rewrites**

Inserir antes das rewrites genéricas:

```json
{ "source": "/saude-beleza", "destination": "/saude-beleza/index.html" },
{ "source": "/saude-beleza/", "destination": "/saude-beleza/index.html" }
```

- [ ] **Step 2: Extend only liveRoutes**

No objeto `liveRoutes`, preservar todas as entradas atuais e acrescentar:

```js
'saude-bem-estar':'/saude-beleza/',
'beleza':'/saude-beleza/'
```

- [ ] **Step 3: Run both tests**

Run:

```bash
node tests/saude-beleza-portal-test.js
node tests/ecossistema-40-portais-lock-test.js
```

Expected: ambos PASS. Se o teste legado dos 40 portais já estiver falhando na base anterior à mudança, registrar a falha pré-existente e confirmar por diff que nenhum slug foi removido.

- [ ] **Step 4: Commit integration**

```bash
git add vercel.json ecossistema-40-portais.js
git commit -m "feat: integrar Saúde & Beleza aos 40 portais"
```

### Task 4: Verificar publicação e regressão

**Files:**
- Verify: `saude-beleza/index.html`
- Verify: `vercel.json`
- Verify: `ecossistema-40-portais.js`

**Interfaces:**
- Consumes: deploy da branch principal no Vercel.
- Produces: confirmação de que o portal público abre e de que os verticais existentes continuam acessíveis.

- [ ] **Step 1: Confirm repository state**

Run:

```bash
git diff HEAD~3..HEAD -- saude-beleza/index.html vercel.json ecossistema-40-portais.js tests/saude-beleza-portal-test.js
```

Expected: somente os arquivos previstos.

- [ ] **Step 2: Check public routes**

Verificar HTTP e conteúdo de:
- `https://www.voznewsbrasil.com.br/saude-beleza/`
- `https://www.voznewsbrasil.com.br/energia/`
- `https://www.voznewsbrasil.com.br/gastronomia/`
- `https://www.voznewsbrasil.com.br/mobilidade/`
- `https://www.voznewsbrasil.com.br/moveis-decoracao/`

Expected: todos carregam sem regressão; Saúde & Beleza contém `VOZ NEWS SAÚDE & BELEZA`.

- [ ] **Step 3: Visual/mobile verification**

Abrir o novo vertical em viewport desktop e mobile; verificar hero, oito editorias, branded content, seção para agências, CTAs e modal. Confirmar ausência de overflow horizontal e legibilidade dos botões.

- [ ] **Step 4: Final completion check**

Somente declarar a publicação concluída depois de confirmar o deploy público e a navegação dos dois cards do ecossistema.