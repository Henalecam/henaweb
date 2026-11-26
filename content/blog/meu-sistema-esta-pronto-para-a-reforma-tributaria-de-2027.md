---
title: Meu sistema está pronto para a reforma tributária de 2027?
description: Em 2027 a CBS substitui PIS e Cofins e a nota fiscal muda. Veja o que o sistema da empresa precisa fazer, os prazos e como testar antes de janeiro.
answer: Só se ele já emite nota fiscal com os campos de IBS e CBS, calcula os novos tributos por operação e foi testado com o contador. Desde 3 de agosto de 2026 a NF-e já deveria sair com esses dados; em janeiro de 2027 a CBS passa a ser cobrada de verdade e as empresas do Simples entram na regra.
date: 2026-11-27
tags: [reforma tributária, CBS, IBS, nota fiscal, ERP]
service: sistemas-sob-medida
draft: true
---

O contador mandou um aviso sobre "destaque de CBS na nota", o fornecedor do sistema diz que "a atualização está chegando" e ninguém na empresa sabe o que precisa estar funcionando em 1º de janeiro de 2027. **A pergunta certa não é se a reforma vai chegar, e sim se o seu sistema vai emitir nota quando ela chegar.**

## O que muda na nota fiscal em 2027?

A **reforma tributária** (Emenda Constitucional 132/2023, regulamentada pela Lei Complementar 214/2025) troca os principais tributos sobre o consumo por dois. A **CBS** (Contribuição sobre Bens e Serviços) é federal e substitui PIS e Cofins. O **IBS** (Imposto sobre Bens e Serviços) é dividido entre estados e municípios e substitui ICMS e ISS.

O ano de 2026 é de teste: as notas saem com um valor destacado de 0,9% de CBS e 0,1% de IBS, sem cobrança efetiva, segundo a Agência Senado. Em 2027 a história muda. A Receita Federal escreve que "a reforma tributária terá início em 2027, com a cobrança integral da CBS"; é nesse momento que PIS e Cofins deixam de existir, segundo a Agência Senado. O IBS continua em teste em 2027, cresce enquanto ICMS e ISS são reduzidos entre 2029 e 2032, e vale integralmente em 2033.

A Receita avisa que "esses prazos são constitucionais e não podem ser alterados a critério da Receita Federal ou do CGIBS".

## Meu sistema já deveria estar emitindo nota com IBS e CBS?

Para a maioria das empresas fora do Simples, sim, desde agosto. O **Ato Conjunto RFB/CGIBS nº 4/2026** fixou o cronograma: para fatos geradores a partir de 3 de agosto de 2026, a NF-e (modelo 55), a NFC-e (modelo 65) e o CT-e já precisam sair com os campos de IBS e CBS preenchidos. A NFCom e parte das NFS-e entraram em 1º de outubro; o restante das NFS-e, em 1º de dezembro. Para quem é do Simples Nacional, a obrigatoriedade começa em 1º de janeiro de 2027.

O que confunde muita gente é que a nota sem esses campos ainda é autorizada. No fim de julho, Receita e Comitê Gestor do IBS adiaram as regras de validação que rejeitariam documentos incompletos, e um comunicado chegou a falar em suspensão. Em 6 de agosto, os dois órgãos corrigiram: "não houve suspensão da obrigatoriedade de destaque e prestação das informações". Como registrou o portal Contábeis, "a autorização do documento não significa que a obrigação de prestar as informações tenha sido retirada". Não há data para as validações voltarem; quando voltarem, a nota incompleta será rejeitada.

## Quantas empresas ainda não adaptaram o sistema?

Mais do que parece. No painel divulgado pela Receita em 9 de outubro de 2026, com notas emitidas nos 30 dias até 7 de outubro, 1.275.356 estabelecimentos obrigados emitiram documentos fiscais. Desses, 489.326 destacaram a CBS em todas as notas e 365.826 em parte delas: 855.152 estabelecimentos, "quase dois terços (67%) do total". Por subtração, cerca de 420 mil estabelecimentos não destacaram a CBS em nenhuma nota. Em volume, foram 3,7 bilhões de documentos com o destaque e 0,6 bilhão sem. Entre os emissores de NF-e, 78% já destacam.

