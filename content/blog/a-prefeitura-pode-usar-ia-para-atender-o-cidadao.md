---
title: A prefeitura pode usar IA para atender o cidadão?
description: 27% das prefeituras usam IA. Porto Alegre pôs uma no WhatsApp do 156 e ela resolveu 74% das conversas na primeira semana. O que a lei exige e por onde começar.
answer: Pode, e as maiores já fazem. 27% das prefeituras usaram IA em 2025 (Cetic.br). Em novembro de 2026, Porto Alegre pôs uma IA no WhatsApp do 156 e ela resolveu 73,8% das conversas na primeira semana. As condições são responder só com base em conteúdo oficial, passar casos difíceis a uma pessoa e nunca decidir sozinha.
date: 2026-11-25
tags: [inteligência artificial, prefeitura, atendimento ao cidadão, whatsapp, lgpd]
service: sistemas-publicos
draft: false
---

O telefone da prefeitura toca o dia inteiro com as mesmas perguntas: segunda via do IPTU, horário do posto de saúde, situação de um protocolo. Cada secretaria tem o próprio WhatsApp, o cidadão não sabe para qual escrever e a equipe de atendimento é pequena. A dúvida é se a prefeitura pode, por lei e na prática, colocar uma inteligência artificial para atender esse volume.

## Quantas prefeituras brasileiras já usam IA?

Mais do que parece, e a diferença está no tamanho. A pesquisa **TIC Governo Eletrônico 2025**, do Cetic.br, mediu pela primeira vez o uso de IA nas prefeituras: 27% usaram inteligência artificial nos 12 meses anteriores. Entre as capitais, 81%; nas cidades com mais de 500 mil habitantes, 85%; nas de até 10 mil, 22%. A pesquisa ouviu 3.253 prefeituras entre julho de 2025 e abril de 2026.

O uso voltado ao cidadão ainda é minoria: 17% das prefeituras têm iniciativas de IA generativa para o público externo, como atendimento ou serviços. E o motivo mais citado para não usar IA não é dinheiro: 40% apontam **falta de pessoas capacitadas**, antes de "não é prioridade" (36%), dificuldades com dados (35%) e custo (34%).

## O que aconteceu quando Porto Alegre colocou IA no 156?

Porto Alegre é o exemplo mais recente e mais bem medido. A Central do Cidadão 156 recebeu 242.390 interações em outubro de 2026, 71% pelo WhatsApp. Em 10 de novembro a prefeitura lançou a **Sol**, uma agente de IA no WhatsApp do 156 que dá respostas "baseadas no conteúdo oficial da Prefeitura", consulta protocolos, entende áudio e dispensa menus numerados.

Balanço dos primeiros sete dias, publicado pela prefeitura: 22.383 interações, 16.505 resolvidas pela Sol sem intervenção humana (73,8%), 5.872 transferidas para um atendente, tempo médio de resposta de 21 segundos e nota 4,35 na pesquisa de satisfação. Quando o caso exige uma pessoa, a conversa vai para o atendente com o histórico. Investimento estimado: R$ 1,9 milhão.

Dois detalhes valem para qualquer prefeitura: a IA veio com um "copiloto" para os atendentes, que consulta a mesma base e indica as fontes, e os números foram publicados. Sem medir resolução, transbordo e satisfação, ninguém sabe se o robô ajuda.

## O que a lei deixa a IA decidir na prefeitura?

Responder dúvidas, sim; decidir sozinha, não. Não há lei federal específica, mas as leis municipais de 2026 convergem nisso. A **Lei 14.644/2026 de Porto Alegre**, sancionada em 22 de outubro, exige que conteúdo produzido por IA generativa seja identificado ao público, veda decisões exclusivamente automatizadas de alto risco com efeito jurídico sobre o cidadão sem possibilidade de revisão humana e exige Avaliação de Impacto Algorítmico, publicada no portal da transparência, antes de implantar sistemas de alto risco.

Belo Horizonte seguiu o mesmo caminho. A Câmara aprovou em junho de 2026 o PL 207/2025, com emenda que acrescentou revisão humana e transparência dos critérios algorítmicos, e o texto proíbe a IA de assumir decisões que exijam "avaliação ética, moral, política ou jurídica"; em julho virou a Lei 12.080/2026, segundo a TMC. Joinville foi por instrução normativa: "todo material gerado precisa ser revisado e validado por um servidor antes do uso oficial".

