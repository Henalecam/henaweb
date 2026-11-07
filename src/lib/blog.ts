import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { checkFrontmatter, parseFile, SLUG_RE, type Frontmatter } from './blogFormat';
import { faqOf, parseMarkdown, wordsOf, type Block } from './markdown';

export type Post = Frontmatter & {
  slug: string;
  blocks: Block[];
  /** raw Markdown body, served as /blog/<slug>.md for AI assistants */
  body: string;
  faq: { q: string; a: string }[];
  toc: { id: string; text: string; level: 2 | 3 }[];
  words: number;
  minutes: number;
};

export const BLOG_DIR = join(process.cwd(), 'content', 'blog');

/**
 * Drafts show in `next dev` and on Vercel preview deployments (so a post can be reviewed at its preview URL), never
 * on the production site, its sitemap, feed or llms.txt.
 */
export const showDrafts = process.env.VERCEL_ENV ? process.env.VERCEL_ENV !== 'production' : process.env.NODE_ENV !== 'production';

let cache: Post[] | null = null;

/** Every valid post, newest first (drafts included; filter with `published`). Invalid files fail the build loudly. */
export function allPosts(): Post[] {
  if (cache) return cache;
  let files: string[] = [];
  try {
    files = readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md');
  } catch {
    files = [];
  }
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, '');
    const { data, body, errors: e1 } = parseFile(readFileSync(join(BLOG_DIR, file), 'utf8'));
    const { fm, errors: e2 } = checkFrontmatter(data);
    const { blocks, problems } = parseMarkdown(body);
    const errors = [...(SLUG_RE.test(slug) ? [] : [`nome de arquivo "${file}": use só letras minúsculas, números e hífens`]), ...e1, ...e2, ...problems];
    if (errors.length) throw new Error(`content/blog/${file}:\n  - ${errors.join('\n  - ')}\n(rode "npm run blog -- check" para ver todos os problemas)`);
    const words = wordsOf(blocks);
    return {
      ...fm,
      slug,
      blocks,
      body: body.trim(),
      faq: faqOf(blocks),
      toc: blocks.flatMap((b) => (b.t === 'h' ? [{ id: b.id, text: b.text, level: b.level }] : [])),
      words,
      minutes: Math.max(1, Math.round(words / 200)),
    };
  });
  cache = posts.sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
  return cache;
}

/** What visitors (and crawlers) see on this deployment. */
export const visiblePosts = () => allPosts().filter((p) => !p.draft || showDrafts);
/** Published only, whatever the deployment: for the sitemap, feed and llms.txt. */
export const publishedPosts = () => allPosts().filter((p) => !p.draft);
export const postBySlug = (slug: string) => visiblePosts().find((p) => p.slug === slug);

/** "7 de novembro de 2026" */
export const dateBR = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T12:00:00Z`));
