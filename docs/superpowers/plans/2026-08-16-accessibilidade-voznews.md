# VOZ NEWS Accessibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visible, reusable VOZ NEWS accessibility layer to the homepage and analysis pages.

**Architecture:** Create one standalone browser script, `voznews-accessibilidade.js`, that injects the accessible toolbar and uses the browser SpeechSynthesis API for audio reading. Load it on the homepage and analysis pages. The toolbar remains keyboard accessible and includes summary/full reading, pause/resume/stop, font scaling and high contrast.

**Tech Stack:** Vanilla JavaScript, CSS, Web Speech API.

## Global Constraints
- Preserve V33 layout and content.
- No face or image changes.
- Accessibility controls must be visible without opening the hamburger menu.
- Controls must be usable with keyboard and screen readers.

### Task 1: Reusable accessibility toolbar
**Files:** Create `voznews-accessibilidade.js`.
- [ ] Inject fixed/visible `VOZ NEWS Acessível` launcher and panel.
- [ ] Add `Ouvir resumo`, `Ouvir notícia`, `Pausar`, `Continuar`, `Parar`, `A-`, `A+`, and `Alto contraste` controls.
- [ ] Add ARIA labels, focus states and keyboard support.
- [ ] Use SpeechSynthesis in `pt-BR` and gracefully handle unsupported browsers.

### Task 2: Homepage integration
**Files:** Modify `index.html`.
- [ ] Load `voznews-accessibilidade.js` before `</body>`.
- [ ] Expose meaningful main-page text to the reader without changing visible editorial layout.

### Task 3: Analysis-page integration
**Files:** Modify `api/analysis-page.js`.
- [ ] Load the shared accessibility script on every analysis page.
- [ ] Mark title and article body as preferred reading content.
- [ ] Keep existing article navigation and SEO metadata intact.

### Task 4: Verification
- [ ] Verify homepage code contains the accessibility script.
- [ ] Verify analysis page contains the script and readable article selectors.
- [ ] Verify production deployment reaches READY before reporting completion.
