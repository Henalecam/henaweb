'use client';

import { useEffect } from 'react';

/** The file name a dragged link becomes: cases and services as shortcut files, other sites by host. */
export function fileNameFor(href: string): string {
  try {
    const u = new URL(href, location.href);
    if (u.origin !== location.origin) return `${u.hostname.replace(/^www\./, '')}.url`;
    const [kind, slug] = u.pathname.split('/').filter(Boolean);
    if (kind === 'casos' && slug) return `caso_${slug}.lnk`;
    if (kind === 'servicos' && slug) return `servico_${slug}.lnk`;
    if (kind) return `${kind}.lnk`;
    return u.hash ? `henaweb_${u.hash.slice(1)}.lnk` : 'henaweb.lnk';
  } catch {
    return 'pista.lnk';
  }
}

/**
 * Dragging a link (to the bookmarks bar, another tab, the desktop) carries a Win95 file instead of the
 * browser's grey URL slab: a dog-eared page icon with the link as a shortcut file ("caso_diconta.lnk"),
 * in keeping with the site's .exe windows. Only the picture changes; the dropped URL is the browser's own.
 */
export default function DragFile() {
  useEffect(() => {
    const onDrag = (e: DragEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || !e.dataTransfer || a.closest('[data-no-dragfile]')) return;
      const ghost = document.createElement('div');
      ghost.setAttribute('aria-hidden', 'true');
      ghost.className = 'drag-file';
      ghost.innerHTML =
        '<svg viewBox="0 0 32 40" width="32" height="40"><path d="M2 2h20l8 8v28H2z" fill="#fdf3e1" stroke="#140a26" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 2v8h8" fill="#c9c3d8" stroke="#140a26" stroke-width="2.5" stroke-linejoin="round"/><path d="M7 17h16M7 23h16M7 29h10" stroke="#f7931e" stroke-width="2.5" stroke-linecap="round"/><path d="M3 31h9v7H3z" fill="#fff" stroke="#140a26" stroke-width="1.5"/><path d="M5 36l5-4M7 32h3v3" fill="none" stroke="#140a26" stroke-width="1.4"/></svg>';
      const label = document.createElement('span');
      label.textContent = fileNameFor(a.href);
      ghost.append(label);
      document.body.append(ghost);
      // held by the middle of the icon, like a file picked up on a desktop
      e.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, 20);
      // the browser has taken its picture by the next task; the node can go
      setTimeout(() => ghost.remove(), 0);
    };
    document.addEventListener('dragstart', onDrag);
    return () => document.removeEventListener('dragstart', onDrag);
  }, []);
  return null;
}
