---
title: Prefeitura pequena sem equipe de TI: como contratar um sistema?
description: Só 33% das prefeituras de até 10 mil habitantes têm área de TI. O que exigir do fornecedor para o sistema ser do município, e não dele.
answer: Dá para contratar bem sem ter equipe de TI, desde que o contrato garanta o que a prefeitura não consegue conferir sozinha: código e dados em nome do município (a Lei do Software já diz isso), hospedagem em conta própria, documentação, login gov.br, acessibilidade, LGPD e um plano de saída.
date: 2026-11-24
tags: [prefeitura, contratação, equipe de TI, sistemas públicos]
service: sistemas-publicos
draft: false
---

O prefeito quer tirar o protocolo do papel, a secretaria de assistência precisa controlar benefícios, o setor de obras pede um sistema de aprovação. Mas na prefeitura não há ninguém de tecnologia para avaliar proposta, conferir entrega ou dizer se o preço faz sentido. **Quem decide acaba sendo o fornecedor.**

Esse cenário é a regra, não a exceção. Na pesquisa TIC Governo Eletrônico 2025, do Cetic.br, feita com 3.253 prefeituras entre julho de 2025 e abril de 2026, **apenas 33% das prefeituras de até 10 mil habitantes tinham área ou departamento de TI**. Nas de 10 mil a 100 mil, 58%. Só acima de 100 mil habitantes o número chega a 90%. E, entre as pequenas sem área de TI, 70% dependem de terceirizados. Ou seja: quem contrata o sistema costuma ser também quem vai operá-lo, e isso muda o que precisa estar escrito.

## Por que a falta de TI vira risco no contrato?

Sem alguém técnico do lado da prefeitura, três coisas tendem a acontecer. O sistema é contratado como "licença de uso" e a prefeitura nunca vê o código. Os dados ficam no servidor do fornecedor, em conta dele. E a documentação não existe, porque ninguém pediu. Enquanto o contrato dura, tudo funciona. Quando o contrato acaba, ou o fornecedor some, a prefeitura descobre que não tem o sistema, nem os dados em formato que outro fornecedor consiga usar.

A boa notícia é que **a lei já protege o município**. A Lei do Software (9.609/1998, art. 4º) diz que, salvo estipulação em contrário, os direitos sobre o programa desenvolvido durante um contrato de prestação de serviços pertencem ao contratante, e cita expressamente o **órgão público**. O problema é a ressalva: uma cláusula de licença no contrato inverte a regra. Explicamos o mecanismo em [o código do sistema que a minha empresa pagou é meu?](/blog/o-codigo-do-sistema-que-a-minha-empresa-pagou-e-meu); para a prefeitura, vale igual.

## O que exigir do fornecedor, mesmo sem saber de tecnologia?

A prefeitura não precisa avaliar código. Precisa exigir, por escrito, as condições que tornam o sistema dela de verdade. A lista é curta:

1. **Código e banco de dados em nome do município.** Repositório de código e servidores contratados pelo CNPJ da prefeitura, com o fornecedor como operador, não como dono. Se a relação acabar, o acesso é revogado; nada precisa ser "devolvido".
2. **Exportação completa dos dados, testada.** Em formato aberto (CSV, JSON ou dump do banco), com o dicionário de dados. Testar antes de aceitar a entrega, não quando precisar.
3. **Documentação de instalação e operação.** Outra equipe deve conseguir colocar o sistema no ar a partir do repositório. Se não consegue, a entrega não terminou.
4. **Trilha de auditoria.** Cada ação registrada, com quem fez e quando. É o que responde ao Tribunal de Contas e ao Ministério Público sem depender do fornecedor.
5. **Login gov.br, acessibilidade e LGPD desde o protótipo.** O cidadão entra com a conta que já tem (veja [como integrar o login gov.br](/blog/como-integrar-o-login-gov-br-ao-sistema-da-prefeitura)), o site cumpre as regras de acessibilidade e os dados pessoais são minimizados e mascarados. Corrigir isso no fim custa mais do que fazer certo no começo.
6. **Plano de saída.** Prazo de transição, entrega do que ainda estiver fora das contas do município e colaboração com o próximo fornecedor por um período definido.

Nada disso exige um analista na prefeitura. Exige um edital ou termo de referência que diga essas seis coisas, e um gestor que confira cada uma na entrega.

## Processo eletrônico: dá para começar sem gastar com sistema?

Para o caso mais comum, tirar processos e documentos do papel, existe uma alternativa pública. O **SEI** (Sistema Eletrônico de Informações), desenvolvido pelo TRF-4, é a solução oficial do governo federal para processos administrativos eletrônicos e é cedido gratuitamente a instituições públicas desde 2013; a adesão de outros órgãos passa pelo Portal do Processo Eletrônico Nacional. Minas Gerais, por exemplo, oferece o SEI às prefeituras do estado sem cobrar pelo sistema (paga-se só a hospedagem na Prodemge), com implantação em torno de seis meses.

