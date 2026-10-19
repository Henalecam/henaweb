'use client';

import { useEffect, useRef, useState } from 'react';
import { nav } from '@/lib/content';
import { gsap, onReady } from '@/lib/gsap';
import Magnetic from './Magnetic';
import Social from './Social';

export default function Nav() {
  const inner = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const toggleBtn = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // which nav section the reader is in (home only); on /casos pages the "Casos" entry stays lit
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.pathname.startsWith('/casos')) {
      setActive('/#projetos');
      return;
    }
    if (window.location.pathname !== '/') return;
    const sections = nav
      .map((item) => ({ href: item.href, el: document.getElementById(item.href.split('#')[1]) }))
      .filter((s): s is { href: string; el: HTMLElement } => !!s.el);
    let raf = 0;
    const update = () => {
      raf = 0;
      // the section crossing a line 40% down the screen; sections outside the menu (the mystery,
      // FAQ, contact…) leave nothing lit
      const line = window.innerHeight * 0.4;
      const hit = sections.find(({ el }) => {
        const r = el.getBoundingClientRect();
        return r.top <= line && r.bottom > line;
      });
      setActive(hit ? hit.href : null);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 200 && y > last);
      setScrolled(y > 40);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const off = onReady(() =>
      gsap.from(inner.current, { yPercent: -120, duration: 1.1, ease: 'expo.out', delay: 0.5 }),
    );
    return () => {
      off();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    // lets other fixed UI (the floating WhatsApp button) step aside while the menu covers the screen
    if (open) document.documentElement.dataset.menu = 'open';
    else delete document.documentElement.dataset.menu;
    if (!open) return;
    // Esc closes the menu and hands focus back to the toggle
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      toggleBtn.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header
        className={`gutter fixed inset-x-0 top-0 z-50 [view-transition-name:site-header] transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          hidden && !open ? '-translate-y-full' : ''
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
            scrolled ? 'border-line bg-bg/75 backdrop-blur-xl' : 'border-transparent bg-transparent'
          }`}
        />
        <div ref={inner} className="flex h-20 items-center justify-between">
          <a href="/#topo" className="font-groovy flex items-baseline gap-1 text-2xl text-acid [text-shadow:3px_3px_0_#120626]" aria-label="HenaWeb, início">
            HenaWeb<span className="text-[0.6rem] align-super">®</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={active === item.href ? 'location' : undefined}
                className={`group relative text-sm transition-colors duration-300 ${active === item.href ? 'text-acid' : 'text-ink'}`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                    active === item.href ? 'origin-left scale-x-100' : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                  }`}
                />
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Magnetic>
              <a
                href="/#contato"
                className="toon-sm toon-press flex items-center gap-2 rounded-full bg-acid px-5 py-2.5 text-sm font-medium text-acid-ink"
              >
                <span className="h-1.5 w-1.5 animate-[blink_1.4s_infinite] rounded-full bg-acid-ink" />
                Iniciar projeto
              </a>
            </Magnetic>
          </div>
          <button
            ref={toggleBtn}
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`h-px w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        inert={!open}
        className={`gutter fixed inset-0 z-40 flex flex-col justify-end bg-bg pb-10 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] md:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="Menu mobile">
          {[...nav, { label: 'Contato', href: '/#contato' }].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.href ? 'location' : undefined}
              className={`flex items-baseline gap-4 border-b border-line py-3 text-4xl font-medium tracking-tight ${active === item.href ? 'text-acid' : ''}`}
            >
              <span className="label">0{i + 1}</span>
              {item.label}
              {active === item.href && (
                <span className="label ml-auto shrink-0 self-center whitespace-nowrap !text-acid" aria-hidden>
                  ● aqui
                </span>
              )}
            </a>
          ))}
        </nav>
        <div className="mt-8 flex items-center justify-between">
          <span className="label">@henaweb</span>
          <Social />
        </div>
      </div>
    </>
  );
}
