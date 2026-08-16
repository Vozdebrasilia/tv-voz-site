# V33 Human Clips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put Deijanete and Paulo real human footage into the existing V33 studio positions and play them sequentially without D-ID, YouTube, TTS, or fake facial animation.

**Architecture:** Keep the existing V33 HTML/CSS and presenter slots. Add two local cropped MP4 files under `assets/v33-human/` and replace the current safe-static player with a deterministic native `<video>` sequencer that falls back to existing presenter photos on media failure.

**Tech Stack:** Static HTML/CSS/JavaScript, native HTML5 video, MP4/H.264/AAC, Bash regression test.

## Global Constraints
- Only user-supplied real human footage.
- No D-ID generation or visible D-ID branding.
- No YouTube iframe/embed.
- No browser speech synthesis.
- No fake mouth/head/blink animation.
- Playback rate must remain 1.0.
- Preserve the existing four animated counters and surrounding V33 layout.

---

### Task 1: Regression test for real human media

**Files:**
- Modify: `tests/v33-did-player-test.sh`

**Interfaces:**
- Consumes: `v33-did-player.js`, `index.html`
- Produces: assertions that fail until local human clips and active controls are implemented.

- [ ] **Step 1: Write the failing test**
Assert `assets/v33-human/deijanete.mp4` and `assets/v33-human/paulo.mp4` are referenced, both rates are 1, the player enables controls, and forbidden provider/TTS/embed patterns are absent.
- [ ] **Step 2: Run test to verify it fails**
Run: `bash tests/v33-did-player-test.sh`
Expected: FAIL because current player is safe-static and does not reference human clips.
- [ ] **Step 3: Commit the failing test**
Commit message: `test: require real human clips in V33`

### Task 2: Add the two real cropped MP4 assets

**Files:**
- Create: `assets/v33-human/deijanete.mp4`
- Create: `assets/v33-human/paulo.mp4`

**Interfaces:**
- Consumes: the two user-supplied WhatsApp videos.
- Produces: native H.264/AAC local files for the player.

- [ ] **Step 1: Crop and encode the six-second real-human presenter excerpts**
Use the already inspected clean crops: Deijanete 210x300 and Paulo 208x300, preserving source audio and 59.94fps timing.
- [ ] **Step 2: Verify media metadata**
Run `ffprobe` and require H.264 video, AAC audio, six-second duration, and no external URL dependency.
- [ ] **Step 3: Visually inspect representative frames**
Confirm the frame is the real presenter, no D-ID branding, and no YouTube/Instagram chrome in the crop.
- [ ] **Step 4: Commit assets**
Commit message: `media: add real V33 presenter clips`

### Task 3: Replace static fallback player with native human clip sequencer

**Files:**
- Modify: `v33-did-player.js`

**Interfaces:**
- Consumes: `#tv-ao-vivo`, `#idleDeijanete`, `#idlePaulo`, existing control button IDs, two local MP4 assets.
- Produces: one-pass Deijanete-to-Paulo native playback with fallback to photographs.

- [ ] **Step 1: Implement minimal player**
Create both `<video>` elements at rate 1, mount them in fixed presenter slots, enable existing controls, and sequence Deijanete then Paulo.
- [ ] **Step 2: Add failure fallback**
On media error, remove media-ready state, show photographs, disable playback, and report temporary unavailability.
- [ ] **Step 3: Run regression test**
Run: `bash tests/v33-did-player-test.sh`
Expected: PASS.
- [ ] **Step 4: Syntax-check JavaScript**
Run: `node --check v33-did-player.js`
Expected: exit 0.
- [ ] **Step 5: Commit player**
Commit message: `feat: play real human presenters in V33`

### Task 4: Production integration and verification

**Files:**
- No additional source changes expected.

**Interfaces:**
- Consumes: GitHub branch and Vercel Git integration.
- Produces: production V33 with real presenter playback.

- [ ] **Step 1: Open pull request against `main`**
- [ ] **Step 2: Review diff for forbidden patterns and unintended layout changes**
- [ ] **Step 3: Merge only after checks are clean**
- [ ] **Step 4: Wait for Vercel production deployment to reach READY**
- [ ] **Step 5: Fetch production `v33-did-player.js` and page to verify new code is served**
- [ ] **Step 6: Report the production link only after verification evidence is fresh**