#!/bin/bash
set -e
test -f v33-did-player.js
grep -q "startV33DidSequence" v33-did-player.js
grep -q "assets/v33-did/01-paulo.mp4" v33-did-player.js
grep -q "assets/v33-did/10-deijanete.mp4" v33-did-player.js
grep -q 'v33-did-player.js' index.html
echo "TESTE V33 D-ID: OK"
