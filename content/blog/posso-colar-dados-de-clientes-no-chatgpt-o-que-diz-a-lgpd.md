---
title: Posso colar dados de clientes no ChatGPT? O que diz a LGPD
description: Na conta pessoal do ChatGPT, o que você cola pode treinar o modelo e sai do controle da empresa. O que a LGPD exige e como usar IA com dados de clientes.
answer: Na conta gratuita ou pessoal, não. Por padrão, o que você digita no ChatGPT pode ser usado para treinar o modelo, e pela LGPD quem responde pelo dado do cliente é a sua empresa. Dá para usar IA com dados de clientes em versões empresariais ou por API, com contrato, sem treinamento e só com o dado necessário.
date: 2026-11-25
tags: [lgpd, chatgpt, inteligência artificial, dados pessoais, segurança]
service: automacao-e-ia
draft: false
---

A atendente cola a conversa inteira do cliente no ChatGPT para resumir. O financeiro sobe a planilha de inadimplentes para "achar um padrão". Leva segundos, ninguém pediu autorização a ninguém, e o dado do cliente acabou de sair da empresa.

A resposta curta: na **conta pessoal do ChatGPT**, não cole dados de clientes. Usar IA no trabalho não é proibido; o problema é que, do jeito mais comum de usar, o dado vai para um servidor que a empresa não controla, pode treinar o modelo e, se der errado, quem responde é a sua empresa.

## O que acontece com o que eu colo no ChatGPT?

Depende de qual ChatGPT. A política da **OpenAI** sobre uso de dados, atualizada em março de 2026, diz que nos serviços para pessoas físicas a empresa "pode usar o seu conteúdo para treinar os modelos". Vale para a versão gratuita e os planos individuais, por padrão: para desligar, o usuário precisa pedir no portal de privacidade "não treine com meu conteúdo" ou usar o chat temporário, que fica fora do histórico e do treinamento.

Nos produtos de empresa é o contrário: "por padrão, não treinamos com nenhuma entrada ou saída" do ChatGPT Team, do Enterprise e da API. A diferença entre o dado do cliente ir ou não para o treinamento não está na ferramenta, e sim no tipo de conta que o funcionário abriu. E a maioria abre a pessoal.

A **Samsung** descobriu isso na prática. Em abril de 2023, segundo a Fortune, um engenheiro colou código-fonte confidencial no ChatGPT para corrigir um banco de dados, e outro subiu uma reunião inteira para gerar a ata. Em maio a empresa proibiu IA generativa no trabalho, sob pena de "ação disciplinar, inclusive demissão".

## Colar dados de clientes na IA é um problema de LGPD?

É, por mais de um motivo. A **LGPD** (Lei 13.709/2018) define dado pessoal como "informação relacionada a pessoa natural identificada ou identificável" e chama de tratamento "toda operação realizada com dados pessoais", o que inclui enviar o dado a um serviço externo. Quem faz isso é o controlador: decide o que acontece com o dado e responde por ele. Quatro pontos da lei pesam aqui:

- **Base legal (art. 7º):** todo tratamento precisa de uma justificativa prevista na lei, como consentimento, execução de contrato ou legítimo interesse. "Era mais rápido assim" não está na lista.
- **Necessidade (art. 6º, III):** o tratamento se limita "ao mínimo necessário". Resumir um atendimento não exige CPF, endereço e histórico de compras.
- **Segurança (art. 46):** a empresa deve adotar medidas "aptas a proteger os dados pessoais de acessos não autorizados". Um dado numa conta que a empresa não administra, não audita e não consegue apagar dificilmente passa nesse critério.
- **Transferência internacional (art. 33):** os servidores dessas ferramentas costumam ficar fora do Brasil, e a lei só permite enviar dados ao exterior em casos definidos, como países com proteção adequada, cláusulas contratuais ou consentimento específico. A conta gratuita não traz nada disso.

Se o dado vazar, a empresa comunica o incidente à ANPD e ao titular (art. 48), e a multa pode chegar a 2% do faturamento, "limitada, no total, a R$ 50.000.000,00" por infração (art. 52). Um operador contratado que descumpra a lei responde solidariamente (art. 42); a conta pessoal não tem contrato com ninguém.

A **ANPD**, no Radar Tecnológico sobre IA generativa, lembra um risco que a maioria ignora: modelos de linguagem podem gerar dados pessoais como resposta, e o conteúdo gerado "pode ser indistinguível de dados pessoais".

## Isso acontece mesmo nas empresas brasileiras?

Todo dia. Uma pesquisa encomendada pela **KnowBe4** com 406 trabalhadores brasileiros, feita em outubro de 2026 e divulgada pelo Xataka Brasil, achou que 60% usam IA no trabalho com **conta pessoal**. Nos três meses anteriores, 20% tinham colado informações de clientes em ferramentas de IA, 18% dados financeiros ou comerciais da empresa e 17% código-fonte. 54% não sabem o que acontece com o que digitam, e 39% dizem que a empresa não tem política sobre IA.

O retrato global é o mesmo: o Cloud and Threat Report 2026 da **Netskope**, resumido pela IT Pro, registrou 223 violações de política de dados ligadas a IA generativa por empresa por mês, mais que o dobro do ano anterior, 54% delas com dados regulados. O vazamento não é acidente raro; é o funcionamento normal de uma empresa sem regra.

## Como usar IA com dados de clientes sem infringir a LGPD?

A saída não é proibir a IA, e sim dar ao time um caminho seguro que funcione. Cinco regras resolvem a maioria dos casos:

