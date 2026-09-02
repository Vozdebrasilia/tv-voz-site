# VOZ NEWS MOBILIDADE — desenho funcional e técnico

Data: 02/09/2026

## Objetivo

Evoluir `voznewsbrasil.com.br/mobilidade` para uma vertical de mobilidade com alcance local, nacional e internacional, preservando a identidade do ecossistema VOZ NEWS e mantendo o cabeçalho existente. A primeira frente editorial/comercial será locação de veículos, com expansão progressiva para montadoras, concessionárias, seminovos, assinatura, elétricos, motos, vans, caminhões, ônibus, náutica, aviação e serviços automotivos.

O número de seguidores exibido no portal deve ser atualizado para **240K+**.

## Requisitos principais

1. Manter o cabeçalho visual atual da vertical Mobilidade, sem alterar os demais portais do ecossistema.
2. Manter a URL principal em `/mobilidade`.
3. Dar destaque inicial a locadoras de veículos.
4. Criar uma área de **PESQUISA** que não seja limitada a empresas cadastradas no VOZ NEWS.
5. Permitir pesquisa por:
   - nome da empresa;
   - cidade;
   - estado/região;
   - país;
   - tipo de veículo;
   - tipo de serviço;
   - categoria;
   - texto livre.
6. Permitir consultas em Brasília, em qualquer cidade do Brasil e no exterior.
7. Resultados patrocinados/parceiros do VOZ NEWS podem receber destaque visual, mas não podem ocultar nem impedir a exibição de empresas não parceiras.
8. A experiência deve funcionar bem em desktop e celular.

## Arquitetura recomendada

A busca será **híbrida**.

### Camada 1 — resultados VOZ NEWS

Uma pequena base própria conterá parceiros, anunciantes e empresas destacadas editorialmente. Essa base serve para:

- destaque visual de parceiros;
- conteúdo editorial próprio;
- cards com informações adicionais;
- futuras páginas internas de empresa.

Ela não será usada como limite para a pesquisa.

### Camada 2 — pesquisa externa de empresas

Será criado um endpoint serverless no próprio projeto, por exemplo:

`/api/mobilidade-search`

O endpoint recebe os filtros da interface e monta uma consulta externa para busca de empresas por texto e localização.

A primeira integração recomendada é **Google Places API (Text Search / Places API New)**, porque oferece cobertura internacional de estabelecimentos e informações estruturadas como nome, endereço, telefone, site, avaliação e localização. A chave deve ficar em variável de ambiente no Vercel, nunca exposta no HTML.

Exemplo de consulta construída pelo backend:

`locadora SUV Brasília Brasil`

ou

`luxury car rental Miami USA`

ou

`aluguel de van Goiânia Goiás`

Os filtros de veículo e serviço serão incorporados à consulta textual para aumentar a relevância dos resultados.

### Fallback

Se a API externa estiver indisponível ou ainda não houver chave configurada:

- o portal continua exibindo os destaques próprios;
- informa de forma clara que a busca externa está temporariamente indisponível;
- oferece um botão para repetir a pesquisa quando o serviço retornar;
- não inventa empresas nem resultados.

## Fluxo da pesquisa

1. Usuário digita um termo ou escolhe filtros.
2. Frontend envia a consulta para `/api/mobilidade-search`.
3. O backend normaliza os campos e cria uma string de busca.
4. O backend consulta a fonte externa.
5. A resposta é normalizada para um formato único.
6. O frontend combina resultados externos com parceiros/destaques internos.
7. Duplicidades são removidas por nome + endereço/site.
8. Parceiros podem aparecer com selo “Parceiro VOZ NEWS”, sem exclusão dos demais.
9. Resultados são exibidos em cards responsivos.

## Formato dos resultados

Cada card deve mostrar, quando disponível:

- nome da empresa;
- categoria/segmento;
- cidade e país;
- endereço;
- telefone;
- site;
- avaliação pública, quando fornecida pela fonte;
- breve descrição da atividade, quando disponível;
- selo de parceiro VOZ NEWS, quando aplicável;
- botão “Ver empresa / site”;
- botão “Como chegar”, quando houver coordenadas/endereço.

No primeiro ciclo, o clique principal leva ao site/contato oficial da empresa. Páginas internas completas para empresas podem ser adicionadas depois para parceiros ou destaques editoriais.

## Interface da aba PESQUISA

A área de pesquisa deve ficar visível e destacada na página `/mobilidade`.

Campos:

- **O que procura?** — empresa, marca ou texto livre;
- **Localização** — cidade, estado ou país;
- **Tipo de veículo** — carro, hatch, sedã, SUV, picape, van, caminhão, moto, elétrico, luxo, ônibus, embarcação, aeronave etc.;
- **Serviço** — aluguel, assinatura, compra, venda, concessionária, seminovos, manutenção, transporte, compartilhamento etc.;
- **Categoria** — locadora, montadora, concessionária, marketplace, oficina, mobilidade urbana, náutica, aviação etc.;
- botão **PESQUISAR**.

