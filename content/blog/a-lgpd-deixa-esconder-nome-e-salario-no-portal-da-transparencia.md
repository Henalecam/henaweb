---
title: A LGPD deixa esconder nome e salário no portal da transparência?
description: Não. A LGPD não cria sigilo: nome, cargo e remuneração do servidor e quem recebeu cada pagamento continuam públicos. O que muda é o CPF mascarado.
answer: Não. A LGPD não cria sigilo nem autoriza negar acesso: nome, cargo, lotação e remuneração dos servidores e o beneficiário de cada pagamento continuam públicos (STF, LAI, Decreto 10.540/2020). O que a LGPD muda é a forma: CPF descaracterizado, nada de endereço, telefone ou dados de saúde, e só o necessário.
date: 2026-11-27
tags: [LGPD, portal da transparência, LAI, prefeitura, servidores]
service: sistemas-publicos
draft: false
---

Um servidor reclamou que o salário dele "está na internet", o jurídico citou a LGPD e alguém sugeriu trocar os nomes por matrícula no portal. Pouco depois chega o ofício do Tribunal de Contas perguntando por que a lista de servidores sumiu. **A LGPD não é o que a prefeitura imagina: ela não cria sigilo, e o Supremo já decidiu que nome e salário de servidor são informação pública.**

## O que a LGPD diz sobre dados em portais públicos?

A **LGPD** (Lei 13.709/2018) vale para prefeituras, câmaras e autarquias: o art. 1º, parágrafo único, manda União, estados e municípios observarem suas normas gerais. Mas a mesma lei autoriza o poder público a tratar dados pessoais sem consentimento para executar políticas públicas previstas em leis e regulamentos (art. 7º, III), e o art. 23 manda esse tratamento atender "a finalidade pública, na persecução do interesse público", com referência expressa à Lei de Acesso à Informação (LAI, Lei 12.527/2011).

Ou seja: publicar o que a LAI e a Lei da Transparência mandam é tratamento com base legal. A LGPD acrescenta princípios: necessidade (art. 6º, III, "mínimo necessário para a realização de suas finalidades") e responsabilização (art. 6º, X).

O guia conjunto da CGU e da ANPD, publicado em 25 de novembro de 2026, resume: a LGPD "não institui, por si só, hipótese geral de sigilo para informações pessoais". As hipóteses de restrição estão na LAI, e qualquer negativa precisa se apoiar nela. O guia é dirigido ao Executivo federal, mas interpreta as mesmas leis que valem no município.

## O STF permite publicar nome e salário do servidor?

Permite, e a discussão é mais antiga que a LGPD. Em 2009 a Prefeitura de São Paulo pôs no site "De Olho nas Contas" nome, cargo, lotação e remuneração bruta de cada servidor. Sindicatos conseguiram liminares no TJ-SP alegando violação à intimidade e risco à segurança. Na Suspensão de Segurança 3.902, o presidente do STF as suspendeu: a remuneração é gasto público, "vinculada ao princípio da legalidade estrita".

Em 2015 o Plenário fechou a questão no ARE 652777, com repercussão geral (Tema 483): por unanimidade, é legítima a publicação, inclusive em site da administração, do nome do servidor junto com vencimentos e vantagens. O relator, ministro Teori Zavascki, observou que a LAI, aprovada depois do precedente de 2009, chancelou esse entendimento. Repercussão geral orienta todos os tribunais do país. O guia da CGU/ANPD, citando a decisão de 2009, repete a conclusão: remuneração, cargos, funções e órgão de lotação "constituem informações de interesse coletivo ou geral".

## O que a prefeitura é obrigada a mostrar e o que deve esconder?

O guia traz uma tabela com a regra geral para **dados de agentes públicos**:

- **Deve ser divulgado**: nome completo ("sem outras informações associadas, não é protegido pelo art. 31 da LAI"), remuneração ("informação pessoal de interesse coletivo"), cargo e função, lotação, matrícula, e-mail funcional, quem assina cada ato, currículo e registro de frequência.
- **Deve ser divulgado de forma descaracterizada**: o CPF.
- **Não deve ser divulgado**: endereço residencial, telefone e e-mail pessoais, assinatura manuscrita, descontos como pensão alimentícia e consignados, e dados de saúde.

A lotação tem ressalva: "pode ser restringida se houver risco concreto à segurança ou à integridade física do servidor". Caso a caso, motivado, e não regra para toda a folha.

Para fornecedores, a regra é ainda mais objetiva. O art. 8º, I, "e", do Decreto 10.540/2020, que define o padrão mínimo do sistema contábil (Siafic) de todos os entes, exige publicar "a pessoa física ou jurídica beneficiária do pagamento, com seu respectivo número de inscrição no CPF" ou CNPJ, "exceto na hipótese de folha de pagamento de pessoal e de benefícios previdenciários". E pessoa jurídica nem entra na LGPD, que protege pessoa natural: esconder razão social e CNPJ de quem recebeu da prefeitura não tem base em lei nenhuma.

## Como publicar o CPF sem expor o servidor?

O guia descreve o **formato padrão de CPF descaracterizado** do Executivo federal, usado no Portal da Transparência: "devem ser ocultados os três primeiros dígitos e os dois dígitos finais do número original", o que resulta em `***.999.999-**`. Cada órgão "deve analisar a sua realidade, para decidir pela divulgação integral ou parcial do CPF".

A balança pode pender para a transparência total: o guia cita o Acórdão TCU 1511/2025, que mandou o Transferegov.br publicar o CPF completo de gestores e representantes de empresas em convênios e contratos, porque ali "a transparência se sobrepõe à proteção do CPF nos casos específicos indicados".

A lição para quem desenha o portal: o mascaramento é regra do sistema, não tarefa de alguém com corretivo digital. O guia chama isso de **transparência por desenho**: "os sistemas eletrônicos devem permitir consultas ou extração de dados incorporando mecanismos técnicos de proteção, como mascaramento automático ou anonimização". É o princípio que aplicamos nos [sistemas públicos](/servicos/sistemas-publicos) que construímos: minimização e mascaramento de dados pessoais em telas e relatórios desde o protótipo, e um histórico de auditoria de cada ação, como no [Diconta](/casos/diconta). Se o portal recebe o dado já mascarado do sistema de origem, ninguém precisa lembrar de tarjar nada.

## O que acontece com a prefeitura que esconde demais?

O controle externo cobra a lista completa. Em 4 de novembro de 2026, o TCE-MA determinou, no Acórdão 1.007/2026, que o prefeito de Alto Parnaíba publique e mantenha atualizada no portal da transparência a relação nominal de todos os servidores, com cargas horárias, datas de admissão, formas de ingresso e locais exatos de lotação, "ficando vedada a utilização de termos genéricos", em 30 dias e com comprovação ao Tribunal. O caso nasceu de representação do Ministério Público de Contas por gastos com pessoal acima do limite: sem lista nominal, não há como fiscalizar a folha.

E não é só o Tribunal que cobra: o [artigo sobre "tempo real" no portal](/blog/o-que-e-tempo-real-no-portal-da-transparencia-da-prefeitura) explica quem pode denunciar o ente que descumpre a transparência e qual é a sanção. Veja também [o que o site da prefeitura é obrigado a ter por lei](/blog/o-que-o-site-de-uma-prefeitura-e-obrigado-a-ter-por-lei).

## Por onde começar a adequação do portal?