Em novembro a Receita foi atrás de quem ficou para trás: identificou cerca de 72 mil pessoas jurídicas que emitem mais de 150 documentos por mês e não destacam a CBS e o IBS, ou destacam em menos de 86% das notas, e vai orientar os pouco mais de 25 mil contadores responsáveis por elas, com apoio do Conselho Federal de Contabilidade. A nota do Ministério da Fazenda ressalva que a falta do destaque "não constitui, por si só, evidência de inconformidade tributária" e pode decorrer de situações legítimas, inclusive de questões operacionais dos sistemas emissores. O governo sabe que parte do atraso é de software.

## Por que "colocar dois campos na nota" não resolve?

Porque o **destaque de IBS e CBS** é a ponta visível de uma mudança no cálculo. Cada item da nota passa a carregar um código de situação tributária (CST) e um código de classificação (cClassTrib) que dizem se aquela operação tem alíquota cheia, redução, isenção ou regime especial. O sistema precisa escolher o código certo por produto e por operação, calcular os valores e guardá-los para a apuração e para o crédito do comprador. A Fenacon, que reúne as empresas de contabilidade, resume: "Não é simplesmente atualizar o sistema para aparecerem dois campos novos na nota."

Para quem é do Simples, há ainda uma decisão de negócio que o sistema precisa refletir: a partir de 2027 existem o Simples "puro", com tudo no DAS, e o "híbrido", em que IBS e CBS são apurados fora do DAS e dão direito a crédito ao cliente. Quem vende para empresas vai sentir pressão para emitir nota com crédito.

Num sistema desenhado em volta da operação, como o [ERP contábil da Diconta](/casos/diconta), que reúne financeiro, notas fiscais e vários CNPJs num painel, a mudança tende a ficar localizada: muda o módulo fiscal e os relatórios que dependem dele. Se a regra de imposto está espalhada em planilhas e em "gambiarras" no sistema pronto, a adaptação vira uma caçada. É o mesmo diagnóstico de [quando a planilha deixa de dar conta](/blog/quando-trocar-a-planilha-por-um-sistema-na-empresa).

## O que fazer com o sistema da empresa até janeiro

1. **Liste onde a nota nasce.** ERP, sistema de frente de caixa, emissor do contador, loja virtual, plataforma de serviços: cada um precisa emitir com os campos novos.
2. **Pergunte ao fornecedor por data, não por promessa.** Qual versão já emite com IBS e CBS, quando a sua empresa recebe, o que muda no contrato. Se a resposta for "está chegando", trate como risco.
3. **Peça ao contador a classificação dos seus produtos e serviços.** O código de cada item é decisão tributária, não de TI. Sem essa tabela o sistema emite errado.
4. **Teste em ambiente de homologação com notas reais.** Emita as dez operações mais comuns da empresa, inclusive devolução e serviço, e confira com o contador antes de virar o ano. Vale o mesmo roteiro de [testar antes de aceitar a entrega](/blog/como-testar-o-sistema-antes-de-aceitar-a-entrega-e-pagar).
5. **Tenha um plano B para a primeira semana de janeiro.** Um emissor alternativo evita parar o faturamento se algo falhar.

## Sistema pronto ou sob medida: quem adapta?

Com software de prateleira, a adaptação é do fornecedor, e a sua empresa espera na fila junto com todos os clientes dele. Com um [sistema sob medida](/servicos/sistemas-sob-medida), a mudança entra no roadmap da sua operação e você decide a ordem. Isso só funciona se [o código for seu](/blog/o-codigo-do-sistema-que-a-minha-empresa-pagou-e-meu) e houver quem o mantenha; se o fornecedor sumiu, a reforma tributária é o momento em que a dívida aparece, e os [casos de ERP que deram errado](/blog/a-implantacao-do-erp-deu-errado-quem-paga-o-prejuizo) mostram quanto isso custa.

