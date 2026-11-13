---
title: Vale a pena reescrever o sistema da empresa do zero?
description: Um banco britânico trocou tudo de uma vez e levou £ 48,65 milhões em multas. Quando reescrever do zero faz sentido e como trocar o sistema por partes.
answer: Quase nunca de uma vez. Reescrever tudo do zero leva anos, perde regras que só o código antigo conhecia e joga todo o risco num único dia de virada. O caminho mais seguro é trocar por partes: o sistema novo cresce ao lado do antigo, assume um módulo por vez e o antigo é desligado aos poucos.
date: 2026-11-13
tags: [sistemas legados, migração de sistemas, sistemas sob medida, modernização]
service: sistemas-sob-medida
draft: false
---

Todo mundo na empresa sabe qual é o sistema que ninguém tem coragem de mexer. Ele é lento, foi feito por alguém que já saiu, cada mudança quebra outra coisa, e em algum momento surge a ideia: "joga fora e faz um novo do zero". Parece a decisão corajosa. Na maioria das vezes, é a mais arriscada.

A resposta curta: **troque o sistema antigo por partes, não de uma vez**. O novo nasce ao lado do velho, assume um pedaço da operação por vez e o antigo só é desligado quando não sobra mais nada para ele fazer. Abaixo, o que acontece quando se faz o contrário, por que reescrever do zero engana e em que casos ele faz sentido.

## O que acontece quando a empresa troca o sistema todo de uma vez?

Chama-se **migração big bang** a troca em que todos os dados e todas as funções passam do sistema antigo para o novo num único fim de semana. O caso mais estudado é o do banco britânico TSB. Em abril de 2018, o banco moveu os dados dos serviços corporativos e dos clientes para uma plataforma nova. Os dados migraram; a plataforma não aguentou.

Segundo a FCA, o órgão que regula a conduta dos bancos no Reino Unido, todas as agências e uma parte significativa dos 5,2 milhões de clientes foram afetadas: agência, telefone, internet banking e aplicativo. O banco só voltou ao normal em dezembro de 2018, oito meses depois. Em dezembro de 2022, a FCA e a PRA (o regulador prudencial do Banco da Inglaterra) multaram o TSB em **£ 48,65 milhões** no total, e o banco já tinha pago £ 32,7 milhões em ressarcimento a clientes.

O motivo apontado pelos reguladores não foi um bug específico. Foi a gestão: o banco "não organizou nem controlou adequadamente" o programa de migração e não gerenciou os riscos de depender de um fornecedor terceirizado crítico. Ou seja, colocou tudo numa única virada, sem conseguir enxergar o risco que estava correndo.

Uma empresa média não vai levar multa de regulador britânico. Mas a lógica é a mesma: num big bang, se algo dá errado no dia da virada, para tudo ao mesmo tempo, e não existe um "meio caminho" para onde voltar.

## Por que reescrever o sistema do zero é tão arriscado?

Em abril de 2000, o programador Joel Spolsky publicou um texto que virou referência no assunto, "Things You Should Never Do" ("Coisas que você nunca deve fazer"). O exemplo era o Netscape, o navegador mais usado da época. A empresa decidiu reescrever o código do zero: a versão 4.0 tinha saído quase três anos antes, nunca houve uma versão 5.0, e nesse intervalo a empresa perdeu participação de mercado. Spolsky chamou isso de **"o pior erro estratégico que uma empresa de software pode cometer"**.

O argumento dele continua valendo: aquele código feio e cheio de remendos guarda conhecimento. Cada "gambiarra" estranha costuma ser a correção de um problema real que alguém encontrou em produção, uma regra de negócio, uma exceção de cliente, um caso de imposto. Nas palavras dele, quando você joga fora o código e começa do zero, "joga fora todo esse conhecimento".

Na prática, uma reescrita completa traz três riscos ao mesmo tempo:

- **A empresa fica parada.** Enquanto o sistema novo não fica pronto, ninguém quer investir no velho, e as melhorias que o negócio pede esperam meses ou anos.
- **Ninguém sabe descrever tudo o que o sistema faz.** As regras estão no código, não num documento. O sistema novo nasce sem metade delas, e a equipe só descobre no dia em que o cliente reclama.
- **Todo o risco cai num dia só.** É o big bang do TSB: a virada acontece de uma vez e qualquer erro afeta a operação inteira.

## Como funciona a migração por partes?

O engenheiro de software Martin Fowler deu nome ao método com uma imagem da floresta: a **figueira-estranguladora** (*strangler fig*, em inglês). É uma figueira que nasce sobre outra árvore, cresce em volta dela, cria raízes próprias até o chão e, um dia, a árvore original já não sustenta nada. Fowler conta que o plano de substituir tudo de uma vez, que parece simples, ele e os colegas viram "dar errado na maior parte das vezes". A troca gradual reduz o risco, entrega valor mais cedo e deixa o investimento e o retorno visíveis a cada etapa.

