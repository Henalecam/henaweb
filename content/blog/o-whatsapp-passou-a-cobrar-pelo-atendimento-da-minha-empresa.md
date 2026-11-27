---
title: O WhatsApp passou a cobrar pelo atendimento da minha empresa?
description: Desde 1º/10/2026 a Meta cobra por mensagem de atendimento na API do WhatsApp, com 1.000 grátis por número ao mês. O que muda para o chatbot e como gastar menos.
answer: Sim, se a empresa atende pela API do WhatsApp Business. Desde 1º de outubro de 2026 a Meta voltou a cobrar por cada mensagem de atendimento ("service") depois das 1.000 grátis por número ao mês. O chatbot da sua empresa continua permitido; o que mudou foi a conta.
date: 2026-11-28
tags: [whatsapp, chatbot, automação, atendimento, custos]
service: automacao-e-ia
draft: true
---

A fatura da plataforma de WhatsApp subiu em outubro e ninguém na empresa sabe explicar por quê. Ou você ouviu que a Meta "proibiu IA no WhatsApp" e ficou na dúvida se o robô de atendimento vai parar. As duas coisas têm a mesma origem: a Meta reorganizou os preços da Plataforma WhatsApp Business em 2026.

## O que mudou em 1º de outubro de 2026?

A mudança é na **mensagem de serviço** (*service message*): qualquer mensagem que a empresa envia dentro da conversa aberta pelo cliente e que não é um modelo pré-aprovado. É o que um chatbot ou um atendente manda quando responde "qual o horário?" ou "tem em estoque?".

Segundo a página de preços da Meta (atualizada em 30 de setembro de 2026):

- Mensagens de serviço eram gratuitas desde 1º de novembro de 2024; em 1º de outubro de 2026 a Meta "voltou a cobrar, por mensagem".
- Cada número de telefone comercial tem uma faixa grátis de 1.000 mensagens de serviço entregues por mês. A cobrança começa na mensagem 1.001.
- O que sobra não acumula: a franquia zera todo mês.
- Só a reação (o emoji sobre uma mensagem) continua gratuita e não conta na franquia.
- Governos e organizações sem fins lucrativos elegíveis seguem sem pagar além da franquia até 31 de dezembro de 2027.

A Meta diz que a mensagem de serviço pode ser "produzida por uma solução de IA de terceiros ou por pessoas": a resposta do chatbot e a do atendente custam o mesmo.

## Isso vale para o WhatsApp Business do celular?

Não. A tabela de preços é da **Plataforma WhatsApp Business**, a API que chatbots, CRMs e ferramentas de atendimento usam para mandar e receber mensagens por programa. Quem atende só pelo aplicativo instalado no celular não usa a API e não entra nessa tabela.

A conta chega para quem tem número conectado a uma plataforma: fornecedor de chatbot, CRM com WhatsApp integrado, sistema próprio ligado à Cloud API. Em geral ela vem embutida na fatura dessa plataforma, por isso o aumento parece "reajuste do fornecedor".

## Quanto custa uma conversa pela API?

Três regras explicam a fatura:

1. **Janela de atendimento de 24 horas.** Quando o cliente manda mensagem ou liga, abre um cronômetro de 24 horas. Dentro dele a empresa manda mensagens livres (as de serviço); fora dele, só modelos pré-aprovados.
2. **Modelos têm categoria e preço próprios:** marketing, utilidade (confirmação de pedido, lembrete) e autenticação (código de verificação). Desde 1º de julho de 2025 a cobrança é por mensagem, não mais por conversa. A mensagem de utilidade enviada dentro da janela aberta, que era grátis, também passou a ser cobrada em 1º de outubro de 2026.
3. **Anúncio que leva ao WhatsApp abre janela grátis.** Conversa iniciada por anúncio com clique para o WhatsApp abre uma "janela de entrada gratuita" que, desde setembro de 2026, pode durar até 7 dias, sem custo para mensagens de marketing, utilidade, autenticação e serviço.

Os valores variam por país e estão nas tabelas da Meta (para o Brasil, em reais desde julho de 2026). O exemplo da própria página é a mensagem de utilidade para o Brasil, a 0,68 centavo de dólar.

