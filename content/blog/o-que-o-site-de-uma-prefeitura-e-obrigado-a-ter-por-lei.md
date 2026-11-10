---
title: O que o site de uma prefeitura é obrigado a ter por lei?
description: Transparência em tempo real, e-SIC, dados abertos, acessibilidade e LGPD. As leis que valem para o site de qualquer prefeitura, artigo por artigo.
answer: Por lei, o site de uma prefeitura precisa ter portal da transparência com receitas e despesas em tempo real, e-SIC para pedidos de informação, busca, dados em formato aberto, contato do órgão e acessibilidade para pessoas com deficiência. O site é obrigatório acima de 10 mil habitantes; o tempo real vale para todos.
date: 2026-11-10
tags: [prefeituras, transparência, acessibilidade, lgpd, lai]
service: sistemas-publicos
draft: false
---

Chegou um ofício do Tribunal de Contas perguntando por que tal informação não está no site da prefeitura, ou a avaliação de transparência veio com nota baixa e ninguém sabe o que faltou. O problema é sempre o mesmo: as obrigações estão espalhadas em cinco leis e quase ninguém as leu juntas.

A resposta curta: o site precisa publicar receitas e despesas em tempo real, receber pedidos de informação, ter busca, exportar dados em formato aberto, mostrar como falar com o órgão e ser acessível a pessoas com deficiência. Abaixo, cada obrigação com a lei e o artigo de onde vem.

## Quais leis obrigam a prefeitura a ter site?

Nenhuma lei diz "a prefeitura deve ter um site" com essas palavras, mas várias criam obrigações que só se cumprem com um. A principal é a **Lei de Acesso à Informação** (LAI, Lei 12.527/2011): o art. 8º manda divulgar, sem ninguém pedir, as informações de interesse coletivo, e o § 2º diz que é "obrigatória a divulgação em sítios oficiais da rede mundial de computadores". O próprio artigo trata dos municípios no § 4º.

Antes dela, a **Lei Complementar 131/2009** alterou a Lei de Responsabilidade Fiscal (LRF) para exigir informações sobre a execução orçamentária e financeira "em tempo real", em meios eletrônicos de acesso público. É daí que vem o portal da transparência.

Completam o quadro a **Lei Brasileira de Inclusão** (13.146/2015), que exige acessibilidade nos sites de governo, e a **LGPD** (13.709/2018), que tem um capítulo para o poder público. A Lei do Governo Digital (14.129/2021) só alcança o município que a adotar por ato normativo próprio.

## O que o portal da transparência precisa mostrar?

O § 1º do art. 8º da LAI lista o mínimo: estrutura, endereços, telefones e horários; repasses de recursos; despesas; licitações, com editais, resultados e contratos; programas, obras e projetos; e respostas às perguntas mais frequentes.

A LC 131 desce ao detalhe do dinheiro. O art. 48-A da LRF exige, para a **despesa**, cada ato no momento em que ocorre, com no mínimo número do processo, bem ou serviço, beneficiário do pagamento e, quando houver, a licitação. Para a **receita**, o lançamento e o recebimento de tudo que entra. Na prática, "tempo real" exige integração automática entre o sistema contábil e o portal, e não uma planilha subida toda sexta.

Deixar de cumprir tem preço: pelo art. 73-C da LRF, o ente fica impedido de receber **transferências voluntárias** (art. 23, § 3º, I). Para um município que depende de convênios, é o pior cenário possível.

## Quais recursos técnicos o site precisa ter?

O § 3º do art. 8º da LAI é quase um caderno de requisitos. Os sites oficiais devem, no mínimo:

- ter uma **ferramenta de pesquisa** de conteúdo;
- permitir gravar relatórios em formatos **abertos e não proprietários** (CSV e JSON, por exemplo, e não só PDF);
- permitir acesso automatizado por sistemas externos, em formatos **legíveis por máquina** (uma API ou arquivos estruturados);
- divulgar os formatos usados para estruturar a informação;
- garantir a autenticidade e a integridade dos dados;
- manter as informações atualizadas;
- indicar um **canal de contato** eletrônico ou telefônico;
- ser acessível a pessoas com deficiência.