Num sistema de empresa, isso vira um roteiro assim:

1. **Mapear o sistema antigo:** que módulos existem, quem usa cada um, que regras e exceções estão escondidas ali, que dados entram e saem.
2. **Escolher o primeiro pedaço:** o módulo que mais dói ou uma função nova que o negócio está pedindo. Ele é construído no sistema novo, separado do antigo.
3. **Ligar os dois:** durante a transição, o novo e o velho conversam por integrações, para os dados não ficarem duplicados nem desencontrados.
4. **Virar só aquele pedaço:** os usuários daquele módulo passam a usar o sistema novo; o resto continua no antigo, funcionando como sempre.
5. **Conferir e desligar:** quando o módulo novo prova que dá os mesmos resultados (os mesmos totais, os mesmos relatórios), a parte correspondente do antigo é desligada. E o ciclo recomeça com o próximo pedaço.

Esse caminho tem um custo: por um tempo, a empresa mantém dois sistemas e as integrações entre eles. É o preço de nunca apostar a operação inteira num único dia, e quase sempre compensa.

## Quando reescrever do zero faz sentido?

Há casos em que começar do zero é a escolha certa, desde que a entrega também seja por partes:

- **O sistema é pequeno**, usado por poucas pessoas, com poucas regras, e dá para reconstruí-lo em semanas.
- **A tecnologia acabou**: a linguagem ou o servidor não recebem mais atualização de segurança e não há como integrar nada novo.
- **O processo mudou tanto** que as regras antigas não servem mais para nada.
- **Não existe um sistema central**, só planilhas, e-mails e ferramentas soltas. Foi o ponto de partida do [Diconta](/casos/diconta): escritórios de contabilidade controlavam clientes, notas, documentos e obrigações em ferramentas espalhadas, e a solução foi um ERP único, com multi-CNPJ e histórico de auditoria.

Mesmo nesses casos, a migração dos dados e dos hábitos da equipe pode e deve ser feita por etapas. Se a sua dúvida é justamente sair das planilhas, vale ler [quando trocar a planilha por um sistema na empresa](/blog/quando-trocar-a-planilha-por-um-sistema-na-empresa), que tem o passo a passo para migrar sem parar a operação.

## Como trocar o sistema antigo sem parar a empresa?

O primeiro passo é entender o sistema antes de propor qualquer coisa. Num projeto de [sistema sob medida](/servicos/sistemas-sob-medida) da HenaWeb, isso é a imersão de 1 a 2 semanas: entrevistas com quem usa, mapa do processo, regras, exceções e gargalos. Depois vem um protótipo navegável, que a equipe testa antes da primeira linha de código de produção, e então entregas em ambiente real a cada 15 dias, com testes automatizados.

Esse ritmo combina com a migração por partes: cada entrega quinzenal pode ser um pedaço do sistema antigo que passa a funcionar no novo. O código, o banco de dados e a documentação ficam com a sua empresa, para o sistema novo não virar o próximo sistema que ninguém tem coragem de mexer.

Tem um sistema assim na sua operação? [Conte como ele funciona hoje](/#contato) e a gente aponta qual pedaço trocar primeiro.

## Perguntas frequentes

### É melhor reescrever o sistema do zero ou melhorar o que já existe?

Na maioria dos casos, trocar por partes é mais seguro do que reescrever tudo de uma vez. O sistema novo assume um módulo por vez enquanto o antigo continua funcionando, e cada etapa é conferida antes de seguir.

### O que é migração big bang?

É a troca em que todos os dados e funções passam do sistema antigo para o novo de uma só vez, normalmente num fim de semana. Se algo dá errado na virada, a operação inteira é afetada ao mesmo tempo.

### O que é o padrão strangler fig?

É o método, descrito por Martin Fowler, de substituir um sistema antigo aos poucos: o novo cresce ao lado do velho, assume uma função por vez e o antigo é desligado quando não sobra nada para ele fazer.

### Quanto tempo leva para trocar um sistema antigo por partes?

Depende do tamanho do sistema e de quantos módulos ele tem. A vantagem é que o primeiro pedaço entra em uso em semanas, e não só no fim do projeto.

### Vou perder os dados do sistema antigo?

Não deveria. Os dados de cada módulo são migrados junto com ele, e a parte antiga só é desligada depois de conferir que os totais e os relatórios batem no sistema novo.

---

### Fontes

- FCA, [TSB fined £48.65m for operational resilience failings](https://www.fca.org.uk/news/press-releases/tsb-fined-48m-operational-resilience-failings) (20 dez. 2022).
- Joel Spolsky, [Things You Should Never Do, Part I](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/) (6 abr. 2000).
- Martin Fowler, [Strangler Fig](https://www.martinfowler.com/bliki/StranglerFigApplication.html) (atualizado em 22 ago. 2024).
