'use client';

import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/site';
import NewTab from './NewTab';
import { carrySymptoms, symptomsBlock } from './ServiceSymptoms';

/**
 * The two ways out of the closing "Seu caso parece com esse?" window. On a service page, the symptoms the visitor
 * ticked further up ("Sintomas que resolvemos") go along whichever way they leave: into the contact draft for
 * "Abrir um caso", into the WhatsApp message for WhatsApp. Without ticks (and on case pages) these are plain links.
 */
export default function ClosingCarry({ whatsappMessage, symptoms = false }: { whatsappMessage: string; symptoms?: boolean }) {
  const [ticks, setTicks] = useState<{ picked: string[]; service: string }>({ picked: [], service: '' });

  useEffect(() => {
    const on = (e: Event) => setTicks((e as CustomEvent<{ picked: string[]; service: string }>).detail);
    window.addEventListener('hena:symptoms', on);
    return () => window.removeEventListener('hena:symptoms', on);
  }, []);

  const n = ticks.picked.length;
  const message = n ? `${whatsappMessage}\n\n${symptomsBlock(ticks.picked, ticks.service)}` : whatsappMessage;

  return (
    <div className="flex flex-col gap-3 md:items-end">
      <div className="flex flex-wrap gap-3 md:justify-end">
        <a
          href={n ? '/#mensagem' : '/#contato'}
          onClick={() => n && carrySymptoms(ticks.picked, ticks.service)}
          className="toon toon-press rounded-full bg-acid px-6 py-4 font-medium text-acid-ink"
        >
          Abrir um caso →
        </a>
        <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="toon toon-press rounded-full bg-[#25d366] px-6 py-4 font-medium text-acid-ink">
          WhatsApp
          <NewTab />
        </a>
      </div>
      {/* says so, so the visitor doesn't retype them (only where there is a checklist: the case pages keep their layout) */}
      {symptoms && (
        <p aria-live="polite" className="min-h-5 font-mono text-xs text-acid-ink/70">
          {n > 0 && (
            <>
              <span aria-hidden>✓ </span>
              {n === 1 ? 'O sintoma que você marcou vai junto' : `Os ${n} sintomas que você marcou vão junto`}
            </>
          )}
        </p>
      )}
    </div>
  );
}
