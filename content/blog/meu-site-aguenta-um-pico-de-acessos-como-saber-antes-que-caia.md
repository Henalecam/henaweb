---
title: Meu site aguenta um pico de acessos? Como saber antes que caia
description: Na Black Friday de 2023, 104 lojas monitoradas somaram quase 21 horas fora do ar e R$ 98 milhões perdidos. Por que sites caem com muita gente e como testar.
answer: Depende de onde cada página é montada. Páginas estáticas entregues por uma CDN aguentam picos com folga; o que cai é o que depende do servidor a cada acesso, como carrinho, formulário, busca e plugins. Um teste de carga mostra o limite antes do dia, e uma página de contingência evita ficar fora do ar.
date: 2026-11-27
tags: [pico de acessos, black friday, cdn, hospedagem, performance]
service: sites-e-produtos
draft: true
---

Você pagou o anúncio, fechou com o influenciador ou vai aparecer na TV. Na hora em que mais gente entra no site, ele trava, mostra erro ou não abre. **O pico de acessos é o momento mais caro para descobrir o limite do seu site**, e quase sempre dava para saber antes.

## Quanto as lojas perdem quando o site cai na Black Friday?

A Sofist, empresa que monitora o desempenho de lojas virtuais, acompanhou **104 e-commerces** de 15 setores da Black Friday à Cyber Monday de 2023. Segundo a IstoÉ Dinheiro, cerca de 35 ficaram fora do ar em algum momento, somando **20 horas e 46 minutos de indisponibilidade**, e lentidão e instabilidade custaram R$ 98,3 milhões em vendas. Foi mais que o dobro de 2022 (R$ 48,4 milhões) e o segundo pior resultado em cinco anos, atrás de 2019 (R$ 132 milhões).

O detalhe que importa para quem não é uma grande varejista: a Sofist considera o site "fora do ar" quando é impossível navegar, o que inclui página de erro, página de espera e o site que não carrega em 45 segundos. Para o cliente, é tudo a mesma coisa: ele fecha a aba.

Em 2021, segundo o Canaltech, 96,5% das 116 lojas monitoradas tiveram instabilidade e 46,5% saíram do ar. E o pico é concentrado: na Black Friday de 2025, segundo a Neotrust, o e-commerce brasileiro faturou R$ 4,76 bilhões no dia, e **as primeiras 12 horas concentraram 35,5% do faturamento**. Quem cai na madrugada perde a melhor fatia do dia.

## Por que um site cai quando chega muita gente?

Cada visita é trabalho para algum computador. A pergunta é quanto trabalho, e onde.

Uma **página dinâmica** é montada a cada acesso: o servidor consulta o banco de dados, aplica regras, encaixa o conteúdo no modelo e só então responde. É o caso de um WordPress sem cache, de um carrinho ou de uma busca com filtros. Mil pessoas ao mesmo tempo são mil montagens, e o servidor aguenta um número finito por segundo. Passou disso, a fila cresce, a resposta demora e os acessos dão erro.

Uma **página estática** já está pronta antes de alguém pedir. Entregar um arquivo pronto custa pouco, e dá para copiá-lo para centenas de servidores pelo mundo, o que a deixa quase imune a picos.

O terceiro vilão é o que não é seu. Na Black Friday de 2020, segundo a Consumidor Moderno, mais de 36% dos 105 sites monitorados pela Sofist foram afetados por **lentidão em aplicações de terceiros**, como plugins de afiliados. Chat, pixel, antifraude, mapa: cada script externo é um pedaço do seu site num servidor que você não controla.

## O que significa "escalar" um site?

**Escalar** é aumentar a capacidade quando a demanda sobe e reduzir quando ela cai, sem ninguém acordar de madrugada para trocar o servidor. Três jeitos, que se somam:

- **CDN** (content delivery network): uma rede de servidores distribuídos que guarda cópias das suas páginas e arquivos perto de quem acessa. O web.dev, do Google, a descreve como "a distributed network of servers to deliver resources to users" e diz que, além de reduzir a latência, ela alivia o servidor de origem e lida bem com picos. Meta razoável, segundo a mesma página: 90% dos acessos respondidos pelo cache, sem chegar ao servidor.
- **Escala automática**: a hospedagem cria mais instâncias do sistema quando o uso sobe. Funciona para a parte dinâmica, mas tem limite e custo, e o banco de dados costuma ser o gargalo que não escala sozinho.
- **Menos trabalho por visita**: pré-renderizar o que não muda, guardar em cache o que muda pouco (o web.dev lembra que até conteúdo dinâmico pode ficar em cache por alguns segundos durante um pico) e tirar da página os scripts que não ajudam a vender.

É a lógica dos sites que fazemos em [sites e produtos](/servicos/sites-e-produtos), com Next.js hospedado na Vercel: o que é apresentação vira página pronta, entregue pela CDN, e só o que o visitante envia ou consulta chega a um servidor. Se você já leu [quanto um site lento faz a empresa perder](/blog/quanto-um-site-lento-faz-a-empresa-perder), é a mesma engenharia: o que deixa o site rápido no dia comum é o que o segura no dia de pico.

## O site da minha empresa precisa de toda essa estrutura?

Quase nunca inteira. Um [site institucional ou uma landing page](/blog/site-institucional-ou-landing-page-qual-a-minha-empresa-precisa) tem poucas partes que dependem de servidor, e são elas que pedem atenção:

