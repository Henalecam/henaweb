'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { capabilities, homeFaq, nav, projects, site, whatsappLink } from '@/lib/content';
import { services } from '@/lib/services';
import { faqId } from '@/lib/slug';
import { pastimes } from '@/lib/pastimes';
import WinClose from './WinClose';

// keywords are searched but not shown: a case is found by what it does, not only by its name
type Item = { group: string; label: string; hint?: string; href: string; external?: boolean; keywords?: string };

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

const ITEMS: Item[] = [
  ...nav.map((n) => ({ group: 'Seções', label: n.label, href: n.href })),
  { group: 'Seções', label: 'Contato', hint: 'Abrir um caso', href: '/#contato' },
  { group: 'Seções', label: 'Arquivo de casos', hint: 'Todos os projetos', href: '/casos' },
  { group: 'Seções', label: 'Passa tempo', hint: 'Jogos e experimentos', href: '/passatempo', keywords: `jogos jogo games fliperama ${pastimes.map((p) => p.name).join(' ')}` },
  ...projects.map((p) => ({
    group: 'Casos',
    label: p.name,
    hint: p.kind,
    href: `/casos/${p.slug}`,
    keywords: [...p.highlights, p.summary, p.challenge].join(' '),
  })),
  ...services.map((s) => ({
    group: 'Serviços',
    label: s.name,
    href: `/servicos/${s.slug}`,
    keywords: [
      s.intro,
      ...s.keywords,
      ...s.problems,
      ...s.deliverables.map((d) => `${d.title} ${d.body}`),
      ...s.examples.map((e) => e.name),
      // the stack chips on the service page open this search with one technology (StackChip)
      ...s.stack,
      // the home's capability card for this service: its tags open this search (Capabilities), so each one must find it
      ...(capabilities.find((c) => c.slug === s.slug)?.tags ?? []),
      capabilities.find((c) => c.slug === s.slug)?.lead ?? '',
    ].join(' '),
  })),
  // the answer is searched too: "prazo" finds "Em quanto tempo o primeiro resultado aparece?"
  ...homeFaq.map((f) => ({ group: 'Perguntas', label: f.q, href: `/#${faqId(f.q)}`, keywords: f.a })),
  ...services.flatMap((s) =>
    s.faq.map((f) => ({ group: 'Perguntas', label: f.q, hint: s.name, href: `/servicos/${s.slug}#${faqId(f.q)}`, keywords: f.a })),
  ),
  {
    group: 'Ações',
    label: 'Conversar no WhatsApp',
    hint: site.whatsappDisplay,
    href: whatsappLink('Olá! Vim pelo site da HenaWeb e quero conversar sobre um projeto.'),
    external: true,
  },
  { group: 'Ações', label: 'Mandar um e-mail', hint: site.email, href: `mailto:${site.email}` },
  { group: 'Ações', label: 'Salvar contato no celular', hint: 'henaweb.vcf', href: '/henaweb.vcf', keywords: 'vcard agenda contatos telefone' },
  // the side projects, last: "arena" in the search opens the game itself (new tab), not just the arcade page
  ...pastimes.map((p) => ({
    group: 'Passa tempo',
    label: `${p.action} ${p.name}`,
    hint: p.url.replace('https://', ''),
    href: p.url,
    external: true,
    keywords: p.action === 'Jogar' ? 'jogo jogos games fliperama passa tempo' : 'passa tempo experimento',
  })),
];

// the words visitors type for what the site says another way (folded, no accents); any of them counts as a hit
const SYNONYMS: Record<string, string[]> = {
  preco: ['custa', 'custo', 'investimento', 'orcamento'],
  valor: ['custa', 'custo', 'investimento', 'orcamento'],
  orcamento: ['custa', 'custo', 'investimento'],
  caro: ['custa', 'custo'],
  // not 'tempo': it made "prazo" open with "Passa tempo", the games page
  prazo: ['semanas', 'cronograma'],
  demora: ['semanas', 'prazo'],
  manutencao: ['suporte', 'evolucao', 'monitoramento'],
  suporte: ['manutencao', 'monitoramento'],
  dono: ['fica com', 'propriedade'],
  governo: ['publico', 'prefeitura', 'orgao'],
  site: ['sites', 'pagina', 'landing'],
  app: ['aplicativo', 'mobile', 'celular'],
  aplicativo: ['app', 'mobile'],
  chatbot: ['agente', 'atendimento', 'whatsapp'],
  robo: ['agente', 'automacao', 'automatica'],
  // words people type that the pages say differently (each points only at what the pages already cover)
  inteligencia: [' ia', 'agente'],
  artificial: [' ia', 'agente'],
  excel: ['planilha'],
  planilhas: ['planilha'],
  hospedagem: ['nuvem', 'servidor', 'deploy'],
  servidor: ['nuvem', 'deploy'],
  consulta: ['agendamento', 'horario'],
  marcar: ['agendamento', 'horario'],
  contrato: ['escopo'],
  boleto: ['pagamento', 'financeiro'],
  cobranca: ['pagamento', 'financeiro'],
};

