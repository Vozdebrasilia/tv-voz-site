# VOZ NEWS Saúde & Beleza — Design aprovado

Data: 2026-09-04
Status: aprovado em conversa para especificação; implementação pendente após revisão desta especificação.

## 1. Objetivo

Criar um novo portal vertical completo em `https://www.voznewsbrasil.com.br/saude-beleza/`, integrado ao ecossistema VOZ NEWS, com duas finalidades inseparáveis:

1. atrair audiência por conteúdo editorial útil, atual, visual e confiável; e
2. converter marcas, clínicas, hospitais, laboratórios, profissionais e agências em oportunidades comerciais de branded content, publicidade e projetos especiais.

O portal não deve parecer um catálogo de anúncios. A proposta é uma plataforma editorial premium em que o anunciante reconhece, sem esforço, onde sua marca pode participar e quais formatos pode contratar.

## 2. Abordagens consideradas

### A. Portal puramente editorial
Vantagem: percepção jornalística forte.
Limitação: repete o problema de monetização observado no vertical Energia; o cliente consome o conteúdo, mas não visualiza claramente a oportunidade comercial.

### B. Portal orientado a catálogo/publicidade
Vantagem: proposta comercial explícita.
Limitação: reduz valor editorial, confiança e recorrência de audiência; corre o risco de parecer classificados.

### C. Portal editorial + plataforma comercial integrada — escolhida
Equilibra conteúdo editorial, autoridade e mecanismos claros de entrada para marcas. O conteúdo permanece protagonista, enquanto branded content, especialistas, marcas em destaque e projetos para agências ficam incorporados à experiência.

## 3. Arquitetura do portal

### 3.1 Rota principal
- `/saude-beleza/`
- canonical: `https://www.voznewsbrasil.com.br/saude-beleza/`

### 3.2 Arquivos previstos
- `saude-beleza/index.html` — página principal do vertical.
- arquivos auxiliares somente se necessários para manter o HTML legível e responsabilidades separadas.
- `vercel.json` — novas rewrites para `/saude-beleza` e `/saude-beleza/`.
- `ecossistema-40-portais.js` — os slugs `saude-bem-estar` e `beleza` passam a apontar para `/saude-beleza/` e recebem o estado `SITE ATIVO`.

A implementação deve seguir os padrões técnicos já usados em Gastronomia, Mobilidade e Móveis & Decoração, sem refatorações alheias ao objetivo.

## 4. Identidade e apresentação

- Usar exclusivamente as logomarcas oficiais já presentes no repositório, sem redesenho, alteração de proporção, cor, tipografia, símbolo ou composição.
- Manter a linguagem premium do ecossistema VOZ NEWS.
- Priorizar legibilidade, mobile-first, contraste e acessibilidade.
- Evitar aparência clínica fria ou genérica. O visual deve combinar saúde, confiança, tecnologia, bem-estar e beleza contemporânea.
- Usar imagens editoriais compatíveis com cada tema, sem representar procedimentos de forma sensacionalista.

## 5. Estrutura editorial

### 5.1 Hero
Mensagem central que una informação, autoridade e oportunidade comercial. Deve incluir chamadas para conteúdo e um CTA comercial discreto.

### 5.2 Métricas institucionais
Exibir os números vigentes do ecossistema, sem regressão para métricas antigas. O valor de seguidores deve ser consistente com o número atual usado no portal-mãe no momento da implementação.

### 5.3 Editorias
- Saúde
- Estética
- Dermatologia
- Odontologia
- Beleza
- Bem-estar
- Fitness
- Inovação

As editorias organizam conteúdo, busca e possibilidades comerciais, mas não exigem a criação de oito subsites independentes.

### 5.4 Conteúdo de atração
O portal deve destacar pautas que gerem recorrência e valor para o público:
- prevenção e qualidade de vida;
- novas tecnologias e tratamentos;
- dermatologia e cuidados com pele e cabelo;
- odontologia e estética do sorriso;
- comportamento, bem-estar e longevidade;
- atividade física e performance;
- lançamentos de produtos e serviços;
- entrevistas com especialistas;
- inovação em saúde, beleza e serviços;
- histórias, tendências e orientação de consumo responsável.

## 6. Arquitetura comercial

