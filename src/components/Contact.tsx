'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { symptoms, timelines, whatsappLink, site } from '@/lib/content';
import { renderCaseCard, shareOrDownload } from '@/lib/caseCard';
import { track } from '@/lib/track';
import Social from './Social';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'w-full border-b-2 border-acid-ink/35 bg-transparent py-3 text-lg text-acid-ink placeholder:text-acid-ink/65 focus:border-acid-ink focus:outline-none';

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [timeline, setTimeline] = useState(timelines[1]);
  const [status, setStatus] = useState<Status>('idle');
  // what the visitor filled in, kept so a failed send can hand the whole case to WhatsApp or e-mail
  const [fallback, setFallback] = useState('');
  const [caseNo, setCaseNo] = useState('...');
  useEffect(() => setCaseNo(`${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`), []);

  const chosen = symptoms.filter((s) => picked.includes(s.id));
  const lead = chosen[0];
  const capabilities = [...new Set(chosen.map((c) => c.capability))];
  const [saving, setSaving] = useState(false);

  async function saveCard() {
    if (!lead) return;
    setSaving(true);
    try {
      const blob = await renderCaseCard({
        caseNo,
        symptoms: chosen.map((c) => c.label),
        suspect: lead.suspect,
        capability: capabilities.join(' + '),
        firstStep: lead.firstStep,
        timeline,
      });
      await shareOrDownload(blob, `ficha-do-caso-${caseNo.replace('/', '-')}.png`);
      track({ name: 'case_card_download' });
    } finally {
      setSaving(false);
    }
  }

  const saveButton = lead && (
    <button
      type="button"
      onClick={saveCard}
      disabled={saving}
      className="toon-sm toon-press mt-5 inline-flex items-center gap-2 rounded-full bg-acid-ink px-4 py-2 text-sm font-medium text-paper disabled:opacity-60"
    >
      {saving ? 'Gerando ficha…' : 'Baixar ou compartilhar a ficha ↓'}
    </button>
  );

  useGSAP(
    () => {
      const split = SplitText.create('[data-contact-title]', { type: 'lines', mask: 'lines', linesClass: 'line-mask' });
      gsap.from(split.lines, {
        yPercent: 105,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-contact-title]', start: 'top 85%' },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  const diagnosis = (
          <div className="mt-8 rounded-2xl border-[3px] border-acid-ink bg-paper p-5 shadow-[6px_6px_0_#120626]" aria-live="polite">
            <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase">
              <span>Ficha do caso nº {caseNo}</span>
              <span className={`rounded-full px-2 py-0.5 text-right ${lead ? 'bg-acid-ink text-acid' : 'border border-acid-ink/30'}`}>
                {lead ? 'Suspeito identificado' : 'Aguardando pistas'}
              </span>
            </div>
            {lead ? (
              <dl className="mt-4 grid gap-3">
                <div>
                  <dt className="label !text-acid-ink/55">Suspeito principal</dt>
                  <dd className="font-groovy text-2xl text-[#c2410c]">{lead.suspect}</dd>
                </div>
                <div>
                  <dt className="label !text-acid-ink/55">Especialidade indicada</dt>
                  <dd className="text-lg font-medium">{capabilities.join(' + ')}</dd>
                </div>
                <div>
                  <dt className="label !text-acid-ink/55">Primeira diligência</dt>
                  <dd className="serif text-xl leading-snug">{lead.firstStep}</dd>
                </div>
              </dl>
            ) : (
              <p className="serif mt-4 text-xl text-acid-ink/60">Nenhuma pista ainda. Marque o que está acontecendo por aí.</p>
            )}
            {saveButton}
          </div>
  );

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const report = chosen.length
      ? `Sintomas: ${chosen.map((c) => c.label).join('; ')}\nDiagnóstico preliminar: ${capabilities.join(' + ')}\n\n`
      : '';
    const message = `${report}${data.get('message') ?? ''}`.trim();
    setFallback(
      [
        `Olá! Quero abrir um caso com a HenaWeb (ficha nº ${caseNo}).`,
        `Nome: ${data.get('name') ?? ''}`,
        data.get('org') ? `Empresa ou órgão: ${data.get('org')}` : '',
        `Prazo: ${timeline}`,
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    );
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          whatsapp: data.get('whatsapp'),
          org: data.get('org'),
          subject: capabilities[0] ?? 'Novo caso',
          timeline,
          message: message || 'Sem detalhes adicionais.',
          company: data.get('company'),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      track({ name: 'lead', capability: capabilities.join(' + ') || undefined, timeline });
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      ref={root}
      id="contato"
      className="gutter relative z-40 -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon bg-[linear-gradient(170deg,#f7931e_0%,#f9b25a_45%,#f4b942_100%)] py-[clamp(5rem,10vw,9rem)] text-acid-ink"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="label !text-acid-ink/60">(IX) Contato</span>
          <h2 data-contact-title className="mt-6 text-[clamp(3rem,7.5vw,8rem)] leading-[0.86] font-medium tracking-[-0.055em]">
            Abra um <span className="font-groovy text-[0.85em] tracking-normal text-paper [text-shadow:5px_5px_0_#120626]">caso.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-acid-ink/75">
            Marque os sintomas que assombram a sua operação. Montamos um diagnóstico preliminar na hora, e você sai
            daqui sabendo por onde começar.
          </p>

          <div className="hidden lg:block">{diagnosis}</div>

          <div className="mt-8 flex flex-col gap-2 font-mono text-sm">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="w-fit underline-offset-4 hover:underline">
              WhatsApp · {site.whatsappDisplay} ↗
            </a>
            <a href={`mailto:${site.email}`} className="w-fit underline-offset-4 hover:underline">
              {site.email}
            </a>
            <span className="text-acid-ink/60">{site.city} · Atendemos todo o Brasil e exterior</span>
          </div>
          <Social tone="light" className="mt-6" />
        </div>

        <div className="lg:col-span-7">
          {status === 'sent' ? (
            <div className="flex h-full flex-col justify-center rounded-2xl border-[3px] border-acid-ink bg-paper p-10 shadow-[6px_6px_0_#120626]">
              <span className="font-groovy text-5xl text-[#c2410c]">Caso aberto!</span>
              <p className="mt-4 text-2xl font-medium tracking-tight">Recebemos a ficha nº {caseNo}.</p>
              <p className="mt-3 text-lg text-acid-ink/70">Em breve entraremos em contato. Se preferir, fale agora pelo WhatsApp.</p>
              <p className="mt-6 text-acid-ink/70">Quer levar o diagnóstico para o seu time? Guarde a ficha:</p>
              <div>{saveButton}</div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-9">
              <fieldset>
                <legend className="label mb-4 !text-acid-ink/60">1 · Quais sintomas você percebe?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {symptoms.map((s) => {
                    const on = picked.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-[0.95rem] transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-acid-ink ${
                          on ? 'border-acid-ink bg-acid-ink text-acid shadow-[4px_4px_0_rgb(11_13_2/0.35)]' : 'border-acid-ink/25 hover:border-acid-ink'
                        }`}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggle(s.id)} className="sr-only" />
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-xs ${
                            on ? 'border-acid bg-acid text-acid-ink' : 'border-acid-ink/40'
                          }`}
                          aria-hidden
                        >
                          {on ? '✓' : ''}
                        </span>
                        {s.label}
                      </label>
                    );
                  })}
                </div>
                <div className="lg:hidden">{diagnosis}</div>
              </fieldset>

              <fieldset>
                <legend className="label mb-4 !text-acid-ink/60">2 · Prazo</legend>
                <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Prazo">
                  {timelines.map((o) => (
                    <label
                      key={o}
                      className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-acid-ink ${
                        timeline === o ? 'border-acid-ink bg-acid-ink text-acid' : 'border-acid-ink/25 hover:border-acid-ink'
                      }`}
                    >
                      <input type="radio" name="timeline" value={o} checked={timeline === o} onChange={() => setTimeline(o)} className="sr-only" />
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="label mb-2 !text-acid-ink/60">3 · Quem está investigando</legend>
                <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  <input name="name" required placeholder="Seu nome" autoComplete="name" className={field} aria-label="Nome" />
                  <input name="email" type="email" required placeholder="E-mail" autoComplete="email" className={field} aria-label="E-mail" />
                  <input name="whatsapp" type="tel" inputMode="tel" placeholder="WhatsApp (opcional)" autoComplete="tel" className={field} aria-label="WhatsApp" />
                  <input name="org" placeholder="Empresa ou órgão (opcional)" autoComplete="organization" className={field} aria-label="Empresa ou órgão" />
                </div>
                <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <textarea name="message" rows={3} placeholder="Mais alguma pista? (opcional)" className={`${field} mt-2 resize-none`} aria-label="Mensagem" />
              </fieldset>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  data-cursor="Enviar"
                  className="group inline-flex items-center gap-3 rounded-full border-[3px] border-acid-ink bg-acid-ink px-8 py-4 font-medium text-acid shadow-[5px_5px_0_rgb(11_13_2/0.35)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando…' : 'Abrir o caso'}
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </button>
                {status === 'error' && (
                  <div role="alert" className="flex basis-full flex-col gap-3 rounded-2xl border-[3px] border-acid-ink bg-paper p-5 shadow-[5px_5px_0_#120626]">
                    <p className="font-medium">O formulário travou, mas a sua ficha não se perdeu. Envie o mesmo caso por aqui:</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={whatsappLink(fallback)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="toon-sm rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-medium"
                      >
                        Enviar pelo WhatsApp
                      </a>
                      <a
                        href={`mailto:${site.email}?subject=${encodeURIComponent(`Caso nº ${caseNo}`)}&body=${encodeURIComponent(fallback)}`}
                        className="toon-sm rounded-full bg-lemon px-5 py-2.5 text-sm font-medium"
                      >
                        Enviar por e-mail
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
