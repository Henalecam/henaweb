'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { projects, symptoms, timelines, whatsappLink, site } from '@/lib/content';
import { serviceLinks } from '@/lib/serviceLinks';


/** The case or service page the visitor read right before arriving at the form, if any. */
function readReference(): string | null {
  try {
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (!ref || ref.host !== location.host) return null;
    const [, kind, slug] = ref.pathname.match(/^\/(casos|servicos)\/([\w-]+)/) ?? [];
    if (kind === 'casos') {
      const p = projects.find((x) => x.slug === slug);
      return p ? `caso ${p.name}` : null;
    }
    const service = kind === 'servicos' && serviceLinks.find((x) => x.slug === slug);
    if (service) return `serviço ${service.name}`;
  } catch {}
  return null;
}
import { renderCaseCard, shareOrDownload } from '@/lib/caseCard';
import { track } from '@/lib/track';
import CopyEmail from './CopyEmail';
import { suggestEmail } from '@/lib/emailTypos';
import { formatPhoneBR } from '@/lib/phone';
import Social from './Social';
import NewTab from './NewTab';

type Status = 'idle' | 'sending' | 'sent' | 'error';

// symptom capability → service page slug, to point a freshly opened case at a similar solved one
const CAPABILITY_SERVICE: Record<string, string> = {
  'Sistema sob medida': 'sistemas-sob-medida',
  'Automação & IA': 'automacao-e-ia',
  'Sistema público': 'sistemas-publicos',
  'Site / produto': 'sites-e-produtos',
};

/** A solved case close to what the visitor described, preferring one they haven't read yet; else the service page. */
function similarCase(capability: string | undefined): { label: string; href: string } | null {
  const service = capability && CAPABILITY_SERVICE[capability];
  if (!service) return null;
  let read: string[] = [];
  try {
    const v = JSON.parse(localStorage.getItem('hena:read') ?? '[]');
    if (Array.isArray(v)) read = v;
  } catch {}
  const same = projects.filter((p) => p.service === service);
  const pick = same.find((p) => !read.includes(p.slug)) ?? same[0];
  if (pick) return { label: `o caso ${pick.name}`, href: `/casos/${pick.slug}` };
  const name = serviceLinks.find((x) => x.slug === service)?.name;
  return name ? { label: `como trabalhamos com ${name}`, href: `/servicos/${service}` } : null;
}

/**
 * Where the visitor came from, for the briefing e-mail: the page of this site they were reading
 * (a case or service page), the outside site that sent them, and any campaign tags in the URL.
 */
function leadOrigin(): string {
  try {
    const parts: string[] = [];
    const ref = document.referrer ? new URL(document.referrer) : null;
    if (ref && ref.host === location.host) {
      if (ref.pathname !== '/') parts.push(`página ${ref.pathname}`);
    } else if (ref) {
      parts.push(ref.host.replace(/^www\./, ''));
    }
    const q = new URLSearchParams(location.search);
    const utm = ['utm_source', 'utm_medium', 'utm_campaign'].map((k) => q.get(k)).filter(Boolean);
    if (utm.length) parts.push(`campanha ${utm.join(' / ')}`);
    return parts.join(' · ') || 'acesso direto';
  } catch {
    return '';
  }
}

// the half-written case survives a detour to read a case study and come back (same tab only)
const DRAFT = 'hena:draft';
const DRAFT_FIELDS = ['name', 'email', 'whatsapp', 'org', 'message'] as const;
const MSG_MAX = 4000;
// one sign per deadline chip (shown on the chosen one): from the siren of 'para ontem' to the coffee of 'sem pressa'
const TIMELINE_ICON: Record<string, string> = { 'Para ontem': '🚨', '1 a 3 meses': '⏱', '3 a 6 meses': '📅', 'Sem pressa': '☕' };
type Draft = { picked: string[]; timeline: string; fields: Partial<Record<(typeof DRAFT_FIELDS)[number], string>> };

function readDraft(): Draft | null {
  try {
    const d = JSON.parse(sessionStorage.getItem(DRAFT) ?? 'null') as Draft | null;
    return d && (d.picked?.length || Object.values(d.fields ?? {}).some(Boolean)) ? d : null;
  } catch {
    return null;
  }
}

