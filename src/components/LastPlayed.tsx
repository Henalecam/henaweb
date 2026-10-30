'use client';

import { useEffect } from 'react';

const KEY = 'hena:played';

/**
 * /passatempo: the cabinet the visitor launched last remembers them, like an arcade's CONTINUE? screen.
 * Kept in their own browser only (slug + when). The cabinet's attract text swaps via CSS
 * (`li[data-played]`, globals.css) and its link name gains "você abriu por último".
 */
export default function LastPlayed() {
  useEffect(() => {
    const mark = (slug: string | null) => {
      document.querySelectorAll<HTMLElement>('li[data-pastime-slug]').forEach((li) => {
        const a = li.querySelector<HTMLAnchorElement>('a[aria-label]');
        const base = a?.dataset.label ?? a?.getAttribute('aria-label') ?? '';
        if (a && !a.dataset.label) a.dataset.label = base;
        if (li.dataset.pastimeSlug === slug) {
          li.dataset.played = '';
          a?.setAttribute('aria-label', `${base} · você abriu por último`);
        } else {
          delete li.dataset.played;
          a?.setAttribute('aria-label', base);
        }
      });
    };
    try {
      const v = JSON.parse(localStorage.getItem(KEY) ?? 'null');
      if (v && typeof v.slug === 'string') mark(v.slug);
    } catch {}
    // any way the cabinet's link is followed: click, Enter, middle click
    const onOpen = (e: MouseEvent) => {
      if (e.type === 'auxclick' && e.button !== 1) return;
      const li = (e.target as HTMLElement | null)?.closest<HTMLElement>('li[data-pastime-slug]');
      if (!li || !(e.target as HTMLElement).closest('a[target="_blank"]')) return;
      const slug = li.dataset.pastimeSlug!;
      try {
        localStorage.setItem(KEY, JSON.stringify({ slug, at: Date.now() }));
      } catch {}
      mark(slug);
    };
    document.addEventListener('click', onOpen);
    document.addEventListener('auxclick', onOpen);
    return () => {
      document.removeEventListener('click', onOpen);
      document.removeEventListener('auxclick', onOpen);
    };
  }, []);
  return null;
}
