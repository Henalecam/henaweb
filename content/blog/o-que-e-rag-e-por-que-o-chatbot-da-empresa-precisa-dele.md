---
title: O que é RAG e por que o chatbot da empresa precisa dele?
description: RAG faz o chatbot responder a partir dos documentos da sua empresa, não da memória da IA. Veja como funciona, onde ainda erra e o que preparar antes.
answer: RAG (geração aumentada por recuperação) é a técnica que faz o chatbot buscar a resposta nos documentos da empresa antes de escrever, em vez de confiar na memória do modelo. Reduz muito as respostas inventadas, mas não zera: depende de documentos atualizados, de regras claras e de passar exceções para uma pessoa.
date: 2026-11-16
tags: [rag, chatbot, inteligência artificial, atendimento]
service: automacao-e-ia
draft: false
---

Você coloca uma IA para atender clientes e ela responde com segurança impressionante. O problema é que ela nunca leu a sua tabela de preços, a sua política de trocas nem o manual do seu produto. **Quando não sabe, ela não diz "não sei": ela inventa algo plausível.**

RAG é a resposta técnica para isso. Em vez de responder de memória, o chatbot primeiro procura o trecho certo nos documentos da empresa e só então escreve, com base no que encontrou. É o que separa um robô que chuta de um atendente que consulta o manual. Mas, como mostra um estudo de Stanford, nem as ferramentas que prometiam acabar com as alucinações chegaram lá sozinhas.

## O que é RAG, em uma frase?

**RAG** é a sigla em inglês para *Retrieval-Augmented Generation*, ou geração aumentada por recuperação. A documentação da AWS define assim: é uma técnica para ampliar um **LLM** (modelo de linguagem grande, a tecnologia por trás do ChatGPT) com dados externos, "como documentos internos de uma empresa", para que ele tenha o contexto necessário para responder certo.

A ideia ganhou nome num artigo de 2020 assinado por Patrick Lewis e outros 11 pesquisadores. Eles descreveram o problema que ainda incomoda qualquer empresa: modelos de linguagem guardam conhecimento "dentro" de si, mas têm dificuldade de mostrar de onde tiraram uma resposta e de atualizar o que sabem. A solução proposta foi juntar o modelo a uma base de documentos consultada na hora da pergunta.

## Como o RAG funciona na prática?

Pense num chatbot de uma loja que recebe a pergunta: "Posso trocar um produto com defeito depois de 30 dias?". Com RAG, o caminho é este:

1. **Base de conhecimento.** A empresa reúne o que o robô pode usar: política de trocas, perguntas frequentes, manuais, tabelas. Os documentos são divididos em trechos menores.
2. **Busca por significado.** Cada trecho vira um **vetor**, uma representação numérica do sentido do texto. A pergunta do cliente também. Assim o sistema acha o trecho sobre "garantia e defeito" mesmo que o cliente não tenha usado essas palavras.
3. **Pergunta enriquecida.** Os trechos mais relevantes são colados junto com a pergunta e enviados ao modelo, com a instrução de responder apenas com base neles.
4. **Resposta com origem.** O modelo escreve a resposta, e o sistema pode mostrar de qual documento ela veio.

Repare no efeito colateral útil: quando a política muda, **atualizar o chatbot é atualizar o documento**. Não é preciso treinar um modelo novo.

## Por que um chatbot sem RAG inventa respostas?

Porque o modelo só sabe o que viu no treinamento, e o seu negócio não estava lá. A página do Google Cloud sobre o tema resume: os LLMs "são limitados aos dados pré-treinados", o que gera respostas desatualizadas e possivelmente imprecisas. Fornecer os fatos junto com a pergunta "pode reduzir as alucinações".

**Alucinação** é quando a IA produz uma resposta errada com cara de certa. No atendimento, isso vira problema jurídico: a Air Canada foi condenada a cumprir uma regra de reembolso que o chatbot dela inventou, como contamos em [a empresa responde pelo que o chatbot de IA diz?](/blog/a-empresa-responde-pelo-que-o-chatbot-de-ia-diz). Um robô que consulta a política real antes de responder teria evitado o caso.

## RAG acaba com as alucinações?

Não. Reduz, mas não acaba, e esse é o ponto que quase ninguém conta ao vender um chatbot.

Pesquisadores de Stanford testaram ferramentas de pesquisa jurídica com IA da LexisNexis e da Thomson Reuters, que usam RAG e prometiam evitar alucinações (a LexisNexis chegou a falar em citações "livres de alucinação"). Com 202 perguntas, **as ferramentas erraram ou citaram fonte que não sustentava a resposta entre 17% e 33% das vezes**. O resultado foi melhor que o do GPT-4 sem RAG, mas longe de zero. O estudo foi publicado no *Journal of Empirical Legal Studies* em 2025.

Os autores apontam por que o RAG falha:

- **A busca traz o trecho errado.** Se o sistema recupera um documento parecido, mas que não se aplica ao caso, o modelo responde com convicção a partir dele.
- **Documento velho continua valendo.** Uma regra revogada que segue na base vira resposta. No estudo, um sistema tratou como válido um critério jurídico que já tinha sido derrubado.
- **A IA concorda com premissas falsas.** Se o cliente afirma algo errado na pergunta, o modelo tende a seguir a premissa em vez de corrigi-la.