Além disso, o art. 10, § 2º, obriga o órgão a receber pedidos de acesso à informação pelo próprio site: é o **e-SIC**, com protocolo e acompanhamento. O site da prefeitura, portanto, não é um site institucional comum: precisa de banco de dados, API e protocolo com prazo e responsável, o mesmo tipo de [workflow com trilha de auditoria](/servicos/sistemas-publicos) que usamos em sistemas de aprovação e repasse de verbas.

## O site da prefeitura precisa ser acessível?

Precisa, por duas leis. Além da LAI (art. 8º, § 3º, VIII), a Lei Brasileira de Inclusão (art. 63) torna obrigatória a acessibilidade nos sites de órgãos de governo "conforme as melhores práticas e diretrizes de acessibilidade adotadas internacionalmente", com o símbolo de acessibilidade em destaque. Essas diretrizes são a **WCAG** (Web Content Accessibility Guidelines, do W3C), e o **eMAG** é o modelo de acessibilidade do governo eletrônico brasileiro.

A dívida é grande. Em setembro de 2025 o Tribunal de Contas da União avaliou 288 organizações federais (Acórdão 2099/2025): 88% ficaram abaixo de 5 numa escala de 0 a 10, só 31% seguem a WCAG e 68% não incluem acessibilidade nas contratações. O levantamento é federal, mas o remédio vale para prefeituras: acessibilidade como requisito do contrato e do protótipo.

## A LGPD vale para a prefeitura?

Vale. O art. 23 da LGPD exige que o órgão público informe, de preferência no site, em que casos trata dados pessoais, com previsão legal e finalidade. O art. 41 obriga a indicar um **encarregado** pelo tratamento de dados, com identidade e contato publicados. E o art. 6º, III, manda coletar o mínimo necessário. No site, isso vira formulários enxutos, dados pessoais mascarados em relatórios públicos e acesso por perfil.

## Municípios pequenos têm as mesmas obrigações?

Quase. O § 4º do art. 8º da LAI dispensa os municípios com até 10 mil habitantes da divulgação obrigatória na internet, mas mantém a de publicar, em tempo real, a execução orçamentária e financeira (art. 73-B da LRF). A cidade pequena pode não ter o site completo, mas o portal da transparência continua obrigatório, e os prazos da LC 131 (até quatro anos a partir de 2009) já venceram. Para quem tem pouca estrutura, o programa federal Prefeitura +Digital, do Serpro, oferece desde 2025 site e atendimento gratuitos por até dois anos a cidades de até 30 mil habitantes.

## Como saber se o site da sua prefeitura está em dia?

A régua pública é o **Programa Nacional de Transparência Pública** (PNTP), da Atricon com os Tribunais de Contas, que avalia mais de 10 mil portais por mais de 130 critérios. No ciclo 2025 o índice médio nacional foi de 66,6% (63,94% em 2024) e só 2.912 portais receberam selo: 998 Diamante, 1.082 Ouro e 832 Prata. A maioria ainda não chega nem ao Prata.

Um checklist rápido:

1. Receitas e despesas de hoje já aparecem, com beneficiário e número do processo?
2. Dá para enviar um pedido de informação pelo site e acompanhar o protocolo?
3. Os relatórios saem em CSV ou outro formato aberto, não só em PDF?
4. Existe busca que funcione e um telefone ou e-mail de contato visível?
5. O site passa num teste de acessibilidade (leitor de tela, teclado, contraste) e tem o símbolo em destaque?
6. O nome e o contato do encarregado de dados estão publicados?

