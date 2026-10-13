import type { CSSProperties } from 'react';
import type { MockVariant } from '@/lib/content';

/** Stylized, data-free product UI used as case artwork. Purely decorative. */
export default function MockUI({ variant, hue }: { variant: MockVariant; hue: number }) {
  const style = {
    '--h': `hsl(${hue} 90% 62%)`,
    '--hs': `hsl(${hue} 70% 62% / 0.16)`,
  } as CSSProperties;

  return (
    <div style={style} aria-hidden className="relative flex h-full w-full overflow-hidden bg-[#0c0c0e] text-ink">
      <div
        className="pointer-events-none absolute -top-1/3 -right-1/4 h-[90%] w-[70%] rounded-full blur-[90px]"
        style={{ background: 'var(--hs)' }}
      />
      {variant !== 'bank' && variant !== 'site' && (
        <aside className="hidden w-[18%] shrink-0 flex-col gap-2.5 border-r border-line p-[3%] sm:flex">
          <div className="mb-3 h-3 w-2/3 rounded-full" style={{ background: 'var(--h)' }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`h-2 rounded-full ${i === 1 ? 'bg-ink/50' : 'bg-ink/12'}`} style={{ width: `${55 + ((i * 17) % 35)}%` }} />
          ))}
        </aside>
      )}
      <div className="relative flex-1 p-[4%]">{body(variant)}</div>
    </div>
  );
}

