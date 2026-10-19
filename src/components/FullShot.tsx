'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const EVENT = 'hena:fullshot';
const open = () => window.dispatchEvent(new Event(EVENT));

/** The □ (maximize) button of the case window: it really maximizes. */
export function MaximizeButton() {
  return (
    <button type="button" onClick={open} className="win-btn cursor-pointer hover:brightness-110" aria-label="Ver a página inteira">
      □
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
  const [loaded, setLoaded] = useState(false);

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
      <button type="button" onClick={open} className="label mt-12 flex min-h-11 items-center gap-2 !text-ink/80 underline underline-offset-4 hover:!text-acid">
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
          <button type="button" onClick={() => dialog.current?.close()} className="win-btn ml-auto" aria-label="Fechar">
            ×
          </button>
        </div>
        <div data-lenis-prevent tabIndex={0} className="m-1.5 max-h-[82vh] overflow-y-auto overscroll-contain border-2 border-[#7d7394] bg-acid-ink p-3 md:p-5">
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
                sizes="(max-width: 768px) 90vw, 240px"
                className="toon-sm h-auto w-full rounded-[1.2rem]"
              />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
