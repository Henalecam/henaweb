'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { process, stack } from '@/lib/content';
import type { BurgerScene } from '@/lib/burgerScene';
import Marquee from './Marquee';
import OrderTicket from './OrderTicket';

const INK = '#140a26';
const versions = ['v1.0', 'v1.1', 'v1.2', 'v2.0', 'v2.1', 'v3.0'];
const bursts = [
  { word: 'PLOFT!', x: 92, y: 420, fill: '#f9e27d', r: -10 },
  { word: 'SPLAT!', x: 508, y: 380, fill: '#3cc6b4', r: 8 },
  { word: 'CRUNCH!', x: 96, y: 300, fill: '#a6d64b', r: -6 },
  { word: 'TCHAN!', x: 504, y: 220, fill: '#f7931e', r: 10 },
  { word: 'DING!', x: 104, y: 400, fill: '#f9e27d', r: -12 },
];

const star = (cx: number, cy: number, R: number, r: number, n = 12) =>
  Array.from({ length: n * 2 }, (_, i) => {
    const a = (Math.PI * i) / n - Math.PI / 2;
    const rad = i % 2 ? r : R;
    return `${(cx + Math.cos(a) * rad).toFixed(1)},${(cy + Math.sin(a) * rad).toFixed(1)}`;
  }).join(' ');

/** Diner backdrop: neon sign, checkered counter, service bell and steam. The burger is 3D, on top. */
function DinerBack() {
  return (
    <svg viewBox="0 0 600 540" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      <defs>
        <pattern id="diner-check" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#fdf3e1" />
          <rect width="12" height="12" fill={INK} />
          <rect x="12" y="12" width="12" height="12" fill={INK} />
        </pattern>
        <filter id="neon" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g data-neon filter="url(#neon)">
        <rect x="120" y="8" width="360" height="74" rx="37" fill="none" stroke="#3cc6b4" strokeWidth="5" />
        <text x="300" y="56" textAnchor="middle" fontFamily="var(--font-shrikhand), Georgia, serif" fontSize="30" fill="#f7931e">
          Lanches &amp; Sistemas
        </text>
      </g>
      <text x="300" y="104" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="12" letterSpacing="4" fill="#8b5cc7">
        CARDÁPIO DO DIA · SISTEMA DA CASA
      </text>
      <g data-steam stroke="#a8a0c4" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0">
        <path d="M250,215 C235,195 265,180 250,160" />
        <path d="M300,205 C285,183 315,167 300,145" />
        <path d="M350,215 C335,195 365,180 350,160" />
      </g>
      <rect x="0" y="494" width="600" height="46" fill="url(#diner-check)" stroke={INK} strokeWidth="5" />
      <rect x="-6" y="482" width="612" height="16" rx="6" fill="#3cc6b4" stroke={INK} strokeWidth="5" />
      <g data-bell style={{ transformOrigin: '62px 478px', transformBox: 'view-box' }}>
        <rect x="32" y="474" width="60" height="8" rx="3" fill="#d8d2c4" stroke={INK} strokeWidth="4" />
        <path d="M38,474 C38,446 86,446 86,474 Z" fill="#f9e27d" stroke={INK} strokeWidth="4" />
        <circle cx="62" cy="444" r="5" fill="#f9e27d" stroke={INK} strokeWidth="3.5" />
      </g>
    </svg>
  );
}

