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

/** Mouse shortcut: the screenshot itself opens the full view (keyboard and screen readers use □ or the link). */
export function ZoomArea() {
  return (
    <button
      type="button"
      onClick={open}
      tabIndex={-1}
      aria-hidden
      data-cursor="Ampliar"
      className="absolute inset-0 z-10 cursor-zoom-in"
    />
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
  const [loaded, setLoaded] = useState(false);
  // how far down the long capture the reader is, shown in the title bar like an old viewer's status
  const [read, setRead] = useState(0);

  useEffect(() => {
    const show = () => {
      setLoaded(true);
      dialog.current?.showModal();
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
          data-lenis-prevent
          tabIndex={0}
          onScroll={(e) => {
            const el = e.currentTarget;
            const max = el.scrollHeight - el.clientHeight;
            setRead(max > 0 ? Math.round((el.scrollTop / max) * 100) : 100);
          }}
          className="m-1.5 max-h-[82vh] overflow-y-auto overscroll-contain border-2 border-[#7d7394] bg-acid-ink p-3 md:p-5"
        >
          {loaded && (
            <div className="grid items-start gap-5 md:grid-cols-[1fr_minmax(0,15rem)]">
              <Image
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
