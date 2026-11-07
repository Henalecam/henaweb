'use client';

import { useEffect, useRef, useState } from 'react';
import WinClose from './WinClose';

/**
 * Museum-label caption for the halftone David. Shows the live dot count of the render.
 * Its × works: the window minimizes into a small "detetive.exe" task button in its corner, which brings it back.
 * The window keeps its space while minimized (visibility only), so the clock under it doesn't jump.
 */
export default function Placard({ className = '' }: { className?: string }) {
  const [dots, setDots] = useState<number | null>(null);
  const [open, setOpen] = useState(true);
  const toggled = useRef(false);
  const reopen = useRef<HTMLButtonElement>(null);
  const win = useRef<HTMLElement>(null);

  // keyboard focus follows the window: to the task button when it minimizes, back to the × when it returns
  useEffect(() => {
    if (!toggled.current) return;
    if (open) win.current?.querySelector<HTMLButtonElement>('button')?.focus();
    else reopen.current?.focus();
  }, [open]);
  const toggle = (v: boolean) => {
    toggled.current = true;
    setOpen(v);
  };

  useEffect(() => {
    const on = (e: Event) => setDots((e as CustomEvent<number>).detail);
    window.addEventListener('hena:dots', on);
    return () => window.removeEventListener('hena:dots', on);
  }, []);

  return (
    <div className={`relative w-[min(100%,300px)] ${className}`}>
      <figure ref={win} data-placard={open ? 'open' : 'min'} className="win w-full text-left">
        <div className="win-bar">
          <span>detetive.exe</span>
          <WinClose onClick={() => toggle(false)} label="Minimizar a legenda do detetive" className="ml-auto" />
        </div>
        <div className="m-1 border-2 border-[#7d7394] bg-paper px-3 py-2 text-acid-ink">
          <span className="label block !text-[#c2410c]">Nº I · O Detetive</span>
          <span className="serif block text-lg leading-tight">Mármore, autor anônimo, séc. XXI</span>
          <span className="mt-0.5 block font-mono text-[0.62rem] text-acid-ink/70 uppercase">
            {dots === -1
              ? 'Mármore em repouso · economia de dados'
              : dots === -2
                ? 'Mármore em repouso · sem conexão'
                : dots === 0
                ? 'Mármore em repouso · sem 3D neste navegador'
                : `Mármore → ${dots ? dots.toLocaleString('pt-BR') : '...'} pontos de luz`}
          </span>
        </div>
      </figure>
      {!open && (
        <button
          ref={reopen}
          type="button"
          onClick={() => toggle(true)}
          data-placard-task
          className="absolute right-0 bottom-0 flex min-h-8 items-center gap-2 border-2 border-toon bg-[#c9c3d8] px-2.5 font-mono text-[0.7rem] text-acid-ink shadow-[inset_-2px_-2px_0_#7d7394,inset_2px_2px_0_#fff,3px_3px_0_#12082a]"
        >
          <span aria-hidden className="inline-block h-2.5 w-3 border border-acid-ink/70 bg-gradient-to-r from-[#f7931e] via-[#8b5cc7] to-[#3cc6b4]" />
          detetive.exe
          <span className="sr-only">: reabrir a legenda</span>
        </button>
      )}
    </div>
  );
}
