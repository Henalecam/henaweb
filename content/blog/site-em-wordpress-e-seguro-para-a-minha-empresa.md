---
title: Site em WordPress é seguro para a minha empresa?
description: O WordPress teve 11.334 falhas de segurança em 2025, 91% em plugins e 46% sem correção ao serem divulgadas. O que isso significa para o site da sua empresa.
answer: Pode ser, desde que alguém cuide dele toda semana. O núcleo do WordPress teve só 6 falhas de baixa gravidade em 2025; o risco está nos plugins (91% das 11.334 falhas do ano) e no site que ninguém atualiza. Menos plugins, atualização automática, backup fora do servidor e um responsável nomeado resolvem a maior parte.
date: 2026-11-28
tags: [wordpress, segurança, plugins, site institucional, manutenção]
service: sites-e-produtos
draft: true
---

Alguém avisou que "WordPress é inseguro" e agora você olha para o site da empresa com desconfiança. Ou o site foi entregue há dois anos e ninguém mais mexeu nele. **A pergunta certa não é se o WordPress é seguro, é quem cuida do seu.**

## Quantas falhas de segurança o WordPress teve em 2025?

Segundo o relatório *State of WordPress Security in 2026*, da Patchstack, empresa que cataloga vulnerabilidades do ecossistema, **11.334 novas falhas foram encontradas no WordPress em 2025**, 42% a mais que em 2024. A distribuição é o que importa: 91% estavam em plugins, 9% em temas e só 6 no núcleo do WordPress, todas de baixa prioridade. Do total, 1.966 (17%) tinham gravidade alta e 4.124 (36%) representavam ameaça real, não só teórica.

O número mais incômodo do relatório: **46% das falhas não tinham correção quando foram divulgadas**. Quase metade das vezes, o dono do site sabe do problema antes de existir uma versão corrigida.

Por que tanta atenção a um sistema só? Porque ele é o alvo mais comum: segundo a W3Techs, em 27 de novembro de 2026 o WordPress estava em **38,3% de todos os sites** do mundo. Quem ataca em massa escreve para o que existe em massa.

## Por que o perigo está nos plugins?

Um **plugin** é um programa de terceiros instalado dentro do WordPress para ganhar uma função: formulário, slider, SEO, botão do WhatsApp. É código de outra pessoa rodando no seu servidor, com os mesmos poderes do site. E o dono desse código pode mudar sem você saber.

Foi o que aconteceu em 2026. Segundo a Anchor Hosting, empresa americana de hospedagem que investigou o caso, a EssentialPlugin, desenvolvedora que mantinha mais de 30 plugins no repositório oficial, foi vendida pela plataforma Flippa a um comprador identificado só como "Kris", por um valor "de seis dígitos". Em 8 de agosto de 2025 uma versão nova trouxe um código escondido, que ficou **oito meses adormecido** e foi ativado em 5 e 6 de abril de 2026: ele reescrevia um arquivo central do site e passava a injetar spam e redirecionamentos que só apareciam para o robô do Google. O dono do site abria a página e via tudo normal. A Patchstack listou mais de 20 plugins afetados, com faixas de instalação entre mil e mais de 30 mil sites cada, e resumiu a lição: "site administrators should treat such transitions with caution".

O WordPress.org fechou os plugins em 7 de abril e forçou uma atualização automática no dia seguinte. Mas, segundo a Anchor Hosting, a atualização desativou a brecha sem limpar o que já tinha sido injetado: quem não conferiu os arquivos continuou servindo spam.

## Em quanto tempo o site precisa ser atualizado?

Menos do que a maioria imagina. A Patchstack mediu que, para as falhas mais exploradas, **a mediana entre a divulgação e a exploração em massa é de 5 horas**, e que cerca de metade das falhas de alto impacto é explorada em 24 horas.

Em julho de 2026 isso ficou visível com o *wp2shell*, uma combinação de duas falhas no próprio núcleo do WordPress (CVE-2026-60137 e CVE-2026-63030). Segundo a SecurityWeek, o ataque "can be exploited by an anonymous user in a stock install of WordPress with no plugins": não precisava de plugin nenhum. As correções (versões 6.9.5 e 7.0.2) saíram numa sexta-feira; segundo a Help Net Security, desde a noite daquela sexta havia invasores explorando sites sem a atualização, e, segundo a SecurityWeek, provas de conceito públicas apareceram em horas. O WordPress.org acionou a atualização forçada, que só alcança sites com o recurso ligado.

> Se a segurança do seu site depende de alguém lembrar de atualizar, o atacante é mais rápido do que a lembrança.

## O que acontece quando o site da empresa é invadido?

Quase nunca é uma página pichada. Segundo a Malwarebytes, um site invadido pode receber um código discreto que mostra ao visitante **telas falsas de login** imitando Microsoft 365, Google ou bancos, leva a downloads de malware ou a golpes com pedido de pagamento, e deixa avisos de segurança no navegador e nas buscas que persistem depois da limpeza. No caso da EssentialPlugin, o site virava vitrine de spam no Google enquanto o dono via a página normal.

Para a empresa, o custo vem em três contas: o cliente que caiu no golpe no seu endereço, o Google que rebaixa ou marca o site, e a LGPD, se o site guarda dados de clientes num formulário: vazamento é incidente de segurança, com o dever de comunicação que explicamos em [posso colar dados de clientes no ChatGPT](/blog/posso-colar-dados-de-clientes-no-chatgpt-o-que-diz-a-lgpd).

## Como manter um site em WordPress seguro?

Seis cuidados cobrem a maior parte do risco, e nenhum exige programador:

