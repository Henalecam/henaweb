'use client';

import { useEffect, useState } from 'react';

/** Museum-label caption for the halftone David. Shows the live dot count of the render. */
export default function Placard({ className = '' }: { className?: string }) {
  const [dots, setDots] = useState<number | null>(null);

  useEffect(() => {
    const on = (e: Event) => setDots((e as CustomEvent<number>).detail);
    window.addEventListener('hena:dots', on);
    return () => window.removeEventListener('hena:dots', on);
  }, []);

  return (
    <figure className={`win w-[min(100%,300px)] text-left ${className}`}>
      <div className="win-bar">
        <span>detetive.exe</span>
        <span className="win-btn ml-auto" aria-hidden>
          ×
        </span>
      </div>
      <div className="m-1 border-2 border-[#7d7394] bg-paper px-3 py-2 text-acid-ink">
        <span className="label block !text-[#c2410c]">Nº I · O Detetive</span>
        <span className="serif block text-lg leading-tight">Mármore, autor anônimo, séc. XXI</span>
        <span className="mt-0.5 block font-mono text-[0.62rem] text-acid-ink/70 uppercase">
          Mármore → {dots ? dots.toLocaleString('pt-BR') : '...'} pontos de luz
        </span>
      </div>
    </figure>
  );
}