A Meta também vende o seu próprio robô, o **Meta Business Agent**, cobrado por tokens (US$ 2 por milhão), e estima o custo de um agente de IA de terceiros em "cerca de 9 centavos por mensagem", contra 4 a 5 do dela. É a Meta avaliando a concorrência, e o agente dela não aceita setores como finanças, governo e saúde: leia como propaganda com números.

## Como gastar menos sem piorar o atendimento

A conta nova pune um hábito comum em chatbots: mandar várias mensagens curtas onde uma resolveria. Cada "Olá!", "Um momento…" e "Posso ajudar em algo mais?" é uma mensagem de serviço cobrada. Cinco pontos que reduzem a fatura:

- **Uma resposta, uma mensagem.** Junte saudação, resposta e próximo passo no mesmo texto. Cada mensagem de enfeite cortada sai direto da parte cobrada.
- **Resolva na primeira resposta.** Chatbot que pergunta "A, B ou C?" e depois "dentro de B, 1, 2 ou 3?" gasta três mensagens onde uma pergunta bem feita bastaria. É o que o agendamento em linguagem natural do [Scheduly](/casos/scheduly) faz: o cliente escreve como fala e a IA entende, sugere horários e confirma.
- **Tire do WhatsApp o que não precisa estar lá.** Horário, endereço, segunda via, status do pedido: uma página no site ou um link no primeiro retorno evita dezenas de mensagens repetidas. Veja o que automatizar e o que encaminhar em [automatizar o WhatsApp sem perder o toque humano](/blog/como-automatizar-o-whatsapp-sem-perder-o-toque-humano).
- **Aproveite a janela grátis do anúncio.** Lead que chegou por anúncio com clique para o WhatsApp pode ser trabalhado por até 7 dias sem custo por mensagem. É o momento de responder rápido: [cada hora de espera derruba a chance de contato](/blog/quanto-tempo-a-empresa-pode-demorar-para-responder-um-lead).
- **Meça por número e por fluxo.** Sem log de quantas mensagens cada fluxo dispara, a fatura é uma caixa-preta. Na HenaWeb cada execução fica registrada, com painel para acompanhar: é a rastreabilidade da página de [automação e IA](/servicos/automacao-e-ia).

## Mas a Meta não tinha proibido IA no WhatsApp?

Proibiu uma coisa específica, e não é o seu chatbot. Em outubro de 2025 a Meta incluiu nos termos da API uma seção sobre **provedores de IA**: quem oferece no WhatsApp, como função principal, um "assistente de inteligência artificial de uso geral" ficou "estritamente proibido" de usar a plataforma a partir de 15 de janeiro de 2026. ChatGPT, Perplexity e Copilot anunciaram que os seus números parariam, segundo o TechCrunch.

A própria Meta disse ao Cade, em 30 de janeiro de 2026, que "uma empresa de viagens que utiliza um chatbot de IA para atendimento ao cliente baseado em modelos de terceiros" não está impedida de usar a API. O critério é a função principal: robô que atende os clientes da empresa é atendimento; robô cujo produto é "pergunte qualquer coisa" é provedor de IA.

No Brasil a regra nem chegou a valer como no resto do mundo. Em 12 de janeiro de 2026 o Cade abriu inquérito contra a Meta e suspendeu os novos termos por suspeita de favorecer a Meta AI; em 15 de janeiro a Meta abriu exceção para números +55; em 4 de março o Tribunal do Cade manteve a medida; em 23 de abril manteve a multa diária de R$ 250 mil por descumprimento. Em paralelo, segundo a Terra e o iMasters, a Justiça Federal suspendeu a medida e depois a multa, e a Meta passou a cobrar dos provedores de IA por mensagem onde a lei a obriga a aceitá-los. Até a publicação deste artigo não encontramos decisão final. Para a sua empresa, nada disso muda: o bot de atendimento é mensagem de serviço, paga pela tabela comum.

## O que fazer esta semana

