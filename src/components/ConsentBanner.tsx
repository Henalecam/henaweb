'use client';

import { useEffect, useRef, useState } from 'react';
import { CONSENT_OPEN, readConsent, saveConsent, type Consent } from '@/lib/consent';

/**
 * Small, non-blocking cookie notice. Nothing is measured until the visitor accepts;
 * the footer can reopen it to change the choice.
 */
/**
 * "Aceitar" bites the title-bar cookie; a few crumbs fly off the bite and fall past the window with a little gravity.
 * They live in their own fixed layer on <body>, so they keep falling after the notice has slid away. Decorative,
 * pointer-transparent, gone after ~1 s; nothing with reduced motion.
 */
function crumbs(cookie: Element | null | undefined) {
  if (!cookie || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = cookie.getBoundingClientRect();
  // the bite is the cookie's top-right corner
  const x0 = r.right - r.width * 0.15;
  const y0 = r.top + r.height * 0.2;
  const layer = document.createElement('div');
  layer.setAttribute('aria-hidden', 'true');
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:80;overflow:hidden';
  document.body.append(layer);
  const anims: Animation[] = [];
  for (let i = 0; i < 7; i++) {
    const c = document.createElement('span');
    const size = 2 + Math.random() * 3;
    c.style.cssText = `position:absolute;left:${x0}px;top:${y0}px;width:${size}px;height:${size}px;border-radius:${Math.random() > 0.5 ? '50%' : '1px'};background:${i % 3 ? '#d9a05b' : '#3b2412'}`;
    layer.append(c);
    const dx = (Math.random() - 0.25) * 70;
    const up = 10 + Math.random() * 22;
    const fall = 90 + Math.random() * 120;
    anims.push(
      c.animate(
        [
          { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${dx * 0.45}px,${-up}px) rotate(${90 * Math.random()}deg)`, opacity: 1, offset: 0.3 },
          { transform: `translate(${dx}px,${fall}px) rotate(${200 + 160 * Math.random()}deg)`, opacity: 0 },
        ],
        { duration: 700 + Math.random() * 400, easing: 'cubic-bezier(.3,.1,.6,1)', delay: Math.random() * 60, fill: 'forwards' },
      ),
    );
  }
  Promise.all(anims.map((a) => a.finished)).finally(() => layer.remove());
}

export default function ConsentBanner({ tools }: { tools: string[] }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  // the title-bar cookie reacts to the answer as the window slides away: bitten for "Aceitar", left whole for "Recusar"
  const [bitten, setBitten] = useState(false);
  const box = useRef<HTMLElement>(null);

  // while the notice is up it covers the bottom of the screen (a fifth of a phone): Tab used to land on links
  // hidden right under it (36 of 76 on the home page at 390 px). The page's scroll padding grows by the
  // notice's height, so the browser scrolls each focused element above it (WCAG 2.4.11)
  useEffect(() => {
    const el = box.current;
    if (!shown || !el) return;
    const root = document.documentElement;
    const fit = () => {
      const r = el.getBoundingClientRect();
      root.style.scrollPaddingBottom = `${Math.ceil(innerHeight - r.top + 12)}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener('resize', fit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', fit);
      root.style.scrollPaddingBottom = '';
    };
  }, [shown]);

  useEffect(() => {
    // only once the visitor scrolls past the hero, so it never covers the first impression
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.6) return;
      window.removeEventListener('scroll', onScroll);
      setOpen(true);
    };
    if (!readConsent()) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(CONSENT_OPEN, reopen);
    };
  }, []);

  // mount first, then slide in on the next frame
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!open) return null;

  const choose = (c: Consent) => {
    setBitten(c === 'granted');
    if (c === 'granted') crumbs(box.current?.querySelector('[data-cookie]'));
    saveConsent(c);
    // the answer is saved at once; on "Aceitar" the window waits a beat so the bite is seen before it slides away
    const linger = c === 'granted' && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 280 : 0;
    setTimeout(() => setShown(false), linger);
    setTimeout(() => setOpen(false), linger + 300);
  };

  return (
    <section
      ref={box}
      data-print-hide
      aria-label="Cookies e medição"
      // while it slides in or out it is see-through: keep it out of the Tab order until it is really there
      inert={!shown}
      // phones: above the floating WhatsApp button
      className={`win fixed inset-x-4 z-[70] text-acid-ink transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none bottom-[calc(max(1rem,env(safe-area-inset-bottom))_+_3.75rem)] md:right-auto md:bottom-6 md:left-6 md:w-[24rem] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } [html[data-menu=open]_&]:hidden`}
    >
      <div className="win-bar">
        {/* a chocolate-chip cookie as the file's icon, drawn like the site's other toon bits; decorative */}
        <svg data-cookie={bitten ? 'bitten' : ''} viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden>
          <defs>
            <mask id="cookie-bite">
              <rect width="16" height="16" fill="#fff" />
              <circle className="cookie-bite" cx="15" cy="2.5" r="4.2" fill="#000" />
              <circle className="cookie-bite" cx="11.2" cy="0.4" r="2.6" fill="#000" />
            </mask>
          </defs>
          <g mask="url(#cookie-bite)">
            <circle cx="8" cy="8" r="6.6" fill="#d9a05b" stroke="#2a1608" strokeWidth="1.4" />
            <circle cx="5.6" cy="6" r="1.05" fill="#3b2412" />
            <circle cx="9.6" cy="5.2" r="0.9" fill="#3b2412" />
            <circle cx="10.4" cy="9.8" r="1.1" fill="#3b2412" />
            <circle cx="6.3" cy="10.4" r="0.85" fill="#3b2412" />
          </g>
        </svg>
        <span>COOKIES.TXT</span>
      </div>
      <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-3.5">
        <p className="text-[0.85rem] leading-snug">
          Usamos cookies de medição ({listPt(tools)}) para saber quais páginas ajudam quem nos procura. Nada é medido sem o seu
          ok.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => choose('granted')}
            className="toon-sm toon-press flex-1 rounded-full bg-acid px-4 py-1.5 text-sm font-medium"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            className="toon-sm toon-press flex-1 rounded-full bg-white px-4 py-1.5 text-sm font-medium"
          >
            Recusar
          </button>
        </div>
      </div>
    </section>
  );
}

const listPt = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs[xs.length - 1]}` : xs[0]);
