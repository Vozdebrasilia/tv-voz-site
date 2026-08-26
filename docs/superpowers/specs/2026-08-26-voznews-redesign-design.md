# VOZ NEWS Brasil + VOZ NEWS Energia — Design aprovado

## Objetivo
Reorganizar o portal principal e a vertical /energia com aparência editorial internacional, melhor hierarquia visual, navegação mais clara e melhor uso do conteúdo existente, sem apagar o acervo atual nem alterar os avatares/apresentadores existentes.

## Escopo
- Home principal em voznewsbrasil.com.br com nova capa editorial, destaques por editoria, métricas institucionais atualizadas, atalhos para entrevistas, Brasília, política, negócios, saúde, turismo e energia.
- VOZ NEWS Energia em voznewsbrasil.com.br/energia com identidade coerente com a home, navegação própria de setor, melhor capa e organização das matérias/entrevistas já existentes.
- Preservar index.html atual como acervo/legado acessível diretamente.
- Preservar energia/index.html e seu conteúdo já existente; a nova home de Energia deve continuar carregando esse conteúdo.
- Não alterar os avatares, D-ID, assets originais ou páginas de portais especializados fora do necessário.
- Manter URLs públicas e SEO canônico.

## Direção visual
Base azul-marinho profunda, branco, dourado institucional e verde apenas como acento setorial em Energia. Tipografia limpa, cards com menos ruído, mais espaço em branco relativo, cabeçalho editorial e grids responsivos. O portal deve parecer uma publicação de notícias, não uma landing page comercial.

## Arquitetura
Criar uma nova home editorial em home.html e apontar somente a rota / para ela via vercel.json, preservando index.html intacto. Em Energia, atualizar energia/home.html, que já é o destino público de /energia e que consome energia/index.html como fonte de conteúdo.

## Critérios de aceitação
1. / abre a nova home editorial e mantém links para o acervo e editorias existentes.
2. /energia abre a nova capa setorial e continua exibindo o conteúdo proveniente de energia/index.html.
3. Métrica institucional visível: 230 mil+ seguidores no Instagram.
4. Layout funciona em desktop e celular.
5. Nenhum avatar, asset V33 ou conteúdo legado é removido.
6. vercel.json mantém rewrites existentes, adicionando somente o destino da raiz.