const SEARCHABLE = ITEMS.map((it) => fold(`${it.label} ${it.hint ?? ''} ${it.group} ${it.keywords ?? ''}`));

/** The items a query finds (every word must hit), title matches first, groups kept together. */
function matchItems(query: string): Item[] {
  const words = fold(query).split(/\s+/).filter(Boolean);
  // a dropped last letter forgives gender/number: "custo" finds "custa", "sistemas" finds "sistema"
  const hitOne = (text: string, w: string) => text.includes(w) || (w.length >= 4 && text.includes(w.slice(0, -1)));
  const hit = (text: string, w: string) => hitOne(text, w) || (SYNONYMS[w] ?? []).some((alt) => text.includes(alt));
  const found = ITEMS.map((it, i) => ({ it, i })).filter(({ i }) => words.every((w) => hit(SEARCHABLE[i], w)));
  // what the visitor typed in the title itself ranks above a match buried in keywords
  const inLabel = ({ it }: { it: Item }) => words.every((w) => hit(fold(`${it.label} ${it.hint ?? ''}`), w));
  const groupOrder = [...new Set(ITEMS.map((it) => it.group))];
  return found
    .sort((a, b) => groupOrder.indexOf(a.it.group) - groupOrder.indexOf(b.it.group) || Number(inLabel(b)) - Number(inLabel(a)) || a.i - b.i)
    .map(({ it }) => it)
    .slice(0, 40);
}

// every word the index knows, for "você quis dizer…?" when a typo finds nothing ("dicota", "sheduly", "lgdp")
const VOCAB = [...new Set(SEARCHABLE.join(' ').split(/[^a-z0-9]+/).filter((w) => w.length >= 4))];

/** Edit distance with swapped neighbours counting as one edit ("lgdp" → "lgpd", "ecobrian" → "ecobrain"). */
function typoDistance(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => Array.from({ length: b.length + 1 }, (_, j) => (i ? (j ? 0 : i) : j)));
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  return d[a.length][b.length];
}

/** The query with each unknown word swapped for its closest known one, if that finds something. */
function suggestFor(query: string): string | null {
  const words = fold(query).split(/\s+/).filter(Boolean);
  let changed = false;
  const fixed = words.map((w) => {
    if (w.length < 4 || SEARCHABLE.some((t) => t.includes(w))) return w;
    let best = '';
    let bestD = Infinity;
    for (const v of VOCAB) {
      if (Math.abs(v.length - w.length) > 2) continue;
      const dd = typoDistance(w, v);
      if (dd < bestD) [best, bestD] = [v, dd];
    }
    // roughly one slip every four letters, as the 404's guesses allow
    if (best && bestD <= Math.max(1, Math.floor(w.length / 4))) {
      changed = true;
      return best;
    }
    return w;
  });
  const q = fixed.join(' ');
  return changed && matchItems(q).length ? q : null;
}

/**
 * "Arquivo de pistas": a ⌘K / Ctrl+K search over sections, cases, services, FAQ answers and the
 * contact actions. Built on <dialog> (focus trap, Esc and inert page come from the browser) with
 * the combobox + listbox pattern for screen readers.
 */
