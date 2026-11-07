# Blog da HenaWeb: como escrever e publicar

Cada artigo é **um arquivo Markdown** nesta pasta: `content/blog/<slug>.md`. O nome do arquivo vira o endereço
(`henaweb.com/blog/<slug>`). Não há banco de dados nem painel: publicar é fazer commit e o deploy da Vercel gera o
artigo estático, com tudo que Google e IAs precisam (JSON-LD, sitemap, RSS, llms.txt e uma cópia em Markdown).

## Fluxo

1. `npm run blog -- new "Título do artigo" --service automacao-e-ia --tags "whatsapp, automação"`
   cria o arquivo a partir de `_modelo.md`, como **rascunho** (`draft: true`).
2. Escreva o texto (formato abaixo).
3. `npm run blog -- check` valida o arquivo (também roda dentro de `npm run lint` e do build).
4. Commit e push numa branch → o preview da Vercel mostra o rascunho com a faixa "RASCUNHO", fora das buscas.
5. Aprovado: `npm run blog -- publish <slug>` troca para `draft: false`. Commit, PR, merge: está no ar.

## Metadados (entre os `---` no topo)

| Campo | Obrigatório | Para quê |
|---|---|---|
| `title` | sim | Título (até ~65 caracteres). De preferência a pergunta que o cliente digitaria. |
| `description` | sim | 70 a 160 caracteres. Vai para o snippet do Google e o preview das redes. |
| `answer` | sim | A resposta direta, 1 a 3 frases (até 320 caracteres). Abre o artigo em destaque e é o trecho que buscas por IA citam. |
| `date` | sim | Publicação, `AAAA-MM-DD`. |
| `updated` | não | Última revisão relevante (não use para correção de vírgula). |
| `tags` | não | `[erp, automação]`. Viram palavras-chave e ligam artigos relacionados. |
| `service` | não | `sistemas-sob-medida`, `sistemas-publicos`, `automacao-e-ia` ou `sites-e-produtos`: liga o artigo à página do serviço. |
| `cover`, `coverAlt` | não | Imagem 1200×630 em `public/blog/…` e sua descrição. Sem capa, o site gera uma com o título. |
| `author` | não | Padrão: Henrique Alexandre de Camargo. |
| `draft` | não | `true` = só aparece em dev e nos previews. |
| `instagram`, `linkedin` | não | Link do mesmo conteúdo nas redes (vira `sameAs` no JSON-LD e "Também em…" no rodapé do artigo). |

## Corpo (Markdown, subconjunto)

- `## Seção` e `### Subseção` (nunca `#`: o título vem do campo `title`). Com 3+ seções `##`, aparece o sumário.
- Parágrafos, listas `-` e `1.`, citações `>`, blocos de código com crases triplas, `---`.
- `**negrito**`, `*itálico*`, `` `código` ``, `[texto](/caminho)` ou `[texto](https://…)`.
- Imagens: `![descrição obrigatória](/blog/arquivo.jpg "legenda opcional")`, com o arquivo em `public/blog/`.
- **Perguntas frequentes**: uma seção `## Perguntas frequentes` com `### Pergunta?` e a resposta embaixo vira
  FAQPage (rich result no Google e fonte fácil para IAs).
- Não funciona (o check acusa): tabelas, HTML, `#` título, `####`.

## O que faz um artigo ser encontrado (orgânico e IA)

- **Título = pergunta real** ("Quanto custa um sistema sob medida?", "ERP pronto ou sob medida?").
- **Responda logo** no `answer` e no primeiro parágrafo; detalhe depois.
- **Seções `##` que respondem sub-perguntas**, cada uma compreensível sozinha (IAs citam trechos isolados).
- **Fatos verificáveis, sem inventar**: números, preços, nomes de clientes e resultados só se forem reais e aprovados.
- **Links internos** para o serviço e os casos relacionados; 800+ palavras quando o assunto pede.
- **FAQ** com 3 a 5 perguntas no fim.

## Vindo do Instagram / LinkedIn

Quando o conteúdo nasce na ferramenta de redes sociais: transforme o post (ou o carrossel) num artigo completo,
não numa cópia da legenda. Um post curto vira: título-pergunta, `answer` com a ideia central, 3–5 seções expandindo
cada slide/ponto, FAQ. Preencha `instagram`/`linkedin` com os links do post original.
