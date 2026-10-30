'use client';

import { useEffect, useState } from 'react';
import { nav, site } from '@/lib/site';
import { projectLinks } from '@/lib/projectLinks';
import { serviceLinks } from '@/lib/serviceLinks';
import { pastimes } from '@/lib/pastimes';


const PLACES = [
  ...projectLinks.map((p) => ({ label: `Caso ${p.name}`, href: `/casos/${p.slug}`, key: p.slug })),
  ...serviceLinks.map((s) => ({ label: s.name, href: `/servicos/${s.slug}`, key: s.slug })),
  ...nav.map((n) => ({ label: n.label, href: n.href, key: n.href.split('#')[1] })),
  { label: 'Casos resolvidos', href: '/casos', key: 'casos' },
  { label: 'Contato', href: '/#contato', key: 'contato' },
  // the arcade and each game's short link (/fortrex → its subdomain): "/fortex" or "/passatemp" still land
  { label: 'Passa tempo', href: '/passatempo', key: 'passatempo' },
  { label: 'Passa tempo', href: '/passatempo', key: 'jogos' },
  ...pastimes.map((p) => ({ label: `${p.action} ${p.name}`, href: `/${p.slug}`, key: p.slug })),
];

/** Edit distance, for "did you mean /casos/diconta?" on mistyped links. */
function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

/**
 * On the 404 page: reads the lost URL, names the closest real page ("Pista mais provável") when the
 * typo is small, and offers the site search.
 */
export default function LostClue() {
  const [guess, setGuess] = useState<{ label: string; href: string } | null>(null);
  // arrived through a link (ours or someone else's): that link is broken, and we'd like to know
  const [report, setReport] = useState<string | null>(null);

  useEffect(() => {
    const words = decodeURIComponent(location.pathname)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .split(/[/_.\s]+/)
      .filter((w) => w.length > 2);
    let best: { label: string; href: string; d: number } | null = null;
    for (const w of words.reverse()) {
      // a piece of a real address also counts ("/casos/next" → next-card, "/servicos/sites" → sites-e-produtos,
      // "contacerta-site" → contacerta), unless it fits two pages equally ("sistemas" → sob medida or públicos?)
      const partial = PLACES.filter(
        (p) => p.key.split('-').includes(w) || (w.length >= 4 && p.key.startsWith(w)) || (p.key.length >= 4 && w.startsWith(p.key)),
      );
      const partialHrefs = new Set(partial.map((p) => p.href));
      for (const p of PLACES) {
        let d = distance(w, p.key);
        if (partialHrefs.size === 1 && partial.includes(p)) d = Math.min(d, 0.5);
        // tolerate roughly one typo every four letters
        if (d <= Math.max(1, Math.floor(p.key.length / 4)) && (!best || d < best.d)) best = { ...p, d };
      }
      if (best) break;
    }
    setGuess(best);
    if (document.referrer) {
      const body = `Encontrei um link quebrado.\n\nEndereço: ${location.href}\nCheguei a partir de: ${document.referrer}`;
      setReport(`mailto:${site.email}?subject=${encodeURIComponent('Link quebrado no site')}&body=${encodeURIComponent(body)}`);
    }
  }, []);

  return (
    <div className="mt-8 flex flex-col gap-3">
      {guess && (
        <p className="toon-sm self-start rounded-xl bg-lemon px-5 py-3 text-acid-ink">
          <span className="label mr-2 !text-acid-ink/70">Pista mais provável</span>
          <a href={guess.href} className="font-medium underline underline-offset-4">
            {guess.label} →
          </a>
        </p>
      )}
      <button
        type="button"
        data-print-hide
        onClick={() => window.dispatchEvent(new Event('hena:search'))}
        className="label flex min-h-11 items-center gap-2 self-start !text-ink underline underline-offset-4 hover:!text-acid"
      >
        <span aria-hidden>🔎</span> Procurar no arquivo de casos
      </button>
      {report && (
        <a href={report} className="label flex min-h-11 items-center gap-2 self-start !text-ink/75 underline underline-offset-4 hover:!text-ink">
          <span aria-hidden>✉</span> Avisar a gente sobre este link quebrado
        </a>
      )}
    </div>
  );
}
