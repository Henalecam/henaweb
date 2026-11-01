'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import WinClose from './WinClose';

const EVENT = 'hena:fullshot';
const open = () => window.dispatchEvent(new Event(EVENT));

/** The □ (maximize) button of the case window: it really maximizes. */
export function MaximizeButton() {
  return (
    // the bevelled square stays Win95-small (18×17) but the button around it is a 24×24 target (WCAG 2.5.8),
    // pulled back with negative margins so the title bar doesn't grow
    <button type="button" onClick={open} className="group -mx-[2.8px] -my-[3.6px] grid h-6 w-6 cursor-pointer place-items-center" aria-label="Ver a página inteira">
      <span aria-hidden className="win-btn group-hover:brightness-110">
        □
      </span>
    </button>
  );
}

const LENS = 168; // px
const ZOOM = 2.2;

/**
 * Mouse shortcut: the screenshot itself opens the full view (keyboard and screen readers use □ or the link).
 * With a mouse, a detective's magnifying glass follows the pointer over the capture, showing it 2.2× (from the
 * same top crop the window displays), so the details can be read before deciding to open the whole page.
 */
export function ZoomArea({ src }: { src?: string }) {
  const lens = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent<HTMLButtonElement>) => {
    const l = lens.current;
    if (!l || !src || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    l.style.translate = `${x - LENS / 2}px ${y - LENS / 2}px`;
    l.style.backgroundSize = `${r.width * ZOOM}px auto`;
    l.style.backgroundPosition = `${-(x * ZOOM - LENS / 2)}px ${-(y * ZOOM - LENS / 2)}px`;
    l.dataset.on = '1';
  };
  return (
    <button
      type="button"
      onClick={open}
      onPointerMove={move}
      onPointerLeave={() => lens.current && delete lens.current.dataset.on}
      tabIndex={-1}
      aria-hidden
      data-cursor={src ? undefined : 'Ampliar'}
      className="absolute inset-0 z-10 cursor-zoom-in overflow-hidden"
    >
      {src && (
        <span
          ref={lens}
          data-lens
          className="pointer-events-none absolute top-0 left-0 rounded-full border-[3px] border-toon bg-no-repeat shadow-[4px_4px_0_#12082a,inset_0_0_0_2px_rgb(255_255_255/0.6)]"
          style={{ width: LENS, height: LENS, backgroundImage: `url(${src})` }}
        />
      )}
    </button>
  );
}

/**
 * "See the whole page": the case window only shows the top of the client's site; this opens the
 * full-length desktop capture (and the phone one) in a scrollable Win95 window. Images load only on
 * first open.
 */
export default function FullShot({
  name,
  host,
  desktop,
  mobile,
  height,
}: {
  name: string;
  host: string;
  desktop: string;
  mobile: string;
  height: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pane = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  // how far down the long capture the reader is, shown in the title bar like an old viewer's status
  const [read, setRead] = useState(0);
  // the full-length capture is a big file: until it arrives, a Win95 "copying" bar says it's on its way
  // instead of a blank dark pane that looks broken
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => {
      setLoaded(true);
      dialog.current?.showModal();
      // the long capture is what one came to read: focus lands on it (not on ×), so ↓, Page Down, Space and End
      // scroll it straight away; the close button is one Shift+Tab away and Esc still closes
      pane.current?.focus({ preventScroll: true });
    };
    window.addEventListener(EVENT, show);
    return () => window.removeEventListener(EVENT, show);
  }, []);

  return (
    <>
      <button type="button" onClick={open} data-print-hide className="label mt-12 flex min-h-11 items-center gap-2 !text-ink/80 underline underline-offset-4 hover:!text-acid">
        <span aria-hidden>↕</span> Ver a página inteira de {name}
      </button>
      <dialog
        ref={dialog}
        aria-label={`Página inteira de ${name}`}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        data-print-hide
        className="win m-auto w-[min(94vw,72rem)] max-w-none p-0 backdrop:bg-[#0d0820]/80 backdrop:backdrop-blur-sm"
      >
        <div className="win-bar">
          <span className="truncate">{host} · página inteira</span>
          <span aria-hidden className="ml-auto shrink-0 tabular-nums opacity-90">
            {read}%
          </span>
          <WinClose onClick={() => dialog.current?.close()} label="Fechar" />
        </div>
        <div
          ref={pane}
          data-lenis-prevent
          tabIndex={0}
          role="region"
          aria-label={`Captura de ${name}: use as setas para rolar`}
          onScroll={(e) => {
            const el = e.currentTarget;
            const max = el.scrollHeight - el.clientHeight;
            setRead(max > 0 ? Math.round((el.scrollTop / max) * 100) : 100);
          }}
          className="m-1.5 max-h-[82vh] overflow-y-auto overscroll-contain border-2 border-[#7d7394] bg-acid-ink p-3 md:p-5"
        >
          {loaded && !ready && (
            <p role="status" data-shot-loading className="mx-auto my-10 flex w-[min(100%,22rem)] flex-col gap-2 font-mono text-xs text-ink/80">
              Revelando a página inteira de {name}…
              <span aria-hidden className="block h-4 border-2 border-[#7d7394] bg-paper p-[2px] shadow-[inset_1px_1px_0_#12082a]">
                <span data-shot-bar className="block h-full w-full" />
              </span>
            </p>
          )}
          {loaded && (
            <div className={`grid items-start gap-5 md:grid-cols-[1fr_minmax(0,15rem)] ${ready ? '' : 'h-0 overflow-hidden'}`}>
              <Image
                onLoad={() => setReady(true)}
                src={desktop}
                alt={`Página inteira de ${name} no computador`}
                width={1440}
                height={height}
                sizes="(max-width: 768px) 90vw, 860px"
                className="h-auto w-full rounded-sm"
              />
              <Image
                src={mobile}
                alt={`${name} no celular`}
                width={780}
                height={1688}
                sizes="(max-width: 480px) 360px, (max-width: 767px) 690px, 240px"
                className="toon-sm h-auto w-full rounded-[1.2rem]"
              />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
