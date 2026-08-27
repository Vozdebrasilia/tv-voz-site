# Voz News Gastronomia — Comunidade e Avaliações

## Objetivo
Transformar a vertical Voz News Gastronomia em uma página editorial, comercial e participativa, com forte uso de imagens, movimento, busca real de restaurantes, prioridade para anunciantes, comentários editoriais e recebimento de receitas/fotos/vídeos do público.

## Escopo visual
- Preservar a identidade VOZ NEWS e o fundo escuro/dourado.
- Dar destaque no topo a Deijanete Fayad e Paulo Fayad como vozes editoriais.
- Criar uma editoria "Gastronomia para Adolescentes" com Paulo Filho e Isabella como avaliadores jovens.
- Usar imagens grandes, galerias, cards com microanimação, hover, Ken Burns e faixas em movimento.
- Manter o site responsivo.

## Conteúdo editorial
- Toda matéria deve expor ao menos um bloco de comentário/avaliação editorial.
- Deijanete e Paulo aparecem como comentaristas recorrentes.
- Conteúdo jovem pode receber selo e avaliação de Paulo Filho e Isabella.
- Criar uma seção visual do Cerrado com foto + história curta de pequi, baru, buriti, cagaita, guariroba e cajuzinho-do-cerrado.

## Guia de restaurantes
- Continuar consumindo a busca pública já existente em `/api/restaurants`.
- Exibir primeiro os estabelecimentos comerciais cadastrados no acervo Voz News.
- Marcar anunciantes como `PATROCINADO` e colocá-los antes dos parceiros e antes dos resultados públicos.
- O clique de anunciante abre diretamente a página/anúncio definido para ele.
- Resultados públicos sem página comercial continuam abrindo mapa/localização.

## Comunidade
Criar a área "Você na Cozinha" para captar:
- nome;
- cidade;
- e-mail;
- Instagram/TikTok opcional;
- título da receita;
- história da receita;
- ingredientes;
- modo de preparo;
- foto(s);
- vídeo curto ou link de vídeo;
- autorização editorial para publicação.

O envio será feito via FormSubmit para o e-mail comercial já usado pelo portal, com `multipart/form-data`, reCAPTCHA e limite prático de 10 MB para anexos. Para vídeos maiores, o formulário pede link de YouTube, Drive, Instagram ou TikTok. Todo conteúdo é moderado antes de publicação.

## Ranking e engajamento
A home terá blocos preparados para: Receita da Semana, Mais Assistidas, Receitas de Adolescentes, Receitas do Cerrado e Desafio Voz News. Nesta primeira versão os cards são editoriais/curados; nenhum contador falso será exibido.

## Privacidade e segurança
- Nenhum conteúdo enviado entra automaticamente no ar.
- Checkbox de autorização de publicação é obrigatório.
- Menores de idade devem ter autorização do responsável antes de publicação de imagem/vídeo identificável.
- Não publicar telefone/endereço pessoal enviado pelo participante.

## Limitações conhecidas
- As fotos reais de Paulo Filho e Isabella não existem com identificação segura no repositório atual; a interface usará cartões de avaliador com avatar gráfico/identidade textual até que arquivos de foto identificados sejam adicionados.
- Vídeos externos pesados não serão hospedados no repositório; serão enviados por formulário até 10 MB ou por link.
