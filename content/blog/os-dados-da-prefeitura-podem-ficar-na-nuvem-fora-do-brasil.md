---
title: Os dados da prefeitura podem ficar na nuvem fora do Brasil?
description: A LGPD não proíbe, mas só permite com cláusulas-padrão da ANPD. Em 2026 o governo federal decidiu trazer os dados sigilosos de volta. O que exigir no contrato.
answer: Podem, com condições. A LGPD só permite transferência internacional com uma garantia do art. 33, na prática as cláusulas-padrão da ANPD (Resolução 19/2024). Dados com sigilo legal (fiscal, saúde, processos) merecem ficar sob jurisdição brasileira, como o governo federal decidiu em 2026. Quem decide é o contrato.
date: 2026-11-28
tags: [nuvem, LGPD, soberania de dados, prefeitura, CLOUD Act]
service: sistemas-publicos
draft: true
---

A empresa que vai fazer o sistema propõe hospedar tudo "na nuvem" de um provedor americano. O procurador pergunta se pode, a TI diz que todo mundo faz, e ninguém sabe apontar a regra. **Pode, mas não de qualquer jeito: a LGPD trata guardar dados pessoais num provedor fora do país como transferência internacional, e isso exige garantia escrita.** E, em 2026, o próprio governo federal decidiu que dados sigilosos não ficam mais sob jurisdição estrangeira.

## A LGPD proíbe guardar dados da prefeitura fora do Brasil?

Não proíbe, mas condiciona. A **LGPD** (Lei 13.709/2018) se aplica a qualquer tratamento "independentemente do meio, do país de sua sede ou do país onde estejam localizados os dados" (art. 3º), desde que a operação aconteça no Brasil ou os dados tenham sido coletados aqui. Ou seja: mudar o servidor de país não tira a prefeitura da lei.

O art. 33 diz que a transferência internacional "somente é permitida" em hipóteses listadas. As que servem a uma prefeitura são três: países que a ANPD reconheça como adequados (até agora, só a União Europeia, pela Resolução 32/2026), as **cláusulas-padrão contratuais** definidas pela ANPD, ou a execução de política pública, com publicidade na forma do art. 23. A Resolução CD/ANPD 19/2024 trouxe o texto dessas cláusulas (Anexo II), que, segundo a ANPD, devem ser usadas sem modificação, e deu 12 meses para adequar os contratos: o prazo venceu em agosto de 2025.

E hospedar é transferir? A resolução define transferência como quando um agente "transmite, compartilha ou disponibiliza acesso a dados pessoais a outro agente de tratamento" e importador como o agente "localizado em país estrangeiro". O provedor de nuvem é um operador, que trata os dados "segundo as instruções fornecidas pelo controlador" (art. 39). A leitura mais segura, portanto: servidor fora do país é transferência internacional, e precisa das cláusulas no contrato.

## Se o servidor fica em São Paulo, o problema acabou?

Não. **Localização e jurisdição são coisas diferentes.** Os grandes provedores têm regiões no Brasil, e escolher uma delas evita a transferência internacional. Mas em março de 2018 os Estados Unidos aprovaram o CLOUD Act, que obriga provedores sujeitos à jurisdição americana a entregar dados a autoridades dos EUA "regardless of whether such communication, record, or other information is located within or outside of the United States". A AWS explica que a lei "também se aplica a qualquer provedor de serviços com operações nos EUA" e que os dados pedidos "podem incluir dados armazenados nos EUA ou fora dos EUA". A empresa diz que contesta pedidos abrangentes e que, até junho de 2025, nenhum resultou em entrega de conteúdo governamental guardado fora dos EUA; é a declaração dela sobre si mesma.

Foi esse o ponto da ministra da Gestão, Esther Dweck, ao Olhar Digital em setembro de 2026: "Nossa maior preocupação é a jurisdição ser brasileira". O presidente do Serpro, Wilton Mota, resumiu em agosto: "Soberania em nuvem não é uma condição binária, nem pode ser definida apenas pelo lugar onde o dado está armazenado."

## O que o governo federal decidiu fazer com os próprios dados

