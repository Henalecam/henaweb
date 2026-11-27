---
title: Como saber se o backup da minha empresa funciona de verdade?
description: Backup no mesmo servidor, nunca restaurado ou que só o fornecedor acessa não salva ninguém. Os 5 testes que mostram se o seu aguenta um ataque ou um erro.
answer: Só há um jeito de saber: restaurar o backup num ambiente separado e cronometrar. Cópia que fica no mesmo servidor dos dados, que ninguém nunca restaurou ou que só o fornecedor alcança não protege a empresa. Em 94% dos ataques de ransomware os criminosos tentam destruir os backups, e em 57% conseguem (Sophos, 2024).
date: 2026-11-28
tags: [backup, ransomware, segurança, erp, continuidade]
service: sistemas-sob-medida
draft: true
---

Todo fornecedor garante que "faz backup". A pergunta que importa é outra: se o servidor do sistema sumir hoje às 9h, a que horas a empresa volta a emitir nota, cobrar e atender? Quem nunca restaurou o próprio backup não sabe, e descobre no pior dia possível.

## Por que "ter backup" não é o mesmo que conseguir restaurar?

Porque o **backup virou alvo**. Numa pesquisa da Sophos com 2.974 organizações atingidas por ransomware (sequestro de dados: o invasor criptografa os arquivos e cobra resgate), feita no início de 2024, 94% disseram que os criminosos tentaram comprometer os backups, e em 57% dos casos conseguiram. Com o backup destruído, o custo de recuperação é oito vezes maior (US$ 3 milhões contra US$ 375 mil), 67% pagam o resgate (contra 36%) e só 26% se recuperam em uma semana (contra 46%).

No Brasil, a edição de 2025 da pesquisa anual da Sophos (110 organizações atacadas) mostra que 54% dos ataques terminaram com dados criptografados; 73% usaram backups para recuperá-los, mas 66% pagaram resgate, com pedido mediano de US$ 392.500. O custo de recuperação fora o resgate ficou em US$ 1,19 milhão.

O guia de prevenção e resposta a ransomware do governo federal, publicado em junho de 2026, explica o motivo: os criminosos "tentam ativamente destruir as cópias de segurança para forçar o pagamento do resgate", e o código malicioso é "implantado preferencialmente em ativos de alto valor e sistemas de backup". Backup que o invasor alcança é só mais um arquivo para criptografar.

## Backup no mesmo servidor é backup?

Não. É uma **cópia que morre junto** com o original. Em abril de 2026, um agente de IA apagou em 9 segundos o banco de dados de produção da PocketOS, uma plataforma SaaS, e os backups foram junto: segundo a TechRadar, a hospedagem guardava os backups no mesmo volume dos dados, e "apagar um volume também apagava todos os backups associados a ele". Contamos a história em [posso deixar um agente de IA mexer no sistema da minha empresa?](/blog/posso-deixar-um-agente-de-ia-mexer-no-sistema-da-minha-empresa). Vale o mesmo para um disco que queima ou uma senha vazada.

Em Chapadão do Sul (MS), um ransomware criptografou os dados da prefeitura em maio de 2025 e teria paralisado saúde, assistência social, arrecadação e finanças, segundo o Baguete. Os criminosos pediram US$ 1,5 milhão; a prefeitura recusou, contratou uma empresa para recuperar os dados e, entre as medidas anunciadas depois, estava "incluir backup externo". A ordem certa é a inversa.

O guia federal resume a regra: pelo menos três cópias dos dados, em dois tipos de mídia diferentes, uma delas guardada fora do ambiente da empresa e outra em **formato imutável**, isto é, um armazenamento que não aceita alteração nem exclusão durante um prazo definido (tecnologias WORM ou *Object Lock* em nuvem). Imutável é o que nem o administrador, nem o invasor com a senha do administrador, consegue apagar.

## Backup que só o fornecedor acessa é seu?