Na prática: a IA pode informar o valor do IPTU, abrir um protocolo de poda e dizer em que etapa está o pedido. Deferir um requerimento, aplicar uma multa ou emitir um parecer continua com o servidor, e o sistema registra quem decidiu, com a mesma [trilha de auditoria e alçadas](/servicos/sistemas-publicos) dos workflows de aprovação.

## Como a IA responde sem inventar um serviço que não existe?

Prendendo a resposta à base oficial. Um modelo de linguagem (o motor de um chatbot generativo) responde o que parece plausível, não o que é verdade. A técnica que corrige isso é o **RAG**: o sistema busca a resposta nos documentos da prefeitura antes de escrever, como explicamos em [O que é RAG](/blog/o-que-e-rag-e-por-que-o-chatbot-da-empresa-precisa-dele). É o que Porto Alegre descreve ao falar em respostas "baseadas no conteúdo oficial".

O governo federal publicou em junho de 2026 o GuIA, guia unificado de IA para o setor público, com um anexo só sobre bases de conhecimento. A frase central: "toda solução RAG pressupõe uma base de conhecimento". Antes do robô vem o trabalho de reunir Carta de Serviços, prazos, documentos e horários em um lugar só e atualizado. Chatbot com base desatualizada responde errado com confiança, e a prefeitura responde pelo que ele disse, como no caso da [Air Canada](/blog/a-empresa-responde-pelo-que-o-chatbot-de-ia-diz).

## Como fica a LGPD quando o cidadão manda o CPF pelo WhatsApp?

Com três regras: só o necessário, só em sistema contratado e nada em ferramenta gratuita. A cartilha de Joinville é direta: não inserir "dados sensíveis ou identificadores (como CPF, RG, dados de saúde)" nas ferramentas de IA, e nada de ferramenta gratuita para dados internos. O anexo do GuIA trata como bloqueante "dados pessoais na base sem base legal documentada" e exige controle de acesso antes da recuperação: a IA só lê o que aquele cidadão ou servidor poderia ler.

No atendimento, consultar um protocolo pelo WhatsApp exige identificar quem pergunta, e o caminho oficial é o [login gov.br](/blog/como-integrar-o-login-gov-br-ao-sistema-da-prefeitura). Nos sistemas públicos que construímos, a LGPD entra no desenho: coletamos só o necessário, controlamos acesso por perfil e mascaramos dados pessoais em telas e relatórios.

## Por onde uma prefeitura pequena começa?

Pelo canal que já existe e pelas perguntas mais repetidas. Arapiraca, em Alagoas, é o exemplo: antes, "cada secretaria tinha seu próprio número de WhatsApp e o cidadão ficava perdido", contou a responsável pela modernização à Agência Gov. A assistente Cida unificou o atendimento, responde por áudio para quem não lê e, quando o cidadão diz que não quer falar com robô, passa para uma pessoa com o histórico. Foram mais de 5 mil atendimentos nos primeiros meses.

Roteiro que cabe numa prefeitura sem equipe de TI:

- Levantar, com quem atende hoje, as dúvidas mais frequentes e a resposta oficial de cada uma.
- Montar a base (Carta de Serviços, prazos, documentos, horários) em um lugar só, com dono para atualizar.
- Colocar a IA no WhatsApp só para essas dúvidas e protocolos simples, com transbordo para pessoa em um toque.
- Medir desde o primeiro dia: resolução sem humano, transbordo, satisfação e recontato.
- Ampliar aos poucos, como Porto Alegre fez.

