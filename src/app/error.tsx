'use client';

import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/site';
import NewTab from '@/components/NewTab';

/**
 * When a page breaks while rendering, Next showed its own bare screen, in English ("This page couldn’t load"). This keeps the visitor
 * inside the site: the same crime-scene tape as the 404, a Win95 error window, a retry that re-renders the segment
 * (reset) and a way to tell us, with the error's digest so we can find it in the logs.
 */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [path, setPath] = useState('');
  useEffect(() => {
    console.error(error);
    setPath(location.pathname);
  }, [error]);

  const code = error.digest ? `código ${error.digest}` : '';
  const report = whatsappLink(
    `Olá! Uma página do site da HenaWeb deu erro${path ? ` (${path})` : ''}${code ? `, ${code}` : ''}. Dá uma olhada?`,
  );

  return (
    <main id="conteudo" tabIndex={-1} className="sky relative flex min-h-[100svh] items-center overflow-hidden text-ink">
      <div className="grid-floor !h-[32%] opacity-60" aria-hidden />
      <div
        aria-hidden
        className="tape absolute top-24 -left-10 w-[130%] -rotate-[2deg] py-1.5 font-mono text-xs font-bold tracking-[0.25em] whitespace-nowrap uppercase"
      >
        {'Sistema em perícia · não ultrapasse · '.repeat(12)}
      </div>
      <div className="gutter relative mx-auto w-full max-w-5xl py-32">
        <div className="win max-w-md" data-error-window>
          <div className="win-bar">
            <span aria-hidden>ERRO_FATAL.exe</span>
            <span className="ml-auto flex gap-1" aria-hidden>
              <span className="win-btn">_</span>
              <span className="win-btn">×</span>
            </span>
          </div>
          <div className="m-1.5 flex gap-4 border-2 border-[#7d7394] bg-paper p-5 text-acid-ink">
            <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#b3122b] text-xl font-bold text-paper">
              ✕
            </span>
            <div className="text-sm leading-relaxed">
              <p>Esta página executou uma operação ilegal e será fechada.</p>
              <p className="mt-1 text-acid-ink/75">Brincadeira: nada se perdeu. Foi um tropeço nosso, não seu.</p>
              {code && <p className="mt-2 font-mono text-[0.7rem] text-acid-ink/75">{code}</p>}
            </div>
          </div>
        </div>

        <p className="label mt-12 !text-teal">Erro · Arquivo de casos</p>
        <h1 className="mt-4 text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-medium tracking-[-0.05em]">
          O sistema{' '}
          <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:5px_5px_0_#140a26]">tropeçou.</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
          Algo quebrou ao montar esta página. Tentar de novo costuma resolver; se não resolver, avise a gente que
          investigamos.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="toon-sm toon-press rounded-full bg-acid px-5 py-2.5 font-medium text-acid-ink">
            Tentar de novo ↻
          </button>
          <a href="/" className="toon-sm toon-press inline-block rounded-full bg-paper px-5 py-2.5 font-medium text-acid-ink">
            Página inicial →
          </a>
          <a
            href={report}
            target="_blank"
            rel="noopener noreferrer"
            data-placement="error"
            className="toon-sm toon-press inline-block rounded-full bg-cyan px-5 py-2.5 font-medium text-acid-ink"
          >
            Avisar pelo WhatsApp
            <NewTab />
          </a>
        </div>
      </div>
    </main>
  );
}