- **Formulário de contato**: para onde ele envia? Se o envio passa por um plugin ou por um serviço de terceiros, o limite é deles.
- **Calculadora, quiz, simulador**: podem rodar inteiros no navegador da pessoa, sem servidor. Se consultam uma API, essa API é o limite.
- **Painel de conteúdo**: se o site é montado a cada acesso a partir do painel, um pico derruba o painel e o site juntos.

Essas são as partes "vivas" de um site institucional, como o quiz de qualificação do [Contacerta](/casos/contacerta) e a calculadora de direitos do [Camargo Legal](/casos/camargo-legal): elas é que merecem o teste.

A pergunta certa para quem fez o seu site não é "o site aguenta?", é **"o que acontece quando chegam mil pessoas em um minuto?"**.

## Como testar se o site aguenta antes do dia?

Um **teste de carga** simula visitantes em quantidade crescente e mede quando o site começa a demorar e quando começa a dar erro. A variante para campanhas é o teste de pico (spike test), que a documentação do k6, ferramenta de código aberto da Grafana, define como o teste que "verifies whether the system survives and performs under sudden and massive rushes of utilization", com Black Friday, lançamentos e anúncios na TV entre os exemplos. A mesma documentação avisa que erros são comuns nesse cenário e que se mede também o tempo de recuperação depois do pico.

Um roteiro de uma tarde, uma ou duas semanas antes:

1. **Estime o pico**: quantas pessoas a campanha pode trazer no pior minuto, não no dia inteiro. Uma menção na TV ou um post que viraliza concentra os acessos em poucos minutos.
2. **Rode o teste** com o dobro disso, nas páginas que a campanha vai divulgar, incluindo o envio do formulário.
3. **Revise os scripts de terceiros**: o que não ajuda a converter sai da página de campanha.
4. **Confira o cache**: as páginas da campanha vêm da CDN ou chegam ao servidor a cada acesso?
5. **Deixe o plano B pronto**: uma versão estática da página, com telefone, WhatsApp e oferta, que entre no ar em um minuto se o site cair.

## O que fazer se o site cair no meio da campanha?

Primeiro, pare de alimentar o problema: pause os anúncios enquanto o site não responde, porque cada clique pago numa página de erro é dinheiro perdido duas vezes. Depois, ponha no ar a **página de contingência** estática com o contato. Só então vá atrás da causa, sem reiniciar o servidor às cegas: se a causa for a demanda, ele volta e cai de novo. Registre o horário, o que o cliente viu e o que o fornecedor fez: é a base da conversa sobre a próxima campanha.

Se o seu site cai toda vez que a empresa aparece, [fale com a gente](/#contato): o diagnóstico começa por descobrir qual parte pede o servidor a cada acesso.

## Perguntas frequentes

### Quantos acessos simultâneos um site aguenta?

Não existe número fixo: depende de quanto trabalho cada acesso dá ao servidor. Uma página estática servida por CDN aguenta muito mais visitantes do que uma montada a cada acesso. Só um teste de carga no seu site responde com número.

### O que é CDN e para que serve?

CDN (content delivery network) é uma rede de servidores distribuídos que guarda cópias das páginas e dos arquivos do site perto de quem acessa. Ela deixa o site mais rápido e absorve picos, porque a maior parte dos acessos não chega ao servidor principal.

### Trocar de hospedagem resolve o site que cai?

Só se o problema for a capacidade do servidor. Se a página é montada a cada acesso ou depende de scripts de terceiros lentos, um servidor maior só adia a queda. Primeiro descubra o que cai; depois escolha onde hospedar.

### Site estático serve para empresa que precisa atualizar o conteúdo?

Sim. O conteúdo pode vir de um painel; a diferença é que a página é gerada quando você publica, não quando o visitante acessa. Quem entra recebe um arquivo pronto, e o painel fica fora do caminho do pico.

---

### Fontes

- [Problemas técnicos e de instabilidade geram perdas de quase R$ 100 milhões na Black Friday](https://istoedinheiro.com.br/problemas-tecnicos-perdas-100-mi-black-friday), IstoÉ Dinheiro, 28/11/2023 (levantamento da Sofist, Black Friday 2023)
- [Black Friday pode amargar prejuízo de pelo menos R$ 36,1 milhões neste ano](https://canaltech.com.br/e-commerce/black-friday-pode-amargar-prejuizo-de-pelo-menos-r-361-milhoes-neste-ano-203197/), Canaltech, 30/11/2021 (Sofist, 2021)
- [Black Friday e Cyber Monday: Indisponibilidade causa prejuízo milionário a lojas virtuais](https://consumidormoderno.com.br/indisponibilidade-prejuizo-milionario-lojas-virtuais-black-friday-cyber-monday/), Consumidor Moderno, 03/12/2020 (Sofist, 2020)
- [O que os dados da Black Friday 2025 dizem sobre a de 2026](https://confi.com.vc/neotrust/insights/black-friday-2025-o-que-diz-sobre-2026), Neotrust/Confi, 22/07/2026
- [Content delivery networks (CDNs)](https://web.dev/articles/content-delivery-networks), web.dev (Google), atualizado em 05/12/2023
- [Spike testing](https://grafana.com/docs/k6/latest/testing-guides/test-types/spike-testing/), documentação do Grafana k6
