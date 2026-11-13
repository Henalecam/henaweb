---
title: Quanto um site lento faz a empresa perder?
description: A Vodafone deixou uma página só mais rápida e vendeu 8% a mais. Os estudos sobre velocidade, o que é Core Web Vitals e como medir o seu site.
answer: Mais do que parece. Num estudo da Deloitte para o Google, sites 0,1 segundo mais rápidos no celular tiveram 8,4% mais conversões no varejo. Num teste A/B da Vodafone, a mesma página com carregamento 31% mais rápido vendeu 8% a mais. Dá para medir o seu site de graça no PageSpeed Insights.
date: 2026-11-13
tags: [velocidade do site, core web vitals, conversão, seo técnico]
service: sites-e-produtos
draft: false
---

Você paga o anúncio, a pessoa clica e fica olhando para uma tela branca no celular. Dois, três, quatro segundos. Ela não reclama: só volta e clica no próximo resultado. **No relatório, isso aparece como "clique" e não como cliente perdido**, e por isso quase ninguém percebe quanto um site lento custa.

A resposta curta: custa vendas, e dá para medir. Os estudos abaixo mostram que décimos de segundo mudam a taxa de conversão, que metade dos sites ainda é lenta no celular e como saber em que lado o seu está.

## Quanto a velocidade do site muda as vendas?

O estudo mais citado é o "Milliseconds Make Millions", feito pela Deloitte e pela agência 55 a pedido do Google. Eles acompanharam os sites de 37 marcas da Europa e dos EUA, com mais de 30 milhões de sessões, durante 30 dias no fim de 2019, sem nenhuma mudança de layout no período, medindo a velocidade de hora em hora e cruzando com o que os visitantes faziam.

Uma melhora de **0,1 segundo** na velocidade no celular veio acompanhada de:

- **8,4% mais conversões** em sites de varejo, com gasto médio 9,2% maior;
- **10,1% mais conversões** em sites de turismo;
- **21,6% mais formulários enviados** em sites de geração de leads, contando quem começou a preencher e chegou até o fim.

São marcas grandes, e os números de uma empresa pequena vão ser diferentes. Mas a direção é a mesma: cada etapa entre o clique e o contato perde gente quando o site demora.

## O que aconteceu quando a Vodafone testou a mesma página mais rápida?

Correlação pode enganar, então vale olhar um teste controlado. A Vodafone fez um **teste A/B** (dividir o tráfego entre duas versões e comparar os resultados) numa página de campanha: metade dos visitantes, vindos de anúncios, viu a versão de sempre; a outra metade viu uma versão idêntica no visual e nas funções, só que otimizada para carregar mais rápido.

A versão otimizada teve o conteúdo principal na tela 31% mais cedo. O resultado, publicado em março de 2021: **8% mais vendas**, 15% mais leads por visita e 11% mais carrinhos por visita. As mudanças foram de bastidor: montar no servidor o HTML que aparece primeiro, tirar do navegador o trabalho de desenhar um componente e otimizar as imagens.

Repare num detalhe do estudo: mesmo a versão "rápida" levava 5,7 segundos para mostrar o conteúdo principal, contra 8,3 da original. Não precisou ficar perfeita para vender mais. Bastou ficar menos lenta.

## E no Brasil, alguém mediu?

A QuintoAndar, empresa brasileira de aluguel e venda de imóveis, publicou em 2021 o que aconteceu ao reconstruir um portal de conteúdo com mais de 40 mil páginas sobre condomínios, migrado para Next.js. No celular, com dados de usuários reais, o tempo até o conteúdo principal aparecer caiu 26%.

O efeito no negócio: a **taxa de rejeição caiu 46%** (gente que entra e sai sem fazer nada), as páginas vistas por sessão subiram 87% e, na fase de validação, as páginas novas converteram 5% mais do que as antigas na mesma semana.

## Como saber se o meu site é lento?

O Google resume a experiência de carregamento em três métricas chamadas **Core Web Vitals**, os sinais vitais da página:

- **LCP** (Largest Contentful Paint): quanto tempo o conteúdo principal leva para aparecer. Bom é até 2,5 segundos.
- **INP** (Interaction to Next Paint): quanto tempo a página demora para reagir a um toque ou clique. Bom é até 200 milissegundos.
- **CLS** (Cumulative Layout Shift): quanto o conteúdo pula de lugar enquanto carrega, aquele botão que foge do dedo. Bom é até 0,1.

