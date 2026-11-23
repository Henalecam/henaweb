---
title: O código do sistema que a minha empresa pagou é meu?
description: Pela Lei do Software, o código feito sob encomenda é de quem contratou, salvo cláusula contrária. O que pedir no contrato e na entrega para não ficar refém.
answer: Em regra, sim. A Lei do Software (9.609/1998, art. 4º) diz que o programa desenvolvido durante um contrato de prestação de serviços pertence a quem contratou, "salvo estipulação em contrário". O risco está nessa ressalva e na entrega: código no repositório da sua empresa, contas em seu nome e documentação.
date: 2026-11-23
tags: [contrato, código-fonte, propriedade intelectual, sistema sob medida]
service: sistemas-sob-medida
draft: false
---

Você pagou por um sistema, ele está no ar e a operação depende dele. Aí o fornecedor some, fecha as portas ou manda uma proposta de "manutenção" que não cabe no orçamento. É nessa hora que a pergunta aparece: **o código é meu ou é dele?**

A resposta curta: no Brasil, a lei está do seu lado, mas o contrato e a forma de entrega podem tirar esse direito de você. Em junho de 2026, o Tribunal de Justiça de Minas Gerais confirmou que uma empresa de software deve devolver R$ 263 mil a uma companhia de rastreamento de frotas por um sistema contratado com prazo de seis meses que, um ano e meio depois, ainda não tinha sido entregue. Dinheiro de volta é alívio, não é sistema funcionando.

## O que diz a Lei do Software sobre quem é o dono do código?

A **Lei do Software** (Lei 9.609, de 1998) trata o programa de computador como obra literária: vale o regime dos direitos autorais, com proteção de 50 anos, e essa proteção não depende de registro. O ponto central está no artigo 4º: salvo estipulação em contrário, os direitos sobre o programa desenvolvido durante um contrato de prestação de serviços pertencem ao **contratante dos serviços**, quando o desenvolvimento era o objeto do contrato ou decorria da natureza do trabalho. O desenvolvedor recebe a remuneração combinada e nada mais.

Dois detalhes importam. O § 2º protege o desenvolvedor: o que ele criar sem relação com o contrato e sem usar recursos do contratante continua sendo dele. E os direitos morais do autor são reduzidos no software: o programador pode exigir ser reconhecido como autor, mas isso não lhe dá controle sobre o uso do programa.

> A regra é boa para quem contrata. O problema é o "salvo estipulação em contrário": uma cláusula de licença de uso, ou a ausência de contrato, muda tudo.

## Quando o código não fica com a empresa?

Em três situações:

- **O contrato diz que é licença, não cessão.** Muitos fornecedores entregam o sistema como "licença de uso por tempo indeterminado". A lei (art. 9º) diz que o uso de programa de computador é objeto de contrato de licença: você usa, mas não é dono. Num sistema sob encomenda, essa cláusula inverte a regra do artigo 4º.
- **Não existe contrato escrito.** Sem contrato, a discussão vira "o que foi combinado". Num relato de junho de 2026 no TabNews, um fórum de desenvolvedores, um programador conta que entregou uma plataforma de gestão para uma empresa automotiva por R$ 34 mil, sem contrato assinado. O cliente ficou com o sistema rodando, mas sem o código-fonte, e mandou uma minuta de cessão retroativa de todos os direitos. Os dois lados têm argumentos; nenhum tem segurança.
- **O sistema é um SaaS do fornecedor.** Se a sua empresa assina uma plataforma que atende também outros clientes (um **sistema multi-tenant**, em que várias empresas usam a mesma instalação), o código nunca foi seu e não vai ser. O que precisa ser seu são os dados e a possibilidade de exportá-los.

Nenhuma dessas situações é ilegal. O problema é não saber em qual delas você está antes de pagar.

## Ter o direito sobre o código basta?

Não. Direito no papel e sistema na mão são coisas diferentes. A empresa pode ser dona do código pela lei e, mesmo assim, não conseguir usá-lo, porque ele está num repositório do fornecedor, roda numa conta de servidor dele e ninguém mais sabe como publicá-lo.

A própria lei dá a pista do que uma entrega completa inclui. No artigo 11, sobre transferência de tecnologia, ela obriga o fornecedor a entregar a "documentação completa", em especial o **código-fonte comentado** e o **memorial descritivo**, além de especificações, diagramas e fluxogramas. O artigo vale para contratos registrados no INPI, mas serve de lista de conferência para qualquer projeto sob medida. Na prática, a sua empresa precisa ter em mãos:

1. **Repositório em conta da empresa** (GitHub, GitLab ou equivalente), com o fornecedor como colaborador, não como dono. Se a parceria acabar, você remove o acesso, não pede o arquivo.
2. **Infraestrutura em nome da empresa.** Servidor, banco de dados, domínio e chaves de API contratados com o seu CNPJ. O fornecedor opera; a conta é sua.
3. **Documentação de implantação.** Se outra equipe não consegue colocar o sistema no ar a partir do repositório, a entrega não terminou.
4. **Lista de dependências e licenças.** Bibliotecas de código aberto e serviços de terceiros não são "seus": são licenciados, e o contrato deve dizer quais são.
5. **Acesso ao banco de dados e exportação testada.** Os dados são da empresa em qualquer cenário, inclusive no SaaS.

