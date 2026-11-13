---
title: Assinatura gov.br substitui o certificado digital na prefeitura?
description: A assinatura gov.br vale na maior parte dos atos da prefeitura. Veja quando o certificado ICP-Brasil continua obrigatório e o que o decreto precisa dizer.
answer: Na maior parte dos casos, sim. A assinatura gov.br é avançada pela Lei 14.063/2020 e a prefeitura pode aceitá-la em requerimentos, contratos e recursos, desde que um decreto municipal diga isso. Atos do prefeito, notas fiscais de empresas e registro de imóveis continuam exigindo certificado ICP-Brasil.
date: 2026-11-13
tags: [gov.br, assinatura eletrônica, certificado digital, prefeituras, govtech]
service: sistemas-publicos
draft: false
---

O fornecedor manda a proposta assinada pelo gov.br. O cidadão protocola um recurso assinado no celular. E o servidor fica na dúvida: aceita ou pede para assinar de novo com certificado digital? A resposta curta é que **a assinatura gov.br vale na maior parte dos atos da prefeitura**, mas quem decide até onde ela vai é o próprio município, por decreto, e alguns atos continuam exigindo o certificado ICP-Brasil por lei.

O assunto deixou de ser nicho. Segundo o Ministério da Gestão e da Inovação, a assinatura gov.br foi usada 95 milhões de vezes só no primeiro semestre de 2025, 90% a mais que no mesmo período de 2024. Os documentos já estão chegando ao balcão. A pergunta é se a prefeitura tem regra para recebê-los.

## Qual a diferença entre assinatura gov.br e certificado digital?

A **Lei 14.063/2020** divide as assinaturas eletrônicas em três níveis:

- **Simples:** identifica quem assinou, mas com pouca garantia. Um login com senha num formulário, por exemplo.
- **Avançada:** está ligada só ao signatário, é criada sob controle exclusivo dele e denuncia qualquer alteração posterior no documento. **É o nível da assinatura gov.br.**
- **Qualificada:** usa certificado digital da **ICP-Brasil**, a infraestrutura oficial de chaves públicas do país, criada pela MP 2.200-2/2001. É o certificado A1 ou A3 que contadores e advogados conhecem. A lei diz que é o nível mais confiável.

Na prática, a assinatura gov.br também usa um certificado. Segundo o Instituto Nacional de Tecnologia da Informação (ITI), ele é emitido automaticamente e de graça para quem tem conta **prata ou ouro**, fica guardado na infraestrutura do ITI e vale por um ano. A diferença é que esse certificado não é ICP-Brasil, e por isso a assinatura é avançada, não qualificada. Conta bronze não assina.

## A prefeitura pode aceitar documentos assinados pelo gov.br?

Pode, e a lei já prevê isso. O art. 5º da Lei 14.063/2020 manda que **o titular do Poder de cada ente federativo estabeleça o nível mínimo de assinatura** para os documentos e interações com o ente. No município, isso significa um decreto do prefeito para o Executivo (a Câmara regula o próprio Legislativo).

A lei dá as balizas. A simples cabe em interações de menor impacto, sem informação sigilosa. A avançada cabe nessas e em outras que o ente admitir. A qualificada vale em qualquer interação, sem cadastro prévio. E, se duas normas conflitarem, prevalece a qualificada.

O governo federal mostra até onde a avançada pode ir. O **Decreto 10.543/2020**, que vale só para a administração federal, aceita a assinatura avançada na manifestação de vontade para contratos, convênios e acordos e na apresentação de defesas e recursos administrativos. Um município pode copiar esse modelo ou ser mais rigoroso: o Decreto 3.734/2023 de Rio das Ostras (RJ), por exemplo, exige certificado digital para contratos, convênios, recursos administrativos e atos do prefeito e dos secretários.

O que não dá é não ter regra. Sem decreto, cada servidor decide no balcão, e o mesmo documento é aceito numa secretaria e recusado na outra.

## Quando o certificado digital ICP-Brasil continua obrigatório?

Aqui o município não escolhe. O § 2º do art. 5º da Lei 14.063/2020 torna a **assinatura qualificada obrigatória** em alguns casos, e três deles batem direto na prefeitura:

1. **Atos assinados por chefes de Poder.** Decretos e atos assinados pelo prefeito precisam de certificado ICP-Brasil.
2. **Notas fiscais eletrônicas**, com exceção das emitidas por pessoas físicas e microempreendedores individuais, para quem a qualificada é facultativa.
3. **Transferência e registro de imóveis.**

A lei também ressalva "outras hipóteses previstas em lei": antes de liberar a avançada para um tipo de documento, vale conferir se uma lei específica pede outra coisa. O mesmo diploma, no art. 13, exige assinatura qualificada em receitas de remédios controlados e atestados médicos eletrônicos, o que interessa à secretaria de saúde.

## O que o decreto municipal de assinatura eletrônica precisa dizer?

Um bom **decreto de assinatura eletrônica** responde, para cada tipo de documento, qual o nível mínimo aceito. Um roteiro simples:

- **Lista de atos por nível.** Agendamento e pedido de informação com assinatura simples; requerimentos, propostas, contratos e recursos com avançada (gov.br); atos do prefeito, notas fiscais e imóveis com qualificada.
- **Servidores e cidadãos.** Se o servidor assina despachos e pareceres com gov.br ou com certificado, e em quais cargos o certificado é exigido.
- **Publicação no site.** O § 4º do art. 5º obriga o ente a informar no site os requisitos para reconhecer a assinatura avançada. Isso entra na lista do [que o site da prefeitura é obrigado a ter](/blog/o-que-o-site-de-uma-prefeitura-e-obrigado-a-ter-por-lei).
- **Atendimento presencial.** O cidadão sem conta prata ou ouro continua podendo assinar no papel. Rio das Ostras escreveu isso no próprio decreto.

## Como o sistema da prefeitura passa a assinar com gov.br?

Aceitar PDFs assinados é o primeiro passo. O segundo é **o próprio sistema pedir a assinatura**: o cidadão ou o servidor clica em "assinar", confirma no gov.br e o documento volta assinado para o processo, sem baixar e subir arquivo.

O caminho oficial é a **API de assinatura eletrônica do gov.br**, mantida pelo ITI. Pelo roteiro de integração:

- A credencial é pedida por um gestor público, e a de produção exige que o sistema já esteja integrado ao Login Único e hospedado em domínio oficial do governo (o .gov.br). Se essa parte ainda não existe, ela vem antes: explicamos o passo a passo em [como integrar o login gov.br ao sistema da prefeitura](/blog/como-integrar-o-login-gov-br-ao-sistema-da-prefeitura).
- O sistema envia o resumo criptográfico do documento (o **hash**, uma espécie de impressão digital do arquivo) e recebe a assinatura de volta. Dá para assinar um documento por vez ou até 100 numa mesma sessão.
- A mesma API aceita assinatura qualificada com certificado ICP-Brasil em nuvem, o que resolve no mesmo fluxo os atos em que o gov.br não basta.
- Contas bronze precisam ser barradas antes, com uma mensagem explicando como subir de nível.
- A homologação pede um vídeo demonstrando o fluxo com conta bronze e com conta prata ou ouro.

O que a API não faz é decidir quem pode assinar o quê. Alçadas, ordem de assinaturas e prazos são desenho do sistema. É o que fazemos em [sistemas públicos](/servicos/sistemas-publicos): workflows de parecer e aprovação com assinatura digital no lugar de papel e e-mail, e cada etapa na trilha de auditoria. O [Diconta](/casos/diconta), ERP contábil que construímos, segue a mesma lógica: assinatura digital e histórico de auditoria dentro do sistema, não em ferramentas soltas.

Se a sua prefeitura quer tirar os processos do papel e do e-mail, [abra um caso](/#contato). Começamos pelo mapa de quem assina o quê, e a tecnologia entra depois.

## Perguntas frequentes

### A assinatura gov.br tem validade jurídica?

Sim. A Lei 14.063/2020 e o Decreto 10.543/2020 dão validade jurídica à assinatura gov.br, classificada como assinatura eletrônica avançada. Em órgãos públicos, ela vale nos atos em que o ente admitir esse nível.

### A prefeitura pode recusar um documento assinado pelo gov.br?

Pode, se o ato exigir assinatura qualificada por lei ou se o decreto municipal pedir certificado ICP-Brasil para aquele tipo de documento. Sem regra publicada, a recusa fica difícil de justificar, por isso o decreto é o primeiro passo.

### O prefeito pode assinar decretos com a conta gov.br?

Não. A Lei 14.063/2020 exige assinatura qualificada, com certificado ICP-Brasil, nos atos assinados por chefes de Poder. O prefeito, como chefe do Executivo municipal, precisa de certificado digital.

### Como conferir se um documento assinado pelo gov.br é válido?

Pelo validador oficial do ITI, em validar.iti.gov.br, o mesmo serviço indicado no roteiro de integração da API. Ele confere a assinatura do arquivo enviado e aponta se ela é válida.

### Quem precisa de conta prata ou ouro para assinar?

Todo mundo que assina pelo gov.br, cidadão ou servidor. Conta bronze não assina, e o sistema da prefeitura deve avisar como subir de nível antes de pedir a assinatura.

---

### Fontes

- Brasil, [Lei nº 14.063/2020](https://www2.camara.leg.br/legin/fed/lei/2020/lei-14063-23-setembro-2020-790659-normaatualizada-pl.pdf), art. 4º, 5º e 13.
- Brasil, [Decreto nº 10.543/2020](https://www2.camara.leg.br/legin/fed/decret/2020/decreto-10543-13-novembro-2020-790792-normaatualizada-pe.pdf), art. 1º e 4º.
- ITI, [Assinatura eletrônica avançada](https://www.gov.br/iti/pt-br/assuntos/assinatura-eletronica-avancada).
- Agência Gov, [Uso da Assinatura GOV.BR cresce 90% no primeiro semestre de 2025](https://agenciagov.ebc.com.br/noticias/202507/uso-da-assinatura-gov-br-cresce-90-no-primeiro-semestre-de-2025) (21 jul. 2025).
- ITI, Roteiro de Integração da API de Assinatura gov.br: [Passo a passo](https://manual-integracao-assinatura-eletronica.readthedocs.io/en/latest/iniciarintegracao.html).
- Prefeitura de Rio das Ostras, [Decreto nº 3.734/2023](https://riodasostras.rj.gov.br/wp-content/uploads/2024/07/decreto-3734-2023-assinatura-eletronica-1.pdf).
