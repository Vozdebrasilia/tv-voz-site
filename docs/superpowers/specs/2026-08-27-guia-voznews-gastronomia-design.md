# Guia Voz News Gastronomia — Design

## Objetivo
Transformar a vertical Voz News Gastronomia em um guia pesquisável e resiliente, com base própria de restaurantes no Brasil e no exterior, busca pública complementar e Renata La Porta em posição editorial de autoridade gastronômica.

## Princípios editoriais
- Inspirar a estrutura do histórico Guia Quatro Rodas sem copiar conteúdo, notas, textos ou classificação proprietária.
- Separar critérios de cozinha, experiência/conforto e faixa de preço.
- No conteúdo editorial próprio, considerar apresentação, temperatura, qualidade dos ingredientes, cozimento, tempero e harmonia.
- Identificar claramente publicidade, parceiro, seleção editorial e resultado público.
- Anunciantes Voz News aparecem antes dos demais resultados quando compatíveis com a busca.

## Arquitetura da busca
A busca será híbrida e em três camadas:
1. **Índice próprio Voz News**: arquivo de dados versionado no repositório com restaurantes de Brasília, capitais brasileiras e destinos internacionais. Responde imediatamente e não depende de terceiros.
2. **API Voz News `/api/restaurants`**: consulta primeiro o índice próprio, normaliza os termos e devolve resultados locais com prioridade comercial/editorial.
3. **Cobertura pública complementar**: OpenStreetMap via Nominatim/Photon/Overpass complementa a resposta. Falha ou timeout externo nunca apaga os resultados do índice próprio.

## Modelo de dados do restaurante
Cada registro do índice próprio terá:
- `id`
- `name`
- `city`
- `state`
- `country`
- `cuisine`
- `category`
- `priceBand` (`$` a `$$$$$`, quando conhecido/editorialmente definido)
- `profile`
- `address` (quando disponível e verificado)
- `url`
- `tier` (`sponsored`, `partner`, `editorial`)
- `source` (`voznews`)
- `featured` boolean
- `tags` array

A base própria não inventará avaliações numéricas ou estrelas para restaurantes que não foram avaliados pela Voz News.

## Cobertura inicial
### Brasil
Brasília, São Paulo, Rio de Janeiro, Belo Horizonte, Salvador, Recife, Fortaleza, Curitiba, Porto Alegre, Goiânia, Florianópolis, Campinas, Belém e Manaus.

### Mundo
Nova York, Miami, Paris, Lisboa, Roma, Londres, Madri, Barcelona, Buenos Aires, Santiago, Cidade do México, Tóquio, Dubai e Bangkok.

A busca continuará aceitando qualquer cidade digitada, usando a camada pública complementar.

## Renata La Porta
Criar bloco editorial destacado com o título **“Renata La Porta — Autoridade em Gastronomia e Eventos”**. O texto deve citar, de forma factual e sem exagero, sua trajetória desde 1998 e o reconhecimento como vencedora de Bufê de Festa no Encontro Gastrô Brasília 2026. O bloco terá link para a matéria já existente `gastronomia/materias/renata-la-porta.html`.

## Interface
- Campo “O que você quer comer?”
- Campo “Onde?”
- Botão “BUSCAR”
- Atalhos de destinos Brasil e Mundo
- Filtros de categoria/cozinha e faixa de preço no cliente quando houver dados próprios suficientes
- Cards indicam origem: Voz News, patrocinado, parceiro ou resultado público
- Resultados próprios devem aparecer antes da consulta externa e permanecer visíveis se a externa falhar
- Estado de carregamento deve ser explícito e não bloquear interação

## Resiliência
- Timeout externo curto e tolerante a falhas.
- API sempre retorna JSON 200 com resultados próprios quando disponíveis, ainda que fornecedores externos falhem.
- Deduplicação por nome + cidade/coordenação.
- Cache de resposta pública no Vercel.
- Nunca depender de Overpass como única fonte.

## Testes de aceitação
1. Busca `sushi` em `Brasília, DF, Brasil` retorna resultados sem exigir Overpass.
2. Busca em `São Paulo, SP, Brasil` retorna registros da base própria e pode complementar com resultados públicos.
3. Busca em `Paris, França` retorna registros próprios e/ou públicos sem erro de interface.
4. `/gastronomia` e `/gastronomia/` carregam o JavaScript correto.
5. Anunciante compatível fica antes de resultados editoriais/públicos.
6. Renata La Porta aparece como “Autoridade em Gastronomia e Eventos”.
7. Se a camada externa falhar, o usuário continua vendo os resultados próprios.
8. Os testes dos 40 portais continuam passando.

## Fora de escopo desta entrega
- Copiar banco de dados, estrelas, textos ou classificações do Guia Quatro Rodas.
- Sistema de login de restaurantes.
- Painel administrativo completo.
- Avaliações abertas do público com nota.
- Reserva/transação dentro do portal.