Peça ao fornecedor do chatbot quantas mensagens de serviço cada número entregou em outubro e novembro. Se passou de 1.000, veja quais fluxos mais disparam: robô que manda mais de duas mensagens por resposta paga para ser prolixo. Quer um diagnóstico do seu fluxo de WhatsApp, com o custo por conversa? [Fale com a HenaWeb](/#contato).

## Perguntas frequentes

### O WhatsApp Business comum vai começar a cobrar por mensagem?

A cobrança por mensagem de serviço, em vigor desde 1º de outubro de 2026, é da Plataforma WhatsApp Business (a API usada por chatbots, CRMs e sistemas). O aplicativo do celular não usa a API e não está nessa tabela.

### As 1.000 mensagens grátis são por empresa ou por número?

Por número de telefone comercial, segundo a página de preços da Meta: 1.000 mensagens de serviço entregues por mês, que zeram no início de cada mês e não acumulam.

### A resposta do chatbot de IA é cobrada igual à de um atendente humano?

Sim. A Meta define mensagem de serviço como qualquer mensagem sem modelo que não venha do Meta Business Agent, seja "produzida por uma solução de IA de terceiros ou por pessoas".

### A Meta proibiu chatbots de IA no WhatsApp?

Proibiu assistentes de IA de uso geral, como ChatGPT e Perplexity, a partir de 15 de janeiro de 2026; no Brasil a regra está em disputa com o Cade. Um chatbot que atende os clientes da própria empresa, mesmo com modelo de terceiros, continua permitido, segundo a própria Meta.

---

### Fontes

- Meta, [Pricing on the WhatsApp Business Platform](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing), 30/09/2026.
- Meta, [WhatsApp Business Platform Changelog](https://developers.facebook.com/documentation/business-messaging/whatsapp/changelog), entradas de 28 e 29/09 e 15/10/2026.
- Meta, [Meta Business Agent Platform overview](https://developers.facebook.com/documentation/meta-business-agent/overview), 22/07/2026.
- TechCrunch, [WhatsApp changes its terms to bar general-purpose chatbots](https://techcrunch.com/2025/10/18/whatssapp-changes-its-terms-to-bar-general-purpose-chatbots-from-its-platform/), 18/10/2025.
- TechCrunch, [After Italy, WhatsApp excludes Brazil from rival chatbot ban](https://techcrunch.com/2026/01/15/after-italy-whatsapp-excludes-brazil-from-rival-chatbot-ban), 15/01/2026.
- TechCrunch, [After Europe, WhatsApp will let rival AI companies offer chatbots in Brazil](https://techcrunch.com/2026/03/06/after-europe-whatsapp-will-let-rival-ai-companies-offer-chatbots-in-brazil/), 06/03/2026.
- Cade, [Cade abre inquérito contra Meta e aplica medida preventiva](https://www.gov.br/cade/pt-br/assuntos/noticias/cade-abre-inquerito-contra-meta-e-aplica-medida-preventiva-suspendendo-novos-termos-do-whatsapp-sobre-ia), 12/01/2026.
- Cade, [Tribunal do Cade mantém medida preventiva](https://www.gov.br/cade/pt-br/assuntos/noticias/tribunal-do-cade-mantem-medida-preventiva-sobre-novos-termos-de-uso-do-whatsapp), 04/03/2026.
- Cade, [Cade mantém multa diária contra Meta e WhatsApp](https://www.gov.br/cade/pt-br/assuntos/noticias/cade-mantem-multa-diaria-contra-meta-e-whatsapp-por-descumprimento-de-medida-preventiva), 23/04/2026.
- Terra / Estadão Conteúdo, [Meta diz ao Cade que chatbots de IA se aproveitam do WhatsApp Business](https://www.terra.com.br/economia/meta-diz-ao-cade-que-chatbots-de-ia-se-aproveitam-do-whatsapp-business-para-uso-nao-previsto,48fc09f88f3b0a0e0c727d3e09737acd1d7j24xk.html), 02/02/2026.
- iMasters, [WhatsApp: Justiça Federal derruba decisão do Cade contra a Meta](https://imasters.com.br/noticia/whatsapp-justica-federal-derruba-decisao-do-cade-contra-a-meta), 08/05/2026.