É assim que trabalhamos nos [sistemas sob medida](/servicos/sistemas-sob-medida): código, banco de dados e documentação ficam em contas da sua empresa desde o início. No [Diconta](/casos/diconta), ERP contábil com financeiro, notas fiscais e histórico de auditoria, as entregas acontecem a cada 15 dias em ambiente real, não como um pacote no fim.

## O que precisa estar escrito no contrato?

Um contrato de desenvolvimento sob medida precisa responder a quatro perguntas sem ambiguidade:

- **De quem é o código?** Cessão total dos direitos patrimoniais à contratante. Se o fornecedor quiser reutilizar componentes genéricos dele em outros clientes, pode ser combinado, desde que fique listado o que é "dele" e o que é "seu".
- **O que é entregue e quando?** Repositório, infraestrutura, documentação e credenciais, com datas. No caso de Minas Gerais, a relatora tratou o contrato como **obrigação de resultado**: o fornecedor se comprometeu a entregar um sistema funcionando, e alegar que o processo era "colaborativo" não bastou para escapar da devolução.
- **O que acontece na saída?** Prazo de transição, entrega do que ainda estiver fora das contas da empresa e colaboração com a próxima equipe por um período definido.
- **Como provar a autoria?** O **registro no INPI** é opcional, mas o próprio instituto o descreve como "a forma mais segura de garantir sua propriedade e provar sua autoria". O processo é eletrônico: o INPI guarda um resumo digital (hash), e o código fica com o titular.

Para sistemas críticos de um fornecedor que não cede o código, existe o **escrow de código-fonte**: o código fica depositado com um terceiro e é liberado se o fornecedor falir ou abandonar o produto. É comum em contratos grandes; para a maioria das empresas, ter o código no próprio repositório desde o começo resolve o mesmo problema de forma mais simples.

Para redigir ou revisar o contrato, vale a orientação de um advogado.

## E se a minha empresa já está nessa situação?

Comece pelo inegociável: os dados. Peça uma exportação completa e verifique se ela abre. Depois, proponha transferir o repositório e a infraestrutura para contas da empresa, mantendo o fornecedor como operador. Fornecedor sério aceita; quem resiste está dizendo algo sobre a relação.

Se a resposta for não, há duas rotas: negociar a compra dos direitos, com base no contrato (ou na lei, se não há contrato), ou substituir o sistema por partes, com o antigo no ar enquanto o novo assume módulo por módulo, como explicamos em [vale a pena reescrever o sistema da empresa do zero?](/blog/vale-a-pena-reescrever-o-sistema-da-empresa-do-zero).

Quer um sistema que seja da sua empresa de verdade, com código, dados e documentação nas suas contas desde a primeira entrega? [Fale com a gente](/#contato).

## Perguntas frequentes

### Preciso registrar o sistema no INPI para ser o dono?

Não. A Lei 9.609/1998 diz que a proteção independe de registro e que ele é facultativo. O registro serve como prova de autoria e titularidade em caso de disputa.

### O fornecedor pode usar partes do meu sistema em outros clientes?

Só se o contrato permitir. Pela regra geral da lei, o que foi desenvolvido para a sua empresa durante o contrato é da sua empresa; exceções para componentes genéricos do fornecedor precisam estar listadas por escrito.

### Se o fornecedor falir, o que acontece com o meu sistema?

Se código, banco e servidores estão em contas da sua empresa, outra equipe assume e nada para. Se tudo está em nome do fornecedor, a empresa depende da massa falida ou de um escrow de código-fonte.

### Sistema por assinatura (SaaS) é meu?

Não. Você tem uma licença de uso enquanto paga; o código é do fornecedor e atende vários clientes. O que deve ser seu são os dados, com exportação garantida em contrato e testada na prática.

### O que devo receber na entrega final de um sistema sob medida?

Código-fonte comentado no repositório da empresa, documentação de instalação e publicação, lista de dependências e licenças, credenciais das contas e acesso ao banco de dados.

---

### Fontes

- [Lei nº 9.609, de 19 de fevereiro de 1998 (Lei do Software)](https://www2.camara.leg.br/legin/fed/lei/1998/lei-9609-19-fevereiro-1998-364738-publicacaooriginal-1-pl.html), Câmara dos Deputados: arts. 2º, 3º, 4º, 9º e 11.
- [Empresa é condenada por não entregar software no prazo](https://www.tjmg.jus.br/portal-tjmg/noticias/empresa-e-condenada-por-nao-entregar-software-no-prazo-8ACC80299E64B8FB019E8820DB2B3F7D-00.htm), TJMG, 02/06/2026.
- [Programa de computador - Mais informações](https://www.gov.br/inpi/pt-br/servicos/programas-de-computador/guia-completo-de-programa-de-computador), INPI.
- [A propriedade intelectual do programa de computador desenvolvido sob encomenda](https://jus.com.br/artigos/74145/a-propriedade-intelectual-do-programa-de-computador-desenvolvido-sob-encomenda), Leonardo de Sales Dias, Jus.com.br, 2019.
- [Desenvolvedor entrega plataforma automotiva completa por R$ 34k com IA](https://www.tabnews.com.br/Siriusmaker/desenvolvedor-entrega-plataforma-automotiva-completa-por-r-34k-com-ia-acordo-era-parceria-tecnologica-nao-entrega-de-codigo-cliente-mandou-contrato-de-c), relato em fórum, TabNews, junho de 2026.
- [Source code escrow](https://en.wikipedia.org/wiki/Source_code_escrow), Wikipedia.
