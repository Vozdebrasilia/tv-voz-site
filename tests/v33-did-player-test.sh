#!/usr/bin/env bash
set -euo pipefail

test -f v33-did-player.js

grep -q "assets/v33-human/deijanete.mp4" v33-did-player.js
grep -q "assets/v33-human/paulo.mp4" v33-did-player.js
test "$(grep -c "rate: 1" v33-did-player.js)" -eq 2
grep -q "studio.classList.add('v33-media-ready')" v33-did-player.js
grep -q "button.hidden = false" v33-did-player.js
grep -q "button.disabled = false" v33-did-player.js
grep -q "await playToEnd(videos.get(host))" v33-did-player.js

! grep -qiE 'assets/v33-did|youtube|youtu\.be|speechSynthesis|SpeechSynthesisUtterance|instant-mouth|instantPresenterTalk|vozAvatarAlive|fake.?mouth|fake.?blink|fake.?head|deijanete-live-blazer|/talks|watermark|playbackRate *= *0\.' v33-did-player.js
! grep -qiE '<(iframe|embed)[^>]+(youtube|youtu\.be)|youtube(-nocookie)?\.com/embed' index.html v33-did-player.js
! grep -qE 'clip-path|mask:' index.html | grep -E 'studio-presenter|idle-deijanete|idle-paulo|v33-presenter-video'

test "$(grep -c 'class=\"count-up\"' index.html)" -eq 4
grep -q 'data-format="mil" data-suffix="+" data-target="200"' index.html
grep -q 'data-format="milhoes" data-suffix="+" data-target="200"' index.html
grep -q 'data-format="plus" data-suffix="+" data-target="1000"' index.html
grep -q 'data-format="mil" data-suffix="+" data-target="10000"' index.html

echo "V33 real human presenter architecture: OK"
