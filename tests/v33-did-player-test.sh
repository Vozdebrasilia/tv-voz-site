#!/usr/bin/env bash
set -euo pipefail
test -f v33-did-player.js
grep -q "assets/v33-did/01-paulo.mp4" v33-did-player.js
grep -q "assets/v33-did/02-deijanete.mp4" v33-did-player.js
test "$(grep -c "assets/v33-did/.*mp4" v33-did-player.js)" -eq 2
grep -q 'studio-paulo-source.png' index.html
grep -q 'studio-deijanete-source.png' index.html
! grep -qE 'speechSynthesis|SpeechSynthesisUtterance|instant-mouth|avatar-eyelids' index.html v33-did-player.js
! test -e api/did-controlled.js
! grep -qE 'did-controlled|/talks' v33-did-player.js index.html
printf 'V33 controlled media architecture: OK\n'