function body(variant: MockVariant) {
  switch (variant) {
    case 'ledger':
      return (
        <div className="flex h-full flex-col gap-[4%]">
          <div className="grid grid-cols-3 gap-[3%]">
            {['R$ 482k', '1.284', '98,2%'].map((v, i) => (
              <div key={v} className="rounded-lg border border-line bg-ink/[0.03] p-[8%]">
                <div className="h-1.5 w-1/2 rounded-full bg-ink/20" />
                <div className="mt-[10%] font-mono text-[clamp(0.7rem,1.6vw,1.4rem)] tracking-tight" style={i === 0 ? { color: 'var(--h)' } : undefined}>
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1 overflow-hidden rounded-lg border border-line">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center gap-[4%] border-b border-line px-[4%] py-[2.2%]">
                <div className="h-1.5 w-[22%] rounded-full bg-ink/25" />
                <div className="h-1.5 w-[30%] rounded-full bg-ink/10" />
                <div className="ml-auto h-4 w-[14%] rounded-full" style={{ background: i % 3 ? 'rgb(236 235 228 / .08)' : 'var(--hs)' }} />
              </div>
            ))}
          </div>
        </div>
      );
    case 'raffle':
      return (
        <div className="grid h-full grid-cols-10 content-start gap-[1.2%]">
          {Array.from({ length: 60 }).map((_, i) => {
            const hit = [3, 14, 22, 27, 38, 41, 49, 55].includes(i);
            const sold = (i * 7) % 5 === 0;
            return (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-md border border-line font-mono text-[clamp(0.45rem,0.9vw,0.75rem)]"
                style={hit ? { background: 'var(--h)', color: '#0b0b0b', borderColor: 'transparent' } : sold ? { background: 'rgb(236 235 228 / .08)' } : undefined}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
            );
          })}
        </div>
      );
    case 'insights':
      return (
        <div className="flex h-full flex-col gap-[4%]">
          <svg viewBox="0 0 300 110" className="w-full flex-1" preserveAspectRatio="none">
            <path d="M0 90 C 30 80, 50 95, 80 70 S 130 40, 160 55 S 220 20, 250 30 S 290 10, 300 12" fill="none" stroke="var(--h)" strokeWidth="2.5" />
            <path d="M0 90 C 30 80, 50 95, 80 70 S 130 40, 160 55 S 220 20, 250 30 S 290 10, 300 12 L300 110 L0 110Z" fill="var(--hs)" />
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="0" x2="300" y1={i * 30 + 10} y2={i * 30 + 10} stroke="rgb(236 235 228 / .07)" />
            ))}
          </svg>
          <div className="flex items-start gap-[3%] self-end rounded-xl border border-line bg-ink/[0.04] p-[3%] sm:w-[72%]">
            <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full" style={{ background: 'var(--h)' }} />
            <p className="text-[clamp(0.55rem,1.1vw,0.9rem)] leading-snug text-ink/80">
              Seus gastos com delivery subiram 32% este mês. Reduzir 2 pedidos por semana devolve R$ 240 ao orçamento.
            </p>
          </div>
        </div>
      );
    case 'calendar':
      return (
        <div className="grid h-full grid-cols-5 gap-[1.5%]">
          {['SEG', 'TER', 'QUA', 'QUI', 'SEX'].map((d, c) => (
            <div key={d} className="relative rounded-lg border border-line">
              <div className="border-b border-line p-[8%] font-mono text-[clamp(0.45rem,0.9vw,0.7rem)] text-muted">{d}</div>
              {[0, 1].map((k) => {
                const top = 18 + ((c * 23 + k * 37) % 55);
                const h = 10 + ((c + k * 3) % 3) * 7;
                return (
                  <div
                    key={k}
                    className="absolute inset-x-[8%] rounded-md p-[6%]"
                    style={{ top: `${top}%`, height: `${h}%`, background: (c + k) % 2 ? 'var(--hs)' : 'var(--h)' }}
                  >
                    <div className={`h-1 w-2/3 rounded-full ${(c + k) % 2 ? 'bg-ink/40' : 'bg-black/40'}`} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      );
    case 'bank':
      return (
        <div className="flex h-full items-center justify-center gap-[6%]">
          <div className="flex aspect-[9/17] h-full flex-col gap-[4%] rounded-[1.4rem] border border-ink/15 bg-black p-[3.5%]">
            <div className="aspect-[1.6] rounded-xl p-[8%]" style={{ background: 'linear-gradient(135deg, var(--h), #111)' }}>
              <div className="font-mono text-[clamp(0.5rem,1vw,0.8rem)] text-black/70">saldo</div>
              <div className="font-mono text-[clamp(0.7rem,1.5vw,1.2rem)] text-black">R$ 12.480</div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-[6%]">
                <span className="h-3 w-3 rounded-full bg-ink/15" />
                <span className="h-1.5 flex-1 rounded-full bg-ink/15" />
                <span className="h-1.5 w-[18%] rounded-full" style={{ background: i % 2 ? 'var(--h)' : 'rgb(236 235 228 / .3)' }} />
              </div>
            ))}
          </div>
          <div className="hidden w-[38%] flex-col gap-3 sm:flex">
            <div className="h-2 w-1/2 rounded-full bg-ink/25" />
            <div className="text-[clamp(1rem,2.6vw,2.4rem)] leading-none font-medium tracking-tight">Pix em 2 toques.</div>
            <div className="h-2 w-3/4 rounded-full bg-ink/10" />
            <div className="h-2 w-2/3 rounded-full bg-ink/10" />
          </div>
        </div>
      );
    case 'site':
      return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-line">
          <div className="flex items-center gap-1.5 border-b border-line px-[3%] py-[2%]">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-1.5 rounded-full bg-ink/20" />
            ))}
            <span className="mx-auto h-2 w-1/3 rounded-full bg-ink/10" />
          </div>
          <div className="grid flex-1 grid-cols-2 gap-[5%] p-[6%]">
            <div className="flex flex-col justify-center gap-[6%]">
              <div className="h-[10%] w-[90%] rounded-md bg-ink/80" />
              <div className="h-[10%] w-[70%] rounded-md bg-ink/80" />
              <div className="h-1.5 w-[80%] rounded-full bg-ink/15" />
              <div className="h-1.5 w-[60%] rounded-full bg-ink/15" />
              <div className="h-[12%] w-[40%] rounded-full" style={{ background: 'var(--h)' }} />
            </div>
            <div className="rounded-xl" style={{ background: 'linear-gradient(160deg, var(--hs), transparent), repeating-linear-gradient(45deg, rgb(236 235 228 / .05) 0 2px, transparent 2px 10px)' }} />
          </div>
        </div>
      );
  }
}