O contrato precisa garantir base de conhecimento, logs e código em nome do município, como detalhamos em [prefeitura pequena sem equipe de TI](/blog/prefeitura-pequena-sem-equipe-de-ti-como-contratar-um-sistema). O princípio é o mesmo do [Scheduly](/casos/scheduly), em que o cliente escreve como fala e a IA entende o pedido: a IA responde o frequente e passa o resto para uma pessoa. Se a sua prefeitura quer começar por aí, [fale com a gente](/#contato).

## Perguntas frequentes

### A prefeitura precisa de lei própria para usar IA no atendimento?

Não há exigência federal específica, mas Porto Alegre e Belo Horizonte aprovaram leis em 2026 e Joinville editou instrução normativa. As três convergem: identificar o conteúdo gerado por IA, manter revisão humana e não delegar à IA decisões com efeito jurídico.

### A IA pode negar um pedido do cidadão sozinha?

Não. A Lei 14.644/2026 de Porto Alegre veda decisões exclusivamente automatizadas de alto risco com efeito jurídico sem revisão humana, e a lei de Belo Horizonte proíbe delegar à IA decisões que exijam avaliação ética, jurídica ou política. A IA informa e encaminha; o servidor decide.

### Quanto do atendimento a IA resolve sozinha?

Em Porto Alegre, 73,8% das 22.383 conversas da primeira semana da Sol foram resolvidas sem atendente humano, com nota 4,35 de satisfação. O restante foi transferido para uma pessoa, com o histórico.

### O cidadão pode mandar CPF e dados de saúde para o chatbot?

Só para um sistema contratado pela prefeitura, com base legal documentada e controle de acesso. Guias oficiais, como a cartilha de Joinville, não recomendam inserir CPF, RG ou dados de saúde em ferramentas de IA, muito menos nas gratuitas.

### Prefeitura pequena sem equipe de TI consegue fazer isso?

Consegue, começando pelo WhatsApp que já existe e pelas dúvidas mais frequentes, como Arapiraca (AL) fez. Como falta gente capacitada em 40% das prefeituras sem IA, base de conhecimento, logs e código devem ficar em nome do município.

---

### Fontes

- Cetic.br, [TIC Governo Eletrônico 2025: principais resultados](https://cetic.br/media/pdf/analises/20260723142656_pt_br_tic_governo_2025_lançamento_imprensa.pdf) (PDF, 23/07/2026).
- Prefeitura de Porto Alegre: [Prefeitura lança atendimento com inteligência artificial no WhatsApp do 156](https://prefeitura.poa.br/gp/noticias/prefeitura-lanca-atendimento-com-inteligencia-artificial-no-whatsapp-do-156) (10/11/2026), [Central do Cidadão 156 registra mais de 242,3 mil interações em outubro](https://prefeitura.poa.br/smtc/noticias/central-do-cidadao-156-registra-mais-de-2423-mil-interacoes-em-outubro) (18/11/2026), [Porto Alegre prepara implantação de IA na Central do Cidadão 156](https://prefeitura.poa.br/smtc/noticias/porto-alegre-prepara-implantacao-de-ia-na-central-do-cidadao-156) (09/09/2026) e [Sancionada lei que estabelece regras para uso de inteligência artificial](https://prefeitura.poa.br/gp/noticias/sancionada-lei-que-estabelece-regras-para-uso-de-inteligencia-artificial) (22/10/2026).
- Diário do Comércio, [Câmara de BH aprova projeto que autoriza uso de inteligência artificial nos serviços públicos](https://diariodocomercio.com.br/legislacao/camara-bh-aprova-ia-servicos/) (11/06/2026) e TMC, [PBH regulamenta uso de Inteligência Artificial nos serviços públicos](https://tmc.com.br/brasil/pbh-regulamenta-uso-de-inteligencia-artificial-nos-servicos-publicos/) (24/07/2026).
- Prefeitura de Joinville, [Uso Responsável da Inteligência Artificial no Município de Joinville](https://www.joinville.sc.gov.br/wp-content/uploads/2026/04/Cartilha-Uso-responsavel-da-Inteligencia-Artificial.pdf) (cartilha, versão 1.0, 2025).
- gov.br/governodigital, [GuIA: Guia Unificado de IA para o Setor Público](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial-1/publicacoes/guia-unificado-de-inteligencia-artificial-para-o-setor-publico-1/guia-unificado-de-ia_def.pdf) e anexo [Uso de Bases de Conhecimento em Soluções de IA](https://www.gov.br/governodigital/pt-br/infraestrutura-nacional-de-dados/inteligencia-artificial-1/publicacoes/guia-unificado-de-inteligencia-artificial-para-o-setor-publico-1/uso-de-bases-de-conhecimento-em-solucoes-de-ia.pdf) (PDFs, junho de 2026).
- Agência Gov, [Arapiraca, em Alagoas, usa IA de forma inteligente e reinventa relação com cidadãos](https://agenciagov.ebc.com.br/noticias/202601/ia-e-atendimento-humanizado-como-a-cidade-de-arapiraca-reinventou-sua-relacao-com-o-cidadao) (26/01/2026).