1. **Conta de empresa ou API, com contrato.** Nas versões empresariais e na API, o fornecedor não treina com os seus dados por padrão e assina um contrato de tratamento: vira operador, com obrigações na LGPD, e os dados deixam de circular em contas que a empresa não vê.
2. **Só o dado necessário.** Antes de mandar um texto para a IA, tire o que não serve à tarefa: nome, CPF, telefone, endereço. Para resumir uma reclamação, "o cliente" basta.
3. **Política curta e clara.** Uma página dizendo o que pode (rascunhar, revisar, explicar), o que não pode (dados de clientes, contratos, senhas, código) e qual conta usar. Na pesquisa da KnowBe4, 68% usam ferramentas além das oficiais mesmo com conta aprovada: a regra precisa vir com uma ferramenta boa.
4. **Rastreabilidade.** Se a IA entra num processo, cada execução fica registrada: que dado entrou, de onde, o que saiu. Sem isso não há como responder a um pedido do titular nem a uma pergunta da ANPD.
5. **A IA dentro do sistema, não na aba do navegador.** Quando a tarefa se repete (resumir atendimentos, classificar pedidos), o certo é um fluxo que busca o dado no sistema da empresa, envia à IA só o necessário, por API, e grava o resultado de volta. Ninguém copia e cola.

É assim que a HenaWeb monta [automações com IA](/servicos/automacao-e-ia): fluxos em n8n, plataforma de automação que conecta sistemas por API e pode rodar em servidor próprio, o que ajuda no controle dos dados, com cada execução registrada. No [Scheduly](/casos/scheduly), o cliente escreve como fala e a IA entende o pedido, sugere horários e confirma, tudo dentro do sistema.

## E o chatbot que atende os meus clientes?

Vale a mesma lógica, com um cuidado a mais: o chatbot recebe dados que o cliente manda sem filtro. Por isso ele responde a partir de uma base da empresa, com [RAG](/blog/o-que-e-rag-e-por-que-o-chatbot-da-empresa-precisa-dele), guarda só o necessário e passa para uma pessoa o que foge do roteiro. No Brasil, [a empresa responde pelo que o chatbot diz](/blog/a-empresa-responde-pelo-que-o-chatbot-de-ia-diz), e até [as prefeituras que usam IA no atendimento](/blog/a-prefeitura-pode-usar-ia-para-atender-o-cidadao) já escrevem regras para isso.

Se a sua equipe já usa IA e você não sabe por qual conta nem com quais dados, o primeiro passo é um mapa de automações: quais tarefas valem a pena, com que dados e por onde. [Fale com a gente](/#contato).

## Perguntas frequentes

### O ChatGPT usa o que eu escrevo para treinar o modelo?

Nas contas para pessoas físicas (gratuita e planos individuais), sim, por padrão: a política da OpenAI diz que o conteúdo pode ser usado para treinar os modelos, a menos que o usuário desligue isso no portal de privacidade ou use o chat temporário. No ChatGPT Team, Enterprise e na API não há treinamento por padrão.

### Usar o ChatGPT no trabalho é proibido pela LGPD?

Não. A LGPD não proíbe ferramentas; ela exige base legal, mínimo necessário, segurança e regras para enviar dados ao exterior. Redigir ou revisar texto sem dados pessoais não tem problema; o risco está em colar dados de clientes numa conta sem contrato e sem controle.

### A empresa pode ser multada se um funcionário colar dados de clientes na IA?

Pode. Quem responde pelo tratamento é a empresa (controlador), mesmo que o ato tenha sido de um funcionário. As sanções vão de advertência a multa de até 2% do faturamento, limitada a R$ 50 milhões por infração, além de comunicar o incidente à ANPD e aos clientes afetados.

### Anonimizar o dado antes de colar resolve?

Ajuda muito: pela definição da LGPD, dado pessoal é o que se refere a pessoa "identificada ou identificável"; o que não identifica ninguém está fora. Mas trocar o nome por "cliente" e manter CPF ou telefone não é anonimização; é um dado pessoal com menos campos.

---

### Fontes

- OpenAI, [How your data is used to improve model performance](https://openai.com/policies/how-your-data-is-used-to-improve-model-performance/), atualizado em 13 mar. 2026.
- Fortune, [Samsung threatens to fire employees if they leak data to A.I. chatbots like ChatGPT](https://fortune.com/2023/05/02/samsung-bans-employee-use-chatgpt-data-leak/), 2 maio 2023 (memorando obtido pela Bloomberg).
- Câmara dos Deputados, [Lei 13.709/2018 (LGPD), texto atualizado](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html): arts. 5º, 6º, 7º, 33, 42, 46, 48 e 52.
- ANPD, [Technology Radar nº 3: Generative Artificial Intelligence](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/documentos-tecnicos-orientativos/radar-tecnologico-inteligencia-artificial-generativa-versao-em-lingua-inglesa.pdf/@@display-file/file), versão em inglês, dez. 2024.
- Xataka Brasil, [60% dos brasileiros usam IA com conta pessoal no trabalho](https://www.xataka.com.br/diversos/60-dos-brasileiros-usam-ia-com-conta-pessoal-no-trabalho), 16 nov. 2026 (pesquisa encomendada pela KnowBe4, 406 trabalhadores, out. 2026).
- IT Pro, [Generative AI data violations more than doubled last year](https://www.itpro.com/technology/artificial-intelligence/generative-ai-data-violations-more-than-doubled-last-year), 12 jan. 2026 (Netskope, Cloud and Threat Report 2026).
