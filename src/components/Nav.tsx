'use client';

import { useEffect, useRef, useState } from 'react';
import { nav } from '@/lib/site';
import { gsap, onReady, prefersReducedMotion } from '@/lib/gsap';
import Magnetic from './Magnetic';
import Social from './Social';

// the search (with its index of cases, services and FAQ) and the shortcuts help download the first time
// they open, with a plain import() rather than next/dynamic: a lazy component suspends, and React holds a
// revealed Suspense boundary back ~300 ms, so the first ⌘K took ~345 ms to appear (now ~75 ms)
type PaletteType = typeof import('./CommandPalette').default;
let paletteModule: Promise<PaletteType> | null = null;
const loadPalette = () => (paletteModule ??= import('./CommandPalette').then((m) => m.default));
type HelpType = typeof import('./ShortcutsHelp').default;
let helpModule: Promise<HelpType> | null = null;
const loadHelp = () => (helpModule ??= import('./ShortcutsHelp').then((m) => m.default));

export default function Nav() {
  const inner = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const toggleBtn = useRef<HTMLButtonElement>(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // which nav section the reader is in (home only); on /casos pages the "Casos" entry stays lit
  const [active, setActive] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const [CommandPalette, setCommandPalette] = useState<PaletteType | null>(null);
  const [help, setHelp] = useState(false);
  const [ShortcutsHelp, setShortcutsHelp] = useState<HelpType | null>(null);
  const [mac, setMac] = useState(true);
  // "?pista=…" (browser site search, app shortcut) opens the search already filled in
  const [initialQuery, setInitialQuery] = useState('');

  // q: the search box opens already filled in (a ?pista= link, a capability tag); plain opens start empty
  const openSearch = (q = '') => {
    setInitialQuery(q);
    loadPalette().then((C) => setCommandPalette(() => C));
    setOpen(false);
    setSearch(true);
  };

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    const url = new URL(location.href);
    const pista = url.searchParams.get('pista');
    if (pista !== null) {
      openSearch(pista.slice(0, 80));
      url.searchParams.delete('pista');
      history.replaceState(history.state, '', url.pathname + url.search + url.hash);
    }
    // "g" then a letter jumps somewhere, like a mail client's go-to keys: g h home, g c cases, g j games,
    // g o contact (open a case). The second key must come within a second; anything else cancels.
    const GO: Record<string, string> = { h: '/', c: '/casos', j: '/passatempo', o: '/#contato' };
    let goAt = 0;
    // ⌘K / Ctrl+K anywhere, or "/" when not typing in a field
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"]');
      if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey && !e.repeat && !document.querySelector('dialog[open]')) {
        const k = e.key.toLowerCase();
        if (goAt && e.timeStamp - goAt < 1000 && GO[k]) {
          goAt = 0;
          e.preventDefault();
          location.href = GO[k];
          return;
        }
        goAt = k === 'g' ? e.timeStamp : 0;
        // the case archive (/casos): j / k step through the case files on screen, Enter opens one
        if (k === 'j' || k === 'k') {
          const links = [...document.querySelectorAll<HTMLAnchorElement>('li[data-case-slug]:not([hidden]) > a')].filter((a) => a.offsetParent);
          if (links.length) {
            e.preventDefault();
            const at = links.indexOf(document.activeElement as HTMLAnchorElement);
            const to = links[at < 0 ? (k === 'j' ? 0 : links.length - 1) : Math.min(links.length - 1, Math.max(0, at + (k === 'j' ? 1 : -1)))];
            to.focus({ preventScroll: true });
            to.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          }
        }
      }
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        openSearch();
      } else if (e.key === '?' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey && !document.querySelector('dialog[open]')) {
        e.preventDefault();
        setOpen(false);
        loadHelp().then((C) => {
          setShortcutsHelp(() => C);
          setHelp(true);
        });
      }
    };
    window.addEventListener('keydown', onKey);
    // other components (the 404 page, the capability tags) can open the search with this event,
    // optionally carrying the words to search for in its detail
    const onSearchEvent = (e: Event) => openSearch(typeof (e as CustomEvent).detail === 'string' ? (e as CustomEvent<string>).detail.slice(0, 80) : '');
    window.addEventListener('hena:search', onSearchEvent);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hena:search', onSearchEvent);
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname.startsWith('/casos')) {
      setActive('/#projetos');
      return;
    }
    if (window.location.pathname.startsWith('/passatempo')) {
      setActive('/passatempo');
      return;
    }
    if (window.location.pathname !== '/') return;
    // "Contato" only exists in the phone menu, but it lights up there too
    const sections = [...nav, { href: '/#contato' }]
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
    // reduced motion: the bar is simply there instead of sliding down
    const off = prefersReducedMotion()
      ? () => {}
      : onReady(() => gsap.from(inner.current, { yPercent: -120, duration: 1.1, ease: 'expo.out', delay: 0.5 }));
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
          <nav className="hidden items-center gap-5 lg:flex xl:gap-8" aria-label="Principal">
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
                    active === item.href ? 'origin-left scale-x-100' : 'origin-right scale-x-0 group-hover:origin-left group-focus-visible:origin-left group-hover:scale-x-100 group-focus-visible:scale-x-100'
                  }`}
                />
              </a>
            ))}
            {/* the side projects get their own door, set apart from the studio's sections: a small arcade token */}
            <a
              href="/passatempo"
              aria-current={active === '/passatempo' ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 rounded-full border-2 px-2.5 py-1 text-sm whitespace-nowrap xl:px-3 transition-colors duration-300 ${
                active === '/passatempo'
                  ? 'border-acid bg-acid text-acid-ink'
                  : 'border-acid/60 text-acid hover:border-acid hover:bg-acid hover:text-acid-ink focus-visible:bg-acid focus-visible:text-acid-ink'
              }`}
            >
              <span aria-hidden>🕹</span>
              Passa tempo
            </a>
          </nav>
          <div className="ml-auto mr-4 hidden items-center gap-4 md:flex lg:mr-0 lg:ml-0">
            <button
              type="button"
              onClick={() => openSearch()}
              aria-label="Buscar no site"
              aria-keyshortcuts="Meta+K Control+K /"
              className="hidden items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-xs whitespace-nowrap xl:flex text-ink/70 transition-colors hover:border-acid hover:text-acid"
            >
              <span aria-hidden>🔎</span>
              {/* fixed 6ch: the server renders "⌘K" and Windows/Linux swap in the wider "Ctrl K" after hydration,
                  which used to push the whole menu sideways (layout shift 0.039 on desktop) */}
              <kbd className="inline-block w-[6ch] text-center font-mono">{mac ? '⌘K' : 'Ctrl K'}</kbd>
            </button>
            <Magnetic>
              <a
                href="/#contato"
                className="toon-sm toon-press flex items-center gap-2 rounded-full bg-acid px-5 py-2.5 text-sm font-medium text-acid-ink"
              >
                <span className="h-1.5 w-1.5 animate-[blink_1.4s_infinite] rounded-full bg-acid-ink" />
                Abrir um caso
              </a>
            </Magnetic>
          </div>
          <button
            ref={toggleBtn}
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
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
        // on a short screen (a 375×667 phone under the browser's bars, any phone held sideways) seven 2.25rem links
        // and the footer row are taller than the window: pinned to the bottom with justify-end, the first ones sat
        // above the screen, out of reach. Now the list still rests at the bottom (mt-auto) but starts below the
        // header and the curtain scrolls on its own (data-lenis-prevent: the smooth scroller leaves it alone)
        data-lenis-prevent
        className={`gutter fixed inset-0 z-40 flex flex-col overflow-y-auto overscroll-contain bg-bg pt-24 pb-10 transition-[clip-path] duration-700 ease-[var(--ease-out-expo)] lg:hidden ${
          open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <nav className="mt-auto flex flex-col gap-2 [@media(max-height:640px)]:gap-0" aria-label="Menu mobile">
          {[...nav, { label: 'Contato', href: '/#contato' }, { label: 'Passa tempo', href: '/passatempo' }].map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active === item.href ? 'location' : undefined}
              // the links rise into place one after another behind the curtain wipe (closing: all at once)
              style={{ transitionDelay: open ? `${180 + i * 55}ms` : '0ms' }}
              className={`flex items-baseline gap-4 border-b border-line py-3 text-4xl font-medium tracking-tight [@media(max-height:640px)]:py-2 [@media(max-height:640px)]:text-3xl transition-[translate,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              } ${active === item.href ? 'text-acid' : ''}`}
            >
              <span className="label">0{i + 1}</span>
              {item.label}
              {/* the side projects stand apart from the studio's sections with their own tag, not with the
                  orange that marks the page you're on (two orange items read as two "you are here") */}
              {item.href === '/passatempo' && active !== item.href && (
                <span className="ml-auto shrink-0 self-center rounded-full border-2 border-acid/70 px-2 py-0.5 font-mono text-xs whitespace-nowrap text-acid" aria-hidden>
                  🕹 jogos
                </span>
              )}
              {active === item.href && (
                <span className="label ml-auto shrink-0 self-center whitespace-nowrap !text-acid" aria-hidden>
                  ● aqui
                </span>
              )}
            </a>
          ))}
        </nav>
        <div className="mt-8 flex items-center justify-between">
          <button type="button" onClick={() => openSearch()} className="label flex min-h-11 items-center gap-2 !text-ink">
            <span aria-hidden>🔎</span> Procurar pista
          </button>
          <Social />
        </div>
      </div>
      {help && ShortcutsHelp && <ShortcutsHelp open={help} onClose={() => setHelp(false)} />}
      {CommandPalette && <CommandPalette
          open={search}
          initialQuery={initialQuery}
          onClose={() => {
            setSearch(false);
            setInitialQuery('');
          }}
        />}
    </>
  );
}
