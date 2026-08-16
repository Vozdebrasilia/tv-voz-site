# V33 Original Presenter Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restaurar e proteger os avatares profissionais originais da V33, reproduzir a abertura solicitada com voz e movimento e publicar o resultado sem remover o conteúdo existente.

**Architecture:** Manter o portal estático atual e isolar toda a reprodução em `v33-did-player.js`. Reutilizar mídia aprovada quando compatível; qualquer mídia nova será gerada somente por um endpoint temporário não versionado, baixada para `assets/v33-original/` e o endpoint será removido antes da publicação final.

**Tech Stack:** HTML, CSS, JavaScript, MP4/H.264/AAC, D-ID API, GitHub e Vercel.

## Global Constraints

- A versão permanece V33.
- Deijanete deve usar o avatar original de terninho em `studio-deijanete-source.png`.
- Paulo deve usar o avatar original de terno em `studio-paulo-source.png`.
- A abertura começa com Paulo: “Olá, Deijanete!” e Deijanete: “Olá, Paulo! Vamos às notícias mais quentes de hoje.”
- Nenhum conteúdo, seção, página, tema, SEO, domínio ou integração existente pode ser removido.
- Não usar `speechSynthesis` nem gerar mídia em cada visita.
- Não executar repetição automática de geração D-ID.
- Não deixar endpoints de geração na versão final.

---

### Task 1: Travar os avatares originais e a abertura

**Files:**
- Modify: `tests/v33-did-player-test.sh`
- Modify: `index.html`
- Modify: `v33-did-player.js`

**Interfaces:**
- Consumes: `studio-deijanete-source.png`, `studio-paulo-source.png` e MP4 aprovados.
- Produces: abertura ordenada iniciada por `startV33DidSequence()`.

- [ ] **Step 1: Criar teste de regressão dos avatares e da ordem da abertura**
- [ ] **Step 2: Executar o teste e confirmar falha por uso de `v33-real` e imagens casuais**
- [ ] **Step 3: Trocar somente as fontes do estúdio e a fila de mídia**
- [ ] **Step 4: Executar o teste e confirmar aprovação**
- [ ] **Step 5: Confirmar que todas as seções e páginas continuam presentes**

### Task 2: Validar mídia e gerar somente o mínimo ausente

**Files:**
- Create only when necessary: `assets/v33-original/01-paulo-ola.mp4`
- Create only when necessary: `assets/v33-original/02-deijanete-ola.mp4`
- Temporary and never committed: `api/v33-temporary-generation.js`

**Interfaces:**
- Consumes: `DID_API_KEY` já configurada no Vercel.
- Produces: dois MP4 finais reutilizáveis, sem geração em visitas.

- [ ] **Step 1: Inspecionar imagem, áudio, duração e identidade dos clipes existentes**
- [ ] **Step 2: Reutilizar clipes existentes se satisfizerem figurino e fala**
- [ ] **Step 3: Se necessário, criar endpoint temporário com limite de uma geração por apresentador**
- [ ] **Step 4: Gerar apenas os dois clipes curtos da abertura e registrar os IDs**
- [ ] **Step 5: Baixar e validar os MP4**
- [ ] **Step 6: Remover o endpoint temporário antes do commit final**

### Task 3: Verificação, preservação e publicação

**Files:**
- Modify: `tests/v33-did-player-test.sh`
- Modify: `docs/superpowers/plans/2026-08-16-v33-restauracao-avatares.md`

**Interfaces:**
- Consumes: portal V33 corrigido.
- Produces: commit V33 verificável e implantação Vercel validada.

- [ ] **Step 1: Executar testes de arquivos, mídia e ausência de geradores públicos**
- [ ] **Step 2: Servir localmente e validar HTML, scripts, MP4 e rotas**
- [ ] **Step 3: Confirmar que a árvore de páginas e temas não diminuiu**
- [ ] **Step 4: Criar commit de preservação V33**
- [ ] **Step 5: Enviar para o GitHub e publicar no projeto Vercel correto**
- [ ] **Step 6: Conferir domínio oficial, console, áudio, vídeo e responsividade**