Se você não sabe em que ponto o sistema da sua empresa está, [fale com a gente](/#contato): mapeamos os pontos de emissão e o que dá para resolver em semanas.

## Perguntas frequentes

### A nota fiscal sem IBS e CBS ainda é aceita em 2026?

Hoje, sim: as regras de validação que rejeitariam o documento foram adiadas sem data. Mas a obrigação de informar os campos continua desde 3 de agosto de 2026 para a NF-e, e a Receita e o CGIBS afirmaram que a autorização da nota não retira essa obrigação.

### Empresa do Simples Nacional precisa mudar o sistema?

Precisa, a partir de 1º de janeiro de 2027, quando começa a obrigatoriedade para os optantes. Em 2026 o Simples não é obrigado a destacar a CBS, mas quem escolheu o regime híbrido ou vende para outras empresas deve preparar a emissão antes.

### O que é o destaque da CBS na nota?

É informar, em campos próprios do documento fiscal, o valor da CBS calculado sobre a operação. Em 2026 o destaque é de teste (0,9% de CBS e 0,1% de IBS), sem cobrança; em 2027 a CBS passa a ser cobrada integralmente.

### O PIS e a Cofins acabam em 2027?

Sim. Com a cobrança integral da CBS em 2027, PIS e Cofins são extintos. O ICMS e o ISS seguem até 2032, com redução gradual a partir de 2029, e são extintos em 2033, quando o IBS vale integralmente.

---

### Fontes

- [Reforma tributária: 86% dos documentos fiscais de empresas obrigadas já trazem destaque da CBS](https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2026/outubro/reforma-tributaria-86-dos-documentos-fiscais-de-empresas-obrigadas-ja-trazem-destaque-da-cbs), Receita Federal, 09/10/2026: painel de 30 dias até 7/10 e cronograma 2027–2033.
- [Receita, CGIBS e CFC vão orientar sobre destaque de CBS/IBS em documentos fiscais](https://www.gov.br/fazenda/pt-br/assuntos/noticias/2026/novembro/receita-cgibs-e-cfc-vao-orientar-sobre-destaque-de-cbs-ibs-em-documentos-fiscais), Ministério da Fazenda, 19/11/2026: 72 mil empresas e 25 mil contadores.
- [Novos tributos começam a ser testados em 2026 e transição vai até 2033](https://www12.senado.leg.br/noticias/materias/2024/12/16/novos-tributos-comecam-a-ser-testados-em-2026-e-transicao-vai-ate-2033), Agência Senado, 16/12/2024: alíquotas de teste e extinções.
- [RFB e CGIBS definem cronograma oficial de obrigatoriedade dos documentos fiscais eletrônicos com IBS e CBS](https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/tributario-ij/rfb-e-cgibs-definem-cronograma-oficial-de-obrigatoriedade-dos-documentos-fiscais-eletronicos-com-ibs-e-cbs), Machado Meyer, 31/07/2026, e o [texto do Ato Conjunto RFB/CGIBS nº 4/2026](https://portalcomexbr.com/ato-conjunto-rfb-cgibs-no-4-de-30-de-julho-de-2026/) (Portal ComexBR).
- [Receita e CGIBS esclarecem que adiamento não suspendeu campos de IBS/CBS](https://www.contabeis.com.br/noticias/78632/receita-e-cgibs-esclarecem-que-adiamento-nao-suspendeu-campos-de-ibs-cbs/), Contábeis, 10/08/2026, e [Documentos fiscais eletrônicos: o que a Receita Federal e o CGIBS efetivamente adiaram](https://arrieiroadvogados.com.br/o-que-a-receita-federal-e-o-cgibs-efetivamente-adiaram-e-o-que-continua-obrigatorio/), Arrieiro Advogados, 10/08/2026.
- [Empresas do Simples precisam preparar sistemas para novas regras das notas fiscais em 2027](https://fenacon.org.br/reforma-tributaria/empresas-do-simples-precisam-preparar-sistemas-para-novas-regras-das-notas-fiscais-em-2027/), Fenacon, 25/09/2026.
