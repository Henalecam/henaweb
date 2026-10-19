'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { homeFaq, nav, projects, site, whatsappLink } from '@/lib/content';
import { services } from '@/lib/services';
import { faqId } from '@/lib/slug';

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
    keywords: [s.intro, ...s.keywords, ...s.problems, ...s.deliverables.map((d) => `${d.title} ${d.body}`), ...s.examples.map((e) => e.name)].join(' '),
  })),
  ...homeFaq.map((f) => ({ group: 'Perguntas', label: f.q, href: `/#${faqId(f.q)}` })),
  ...services.flatMap((s) =>
    s.faq.map((f) => ({ group: 'Perguntas', label: f.q, hint: s.name, href: `/servicos/${s.slug}#${faqId(f.q)}` })),
  ),
  {
    group: 'Ações',
    label: 'Conversar no WhatsApp',
    hint: site.whatsappDisplay,
    href: whatsappLink('Olá! Vim pelo site da HenaWeb e quero conversar sobre um projeto.'),
    external: true,
  },
  { group: 'Ações', label: 'Mandar um e-mail', hint: site.email, href: `mailto:${site.email}` },
];

const SEARCHABLE = ITEMS.map((it) => fold(`${it.label} ${it.hint ?? ''} ${it.group} ${it.keywords ?? ''}`));

/**
 * "Arquivo de pistas": a ⌘K / Ctrl+K search over sections, cases, services, FAQ answers and the
 * contact actions. Built on <dialog> (focus trap, Esc and inert page come from the browser) with
 * the combobox + listbox pattern for screen readers.
 */
export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const words = fold(query).split(/\s+/).filter(Boolean);
    if (!words.length) return ITEMS.filter((it) => it.group !== 'Perguntas');
    // a dropped last letter forgives gender/number: "custo" finds "custa", "sistemas" finds "sistema"
    const hit = (text: string, w: string) => text.includes(w) || (w.length >= 4 && text.includes(w.slice(0, -1)));
    const found = ITEMS.map((it, i) => ({ it, i })).filter(({ i }) => words.every((w) => hit(SEARCHABLE[i], w)));
    // what the visitor typed in the title itself ranks above a match buried in keywords; groups stay together
    const inLabel = ({ it }: { it: Item }) => words.every((w) => hit(fold(`${it.label} ${it.hint ?? ''}`), w));
    const groupOrder = [...new Set(ITEMS.map((it) => it.group))];
    return found
      .sort((a, b) => groupOrder.indexOf(a.it.group) - groupOrder.indexOf(b.it.group) || Number(inLabel(b)) - Number(inLabel(a)) || a.i - b.i)
      .map(({ it }) => it)
      .slice(0, 40);
  }, [query]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      setQuery('');
      setActive(0);
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

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active]);
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
        <button type="button" onClick={onClose} className="win-btn ml-auto" aria-label="Fechar busca">
          ×
        </button>
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
        <ul ref={list} id="pistas" role="listbox" aria-label="Resultados" data-lenis-prevent className="max-h-[min(55vh,26rem)] overflow-y-auto overscroll-contain p-2">
          {results.length === 0 && <li className="px-3 py-6 text-center font-mono text-sm text-acid-ink/75">Nenhuma pista com esse nome. Tente outra palavra.</li>}
          {results.map((it, i) => {
            const header = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <li key={it.href + it.label} role="presentation">
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
                  <span className="font-medium">{it.label}</span>
                  {it.hint && <span className={`shrink-0 truncate font-mono text-xs ${i === active ? 'text-acid-ink' : 'text-acid-ink/70'}`}>{it.hint}</span>}
                </a>
              </li>
            );
          })}
        </ul>
        <p className="hidden gap-4 border-t-2 border-[#7d7394] px-4 py-2 md:flex font-mono text-[0.68rem] text-acid-ink/75" aria-hidden>
          <span>↑↓ navegar</span>
          <span>Enter abrir</span>
          <span>Esc fechar</span>
        </p>
      </div>
    </dialog>
  );
}
