'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { projects, type Project } from '@/lib/content';
import MockUI from './MockUI';
import { RevealRead } from './ReadMarks';

const pad = (n: number) => String(n).padStart(2, '0');

/** Win95 window with the desktop capture and a phone overlapping its corner. */
function Screen({ p, tall = true, images = true }: { p: Project; tall?: boolean; images?: boolean }) {
  const host = new URL(p.href).hostname;
  return (
    <div className="relative h-full w-full">
      <div className="win absolute inset-0 flex flex-col">
        <div className="win-bar">
          <span className="truncate">{host}</span>
          <span className="ml-auto flex shrink-0 gap-1" aria-hidden>
            <span className="win-btn">_</span>
            <span className="win-btn">□</span>
            <span className="win-btn">×</span>
          </span>
        </div>
        <div className="relative m-1.5 min-h-0 flex-1 overflow-hidden border-2 border-[#7d7394] bg-acid-ink">
          {p.shot ? (
            images && (
              <Image
                src={p.shot.desktop}
                alt={`Captura de tela de ${p.name}`}
                fill
                sizes="(max-width: 1024px) 92vw, 58vw"
                className={`object-cover object-top ${
                  tall && p.shot.height > 1200 ? 'transition-[object-position] duration-[6000ms] ease-linear motion-safe:group-hover/screen:object-bottom motion-safe:group-focus-visible/screen:object-bottom' : ''
                }`}
              />
            )
          ) : (
            p.mock && <MockUI variant={p.mock.variant} hue={p.mock.hue} />
          )}
        </div>
      </div>
      {p.shot && images && (
        <div className="toon absolute -right-2 -bottom-5 aspect-[390/844] w-[22%] overflow-hidden rounded-[1.3rem] bg-black md:-right-4 md:w-[19%]">
          <Image src={p.shot.mobile} alt={`${p.name} no celular`} fill sizes="18vw" className="object-cover object-top" />
        </div>
      )}
    </div>
  );
}

function Story({ p }: { p: Project }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="toon-sm rounded-xl bg-paper p-4 text-acid-ink">
        <span className="font-groovy text-lg text-[#c2410c]">O mistério</span>
        <p className="mt-1 text-[0.95rem] leading-snug text-acid-ink/80">{p.challenge}</p>
      </div>
      <div className="toon-sm rounded-xl bg-lemon p-4 text-acid-ink">
        <span className="font-groovy text-lg text-[#1f6f63]">Caso resolvido</span>
        <p className="mt-1 text-[0.95rem] leading-snug text-acid-ink/85">{p.built}</p>
      </div>
    </div>
  );
}

