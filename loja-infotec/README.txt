====================================================
 ATIVIDADE PRATICA - CONSTRUCAO E REFATORACAO DE UI
 Projeto: InfoTec - Loja de Informatica (site ficticio)
====================================================

O QUE TEM NESTE PROJETO
-----------------------
Um site simples de loja de informatica com 3 paginas:
  - index.html    -> pagina inicial (Home)
  - produtos.html -> catalogo de produtos
  - contato.html  -> formulario e informacoes de contato

Cada pagina tem 3 ou mais secoes visuais (dobras de tela), alem
do cabecalho e do rodape que se repetem em todas.

Foram feitas DUAS versoes do mesmo site:

  1) versao-css-flexbox/
     HTML + CSS puro, layout todo com Flexbox.
     Um unico arquivo de estilo: css/estilo.css

  2) versao-tailwind/
     Mesmo site, mesma aparencia, refatorado com Tailwind CSS.
     Nao tem arquivo .css: as classes utilitarias ficam no
     proprio HTML e o Tailwind entra pelo CDN.


COMO ABRIR
----------
versao-css-flexbox: abrir qualquer arquivo .html no navegador
(basta clicar duas vezes). Funciona offline.

versao-tailwind: abrir os .html no navegador COM INTERNET,
porque o Tailwind e carregado pelo CDN:
  <script src="https://cdn.tailwindcss.com"></script>


SECOES DE CADA PAGINA
---------------------
index.html
  1. Banner principal (hero)
  2. Categorias
  3. Produtos em destaque
  4. Vantagens
  5. Faixa de promocao / newsletter

produtos.html
  1. Banner da pagina
  2. Filtros + lista de produtos
  3. Vantagens da loja
  4. Faixa de promocao

contato.html
  1. Banner da pagina
  2. Formulario + dados da loja (lado a lado com Flexbox)
  3. Mapa + horarios
  4. Perguntas frequentes


DIFERENCA ENTRE AS DUAS ABORDAGENS (resumo)
-------------------------------------------
CSS tradicional (Flexbox):
  - Estilo separado do HTML, num arquivo so.
  - Cria-se classes com nome (ex: .card, .botao) e escreve-se
    as regras (display, padding, cor...) uma vez, reaproveitando
    em varios lugares.
  - HTML fica limpo; o CSS pode crescer bastante.

Tailwind CSS:
  - Nao se escreve CSS proprio: monta-se o visual direto no
    HTML juntando classes utilitarias (flex, gap-5, p-6, rounded-xl...).
  - Mais rapido de prototipar e mudanca fica no mesmo lugar.
  - HTML fica com listas de classes grandes e repetidas.

Nas duas versoes o resultado na tela e praticamente igual e
os dois sao responsivos (funcionam em celular e no computador).