Os pesquisadores concluem que quem usa essas ferramentas precisa continuar conferindo se as afirmações importantes estão sustentadas pelas fontes. A Canaltech, ao explicar o RAG, chega ao mesmo lugar: a qualidade da resposta depende dos dados de origem, e informação desatualizada ou mal organizada continua gerando resposta errada.

## O que a empresa precisa ter pronto antes de um chatbot com RAG?

A parte difícil do RAG não é a IA. É a casa arrumada. Antes de ligar o robô:

- **Documentos com dono e data.** Cada assunto tem uma fonte oficial, e alguém responde por mantê-la atualizada. Duas versões da política de trocas na base geram duas respostas.
- **Dado que muda toda hora vem do sistema.** Preço, estoque, status de pedido e horários livres devem ser lidos por integração com o ERP, o CRM ou a agenda, não de um PDF.
- **Permissão por público.** O chatbot do cliente não pode ter acesso à planilha de margens nem a dados pessoais de outros clientes. A base de conhecimento precisa respeitar quem pergunta.
- **"Não sei" é uma resposta válida.** Se a busca não encontra nada confiável, o robô diz isso e passa a conversa para uma pessoa, com o histórico.
- **Teste com perguntas difíceis.** Pergunte com premissas falsas, peça exceções, invente promoções. Repita a cada mudança na base.
- **Registro das conversas.** É o que mostra quais perguntas o robô errou e qual documento precisa ser corrigido.

## Como a HenaWeb usa IA no atendimento?

Em [automação e IA](/servicos/automacao-e-ia), o agente de atendimento responde o que é frequente e seguro e passa para uma pessoa tudo o que foge do roteiro, com contexto. As integrações ligam CRM, WhatsApp, ERPs e bancos de dados, com logs de cada execução. O RAG entra exatamente aí: é o que faz o "frequente" ser respondido a partir dos documentos aprovados pela empresa.

O [Scheduly](/casos/scheduly) mostra o princípio de deixar a IA interpretar e o sistema decidir: o cliente escreve como fala, a IA entende o pedido, mas os horários sugeridos vêm da agenda real. Se o seu WhatsApp está lotado de perguntas repetidas, vale ler também [como automatizar o WhatsApp sem perder o toque humano](/blog/como-automatizar-o-whatsapp-sem-perder-o-toque-humano).

Quer um chatbot que responda com os documentos da sua empresa e saiba a hora de chamar alguém? [Conte quais perguntas o seu time mais responde](/#contato) e a gente desenha a base de conhecimento com você.

## Perguntas frequentes

### O que significa RAG em inteligência artificial?

RAG significa *Retrieval-Augmented Generation*, ou geração aumentada por recuperação. É a técnica em que a IA busca trechos relevantes em uma base de documentos antes de responder, e escreve a resposta com base neles.

### RAG elimina as alucinações do chatbot?

Não. Um estudo de Stanford publicado em 2025 encontrou erros entre 17% e 33% das respostas em ferramentas jurídicas com RAG que prometiam evitar alucinações. O RAG reduz o risco, mas exige documentos atualizados, testes e passagem para uma pessoa.

### Preciso treinar um modelo de IA com os dados da minha empresa?

Na maioria dos casos, não. Com RAG, o modelo consulta os documentos na hora da pergunta, então basta manter a base atualizada para a resposta mudar.

### Quais documentos posso colocar na base de um chatbot com RAG?

Políticas, perguntas frequentes, manuais, contratos-padrão e tabelas aprovadas. Dados que mudam toda hora, como preço, estoque e agenda, funcionam melhor lidos direto do sistema por integração.

### O chatbot com RAG pode mostrar a fonte da resposta?

Pode. Como a resposta é escrita a partir de trechos recuperados, o sistema consegue indicar de qual documento ela veio, o que ajuda o cliente a confiar e a equipe a corrigir erros.

---

### Fontes

- Lewis et al., [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) (arXiv, 2020).
- Magesh, Surani, Dahl, Suzgun, Manning e Ho, [Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools](https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf) (*Journal of Empirical Legal Studies*, 2025).
- Stanford HAI, [AI on Trial: Legal Models Hallucinate in 1 out of 6 (or More) Benchmarking Queries](https://hai.stanford.edu/news/ai-trial-legal-models-hallucinate-1-out-6-or-more-benchmarking-queries) (maio de 2024).
- AWS, [Compreendendo a geração aumentada de recuperação](https://docs.aws.amazon.com/pt_br/prescriptive-guidance/latest/retrieval-augmented-generation-options/what-is-rag.html).
- Google Cloud, [O que é a geração aumentada de recuperação (RAG)?](https://cloud.google.com/use-cases/retrieval-augmented-generation?hl=pt-BR)
- Canaltech, [O que é RAG na IA? Conheça o recurso que ajuda a reduzir alucinações](https://canaltech.com.br/inteligencia-artificial/o-que-e-rag-na-ia-conheca-o-recurso-que-ajuda-a-reduzir-alucinacoes/) (13 jan. 2026).