Só no papel. Em abril de 2026, o TJMG manteve a condenação de uma empresa de informática que, em maio de 2017, **suspendeu todos os acessos** da Prefeitura de Novo Oriente (MG) ao sistema de gestão e ao banco de dados, depois do fim do contrato firmado em 2014 e no meio da licitação para trocar de fornecedor. O contrato previa manter o serviço até a transição; a perícia concluiu que não havia impedimento técnico; a empresa chegou a negar um "cadastro apenas para fazer o backup". Quase nove anos entre o bloqueio e o acórdão para garantir o acesso aos próprios dados.

Quem só consegue restaurar o sistema se o fornecedor quiser não tem backup: tem uma promessa. Por isso o banco de dados e as cópias precisam ficar em uma conta da própria organização, como explicamos em [o código do sistema que a minha empresa pagou é meu?](/blog/o-codigo-do-sistema-que-a-minha-empresa-pagou-e-meu) e como fazemos em [sistemas sob medida](/servicos/sistemas-sob-medida).

## Por que o backup falha sem avisar?

Porque ninguém testa. "A raiz do problema é a falta de teste", disse ao Canaltech, em março de 2026, Iuri Santos, gerente de tecnologia da Kingston Brasil: "às vezes o sistema retorna que a cópia foi feita com sucesso, mas ela foi corrompida". Rede instável no meio da cópia, mídia danificada, um limite de tempo estourado que registra "sucesso" sem terminar: tudo isso só aparece na hora de restaurar.

O guia federal pede testes regulares de integridade (sugere trimestrais) "para confirmar que o serviço público pode ser restabelecido em minutos", e avisa que "recuperar não é apenas 'voltar o backup'": a cópia pode conter o próprio malware e precisa ser montada em ambiente isolado antes de voltar à produção. Dois termos ajudam a conversar com o fornecedor: **RTO** (tempo de recuperação: quanto a empresa fica parada) e **RPO** (ponto de recuperação: quantas horas de dados aceita perder). Quem não sabe os dois números não tem plano, tem esperança.

Backup bem feito também é prova. Em abril de 2026, a hospedagem americana Anchor Hosting achou o dia exato em que um plugin de WordPress com porta dos fundos alterou um site: extraiu o mesmo arquivo de oito datas de backup e comparou os tamanhos (de 3.345 para 9.540 bytes de um dia para o outro). Sem histórico diário, não há como saber desde quando a empresa está invadida.

## Os 5 testes que mostram se o backup funciona

Faça estas perguntas a quem cuida do seu sistema. Cada "não sei" é um risco com nome.

1. **Onde a cópia está?** Se a resposta é "no mesmo servidor" ou "na mesma conta de nuvem", não é backup. Precisa de outra conta, de preferência em outro provedor, que a credencial do sistema não alcança.
2. **Quem consegue apagar?** A conta do backup deve ser dedicada, com autenticação em dois fatores, e pelo menos uma cópia imutável. Se a senha do administrador do sistema apaga o backup, o invasor que a roubar apaga também.
3. **Quando foi a última restauração de verdade?** Não o relatório de "backup concluído": uma restauração completa, num ambiente separado, com cronômetro (esse é o RTO real) e conferência de quantas horas de dados ficaram para trás (o RPO real).
4. **O que está dentro?** Banco de dados, arquivos enviados pelos usuários, configurações e chaves de acesso. Restaurar o banco sem os documentos, ou sem a chave que abre o banco, é meio sistema. Guarde versões antigas para voltar a antes da invasão.
5. **Quem na empresa restaura sem o fornecedor?** Um procedimento escrito, testado por alguém de dentro. Novo Oriente mostra o que acontece quando a resposta depende de quem está saindo.

