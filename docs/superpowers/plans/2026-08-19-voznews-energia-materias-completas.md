# VOZ NEWS ENERGIA — Matérias completas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transformar os cartões editoriais do VOZ NEWS ENERGIA em matérias internas completas, com aproximadamente 3 mil caracteres, três mídias reais e integração contextual da Schneider Electric.

**Architecture:** Manter a página principal estática e criar uma fonte editorial estruturada em JavaScript para gerar páginas HTML independentes dentro de `energia/materias/`. Um gerador reproduzível aplicará um único template visual, e testes Node validarão conteúdo, mídia, links, URLs e regras da Schneider antes da publicação.

**Tech Stack:** HTML5, CSS3, JavaScript Node.js sem dependências externas, GitHub Pages/Vercel static hosting.

**Spec:** `docs/superpowers/specs/2026-08-19-voznews-energia-materias-completas-design.md`

## Global Constraints

- Preservar visualmente a página principal `energia/index.html`.
- Criar matéria interna para os 15 temas de “Do Amapá a Itaipu”.
- Criar página editorial própria para Schneider Electric.
- Manter as 15 entrevistas políticas e as 10 diplomáticas apontando ao portal-mãe.
- Cada matéria deve conter aproximadamente 3 mil caracteres e exatamente três elementos visuais reais.
- Usar URLs descritivas, texto alternativo e navegação de retorno.
- Inserir Schneider apenas em eletrificação, automação, eficiência energética, data centers, redes inteligentes, digitalização, sustentabilidade, gestão de energia e infraestrutura crítica.
- Validar funcionamento responsivo em celular e computador.

---

## Estrutura de arquivos

- `energia/index.html`: página principal; recebe somente links internos nos cartões editoriais.
- `energia/editorial/articles.mjs`: fonte de dados das 16 matérias, com título, subtítulo, corpo, mídias, fontes e regra Schneider.
- `energia/editorial/render.mjs`: renderizador puro de uma matéria para HTML.
- `energia/editorial/build.mjs`: gera as páginas finais em `energia/materias/`.
- `energia/editorial/article.css`: estilo compartilhado, responsivo e compatível com a identidade azul-escuro/dourada.
- `energia/materias/*.html`: páginas geradas e publicáveis.
- `tests/energia-editorial.test.mjs`: valida conteúdo e todos os links editoriais.

### Task 1: Contrato editorial e validação

**Files:**
- Create: `energia/editorial/articles.mjs`
- Create: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Produces: `articles: Article[]`, onde `Article` contém `slug`, `title`, `subtitle`, `body`, `media[3]`, `sources`, `schneider`.
- Consumes: nenhum arquivo de implementação anterior.

- [ ] **Step 1: Escrever o teste de contrato**

Criar asserts Node que exijam 16 slugs únicos, três mídias por matéria, corpo entre 2.700 e 3.500 caracteres, fonte para cada mídia e `schneider: true` apenas nos temas permitidos.

- [ ] **Step 2: Executar e confirmar falha**

Run: `node --test tests/energia-editorial.test.mjs`
Expected: FAIL porque `articles.mjs` ainda não existe.

- [ ] **Step 3: Criar a coleção editorial**

Cadastrar os 15 temas aprovados e a página Schneider com títulos, subtítulos, URLs e metadados completos.

- [ ] **Step 4: Executar o teste**

Run: `node --test tests/energia-editorial.test.mjs`
Expected: PASS no contrato estrutural.

- [ ] **Step 5: Commit**

`git add energia/editorial/articles.mjs tests/energia-editorial.test.mjs && git commit -m "feat: definir contrato das matérias de energia"`

### Task 2: Template visual compartilhado

**Files:**
- Create: `energia/editorial/render.mjs`
- Create: `energia/editorial/article.css`
- Modify: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Consumes: `Article` de `articles.mjs`.
- Produces: `renderArticle(article: Article): string`.

- [ ] **Step 1: Escrever teste de renderização**

Exigir HTML com título, subtítulo, três mídias, créditos, fontes, bloco relacionado, link para `/energia/`, metadados SEO e bloco Schneider apenas quando `article.schneider === true`.

- [ ] **Step 2: Confirmar falha**

Run: `node --test tests/energia-editorial.test.mjs`
Expected: FAIL porque `renderArticle` não existe.

- [ ] **Step 3: Implementar renderizador e CSS**

Criar template sem dependências, sem JavaScript obrigatório no navegador, com largura de leitura, hero, galeria de três mídias, corpo, fontes, CTA e cabeçalho do portal.

- [ ] **Step 4: Confirmar passagem**

