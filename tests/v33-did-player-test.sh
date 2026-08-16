#!/usr/bin/env bash
set -euo pipefail

test -f v33-did-player.js
test "$(grep -c "assets/v33-real/.*mp4" v33-did-player.js)" -eq 10
grep -q "assets/v33-real/01-paulo.mp4" v33-did-player.js
grep -q "assets/v33-real/02-deijanete.mp4" v33-did-player.js
grep -q "studio-deijanete-real-source.jpg" index.html
grep -q "studio-paulo-real-source.jpg" index.html
grep -q "INICIAR JORNAL AO VIVO" v33-did-player.js
grep -q "Apresentação concluída" v33-did-player.js
grep -q "v33-current" v33-did-player.js
! grep -qiE 'assets/v33-did|speechSynthesis|SpeechSynthesisUtterance|/talks' v33-did-player.js
test "$(find assets/v33-real -maxdepth 1 -name '*.mp4' -type f | wc -l)" -eq 10

echo "V33 real presenters: OK"
