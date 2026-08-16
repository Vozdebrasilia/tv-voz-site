# V33 Analistas Estáticos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exibir Deijanete à esquerda e Paulo à direita, com manchete central e análise editorial interna alternada 50/50.

**Architecture:** O painel continuará consumindo `/api/headlines`. O front-end atribui autor por índice, abre imediatamente uma análise interna de oito parágrafos e cita a publicação original como fonte factual. Os retratos oficiais existentes permanecem estáticos.

**Tech Stack:** HTML, CSS, JavaScript, Vercel Serverless.

## Global Constraints
- Não alterar rostos.
- Não usar animação ou fala nos avatares.
- Alternância 50/50 entre Deijanete e Paulo.
- Notícias atualizadas de hora em hora.
- Dados verificáveis devem indicar fonte.

---

### Task 1: Layout e autoria alternada
- [ ] Manter retratos estáticos nos lados esquerdo e direito.
- [ ] Exibir nomes e indicação de analista.
- [ ] Vincular cada manchete a um autor alternado.
- [ ] Abrir análise interna imediatamente ao clique.

### Task 2: Análise e fontes
- [ ] Gerar oito blocos editoriais próprios a partir do tema da manchete.
- [ ] Não reproduzir integralmente a matéria de origem.
- [ ] Mostrar fonte factual e link para a publicação original.
- [ ] Manter ticker lento, clicável e pausável.

### Task 3: Publicação
- [ ] Validar JavaScript.
- [ ] Publicar em produção.
- [ ] Confirmar deployment READY.