Run: `node --test tests/energia-editorial.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

`git add energia/editorial/render.mjs energia/editorial/article.css tests/energia-editorial.test.mjs && git commit -m "feat: criar template editorial do Voz News Energia"`

### Task 3: Produzir os cinco primeiros temas

**Files:**
- Modify: `energia/editorial/articles.mjs`
- Test: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Consumes: contrato `Article`.
- Produces: conteúdo final para Amapá, terminais de petróleo, transmissão, Itaipu e solar.

- [ ] **Step 1: Ativar teste de comprimento, fontes e três mídias para os cinco temas**
- [ ] **Step 2: Confirmar falha por conteúdo incompleto**
- [ ] **Step 3: Escrever textos jornalísticos completos e selecionar três mídias reais por matéria**
- [ ] **Step 4: Executar `node --test tests/energia-editorial.test.mjs` e confirmar PASS**
- [ ] **Step 5: Commit com `git commit -m "content: publicar primeiro caderno de energia"`**

### Task 4: Produzir os cinco temas de tecnologia e indústria

**Files:**
- Modify: `energia/editorial/articles.mjs`
- Test: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Produces: refino, energia e dados, data centers e IA, edifícios eficientes e eficiência empresarial.

- [ ] **Step 1: Ativar os testes dos cinco temas**
- [ ] **Step 2: Confirmar falha**
- [ ] **Step 3: Escrever textos completos, três mídias reais e contexto Schneider nos temas compatíveis**
- [ ] **Step 4: Executar testes e confirmar PASS**
- [ ] **Step 5: Commit com `git commit -m "content: publicar caderno de tecnologia e indústria"`**

### Task 5: Produzir os cinco temas de infraestrutura e transição

**Files:**
- Modify: `energia/editorial/articles.mjs`
- Test: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Produces: infraestrutura integrada, Eletrobras, transição energética, operação e manutenção e eólica.

- [ ] **Step 1: Ativar os testes dos cinco temas**
- [ ] **Step 2: Confirmar falha**
- [ ] **Step 3: Escrever textos completos, mídias reais e contexto Schneider apenas onde aplicável**
- [ ] **Step 4: Executar testes e confirmar PASS**
- [ ] **Step 5: Commit com `git commit -m "content: publicar caderno de infraestrutura e transição"`**

### Task 6: Página editorial Schneider Electric

**Files:**
- Modify: `energia/editorial/articles.mjs`
- Test: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Produces: matéria `schneider-electric-nova-era-energia` com atuação em eletrificação, automação, eficiência, data centers, redes, digitalização e sustentabilidade.

- [ ] **Step 1: Escrever teste que exige as sete áreas de atuação, três mídias e links institucionais**
- [ ] **Step 2: Confirmar falha**
- [ ] **Step 3: Escrever matéria de aproximadamente 3 mil caracteres com fontes institucionais**
- [ ] **Step 4: Executar testes e confirmar PASS**
- [ ] **Step 5: Commit com `git commit -m "content: criar especial Schneider Electric"`**

### Task 7: Gerar páginas estáticas

**Files:**
- Create: `energia/editorial/build.mjs`
- Create: `energia/materias/*.html`
- Modify: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Consumes: `articles` e `renderArticle`.
- Produces: `buildAll(): Promise<string[]>` e 16 arquivos HTML.

- [ ] **Step 1: Escrever teste que exige um arquivo por slug e HTML válido**
- [ ] **Step 2: Confirmar falha**
- [ ] **Step 3: Implementar build determinístico e gerar os 16 arquivos**
- [ ] **Step 4: Executar build duas vezes, comparar saída e executar testes**
- [ ] **Step 5: Commit com `git commit -m "build: gerar matérias completas de energia"`**

### Task 8: Ligar cartões às matérias

**Files:**
- Modify: `energia/index.html`
- Modify: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Consumes: slugs gerados.
- Produces: todos os 15 cartões da seção e o destaque Schneider clicáveis.

- [ ] **Step 1: Escrever teste que mapeia cada cartão ao slug correto e preserva 25 links externos de entrevistas**
- [ ] **Step 2: Confirmar falha**
- [ ] **Step 3: Envolver cada cartão editorial com link interno e ligar a área Schneider à matéria própria**
- [ ] **Step 4: Executar testes e confirmar PASS**
- [ ] **Step 5: Commit com `git commit -m "feat: ligar portal às matérias completas"`**

### Task 9: Verificação final e publicação

**Files:**
- Verify: `energia/index.html`
- Verify: `energia/materias/*.html`
- Verify: `tests/energia-editorial.test.mjs`

**Interfaces:**
- Produces: conjunto publicado e rastreável.

- [ ] **Step 1: Executar `node --test tests/energia-editorial.test.mjs`**
- [ ] **Step 2: Validar que existem 16 páginas, 48 mídias e nenhum cartão editorial sem link**
- [ ] **Step 3: Conferir metadados, navegação, texto alternativo, links externos e responsividade**
- [ ] **Step 4: Conferir que Schneider aparece apenas nos temas permitidos**
- [ ] **Step 5: Publicar a versão validada e abrir `https://www.voznewsbrasil.com.br/energia/` para inspeção final**
