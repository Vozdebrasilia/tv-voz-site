# Mobilidade Completa — Design

## Objetivo
Finalizar a página `/mobilidade` do Voz News Brasil para publicação, eliminando áreas vazias, adicionando imagens específicas por tema, publicidade correlata e matérias completas clicáveis.

## Escopo
- Preservar o restante do site e o padrão visual atual do VOZ NEWS.
- Trabalhar no projeto atual `tv-voz-site`.
- Corrigir a experiência mobile, principalmente os cards que aparecem apenas como blocos cinza/vazios.
- Manter o cabeçalho, identidade azul-escuro/dourado e a navegação já existentes.

## Estrutura editorial da página
A página Mobilidade terá um bloco visual completo para cada categoria existente, com:
1. imagem temática específica;
2. título e breve chamada editorial;
3. espaço publicitário relacionado ao segmento;
4. chamada de matéria;
5. botão ou card clicável que abre a matéria completa.

## Imagens
- Aviação: usar imagem de avião da TAM/LATAM em voo, substituindo o visual de nuvens sem conteúdo.
- Automóveis: substituir qualquer imagem com aparência de ferro-velho por automóvel moderno e bem apresentado.
- Motos: imagem editorial clara de motocicleta contemporânea.
- Bikes: imagem de bicicleta/ciclismo urbano contemporâneo.
- Elétricos: imagem de veículo elétrico moderno.
- Outras categorias existentes na página: cada uma recebe imagem específica e coerente com o tema.
- As imagens devem preencher os cards corretamente em desktop e celular, com `object-fit: cover`, foco visual adequado e sem áreas vazias.

## Publicidade
Cada categoria terá pelo menos um anúncio contextual de empresa correlata. Exemplos de correlação editorial:
- Aviação: companhia aérea, aeroporto, turismo ou serviços aeroportuários.
- Automóveis: montadora, concessionária, locadora ou serviços automotivos.
- Motos: montadora ou concessionária de motos.
- Bikes: fabricante/loja de bicicletas ou mobilidade urbana.
- Elétricos: montadora de elétricos, infraestrutura de recarga ou energia.

A publicidade deve ser visualmente identificável como anúncio/patrocinador e integrada ao layout sem parecer conteúdo editorial disfarçado.

## Matérias
Cada categoria terá uma matéria própria com aproximadamente 1.500 caracteres, escrita em tom jornalístico, com título, subtítulo/resumo e corpo de texto.

O card da página Mobilidade deverá abrir a matéria correspondente ao clique. O conteúdo deve ser legível no celular, com navegação de retorno para Mobilidade.

## Interação
- Card e/ou botão “Ler matéria”, “Ver matéria” ou equivalente abre a matéria completa.
- Links não podem apontar para `#` sem conteúdo.
- Todos os cards precisam ter área clicável clara e acessível.

## Responsividade
- Prioridade para visualização em iPhone e demais telas móveis.
- Nenhum card pode aparecer como grande retângulo vazio.
- Imagem, título, anúncio e CTA devem se reorganizar em coluna no mobile.
- Imagens devem manter proporção sem distorção.
- Texto deve ter contraste adequado sobre o fundo escuro.

## Critérios de aceite
1. Página `/mobilidade` abre sem blocos vazios.
2. O bloco de aviação exibe avião TAM/LATAM.
3. O bloco de automóveis exibe carro moderno, sem aparência de sucata/ferro-velho.
4. Todas as categorias existentes exibem imagem temática.
5. Todas as categorias têm anúncio correlato.
6. Todas as categorias têm chamada de matéria.
7. Cada clique abre matéria completa com aproximadamente 1.500 caracteres.
8. O layout funciona em celular e desktop.
9. O restante do Voz News Brasil permanece inalterado.
10. A alteração é validada em preview antes de publicação em produção.
