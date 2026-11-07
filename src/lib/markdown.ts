/**
 * A small Markdown reader for the blog: the subset the posts use, parsed into a plain tree that React renders
 * (src/components/blog/Markdown.tsx) without any raw HTML, so a post can never inject markup or scripts. Anything
 * outside the subset is reported by the checker (scripts/blog.mts) instead of being shown half-parsed.
 *
 * Blocks: ## / ### headings, paragraphs, - or 1. lists, > quotes, ``` code fences, ![alt](src "legenda") images,
 * --- rules. Inline: **negrito**, *itálico*, `código`, [texto](url). No imports, no TS-only syntax (also run by Node).
 */

export type Inline =
  | { t: 'text'; v: string }
  | { t: 'strong'; c: Inline[] }
  | { t: 'em'; c: Inline[] }
  | { t: 'code'; v: string }
  | { t: 'link'; href: string; c: Inline[] };

export type Block =
  | { t: 'h'; level: 2 | 3; id: string; text: string; c: Inline[] }
  | { t: 'p'; c: Inline[] }
  | { t: 'ul' | 'ol'; items: Inline[][] }
  | { t: 'quote'; c: Inline[][] }
  | { t: 'code'; lang: string; v: string }
  | { t: 'img'; src: string; alt: string; caption?: string }
  | { t: 'hr' };

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Inline marks, left to right; an unmatched marker stays as text. */
export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let buf = '';
  const flush = () => {
    if (buf) out.push({ t: 'text', v: buf });
    buf = '';
  };
  let i = 0;
  while (i < src.length) {
    const rest = src.slice(i);
    let m: RegExpExecArray | null;
    if ((m = /^`([^`]+)`/.exec(rest))) {
      flush();
      out.push({ t: 'code', v: m[1] });
    } else if ((m = /^\*\*(.+?)\*\*/.exec(rest))) {
      flush();
      out.push({ t: 'strong', c: parseInline(m[1]) });
    } else if ((m = /^\*([^*\s][^*]*?)\*/.exec(rest))) {
      flush();
      out.push({ t: 'em', c: parseInline(m[1]) });
    } else if ((m = /^\[([^\]]+)\]\(([^)\s]+)\)/.exec(rest))) {
      flush();
      out.push({ t: 'link', href: m[2], c: parseInline(m[1]) });
    } else {
      buf += src[i];
      i++;
      continue;
    }
    i += m[0].length;
  }
  flush();
  return out;
}

export const inlineText = (c: Inline[]): string => c.map((x) => (x.t === 'text' || x.t === 'code' ? x.v : inlineText(x.c))).join('');

/** Parses the body; `problems` lists lines the subset doesn't cover (tables, raw HTML, # titles, deep headings). */
export function parseMarkdown(body: string): { blocks: Block[]; problems: string[] } {
  const lines = body.replace(/\r\n?/g, '\n').split('\n');
  const blocks: Block[] = [];
  const problems: string[] = [];
  const ids = new Map<string, number>();
  let para: string[] = [];
  const endPara = () => {
    if (para.length) blocks.push({ t: 'p', c: parseInline(para.join(' ')) });
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const n = i + 1;
    let m: RegExpExecArray | null;
    if (!line.trim()) {
      endPara();
    } else if ((m = /^```(\w*)\s*$/.exec(line))) {
      endPara();
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i++]);
      if (i >= lines.length) problems.push(`linha ${n}: bloco de código sem o \`\`\` de fechamento`);
      blocks.push({ t: 'code', lang: m[1], v: code.join('\n') });
    } else if ((m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line))) {
      endPara();
      const level = m[1].length;
      if (level === 1) problems.push(`linha ${n}: não use "# " no corpo; o título do artigo vem do campo title`);
      else if (level > 3) problems.push(`linha ${n}: use só ## e ### (níveis mais fundos atrapalham o sumário)`);
      const c = parseInline(m[2]);
      const text = inlineText(c);
      const base = slugify(text) || 'secao';
      const k = ids.get(base) ?? 0;
      ids.set(base, k + 1);
      blocks.push({ t: 'h', level: level <= 2 ? 2 : 3, id: k ? `${base}-${k + 1}` : base, text, c });
    } else if (/^(-{3,}|\*{3,})\s*$/.test(line)) {
      endPara();
      blocks.push({ t: 'hr' });
    } else if ((m = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)\s*$/.exec(line))) {
      endPara();
      if (!m[1].trim()) problems.push(`linha ${n}: imagem sem texto alternativo (![descrição](/caminho.jpg))`);
      blocks.push({ t: 'img', alt: m[1], src: m[2], caption: m[3] });
    } else if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      endPara();
      const ordered = /^\s*\d/.test(line);
      const items: Inline[][] = [];
      while (i < lines.length && (ordered ? /^\s*\d+[.)]\s+/ : /^\s*[-*+]\s+/).test(lines[i])) {
        let item = lines[i].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '');
        // a wrapped item continues on indented lines
        while (i + 1 < lines.length && /^\s{2,}\S/.test(lines[i + 1]) && !/^\s*(?:[-*+]|\d+[.)])\s+/.test(lines[i + 1])) item += ' ' + lines[++i].trim();
        items.push(parseInline(item));
        i++;
      }
      i--;
      blocks.push({ t: ordered ? 'ol' : 'ul', items });
    } else if (/^>\s?/.test(line)) {
      endPara();
      const paras: string[][] = [[]];
      while (i < lines.length && /^>/.test(lines[i])) {
        const l = lines[i].replace(/^>\s?/, '');
        if (!l.trim()) paras.push([]);
        else paras[paras.length - 1].push(l);
        i++;
      }
      i--;
      blocks.push({ t: 'quote', c: paras.filter((p) => p.length).map((p) => parseInline(p.join(' '))) });
    } else {
      if (/^\s*\|.*\|\s*$/.test(line)) problems.push(`linha ${n}: tabelas não são suportadas; use uma lista`);
      if (/<\/?[a-zA-Z][^>]*>/.test(line)) problems.push(`linha ${n}: HTML não é renderizado; use Markdown`);
      para.push(line.trim());
    }
  }
  endPara();
  for (const b of blocks) {
    const walk = (c: Inline[]) =>
      c.forEach((x) => {
        if (x.t === 'link' && !/^(https:\/\/|\/|#|mailto:)/.test(x.href)) problems.push(`link "${x.href}": use https://, um caminho do site (/casos/…) ou #ancora`);
        if (x.t !== 'text' && x.t !== 'code') walk(x.c);
      });
    if (b.t === 'p' || b.t === 'h') walk(b.c);
    if (b.t === 'ul' || b.t === 'ol') b.items.forEach(walk);
    if (b.t === 'quote') b.c.forEach(walk);
  }
  return { blocks, problems };
}

/** The "## Perguntas frequentes" section, as question/answer pairs (### question, the paragraphs below it). */
export function faqOf(blocks: Block[]): { q: string; a: string }[] {
  const start = blocks.findIndex((b) => b.t === 'h' && b.level === 2 && /^perguntas frequentes$/i.test(b.text.trim()));
  if (start < 0) return [];
  const out: { q: string; a: string }[] = [];
  for (let i = start + 1; i < blocks.length; i++) {
    const b = blocks[i];
    // a new ## section or a --- rule ends the FAQ ("---" then "### Fontes" used to become a sixth question)
    if ((b.t === 'h' && b.level === 2) || b.t === 'hr') break;
    if (b.t === 'h' && b.level === 3) out.push({ q: b.text, a: '' });
    else if (out.length) {
      const text = b.t === 'p' ? inlineText(b.c) : b.t === 'ul' || b.t === 'ol' ? b.items.map(inlineText).join('; ') : '';
      if (text) out[out.length - 1].a = [out[out.length - 1].a, text].filter(Boolean).join(' ');
    }
  }
  return out.filter((f) => f.a);
}

/** Plain words of the body, for reading time and the word count in the JSON-LD. */
export function wordsOf(blocks: Block[]): number {
  let n = 0;
  const count = (s: string) => (n += s.split(/\s+/).filter(Boolean).length);
  for (const b of blocks) {
    if (b.t === 'p' || b.t === 'h') count(inlineText(b.c));
    else if (b.t === 'ul' || b.t === 'ol') b.items.forEach((x) => count(inlineText(x)));
    else if (b.t === 'quote') b.c.forEach((x) => count(inlineText(x)));
    else if (b.t === 'code') count(b.v);
  }
  return n;
}