function DinerFront() {
  return (
    <svg viewBox="0 0 600 540" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      {/* twinkling sparkles: the cartoon sign for "delicious" */}
      {[
        [150, 210, 16, 0],
        [470, 175, 20, 0.6],
        [500, 330, 13, 1.2],
        [120, 360, 12, 1.8],
        [440, 250, 9, 0.9],
      ].map(([x, y, r, delay]) => (
        <path
          key={`${x}-${y}`}
          className="sparkle"
          style={{ animationDelay: `${delay}s`, transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
          d={`M${x},${y - r} Q${x},${y} ${x + r},${y} Q${x},${y} ${x},${y + r} Q${x},${y} ${x - r},${y} Q${x},${y} ${x},${y - r} Z`}
          fill="#fff6c9"
          stroke={INK}
          strokeWidth="2.5"
        />
      ))}
      {bursts.map((b, i) => (
        <g key={b.word} data-burst={i} opacity="0" style={{ transformOrigin: `${b.x}px ${b.y}px`, transformBox: 'view-box' }}>
          <g transform={`rotate(${b.r} ${b.x} ${b.y})`}>
            <polygon points={star(b.x, b.y, 58, 40)} fill={b.fill} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
            <text x={b.x} y={b.y + 7} textAnchor="middle" fontFamily="var(--font-shrikhand), Georgia, serif" fontSize="19" fill={INK}>
              {b.word}
            </text>
          </g>
        </g>
      ))}
    </svg>
  );
}

export default function Process() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const scene = useRef<BurgerScene | null>(null);
  // scroll triggers can fire before the lazy 3D scene exists; they live here so the scene can catch up
  const layerTriggers = useRef<ScrollTrigger[]>([]);
  const versionTrigger = useRef<ScrollTrigger | null>(null);

  const versionAt = (p: number) => versions[Math.min(versions.length - 1, Math.floor(p * versions.length))];

  /** Bring the scene in line with wherever the reader already is on the page. */
  const syncScene = () => {
    const sc = scene.current;
    if (!sc) return;
    if (prefersReducedMotion()) {
      [0, 1, 2, 3].forEach((i) => sc.setLayer(i, 1));
      return;
    }
    layerTriggers.current.forEach((t, i) => sc.setLayer(i, t.progress));
    if (versionTrigger.current) sc.setVersion(versionAt(versionTrigger.current.progress));
  };

  // the 3D burger loads lazily, only when the section gets close
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || scene.current) return;
        io.disconnect();
        import('@/lib/burgerScene').then(({ createBurgerScene }) => {
          if (cancelled) return;
          try {
            scene.current = createBurgerScene(el, { reducedMotion: prefersReducedMotion() });
            ScrollTrigger.refresh();
            syncScene();
          } catch {
            // no WebGL: the menu still tells the story
          }
        });
      },
      { rootMargin: '600px 0px' },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
          stacked: '(max-width: 1023px)',
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            gsap.set('[data-steam]', { opacity: 1 });
            return;
          }
          // below lg the diner sticks to the top ~half of the screen, so a step is only readable once it
          // clears it: the layer, the highlight and the finale happen lower in the viewport there
          const stacked = !!ctx.conditions?.stacked;
          const at = { fillFrom: stacked ? 'top 95%' : 'top 80%', fillTo: stacked ? 'top 62%' : 'top 42%', activeTo: stacked ? 'bottom 62%' : 'bottom 55%' };

          gsap.fromTo(
            '[data-neon]',
            { opacity: 0.15 },
            {
              keyframes: { opacity: [0.15, 1, 0.3, 1, 0.6, 1] },
              duration: 1.2,
              ease: 'none',
              scrollTrigger: { trigger: root.current, start: 'top 60%' },
            },
          );

          layerTriggers.current = [];
          gsap.utils.toArray<HTMLElement>('[data-step]').forEach((step, i) => {
            layerTriggers.current[i] = ScrollTrigger.create({
              trigger: step,
              start: at.fillFrom,
              end: at.fillTo,
              // progress is read straight from the trigger, so fast scrolls and reloads land on the right frame
              onUpdate: (self) => scene.current?.setLayer(i, self.progress),
              onToggle: (self) => scene.current?.setLayer(i, self.progress),
              onRefresh: (self) => scene.current?.setLayer(i, self.progress),
            });
            const burst = root.current?.querySelector(`[data-burst="${i}"]`) ?? [];
            ScrollTrigger.create({
              trigger: step,
              start: at.fillTo,
              end: at.activeTo,
              toggleClass: { targets: step, className: 'is-active' },
              onEnter: () => {
                gsap
                  .timeline()
                  .fromTo(burst, { opacity: 1, scale: 0.2 }, { scale: 1, duration: 0.45, ease: 'back.out(3)' })
                  .to(burst, { opacity: 0, scale: 0.7, duration: 0.3 }, '+=0.7');
              },
            });
          });

          // order up: the bell rings and the burger does a happy wobble
          const ding = root.current?.querySelector('[data-burst="4"]') ?? [];
          const finale = gsap
            .timeline({ paused: true, delay: 0.3 })
            .to('[data-bell]', { rotation: 12, duration: 0.06, repeat: 5, yoyo: true, ease: 'none' })
            .add(() => scene.current?.celebrate(), '<')
            .fromTo(ding, { opacity: 1, scale: 0.2 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' }, '<')
            .to(ding, { opacity: 0, duration: 0.25 }, '+=0.6');

          const steps = root.current?.querySelectorAll('[data-step]');
          const last = steps?.[steps.length - 1];
          versionTrigger.current = ScrollTrigger.create({
            trigger: last,
            start: stacked ? 'top 55%' : 'top 35%',
            end: stacked ? 'bottom 50%' : 'bottom 15%',
            onEnter: () => {
              gsap.to('[data-steam]', { opacity: 1, duration: 0.6 });
              finale.restart();
            },
            onLeaveBack: () => {
              gsap.to('[data-steam]', { opacity: 0, duration: 0.4 });
              finale.pause(0);
            },
            onUpdate: (self) => scene.current?.setVersion(versionAt(self.progress)),
          });
          gsap.to('[data-steam] path', { y: -10, opacity: 0.4, duration: 1.4, repeat: -1, yoyo: true, stagger: 0.3, ease: 'sine.inOut' });

          gsap.fromTo(
            '[data-ticket]',
            // negative side insets keep the paper's hard shadow visible while it prints
            { clipPath: 'inset(0% -8% 100% -8%)', y: -30 },
            { clipPath: 'inset(0% -8% -8% -8%)', y: 0, duration: 1.4, ease: 'steps(14)', scrollTrigger: { trigger: '[data-ticket]', start: 'top 85%' } },
          );
        },
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="processo"
      className="paper relative z-10 -mt-8 rounded-t-[2rem] border-t-[3px] border-toon pt-[clamp(5rem,10vw,9rem)] text-bg"
    >
      <div className="gutter">
        <div className="grid gap-6 md:grid-cols-12">
          <span className="label !text-bg/55 md:col-span-3">(VI) Processo</span>
          <h2 className="text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.05em] md:col-span-9">
            Sem caixa-preta. Montamos seu sistema{' '}
            <span className="font-groovy text-[0.8em] tracking-normal text-[#c2410c]">camada por camada.</span>
          </h2>
        </div>

        <div className="relative mt-[clamp(2rem,6vw,5rem)] grid gap-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
          {/* below lg this wrapper bounds the sticky diner, so it lets go after the last step instead of
              sliding under the order ticket; on lg it dissolves and the diner spans the ticket row too */}
          <div className="grid gap-6 lg:contents">
            {/* sticky diner */}
            <div className="sticky top-16 z-10 h-[40svh] lg:row-span-2 lg:top-[10vh] lg:col-span-6 lg:h-[80vh]">
              <div className="toon relative mx-auto h-full max-w-[640px] overflow-hidden rounded-3xl bg-[#1e1442] p-[4%]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgb(60_198_180/0.25),transparent)]" />
                <DinerBack />
                <canvas ref={canvas} className="absolute inset-x-0 top-[12%] bottom-[8%] h-[80%] w-full" aria-hidden />
                <DinerFront />
              </div>
            </div>

            {/* steps */}
            <div className="lg:col-span-6">
              <ol data-steps className="relative">
                {process.map((s) => (
                  <li
                    key={s.n}
                    data-step
                    className="group/step flex min-h-[56svh] flex-col justify-center border-t-2 border-bg/10 py-10 opacity-75 transition-opacity duration-500 motion-reduce:opacity-100 [&.is-active]:opacity-100 lg:min-h-[70vh]"
                  >
                    {/* menu line: number, dish, dotted leader, "price" (the time it takes) */}
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 md:flex-nowrap md:gap-4">
                      <span className="font-groovy text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.8] text-bg/20 transition-colors group-[.is-active]/step:text-[#c2410c]">
                        {s.n}
                      </span>
                      <h3 className="text-[clamp(1.9rem,3.2vw,2.9rem)] leading-none font-medium tracking-[-0.04em]">{s.title}</h3>
                      <span className="mb-1.5 hidden min-w-6 flex-1 border-b-[3px] border-dotted border-bg/25 sm:block" aria-hidden />
                      <span className="toon-sm shrink-0 rounded-full bg-cyan px-3 py-0.5 font-mono text-[0.68rem] text-acid-ink uppercase ">
                        {s.time}
                      </span>
                    </div>
                    <p className="font-groovy mt-6 text-xl text-[#c2410c] md:text-2xl">{s.layer}</p>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-bg/70">{s.body}</p>
                    <div className="mt-5 flex max-w-xl flex-wrap items-center gap-2">
                      <span className="label !text-bg/50">Ingredientes</span>
                      {s.ingredients.map((ing) => (
                        <span key={ing} className="rounded-full border-2 border-bg/70 bg-paper px-3 py-0.5 text-sm text-bg">
                          {ing}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 flex max-w-xl flex-wrap items-baseline gap-x-3 gap-y-1 border-t-2 border-bg/10 pt-4">
                      <span className="label shrink-0 !text-bg/50">Você recebe</span>
                      <span className="serif text-xl">{s.deliverable}</span>
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* order ticket */}
          <div className="pb-24 lg:col-span-6 lg:col-start-7">
            <OrderTicket />
          </div>
        </div>
      </div>

      <div className="checker h-7 border-t-[3px] border-toon" aria-hidden />
      <div className="border-y-[3px] border-toon bg-acid py-8 text-acid-ink">
        <span className="sr-only">Tecnologias: {stack.join(', ')}</span>
        <Marquee
          speed={45}
          items={stack.map((s) => (
            <span key={s} className="text-[clamp(2rem,5vw,4.5rem)] font-medium tracking-[-0.04em]">
              {s}
            </span>
          ))}
          separator={<span className="font-groovy mx-8 text-[clamp(2rem,5vw,4.5rem)] text-lemon [text-shadow:3px_3px_0_#140a26]">✦</span>}
        />
      </div>
    </section>
  );
}
