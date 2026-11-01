'use client';

import { useId } from 'react';

/**
 * "Abrir no celular": on a computer, a case or service page is often read to be passed on to a phone (to show
 * someone, to keep reading on the bus). A small button opens a celular.exe window with a QR of this very page,
 * pre-generated as a static SVG (public/qr/<kind>-<slug>.svg; regenerate if a slug changes). Desktop pointers
 * only: on a phone you're already there. A native popover: Esc or a click outside closes it.
 */
export default function PhoneQR({ kind, slug, name }: { kind: 'casos' | 'servicos'; slug: string; name: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <>
      <button
        type="button"
        popoverTarget={`qr-${id}`}
        data-print-hide
        data-phone-qr
        className="label mt-5 ml-5 hidden min-h-8 items-center gap-1.5 rounded-full !text-ink/70 transition-colors hover:!text-ink focus-visible:!text-ink pointer-fine:inline-flex"
      >
        <span aria-hidden>📱</span> Abrir no celular
      </button>
      <div id={`qr-${id}`} popover="auto" className="phone-qr win m-auto w-56 p-0 text-acid-ink backdrop:bg-[#0d0820]/60">
        <div className="win-bar">
          <span>celular.exe</span>
        </div>
        <div className="m-1.5 border-2 border-[#7d7394] bg-white p-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- a 3 KB static SVG */}
          <img src={`/qr/${kind}-${slug}.svg`} alt={`QR code para abrir a página de ${name} no celular`} width={192} height={192} loading="lazy" className="block h-auto w-full" />
        </div>
        <p className="px-3 pb-3 text-center font-mono text-[0.68rem] leading-snug">
          Aponte a câmera do celular
          <br />
          <span className="text-acid-ink/60">Esc fecha</span>
        </p>
      </div>
    </>
  );
}