Separar por grau de sigilo. A **Nuvem de Governo**, segundo o portal Governo Digital, é "infraestrutura de nuvem privada ou comunitária gerida exclusivamente por órgãos ou empresas públicas", em datacenters do Serpro e da Dataprev. A regra, obrigatória para os órgãos federais do SISP desde abril de 2024 pela Portaria SGD/MGI 5.950/2023, é que "devem ser mantidas no ambiente as cargas de trabalho que tratem informação com restrição de acesso prevista na legislação": sigilo fiscal, bancário, empresarial, policial, processual.

O resto não sai da nuvem comercial. O Serpro informou em agosto de 2026 que "dados públicos continuam sendo processados nas nuvens dos grandes provedores, dentro de um guarda-chuva contratual gerenciado pelo Serpro", enquanto os classificados "migram para a nuvem soberana, ambiente com controle jurisdicional brasileiro", com meta de concluir até 2027. A ministra disse à Tele.Síntese que "não vai rescindir nenhum contrato imediatamente" e que Serpro e Dataprev já investiram cerca de R$ 1,8 bilhão; a migração do CadSUS e da RNDS, com mais de 5 bilhões de registros de saúde, começou em agosto de 2026, segundo o Sindpd.

A portaria não obriga a prefeitura. Mas o critério é o mais útil que existe: **classificar antes de contratar**.

## Que dados da prefeitura precisam de mais cuidado?

Três faixas, do mais livre ao mais restrito:

- **Públicos por lei**: portal da transparência, site, diários oficiais, dados abertos. Qualquer nuvem séria serve; o que importa é disponibilidade e [o que o portal é obrigado a mostrar](/blog/a-lgpd-deixa-esconder-nome-e-salario-no-portal-da-transparencia).
- **Dados pessoais comuns**: cadastro de contribuintes, matrículas escolares, protocolos de atendimento. Exigem garantia do art. 33 se saírem do país, segurança (art. 46) e finalidade pública (art. 23).
- **Sigilo legal e dados sensíveis**: prontuários das unidades de saúde, cadastros da assistência social, processos disciplinares, dados fiscais do IPTU e do ISS. É a faixa que o governo federal está trazendo para jurisdição brasileira. Para a prefeitura, o mínimo é região no Brasil, criptografia com chaves próprias e contrato que diga quem responde a um pedido estrangeiro.

Atenção ao que sai pela porta dos fundos: backup em outra região, logs, e-mail e, cada vez mais, APIs de IA que processam o texto do cidadão fora do país. [IA no atendimento da prefeitura](/blog/a-prefeitura-pode-usar-ia-para-atender-o-cidadao) e [dados colados em ferramentas gratuitas](/blog/posso-colar-dados-de-clientes-no-chatgpt-o-que-diz-a-lgpd) entram na mesma conta.

## O que exigir no contrato e no sistema

1. **Conta em nome da prefeitura.** A nuvem, o domínio e o banco ficam numa conta do órgão, não do fornecedor. É assim que trabalhamos em [sistemas públicos](/servicos/sistemas-publicos) e é o que evita a briga do [código é meu?](/blog/o-codigo-do-sistema-que-a-minha-empresa-pagou-e-meu) na troca de fornecedor.
2. **Região do dado por escrito.** O contrato nomeia a região (inclusive do backup) e, se qualquer dado pessoal sair do país, anexa as cláusulas-padrão da ANPD sem alteração.
3. **Chaves de criptografia da prefeitura.** A AWS mesma diz que "o conteúdo criptografado é inútil sem as chaves de descriptografia relevantes" e oferece chaves "inacessíveis à AWS". Sem a chave, uma ordem estrangeira entrega texto ilegível.
4. **Transparência ao cidadão.** A Resolução 19 exige um documento público, em linguagem simples, com "o país de destino dos dados transferidos" (art. 17, § 2º); a LGPD exige um encarregado no órgão (art. 23, III). Publique os dois no portal.
5. **Trilha de auditoria e plano de saída.** Cada acesso registrado e exportação em formato aberto, como o histórico de auditoria que construímos no [Diconta](/casos/diconta). Se o provedor mudar de política, a prefeitura troca de provedor sem perder dado.

