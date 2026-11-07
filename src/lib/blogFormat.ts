/**
 * The blog's file format, shared by the site (src/lib/blog.ts), next.config.ts and the CLI (scripts/blog.mts, run
 * by Node's own type stripping): keep it free of imports and of TypeScript-only syntax (enums, namespaces).
 *
 * A post is one Markdown file in content/blog/<slug>.md:
 *
 *   ---
 *   title: Sistema sob medida ou SaaS pronto?
 *   description: Uma frase de 70 a 160 caracteres para o Google e as IAs.
 *   answer: A resposta curta, em 1 a 3 frases, que abre o artigo (é o que as buscas por IA citam).
 *   date: 2026-11-07
 *   tags: [sistemas sob medida, saas]
 *   service: sistemas-sob-medida
 *   draft: true
 *   ---
 *
 *   Corpo em Markdown (subconjunto: ## e ###, parágrafos, listas, > citação, ``` código, imagens, links, **negrito**,
 *   *itálico*, `código`). Uma seção "## Perguntas frequentes" com "### Pergunta?" vira FAQPage no Google.
 */

export const FIELDS = {
  title: 'obrigatório · título do artigo (até 70 caracteres)',
  description: 'obrigatório · resumo para buscas e redes, 70 a 160 caracteres',
  answer: 'obrigatório · resposta direta à pergunta do título, 1 a 3 frases (até 320 caracteres)',
  date: 'obrigatório · data de publicação, AAAA-MM-DD',
  updated: 'opcional · data da última revisão relevante, AAAA-MM-DD',
  tags: 'opcional · lista entre colchetes, ex.: [erp, automação]',
  service: 'opcional · slug do serviço relacionado (sistemas-sob-medida, sistemas-publicos, automacao-e-ia, sites-e-produtos)',
  cover: 'opcional · imagem em /public, ex.: /blog/meu-artigo.jpg (1200×630)',
  coverAlt: 'obrigatório quando há cover · descrição da imagem',
  author: 'opcional · nome do autor (padrão: Henrique Alexandre de Camargo)',
  draft: 'opcional · true deixa o artigo fora do site publicado (aparece só em dev e nos previews da Vercel)',
  instagram: 'opcional · link do post correspondente no Instagram',
  linkedin: 'opcional · link do post correspondente no LinkedIn',
} as const;

export type Field = keyof typeof FIELDS;

export type Frontmatter = {
  title: string;
  description: string;
  answer: string;
  date: string;
  updated?: string;
  tags: string[];
  service?: string;
  cover?: string;
  coverAlt?: string;
  author: string;
  draft: boolean;
  instagram?: string;
  linkedin?: string;
};

export const DEFAULT_AUTHOR = 'Henrique Alexandre de Camargo';
export const SERVICE_SLUGS = ['sistemas-sob-medida', 'sistemas-publicos', 'automacao-e-ia', 'sites-e-produtos'];
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Splits "---\nkey: value\n---\nbody". Values: plain text, "quoted", [a, b] lists, true/false. */
export function parseFile(raw: string): { data: Record<string, string | string[] | boolean>; body: string; errors: string[] } {
  const errors: string[] = [];
  const text = raw.replace(/^﻿/, '').replace(/\r\n?/g, '\n');
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (!m) return { data: {}, body: text, errors: ['o arquivo precisa começar com um bloco --- … --- de metadados'] };
  const data: Record<string, string | string[] | boolean> = {};
  m[1].split('\n').forEach((line, i) => {
    if (!line.trim() || line.trim().startsWith('#')) return;
    const kv = /^([A-Za-z]+):\s*(.*)$/.exec(line);
    if (!kv) return errors.push(`metadados, linha ${i + 2}: esperado "chave: valor", veio "${line}"`);
    const [, key, rawValue] = kv;
    let v: string | string[] | boolean = rawValue.trim();
    if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map((s) => unquote(s.trim())).filter(Boolean);
    else if (v === 'true' || v === 'false') v = v === 'true';
    else v = unquote(v);
    data[key] = v;
  });
  return { data, body: m[2], errors };
}

const unquote = (s: string) => (/^(["']).*\1$/.test(s) ? s.slice(1, -1) : s);

/** Checks the metadata against FIELDS; returns the typed frontmatter and a list of problems in Portuguese. */
export function checkFrontmatter(data: Record<string, string | string[] | boolean>): { fm: Frontmatter; errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const str = (k: Field) => (typeof data[k] === 'string' ? (data[k] as string) : undefined);
  for (const k of Object.keys(data)) if (!(k in FIELDS)) errors.push(`campo desconhecido "${k}" (campos aceitos: ${Object.keys(FIELDS).join(', ')})`);
  for (const k of ['title', 'description', 'answer', 'date'] as const) if (!str(k)) errors.push(`falta o campo obrigatório "${k}" (${FIELDS[k]})`);
  const title = str('title') ?? '';
  const description = str('description') ?? '';
  const answer = str('answer') ?? '';
  if (title.length > 70) warnings.push(`title com ${title.length} caracteres: o Google corta perto de 60–70`);
  if (description && (description.length < 70 || description.length > 160)) errors.push(`description com ${description.length} caracteres: use de 70 a 160`);
  if (answer.length > 320) errors.push(`answer com ${answer.length} caracteres: até 320 (1 a 3 frases diretas)`);
  for (const k of ['date', 'updated'] as const) {
    const v = str(k);
    if (v && (!DATE_RE.test(v) || Number.isNaN(Date.parse(v)))) errors.push(`${k} "${v}" não está no formato AAAA-MM-DD`);
  }
  if (str('updated') && str('date') && str('updated')! < str('date')!) errors.push('updated é anterior a date');
  const service = str('service');
  if (service && !SERVICE_SLUGS.includes(service)) errors.push(`service "${service}" não existe (use: ${SERVICE_SLUGS.join(', ')})`);
  const cover = str('cover');
  if (cover && !cover.startsWith('/')) errors.push('cover deve ser um caminho em /public, começando com /');
  if (cover && !str('coverAlt')) errors.push('cover sem coverAlt (descrição da imagem)');
  for (const k of ['instagram', 'linkedin'] as const) {
    const v = str(k);
    if (v && !/^https:\/\//.test(v)) errors.push(`${k} deve ser um link https://`);
  }
  if (data.tags !== undefined && !Array.isArray(data.tags)) errors.push('tags deve ser uma lista entre colchetes, ex.: [erp, automação]');
  if (data.draft !== undefined && typeof data.draft !== 'boolean') errors.push('draft deve ser true ou false');
  return {
    fm: {
      title,
      description,
      answer,
      date: str('date') ?? '',
      updated: str('updated'),
      tags: Array.isArray(data.tags) ? data.tags : [],
      service,
      cover,
      coverAlt: str('coverAlt'),
      author: str('author') || DEFAULT_AUTHOR,
      draft: data.draft === true,
      instagram: str('instagram'),
      linkedin: str('linkedin'),
    },
    errors,
    warnings,
  };
}
