#!/usr/bin/env bash
set -euo pipefail

test -f v33-did-player.js
test "$(grep -c "assets/v33-original/.*mp4" v33-did-player.js)" -eq 2
grep -q "assets/v33-original/01-paulo-ola.mp4" v33-did-player.js
grep -q "assets/v33-original/02-deijanete-ola.mp4" v33-did-player.js
grep -q 'id="idleDeijanete"' index.html
grep -q 'src="./studio-deijanete-source.png"' index.html
grep -q 'id="idlePaulo"' index.html
grep -q 'src="./studio-paulo-source.png"' index.html
grep -q "INICIAR JORNAL AO VIVO" v33-did-player.js
grep -q "Apresentação concluída" v33-did-player.js
grep -q "v33-current" v33-did-player.js
perl -0777 -ne 'exit !(/\.v33-did-video\{.*?opacity:1!important;.*?visibility:hidden!important/s)' v33-did-player.js
grep -q "function buildTickerItems" index.html
! grep -qiE 'assets/v33-did|assets/v33-real|speechSynthesis|SpeechSynthesisUtterance|/talks' v33-did-player.js
test -f assets/v33-original/01-paulo-ola.mp4
test -f assets/v33-original/02-deijanete-ola.mp4
test ! -e api/v33-did-once.js
test ! -e api/v33-generate-real-final.js
test ! -e api/v33-test-media.js
test ! -e api/v33-temporary-generation.js
test ! -e api/v33-temporary-results.js

for media in assets/v33-original/01-paulo-ola.mp4 assets/v33-original/02-deijanete-ola.mp4; do
  ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of csv=p=0 "$media" | grep -q '^h264$'
  ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of csv=p=0 "$media" | grep -q '^aac$'
done

# Os arquivos originais do D-ID tinham a marca no rodapé. A composição oficial
# remove somente essa faixa, preservando rosto, voz e sincronização.
test "$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 assets/v33-original/01-paulo-ola.mp4)" -le 495
test "$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 assets/v33-original/02-deijanete-ola.mp4)" -le 470

echo "V33 original professional presenters: OK"