É o tipo de critério que deve entrar no contrato e no aceite do sistema, como mostramos em [como testar o sistema antes de aceitar a entrega](/blog/como-testar-o-sistema-antes-de-aceitar-a-entrega-e-pagar). Num ERP como o [Diconta](/casos/diconta), que concentra financeiro, notas fiscais e documentos de vários CNPJs, a pergunta "quando volta?" se mede em horas de faturamento parado. Se não sabe responder as cinco perguntas sobre o seu sistema, [fale com a gente](/#contato): uma restauração de teste vale mais que qualquer garantia verbal.

## Perguntas frequentes

### Backup na nuvem é seguro?

É uma das cópias, não a única. A nuvem resolve o "fora do ambiente da empresa", mas se fica na mesma conta ou usa a mesma senha do sistema, um invasor ou um erro apaga as duas. Conta separada, dois fatores e uma cópia imutável tornam a nuvem segura.

### Com que frequência a empresa deve fazer backup?

Depende de quantas horas de dados a empresa aceita perder (o RPO). Para um sistema que emite notas e recebe pagamentos o dia todo, cópia diária costuma ser pouco; o guia federal sugere testes de restauração trimestrais, seja qual for a frequência da cópia.

### O que é backup imutável?

É uma cópia gravada num armazenamento que não aceita alteração nem exclusão por um prazo definido, nem por quem tem a senha de administrador. É a cópia que sobrevive ao ransomware e ao agente de IA que resolveu "limpar" o servidor.

### Pagar o resgate recupera os dados?

É caro e não substitui o backup. No Brasil, em 2025, 66% das organizações atacadas pagaram, com pedido mediano de US$ 392.500, segundo a Sophos; na pesquisa global, quem tinha backup intacto gastou oito vezes menos na recuperação e pagou resgate na metade dos casos.

---

### Fontes

- Sophos, [O impacto de backups comprometidos nos resultados de ransomware](https://www.sophos.com/pt-br/blog/the-impact-of-compromised-backups-on-ransomware-outcomes) (pesquisa com 2.974 organizações, início de 2024) e [O Estado do Ransomware no Brasil 2025](https://assets.sophos.com/X24WTUEQ/at/rcg576qw3z3tvwf95m39kx/sophos-state-of-ransomware-in-brazil-2025-ptbr.pdf) (PDF, 110 organizações, junho de 2025).
- Ministério da Gestão e da Inovação (MGI), [Guia de Referência de Prevenção e Resposta a Ransomware](https://www.gov.br/governodigital/pt-br/privacidade-e-seguranca/ppsi-2.0/arquivos/guia_ransomware_v1-3.pdf) (PDF, versão 1.1, junho de 2026), seção 4.7.
- TechRadar, ['It took 9 seconds': tech founder outlines how rogue Claude-powered AI tool wiped entire company database and backups](https://www.techradar.com/pro/it-took-9-seconds-tech-founder-outlines-how-rogue-claude-powered-ai-tool-wiped-entire-company-database-and-backups-but-says-theres-no-such-thing-as-bad-publicity) (02/05/2026).
- Baguete, [Chapadão do Sul sofre ciberataque](https://www.baguete.com.br/noticias/chapadao-do-sul-sofre-ciberataque) (09/06/2025).
- TJMG, [Justiça condena empresa a liberar acesso de prefeitura a sistema](https://www.tjmg.jus.br/portal-tjmg/noticias/justica-condena-empresa-a-liberar-acesso-de-prefeitura-a-sistema-8ACC80299D45C62D019D4A29237D16C4-00.htm) (01/04/2026, acórdão 1.0000.25.119035-1/002).
- Canaltech, [Especialista explica por que empresas podem perder dados mesmo fazendo backups](https://canaltech.com.br/seguranca/especialista-explica-por-que-empresas-podem-perder-dados-mesmo-fazendo-backups/) (24/03/2026).
- Anchor Hosting, [Someone bought 30 WordPress plugins and planted a backdoor in all of them](https://anchor.host/someone-bought-30-wordpress-plugins-and-planted-a-backdoor-in-all-of-them/) (09/04/2026).
