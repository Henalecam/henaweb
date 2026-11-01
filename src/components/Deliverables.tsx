'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

type Item = { title: string; body: string };

const fileName = (i: number) => `etapa_${String(i + 1).padStart(2, '0')}.txt`;
const still = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* "O que você recebe" on a service page: each step is a Win95 window, and its "_" really minimizes it — the window
   shrinks down into a taskbar under the list, where a button brings it back (the way it left, in reverse). Nothing
   is lost: minimized steps still print, and the page's server HTML has every step open. Its "□" works too: the step
   takes the whole row at a larger reading size, and "❐" puts it back */
export default function Deliverables({ items }: { items: Item[] }) {
  const [min, setMin] = useState<number[]>([]);
  // "□" maximizes a step: it takes the whole row (both columns) at a larger reading size; "❐" puts it back
  const [max, setMax] = useState<number | null>(null);
  const flip = useRef<Map<Element, DOMRect> | null>(null);
  const list = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  // after a change, where focus should land (a taskbar button, or the restored window's "_") and which window
  // should grow back out of the taskbar
  const next = useRef<{ focus?: string; grow?: { i: number; from: DOMRect } }>({});

  const win = (i: number) => list.current?.querySelector<HTMLElement>(`[data-win-item="${i}"]`);

  const minimize = (i: number) => {
    const el = win(i);
    const done = () => {
      next.current = { focus: `[data-task="${i}"]` };
      setMax((m) => (m === i ? null : m));
      setMin((m) => [...m, i]);
    };
    if (!el || !bar.current || still()) return done();
    // the window flies to the end of the taskbar and folds into it, like a 95 minimize
    const a = el.getBoundingClientRect();
    const b = bar.current.getBoundingClientRect();
    const dx = b.left + Math.min(b.width, 40 + min.length * 150) - (a.left + a.width / 2);
    const dy = b.top + 14 - (a.top + a.height / 2);
    el.animate(
      [
        { transform: 'none', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) scale(0.12, 0.06)`, opacity: 0.4 },
      ],
      { duration: 280, easing: 'cubic-bezier(.55,0,.75,.2)' },
    ).onfinish = done;
  };

  const maximize = (i: number) => {
    // FLIP: remember where every window was, then glide them from there once the grid has reflowed
    if (!still() && list.current) flip.current = new Map([...list.current.children].map((el) => [el, el.getBoundingClientRect()]));
    setMax((m) => (m === i ? null : i));
  };

  useLayoutEffect(() => {
    const before = flip.current;
    flip.current = null;
    if (!before) return;
    before.forEach((a, el) => {
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (!dx && !dy && a.width === b.width) return;
      el.animate(
        [
          { transform: `translate(${dx}px, ${dy}px)`, clipPath: `inset(0 ${Math.max(0, b.width - a.width)}px ${Math.max(0, b.height - a.height)}px 0)` },
          { transform: 'none', clipPath: 'inset(0 0 0 0)' },
        ],
        { duration: 320, easing: 'cubic-bezier(.2,.8,.3,1)' },
      );
    });
  }, [max]);

  const restore = (i: number, from?: DOMRect) => {
    next.current = { focus: `[data-win-item="${i}"] [data-min-btn]`, grow: from && !still() ? { i, from } : undefined };
    setMin((m) => m.filter((x) => x !== i));
  };

  useLayoutEffect(() => {
    const { focus, grow } = next.current;
    next.current = {};
    if (grow) {
      const el = win(grow.i);
      if (el) {
        const a = el.getBoundingClientRect();
        const dx = grow.from.left + grow.from.width / 2 - (a.left + a.width / 2);
        const dy = grow.from.top + grow.from.height / 2 - (a.top + a.height / 2);
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(0.12, 0.06)`, opacity: 0.4 },
            { transform: 'none', opacity: 1 },
          ],
          { duration: 300, easing: 'cubic-bezier(.2,.8,.3,1)' },
        );
      }
    }
    if (focus) document.querySelector<HTMLElement>(focus)?.focus({ preventScroll: true });
  }, [min]);

  const all = min.length === items.length;

  return (
    <>
      <ol ref={list} data-win-group className="mt-8 grid gap-5 md:grid-cols-2">
        {items.map((d, i) => (
          <li
            key={d.title}
            data-win-item={i}
            data-min={min.includes(i) ? '' : undefined}
            data-max={max === i ? '' : undefined}
            className={`win flex flex-col ${max === i ? 'md:col-span-2' : ''}`}
          >
            <div className="win-bar">
              <span aria-hidden>{fileName(i)}</span>
              {/* where this step sits in the whole delivery, like a copy dialog's progress: one block per step */}
              <span aria-hidden className="ml-auto flex items-center gap-[3px]">
                {items.map((_, j) => (
                  <span
                    key={j}
                    data-prog-fill={j <= i ? '' : undefined}
                    style={j <= i ? ({ '--j': j } as CSSProperties) : undefined}
                    className={`h-2.5 w-2 border border-white/85 shadow-[1px_1px_0_rgb(0_0_0/0.35)] ${j <= i ? 'bg-white' : 'bg-transparent'}`}
                  />
                ))}
              </span>
              <span className="ml-2 flex shrink-0 gap-1 print:hidden">
                <button type="button" data-min-btn className="win-btn" aria-label={`Minimizar etapa ${i + 1}: ${d.title}`} onClick={() => minimize(i)}>
                  _
                </button>
                <button
                  type="button"
                  className="win-btn"
                  aria-label={max === i ? `Restaurar tamanho da etapa ${i + 1}` : `Maximizar etapa ${i + 1}: ${d.title}`}
                  onClick={() => maximize(i)}
                >
                  {max === i ? '❐' : '□'}
                </button>
                <span aria-hidden className="win-btn">×</span>
              </span>
            </div>
            <div className="m-1.5 flex-1 border-2 border-[#7d7394] bg-paper p-6 text-acid-ink">
              <h3 className="text-2xl font-medium tracking-tight">{d.title}</h3>
              <p className="mt-2 leading-relaxed text-acid-ink/75">{d.body}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* the taskbar: only drawn once something is minimized (the empty div just gives the first one a place to fly to) */}
      <div ref={bar} className="deliv-bar mt-4 print:hidden" data-empty={min.length ? undefined : ''}>
        {min.length > 0 && (
          <div role="group" aria-label="Etapas minimizadas" className="win flex flex-wrap items-center gap-1.5 p-1.5">
            {all && <span className="px-2 font-mono text-xs text-acid-ink/80">tudo minimizado. que tal abrir de novo?</span>}
            {min.map((i) => (
              <button
                key={i}
                type="button"
                data-task={i}
                className="deliv-task"
                aria-label={`Restaurar etapa ${i + 1}: ${items[i].title}`}
                onClick={(e) => restore(i, e.currentTarget.getBoundingClientRect())}
              >
                <span aria-hidden className="deliv-ico" />
                {fileName(i)}
              </button>
            ))}
            {min.length > 1 && (
              <button type="button" className="deliv-task ml-auto" onClick={() => { next.current = { focus: `[data-win-item="${min[0]}"] [data-min-btn]` }; setMin([]); }}>
                restaurar todas
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