export default function Work() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // two layouts share this section (tabs from lg up, swipeable cards below) and the hidden one used
  // to download its screenshots anyway; each layout's images mount only when it is the one on screen
  const [cards, setCards] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023.98px)');
    const sync = () => setCards(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const [paused, setPaused] = useState(false);
  // phones/tablets: which card of the swipe row is centred, for the dots under it
  const strip = useRef<HTMLOListElement>(null);
  const [card, setCard] = useState(0);
  const onStrip = () => {
    const ol = strip.current;
    if (!ol) return;
    const items = [...ol.children] as HTMLElement[];
    const mid = ol.scrollLeft + ol.clientWidth / 2;
    let best = 0;
    items.forEach((li, i) => {
      if (Math.abs(li.offsetLeft + li.offsetWidth / 2 - mid) < Math.abs(items[best].offsetLeft + items[best].offsetWidth / 2 - mid)) best = i;
    });
    setCard(best);
  };
  const goCard = (i: number) => {
    const li = strip.current?.children[i] as HTMLElement | undefined;
    li?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  };
  // an explicit stop (WCAG 2.2.2: content that changes by itself needs a way to stop it) and
  // whether the section is on screen at all: rotating off screen only burned GSAP tweens
  const [stopped, setStopped] = useState(false);
  const [inView, setInView] = useState(false);
  const p = projects[active];

  // WAI-ARIA tabs: arrows, Home and End move between projects (focusing a tab selects it)
  const onTabKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = projects.length - 1;
    const next = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = next < 0 ? last : next > last ? 0 : next;
    document.getElementById(`work-tab-${i}`)?.focus();
  };

  useGSAP(
    () => {
      // reduced motion: no entrance and no swap wipe (CSS reduced-motion can't stop GSAP tweens)
      if (prefersReducedMotion()) return;
      gsap.from('[data-work-in]', {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
    },
    { scope: root },
  );

  // a quick swap animation every time the exhibit changes
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    gsap.fromTo(
      el.querySelector('[data-exhibit]'),
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.55, ease: 'expo.out' },
    );
    gsap.fromTo(
      el.querySelectorAll('[data-exhibit-text] > *'),
      { y: 16, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.04, ease: 'expo.out' },
    );
  }, [active]);

  // slow autoplay on desktop while nobody is browsing
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const rotating = !paused && !stopped && inView;
  useEffect(() => {
    if (!rotating || window.matchMedia('(max-width: 1023px), (prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % projects.length), 6500);
    return () => clearInterval(id);
  }, [rotating]);

  return (
    <section ref={root} id="projetos" className="sky relative overflow-hidden border-t-[3px] border-toon py-[clamp(5rem,9vw,8rem)]">
      <div className="grid-floor !h-[22%] opacity-40" aria-hidden />

      <div className="gutter relative">
        <div data-work-in className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label">(V) Arquivo de casos resolvidos</span>
            <h2 className="mt-5 text-[clamp(2.6rem,5.6vw,6rem)] leading-[0.9] font-medium tracking-[-0.05em]">
              {pad(projects.length)} casos{' '}
              <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">resolvidos.</span>
            </h2>
          </div>
          <div className="max-w-md md:col-span-5">
            <p className="text-lg leading-relaxed text-ink/70">
              Cada projeto começou com um mistério na operação de alguém. Escolha um caso e veja o que encontramos e o
              que construímos.
            </p>
            <a href="/casos" className="mt-4 inline-block font-medium text-acid underline-offset-4 hover:underline">
              Ver o arquivo completo →
            </a>
          </div>
        </div>

        {/* desktop: index + viewer */}
        <div
          className="mt-14 hidden gap-10 lg:grid lg:grid-cols-12"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
        >
          <div className="lg:col-span-4">
            <ol data-work-in className="flex flex-col" role="tablist" aria-label="Projetos">
              {projects.map((item, i) => {
                const on = i === active;
                return (
                  <li key={item.name} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`work-tab-${i}`}
                      aria-selected={on}
                      aria-controls="work-panel"
                      // roving focus: Tab enters the list once, arrows move between projects
                      tabIndex={on ? 0 : -1}
                      onKeyDown={onTabKey}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      className={`relative flex w-full items-baseline gap-4 border-b border-line py-3.5 text-left transition-colors ${
                        on ? 'text-ink' : 'text-ink/60 hover:text-ink/85'
                      }`}
                    >
                      <span className={`flex w-6 shrink-0 flex-col font-mono text-xs ${on ? 'text-acid' : ''}`}>
                        {pad(i + 1)}
                        {/* revealed by RevealRead for cases this visitor already opened */}
                        <span data-read-mark={item.slug} hidden className="text-acid" title="Caso já lido">
                          ✓<span className="sr-only"> lido</span>
                        </span>
                      </span>
                      <span className="flex-1">
                        <span className="block text-[clamp(1.5rem,2.3vw,2.25rem)] leading-none font-medium tracking-[-0.04em]">
                          {item.name}
                        </span>
                        <span className={`serif mt-1 block text-base transition-opacity ${on ? 'opacity-70' : 'opacity-0'}`}>{item.kind}</span>
                      </span>
                      <span
                        className={`toon-sm flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-acid text-acid-ink transition-all ${
                          on ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                        }`}
                        aria-hidden
                      >
                        →
                      </span>
                      {on && rotating && (
                        <span key={active} className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left animate-[progress_6.5s_linear] bg-acid" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
            <button
              type="button"
              data-print-hide
              onClick={() => setStopped((v) => !v)}
              className="label mt-4 inline-flex min-h-8 items-center gap-2 rounded-full !text-ink/70 transition-colors hover:!text-ink motion-reduce:hidden"
            >
              <span aria-hidden>{stopped ? '▶' : '❚❚'}</span>
              {stopped ? 'Retomar a troca automática' : 'Pausar a troca automática'}
            </button>
          </div>

          <div className="lg:col-span-8" role="tabpanel" id="work-panel" aria-labelledby={`work-tab-${active}`}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visitar"
              className="group/screen block aspect-[16/9.4]"
            >
              <div data-exhibit className="h-full">
                <Screen p={p} images={cards === false} />
              </div>
            </a>
            <div data-exhibit-text className="mt-10 grid gap-5 xl:grid-cols-[1fr_auto] xl:items-start">
              <div className="flex flex-col gap-4">
                <Story p={p} />
                <ul className="flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="rounded-full border-2 border-ink/30 px-2.5 py-0.5 font-mono text-[0.62rem] text-ink/75 uppercase">
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="toon toon-press inline-flex w-fit items-center gap-2 rounded-full bg-acid px-5 py-3 font-medium text-acid-ink"
              >
                Visitar {p.name} ↗
              </a>
              <a
                href={`/casos/${p.slug}`}
                className="toon toon-press inline-flex w-fit items-center gap-2 rounded-full bg-paper px-5 py-3 font-medium text-acid-ink"
              >
                Ver caso completo →
              </a>
            </div>
          </div>
        </div>

        {/* mobile / tablet: swipeable cards */}
        <div className="-mx-[clamp(1rem,4vw,3.5rem)] mt-12 lg:hidden">
          <ol ref={strip} onScroll={onStrip} className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-10 [scrollbar-width:none]">
            {projects.map((item, i) => (
              <li key={item.name} className="w-[86%] shrink-0 snap-center sm:w-[70%]">
                {/* the screenshot opens the case page, like the link below it, instead of leaving for the client's site */}
                {/* same target as "Ver caso completo" below: hidden from screen readers and the tab order so it isn't announced twice */}
                <a href={`/casos/${item.slug}`} aria-hidden tabIndex={-1} className="block aspect-[16/10.5]">
                  <Screen p={item} tall={false} images={cards === true} />
                </a>
                <div className="mt-8 flex flex-col gap-3">
                  <span className="font-mono text-xs text-acid">
                    {pad(i + 1)} / {pad(projects.length)}
                    <span data-read-mark={item.slug} hidden className="ml-3">
                      ✓ lido
                    </span>
                  </span>
                  <h3 className="text-3xl leading-none font-medium tracking-[-0.04em]">{item.name}</h3>
                  <span className="serif -mt-1 text-lg text-ink/60">{item.kind}</span>
                  <Story p={item} />
                  <a href={`/casos/${item.slug}`} className="mt-2 w-fit font-medium text-acid underline-offset-4 hover:underline">
                    Ver caso completo →
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-[clamp(1rem,4vw,3.5rem)]">
            <p className="label">{card === projects.length - 1 ? '← Último caso. Deslize para voltar' : 'Deslize para ver os outros casos →'}</p>
            {/* where you are in the row; each dot jumps to its case (24px targets, the dot itself is small) */}
            <div className="flex items-center" data-print-hide>
              {projects.map((item, i) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => goCard(i)}
                  aria-label={`Mostrar o caso ${item.name}`}
                  aria-current={i === card ? 'true' : undefined}
                  className="grid h-6 w-6 place-items-center"
                >
                  <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === card ? 'w-4 bg-acid' : 'w-1.5 bg-ink/55'}`} />
                </button>
              ))}
            </div>
          </div>
          <RevealRead />
        </div>
      </div>
    </section>
  );
}
