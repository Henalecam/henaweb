'use client';

import { useEffect, useState } from 'react';

/* the preferences the site listens to (globals.css and the components named in /acessibilidade), read live */
const PREFS: { q: string; label: string; on: string; off: string }[] = [
  { q: '(prefers-reduced-motion: reduce)', label: 'Reduzir movimento', on: 'ligado: animações paradas, sem sons', off: 'desligado: animações normais' },
  { q: '(prefers-contrast: more)', label: 'Mais contraste', on: 'ligado: sublinhados sólidos, sem texturas', off: 'desligado' },
  { q: '(forced-colors: active)', label: 'Alto contraste do sistema', on: 'ligado: o site usa as cores do sistema', off: 'desligado' },
  { q: '(prefers-reduced-transparency: reduce)', label: 'Menos transparência', on: 'ligado: sublinhados sólidos, sem texturas', off: 'desligado' },
  { q: '(pointer: coarse)', label: 'Tela de toque', on: 'sim: gestos de deslizar (casos, menu)', off: 'não: mouse ou trackpad' },
];

/**
 * /acessibilidade: "painel_de_controle.exe", what this browser is asking the site for right now. Each line is a
 * media query the site already honours; the lamps change live when the setting is flipped in the system, so the
 * statement above is something you can watch working. Read-only, nothing stored or sent. Hidden on paper.
 */
export default function YourSettings() {
  const [state, setState] = useState<boolean[] | null>(null);

  useEffect(() => {
    const mqs = PREFS.map((p) => window.matchMedia(p.q));
    const read = () => setState(mqs.map((m) => m.matches));
    read();
    mqs.forEach((m) => m.addEventListener('change', read));
    return () => mqs.forEach((m) => m.removeEventListener('change', read));
  }, []);

  return (
    <section aria-labelledby="painel-titulo" className="win mt-12 print:hidden">
      <div className="win-bar">
        <span aria-hidden>painel_de_controle.exe</span>
      </div>
      <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-4 text-acid-ink">
        <h2 id="painel-titulo" className="font-medium">
          O que o seu navegador está pedindo agora
        </h2>
        <p className="mt-1 text-sm text-acid-ink/75">Mude a configuração no sistema e veja a luz acompanhar.</p>
        <ul className="mt-4 divide-y divide-acid-ink/15">
          {PREFS.map((p, i) => {
            const on = state?.[i];
            return (
              <li key={p.q} className="flex items-center gap-3 py-2.5">
                <span aria-hidden className="settings-lamp" data-on={on ? '' : undefined} data-unknown={state ? undefined : ''} />
                <span className="font-medium">{p.label}</span>
                <span className="ml-auto text-right font-mono text-xs text-acid-ink/75">
                  {state ? (on ? p.on : p.off) : '…'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
