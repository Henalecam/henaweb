---
title: Como testar o sistema antes de aceitar a entrega (e pagar)?
description: Homologação na prática para quem contrata um sistema sob medida: critérios de aceite, roteiro com dados reais, o que fazer com os erros e o que a lei diz.
answer: Homologue com dados reais. Escreva os critérios de aceite antes do desenvolvimento, rode cada cenário no ambiente de testes com quem vai usar o sistema e compare o resultado com o que a empresa sabe que é verdade. Só assine o aceite, e pague a parcela ligada a ele, quando a lista fechar.
date: 2026-11-26
tags: [homologação, critérios de aceite, contrato, testes]
service: sistemas-sob-medida
draft: false
---

O fornecedor avisa que o sistema está pronto, manda um link e pede o aceite para liberar a última parcela. Você abre, clica em três telas, parece funcionar. Assina. Dois meses depois, o fechamento não bate, o fornecedor diz que é "erro de operação" e a conversa vira briga.

## O que é homologação de sistema?

**Homologação** (ou teste de aceite) é a etapa em que quem contratou verifica, por conta própria e antes de aceitar a entrega, se o sistema faz o que o contrato prometeu. Não é o teste do desenvolvedor, que confere o código; é o teste do dono, que confere o negócio: a nota sai com o valor certo, o relatório fecha com a planilha antiga.

O setor público é obrigado por lei a fazer isso em duas etapas, e o modelo serve para qualquer empresa. A Lei 14.133/2021 (art. 140) diz que o objeto de um contrato de serviço é recebido **provisoriamente**, pelo fiscal, "quando verificado o cumprimento das exigências de caráter técnico", e só depois **definitivamente**, "mediante termo detalhado que comprove o atendimento das exigências contratuais". Pode "ser rejeitado, no todo ou em parte, quando estiver em desacordo com o contrato", e os prazos e métodos do recebimento "serão definidos em regulamento ou no contrato".

Entre empresas, o Código Civil traz a mesma lógica nas regras da empreitada (contrato em que alguém se obriga a entregar uma obra pronta por um preço): o que já foi pago presume-se verificado; o dono tem 30 dias depois de cada medição para apontar defeitos; e, se a obra se afastou do combinado, pode rejeitá-la ou recebê-la com abatimento no preço (arts. 614 a 616). Traduzindo: **cada parcela paga sem teste presume-se aceita**.

## Quando os critérios de aceite devem ser escritos?

Antes da primeira linha de código. **Critério de aceite** é a frase que diz como vocês vão saber que uma funcionalidade está pronta. "Implantar o financeiro" não é critério; "ao registrar o recebimento de um boleto, o título some do contas a receber, o caixa do dia aumenta no mesmo valor e o lançamento aparece no extrato com data, usuário e origem" é.

Escrever isso cedo resolve dois problemas. O técnico: o desenvolvedor constrói mirando um alvo concreto, e o [protótipo navegável](/servicos/sistemas-sob-medida) já pode ser conferido contra a lista. O contratual: quando a implantação de um ERP acaba na Justiça, a defesa do fornecedor costuma ser que o cliente operou errado ou não colaborou, como no caso de Joinville que contamos em [quem paga o prejuízo quando a implantação do ERP dá errado](/blog/a-implantacao-do-erp-deu-errado-quem-paga-o-prejuizo). Uma lista assinada pelos dois lados transforma "não funciona" em "o cenário 14 falha, veja o print".

Regras práticas para a lista:

- Um critério por comportamento, escrito como "ao fazer X, acontece Y", com os dados de exemplo.
- Inclua os caminhos tristes: boleto pago em duplicidade, nota cancelada.
- A migração dos cadastros e saldos do sistema antigo também tem critério.
- Marque quais critérios são **bloqueantes** (sem eles não há aceite) e quais podem entrar numa segunda entrega.

## Como montar o roteiro de homologação com dados reais?

**Roteiro de homologação** é a lista de critérios transformada em passos: quem executa, em que ambiente, com quais dados. Três decisões fazem a diferença.

Primeira: use dados reais, não os exemplos do fornecedor. Pegue um mês já fechado e refaça o mês inteiro no sistema novo: as mesmas notas, os mesmos pagamentos. O resultado tem de bater com o que a contabilidade já conferiu. Esse **teste em paralelo** é o único que pega o erro que só aparece com o seu volume e as suas exceções.

Segunda: quem testa é quem opera. É a pessoa do financeiro que sabe que o cliente X paga sempre com desconto e que a filial Y emite nota em outro regime. Reserve horas da equipe para isso e registre cada resultado numa planilha: cenário, quem rodou, data, passou ou falhou, evidência.

Terceira: teste com os perfis de acesso reais de cada pessoa. Testar tudo como administrador esconde metade dos problemas.

O custo de pular essa etapa pode ir muito além do dinheiro. No Reino Unido, os Correios implantaram a partir de 1999 o sistema de caixa Horizon e, com base nos dados dele, processaram centenas de gerentes de agência por fraude e furto entre 2000 e 2013. O relatório final do inquérito público, de julho de 2025, concluiu que funcionários dos Correios e da fornecedora "sabiam, ou ao menos deveriam saber, que o Horizon era capaz de errar" e que a empresa "manteve a ficção de que seus dados eram sempre exatos"; segundo o The Register, cerca de 736 pessoas foram condenadas indevidamente e 13 tiraram a própria vida. A escala é outra, mas a lição vale para qualquer empresa: quando ninguém compara o sistema com a realidade, o sistema vira a verdade, e quem paga a diferença é uma pessoa.

