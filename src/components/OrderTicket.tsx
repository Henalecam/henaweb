'use client';

import { useEffect, useState } from 'react';
import { process } from '@/lib/content';

const INK = '#140a26';

/** Thin/thick bars from a fixed pattern, so the barcode is stable between renders. */
const BARS = '3121141213221131241112232113121142131221'.split('').map(Number);

function Barcode() {
  let x = 0;
  const rects = BARS.map((w, i) => {
    const r = i % 2 === 0 ? <rect key={i} x={x} y={0} width={w} height={34} fill={INK} /> : null;
    x += w;
    return r;
  });
  return (
    <svg viewBox={`0 0 ${x} 34`} preserveAspectRatio="none" className="h-9 w-full" aria-hidden>
      {rects}
    </svg>
  );
}

/** Zigzag torn edge in the receipt paper color. */
function Torn({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={`h-3 w-full ${flip ? 'rotate-180' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #fffdf6 33%, transparent 33%) 0 0 / 14px 14px, linear-gradient(225deg, #fffdf6 33%, transparent 33%) 0 0 / 14px 14px',
      }}
    />
  );
}

/**
 * The diner order slip: thermal paper hanging from the counter's order clip,
 * one line per step (the "price" is the time it takes), ingredients as modifiers.
 */
export default function OrderTicket() {
  const [stamp, setStamp] = useState({ date: '--/--/----', time: '--:--' });

  useEffect(() => {
    const now = new Date();
    setStamp({
      date: now.toLocaleDateString('pt-BR'),
      time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    });
  }, []);

  return (
    <div className="relative z-20 mx-auto w-full max-w-sm pt-10">
      {/* order wheel clip */}
      <div aria-hidden className="absolute top-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center">
        <div className="toon-sm h-5 w-40 rounded-full bg-[#d8d2c4]" />
        <div className="-mt-1 h-7 w-16 rounded-b-xl border-[3px] border-t-0 border-toon bg-[#8b5cc7]" />
      </div>

      <div data-ticket className="relative rotate-[1.5deg] [filter:drop-shadow(6px_6px_0_#140a26)]">
        <div className="bg-[#fffdf6] px-6 pt-8 pb-5 font-mono text-[0.8rem] leading-relaxed text-acid-ink">
          {/* coffee cup ring */}
          <div aria-hidden className="pointer-events-none absolute top-[38%] right-3 h-24 w-24 rounded-full border-[5px] border-[#a8743f]/20" />

          <p className="font-groovy text-center text-3xl text-[#c2410c]">Lanches &amp; Sistemas</p>
          <p className="mt-1 text-center text-[0.68rem] tracking-[0.25em]">HENAWEB · CURITIBA, PR</p>
          <p className="text-center text-[0.68rem] tracking-[0.25em]">ABERTO DO PROTÓTIPO AO DEPLOY</p>

          <div className="my-4 border-t-2 border-dashed border-acid-ink/40" />

          <div className="grid grid-cols-2 gap-y-0.5 text-[0.72rem]">
            <span>PEDIDO</span>
            <span className="text-right font-bold">Nº 0142</span>
            <span>MESA</span>
            <span className="text-right">SUA EMPRESA</span>
            <span>DATA</span>
            <span className="text-right tabular-nums">
              {stamp.date} {stamp.time}
            </span>
            <span>ATENDENTE</span>
            <span className="text-right">TIME HENAWEB</span>
          </div>

          <div className="my-4 border-t-2 border-dashed border-acid-ink/40" />

          <div className="flex justify-between text-[0.68rem] tracking-widest text-acid-ink/60">
            <span>QTD  ITEM</span>
            <span>PRAZO</span>
          </div>
          <ul className="mt-2 flex flex-col gap-3">
            {process.map((s) => (
              <li key={s.n}>
                <div className="flex items-baseline gap-2 font-bold">
                  <span className="shrink-0">1×</span>
                  <span className="shrink-0">{s.title.toUpperCase()}</span>
                  <span aria-hidden className="mb-1 min-w-4 flex-1 border-b-2 border-dotted border-acid-ink/30" />
                  <span className="shrink-0 text-right">{s.time.toUpperCase()}</span>
                </div>
                <ul className="pl-7 text-[0.72rem] text-acid-ink/70">
                  {s.ingredients.map((ing) => (
                    <li key={ing}>+ {ing.toLowerCase()}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="my-4 border-t-2 border-dashed border-acid-ink/40" />

          <p className="text-[0.72rem] text-acid-ink/70">OBS: sem caixa-preta, com protótipo antes do código e código entregue para a casa.</p>

          <div className="my-4 border-t-[3px] border-double border-acid-ink" />
          <p className="flex justify-between text-base font-bold">
            <span>TOTAL</span>
            <span>SISTEMA NO AR</span>
          </p>

          {/* rubber stamp */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-5 bottom-28 -rotate-12 rounded-md border-4 border-[#d7263d] px-3 py-1 font-bold tracking-widest text-[#d7263d] opacity-80"
          >
            EM PREPARO
          </div>

          <div className="mt-5">
            <Barcode />
            <p className="mt-1 text-center text-[0.65rem] tracking-[0.4em]">0142 2026 HENA</p>
          </div>
          <p className="mt-4 text-center text-[0.68rem] tracking-[0.2em]">*** VOLTE SEMPRE: TEMOS ROADMAP ***</p>
          <p className="mt-1 text-center text-[0.65rem] text-acid-ink/70">henrique@henaweb.com</p>
        </div>
        <Torn />
      </div>
    </div>
  );
}
