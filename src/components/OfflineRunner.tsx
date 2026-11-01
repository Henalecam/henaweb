'use client';

import { useEffect, useRef, useState } from 'react';

const BEST = 'hena:runner-best';
const H = 120;
const GROUND = H - 22;

type Clue = { x: number; w: number; h: number };

/**
 * /offline: something to do while the signal is gone, the way a browser's own offline page has its dinosaur. Here the
 * runner is the studio's magnifying glass, hopping over the "?" of unsolved cases. Space / ↑ / a tap jumps; it only
 * starts when asked (nothing moves on its own), pauses when the tab is hidden, and keeps the best score in this
 * browser. The score is mirrored in text for screen readers.
 */
export default function OfflineRunner() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'idle' | 'run' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const jumpRef = useRef<() => void>(() => {});

  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem(BEST)) || 0);
    } catch {}
  }, []);

  useEffect(() => {
    if (phase !== 'run') return;
    const cv = canvas.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = cv.clientWidth;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.scale(dpr, dpr);

    let y = 0; // height above the ground
    let vy = 0;
    let speed = 4.2;
    let dist = 0;
    let next = 60;
    let clues: Clue[] = [];
    let raf = 0;
    let last = performance.now();
    let alive = true;

    jumpRef.current = () => {
      if (y === 0) vy = 9.2;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // the ground: a dashed line scrolling left
      ctx.strokeStyle = '#7d7394';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 8]);
      ctx.lineDashOffset = dist % 18;
      ctx.beginPath();
      ctx.moveTo(0, GROUND + 0.5);
      ctx.lineTo(W, GROUND + 0.5);
      ctx.stroke();
      ctx.setLineDash([]);
      // the runner: a magnifying glass, tilted a little more while in the air
      const px = 46;
      const py = GROUND - 18 - y;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(y > 0 ? -0.35 : Math.sin(dist / 9) * 0.08);
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#140a26';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(8, 8);
      ctx.lineTo(17, 17);
      ctx.stroke();
      ctx.fillStyle = '#bfe9f2';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      // the clues: "?" blocks to hop over
      ctx.font = '700 20px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const c of clues) {
        ctx.fillStyle = '#c2410c';
        ctx.fillRect(c.x, GROUND - c.h, c.w, c.h);
        ctx.fillStyle = '#fdf3e1';
        ctx.fillText('?', c.x + c.w / 2, GROUND - c.h / 2 + 1);
      }
      ctx.fillStyle = '#140a26';
      ctx.textAlign = 'right';
      ctx.font = '600 12px ui-monospace, monospace';
      ctx.fillText(String(Math.floor(dist / 10)).padStart(5, '0'), W - 8, 12);
    };

    const tick = (now: number) => {
      const k = Math.min(2, (now - last) / 16.7);
      last = now;
      vy -= 0.55 * k;
      y = Math.max(0, y + vy * k);
      if (y === 0) vy = 0;
      speed = Math.min(9, speed + 0.0016 * k);
      dist += speed * k;
      next -= speed * k;
      if (next <= 0) {
        const h = 18 + Math.random() * 16;
        clues.push({ x: W + 4, w: 18 + Math.random() * 10, h });
        next = 180 + Math.random() * 220 + speed * 12;
      }
      clues = clues.map((c) => ({ ...c, x: c.x - speed * k })).filter((c) => c.x + c.w > -4);
      // the glass's box against each clue (a little forgiving at the edges)
      const hit = clues.some((c) => c.x < 46 + 10 && c.x + c.w > 46 - 9 && GROUND - 18 - y + 10 > GROUND - c.h + 3);
      draw();
      if (hit) {
        alive = false;
        const s = Math.floor(dist / 10);
        setScore(s);
        setBest((b) => {
          const nb = Math.max(b, s);
          try {
            localStorage.setItem(BEST, String(nb));
          } catch {}
          return nb;
        });
        setPhase('over');
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (alive) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    draw();
    raf = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVis);
      jumpRef.current = () => {};
    };
  }, [phase]);

  const start = () => {
    setScore(0);
    setPhase('run');
    requestAnimationFrame(() => canvas.current?.focus({ preventScroll: true }));
  };

  return (
    <div className="mt-6 border-t-2 border-dashed border-acid-ink/20 pt-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="label !text-acid-ink/70">Enquanto o sinal não volta</p>
        {best > 0 && <p className="font-mono text-xs text-acid-ink/70">recorde: {best}</p>}
      </div>
      <div className="relative mt-3">
        <canvas
          ref={canvas}
          tabIndex={phase === 'run' ? 0 : -1}
          role="img"
          aria-label="Mini-jogo: a lupa pula as interrogações. Espaço ou seta para cima para pular."
          onPointerDown={(e) => {
            e.preventDefault();
            jumpRef.current();
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'ArrowUp') {
              e.preventDefault();
              jumpRef.current();
            }
          }}
          className="block h-[120px] w-full touch-manipulation rounded-sm border-2 border-[#7d7394] bg-[#fffaf0] outline-none focus-visible:border-[#c2410c]"
        />
        {phase !== 'run' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#fffaf0]/85 text-center">
            {phase === 'over' && <p className="font-mono text-sm text-acid-ink">caso arquivado · {score} pontos</p>}
            <button type="button" onClick={start} className="toon-sm toon-press rounded-full bg-acid px-4 py-1.5 text-sm font-medium text-acid-ink">
              {phase === 'over' ? 'Investigar de novo ▸' : 'Investigar enquanto espera ▸'}
            </button>
          </div>
        )}
      </div>
      <p className="mt-2 font-mono text-[0.7rem] text-acid-ink/65">Espaço, ↑ ou toque para pular.</p>
      <p className="sr-only" role="status">
        {phase === 'over' ? `Fim de jogo: ${score} pontos. Recorde: ${best}.` : ''}
      </p>
    </div>
  );
}