Também devem existir exemplos rápidos clicáveis, como:

- “Aluguel de SUV em Brasília”;
- “Locadora de van em Goiânia”;
- “Carro de luxo em Miami”;
- “Veículo elétrico em São Paulo”.

## Home da vertical

A ordem inicial recomendada é:

1. Cabeçalho VOZ NEWS atual.
2. Hero “VOZ NEWS MOBILIDADE”.
3. Métricas institucionais, com **240K+ seguidores**.
4. Bloco principal de **Pesquisa**.
5. Seção “Locadoras de veículos”.
6. Destaques de mobilidade.
7. Categorias editoriais.
8. Conteúdo de mercado/notícias.
9. Parceiros e oportunidades comerciais.
10. Rodapé.

## Locadoras — primeira expansão

A home deve começar destacando locadoras conhecidas e categorias de locação, sem afirmar parceria quando não houver.

Exemplos de grupos para descoberta/pesquisa:

- grandes redes nacionais;
- locadoras regionais;
- aluguel em aeroportos;
- carros econômicos;
- SUVs;
- vans;
- utilitários;
- carros premium/luxo;
- assinatura mensal;
- veículos elétricos.

A busca externa é responsável por ampliar a cobertura além da lista editorial do portal.

## SEO

Adicionar metadados específicos e linguagem natural para buscas relacionadas a mobilidade. Exemplos:

- aluguel de carros em Brasília;
- locadora de veículos em Brasília;
- aluguel de SUV;
- aluguel de van;
- carro por assinatura;
- carros elétricos;
- concessionárias;
- seminovos;
- mobilidade urbana;
- locadora de veículos no Brasil;
- car rental + cidade/país.

A URL `/mobilidade` deve continuar canônica e indexável.

## Segurança e privacidade

- Chaves de API somente no backend/Vercel Environment Variables.
- Nunca expor a chave no código do navegador.
- Sanitizar e limitar tamanho dos campos de busca.
- Aplicar timeout para chamadas externas.
- Aplicar cache curto para consultas repetidas e reduzir custo.
- Não armazenar dados pessoais do usuário da busca.

## Controle de custo e performance

- Debounce no frontend para evitar requisições acidentais repetidas.
- Busca somente após ação explícita do usuário.
- Cache server-side por consulta normalizada.
- Limite inicial de resultados por busca.
- Paginação ou “carregar mais” para resultados adicionais.

## Tratamento de erros

- Sem termo/local suficiente: orientar o usuário a completar a busca.
- API externa indisponível: mensagem amigável e resultados internos preservados.
- Nenhum resultado: sugerir ampliar localização ou remover filtros.
- Resultado duplicado: consolidar antes da exibição.
- Site/telefone ausente: ocultar o botão correspondente em vez de mostrar dado falso.

## Arquivos previstos para implementação

- `mobilidade/index.html` — atualizar layout, métricas e interface da pesquisa.
- `api/mobilidade-search.js` — endpoint serverless para busca global.
- `mobilidade/partners.json` — base leve de destaques/parceiros e metadados próprios.
- `tests/mobilidade-links-test.js` — ampliar testes de links e comportamento básico.
- `.github/workflows/mobilidade-links.yml` — manter validação automática existente.

Arquivos adicionais só devem ser criados se a implementação exigir separação clara de responsabilidades.

## Critérios de aceite

1. `/mobilidade` abre sem quebrar o restante do site.
2. Cabeçalho atual permanece visualmente consistente.
3. Métrica mostra **240K+ seguidores**.
4. Pesquisa aceita empresa, localização, veículo, serviço e categoria.
5. Uma consulta por Brasília funciona sem depender de cadastro manual de empresa.
6. Uma consulta por outra cidade do Brasil funciona.
7. Uma consulta internacional funciona quando a integração externa está configurada.
8. Resultados de parceiros são identificados, mas resultados externos continuam visíveis.
9. Interface funciona em desktop e mobile.
10. Erros externos não derrubam a página.
11. Nenhuma chave de API aparece no HTML ou JavaScript entregue ao navegador.
12. Testes existentes de Mobilidade continuam passando e os novos cenários básicos são cobertos.

## Fora do primeiro ciclo

Não fazem parte do primeiro ciclo, salvo pedido posterior:

- reserva ou pagamento dentro do VOZ NEWS;
- comparação de preços em tempo real entre locadoras;
- login de empresas;
- cadastro aberto de empresas;
- inventário de veículos em tempo real;
- página interna completa para todas as empresas do mundo.

Esses recursos podem ser adicionados depois sem alterar a arquitetura principal da busca híbrida.