export default function CommandPalette({ open, onClose, initialQuery = '' }: { open: boolean; onClose: () => void; initialQuery?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  // cases this visitor already opened (ReadMarks, hena:read), newest first: "pick up where you left off"
  const [recent, setRecent] = useState<Item[]>([]);
  const results = useMemo(() => {
    if (!fold(query).trim()) return [...recent, ...ITEMS.filter((it) => it.group !== 'Perguntas')];
    return matchItems(query);
  }, [query, recent]);
  const suggestion = useMemo(() => (results.length === 0 && query.trim() ? suggestFor(query) : null), [results, query]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery(initialQuery);
      setActive(0);
      try {
        const read: unknown = JSON.parse(localStorage.getItem('hena:read') ?? '[]');
        const slugs = Array.isArray(read) ? read.filter((x): x is string => typeof x === 'string') : [];
        setRecent(
          slugs
            .slice(-3)
            .reverse()
            .map((slug) => ITEMS.find((it) => it.href === `/casos/${slug}`))
            .filter((it): it is Item => !!it)
            .map((it) => ({ ...it, group: 'Visto por você', hint: `${it.hint ?? ''} · ✓ lido`.replace(/^ · /, '') })),
        );
      } catch {}
      d.showModal();
      input.current?.focus();
    } else if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const go = (it: Item | undefined) => {
    if (!it) return;
    list.current?.querySelector<HTMLAnchorElement>(`a[data-index="${results.indexOf(it)}"]`)?.click();
  };

  // no result: carry the search into the contact form's message (same-tab draft) and land in it
  const askUs = (q: string) => {
    const line = `Procurei no site por "${q}" e não achei.`;
    const box = document.getElementById('mensagem') as HTMLTextAreaElement | null;
    onClose();
    if (box) {
      if (!box.value.includes(line)) box.value = [box.value, line].filter(Boolean).join('\n\n');
      box.dispatchEvent(new Event('input', { bubbles: true }));
      if (location.hash === '#mensagem') {
        box.scrollIntoView({ block: 'center' });
        box.focus({ preventScroll: true });
      } else location.hash = 'mensagem';
      return;
    }
    try {
      const d = JSON.parse(sessionStorage.getItem('hena:draft') ?? 'null') ?? { picked: [], timeline: '', fields: {} };
      const msg: string = d.fields?.message ?? '';
      d.fields = { ...d.fields, message: msg.includes(line) ? msg : [msg, line].filter(Boolean).join('\n\n') };
      sessionStorage.setItem('hena:draft', JSON.stringify(d));
    } catch {}
    location.href = '/#mensagem';
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // nothing found but a likely typo: Enter takes the suggestion
      if (!results.length && suggestion) setQuery(suggestion);
      else go(results[active]);
    }
  };

  let lastGroup = '';

  return (
    <dialog
      ref={dialog}
      aria-label="Arquivo de pistas: buscar no site"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      data-print-hide
      className="win m-auto mt-[12vh] w-[min(92vw,38rem)] max-w-none p-0 text-acid-ink backdrop:bg-[#0d0820]/70 backdrop:backdrop-blur-sm"
    >
      <div className="win-bar">
        <span>arquivo_de_pistas.exe</span>
        <WinClose onClick={onClose} label="Fechar busca" className="ml-auto" />
      </div>
      <div className="m-1.5 border-2 border-[#7d7394] bg-paper">
        <div className="flex items-center gap-3 border-b-2 border-[#7d7394] px-4">
          <span aria-hidden className="text-lg">
            🔎
          </span>
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            role="combobox"
            aria-expanded="true"
            aria-controls="pistas"
            aria-activedescendant={results[active] ? `pista-${active}` : undefined}
            aria-autocomplete="list"
            aria-label="Procurar uma pista"
            placeholder="Procurar pista: LGPD, ERP, custo, Diconta…"
            className="h-14 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-acid-ink/60"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        {/* the list also yields to the window's height (minus the top gap and the bar, field and hint row around it):
            on a phone held sideways (844×390) the palette ran 9 px past the screen and the whole window scrolled,
            carrying the search field out of sight with the results */}
        <ul ref={list} id="pistas" role="listbox" aria-label="Resultados" data-lenis-prevent className="scroll-shadows max-h-[min(55vh,26rem,calc(100svh-12vh-9.5rem))] overflow-y-auto overscroll-contain p-2">
          {results.map((it, i) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <li key={it.group + it.href + it.label} role="presentation">
                {header && <div className="label px-3 pt-3 pb-1 !text-acid-ink/75">{header}</div>}
                <a
                  id={`pista-${i}`}
                  role="option"
                  aria-selected={i === active}
                  data-index={i}
                  onMouseMove={() => setActive(i)}
                  href={it.href}
                  tabIndex={-1}
                  data-placement="palette"
                  {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  onClick={onClose}
                  className={`flex items-baseline justify-between gap-4 rounded-md px-3 py-2.5 ${i === active ? 'bg-acid' : ''}`}
                >
                  <span className="font-medium">
                    {it.label}
                    {it.external && (
                      <>
                        <span aria-hidden> ↗</span>
                        <span className="sr-only"> (abre em nova aba)</span>
                      </>
                    )}
                  </span>
                  {it.hint && <span className={`shrink-0 truncate font-mono text-xs ${i === active ? 'text-acid-ink' : 'text-acid-ink/70'}`}>{it.hint}</span>}
                </a>
              </li>
            );
          })}
        </ul>
          {results.length === 0 && (
            <p role="status" className="px-5 pb-6 pt-2 text-center font-mono text-sm text-acid-ink/75">
              {suggestion && (
                <span className="mb-2 block">
                  Você quis dizer{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setQuery(suggestion);
                      input.current?.focus();
                    }}
                    className="font-medium text-acid-ink underline underline-offset-4 hover:decoration-2"
                  >
                    {suggestion}
                  </button>
                  ? <span className="text-acid-ink/60">(Enter)</span>
                </span>
              )}
              Nenhuma pista com esse nome. Tente outra palavra
              {query.trim() && (
                <>
                  {' '}ou{' '}
                  <button type="button" onClick={() => askUs(query.trim())} className="font-medium text-acid-ink underline underline-offset-4 hover:decoration-2">
                    pergunte isso direto pra gente →
                  </button>
                </>
              )}
            </p>
          )}
        <p className="hidden gap-4 border-t-2 border-[#7d7394] px-4 py-2 md:flex font-mono text-[0.68rem] text-acid-ink/75" aria-hidden>
          <span>↑↓ navegar</span>
          <span>Enter abrir</span>
          <span>Esc fechar</span>
        </p>
      </div>
    </dialog>
  );
}
