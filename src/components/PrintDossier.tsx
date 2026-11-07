'use client';

import { useState } from 'react';
import { track } from '@/lib/track';
import { imagesReady } from '@/lib/printImages';

/**
 * "Save as PDF": the page already prints as a clean case dossier (see the print rules in globals.css),
 * but few visitors think of Ctrl+P. Procurement teams and partners pass PDFs around, so offer it.
 */
export default function PrintDossier({ placement }: { placement: string }) {
  // the wait for the pictures (up to 2.5 s on a slow connection) used to look like a click that did nothing, and
  // invited a second one: the button says it is getting the dossier ready, and ignores clicks meanwhile
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      data-print-hide
      aria-busy={busy || undefined}
      onClick={async () => {
        if (busy) return;
        track({ name: 'cta_click', placement, label: 'pdf' });
        setBusy(true);
        try {
          // the dossier's pictures further down may not have loaded yet: fetch them first (at most 2.5 s)
          await imagesReady();
        } finally {
          setBusy(false);
        }
        window.print();
      }}
      className="label mt-5 inline-flex min-h-8 items-center gap-1.5 rounded-full !text-ink/70 transition-colors hover:!text-ink focus-visible:!text-ink aria-busy:cursor-progress"
    >
      <span aria-hidden className={busy ? 'motion-safe:animate-pulse' : ''}>
        {busy ? '⏳' : '⎙'}
      </span>
      <span aria-live="polite">{busy ? 'Preparando o dossiê…' : 'Salvar dossiê em PDF'}</span>
    </button>
  );
}