Se a sua prefeitura está escolhendo onde o sistema vai morar, [fale com a gente](/#contato): começamos pela classificação dos dados e pelo contrato, antes do servidor.

## Perguntas frequentes

### Hospedar na região "São Paulo" de um provedor americano é transferência internacional?

Pela definição da Resolução 19/2024, transferência internacional é a que vai para um agente em país estrangeiro; com o dado numa região brasileira, a leitura usual é que não há transferência. Mas o CLOUD Act alcança provedores com operações nos EUA onde quer que o dado esteja, então jurisdição continua sendo uma decisão à parte.

### A prefeitura precisa pedir autorização à ANPD para usar nuvem estrangeira?

Não como regra. A autorização específica é uma das hipóteses do art. 33, mas a via comum é adotar as cláusulas-padrão da ANPD sem alteração; cláusulas específicas só valem se aprovadas antes pela ANPD, e até agora nenhuma foi.

### O e-mail dos servidores pode ficar no Google Workspace ou no Microsoft 365?

Pode, com as mesmas condições: cláusulas-padrão se os dados saírem do país, documento público informando o destino e regra interna sobre o que não circula por e-mail, como prontuários e dados fiscais.

### Existe lei obrigando a prefeitura a usar nuvem brasileira?

Não. A Portaria SGD/MGI 5.950/2023 obriga só os órgãos federais do SISP a manter informações com restrição de acesso na Nuvem de Governo. Para municípios, valem a LGPD e a classificação dos dados antes de contratar.

---

### Fontes

- [Lei nº 13.709, de 14 de agosto de 2018 (LGPD)](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html) (Câmara): arts. 3º, 23, 33, 35, 39 e 46.
- [Resolução CD/ANPD nº 19, de 23 de agosto de 2024](https://arq.migalhas.com.br/arquivos/2026/2/DC8DD5485D6EBE_RESOLUCAOCD_ANPDN%C2%BA19,DE23DEAGO.pdf) (PDF, cópia do DOU): art. 2º; Regulamento arts. 3º, 5º, 6º e 17; Anexo II.
- [Transferência Internacional de Dados](https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados/international-affairs), ANPD: cláusulas-padrão, 12 meses, União Europeia (Resolução 32/2026).
- [ANPD exige salvaguardas para transferência internacional de dados](https://convergenciadigital.com.br/governo/anpd-exige-salvaguardas-para-transferencia-internacional-de-dados), Convergência Digital, 23/08/2024.
- [CLOUD Act Resources](https://www.justice.gov/criminal/cloud-act-resources), Departamento de Justiça dos EUA: texto integral (18 U.S.C. § 2713).
- [Lei de Esclarecimento do Uso Lícito de Dados no Exterior (CLOUD)](https://aws.amazon.com/pt/compliance/cloud-act/), AWS.
- [Nuvem de Governo](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/ambiente-tecnologico/nuvem/nuvem-de-governo), Governo Digital: Portaria SGD/MGI 5.950/2023.
- [Nuvem de Governo do Serpro mantém dados sigilosos sob jurisdição brasileira](https://www.serpro.gov.br/menu/noticias/noticias-2026/forum-rnp-2026), Serpro, 26/08/2026.
- [Serpro leva critérios de soberania e a experiência da Nuvem de Governo à Nuvem Brasileira](https://www.serpro.gov.br/menu/noticias/noticias-2026/serpro-soberania-na-nuvem), Serpro, 21/08/2026.
- [Governo brasileiro quer nuvem própria com controle sobre código e dados](https://olhardigital.com.br/2026/09/15/pro/governo-brasileiro-quer-nuvem-propria-com-controle-sobre-codigo-e-dados/), Olhar Digital, 15/09/2026.
- [Governo prepara migração de dados estratégicos para infraestrutura sob controle brasileiro](https://telesintese.com.br/governo-prepara-migracao-de-dados-estrategicos-para-infraestrutura-sob-controle-brasileiro/), Tele.Síntese, 14/09/2026.
- [Brasil já investiu mais de R$ 1,8 bilhão em nuvem soberana](https://sindpd.org.br/2026/10/02/brasil-1-8-bi-nuvem-soberana/), Sindpd, 02/10/2026.
