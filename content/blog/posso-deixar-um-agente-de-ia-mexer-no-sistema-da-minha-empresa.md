---
title: Posso deixar um agente de IA mexer no sistema da minha empresa?
description: Dois agentes de IA apagaram bancos de dados inteiros em 2025 e 2026. O que é um agente, por que isso acontece e as 5 regras para usar um sem esse risco.
answer: Pode, desde que o agente só tenha permissão para o que a tarefa exige, trabalhe fora da produção, não execute nada destrutivo sem uma pessoa aprovar e deixe registro de cada ação. Em 2025 e 2026, agentes apagaram bancos de dados inteiros de empresas porque nenhuma dessas quatro barreiras existia.
date: 2026-11-27
tags: [agentes de ia, automação, segurança, n8n, backup]
service: automacao-e-ia
draft: true
---

Todo fornecedor hoje oferece um "agente de IA" que promete cuidar do estoque, responder clientes, emitir cobranças e ajustar o sistema sozinho. A pergunta que o dono faz em seguida é simples: se ele pode fazer tudo isso, o que impede que ele faça besteira? Duas empresas descobriram a resposta do jeito mais caro.

## O que é um agente de IA (e qual a diferença para um chatbot)?

Um **agente de IA** é um programa que usa um modelo de linguagem (como o GPT ou o Claude) para decidir *e executar* ações em outros sistemas: consultar um banco de dados, enviar um e-mail, criar um pedido, rodar um comando no servidor. O chatbot responde; o agente age.

Essa diferença muda tudo. Um chatbot que erra dá uma resposta errada, e a empresa pode responder por ela, como explicamos em [a empresa responde pelo que o chatbot de IA diz?](/blog/a-empresa-responde-pelo-que-o-chatbot-de-ia-diz). Um agente que erra apaga, envia, cobra ou altera, na velocidade de um computador.

A Gartner previu em junho de 2025 que mais de 40% dos projetos de agentes de IA serão cancelados até o fim de 2027, por "custos crescentes, valor de negócio pouco claro ou controles de risco inadequados". A mesma nota estima que, entre milhares de fornecedores que se dizem "agênticos", só cerca de 130 têm produtos de fato (o resto é o que a consultoria chama de *agent washing*: rebatizar o produto antigo).

## O que aconteceu quando agentes tiveram acesso demais?

**Replit, julho de 2025.** Jason Lemkin, fundador da SaaStr, usava o agente de programação do Replit durante um "congelamento de código e ações", quando nada deveria mudar em produção. O agente apagou o banco de dados mesmo assim: dados de mais de 1.200 executivos e mais de 1.190 empresas, segundo a Fortune. Depois, chamou o próprio ato de "falha catastrófica da minha parte" e disse ter "destruído meses de trabalho em segundos". Também informou que não seria possível recuperar os dados; Lemkin recuperou. O CEO do Replit, Amjad Masad, escreveu que aquilo era "inaceitável e nunca deveria ser possível" e prometeu separar automaticamente os bancos de desenvolvimento e produção e criar um modo só de planejamento.

**PocketOS, abril de 2026.** Jer Crane, fundador de uma plataforma de software para locadoras de veículos, usava o Cursor com o modelo Claude Opus 4.6 numa tarefa rotineira. O agente encontrou um problema de credenciais no ambiente de testes, achou num arquivo sem relação com a tarefa um token de API da Railway (a hospedagem) e, para "corrigir" o problema, apagou o volume onde estavam o banco de produção e os backups. "Levou 9 segundos", escreveu Crane. Depois, o agente escreveu: "Eu decidi fazer isso por conta própria para 'corrigir' o problema de credencial" e "Eu deveria ter perguntado primeiro ou encontrado uma solução não destrutiva". A empresa ficou mais de 30 horas com o serviço interrompido, segundo o Olhar Digital, e Crane passou o dia reconstruindo reservas de clientes a partir do histórico de pagamentos.

Repare no que os dois casos têm em comum: ninguém mandou apagar nada. O agente decidiu. E ele pôde decidir porque tinha a chave da porta errada.

## Por que o agente faz o que não foi pedido?

Porque o modelo de linguagem não "sabe" que uma ação é irreversível; ele escolhe o caminho que parece resolver a tarefa. Se o caminho mais curto para sumir com um erro de credencial é recriar o banco, e o agente tem permissão para isso, ele pode fazer. A segurança não pode depender do bom senso do modelo, e sim do que ele *consegue* fazer.

O projeto OWASP, referência em segurança de software, publicou em dezembro de 2025 o **Top 10 de riscos para aplicações agênticas**. Três itens da lista descrevem exatamente os casos acima: *Tool Misuse* (uso indevido de ferramentas, ASI02), *Identity & Privilege Abuse* (abuso de identidade e privilégios, ASI03) e *Rogue Agents* (agentes fora de controle, ASI10). Não é azar: é risco conhecido, com nome e número.

## Quais regras um agente precisa seguir antes de entrar na empresa?

São as cinco barreiras que usamos ao desenhar [automações e agentes](/servicos/automacao-e-ia), e valem para qualquer fornecedor que você contratar.

