#!/usr/bin/env bash
set -euo pipefail

test -f v33-did-player.js
grep -q "assets/v33-did/01-paulo.mp4" v33-did-player.js
grep -q "assets/v33-did/02-deijanete.mp4" v33-did-player.js
test "$(grep -c "assets/v33-did/.*mp4" v33-did-player.js)" -eq 2
grep -q "rate: 0.86" v33-did-player.js
grep -q "preservesPitch = true" v33-did-player.js
grep -q "for (const { host } of clips)" v33-did-player.js
grep -q "await playToEnd(videos.get(host))" v33-did-player.js

! grep -qiE 'speechSynthesis|SpeechSynthesisUtterance|instant-mouth|instantPresenterTalk|vozAvatarAlive|fake.?mouth|fake.?blink|fake.?head|deijanete-live-blazer' index.html v33-did-player.js
! grep -qE 'did-controlled|/talks' v33-did-player.js index.html
! grep -qiE '<(iframe|embed)[^>]+(youtube|youtu\.be)|youtube(-nocookie)?\.com/embed' index.html v33-did-player.js
! grep -qiE 'd-id[^<]*(logo|watermark)|(logo|watermark)[^<]*d-id' index.html v33-did-player.js
! grep -qE 'clip-path|mask:' index.html | grep -E 'studio-presenter|idle-deijanete|idle-paulo|v33-presenter-video'

grep -q '>INICIAR JORNAL AO VIVO</button>' index.html
grep -q '>PRÓXIMA MANCHETE</button>' index.html
grep -q '>PAUSAR</button>' index.html
test "$(grep -c 'class="count-up"' index.html)" -eq 4
grep -q 'data-format="mil" data-suffix="+" data-target="200"' index.html
grep -q 'data-format="milhoes" data-suffix="+" data-target="200"' index.html
grep -q 'data-format="plus" data-suffix="+" data-target="1000"' index.html
grep -q 'data-format="mil" data-suffix="+" data-target="10000"' index.html
grep -q 'const duration=900' index.html

echo "V33 final human-realism architecture: OK"
