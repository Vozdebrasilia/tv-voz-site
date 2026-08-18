#!/bin/sh
set -eu
grep -q "Lula" api/poder.js
grep -q "Celina Leão" api/poder.js
grep -q "Julio Cesar Ribeiro" api/poder.js
grep -q "Gilberto Nascimento" api/poder.js
grep -q "Hermeto" api/poder.js
grep -q "Paula Belmonte" api/poder.js
grep -q "instagram-photo" api/poder.js
grep -q "og:image" api/instagram-photo.js
grep -q '"/portais/poder.html"' vercel.json