A Lei 14.129/2021, do Governo Digital, dá a base jurídica: a administração deve usar soluções digitais para o trâmite de processos eletrônicos (art. 5º), e documentos nato-digitais assinados eletronicamente "são considerados originais para todos os efeitos legais" (art. 11). Um detalhe que pouca gente sabe: a lei só vale para o município se ele a adotar por ato normativo próprio (art. 2º, III). Um decreto municipal resolve, e abre caminho também para a [assinatura gov.br nos atos da prefeitura](/blog/assinatura-gov-br-substitui-o-certificado-digital-na-prefeitura).

O SEI resolve a tramitação genérica. O que ele não faz é o fluxo específico de cada secretaria: análise de verba com alçadas, parecer técnico com prazo, aprovação de projeto com checklist, prestação de contas com indicadores. É aí que entra o sistema sob medida, e é aí que a lista da seção anterior importa.

## O que terceirizar e o que a prefeitura precisa segurar?

Terceirizar a operação de TI é normal e, para a maioria dos municípios pequenos, inevitável. O erro é terceirizar também o controle. Uma divisão que funciona:

- **Fica com o fornecedor:** desenvolver, hospedar, monitorar, corrigir, treinar os servidores e atender chamados.
- **Fica com a prefeitura, mesmo sem TI:** a titularidade das contas (domínio, servidor, repositório, e-mail), as senhas de administrador guardadas por um servidor efetivo, a cópia periódica dos dados e o contrato com as seis exigências acima.

Com essa divisão, trocar de fornecedor vira uma transição, não um recomeço. E a prefeitura deixa de ser refém sem precisar contratar uma equipe que não cabe no orçamento.

## Como a HenaWeb trabalha com órgãos públicos?

Em [sistemas públicos](/servicos/sistemas-publicos), construímos workflows de solicitação, análise, parecer, aprovação e execução com alçadas, prazos e responsáveis, trilha de auditoria em cada ação, acessibilidade eMAG e WCAG 2.2 AA e LGPD desde o protótipo, e integração com login gov.br e painéis de transparência com exportação em dados abertos. Código, banco de dados e documentação ficam em contas do órgão. Atendemos prefeituras, secretarias, autarquias e câmaras de todo o Brasil, com reuniões online e entregas em ambiente real a cada 15 dias, para o gestor acompanhar sem depender de intermediário.

O [Diconta](/casos/diconta) mostra o tipo de rastreabilidade que levamos para o setor público: um ERP com financeiro, documentos, multi-CNPJ e histórico de auditoria de cada ação.

Sua prefeitura precisa de um sistema e não tem quem avalie a proposta? [Fale com a gente](/#contato): a imersão inicial já entrega o mapa do processo e um escopo priorizado, que serve de base para o termo de referência.

## Perguntas frequentes

### A prefeitura precisa ter equipe de TI para contratar um sistema?

Não. Precisa de um contrato que garanta código, dados e documentação em nome do município e de um gestor que confira a entrega. Na pesquisa TIC Governo Eletrônico 2025, só 33% das prefeituras de até 10 mil habitantes tinham área de TI.

### O código do sistema contratado pela prefeitura é do município?

Pela Lei 9.609/1998 (art. 4º), sim, salvo estipulação em contrário no contrato. Por isso o edital deve prever a cessão dos direitos e a entrega do código-fonte, em vez de uma simples licença de uso.

### O SEI é gratuito para prefeituras?

O SEI é cedido gratuitamente a instituições públicas desde 2013, segundo o Ministério da Gestão. A adesão passa pelo Portal do Processo Eletrônico Nacional; em Minas Gerais, as prefeituras aderem pelo estado e pagam apenas a hospedagem.

### A Lei do Governo Digital vale para a minha prefeitura?

Só se o município adotar a Lei 14.129/2021 por ato normativo próprio, como um decreto (art. 2º, III). Depois disso, documentos nato-digitais assinados eletronicamente valem como originais.

### Se o fornecedor encerrar o contrato, a prefeitura perde o sistema?

Se código, banco e servidores estão em contas do município, outro fornecedor assume e nada para. Se tudo está em nome do fornecedor, a prefeitura depende da boa vontade dele para recuperar os próprios dados.

---

### Fontes

- Cetic.br/NIC.br, [TIC Governo Eletrônico 2025: principais resultados](https://cetic.br/media/pdf/analises/20260803083915_pt_br_tic_governo_2025_lançamento_imprensa_v3.pdf) (coleta de jul. 2025 a abr. 2026; 3.253 prefeituras).
- [Lei nº 9.609, de 19 de fevereiro de 1998 (Lei do Software)](https://www2.camara.leg.br/legin/fed/lei/1998/lei-9609-19-fevereiro-1998-364738-publicacaooriginal-1-pl.html), Câmara dos Deputados, art. 4º.
- [Lei nº 14.129, de 29 de março de 2021 (Governo Digital)](https://www2.camara.leg.br/legin/fed/lei/2021/lei-14129-29-marco-2021-791203-normaatualizada-pl.html), Câmara dos Deputados, arts. 2º, 5º e 11.
- Ministério da Gestão e da Inovação, [SEI, Sistema Eletrônico de Informações](https://www.gov.br/gestao/pt-br/assuntos/sei).
- Governo de Minas Gerais, [Aderir ao Sistema SEI! Municípios](https://www.mg.gov.br/servico/aderir-sistema-sei-municipios).
