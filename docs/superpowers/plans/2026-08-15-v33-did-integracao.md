# V33 D-ID Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reproduzir os 10 clipes D-ID já gerados nos apresentadores existentes da bancada V33, sem alterar o restante do portal.

**Architecture:** A integração será isolada no estúdio existente. Dois elementos `<video>` serão posicionados exatamente sobre as áreas atuais de Paulo e Deijanete e controlados por uma fila JavaScript. O restante da V33 permanece intacto.

**Tech Stack:** HTML, CSS, JavaScript, Vercel, D-ID MP4.

## Global Constraints
- Nome do projeto: V33.
- Não alterar a bancada existente.
- Não alterar a identidade visual.
- Não usar vídeos de entrevista no ar.
- Não usar voz genérica do navegador como fallback.
- Não gerar novos Talks em visitas ao site.

---

### Task 1: Integrar player D-ID na bancada

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: os 10 URLs MP4 finais D-ID.
- Produces: `startV33DidSequence()`, `stopV33DidSequence()` e fila ordenada de reprodução.

- [ ] Inserir dois elementos `<video>` sobre os apresentadores atuais.
- [ ] Criar CSS para preservar exatamente tamanho, posição e clipping da bancada.
- [ ] Criar fila com os 10 clipes finais na ordem editorial.
- [ ] Fazer cada clipe disparar automaticamente o próximo em `ended`.
- [ ] Manter o apresentador não ativo em sua imagem estática.
- [ ] Restaurar ambos ao estado normal após o último clipe.
- [ ] Garantir que erro de vídeo nunca acione `speechSynthesis`.
- [ ] Testar desktop e comportamento responsivo.
- [ ] Commit.

### Task 2: Desativar fallback genérico durante a sequência

**Files:**
- Modify: `index.html`

- [ ] Interceptar a função atual de início do jornal para usar a sequência D-ID.
- [ ] Cancelar qualquer `speechSynthesis` pendente antes da reprodução.
- [ ] Impedir nova fala genérica enquanto a sequência D-ID estiver ativa.
- [ ] Confirmar que ticker, mercado/clima e overlays continuam funcionando.
- [ ] Commit.

### Task 3: Segurança e limpeza

**Files:**
- Delete: `api/did-info.js`
- Delete: `api/did-test.js`
- Delete: `api/did-final.js`

- [ ] Remover endpoints temporários que expõem dados ou podem consumir créditos D-ID.
- [ ] Manter somente o código necessário à reprodução dos clipes já gerados.
- [ ] Verificar Vercel.
- [ ] Abrir produção e validar a bancada.
- [ ] Commit.
