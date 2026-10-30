'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

const INK = '#140a26';

/**
 * Evidence is sized in a local unit, --u. On the desktop board --u is 1cqw (it scales with the
 * board); on the mobile file it is a fixed, readable size.
 */
const u = (n: number) => `calc(var(--u)*${n})`;

type EvidenceId = 'sheet' | 'mail' | 'note' | 'cal' | 'news';

/**
 * The "Sexta, 17h" calendar page notices when it is Friday where the visitor is (their office is the
 * haunted one): before five it warns "é hoje", from five to six "é agora", later "foi hoje". Any other
 * day it says nothing more. Client clock only, after mount (the server HTML is the plain "SEXTA").
 */
function FridayNote() {
  const [note, setNote] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      if (d.getDay() !== 5) return setNote('');
      const h = d.getHours();
      setNote(h < 17 ? 'é hoje' : h < 18 ? 'é agora' : 'foi hoje');
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  if (!note) return null;
  return <span data-friday={note} className="uppercase"> · {note}</span>;
}

const evidenceBodies: Record<EvidenceId, { label: string; body: ReactNode }> = {
  sheet: {
    label: 'Planilha com 14 abas',
    body: (
      <div className="overflow-hidden border-2 border-toon bg-white" style={{ borderRadius: u(0.6), boxShadow: `${u(0.6)} ${u(0.6)} 0 ${INK}` }}>
        <div className="bg-[#23724a] font-mono font-bold text-white" style={{ padding: `${u(0.5)} ${u(1)}`, fontSize: u(1.5) }}>
          planilha_FINAL_v7.xlsx
        </div>
        <div className="grid grid-cols-4 font-mono text-acid-ink" style={{ fontSize: u(1.4) }}>
          {['#REF!', '12', '#N/D', '??', '8', '#REF!', '3', '#DIV/0', '??', '4', '#N/D', '5'].map((c, i) => (
            <span
              key={i}
              className={`border-r border-b border-[#cfd8d2] ${c.startsWith('#') || c === '??' ? 'font-bold text-[#d7263d]' : ''}`}
              style={{ padding: `${u(0.4)} ${u(0.6)}` }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  mail: {
    label: 'E-mail sem dono',
    body: (
      <div
        className="border-2 border-toon bg-paper font-mono leading-snug text-acid-ink"
        style={{ borderRadius: u(0.6), padding: u(1.2), fontSize: u(1.45), boxShadow: `${u(0.6)} ${u(0.6)} 0 ${INK}` }}
      >
        <p className="opacity-60">De: diretoria@empresa</p>
        <p className="font-bold">RE: RE: ENC: RE: aprovação?? (14)</p>
        <p className="opacity-80" style={{ marginTop: u(0.6) }}>
          &gt; alguém sabe quem aprovou isso?
        </p>
        <p className="opacity-80">&gt;&gt; achei que era com você</p>
      </div>
    ),
  },
  note: {
    label: 'Bilhete na tela',
    body: (
      <div className="aspect-square bg-[#f9e27d]" style={{ padding: u(1.4), boxShadow: `${u(0.6)} ${u(0.8)} 0 rgb(20 10 38 / 0.6)` }}>
        <p className="serif leading-tight text-acid-ink" style={{ fontSize: u(2.8) }}>
          Quem mexeu nisso?!
        </p>
        <p className="font-mono text-acid-ink/75" style={{ marginTop: u(1), fontSize: u(1.3) }}>
          (de novo)
        </p>
      </div>
    ),
  },
  cal: {
    label: 'Sexta, 17h',
    body: (
      <div
        className="overflow-hidden border-2 border-toon bg-white text-center text-acid-ink"
        style={{ borderRadius: u(0.6), boxShadow: `${u(0.6)} ${u(0.6)} 0 ${INK}` }}
      >
        <div className="bg-[#d7263d] font-mono font-bold text-white" style={{ padding: `${u(0.5)} 0`, fontSize: u(1.5) }}>
          SEXTA
          <FridayNote />
        </div>
        <div className="leading-none font-semibold" style={{ fontSize: u(5) }}>
          17h
        </div>
        <div className="font-mono" style={{ padding: `0 ${u(1)} ${u(1)}`, fontSize: u(1.25) }}>
          cadastro duplicado pela 3ª vez
        </div>
      </div>
    ),
  },
  news: {
    label: 'Recorte de jornal',
    body: (
      <div className="bg-[#efe6d2] text-acid-ink" style={{ padding: u(1.2), boxShadow: `${u(0.6)} ${u(0.6)} 0 rgb(20 10 38 / 0.6)` }}>
        <p className="font-mono tracking-widest uppercase opacity-70" style={{ fontSize: u(1.2) }}>
          Diário da Operação
        </p>
        <p className="serif leading-tight font-semibold" style={{ fontSize: u(2.5) }}>
          Equipe passa a tarde copiando dados de um sistema para outro
        </p>
      </div>
    ),
  },
};

/** Desktop board layout: pin positions (in % of the board) and card boxes. */
const SUSPECT = { x: 50, y: 11 };
const boardLayout: { id: EvidenceId; pin: { x: number; y: number }; box: string; rot: number }[] = [
  { id: 'sheet', pin: { x: 18, y: 8 }, box: 'left-[3%] top-[7%] w-[30%]', rot: -4 },
  { id: 'mail', pin: { x: 82, y: 7 }, box: 'right-[3%] top-[6%] w-[31%]', rot: 3 },
  { id: 'note', pin: { x: 15, y: 61 }, box: 'left-[4%] top-[60%] w-[22%]', rot: 5 },
  { id: 'cal', pin: { x: 84, y: 59 }, box: 'right-[4%] top-[58%] w-[24%]', rot: -3 },
  { id: 'news', pin: { x: 50, y: 75 }, box: 'left-[33%] top-[74%] w-[34%]', rot: 1.5 },
];

/** Mobile file order and widths (wide enough to read, varied enough to feel pinned by hand). */
const mobileLayout: { id: EvidenceId; width: string; rot: number; side: 'start' | 'end' }[] = [
  { id: 'sheet', width: 'w-[88%]', rot: -2.5, side: 'start' },
  { id: 'mail', width: 'w-[88%]', rot: 2, side: 'end' },
  { id: 'note', width: 'w-[62%]', rot: -3.5, side: 'start' },
  { id: 'cal', width: 'w-[58%]', rot: 3, side: 'end' },
  { id: 'news', width: 'w-[90%]', rot: -1.5, side: 'start' },
];

const corkStyle: CSSProperties = {
  backgroundImage:
    'radial-gradient(rgb(90 55 25 / 0.35) 1px, transparent 1.4px), radial-gradient(rgb(255 230 190 / 0.18) 1px, transparent 1.6px)',
  backgroundSize: '7px 7px, 11px 11px',
  backgroundPosition: '0 0, 3px 5px',
};

function Pin({ color = '#d7263d' }: { color?: string }) {
  return (
    <span
      className="absolute left-1/2 z-10 block -translate-x-1/2 rounded-full border-2 border-toon shadow-[1px_2px_0_#140a26]"
      style={{ background: color, top: u(-1), width: u(2.2), height: u(2.2) }}
    />
  );
}

function GhostPhoto({ unmasked = false }: { unmasked?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <rect width="200" height="200" fill={unmasked ? '#2b1a58' : '#1e1442'} />
      <circle cx="160" cy="40" r="22" fill="#f9e27d" opacity="0.9" />
      <path
        d="M55,110 C52,62 76,34 100,34 C124,34 148,62 145,110 L150,180 C151,190 142,194 136,186 L128,176 L118,192 L108,178 L100,194 L92,178 L82,192 L72,176 L64,186 C58,194 49,190 50,180 Z"
        fill="#e9f6e4"
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {unmasked ? (
        <g>
          <rect x="68" y="62" width="64" height="54" rx="6" fill="#2f8f5b" stroke={INK} strokeWidth="4" />
          <path d="M84,62 V116 M100,62 V116 M116,62 V116 M68,78 H132 M68,94 H132" stroke="#a6e3bf" strokeWidth="1.5" />
          <text x="84" y="90" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="9" fill="#fff">
            #N/D
          </text>
          <text x="116" y="90" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="9" fill="#fff">
            #N/D
          </text>
          <rect x="82" y="100" width="36" height="12" rx="3" fill={INK} />
          <text x="100" y="109" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="8" fill="#f7931e">
            #REF!
          </text>
        </g>
      ) : (
        <g>
          <path d="M70,74 L92,84 M130,74 L108,84" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="84" cy="96" rx="10" ry="13" fill={INK} />
          <ellipse cx="116" cy="96" rx="10" ry="13" fill={INK} />
          <circle cx="86" cy="98" r="4" fill="#a6d64b" />
          <circle cx="118" cy="98" r="4" fill="#a6d64b" />
          <path d="M82,128 C90,120 98,134 106,126 C112,120 116,128 120,126" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

/** The suspect polaroid: flips to reveal the culprit, then gets stamped. */
function Suspect() {
  return (
    <div className="relative [perspective:900px]">
      <div data-polaroid className="relative [transform-style:preserve-3d]">
        <div className="bg-white [backface-visibility:hidden]" style={{ padding: `${u(1.2)} ${u(1.2)} ${u(3.2)}`, boxShadow: `${u(0.8)} ${u(0.8)} 0 ${INK}` }}>
          <div className="aspect-square overflow-hidden">
            <GhostPhoto />
          </div>
          <p className="serif text-center text-acid-ink" style={{ marginTop: u(0.8), fontSize: u(2.2) }}>
            Suspeito nº 1
          </p>
        </div>
        <div
          className="absolute inset-0 bg-white [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ padding: `${u(1.2)} ${u(1.2)} ${u(3.2)}`, boxShadow: `${u(0.8)} ${u(0.8)} 0 ${INK}` }}
        >
          <div className="aspect-square overflow-hidden">
            <GhostPhoto unmasked />
          </div>
          <p className="serif text-center text-acid-ink" style={{ marginTop: u(0.8), fontSize: u(2.2) }}>
            Processo manual
          </p>
        </div>
      </div>
      <Pin color="#3cc6b4" />
      <div
        data-stamp
        className="pointer-events-none absolute top-[84%] left-[62%] z-10 -translate-x-1/2 -rotate-12 border-[#d7263d] bg-white/30 font-mono font-bold whitespace-nowrap text-[#d7263d] opacity-0"
        style={{ borderWidth: u(0.5), borderRadius: u(0.6), padding: `${u(0.4)} ${u(1.4)}`, fontSize: u(2.6) }}
      >
        CASO ENCERRADO
      </div>
    </div>
  );
}

function Board() {
  return (
    <div
      data-board
      className="@container toon relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#b98a5a] [--u:1cqw]"
      style={corkStyle}
    >
      <div className="pointer-events-none absolute inset-0 z-[8] rounded-xl shadow-[inset_0_0_0_10px_#6b3f1f,inset_0_0_0_13px_#140a26,inset_0_0_40px_rgb(0_0_0/0.45)]" />

      <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {boardLayout.map((e) => (
          <path
            key={e.id}
            data-string
            d={`M${e.pin.x},${e.pin.y} Q${(e.pin.x + SUSPECT.x) / 2},${Math.max(e.pin.y, SUSPECT.y) + 8} ${SUSPECT.x},${SUSPECT.y}`}
            pathLength={1}
            fill="none"
            stroke="#d7263d"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="1"
            strokeDashoffset="1"
            opacity="0"
          />
        ))}
      </svg>

      {boardLayout.map((e) => (
        <div key={e.id} data-evidence className={`absolute z-[2] ${e.box}`} style={{ rotate: `${e.rot}deg` }}>
          {/* hanging from its pin: brushing the pointer past an evidence card sets it swinging */}
          <div className="evidence-swing">
            <Pin />
            {evidenceBodies[e.id].body}
          </div>
        </div>
      ))}

      <div className="absolute top-[12%] left-1/2 z-[3] w-[30%] -translate-x-1/2">
        <Suspect />
      </div>
    </div>
  );
}

const copy = {
  intro: {
    kicker: '(III) Caso em aberto',
    title: 'O Caso do Sistema Assombrado',
    body: 'Toda empresa tem um fantasma. Ele some com aprovações, duplica cadastros e aparece toda sexta-feira às 17h.',
  },
  investigating: {
    kicker: 'Investigação em andamento',
    title: 'Ligamos os pontos.',
    body: 'Conversamos com quem convive com o problema, lemos os dados e seguimos cada pista até a origem.',
  },
  closed: {
    kicker: 'Caso encerrado',
    title: 'Era o processo manual o tempo todo.',
    body: 'Todo fantasma tem um processo escondido debaixo do lençol. A gente tira o lençol e entrega o sistema.',
  },
};

function CaseCta() {
  return (
    <a
      href="#contato"
      data-cursor="Abrir"
      className="toon-sm toon-press mt-6 inline-flex items-center gap-3 rounded-full bg-groovy px-6 py-3 font-medium text-acid-ink"
    >
      Abra o seu caso →
    </a>
  );
}

/** Phones and tablets: a vertical case file, read at a natural scroll. */
function MobileFile() {
  return (
    <div data-mob className="gutter relative pt-28 pb-20 lg:hidden">
      <span className="label !text-teal">{copy.intro.kicker}</span>
      {/* The desktop board already renders the real <h2>; this copy is display:none
          there, so it is exposed as a heading to assistive tech without a duplicate h2 tag. */}
      <p
        role="heading"
        aria-level={2}
        className="font-groovy mt-3 text-[clamp(2.4rem,10vw,3.6rem)] leading-[0.95] text-groovy [text-shadow:3px_3px_0_#140a26]"
      >
        {copy.intro.title}
      </p>
      <p className="mt-4 text-lg leading-relaxed text-ink/75">{copy.intro.body}</p>

      {/* the evidence, pinned down a strip of cork and stitched with red thread */}
      <div className="toon relative mt-10 overflow-hidden rounded-2xl bg-[#b98a5a] px-4 py-10 [--u:clamp(8.5px,2.6vw,12px)]" style={corkStyle}>
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_0_7px_#6b3f1f,inset_0_0_0_9px_#140a26,inset_0_0_30px_rgb(0_0_0/0.4)]" />
        <span className="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 bg-[#d7263d]/25" aria-hidden />
        <span data-thread className="absolute top-0 bottom-0 left-1/2 w-[3px] origin-top -translate-x-1/2 scale-y-0 bg-[#d7263d]" aria-hidden />

        <ol className="relative flex flex-col gap-9">
          {mobileLayout.map((e, i) => (
            <li
              key={e.id}
              data-mob-evidence={e.side}
              className={`relative ${e.width} ${e.side === 'start' ? 'self-start' : 'self-end'}`}
              style={{ rotate: `${e.rot}deg` }}
            >
              <span
                className={`toon-sm mb-3 inline-block rounded-full bg-paper px-2.5 py-0.5 font-mono text-[0.62rem] font-bold whitespace-nowrap text-acid-ink uppercase ${
                  e.side === 'end' ? 'float-right' : ''
                }`}
              >
                Evidência {String(i + 1).padStart(2, '0')} · {evidenceBodies[e.id].label}
              </span>
              <div className="relative clear-both">
                <Pin />
                {evidenceBodies[e.id].body}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-14">
        <span className="label !text-teal">{copy.investigating.kicker}</span>
        <h3 className="font-groovy mt-3 text-[clamp(2rem,8vw,3rem)] leading-[0.95] text-teal [text-shadow:3px_3px_0_#140a26]">
          {copy.investigating.title}
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-ink/75">{copy.investigating.body}</p>
      </div>

      <div data-mob-suspect className="mx-auto mt-12 w-[78%] max-w-[340px] [--u:clamp(9px,2.8vw,13px)]">
        <Suspect />
      </div>

      <div data-mob-closed className="mt-16">
        <span className="label !text-teal">{copy.closed.kicker}</span>
        <h3 className="font-groovy mt-3 text-[clamp(2.2rem,9vw,3.4rem)] leading-[0.95] text-acid [text-shadow:3px_3px_0_#140a26]">
          {copy.closed.title}
        </h3>
        <p className="serif mt-4 text-xl text-ink/80">{copy.closed.body}</p>
        <CaseCta />
      </div>
    </div>
  );
}

export default function Mystery() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // desktop: pinned board, scrubbed story
      mm.add(
        {
          desk: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          deskReduced: '(min-width: 1024px) and (prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const reduce = ctx.conditions?.deskReduced;
          const q = (s: string) => `[data-desk] ${s}`;
          const tl = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: reduce ? undefined : { trigger: '[data-desk]', start: 'top top', end: '+=260%', pin: true, scrub: 0.6 },
          });
          tl.from(q('[data-evidence]'), { scale: 0.6, y: -30, autoAlpha: 0, ease: 'back.out(2)', stagger: 0.12, duration: 0.3 }, 0.05)
            .to(q('[data-stage="1"]'), { autoAlpha: 0, y: -30, duration: 0.3 }, 0.6)
            .fromTo(q('[data-stage="2"]'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 0.75)
            .set(q('[data-string]'), { opacity: 1 }, 0.79)
            .to(q('[data-string]'), { strokeDashoffset: 0, duration: 0.35, stagger: 0.12 }, 0.8)
            .to(q('[data-polaroid]'), { rotation: 3, duration: 0.05, repeat: 5, yoyo: true }, 1.45)
            .to(q('[data-polaroid]'), { rotationY: 180, duration: 0.45, ease: 'power2.inOut' }, 1.65)
            .to(q('[data-dark]'), { opacity: 0, duration: 0.4 }, 1.7)
            .to(q('[data-stage="2"]'), { autoAlpha: 0, y: -30, duration: 0.3 }, 1.7)
            .fromTo(q('[data-stage="3"]'), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, 2.0)
            .fromTo(q('[data-stamp]'), { opacity: 0, scale: 2.4 }, { opacity: 0.92, scale: 1, duration: 0.15, ease: 'power4.in' }, 2.1)
            .fromTo(q('[data-board]'), { x: 0 }, { x: 6, duration: 0.03, repeat: 3, yoyo: true }, 2.25)
            .to({}, { duration: 0.4 });
          if (reduce) tl.progress(1);
        },
      );

      // mobile: free scroll, each beat triggered as it enters the screen
      mm.add(
        {
          mob: '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
          mobReduced: '(max-width: 1023px) and (prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const m = (s: string) => `[data-mob] ${s}`;
          if (ctx.conditions?.mobReduced) {
            gsap.set(m('[data-thread]'), { scaleY: 1 });
            gsap.set(m('[data-polaroid]'), { rotationY: 180 });
            gsap.set(m('[data-stamp]'), { opacity: 0.92 });
            return;
          }

          gsap.utils.toArray<HTMLElement>(m('[data-mob-evidence]')).forEach((card) => {
            const fromLeft = card.dataset.mobEvidence === 'start';
            gsap.from(card, {
              x: fromLeft ? -60 : 60,
              y: -24,
              autoAlpha: 0,
              rotate: fromLeft ? -10 : 10,
              duration: 0.7,
              ease: 'back.out(1.8)',
              scrollTrigger: { trigger: card, start: 'top 85%' },
            });
          });

          gsap.to(m('[data-thread]'), {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: m('ol'), start: 'top 70%', end: 'bottom 60%', scrub: 0.4 },
          });

          gsap
            .timeline({ scrollTrigger: { trigger: m('[data-mob-suspect]'), start: 'top 62%' } })
            .to(m('[data-polaroid]'), { rotation: 3, duration: 0.06, repeat: 5, yoyo: true })
            .to(m('[data-polaroid]'), { rotation: 0, rotationY: 180, duration: 0.7, ease: 'power2.inOut' })
            .fromTo(m('[data-stamp]'), { opacity: 0, scale: 2.4 }, { opacity: 0.92, scale: 1, duration: 0.22, ease: 'power4.in' }, '+=0.1')
            .fromTo(m('[data-mob-suspect]'), { x: 0 }, { x: 5, duration: 0.04, repeat: 3, yoyo: true });

          gsap.from(m('[data-mob-closed] > *'), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: { trigger: m('[data-mob-closed]'), start: 'top 80%' },
          });
        },
      );
    },
    { scope: root },
  );

  // flashlight (desktop only): the board stays dark except where the reader points
  useEffect(() => {
    const el = root.current;
    const dark = el?.querySelector<HTMLElement>('[data-dark]');
    if (!el || !dark || !window.matchMedia('(min-width: 1024px) and (hover: hover)').matches) return;
    const set = (x: number, y: number) => {
      dark.style.setProperty('--fx', `${x}px`);
      dark.style.setProperty('--fy', `${y}px`);
    };
    const r0 = dark.getBoundingClientRect();
    const pos = { x: r0.width * 0.62, y: r0.height * 0.45 };
    set(pos.x, pos.y);
    const xTo = gsap.quickTo(pos, 'x', { duration: 0.35, ease: 'power3', onUpdate: () => set(pos.x, pos.y) });
    const yTo = gsap.quickTo(pos, 'y', { duration: 0.35, ease: 'power3', onUpdate: () => set(pos.x, pos.y) });
    const onMove = (e: PointerEvent) => {
      const r = dark.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    el.addEventListener('pointermove', onMove);
    return () => el.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <section ref={root} id="caso" className="sky relative z-20 -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon text-ink">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.5)_1px,transparent_1.5px)] bg-[length:90px_90px] opacity-30" />
      <div
        className="tape absolute top-14 -left-10 z-[16] w-[130%] -rotate-[3deg] py-1.5 font-mono text-xs font-bold tracking-[0.25em] whitespace-nowrap uppercase lg:top-8"
        aria-hidden
      >
        {'Cena do crime · não ultrapasse · '.repeat(12)}
      </div>

      {/* desktop */}
      <div data-desk className="relative hidden h-[100svh] min-h-[640px] lg:block">
        <div
          data-dark
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[15] bg-[radial-gradient(circle_at_var(--fx,60%)_var(--fy,45%),transparent_0,transparent_150px,rgb(10_6_24/0.5)_230px,rgb(10_6_24/0.86)_380px)] motion-reduce:hidden"
        />
        <div className="gutter relative grid h-full grid-cols-12 items-center gap-12">
          <div className="col-span-7 col-start-6 row-start-1">
            <Board />
          </div>
          <div className="relative z-[16] col-span-5 col-start-1 row-start-1 min-h-[440px]">
            {(['intro', 'investigating', 'closed'] as const).map((k, i) => (
              <div
                key={k}
                data-stage={i + 1}
                className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${i ? 'invisible opacity-0' : ''}`}
              >
                <span className="label !text-teal">{copy[k].kicker}</span>
                {i === 0 ? (
                  <h2 className="font-groovy mt-3 text-[clamp(2.1rem,4.8vw,4.8rem)] leading-[0.95] text-groovy [text-shadow:4px_4px_0_#140a26]">
                    {copy[k].title}
                  </h2>
                ) : (
                  <p
                    className={`font-groovy mt-3 text-[clamp(2.1rem,4.8vw,4.8rem)] leading-[0.95] [text-shadow:4px_4px_0_#140a26] ${
                      i === 1 ? 'text-teal' : 'text-acid'
                    }`}
                  >
                    {copy[k].title}
                  </p>
                )}
                <p className={`mt-4 max-w-md ${i === 2 ? 'serif text-2xl text-ink/80' : 'text-lg leading-relaxed text-ink/75'}`}>{copy[k].body}</p>
                {i === 2 && <CaseCta />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* phones and tablets */}
      <MobileFile />
    </section>
  );
}
