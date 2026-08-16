#!/usr/bin/env bash
set -euo pipefail

portal_links=$(grep -o 'href="\./portais/[^"]*\.html"' index.html | sort -u)
test "$(printf '%s\n' "$portal_links" | sed '/^$/d' | wc -l)" -eq 40

test -f portal.html
test -f cliente.html
test -f vercel.json
test -f robots.txt
test -f sitemap.xml

grep -q '"source": "/portais/:slug.html"' vercel.json
grep -q '"destination": "/portal.html"' vercel.json
grep -q '"source": "/clientes/:slug.html"' vercel.json
grep -q '"destination": "/cliente.html"' vercel.json

while IFS= read -r href; do
  slug=${href#*portais/}
  slug=${slug%.html\"}
  grep -q "'$slug':" portal.html
done <<< "$portal_links"

grep -q 'https://www.voznewsbrasil.com.br/' index.html
grep -q 'https://www.voznewsbrasil.com.br/sitemap.xml' robots.txt
grep -q '<loc>https://www.voznewsbrasil.com.br/</loc>' sitemap.xml

python3 - <<'PY'
import re
from pathlib import Path

html = Path('index.html').read_text(encoding='utf-8')
refs = sorted(set(re.findall(r'(?:src|href)="\./([^"#?]+)', html)))
missing = []
for ref in refs:
    if ref.startswith('portais/') or ref.startswith('clientes/'):
        continue
    if not Path(ref).exists():
        missing.append(ref)
if missing:
    raise SystemExit('Referências locais ausentes: ' + ', '.join(missing))
PY

echo "V33 portal integrity: OK"
