---
name: blog-post
description: Write, review or publish an article for the henaweb.com blog (content/blog/*.md), including turning an Instagram or LinkedIn post into a full SEO/AI-search article. Use whenever asked to create, draft, update or publish a blog post or article for HenaWeb.
---

# Blog post for henaweb.com

Posts are Markdown files in `content/blog/<slug>.md`. Read `content/blog/README.md` first: it has the format, the
metadata table and the writing rules. The validator is the source of truth for the format.

## Steps

1. Branch: never commit to `main`. Use the branch the user names, or `blog/<slug>`.
2. Scaffold: `npm run blog -- new "Título" --service <slug> --tags "a, b"` (creates a draft from `_modelo.md`).
3. Write the post in Portuguese (pt-BR), following the README:
   - `title` = the question a client would search; `answer` = the direct answer in 1–3 sentences.
   - 800–1500 words, `##` sections that each answer a sub-question and read on their own.
   - Internal links to `/servicos/<slug>`, relevant `/casos/<slug>` and other `/blog/<slug>` posts.
   - End with `## Perguntas frequentes` (3–5 `###` questions with short answers).
4. Never invent facts: no client names, numbers, prices, results or quotes that the user or the site
   (`src/lib/content.ts`, `src/lib/services.ts`) doesn't already state. When a claim needs a real figure, leave a
   `[CONFIRMAR: …]` note in the text and tell the user; the post stays a draft.
5. Validate: `npm run blog -- check` must show ✓ for the file (fix every "erro"; weigh each "aviso").
6. Keep `draft: true`. Commit (`feat(blog): …`), push, and open or update the PR. The Vercel preview shows the
   draft with a RASCUNHO banner; share that URL for review.
7. Only when the user approves: `npm run blog -- publish <slug>`, commit, push. Merging the PR puts it live;
   sitemap, RSS (`/blog/feed.xml`), `llms.txt`, the ⌘K search and the footer link update by themselves.

## From an Instagram/LinkedIn post

Ask for (or read) the post text/carousel and its URL. Expand it into a full article (see README, last section) and
fill `instagram:` / `linkedin:` with the post URLs. Don't paste the caption as is.