### 6.1 Marcas & Especialistas em Destaque
Área visual de alto valor para clínicas, hospitais, laboratórios, profissionais, redes, produtos e serviços. Cada destaque deve apresentar conteúdo contextualizado, não apenas logotipo e preço.

### 6.2 Branded content
Seção explícita, editorialmente sinalizada, para demonstrar os formatos disponíveis:
- matéria especial;
- entrevista com executivo ou especialista;
- vídeo e conteúdo social;
- cobertura de lançamento/evento;
- série temática;
- projeto institucional;
- campanha multiplataforma.

### 6.3 Porta de entrada para agências
Incluir uma área dirigida a agências de publicidade e comunicação, com linguagem que mostre que o VOZ NEWS pode estruturar projetos para diferentes contas e segmentos da carteira da agência.

A SPIC/Omnicom serve como aprendizado comercial: a oferta deve ser apresentada como plataforma flexível de conteúdo e distribuição, e não como compra isolada de banner.

### 6.4 CTAs comerciais
Usar CTAs claros e em presente, sem excesso de agressividade:
- `QUERO DESTACAR MINHA MARCA`
- `CRIAR PROJETO DE CONTEÚDO`
- `FALAR COM O COMERCIAL`

Os CTAs devem abrir um contato/modal/formulário coerente com a infraestrutura existente. Não criar backend novo se a ação puder ser atendida pela solução já usada no projeto.

## 7. Transparência editorial

Conteúdo patrocinado deve ser identificado de forma inequívoca com rótulos como `CONTEÚDO PATROCINADO`, `BRANDED CONTENT` ou equivalente. A diferenciação protege a credibilidade do portal e aumenta a qualidade comercial da oferta.

## 8. Busca e descoberta

O portal deve facilitar que o usuário encontre conteúdo, marcas, clínicas, especialistas ou temas por editoria. A experiência pode seguir o padrão de busca já utilizado em Gastronomia e Móveis & Decoração, sem introduzir um sistema de dados complexo nesta primeira versão.

## 9. Integração com o ecossistema de 40 portais

No `ecossistema-40-portais.js`:

- `saude-bem-estar` -> `/saude-beleza/`
- `beleza` -> `/saude-beleza/`

Ambos permanecem como temas distintos na vitrine dos 40 portais, mas passam a desembocar no mesmo vertical completo.

Nenhum outro portal existente deve ser removido, renomeado ou redirecionado por esta implementação.

## 10. SEO

- título, description, canonical e Open Graph específicos para Saúde & Beleza;
- headings semânticos;
- textos editoriais indexáveis;
- links internos para portal-mãe e temas relevantes;
- imagens com `alt` adequado;
- sem conteúdo fictício apresentado como notícia factual atual.

## 11. Conversão e critérios de sucesso

A primeira versão é considerada bem-sucedida quando:

1. `/saude-beleza/` abre corretamente em desktop e mobile;
2. as marcas oficiais permanecem intactas;
3. Saúde & Bem-estar e Beleza no ecossistema passam a abrir o site completo;
4. o visitante entende as editorias e encontra conteúdo de interesse;
5. uma empresa identifica pelo menos três formas concretas de participar comercialmente;
6. uma agência entende que pode estruturar projetos para múltiplos clientes da própria carteira;
7. branded content aparece integrado, mas claramente identificado;
8. os CTAs comerciais funcionam;
9. não há regressão nos portais Energia, Gastronomia, Mobilidade e Móveis & Decoração;
10. a implementação publicada é verificada após deploy.

## 12. Verificação prevista

Antes de considerar o trabalho concluído:
- validar HTML e navegação essencial;
- verificar responsividade em desktop e mobile;
- testar CTAs e modais/contatos;
- testar as duas rewrites do Vercel;
- testar os links `saude-bem-estar` e `beleza` no ecossistema;
- confirmar que os demais `liveRoutes` continuam funcionando;
- verificar o deploy e a página pública, sem declarar publicação antes dessa checagem.

## 13. Fora de escopo desta primeira versão

- e-commerce;
- agendamento médico;
- prontuário ou dados de saúde;
- login de usuários;
- marketplace transacional;
- CRM próprio;
- criação de subsites independentes para cada editoria;
- refatoração geral dos demais verticais.

Esses itens só entram em ciclos futuros se houver necessidade comercial comprovada.