1. **Liste o que o portal publica sobre pessoas** (servidores, fornecedores pessoa física, diárias, beneficiários) e, para cada campo, pergunte: a LAI ou a LC 131 mandam publicar? Então publica.
2. **Mascare o CPF no sistema de origem**, no padrão `***.999.999-**`, e tire endereço, telefone pessoal, dados de saúde e descontos (pensão, consignados) de qualquer tela pública.
3. **Trate exceções por escrito**: servidor com risco concreto à segurança pode ter a lotação restringida, com decisão motivada no processo.
4. **Registre quem acessa dados completos** dentro da prefeitura: o log é a prova de responsabilização que a LGPD pede.
5. **Não negue pedido de acesso "por LGPD"**: a negativa só vale com uma hipótese da LAI.

Se o portal depende de alguém lembrando de tarjar a planilha antes de subir, o problema é o sistema, não a lei. [Fale com a gente](/#contato): desenhamos a publicação com mascaramento e trilha de auditoria embutidos.

## Perguntas frequentes

### A prefeitura pode trocar o nome do servidor por matrícula no portal?

Como regra geral, não. O STF decidiu em 2015 (ARE 652777, repercussão geral) que é legítimo publicar o nome junto com a remuneração, e o guia da CGU/ANPD lista nome completo e remuneração como dados que devem ser divulgados. Restringir algum dado só cabe em caso concreto de risco à segurança do servidor, com decisão motivada.

### O CPF precisa aparecer no portal da transparência?

Para pagamentos a fornecedores pessoa física, o Decreto 10.540/2020 (art. 8º, I, "e") exige o beneficiário com CPF; folha de pessoal e benefícios previdenciários são exceção. O guia da CGU/ANPD recomenda o CPF descaracterizado, ocultando os três primeiros e os dois últimos dígitos.

### A LGPD permite negar um pedido de acesso à informação?

Não por si só. Segundo o guia da CGU/ANPD de novembro de 2026, a LGPD não cria sigilo nem autoriza o agente público a negar acesso; as hipóteses de restrição estão na LAI, e a negativa precisa citar uma delas e ser motivada.

### A prefeitura pode esconder o CNPJ da empresa que recebeu pagamento?

Não. A LGPD protege dados de pessoa natural, não de pessoa jurídica, e o Decreto 10.540/2020 exige o beneficiário de cada pagamento com CNPJ, além de empenho, liquidação, pagamento e descrição do bem ou serviço.

---

### Fontes

- [Guia de Transparência e Proteção de Dados Pessoais no âmbito do Poder Executivo Federal](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-transparencia-e-protecao-de-dados.pdf/@@display-file/file) (CGU e ANPD, PDF, nov/2026): pp. 46–51.
- [CGU e ANPD lançam Guia de Transparência e Proteção de Dados Pessoais](https://www.gov.br/cgu/pt-br/assuntos/noticias/2026/11/cgu-e-anpd-lancam-guia-de-transparencia-e-protecao-de-dados-pessoais), CGU, 25/11/2026.
- [STF decide que é legítima a divulgação de vencimentos de servidores](https://noticias.stf.jus.br/postsnoticias/stf-decide-que-e-legitima-a-divulgacao-de-vencimentos-de-servidores/), STF, 23/04/2015: ARE 652777, relator Teori Zavascki.
- [Suspensão de Segurança 3.902](https://www.stf.jus.br/arquivo/cms/noticiaNoticiaStf/anexo/SS3902.pdf) (STF, PDF, 08/07/2009): caso "De Olho nas Contas".
- [Lei nº 13.709, de 14 de agosto de 2018 (LGPD)](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) (Câmara): arts. 1º, 6º, 7º e 23.
- [Decreto nº 10.540, de 5 de novembro de 2020](https://legis.senado.leg.br/norma/32921663/publicacao/32921740) (Senado): art. 7º, § 3º, III, e art. 8º, I, "e".
- [Prefeito de Alto Parnaíba é obrigado a divulgar lista detalhada de servidores](https://gilbertoleda.com.br/2026/11/26/prefeito-de-alto-parnaiba-e-obrigado-a-divulgar-lista-detalhada-de-servidores), Gilberto Léda, 26/11/2026: Acórdão TCE-MA 1.007/2026.
