---
title: Como integrar o login gov.br ao sistema da prefeitura?
description: Adesão à Rede Gov.br, credencial, domínio .gov.br e níveis bronze, prata e ouro. O caminho oficial, sem custo, para o cidadão entrar com a conta que já tem.
answer: É gratuito e o caminho é oficial. A prefeitura adere à Rede Gov.br, pede a credencial do Login Único à Secretaria de Governo Digital e o sistema, hospedado num domínio .gov.br, autentica pelo padrão OAuth 2.0 com OpenID Connect. O cidadão entra com a conta que já tem e o sistema recebe CPF, nome e nível da conta.
date: 2026-11-12
tags: [gov.br, prefeituras, login único, govtech, lgpd]
service: sistemas-publicos
draft: false
---

Cada sistema da prefeitura tem o seu próprio cadastro: um para o protocolo, outro para a nota fiscal de serviço, outro para a matrícula escolar. O cidadão esquece a senha, o servidor reseta o acesso. Enquanto isso, **175 milhões de brasileiros já têm uma conta gov.br** e usam a mesma senha para o INSS, a carteira de trânsito e o imposto de renda.

A resposta curta: dá para usar essa conta no sistema da prefeitura, é de graça e o caminho é oficial. Abaixo, as etapas, o que o sistema recebe e que nível de conta exigir em cada serviço.

## O que é o Login Único do gov.br?

O **Login Único** é a plataforma de autenticação digital do cidadão, mantida pela Secretaria de Governo Digital (SGD) do Ministério da Gestão e da Inovação em Serviços Públicos. Em março de 2026, segundo a Agência Gov, a conta gov.br chegou a 175 milhões de usuários e dá acesso a mais de 4.600 serviços federais e 8.700 serviços de estados e municípios.

Tecnicamente, funciona como o "Entrar com Google" dos aplicativos: o seu sistema manda o cidadão para o gov.br, ele se identifica lá, e o gov.br devolve um comprovante assinado de quem é aquela pessoa. O padrão é o **OAuth 2.0 com OpenID Connect**, um protocolo aberto de autenticação que toda linguagem de programação já tem biblioteca pronta para usar.

## A prefeitura pode usar o login gov.br? Custa alguma coisa?

Pode, e não custa. O Decreto 12.069/2024 regula a **Rede Nacional de Governo Digital (Rede Gov.br)**, de adesão voluntária, e prevê acesso gratuito às ferramentas da Plataforma gov.br disponíveis para governos locais. Em maio de 2025, a Agência Gov registrava 1.800 municípios na rede, com acesso gratuito ao login gov.br, à assinatura eletrônica com validade jurídica e à prova de vida digital.

A adesão é o primeiro passo e também o pré-requisito legal: o artigo 8º da Portaria SGD/MGI 7.076/2024 diz que estados e municípios precisam aderir à Rede Gov.br antes de pedir a integração. O roteiro é simples: um servidor entra em plataforma.rede.gov.br com a própria conta gov.br, informa o município, confirma um código recebido por SMS ou pelo aplicativo e baixa o termo assinado. Nada disso é obrigatório: a Lei 14.129/2021, a Lei do Governo Digital, só vale para os municípios que a adotarem por ato próprio. É uma escolha, mas é a que tira da prefeitura o custo de manter cadastro e senha em cada sistema.

## Quais são as etapas da integração?

O Roteiro de Integração do Login Único, atualizado em outubro de 2025, descreve o caminho do pedido à produção:

1. **Adesão à Rede Gov.br.**
2. **Pedido da credencial.** Pelo Serviço de Integração aos Produtos do Ecossistema da Identidade Digital GOV.BR, a prefeitura pede uma credencial de homologação (teste) e depois uma de produção, com prazo de 3 dias para cada uma. A de produção só sai para sistemas hospedados em **domínio oficial de governo** (como `prefeitura.uf.gov.br`), por força do artigo 3º da Portaria 7.076/2024, e depois da homologação pela SGD, que avalia um vídeo do fluxo de login e saída.
3. **Desenvolvimento.** O sistema ganha o botão "Entrar com GOV.BR" no padrão do Design System de Governo e implementa o fluxo: todo o canal em HTTPS, URL de retorno cadastrada na credencial, proteção PKCE (uma camada extra contra interceptação do código de acesso), validação da assinatura dos tokens e uma sessão própria do sistema. O roteiro é explícito: o token do gov.br não serve como sessão, e fica no servidor, não no navegador.
4. **Produção e acompanhamento.** No ar, o órgão informa mensalmente à SGD, até o dia 5, os dados das integrações.

O que consome tempo não é a burocracia, e sim o desenho de quem acessa o quê. É aí que entra o [sistema público com padrão de produto](/servicos/sistemas-publicos): o login gov.br resolve a identidade; perfis, alçadas e trilha de auditoria continuam sendo responsabilidade do sistema da prefeitura.

## Que dados do cidadão o sistema recebe?

Depois da autenticação, o gov.br entrega ao sistema um token com o **CPF**, o nome, o nome social quando existir, o e-mail e o telefone (se forem pedidos e estiverem validados), a foto, a forma como a pessoa se autenticou (senha, banco, certificado digital, QR Code do aplicativo ou segundo fator) e as **informações de confiabilidade** da conta. Com o escopo `govbr_empresa`, o sistema consulta os CNPJs vinculados àquele CPF e o papel da pessoa em cada empresa: sócio, contador, representante legal ou colaborador.

Aqui vale uma regra de LGPD: **peça só os escopos que o serviço precisa**. Se o cidadão não tiver o e-mail ou o telefone validados, o gov.br exige que ele cadastre antes de continuar: atrito sem motivo quando o serviço nem usa esse dado. Minimização de dados evita que a prefeitura vire guardiã de informação que não usa.

## Bronze, prata ou ouro: qual nível exigir?

A conta gov.br tem três **níveis de confiabilidade**: bronze (nível 1, cadastro por formulário), prata (nível 2, validação pelos dados bancários em um dos 17 bancos credenciados ou reconhecimento facial com a CNH) e ouro (nível 3, QR Code da Carteira de Identidade Nacional, reconhecimento facial com os dados da Justiça Eleitoral ou certificado digital ICP-Brasil). Em março de 2026, 83,4 milhões de contas já eram ouro. O roteiro orienta que novas integrações leiam o nível no campo `reliability_info` do token, em vez da consulta antiga por CPF, marcada como obsoleta.

O nível a exigir depende do que o serviço permite fazer. Referência real: o SEI do Estado do Rio de Janeiro libera automaticamente usuários externos com conta prata ou ouro; quem tem bronze precisa enviar documentos. Um critério parecido serve para a prefeitura:

- **Bronze basta** para consultar andamento de protocolo, agendar atendimento ou ver informação que já é pública.
- **Prata ou ouro** para assinar requerimentos, acessar dados sensíveis (saúde, assistência social, situação fiscal), pedir benefício ou agir em nome de uma empresa.

Como o nível vem em cada login, o sistema exige ouro só na função que precisa, sem perder na porta o cidadão que só queria ver a situação do alvará.

## O que muda para o servidor e para o cidadão?

Para o cidadão, uma senha a menos e a certeza de que o sistema é oficial. Para a prefeitura, acaba o trabalho de criar, validar e recuperar cadastros, e cada ação fica ligada a um CPF verificado, o que fortalece a **trilha de auditoria** dos sistemas públicos.

O que não muda: o login gov.br diz quem a pessoa é, não o que ela pode fazer. Perfis (cidadão, servidor, fiscal, gestor), alçadas e permissões por secretaria continuam sendo desenho do sistema da prefeitura. É o mesmo princípio do [Diconta](/casos/diconta), em que um usuário acessa vários CNPJs com permissões diferentes em cada um e todo acesso fica no histórico de auditoria.