## O que fazer quando a homologação encontra erros?

Encontrar erro na homologação é o resultado esperado. O que decide o projeto é o que acontece depois.

Classifique cada falha: **bloqueante** (impede o uso ou produz número errado), **importante** (tem contorno manual) e **cosmética**. Bloqueante adia o aceite daquela entrega; o resto entra numa lista com prazo. A Lei 14.133 permite rejeitar "no todo ou em parte" e o Código Civil permite receber com abatimento: escreva a mesma regra no seu contrato. O que não cabe é aceitar tudo "para não atrasar" e confiar na promessa de ajustar depois.

Registre tudo por escrito: o que falhou, a evidência, a resposta do fornecedor e a data da correção. Em 2026, o TJMG manteve a condenação de uma desenvolvedora a devolver R$ 263 mil a uma empresa de rastreamento de frotas por um sistema de gestão contratado em dezembro de 2022, com prazo de seis meses, e ainda não entregue um ano e meio depois; a corte entendeu que a obrigação era de resultado e que a natureza "colaborativa" da implantação não isentava a contratada. O que sustenta uma decisão assim é a trilha de mensagens e prazos que o cliente guardou.

## O aceite encerra a responsabilidade do fornecedor?

Não. A Lei 14.133 diz que o recebimento provisório ou definitivo "não excluirá a responsabilidade civil pela solidez e pela segurança" do serviço, e um contrato privado bem escrito prevê garantia: por quanto tempo depois do aceite os erros encontrados em produção são corrigidos sem custo, e em que prazo.

Dois itens do próprio sistema ajudam a provar o que aconteceu depois. O primeiro é o **histórico de auditoria**: cada ação registrada com usuário, data e valor anterior. No ERP contábil [Diconta](/casos/diconta), ele existe para que um lançamento alterado tenha dono e hora, o que tira a discussão sobre "erro de operação" do campo da opinião. O segundo é o código e o banco em contas da sua empresa, assunto de [o código do sistema que a minha empresa pagou é meu?](/blog/o-codigo-do-sistema-que-a-minha-empresa-pagou-e-meu): sem isso, nem um terceiro consegue dar parecer.

## Como a HenaWeb organiza a homologação?

Em vez de uma entrega única no fim, trabalhamos com um [protótipo navegável](/servicos/sistemas-sob-medida) antes do código e, a partir daí, versões funcionando em ambiente real a cada 15 dias, com testes automatizados e revisão de código, para que a homologação aconteça em pedaços pequenos. Se a sua empresa está prestes a assinar um aceite e não sabe o que conferir, [fale com a gente](/#contato): revisar a lista antes de pagar sai mais barato do que discutir depois.

## Perguntas frequentes

### Quanto tempo a homologação de um sistema leva?

Depende do tamanho da entrega, mas refazer um mês fechado da operação no sistema novo costuma exigir alguns dias da equipe que opera. Combine o prazo no contrato; o Código Civil usa 30 dias após a medição como referência para apontar defeitos.

### Posso pagar a última parcela antes de terminar a homologação?

Pode, mas é a pior ordem: pelo Código Civil, o que já foi pago presume-se verificado. Amarre cada parcela a uma entrega aceita por escrito e deixe a última para depois do teste em paralelo.

### O que é critério de aceite?

É a frase, escrita antes do desenvolvimento, que diz como vocês vão saber que uma funcionalidade está pronta: "ao fazer X com estes dados, o sistema faz Y". Sem critérios, "funciona" vira opinião.

### Encontrei erros depois de assinar o aceite. Perdi o direito de reclamar?

Não. O aceite não apaga a responsabilidade do fornecedor por defeitos, e a garantia do contrato cobre o que aparece em produção. Registre o erro por escrito, com evidência, e cobre a correção.

---

### Fontes

- Câmara dos Deputados, [Lei 14.133/2021, texto atualizado (art. 140)](https://www2.camara.leg.br/legin/fed/lei/2021/lei-14133-1-abril-2021-791222-normaatualizada-pl.pdf).
- TCU, [Licitações e Contratos: 6.1.6. Gestão do contrato e recebimento definitivo](https://licitacoesecontratos.tcu.gov.br/6-1-6-gestao-do-contrato-e-recebimento-definitivo-2/).
- Projuris, [Código Civil, Capítulo VIII: Da Empreitada (arts. 610 a 626)](https://www.projuris.com.br/ccc/cc-comentado-da-empreitada-art-610-ao-626/).
- TJMG, [Empresa é condenada por não entregar software no prazo](https://tjmg.jus.br/portal-tjmg/noticias/empresa-e-condenada-por-nao-entregar-software-no-prazo.htm), 02/06/2026.
- The Register, [Post Office and Fujitsu execs 'should have known' Horizon IT system was flawed](https://www.theregister.com/2025/07/08/post_office_horizon_inquiry/), 08/07/2025.
- Post Office Horizon IT Inquiry, [Volume 1 of the final report: rapid read](https://www.postofficehorizoninquiry.org.uk/sites/default/files/2025-07/Post_Office_Horizon_Inquiry_Volume_1_Rapid_Read.pdf), julho de 2025.