Qualquer "não" é um passivo legal, e não só de imagem. A boa notícia é que a lista é finita. É assim que a gente trata um [sistema público](/servicos/sistemas-publicos): eMAG e WCAG 2.2 AA desde o protótipo, LGPD desde o desenho, trilha de auditoria em cada ação (o mesmo princípio do histórico de auditoria do [Diconta](/casos/diconta)) e dados abertos. E um portal que diz em texto claro quais serviços oferece é mais fácil de achar, porque [a IA e o Google só recomendam o que conseguem ler](/blog/como-fazer-a-ia-recomendar-a-sua-empresa-nas-buscas). Para passar o site da sua prefeitura por essa régua, [abra um caso](/#contato).

## Perguntas frequentes

### Toda prefeitura é obrigada a ter site?

Acima de 10 mil habitantes, sim: a LAI (art. 8º, § 2º) obriga a divulgação em site oficial. Abaixo disso o site completo é dispensado, mas a execução orçamentária e financeira continua obrigatória em tempo real, em meio eletrônico (LC 131/2009).

### O que é transparência ativa e transparência passiva?

Ativa é o que o órgão publica sem ninguém pedir, como o portal da transparência (LAI, art. 8º). Passiva é responder aos pedidos do cidadão, que precisam poder ser feitos pelo site, via e-SIC (art. 10, § 2º).

### O que acontece se a prefeitura não cumprir a lei de transparência?

Pela LRF (art. 73-C), o ente que descumpre a divulgação em tempo real fica impedido de receber transferências voluntárias, como convênios. E os Tribunais de Contas avaliam os portais todo ano no PNTP.

### O site da prefeitura precisa seguir o eMAG ou a WCAG?

A Lei Brasileira de Inclusão (art. 63) exige acessibilidade conforme as diretrizes internacionais, que são a WCAG, e o eMAG é o modelo brasileiro para o governo eletrônico. O mais seguro é atender às duas desde o protótipo.

### A prefeitura precisa ter encarregado de dados (DPO)?

Sim. A LGPD (art. 41) obriga o controlador, inclusive o órgão público, a indicar um encarregado e publicar o nome e o contato dele, de preferência no site.

---

### Fontes

- [Lei nº 12.527/2011](https://www.tce.to.gov.br/profissaogestor/images/transparenciaPublica/Lei12527_2011.pdf) (Lei de Acesso à Informação), art. 8º e 10.
- [Lei Complementar nº 131/2009](https://www2.camara.leg.br/legin/fed/leicom/2009/leicomplementar-131-27-maio-2009-588491-publicacaooriginal-113073-pl.html) (altera a LRF: art. 48, 48-A, 73-B e 73-C) e [LRF, art. 23, § 3º](https://www.mpc.sp.gov.br/sites/mpcsp/files/portal/2019/05/Lcp101-art.-23.pdf).
- [Lei nº 13.146/2015](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13146-6-julho-2015-781174-publicacaooriginal-147468-pl.html) (Lei Brasileira de Inclusão), art. 63.
- [Lei nº 13.709/2018](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) (LGPD), art. 6º, 23 e 41.
- [Lei nº 14.129/2021](https://www2.camara.leg.br/legin/fed/lei/2021/lei-14129-29-marco-2021-791203-normaatualizada-pl.pdf) (Governo Digital), art. 2º.
- TCU, [Serviços digitais do setor público apresentam limitações severas de acessibilidade](https://portal.tcu.gov.br/imprensa/noticias/servicos-digitais-do-setor-publico-apresentam-limitacoes-severas-de-acessibilidade) (Acórdão 2099/2025, set. 2025); detalhes via [Convergência Digital](https://convergenciadigital.com.br/governo/tcu-88-dos-sites-e-apps-do-governo-legislativo-e-justica-nao-atendem-deficientes/).
- Atricon, [Resultados do PNTP 2025](https://atricon.org.br/blog/iv-citc-resultados-do-programa-nacional-de-transparencia-publica-2025-sao-divulgados/) e [Radar Nacional da Transparência Pública](https://atricon.org.br/blog/radar-nacional-da-transparencia-publica-e-apresentado-no-congresso-internacional-dos-tribunais-de-contas/) (dez. 2025).
- Agência Gov, [Prefeitura +Digital](https://agenciagov.ebc.com.br/noticias/202507/mais-de-800-municipios-aderiram-ao-prefeitura-digital) (jul. 2025).
- Governo Digital, [Legislação de acessibilidade digital](https://www.gov.br/governodigital/pt-br/legislacao/acessibilidade) (eMAG).