// focus: the underline goes from a faint 2px to a solid 4px (border + a 2px shadow below, so nothing shifts)
const field =
  'peer w-full border-b-2 border-acid-ink/35 bg-transparent pt-6 pb-2 text-lg text-acid-ink placeholder:text-transparent focus:border-acid-ink focus:shadow-[0_2px_0_var(--color-acid-ink)] focus:outline-none user-invalid:border-[#b3122b] user-invalid:focus:shadow-[0_2px_0_#b3122b]';

/**
 * Floating label: sits inside the empty field like a placeholder, then shrinks above it on focus or
 * once filled, so the visitor never loses track of which line is which. The label is a real <label>.
 * Inputs need `placeholder=" "` for the :placeholder-shown check.
 */
function Floating({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`relative block ${className}`}>
      {children}
      <span className="pointer-events-none absolute top-6 left-0 origin-left text-lg text-acid-ink/70 transition-all duration-200 peer-focus:top-0 peer-focus:font-mono peer-focus:text-[0.7rem] peer-focus:tracking-[0.12em] peer-focus:text-acid-ink/80 peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:font-mono peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:tracking-[0.12em] peer-[:not(:placeholder-shown)]:text-acid-ink/80 peer-[:not(:placeholder-shown)]:uppercase motion-reduce:transition-none">
        {label}
      </span>
    </label>
  );
}

