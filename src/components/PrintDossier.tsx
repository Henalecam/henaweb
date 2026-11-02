'use client';

import { track } from '@/lib/track';
import { imagesReady } from '@/lib/printImages';

/**
 * "Save as PDF": the page already prints as a clean case dossier (see the print rules in globals.css),
 * but few visitors think of Ctrl+P. Procurement teams and partners pass PDFs around, so offer it.
 */
export default function PrintDossier({ placement }: { placement: string }) {
  return (
    <button
      type="button"
      data-print-hide
      onClick={async () => {
        track({ name: 'cta_click', placement, label: 'pdf' });
        // the dossier's pictures further down may not have loaded yet: fetch them first (at most 2.5 s)
        await imagesReady();
        window.print();
      }}
      className="label mt-5 inline-flex min-h-8 items-center gap-1.5 rounded-full !text-ink/70 transition-colors hover:!text-ink focus-visible:!text-ink"
    >
      <span aria-hidden>⎙</span> Salvar dossiê em PDF
    </button>
  );
}