A conta é feita com visitas reais, separando celular e computador, e o site passa quando 75% das visitas ficam dentro dos três limites. Para ver os números do seu, digite o endereço no **PageSpeed Insights**, uma ferramenta gratuita do Google; se o site estiver cadastrado no Google Search Console, há um relatório de todas as páginas.

Se o resultado for ruim, você está acompanhado. Segundo o Web Almanac 2025, do HTTP Archive, com dados de julho de 2025, só **48% dos sites passam nas três métricas no celular**, contra 56% no computador.

## O que mais deixa um site lento no celular?

Os motivos mais comuns são poucos:

- **Imagens pesadas**, enviadas no tamanho da câmera e sem formato moderno.
- **Scripts de terceiros** acumulados com o tempo: chat, pixels de anúncio, mapas, vídeos e ferramentas de teste que carregam antes do conteúdo.
- **Temas e construtores de página** que mandam para o celular o código de todas as funções, mesmo das que a página não usa.
- **Página montada no navegador**: o celular recebe uma tela vazia e precisa executar muito JavaScript antes de mostrar qualquer coisa. Foi um dos pontos que a Vodafone corrigiu.
- **Servidor lento ou distante**, que demora a mandar a primeira resposta.

Nada disso aparece quando o dono abre o site no computador do escritório, com internet boa. Aparece no celular de quem está na rua, que é onde o cliente está.

## Site rápido também aparece mais no Google?

Ajuda, mas não faz milagre. A documentação do Google diz que as Core Web Vitals, junto com outros aspectos de experiência na página, estão alinhadas com o que os sistemas de classificação querem recompensar, e recomenda que os sites tenham métricas boas. Conteúdo útil continua sendo o principal; velocidade é o que impede de perder a disputa por um detalhe técnico.

O mesmo vale para as buscas com IA: o site precisa ser fácil de ler por máquina, como explicamos em [como fazer a IA recomendar a sua empresa](/blog/como-fazer-a-ia-recomendar-a-sua-empresa-nas-buscas).

## Como a HenaWeb cuida da velocidade de um site?

Em [sites e produtos](/servicos/sites-e-produtos), a velocidade entra no SEO técnico desde o primeiro dia, junto com metadados, dados estruturados, sitemap e acessibilidade, e não como ajuste depois do lançamento. O [NEXT Card](/casos/next-card) é um exemplo: uma jornada de produto financeiro pensada primeiro para o celular, porque é ali que a confiança precisa aparecer em poucos segundos.

Quer saber quanto o seu site está deixando na mesa? Rode o PageSpeed Insights e [mande o resultado para a gente](/#contato): apontamos o que mais pesa e o que dá para resolver primeiro.

## Perguntas frequentes

### Quanto tempo um site deve levar para carregar?

Pelo critério do Google, o conteúdo principal deve aparecer em até 2,5 segundos (LCP) em pelo menos 75% das visitas, medido separadamente no celular e no computador.

### Como medir a velocidade do meu site de graça?

Digite o endereço no PageSpeed Insights, do Google. Ele mostra as Core Web Vitals de visitantes reais dos últimos 28 dias, separadas por celular e computador, e aponta o que está pesando.

### Site lento perde posição no Google?

As Core Web Vitals fazem parte da experiência na página, que o Google diz estar alinhada com o que os seus sistemas de classificação recompensam. Elas não substituem conteúdo relevante, mas um site lento entra em desvantagem.

### O que é Core Web Vitals?

São as três métricas do Google para a experiência de uma página: LCP (tempo até o conteúdo principal aparecer), INP (tempo de resposta a um toque) e CLS (quanto o conteúdo pula enquanto carrega).

### Trocar de hospedagem resolve um site lento?

Às vezes ajuda, quando o servidor demora a responder. Na maioria dos casos, o peso está nas imagens, nos scripts de terceiros e no código da página, e esses só melhoram mexendo no site.

---

### Fontes

- Deloitte e 55 para o Google, [Milliseconds make millions](https://web.dev/case-studies/milliseconds-make-millions) (web.dev, dados de 2019).
- web.dev, [Vodafone: A 31% improvement in LCP increased sales by 8%](https://web.dev/case-studies/vodafone) (17 mar. 2021).
- web.dev, [How QuintoAndar increased conversion rates and pages per session by improving page performance](https://web.dev/case-studies/quintoandar) (dez. 2021).
- web.dev, [Web Vitals](https://web.dev/articles/vitals).
- HTTP Archive, [Web Almanac 2025: Performance](https://almanac.httparchive.org/en/2025/performance).
- Google Search Central, [Understanding Core Web Vitals and Google search results](https://developers.google.com/search/docs/appearance/core-web-vitals).
