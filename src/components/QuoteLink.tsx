'use client';

import { useEffect, useRef, useState } from 'react';
import { copyText } from '@/lib/clipboard';

type Spot = { x: number; y: number; text: string };

/** "#:~:text=" escapes: the fragment syntax reserves - , & on top of the usual URL characters. */
const enc = (s: string) => encodeURIComponent(s).replace(/-/g, '%2D').replace(/,/g, '%2C').replace(/&/g, '%26');

/** A short passage goes whole; a long one as "first words,last words" so the link stays readable. */
export function fragmentFor(text: string) {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  if (words.length <= 10) return `#:~:text=${enc(words.join(' '))}`;
  return `#:~:text=${enc(words.slice(0, 4).join(' '))},${enc(words.slice(-4).join(' '))}`;
}

/**
 * Select a passage anywhere in the page's text and a small tag offers "copiar link do trecho": a URL with a
 * text fragment, so whoever opens it lands scrolled to that very sentence with it highlighted (styled by
 * ::target-text in globals.css). Desktop pointers only: on phones the system's own selection menu sits there.
 * Leaves forms, links, buttons and the Studio's read-only files (they have their own selection joke) alone.
 */
export default function QuoteLink() {
  const [spot, setSpot] = useState<Spot | null>(null);
  const [done, setDone] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return;
    const read = () => {
      const s = window.getSelection();
      if (!s || s.isCollapsed || !s.rangeCount) return setSpot(null);
      // a fragment only matches whole words: drop a word the drag cut in half at either end
      const range = s.getRangeAt(0);
      const letter = /[\p{L}\p{N}]/u;
      const at = (n: Node, i: number) => (n.nodeType === Node.TEXT_NODE ? (n.textContent ?? '')[i] ?? '' : '');
      let words = s.toString().replace(/\s+/g, ' ').trim().split(' ');
      if (letter.test(at(range.startContainer, range.startOffset - 1))) words = words.slice(1);
      if (letter.test(at(range.endContainer, range.endOffset))) words = words.slice(0, -1);
      const text = words.join(' ');
      const node = s.anchorNode?.parentElement;
      if (
        text.length < 12 ||
        text.length > 600 ||
        !node?.closest('main') ||
        node.closest('input, textarea, select, button, a, [contenteditable], [data-rule-body], dialog, [aria-hidden="true"]')
      )
        return setSpot(null);
      const r = range.getBoundingClientRect();
      if (!r.width) return setSpot(null);
      setDone(false);
      setSpot({ x: Math.min(innerWidth - 120, Math.max(120, r.left + r.width / 2)), y: r.top, text });
    };
    // wait for the drag to end (or the shift+arrow keys to settle) instead of chasing every selectionchange
    const later = (e: Event) => {
      // the tag's own click ends in a mouseup too: that one mustn't re-read (and reset "copiado")
      if ((e.target as Element | null)?.closest?.('[data-quote-link]')) return;
      clearTimeout(timer.current);
      timer.current = window.setTimeout(read, 180);
    };
    const onChange = () => {
      const s = window.getSelection();
      if (!s || s.isCollapsed) {
        clearTimeout(timer.current);
        setSpot(null);
      }
    };
    const hide = () => setSpot(null);
    document.addEventListener('mouseup', later);
    document.addEventListener('keyup', later);
    document.addEventListener('selectionchange', onChange);
    addEventListener('scroll', hide, { passive: true });
    addEventListener('resize', hide);
    return () => {
      clearTimeout(timer.current);
      document.removeEventListener('mouseup', later);
      document.removeEventListener('keyup', later);
      document.removeEventListener('selectionchange', onChange);
      removeEventListener('scroll', hide);
      removeEventListener('resize', hide);
    };
  }, []);

  if (!spot) return null;
  const copy = async () => {
    const ok = await copyText(location.origin + location.pathname + fragmentFor(spot.text));
    if (!ok) return setSpot(null);
    setDone(true);
    setTimeout(() => setSpot(null), 1300);
  };
  const below = spot.y < 64;
  return (
    <button
      type="button"
      data-quote-link
      // keep the selection: a mousedown on a button would otherwise collapse it before the click lands
      onMouseDown={(e) => e.preventDefault()}
      onClick={copy}
      className="quote-pop fixed z-[60] -translate-x-1/2 rounded-full border-2 border-acid-ink bg-lemon px-3 py-1.5 font-mono text-xs font-medium whitespace-nowrap text-acid-ink shadow-[3px_3px_0_var(--color-acid-ink)] hover:bg-acid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acid"
      style={{ left: spot.x, top: below ? spot.y + 28 : spot.y - 44 }}
    >
      <span role="status">{done ? '✓ link copiado' : '🔗 copiar link do trecho'}</span>
    </button>
  );
}
