from pathlib import Path
import re

index_path = Path('index.html')
html = index_path.read_text(encoding='utf-8')

replacements = {
    '<img alt="Selo 40 anos TV Voz de Brasília" class="seal-img" src="./selo-40anos-transparente.png"/>':
    '<img alt="TV Voz de Brasília — 40 anos" class="seal-img" src="https://voz-central-ai.lovable.app/__l5e/assets-v1/92b171bb-b9d6-4d6b-bb14-1b435045a89f/logo-voz-de-brasilia-40anos.png?v=2"/>',
    '<img alt="Selo VOZ Global" src="./assets-v23/selo-internacional-1.svg"/>':
    '<img alt="Selo VOZ Global" src="https://voz-central-ai.lovable.app/__l5e/assets-v1/4a346d3a-5ba4-494c-a9bd-a9aae7110d17/selo-voz-global.png?v=2"/>',
    '<img alt="Selo Excelência Editorial" src="./assets-v23/selo-internacional-2.svg"/>':
    '<img alt="Selo Excelência Editorial" src="https://voz-central-ai.lovable.app/__l5e/assets-v1/e2356eb3-97b6-4fe6-bd2f-3e7f1db81bd1/selo-excelencia-editorial.png?v=2"/>',
    '<img alt="Selo Impacto Social IBJ" src="./assets-v23/selo-internacional-3.svg"/>':
    '<img alt="Selo Impacto Social IBJ" src="https://voz-central-ai.lovable.app/__l5e/assets-v1/430ff732-6d37-4a60-a6d3-ac9add4aaf20/selo-impacto-social.png?v=2"/>',
    '<img alt="Selo Parceiro Estratégico" src="./assets-v23/selo-internacional-4.svg"/>':
    '<img alt="Selo Parceiro Estratégico" src="https://voz-central-ai.lovable.app/__l5e/assets-v1/0a3acf88-03c0-42aa-baa3-bd5aa7d3c2b8/selo-parceiro-estrategico.png?v=2"/>',
}

missing = [old for old in replacements if old not in html]
if missing:
    raise SystemExit('Não encontrei no index.html: ' + ' | '.join(missing))

for old, new in replacements.items():
    html = html.replace(old, new)

html = re.sub(
    r'\n?<script>\s*\(function\(\)\{\s*//\s*Substitui logos em baixa por versões CDN em alta.*?</script>\s*',
    '\n', html, flags=re.S
)

css = '''

.logo-card img {
  width: 190px !important;
  height: 190px !important;
  max-width: 100% !important;
  object-fit: contain !important;
  image-rendering: auto !important;
}

.seal-img {
  width: 190px !important;
  height: 190px !important;
  object-fit: contain !important;
}
'''

if 'image-rendering: auto !important;' not in html:
    if '</style>' not in html:
        raise SystemExit('Bloco </style> não encontrado')
    html = html.replace('</style>', css + '\n</style>', 1)

old_refs = [
    './selo-40anos-transparente.png',
    './assets-v23/selo-internacional-1.svg',
    './assets-v23/selo-internacional-2.svg',
    './assets-v23/selo-internacional-3.svg',
    './assets-v23/selo-internacional-4.svg',
]
leftovers = [ref for ref in old_refs if ref in html]
if leftovers:
    raise SystemExit('Referências antigas ainda no index.html: ' + ', '.join(leftovers))

index_path.write_text(html, encoding='utf-8')

js_path = Path('voznews-accessibilidade.js')
if js_path.exists():
    js = js_path.read_text(encoding='utf-8')
    js = re.sub(
        r"\n\s*const credibilityLogoMap=new Map\(\[.*?document\.querySelectorAll\('#credibilidade img'\)\.forEach\(img=>\{.*?\}\);\n",
        '\n', js, count=1, flags=re.S
    )
    if 'credibilityLogoMap' in js:
        raise SystemExit('Ainda existe troca de logos por JavaScript')
    js_path.write_text(js, encoding='utf-8')

print('Correção aplicada e validada.')
