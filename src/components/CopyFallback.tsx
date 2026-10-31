'use client';

import { useEffect, useRef, useState } from 'react';
import { COPY_FAILED } from '@/lib/clipboard';
import WinClose from './WinClose';

/**
 * Site-wide safety net for every "copy" button (section links, FAQ links, share, game short links): when the
 * browser lets neither clipboard route work (locked-down webviews, some in-app browsers), a small Win95 window
 * pops up with the text already selected in a read-only field, so Ctrl+C (or the phone's "Copy") finishes the
 * job. Focus goes into the field and comes back to the button on close (×, Escape or 12 s later).
 */
export default function CopyFallback() {
  const [text, setText] = useState('');
  const field = useRef<HTMLInputElement>(null);
  const back = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const on = (e: Event) => {
      back.current = document.activeElement as HTMLElement | null;
      setText((e as CustomEvent<string>).detail);
    };
    window.addEventListener(COPY_FAILED, on);
    return () => window.removeEventListener(COPY_FAILED, on);
  }, []);

  useEffect(() => {
    if (!text) return;
    field.current?.focus();
    field.current?.select();
    const id = window.setTimeout(() => close(false), 12000);
    return () => window.clearTimeout(id);
  }, [text]);

  const close = (restore = true) => {
    setText('');
    if (restore) back.current?.focus();
  };

  if (!text) return null;
  return (
    <div
      role="dialog"
      aria-label="Copiar à mão"
      data-copy-fallback
      data-print-hide
      onKeyDown={(e) => e.key === 'Escape' && close()}
      className="win fixed bottom-4 left-1/2 z-[80] w-[min(calc(100vw-2rem),26rem)] -translate-x-1/2 text-acid-ink"
    >
      <div className="win-bar">
        <span aria-hidden>área_de_transferência.exe</span>
        <WinClose onClick={() => close()} label="Fechar" className="ml-auto" />
      </div>
      <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-3">
        <p className="text-sm" aria-live="polite">
          Este navegador não deixou copiar sozinho. O texto já está selecionado: é só copiar.
        </p>
        <input
          ref={field}
          readOnly
          value={text}
          aria-label="Texto para copiar"
          onFocus={(e) => e.currentTarget.select()}
          className="mt-2 w-full border-2 border-[#7d7394] bg-white px-2 py-1.5 font-mono text-xs"
        />
      </div>
    </div>
  );
}