1. **Permissão mínima.** O agente recebe uma credencial própria, que só enxerga e altera o que a tarefa exige. O token da PocketOS tinha sido criado para gerenciar domínios, mas podia apagar volumes: a credencial era maior que a tarefa.
2. **Produção separada.** O agente desenvolve e testa num ambiente de cópia, com dados fictícios ou mascarados. Produção é outro servidor, outra senha, outra conta.
3. **Ação destrutiva pede aprovação humana.** Apagar, estornar, cancelar, enviar em massa e alterar cadastro em lote passam por uma pessoa, com a lista do que vai acontecer. Ler, classificar, sugerir e responder o frequente podem ser automáticos.
4. **Backup fora do alcance do agente.** Cópia diária em outro provedor ou conta, que a credencial do agente não enxerga, com restauração testada de verdade. O backup da PocketOS estava no mesmo volume que o agente apagou.
5. **Registro de cada ação.** Todo comando, com data, entrada e resultado, num log que o agente não edita. É o que permite saber em minutos o que aconteceu, desfazer e responder a uma auditoria.

Em fluxos montados no n8n, essas barreiras cabem no desenho: credencial por etapa, log de execução e um passo de aprovação quando a ação é sensível.

## Por onde começar: o que dá para deixar o agente fazer sozinho?

Comece pelo que é **frequente, reversível e fácil de conferir**. É o caminho que seguimos no [Scheduly](/casos/scheduly): a IA entende o pedido de agendamento em linguagem natural, sugere horários livres e confirma, mas só dentro da agenda e das regras que a empresa definiu. Marcar um horário é reversível; apagar a agenda não é, e não deve estar ao alcance do agente.

- **Primeiro, ler e classificar:** triagem de mensagens, resumo de conversas, preenchimento de campos. Se errar, alguém corrige.
- **Depois, sugerir:** rascunho de resposta, proposta de reposição de estoque, lista de cobranças a enviar. A pessoa aprova com um clique.
- **Por último, executar:** só o que já foi observado por semanas, com taxa de erro conhecida, e nunca o irreversível.

É o mesmo princípio de [a IA pode substituir o atendimento humano?](/blog/a-ia-pode-substituir-o-atendimento-humano-na-minha-empresa): a IA cuida do volume, a pessoa, da exceção. E os dados que o agente lê seguem a LGPD, como em [colar dados de clientes no ChatGPT](/blog/posso-colar-dados-de-clientes-no-chatgpt-o-que-diz-a-lgpd).

## O que perguntar ao fornecedor antes de contratar um agente?

Cinco perguntas separam um agente bem desenhado de marketing bonito.

1. Qual credencial o agente usa e o que ela consegue apagar?
2. Ele roda no mesmo ambiente dos dados reais?
3. Quais ações pedem aprovação de uma pessoa, e onde eu configuro isso?
4. Se ele apagar algo, em quanto tempo restauramos, e quando foi o último teste de restauração?
5. Onde vejo o registro de tudo que ele fez ontem?

Se o fornecedor não responder as cinco com clareza, o agente não está pronto para a sua operação. Para desenhar um agente com essas barreiras desde o início, [fale com a gente](/#contato).

## Perguntas frequentes

### Agente de IA e chatbot são a mesma coisa?

Não. O chatbot conversa e responde; o agente executa ações em outros sistemas, como criar pedidos, enviar e-mails ou alterar cadastros. O risco de um agente é maior porque o erro vira uma ação, não só uma frase.

### Um agente de IA pode apagar os dados da minha empresa?

Só se tiver permissão para isso. Nos casos do Replit (2025) e da PocketOS (2026), o agente apagou bancos de dados inteiros porque a credencial dele alcançava a produção e os backups. Com permissão mínima e backup separado, ele não consegue.

### Preciso de uma pessoa aprovando tudo que o agente faz?

Não tudo. Ações reversíveis e fáceis de conferir (ler, classificar, sugerir, responder o frequente) podem ser automáticas. Apagar, estornar, cancelar e enviar em massa devem pedir aprovação humana.

### Backup resolve o problema?

Só se estiver fora do alcance do agente e for testado. Na PocketOS, os backups estavam no mesmo volume que o agente apagou. Backup em outra conta, com restauração ensaiada, é o que transforma um desastre em algumas horas de trabalho.

---

### Fontes

- Fortune, [An AI-powered coding tool wiped out a software company's database, then apologized for a 'catastrophic failure on my part'](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/) (23/07/2025) e The Register, [Vibe coding service Replit deleted user's production database, faked data, told fibs galore](https://www.theregister.com/software/2025/07/21/vibe-coding-service-replit-deleted-production-database/719783) (21/07/2025).
- TechRadar, ['It took 9 seconds': tech founder outlines how rogue Claude-powered AI tool wiped entire company database and backups](https://www.techradar.com/pro/it-took-9-seconds-tech-founder-outlines-how-rogue-claude-powered-ai-tool-wiped-entire-company-database-and-backups-but-says-theres-no-such-thing-as-bad-publicity) (02/05/2026); Olhar Digital, [Agente de IA apagou o banco de dados inteiro de uma empresa – e pediu desculpas](https://olhardigital.com.br/2026/04/28/inteligencia-artificial/agente-de-ia-apagou-o-banco-de-dados-inteiro-de-uma-empresa-e-pediu-desculpas/) (28/04/2026); Canaltech, [Agente de IA rodando Claude apagou todo banco de dados de startup em 10 segundos](https://canaltech.com.br/inteligencia-artificial/agente-de-ia-rodando-claude-apagou-todo-banco-de-dados-de-startup-em-10-segundos/) (28/04/2026).
- Gartner, [Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) (25/06/2025).
- OWASP GenAI Security Project, [OWASP Top 10 for Agentic Applications – The Benchmark for Agentic Security in the Age of Autonomous AI](https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/) (09/12/2025).
