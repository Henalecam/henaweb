'use client';

import { useEffect, useState } from 'react';
import { track } from '@/lib/track';
import Tick from './Tick';
import { buzz } from '@/lib/haptic';
import { addToDraft } from '@/lib/draft';

/** The ticked symptoms as the line they become in a message ("Sintomas que reconheci (Automação e IA): ..."). */
export const symptomsBlock = (picked: string[], service: string) => `Sintomas que reconheci (${service}):\n${picked.map((p) => `- ${p}`).join('\n')}`;

/** A service page's symptom → the contact form's own symptom chip it is a case of (content.ts symptoms), so the
 * form opens with that chip ticked and its "ficha do caso" already reading the clue. Symptoms with no close chip
 * travel as text only. Keyed by the text in services.ts: a reworded symptom simply stops ticking a chip. */
const CHIP: Record<string, string> = {
  'Informação espalhada em planilhas, e-mails e grupos de mensagem': 'planilhas',
  'Retrabalho para consolidar dados e gerar relatórios': 'retrabalho',
  'Sistema antigo que ninguém tem coragem de mexer': 'legado',
  'Processos de aprovação que dependem de papel, e-mail e planilha': 'aprovacao',
  'Sistemas legados sem acessibilidade e difíceis de manter': 'legado',
  'Dados que não conversam entre secretarias e órgãos': 'planilhas',
  'WhatsApp lotado de perguntas repetidas': 'atendimento',
  'Relatórios montados à mão toda semana': 'retrabalho',
  'Sistemas que não conversam e exigem copia e cola': 'retrabalho',
  'Site que não traz contatos': 'presenca',
  'Empresa que não aparece nas buscas do Google': 'presenca',
};

/** Puts the ticked symptoms in the same-tab contact draft (Contact reads it), once, ticking the matching chips. */
export const carrySymptoms = (picked: string[], service: string) =>
  addToDraft(
    symptomsBlock(picked, service),
    picked.map((p) => CHIP[p]).filter((id): id is string => Boolean(id)),
  );

/**
 * "Sintomas que resolvemos" as a checklist: the visitor ticks what happens in their company and
 * carries it to the contact form, where it lands in the message of the same-tab draft (see Contact).
 */
export default function ServiceSymptoms({ problems, service }: { problems: string[]; service: string }) {
  const [picked, setPicked] = useState<string[]>([]);

  // the closing "Seu caso parece com esse?" window takes the same ticks along (ClosingCarry)
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('hena:symptoms', { detail: { picked, service } }));
  }, [picked, service]);

  const carry = () => {
    carrySymptoms(picked, service);
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
                  onChange={() => {
                    if (!on) buzz(6); // a tick felt as well as seen, on phones that vibrate
                    setPicked((cur) => (on ? cur.filter((x) => x !== p) : [...cur, p]));
                  }}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded border-2 border-acid-ink text-xs ${on ? 'check-pop bg-acid-ink text-acid' : ''}`}
                >
                  {on && <Tick />}
                </span>
                <span>{p}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex min-h-14 flex-wrap items-center gap-x-5 gap-y-3" aria-live="polite" data-print-hide>
        {picked.length > 0 && (
          <button type="button" onClick={carry} className="toon toon-press rounded-full bg-acid px-6 py-4 font-medium text-acid-ink">
            Levar {picked.length === 1 ? 'este sintoma' : `estes ${picked.length} sintomas`} para o contato{'\u00a0'}→
          </button>
        )}
        {/* every symptom on the list ticked: the file gets its verdict stamped beside the button */}
        {problems.length > 1 && picked.length === problems.length && (
          <span className="symptoms-stamp font-mono text-xs font-bold tracking-[0.18em] uppercase">Diagnóstico: caso clássico</span>
        )}
      </div>
    </>
  );
}
