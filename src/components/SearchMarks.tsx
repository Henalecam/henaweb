'use client';

import { useEffect, useRef, useState } from 'react';

const NAME = 'hena-busca';
const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Ranges over every occurrence of the words in the page's main text (folded: "lgpd" finds "LGPD",
 * "integracao" finds "integração"). A word of five letters or more also matches without its last letter,
 * so a plural still finds its singular. */
function find(words: string[]) {
  const main = document.getElementById('conteudo');
  if (!main) return [];
  const stems = words.map((w) => (w.length >= 5 ? w.slice(0, -1) : w));
  const walk = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentElement?.closest('script, style, textarea, input, [aria-hidden="true"], [hidden], .sr-only') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const ranges: Range[] = [];
  for (let n = walk.nextNode(); n && ranges.length < 80; n = walk.nextNode()) {
    const text = n.nodeValue ?? '';
    // one UTF-16 unit at a time, so each folded index is still an offset into the node
    const folded = text
      .split('')
      .map((ch) => fold(ch)[0] ?? ch)
      .join('');
    for (const w of stems)
      for (let at = folded.indexOf(w); at >= 0; at = folded.indexOf(w, at + w.length)) {
        // the mark runs to the end of the word: "auditori" (the stem) marks all of "auditoria"
        let end = at + w.length;
        while (end < folded.length && /[a-z0-9]/.test(folded[end])) end++;
        const r = new Range();
        r.setStart(n, at);
        r.setEnd(n, end);
        ranges.push(r);
      }
  }
  // in reading order, for "próxima"
  return ranges.sort((a, b) => a.compareBoundaryPoints(Range.START_TO_START, b));
}

/**
 * A highlighter pen for the search: the words typed in the search (⌘K) stay marked on the page its result
 * opened, with the CSS Custom Highlight API (no change to the DOM). A small tag under the header counts them,
 * steps through them, and wipes them (also Esc). Browsers without the API simply show the page unmarked.
 */
export default function SearchMarks() {
  const [marks, setMarks] = useState<{ words: string[]; n: number } | null>(null);
  const ranges = useRef<Range[]>([]);
  const at = useRef(-1);

  useEffect(() => {
    if (!('highlights' in CSS)) return;
    const clear = () => {
      CSS.highlights.delete(NAME);
      CSS.highlights.delete(`${NAME}-atual`);
      ranges.current = [];
      at.current = -1;
      setMarks(null);
    };
    const apply = (words: string[]) => {
      const rs = find(words);
      if (!rs.length) return clear();
      ranges.current = rs;
      at.current = -1;
      CSS.highlights.set(NAME, new Highlight(...rs));
      setMarks({ words, n: rs.length });
    };
    try {
      const saved = JSON.parse(sessionStorage.getItem('hena:marks') ?? 'null');
      sessionStorage.removeItem('hena:marks');
      // only for the page the result opened, right after: not a later visit in the same tab
      if (saved && Date.now() - saved.at < 15000) setTimeout(() => apply(saved.words), 400);
    } catch {}
    // a section of this same page: wait for the palette to close and the glide to start
    const onMarks = (e: Event) => setTimeout(() => apply((e as CustomEvent<string[]>).detail), 300);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && CSS.highlights.has(NAME) && !document.querySelector('[role="dialog"][aria-modal="true"]')) clear();
    };
    window.addEventListener('hena:marks', onMarks);
    window.addEventListener('hena:marks-clear', clear);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hena:marks', onMarks);
      window.removeEventListener('hena:marks-clear', clear);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!marks) return null;

  const next = () => {
    const rs = ranges.current;
    if (!rs.length) return;
    at.current = (at.current + 1) % rs.length;
    const el = rs[at.current].startContainer.parentElement;
    el?.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    // the current one in a stronger ink
    CSS.highlights.set(`${NAME}-atual`, new Highlight(rs[at.current]));
  };
  const wipe = () => {
    window.dispatchEvent(new Event('hena:marks-clear'));
  };

  return (
    <div
      data-print-hide
      className="toon-sm fixed top-[5.25rem] left-1/2 z-[54] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-1 rounded-full bg-lemon py-1 pr-1 pl-3.5 font-mono text-xs text-acid-ink"
    >
      <span aria-hidden>🖍</span>
      <span role="status" className="truncate px-1">
        “{marks.words[0]}” marcado {marks.n}×
      </span>
      <button type="button" onClick={next} className="min-h-8 shrink-0 rounded-full px-2.5 underline underline-offset-2 hover:bg-acid-ink/10">
        próxima ↓
      </button>
      <button type="button" onClick={wipe} aria-label="Apagar as marcas da busca" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-acid-ink/10">
        ×
      </button>
    </div>
  );
}
