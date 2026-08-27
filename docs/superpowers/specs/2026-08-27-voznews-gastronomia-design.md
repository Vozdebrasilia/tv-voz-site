# Voz News Gastronomia — Design

## Objetivo
Criar a nova vertical `/gastronomia/` do Voz News Brasil, preservando o conceito visual e institucional do site-mãe e transformando o acervo gastronômico já existente em um portal próprio, com busca de restaurantes em Brasília, no Brasil e no mundo.

## Escopo
- Trabalhar no repositório atual `Vozdebrasilia/tv-voz-site`.
- Preservar o restante do site-mãe e as demais verticais.
- Criar `gastronomia/index.html` como página principal da vertical.
- Reutilizar identidade, cabeçalho, logomarca, métricas institucionais, navegação e linguagem visual do Voz News.
- Manter responsividade para desktop e celular.
- Incluir acessibilidade e contraste compatíveis com o padrão atual.

## Estrutura editorial
A página terá:
1. Hero “VOZ NEWS | GASTRONOMIA” com fotografia gastronômica de alto impacto.
2. Busca de restaurantes em destaque logo no início da página.
3. Seção “Brasília”.
4. Seção “Brasil”.
5. Seção “Mundo”.
6. Matérias e entrevistas gastronômicas.
7. Feiras, festivais e eventos de alimentação.
8. Área de anunciantes e patrocinadores.
9. Chamada comercial para restaurantes, bares, cafés, hotéis, delivery, supermercados, bebidas e fornecedores anunciarem no portal.

## Conteúdo herdado do site-mãe
A vertical deve reaproveitar as matérias, entrevistas e anúncios gastronômicos já publicados no `index.html` do Voz News. O conteúdo deve ser migrado sem apagar ou alterar o original do site-mãe.

Na implantação, serão identificados e incorporados os conteúdos gastronômicos já existentes, incluindo restaurantes e marcas citados no portal principal, com fotografia, chamada e link para matéria quando disponível.

## Busca de restaurantes
A busca terá dois níveis:

### 1. Diretório Voz News
Busca instantânea no acervo curado do próprio portal por:
- nome do restaurante;
- cidade;
- estado;
- país;
- tipo de cozinha;
- especialidade.

Resultados próprios do Voz News aparecem primeiro e podem incluir foto, localização, descrição, matéria, telefone/site e CTA.

### 2. Busca mundial ampliada
Para permitir pesquisa em Brasília, no Brasil e no mundo, a vertical terá uma camada de busca externa baseada em dados públicos de localização/restaurantes. A implementação preferencial será por endpoint Vercel (`api/restaurants.js`) com geocodificação + dados de estabelecimentos públicos, retornando resultados normalizados ao front-end.

Caso o serviço externo esteja indisponível, a interface deverá apresentar uma alternativa segura de pesquisa externa, sem quebrar a página.

## Mané Mercado — anúncio de destaque
O Mané Mercado entra como anunciante de destaque da seção Brasília.

O anúncio deve:
- ser claramente identificado como “Publicidade” ou “Patrocinado”;
- usar imagem oficial/adequada do complexo;
- apresentar o Mané como complexo/mercado gastronômico de Brasília;
- destacar variedade de restaurantes e experiência gastronômica;
- ter CTA para conhecer/reservar no Mané;
- direcionar para o site oficial do Mané;
- funcionar bem em desktop e celular.

O bloco do Mané terá peso visual superior aos anúncios menores da grade, funcionando como peça premium da página de Brasília.

## Eventos gastronômicos
Criar área para:
- festivais gastronômicos de Brasília;
- feiras de alimentação;
- eventos de chefs e restaurantes;
- grandes eventos nacionais de gastronomia;
- eventos internacionais relevantes.

O componente deve ser facilmente atualizável sem reconstruir toda a página.

## Publicidade
A vertical deve reservar formatos comerciais claros:
- banner premium no topo;
- destaque premium Brasília;
- cards patrocinados dentro das grades;
- bloco de fornecedores/serviços do setor;
- CTA “Anuncie na Voz News Gastronomia”.

Conteúdo patrocinado deve ser visualmente distinguível de matéria jornalística.

## Interação
- Todos os cards de matéria devem ser clicáveis.
- Links não podem apontar para `#` sem conteúdo.
- Busca deve funcionar por teclado e toque.
- Resultados devem exibir estado de carregamento, ausência de resultados e erro de serviço.
- Botões devem ter rótulos claros e acessíveis.

## SEO
- Título e descrição específicos para Gastronomia.
- Canonical em `https://www.voznewsbrasil.com.br/gastronomia/`.
- Dados estruturados pertinentes para portal/editorial e restaurantes quando aplicável.
- Incluir `/gastronomia/` no sitemap.
- Garantir indexação das matérias gastronômicas próprias.

## Responsividade
- Prioridade para iPhone e telas móveis.
- Hero, busca, cards, publicidade e resultados reorganizados em coluna no celular.
- Imagens com `object-fit: cover` e sem grandes áreas vazias.
- Textos e CTAs legíveis sem zoom.

## Arquivos previstos
- `gastronomia/index.html`
- `gastronomia/gastronomia.js` ou script equivalente, se necessário
- `api/restaurants.js` para busca ampliada, se adotado o endpoint público
- atualização do `index.html` apenas para expor/linkar a nova vertical, sem redesenhar o site-mãe
- atualização de `sitemap.xml`/mecanismo de sitemap quando necessário
- testes específicos em `tests/` para validar a vertical

## Critérios de aceite
1. `/gastronomia/` abre com identidade Voz News.
2. Cabeçalho e métricas institucionais seguem o padrão do site-mãe.
3. Matérias e anúncios gastronômicos existentes no site-mãe aparecem na nova vertical sem serem removidos do original.
4. Busca encontra restaurantes do diretório Voz News por nome e localização.
5. Busca ampliada permite pesquisar restaurantes fora de Brasília, incluindo Brasil e exterior.
6. Seções Brasília, Brasil e Mundo estão visíveis e bem diagramadas.
7. Mané Mercado aparece como anúncio premium claramente identificado.
8. Há seção de feiras/festivais/eventos gastronômicos.
9. Há formatos comerciais e CTA para novos anunciantes.
10. A página funciona bem em celular e desktop.
11. Nenhum card essencial aparece vazio ou quebrado.
12. O restante do Voz News Brasil permanece inalterado.
13. A alteração é validada antes de publicação em produção.