// browser validation bubbles in our own words (and always in Portuguese)
const explain = (e: FormEvent<HTMLInputElement>) => {
  const el = e.currentTarget;
  if (el.validity.valueMissing) el.setCustomValidity(el.type === 'email' ? 'Precisamos do seu e-mail para responder o caso.' : 'Como podemos te chamar?');
  else if (el.validity.typeMismatch) el.setCustomValidity('Esse e-mail parece incompleto. Confere pra gente?');
};
const clear = (e: FormEvent<HTMLInputElement>) => e.currentTarget.setCustomValidity('');

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const done = useRef<HTMLDivElement>(null);
  const failBox = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  // "did you mean …@gmail.com?" for addresses that would bounce
  const [emailHint, setEmailHint] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [timeline, setTimeline] = useState(timelines[1]);
  const [status, setStatus] = useState<Status>('idle');
  // what the visitor filled in, kept so a failed send can hand the whole case to WhatsApp or e-mail
  const [fallback, setFallback] = useState('');
  const [caseNo, setCaseNo] = useState('...');
  // "came from the Diconta case": shown on the form and attached to the message, removable
  const [reference, setReference] = useState<string | null>(null);
  useEffect(() => setReference(readReference()), []);
  // "#mensagem" (the FAQ's "ask us directly") lands with the cursor already in the message box
  useEffect(() => {
    const focusMessage = () => {
      if (location.hash !== '#mensagem') return;
      const box = document.getElementById('mensagem') as HTMLTextAreaElement | null;
      if (!box) return;
      box.scrollIntoView({ block: 'center' });
      box.focus({ preventScroll: true });
    };
    focusMessage();
    // on a fresh load the pinned sections above are still being measured and the page grows by a few
    // screens: centre the box again once they settle (other hashes are handled by SmoothScroll)
    const settle = window.setTimeout(focusMessage, 900);
    window.addEventListener('hashchange', focusMessage);
    return () => {
      window.clearTimeout(settle);
      window.removeEventListener('hashchange', focusMessage);
    };
  }, []);
  const form = useRef<HTMLFormElement>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [restored, setRestored] = useState(false);
  useEffect(() => {
    const d = readDraft();
    if (d && form.current) {
      setPicked(d.picked.filter((id) => symptoms.some((s) => s.id === id)));
      if (timelines.includes(d.timeline)) setTimeline(d.timeline);
      for (const k of DRAFT_FIELDS) {
        const el = form.current.elements.namedItem(k) as HTMLInputElement | null;
        if (el && d.fields[k]) el.value = d.fields[k];
      }
      setRestored(true);
    }
    setDraftReady(true);
  }, []);
  const saveDraft = () => {
    if (!draftReady || !form.current) return;
    const f = form.current.elements;
    const fields = Object.fromEntries(DRAFT_FIELDS.map((k) => [k, (f.namedItem(k) as HTMLInputElement | null)?.value ?? '']));
    try {
      const d: Draft = { picked, timeline, fields };
      if (picked.length || Object.values(fields).some(Boolean)) sessionStorage.setItem(DRAFT, JSON.stringify(d));
      else sessionStorage.removeItem(DRAFT);
    } catch {}
  };
  useEffect(saveDraft, [picked, timeline, draftReady]);
  // the submit button rings once the required clues (name and a valid e-mail) are in: "the file is complete"
  const [ready, setReady] = useState(false);
  // the message box has a 4000-character cap that used to cut long pastes silently: past 80% it says how much is left
  const [msgLen, setMsgLen] = useState(0);
  // read the fields directly: checkValidity() would fire `invalid` and stamp our custom messages on fields
  // the visitor hasn't reached yet
  const checkReady = () => {
    const required = [...(form.current?.elements ?? [])].filter((el): el is HTMLInputElement => el instanceof HTMLInputElement && el.required);
    setReady(required.length > 0 && required.every((el) => el.value.trim() !== '' && !el.validity.typeMismatch));
    setMsgLen((form.current?.elements.namedItem('message') as HTMLTextAreaElement | null)?.value.length ?? 0);
  };
  useEffect(checkReady, [draftReady, picked]);
  const discardDraft = () => {
    form.current?.reset();
    setMsgLen(0);
    setPicked([]);
    setTimeline(timelines[1]);
    setRestored(false);
    try {
      sessionStorage.removeItem(DRAFT);
    } catch {}
  };
  useEffect(() => setCaseNo(`${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`), []);

  const chosen = symptoms.filter((s) => picked.includes(s.id));
  const lead = chosen[0];
  const capabilities = [...new Set(chosen.map((c) => c.capability))];
  const [saving, setSaving] = useState(false);
  const [similar, setSimilar] = useState<{ label: string; href: string } | null>(null);

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
      // reduced motion: the title is simply there (CSS reduced-motion can't stop GSAP tweens)
      if (prefersReducedMotion()) return;
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

  // visitors who prefer WhatsApp over the form keep the diagnosis they just built
  const whatsappWithCase = lead
    ? whatsappLink(
        `Olá! Montei a ficha nº ${caseNo} no site da HenaWeb.\nSintomas: ${chosen.map((c) => c.label).join('; ')}\nEspecialidade indicada: ${capabilities.join(' + ')}\nPrazo: ${timeline}`,
      )
    : whatsappLink();

  const diagnosis = (
          <div className="mt-8 rounded-2xl border-[3px] border-acid-ink bg-paper p-5 shadow-[6px_6px_0_#120626]" aria-live="polite">
            <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] uppercase">
              <span>Ficha do caso nº {caseNo}</span>
              <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 ${lead ? 'bg-acid-ink text-acid' : 'border border-acid-ink/30'}`}>
                {/* short form on phones so the pill stays on one line next to the case number */}
                {lead ? (
                  <>
                    <span className="max-sm:hidden">Suspeito </span>identificado
                  </>
                ) : (
                  <>
                    Aguardando<span className="max-sm:hidden"> pistas</span>
                  </>
                )}
              </span>
            </div>
            {lead ? (
              <dl className="mt-4 grid gap-3">
                <div>
                  <dt className="label !text-acid-ink/75">Suspeito principal</dt>
                  <dd className="font-groovy text-2xl text-[#c2410c]">{lead.suspect}</dd>
                </div>
                <div>
                  <dt className="label !text-acid-ink/75">Especialidade indicada</dt>
                  <dd className="text-lg font-medium">{capabilities.join(' + ')}</dd>
                </div>
                {/* the deadline chosen below goes on the file too, so the whole case reads in one place */}
                <div>
                  <dt className="label !text-acid-ink/75">Prazo</dt>
                  <dd className="text-lg font-medium">
                    <span aria-hidden>{TIMELINE_ICON[timeline] ?? ''} </span>
                    {timeline}
                  </dd>
                </div>
                <div>
                  <dt className="label !text-acid-ink/75">Primeira diligência</dt>
                  <dd className="serif text-xl leading-snug">{lead.firstStep}</dd>
                </div>
              </dl>
            ) : (
              <p className="serif mt-4 text-xl text-acid-ink/60">Nenhuma pista ainda. Marque o que está acontecendo por aí.</p>
            )}
            {lead && (
              <div className="flex flex-wrap items-center gap-x-3">
                {saveButton}
                <a
                  href={whatsappWithCase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="toon-sm toon-press mt-5 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-medium text-acid-ink"
                >
                  Mandar a ficha pelo WhatsApp
                  <NewTab />
                </a>
              </div>
            )}
          </div>
  );

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const report = chosen.length
      ? `Sintomas: ${chosen.map((c) => c.label).join('; ')}\nDiagnóstico preliminar: ${capabilities.join(' + ')}\n\n`
      : '';
    const refLine = reference ? `Referência: ${reference} (lido no site antes de escrever)\n\n` : '';
    const message = `${refLine}${report}${data.get('message') ?? ''}`.trim();
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
          origin: leadOrigin(),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      setSimilar(similarCase(lead?.capability));
      try {
        sessionStorage.removeItem(DRAFT);
      } catch {}
      // the form is replaced by the confirmation: bring it on screen and move focus there
      requestAnimationFrame(() => {
        done.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        done.current?.focus({ preventScroll: true });
      });
      track({ name: 'lead', capability: capabilities.join(' + ') || undefined, timeline });
    } catch {
      setStatus('error');
      // the fallback card renders below the button, often under the fold: bring it into view
      requestAnimationFrame(() => {
        failBox.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        failBox.current?.focus({ preventScroll: true });
      });
    }
  }

  return (
    <section
      ref={root}
      id="contato"
      data-tint="#f7931e"
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
            <a href={whatsappWithCase} target="_blank" rel="noopener noreferrer" className="w-fit underline-offset-4 hover:underline">
              WhatsApp · {site.whatsappDisplay} ↗
              <NewTab />
            </a>
            <span className="flex flex-wrap items-baseline gap-x-3">
              <a href={`mailto:${site.email}`} className="w-fit underline-offset-4 hover:underline">
                {site.email}
              </a>
              <CopyEmail placement="contato" className="text-xs text-acid-ink/75 underline underline-offset-4 hover:text-acid-ink" />
            </span>
            <span className="text-acid-ink/60">{site.city} · Atendemos todo o Brasil e exterior</span>
          </div>
          <Social tone="light" className="mt-6" />
        </div>

        <div className="min-w-0 lg:col-span-7">
          {status === 'sent' ? (
            <div
              ref={done}
              tabIndex={-1}
              role="status"
              className="relative flex flex-col justify-center overflow-hidden rounded-2xl border-[3px] border-acid-ink bg-paper p-8 shadow-[6px_6px_0_#120626] outline-none md:p-10 lg:sticky lg:top-28"
            >
              {/* rubber stamp, like the diner order slip */}
              <div
                aria-hidden
                className="stamp-in pointer-events-none absolute top-9 right-7 rounded-md border-4 border-[#b3122b] px-3 py-1 font-mono text-sm font-bold tracking-widest text-[#b3122b] opacity-85 md:text-base"
              >
                CASO ABERTO · {caseNo}
              </div>
              <span className="font-groovy mt-12 text-5xl text-[#c2410c]">Caso aberto!</span>
              <p className="mt-4 text-2xl font-medium tracking-tight">Recebemos a ficha nº {caseNo}.</p>
              <p className="mt-3 text-lg text-acid-ink/70">Em breve entraremos em contato. Se tiver pressa, chame agora:</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(`Olá! Acabei de abrir o caso nº ${caseNo} pelo site.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="toon-sm toon-press rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-medium"
                >
                  Falar pelo WhatsApp
                  <NewTab />
                </a>
                {/* the reply comes from this number and address: saved, it isn't mistaken for spam */}
                <a href="/henaweb.vcf" download className="toon-sm toon-press rounded-full bg-white px-5 py-2.5 text-sm font-medium">
                  <span aria-hidden>＋ </span>Salvar nosso contato
                </a>
              </div>
              {similar && (
                <p className="mt-6 text-acid-ink/80">
                  Enquanto isso, veja{' '}
                  <a href={similar.href} className="font-medium underline underline-offset-4 hover:text-[#c2410c]">
                    {similar.label} →
                  </a>
                </p>
              )}
              <p className="mt-8 text-acid-ink/70">Quer levar o diagnóstico para o seu time? Guarde a ficha:</p>
              <div>{saveButton}</div>
            </div>
          ) : (
            <form
              ref={form}
              // on paper a form can't be filled in: the printout's own footer carries the contact line instead
              data-print-hide
              onSubmit={submit} onInput={() => {
              saveDraft();
              checkReady();
            }}
              // Enter in a one-line field used to submit the half-filled form (and pop "preencha este campo" on
              // the next one); like the phone keyboard's "next" key, it now moves to the next field instead
              onKeyDown={(e) => {
                const t = e.target as HTMLInputElement;
                if (e.key !== 'Enter' || e.nativeEvent.isComposing || t.tagName !== 'INPUT' || !/^(text|email|tel)$/.test(t.type)) return;
                const fields = [...e.currentTarget.querySelectorAll<HTMLElement>('input[name]:not([tabindex="-1"]):is([type=text],[type=email],[type=tel],:not([type])), textarea[name]')];
                const next = fields[fields.indexOf(t) + 1];
                if (!next) return;
                e.preventDefault();
                next.focus();
              }}
              className="flex flex-col gap-9">
              {restored && (
                <p role="status" className="-mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 self-start font-mono text-xs text-acid-ink/80">
                  <span>↺ Recuperamos o rascunho que você deixou nesta aba.</span>
                  <button type="button" onClick={discardDraft} className="min-h-8 underline underline-offset-2 hover:text-acid-ink">
                    começar do zero
                  </button>
                </p>
              )}
              {reference && (
                <p className="toon-sm -mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 self-start rounded-xl bg-paper px-4 py-2.5 text-sm">
                  <span aria-hidden>📎</span>
                  <span>
                    Pista anexada: <strong className="font-medium">{reference}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setReference(null)}
                    className="label min-h-8 !text-acid-ink/70 underline underline-offset-2 hover:!text-acid-ink"
                  >
                    remover
                  </button>
                </p>
              )}
              <fieldset>
                <legend className="label mb-4 !text-acid-ink/60">1 · Quais sintomas você percebe?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {symptoms.map((s) => {
                    const on = picked.includes(s.id);
                    return (
                      <label
                        key={s.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-[0.95rem] transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-acid-ink ${
                          on ? 'border-acid-ink bg-acid-ink text-acid shadow-[4px_4px_0_rgb(11_13_2/0.35)]' : 'border-acid-ink/25 hover:border-acid-ink'
                        }`}
                      >
                        <input type="checkbox" checked={on} onChange={() => toggle(s.id)} className="sr-only" />
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-xs ${
                            on ? 'check-pop border-acid bg-acid text-acid-ink' : 'border-acid-ink/40'
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
                      className={`cursor-pointer rounded-full border-2 px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-acid-ink ${
                        timeline === o ? 'border-acid-ink bg-acid-ink text-acid' : 'border-acid-ink/25 hover:border-acid-ink'
                      }`}
                    >
                      <input type="radio" name="timeline" value={o} checked={timeline === o} onChange={() => setTimeline(o)} className="sr-only" />
                      {/* the chosen deadline gets its little sign, stamped in like the symptom ticks (check-pop) */}
                      {timeline === o && (
                        <span aria-hidden className="check-pop mr-1.5 inline-block">
                          {TIMELINE_ICON[o] ?? '✓'}
                        </span>
                      )}
                      {o}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* min-w-0 here and on the form column: a fieldset and a grid item are min-content wide by default,
                  so a long unbroken paste (a URL) in the self-sizing message box stretched the column off screen */}
              <fieldset className="min-w-0">
                <legend className="label mb-2 !text-acid-ink/60">3 · Quem está investigando</legend>
                <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  <Floating label="Seu nome">
                    <input name="name" enterKeyHint="next" required maxLength={120} placeholder=" " autoComplete="name" className={field} onInvalid={explain} onInput={clear} />
                  </Floating>
                  <div className="min-w-0">
                    <Floating label="E-mail">
                    <input
                      ref={emailRef}
                      name="email" enterKeyHint="next"
                      type="email"
                      required
                      placeholder=" "
                      autoComplete="email"
                      className={field}
                      aria-describedby={emailHint ? 'email-hint' : undefined}
                      onInvalid={explain}
                      onInput={(e) => {
                        clear(e);
                        if (emailHint) setEmailHint(null);
                      }}
                      onBlur={(e) => setEmailHint(suggestEmail(e.currentTarget.value))}
                    />
                    </Floating>
                    {emailHint && (
                      <p id="email-hint" className="mt-2 text-sm text-acid-ink/80">
                        Você quis dizer{' '}
                        <button
                          type="button"
                          // a long address has no break opportunities: let it wrap anywhere instead of running off the card
                          className="text-left font-medium underline decoration-2 underline-offset-2 [overflow-wrap:anywhere]"
                          onClick={() => {
                            if (emailRef.current) emailRef.current.value = emailHint;
                            setEmailHint(null);
                            emailRef.current?.focus();
                          }}
                        >
                          {emailHint}
                        </button>
                        ?
                      </p>
                    )}
                  </div>
                  <Floating label="WhatsApp (opcional)">
                  <input
                    name="whatsapp" enterKeyHint="next"
                    type="tel"
                    inputMode="tel"
                    placeholder=" "
                    autoComplete="tel"
                    maxLength={22}
                    className={field}
                    onInput={(e) => {
                      // (41) 99999-9999 as it is typed; foreign numbers starting with + stay as typed
                      const el = e.currentTarget;
                      const atEnd = el.selectionStart === el.value.length;
                      if (atEnd) el.value = formatPhoneBR(el.value);
                    }}
                  />
                  </Floating>
                  <Floating label="Empresa ou órgão (opcional)">
                    <input name="org" enterKeyHint="next" placeholder=" " autoComplete="organization" className={field} />
                  </Floating>
                </div>
                <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
                <Floating label="Mais alguma pista? (opcional)" className="mt-2">
                  <textarea
                    id="mensagem"
                    name="message"
                    rows={3}
                    maxLength={MSG_MAX}
                    placeholder=" "
                    aria-describedby="atalho-enviar"
                    // grows with the story instead of scrolling inside 3 rows (field-sizing; other browsers keep the 3 rows)
                    className={`${field} min-h-[7.375rem] max-h-[22rem] resize-none [field-sizing:content]`}
                    onKeyDown={(e) => {
                      // Ctrl/⌘ + Enter sends from the message box, like in most mail and chat apps
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && status !== 'sending') {
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                      }
                    }}
                  />
                </Floating>
                {/* a live region that is always there (an inserted one may go unannounced); only the limit itself is spoken */}
                <p
                  role="status"
                  className={`mt-1 text-right font-mono text-xs empty:mt-0 ${msgLen >= MSG_MAX ? 'font-medium text-[#c2410c]' : 'text-acid-ink/70'}`}
                  data-print-hide
                >
                  {msgLen >= MSG_MAX ? (
                    <>Limite de {MSG_MAX.toLocaleString('pt-BR')} caracteres. O resto da história cabe numa conversa pelo WhatsApp.</>
                  ) : msgLen >= MSG_MAX * 0.8 ? (
                    <span aria-hidden>{(MSG_MAX - msgLen).toLocaleString('pt-BR')} caracteres restantes</span>
                  ) : null}
                </p>
                <p id="atalho-enviar" className="hidden text-xs text-acid-ink/70 pointer-fine:block" data-print-hide>
                  <kbd className="font-mono">Ctrl</kbd> + <kbd className="font-mono">Enter</kbd> envia direto da mensagem.
                </p>
              </fieldset>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  data-cursor="Enviar"
                  data-ready={ready || undefined}
                  className="group relative inline-flex items-center gap-3 rounded-full border-[3px] border-acid-ink bg-acid-ink px-8 py-4 font-medium text-acid shadow-[5px_5px_0_rgb(11_13_2/0.35)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando…' : 'Abrir o caso'}
                  <span className="transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
                </button>
                <p className="max-w-xs text-sm leading-snug text-acid-ink/75">
                  Usamos seus dados só para responder este caso.
                </p>
                {status === 'error' && (
                  <div
                    ref={failBox}
                    tabIndex={-1}
                    role="alert"
                    className="flex basis-full flex-col gap-3 rounded-2xl border-[3px] border-acid-ink bg-paper p-5 shadow-[5px_5px_0_#120626] outline-none"
                  >
                    <p className="font-medium">O formulário travou, mas a sua ficha não se perdeu. Envie o mesmo caso por aqui:</p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={whatsappLink(fallback)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="toon-sm rounded-full bg-[#25d366] px-5 py-2.5 text-sm font-medium"
                      >
                        Enviar pelo WhatsApp
                        <NewTab />
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