1. **Menos plugins.** Desinstale (não só desative) o que não usa e prefira plugins com atualização recente e dono conhecido. Se o site tem 25 plugins, a pergunta é o que cada um faz pelo cliente.
2. **Atualização automática ligada** para núcleo, plugins e temas, numa hospedagem que aplica correções sozinha. Com mediana de 5 horas até a exploração, atualizar "no fim do mês" não protege.
3. **Backup diário fora do servidor.** Foi comparando backups de dias diferentes que a Anchor Hosting viu o arquivo central do site quase triplicar de tamanho e descobriu a invasão. Backup no mesmo servidor some junto com o site.
4. **Acessos com dono.** Um usuário por pessoa, autenticação em dois fatores, nada de login "admin", e remoção de quem saiu da empresa ou da agência.
5. **Um responsável nomeado** no contrato de quem fez o site ou de quem hospeda: quem atualiza, com que frequência, e quem é chamado quando o Google avisa. Sem nome, ninguém faz.
6. **Monitoramento**: alerta de alteração de arquivos e o Google Search Console configurado para avisar sobre problemas de segurança. É o jeito de ver o que o visitante não vê.

## WordPress ou site sem painel: qual faz sentido para a minha empresa?

Depende do que o site faz todo dia. Se a equipe publica com frequência, vende com WooCommerce ou depende de plugins específicos, o WordPress bem cuidado é uma escolha razoável, e a lista acima é o preço.

Se o site é institucional ou uma landing page, que muda pouco e existe para gerar contato, há um caminho com menos superfície de ataque: um **site estático**, em que as páginas são geradas antes de alguém acessar e entregues como arquivos prontos, sem painel de login, banco de dados ou plugins expostos no servidor público. É como fazemos em [sites e produtos](/servicos/sites-e-produtos), com a mesma arquitetura que faz [o site aguentar um pico de acessos](/blog/meu-site-aguenta-um-pico-de-acessos-como-saber-antes-que-caia). O site do [Contacerta](/casos/contacerta) e a landing do [Camargo Legal](/casos/camargo-legal) seguem esse modelo: o conteúdo chega pronto, e o que é interativo (quiz, calculadora) não depende de um painel de administração exposto na internet. Quando a empresa precisa editar textos, um painel de conteúdo separado alimenta o site sem ficar exposto nele.

Estático não quer dizer sem manutenção: bibliotecas também recebem correções e [o domínio continua precisando de dono](/blog/o-dominio-do-meu-site-e-meu-como-conferir-e-nao-perder). Mas a lista do que pode dar errado fica bem mais curta.

Se você não sabe quando o site da sua empresa foi atualizado pela última vez, ou quantos plugins ele tem, [fale com a gente](/#contato): a gente olha junto.

## Perguntas frequentes

### WordPress é inseguro?

Não por si. Em 2025, segundo a Patchstack, só 6 das 11.334 falhas do ecossistema estavam no núcleo do WordPress, todas de baixa prioridade; 91% estavam em plugins. O que torna um site inseguro é o excesso de plugins e a falta de alguém que atualize.

### Quantos plugins um site de empresa pode ter?

Não existe número mágico, mas cada plugin é um fornecedor com acesso ao seu servidor, e o dono dele pode mudar sem aviso, como no caso da EssentialPlugin em 2026. Um site institucional costuma funcionar com poucos; se passa de uma dúzia, vale revisar o que cada um faz.

### O site da minha empresa foi invadido: o que fazer primeiro?

Coloque uma página de manutenção, troque todas as senhas (site, hospedagem, banco de dados) e restaure um backup anterior à invasão. Depois atualize tudo, remova plugins desconhecidos e peça uma varredura. Se o site guardava dados de clientes, avalie a comunicação do incidente prevista na LGPD.

### Preciso contratar manutenção para o site?

Se o site roda WordPress, sim, de alguém: a hospedagem gerenciada, a agência ou uma pessoa interna com rotina semanal. Com falhas exploradas em horas, um site sem responsável vai ser invadido, só não se sabe quando.

---

### Fontes

- [State of WordPress Security in 2026](https://patchstack.com/whitepaper/state-of-wordpress-security-in-2026/), Patchstack (atualizado em 25/02/2026)
- [Usage statistics and market share of WordPress](https://w3techs.com/technologies/details/cm-wordpress), W3Techs (27/11/2026)
- [Someone bought 30 WordPress plugins and planted a backdoor in all of them](https://anchor.host/someone-bought-30-wordpress-plugins-and-planted-a-backdoor-in-all-of-them/), Anchor Hosting (09/04/2026)
- [Critical supply chain compromise on 20+ plugins by EssentialPlugin](https://www.patchstack.com/articles/critical-supply-chain-compromise-on-20-plugins-by-essentialplugin/), Patchstack (15/04/2026)
- [wp2shell WordPress vulnerabilities exploited in the wild](https://www.securityweek.com/wp2shell-wordpress-vulnerabilities-exploited-in-the-wild/amp/), SecurityWeek (julho de 2026)
- [WordPress vulnerabilities wp2shell (CVE-2026-60137, CVE-2026-63030)](https://www.helpnetsecurity.com/2026/07/18/wordpress-vulnerabilities-wp2shell-cve-2026-60137-cve-2026-60137/), Help Net Security (18/07/2026, atualizada em 21/07/2026)
- [O que acontece se você acessar um site do WordPress hackeado por meio do wp2shell](https://www.malwarebytes.com/pt-br/blog/bugs/2026/07/what-happens-if-you-visit-a-wordpress-site-hacked-through-wp2shell), Malwarebytes (21/07/2026)