Se o site da sua prefeitura ainda está colocando a casa em ordem, vale conferir antes [o que ele é obrigado a ter por lei](/blog/o-que-o-site-de-uma-prefeitura-e-obrigado-a-ter-por-lei). E se a integração com o gov.br já está no plano, [abra um caso](/#contato): começamos pelo mapa de quem acessa o quê, e o login entra em cima dele.

## Perguntas frequentes

### A prefeitura é obrigada a usar o login gov.br?

Não. A adesão à Rede Gov.br é voluntária (Decreto 12.069/2024) e a Lei do Governo Digital só vale para os municípios que a adotarem por ato próprio. As diretrizes da Portaria SGD/MGI 7.076/2024 valem para os órgãos federais; para a prefeitura, integrar é decisão própria.

### Quanto custa usar o login gov.br no sistema da prefeitura?

Nada. O Decreto 12.069/2024 prevê acesso gratuito às ferramentas da Plataforma gov.br para quem adere à Rede Gov.br; segundo a Agência Gov, isso inclui login, assinatura eletrônica e prova de vida digital. O investimento é no desenvolvimento e na homologação do próprio sistema.

### O sistema precisa estar em um domínio .gov.br?

Sim, para receber a credencial de produção. O artigo 3º da Portaria SGD/MGI 7.076/2024 exige que o sistema integrado esteja hospedado em domínio oficial de governo, como gov.br, leg.br ou jus.br.

### Quanto tempo leva para conseguir a credencial do Login Único?

O roteiro técnico indica 3 dias para a credencial de homologação e 3 dias para a de produção. O tempo real do projeto fica no desenvolvimento, nos testes e na homologação pela SGD.

### Dá para exigir conta ouro só em alguns serviços?

Sim. O nível da conta chega ao sistema em cada login, no campo `reliability_info`, então dá para liberar consultas com conta bronze e exigir prata ou ouro apenas nas funções que assinam, pagam ou acessam dados sensíveis.

---

### Fontes

- Agência Gov, [GOV.BR conquista 175 milhões de usuários](https://agenciagov.ebc.com.br/noticias/202603/gov-br-alcanca-a-marca-de-175-milhoes-de-usuarios-1-bilhao-acessos) (24 mar. 2026).
- Agência Gov, [Rede GOV.BR alcança 1,8 mil municípios](https://agenciagov.ebc.com.br/noticias/202505/rede-gov-br-alcanca-1-800-municipios-e-fortalece-a-transformacao-digital-em-todos-os-niveis-de-governo) (9 maio 2025).
- Brasil, [Decreto nº 12.069/2024](https://www2.camara.leg.br/legin/fed/decret/2024/decreto-12069-21-junho-2024-795831-normaatualizada-pe.html), art. 11 e 15.
- SGD/MGI, [Portaria nº 7.076/2024](https://sintse.tse.jus.br/documentos/2024/Out/11/para-conhecimento-institucional/republicacao-portaria-no-7-076-de-2-de-outubro-de-2024-estabelece-diretrizes-e-padroes-para-a), art. 3º, 8º e 11.
- SGD, Roteiro de Integração do Login Único: [Passo-a-Passo para Integrar](https://acesso.gov.br/roteiro-tecnico/iniciarintegracao.html) e [Solicitar Credencial](https://acesso.gov.br/roteiro-tecnico/solicitacaocredencialprocesso.html) (30 out. 2025).
- SGD/MGI, [Adesão do município à Rede Gov.br](https://www.gov.br/governodigital/pt-br/estrategias-e-governanca-digital/rede-nacional-de-governo-digital/passo-a-passo-adesao-municipio.pdf) (jul. 2023).
- Brasil, [Lei nº 14.129/2021](https://www2.camara.leg.br/legin/fed/lei/2021/lei-14129-29-marco-2021-791203-normaatualizada-pl.pdf), art. 2º.
- Governo do RJ, [Login Único gov.br no SEI-RJ](https://www.portalsei.rj.gov.br/documentos/SEIRJ_Manual_LoginUnicoGovBr.pdf).
