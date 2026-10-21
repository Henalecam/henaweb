'use client';

import { useState } from 'react';
import { track } from '@/lib/track';

const DRAFT = 'hena:draft';

/**
 * "Sintomas que resolvemos" as a checklist: the visitor ticks what happens in their company and
 * carries it to the contact form, where it lands in the message of the same-tab draft (see Contact).
 */
export default function ServiceSymptoms({ problems, service }: { problems: string[]; service: string }) {
  const [picked, setPicked] = useState<string[]>([]);

  const carry = () => {
    const block = `Sintomas que reconheci (${service}):\n${picked.map((p) => `- ${p}`).join('\n')}`;
    try {
      const d = JSON.parse(sessionStorage.getItem(DRAFT) ?? 'null') ?? { picked: [], timeline: '', fields: {} };
      const msg: string = d.fields?.message ?? '';
      d.fields = { ...d.fields, message: msg.includes(block) ? msg : [msg, block].filter(Boolean).join('\n\n') };
      sessionStorage.setItem(DRAFT, JSON.stringify(d));
    } catch {}
    track({ name: 'cta_click', placement: 'service-symptoms', label: `${picked.length} sintomas` });
    // land on the message box itself (Contact centres and focuses #mensagem), where the symptoms now are
    location.href = '/#mensagem';
  };

  return (
    <>
      <p className="mt-4 max-w-xl text-ink/75" data-print-hide>Marque o que acontece aí. A gente leva para o formulário, sem precisar digitar de novo.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {problems.map((p) => {
          const on = picked.includes(p);
          return (
            <li key={p}>
              <label
                className={`toon-sm flex h-full cursor-pointer items-start gap-3 rounded-xl p-5 text-acid-ink transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-acid ${
                  on ? 'bg-acid' : 'bg-paper hover:bg-[#fff7e3]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => setPicked((cur) => (on ? cur.filter((x) => x !== p) : [...cur, p]))}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded border-2 border-acid-ink text-xs ${on ? 'check-pop bg-acid-ink text-acid' : ''}`}
                >
                  {on ? '✓' : ''}
                </span>
                <span>{p}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 min-h-14" aria-live="polite" data-print-hide>
        {picked.length > 0 && (
          <button type="button" onClick={carry} className="toon toon-press rounded-full bg-acid px-6 py-4 font-medium text-acid-ink">
            Levar {picked.length === 1 ? 'este sintoma' : `estes ${picked.length} sintomas`} para o contato →
          </button>
        )}
      </div>
    </>
  );
}
