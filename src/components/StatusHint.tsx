'use client';

import { useEffect, useRef, useState } from 'react';

/** Where a link goes, the way a 95 browser's status bar spelled it: no protocol, mail and phone named. */
function where(a: HTMLAnchorElement) {
  const href = a.getAttribute('href') ?? '';
  if (href.startsWith('mailto:')) return `e-mail para ${href.slice(7).split('?')[0]}`;
  if (href.startsWith('tel:')) return `ligar para ${href.slice(4)}`;
  const u = new URL(a.href);
  const host = u.host === location.host ? 'henaweb.com' : u.host.replace(/^www\./, '');
  // "henaweb.com/#contato", but a bare "instagram.com/henaweb"
  const path = u.pathname === '/' ? (u.hash ? '/' : '') : u.pathname.replace(/\/$/, '');
  return `${a.target === '_blank' ? '↗ ' : ''}${host}${path}${u.hash}`;
}

/**
 * The right pane of a window's status bar (.win-status): at rest it names the page, and while a link inside the
 * same window is pointed at or focused it shows where that link goes ("wa.me/55…", "henaweb.com/casos"), like the
 * status bar of a 95 browser. Decorative (the bar is aria-hidden): each link already says what it does.
 */
export default function StatusHint({ rest }: { rest: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(rest);

  useEffect(() => {
    const win = ref.current?.closest('.win');
    if (!win) return;
    let focused: HTMLAnchorElement | null = null;
    const show = (e: Event) => {
      const a = (e.target as Element).closest?.('a[href]');
      if (a instanceof HTMLAnchorElement) setText(where(a));
    };
    const onFocus = (e: FocusEvent) => {
      focused = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
      show(e);
    };
    // leaving a link falls back to the focused one (keyboard), else to the page's own address
    const back = () => setText(focused ? where(focused) : rest);
    const onBlur = () => {
      focused = null;
      back();
    };
    const onOut = (e: PointerEvent) => {
      if (!(e.relatedTarget as Element | null)?.closest?.('a[href]')) back();
    };
    win.addEventListener('pointerover', show);
    win.addEventListener('pointerout', onOut as EventListener);
    win.addEventListener('focusin', onFocus as EventListener);
    win.addEventListener('focusout', onBlur);
    return () => {
      win.removeEventListener('pointerover', show);
      win.removeEventListener('pointerout', onOut as EventListener);
      win.removeEventListener('focusin', onFocus as EventListener);
      win.removeEventListener('focusout', onBlur);
    };
  }, [rest]);

  return (
    <span ref={ref} className="max-w-[60%] truncate">
      {text}
    </span>
  );
}
