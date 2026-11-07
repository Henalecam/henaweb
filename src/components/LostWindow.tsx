'use client';

import { useRef, useState, type ReactNode } from 'react';
import WinClose from './WinClose';

const replies = [
  'Não dá pra fechar: o caso continua aberto. As pistas estão logo abaixo ↓',
  'Fechar o erro não traz a página de volta. Mas a página inicial existe ↓',
  'Insistente, hein? Detetive bom é assim. Conte pra gente o que procurava ↓',
];

/**
 * The ERRO_404.exe window. Its × used to be decoration; now it can be pressed and, like any good
 * mystery, the error refuses to close: the window shakes (not under reduced motion) and answers in a
 * line of its own, pointing to the clues below. The reply is a live region, so screen readers hear it.
 */
export default function LostWindow({ children }: { children: ReactNode }) {
  const [n, setN] = useState(0);
  const win = useRef<HTMLDivElement>(null);

  const press = () => {
    setN((x) => x + 1);
    const el = win.current;
    if (!el) return;
    el.removeAttribute('data-shake');
    void el.offsetWidth; // restart the shake on every press
    el.setAttribute('data-shake', '');
  };

  return (
    <div ref={win} className="win max-w-xl" onAnimationEnd={() => win.current?.removeAttribute('data-shake')}>
      <div className="win-bar">
        <span>ERRO_404.exe</span>
        <WinClose onClick={press} label="Fechar a janela de erro" className="ml-auto" />
      </div>
      <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-6 font-mono text-sm text-acid-ink">
        {children}
        <p role="status" className="mt-3 border-t empty:mt-0 empty:border-0 empty:pt-0 border-dashed border-acid-ink/30 pt-3 font-medium text-[#c2410c]">
          {n > 0 ? replies[(n - 1) % replies.length] : ''}
        </p>
      </div>
    </div>
  );
}
