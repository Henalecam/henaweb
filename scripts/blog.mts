/**
 * Blog CLI (Node's type stripping runs it as is, no build step):
 *
 *   npm run blog -- new "Título do artigo" [--service sistemas-sob-medida] [--tags "erp, automação"]
 *       creates content/blog/<slug>.md from the template, as a draft
 *   npm run blog -- check            validates every post (also part of `npm run lint`)
 *   npm run blog -- list             posts, dates and status
 *   npm run blog -- publish <slug>   flips draft: true → false (after review), dating it today if still undated
 *
 * The format and its rules live in src/lib/blogFormat.ts and src/lib/markdown.ts; content/blog/README.md explains
 * them for whoever (or whatever) writes the posts.
 */
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { checkFrontmatter, parseFile, SLUG_RE } from '../src/lib/blogFormat.ts';
import { parseMarkdown, slugify, faqOf, wordsOf } from '../src/lib/markdown.ts';

const DIR = join(process.cwd(), 'content', 'blog');
const RESERVED = ['md', 'feed', 'feed-xml', 'opengraph-image', 'page'];
const today = () => new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10); // Brasília

const files = () => (existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_') && f !== 'README.md') : []);

function check(): number {
  let bad = 0;
  const titles = new Map<string, string>();
  for (const file of files()) {
    const slug = file.replace(/\.md$/, '');
    const { data, body, errors: e1 } = parseFile(readFileSync(join(DIR, file), 'utf8'));
    const { fm, errors: e2, warnings } = checkFrontmatter(data);
    const { blocks, problems } = parseMarkdown(body);
    const errors = [...e1, ...e2, ...problems];
    if (!SLUG_RE.test(slug)) errors.push('nome do arquivo: só letras minúsculas, números e hífens');
    if (RESERVED.includes(slug)) errors.push(`"${slug}" é um endereço reservado do blog`);
    if (fm.title && titles.has(fm.title.toLowerCase())) errors.push(`mesmo título de ${titles.get(fm.title.toLowerCase())}`);
    titles.set(fm.title.toLowerCase(), file);
    const words = wordsOf(blocks);
    if (!fm.draft && words < 300) warnings.push(`só ${words} palavras: artigos curtos demais raramente ranqueiam (mire em 800+)`);
    const h2 = blocks.filter((b) => b.t === 'h' && b.level === 2).length;
    if (words > 600 && h2 < 2) warnings.push('texto longo com menos de duas seções ##: divida em seções com títulos que respondam perguntas');
    if (!faqOf(blocks).length) warnings.push('sem "## Perguntas frequentes" (### pergunta + resposta): ajuda Google e IAs a citar o artigo');
    if (!blocks.some((b) => (b.t === 'p' || b.t === 'ul' || b.t === 'ol') && JSON.stringify(b).includes('"href":"/'))) warnings.push('nenhum link interno (/servicos/…, /casos/…, /blog/…)');
    if (fm.cover && !existsSync(join(process.cwd(), 'public', fm.cover))) errors.push(`cover ${fm.cover} não existe em public/`);
    for (const b of blocks) if (b.t === 'img' && b.src.startsWith('/') && !existsSync(join(process.cwd(), 'public', b.src))) errors.push(`imagem ${b.src} não existe em public/`);
    const status = fm.draft ? 'rascunho' : 'publicado';
    if (errors.length) {
      bad++;
      console.log(`✗ ${file} (${status})`);
      errors.forEach((e) => console.log(`    erro: ${e}`));
    } else console.log(`✓ ${file} (${status}, ${words} palavras)`);
    warnings.forEach((w) => console.log(`    aviso: ${w}`));
  }
  if (!files().length) console.log('nenhum artigo em content/blog');
  return bad;
}

const [cmd, ...args] = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args.splice(i, 2)[1] : undefined;
};

if (cmd === 'new') {
  const service = flag('service');
  const tags = flag('tags');
  const title = args.join(' ').trim();
  if (!title) {
    console.error('uso: npm run blog -- new "Título do artigo" [--service slug] [--tags "a, b"]');
    process.exit(1);
  }
  const slug = slugify(title).slice(0, 80).replace(/-+$/, '');
  const path = join(DIR, `${slug}.md`);
  if (existsSync(path)) {
    console.error(`já existe: content/blog/${slug}.md`);
    process.exit(1);
  }
  mkdirSync(DIR, { recursive: true });
  const template = readFileSync(join(DIR, '_modelo.md'), 'utf8')
    .replace(/^title: .*$/m, `title: ${title}`)
    .replace(/^date: .*$/m, `date: ${today()}`)
    .replace(/^tags: .*$/m, `tags: [${tags ?? ''}]`)
    .replace(/^service: .*$/m, service ? `service: ${service}` : '')
    .replace(/\n{3,}/g, '\n\n');
  writeFileSync(path, template);
  console.log(`criado: content/blog/${slug}.md (rascunho). Depois de escrever: npm run blog -- check`);
} else if (cmd === 'check') {
  process.exit(check() ? 1 : 0);
} else if (cmd === 'list') {
  for (const file of files()) {
    const { fm } = checkFrontmatter(parseFile(readFileSync(join(DIR, file), 'utf8')).data);
    console.log(`${fm.date || '??????????'}  ${fm.draft ? 'rascunho ' : 'publicado'}  /blog/${file.replace(/\.md$/, '')}  ${fm.title}`);
  }
} else if (cmd === 'publish') {
  const slug = args[0];
  const path = join(DIR, `${slug}.md`);
  if (!slug || !existsSync(path)) {
    console.error('uso: npm run blog -- publish <slug>');
    process.exit(1);
  }
  const raw = readFileSync(path, 'utf8');
  writeFileSync(path, raw.replace(/^draft: true\s*$/m, 'draft: false').replace(/^date:\s*$/m, `date: ${today()}`));
  process.exit(check() ? 1 : 0);
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('*/')[0]);
}
