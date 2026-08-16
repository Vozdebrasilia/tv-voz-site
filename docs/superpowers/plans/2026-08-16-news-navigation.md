# News Navigation Implementation Plan

**Goal:** Add previous/next headline navigation and enlarge the yellow ticker typography without changing the approved V33 layout.

**Architecture:** Modify only `v33-did-player.js`. Add two accessible buttons around the headline and a small navigation function that renders a selected headline without breaking automatic rotation. Increase ticker font size and provide responsive sizing.

**Tech Stack:** Vanilla JavaScript and CSS.

## Task 1
- Modify `v33-did-player.js` to add previous/next buttons.
- Preserve automatic 11-second rotation.
- Manual previous/next updates the selected item immediately.
- Increase ticker text to 16px desktop and a readable responsive size on mobile.
- Verify the committed file contains both controls and updated ticker typography.