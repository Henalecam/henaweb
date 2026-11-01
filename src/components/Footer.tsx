'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { nav, site, whatsappLink } from '@/lib/site';
import { projectLinks } from '@/lib/projectLinks';
import { serviceLinks } from '@/lib/serviceLinks';
import { CONSENT_OPEN } from '@/lib/consent';
import Clock from './Clock';
import Chase from './Chase';
import Social from './Social';
import CopyEmail from './CopyEmail';
import { RevealRead } from './ReadMarks';
import NewTab from './NewTab';

/** The footer's WhatsApp opens with a message about the page being read (same wording as the floating button). */
function footerMessage(path: string): string | undefined {
  const [, kind, slug] = path.match(/^\/(casos|servicos)\/([\w-]+)/) ?? [];
  const caseName = kind === 'casos' && projectLinks.find((x) => x.slug === slug)?.name;
  if (caseName) return `Olá! Vi o caso ${caseName} no site e quero algo parecido para a minha operação.`;
  const service = kind === 'servicos' && serviceLinks.find((x) => x.slug === slug)?.name;
  if (service) return `Olá! Quero conversar sobre ${service} com a HenaWeb.`;
}

const studioLinks = [...nav.filter((n) => n.label !== 'Casos'), { label: 'Perguntas', href: '/#perguntas' }, { label: 'Contato', href: '/#contato' }, { label: 'Passa tempo', href: '/passatempo' }];

// the last change to the site (next.config bakes the last commit's date in at build), in Curitiba's calendar
const UPDATED = process.env.NEXT_PUBLIC_UPDATED
  ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(new Date(process.env.NEXT_PUBLIC_UPDATED))
  : '';

export default function Footer() {
  const path = usePathname();
  const wordmark = useRef<HTMLDivElement>(null);

  // the wordmark is a keyboard for real keys too: typing H, E, N, A, W or B presses those letters, and
  // typing the whole name sends a wave across it (never while the visitor is typing in a field)
  useEffect(() => {
    let typed = '';
    const letters = (k: string) =>
      [...(wordmark.current?.children ?? [])].filter((el) => el.textContent?.toLowerCase() === k) as HTMLElement[];
    const onDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key.length !== 1) return;
      if ((e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
      const k = e.key.toLowerCase();
      letters(k).forEach((el) => el.setAttribute('data-key', ''));
      typed = (typed + k).slice(-7);
      if (typed === 'henaweb' && wordmark.current && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const box = wordmark.current;
        box.classList.remove('is-wave');
        void box.offsetWidth;
        box.classList.add('is-wave');
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.key.length === 1) letters(e.key.toLowerCase()).forEach((el) => el.removeAttribute('data-key'));
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  return (
    <footer data-sheet className="sky gutter relative z-50 -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon pt-20 pb-6">
      <div className="relative z-20 grid gap-12 lg:grid-cols-12">
        {/* who we are + the two ways to reach us */}
        <div className="lg:col-span-4">
          <p className="max-w-sm text-2xl leading-tight font-medium tracking-tight">
            Studio de engenharia de software para empresas e governos.{' '}
            <span className="font-groovy text-acid">Mistérios resolvidos sob medida.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(footerMessage(path))}
              target="_blank"
              rel="noopener noreferrer"
              className="toon-sm toon-press inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-medium text-acid-ink"
            >
              WhatsApp · {site.whatsappDisplay}
              <NewTab />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="toon-sm toon-press inline-flex items-center rounded-full bg-paper px-4 py-2.5 text-sm font-medium text-acid-ink"
            >
              {site.email}
            </a>
            <CopyEmail
              placement="footer"
              className="toon-sm toon-press inline-flex items-center rounded-full bg-paper px-3.5 py-2.5 font-mono text-xs text-acid-ink"
            />
            {/* the studio as a phone contact (WhatsApp, e-mail, site in one tap). On a desktop the file would
                land on the wrong device, so pointing at it shows a QR of the same address for the phone's camera
                (public/contato-qr.svg encodes https://henaweb.com/henaweb.vcf; regenerate it if that changes) */}
            <span className="group/qr relative inline-flex" data-print-hide>
              <a
                href="/henaweb.vcf"
                download
                className="toon-sm toon-press inline-flex items-center rounded-full bg-paper px-3.5 py-2.5 font-mono text-xs text-acid-ink"
              >
                <span aria-hidden>＋&nbsp;</span>salvar contato
              </a>
              <span
                aria-hidden
                className="win pointer-events-none absolute bottom-full left-1/2 z-10 mb-3 hidden w-40 -translate-x-1/2 translate-y-1 opacity-0 transition-[opacity,translate] duration-200 group-focus-within/qr:translate-y-0 group-focus-within/qr:opacity-100 group-hover/qr:translate-y-0 group-hover/qr:opacity-100 pointer-fine:block motion-reduce:transition-none"
              >
                <span className="win-bar">
                  <span>contato.qr</span>
                </span>
                <span className="m-1.5 block bg-paper p-2 text-center text-acid-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element -- a 6 KB static SVG, nothing to optimise */}
                  <img src="/contato-qr.svg" alt="" width={132} height={132} className="mx-auto block h-auto w-full" loading="lazy" />
                  <span className="mt-1.5 block font-mono text-[0.62rem] leading-snug">aponte a câmera do celular</span>
                </span>
              </span>
            </span>
          </div>
          <p className="mt-6 font-mono text-xs leading-relaxed text-ink/60">
            {site.city} · {site.coords}
            <br />
            Atendemos todo o Brasil e o exterior.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Social />
            <span className="label">@henaweb</span>
          </div>
        </div>

        {/* a little file tree, in keeping with the .exe windows: every page one click away */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
          <FooterColumn title="serviços/" count={serviceLinks.length}>
            {serviceLinks.map((x) => (
              <FooterLink key={x.slug} href={`/servicos/${x.slug}`}>
                {x.name}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="casos/" count={projectLinks.length}>
            {projectLinks.map((x) => (
              <FooterLink key={x.slug} href={`/casos/${x.slug}`}>
                {x.name}
                {/* cases this visitor already opened (hena:read), as on /casos and the home index */}
                <span data-read-mark={x.slug} hidden className="ml-1.5 font-mono text-[0.7rem] text-acid" title="Caso já lido">
                  ✓<span className="sr-only"> lido</span>
                </span>
                {/* a peek at the case: its screenshot pops beside the link on hover or keyboard focus (desktop pointers
                    only, globals.css data-case-thumb); lazy, so nothing loads until someone points at it */}
                {x.top && (
                  <span aria-hidden data-case-thumb>
                    {/* eslint-disable-next-line @next/next/no-img-element -- a pre-cropped static JPG shown at 240px */}
                    <img src={x.top} alt="" width={240} height={141} loading="lazy" decoding="async" />
                  </span>
                )}
              </FooterLink>
            ))}
            <FooterLink href="/casos" accent>
              Ver todos →
            </FooterLink>
          </FooterColumn>
          <FooterColumn title="studio/" count={studioLinks.length} className="col-span-2 sm:col-span-1" listClassName="grid grid-cols-2 gap-x-6 sm:flex">
            {studioLinks.map((n) => (
              <FooterLink key={n.href} href={n.href}>
                {n.label}
              </FooterLink>
            ))}
          </FooterColumn>
        </div>
      </div>

      <RevealRead />
      {/* the chase, full bleed */}
      <div className="relative -mx-[clamp(1rem,4vw,3.5rem)] mt-16 border-y-[3px] border-toon">
        <Chase />
      </div>

      <div className="relative">
        <div
          ref={wordmark}
          data-wordmark
          aria-hidden
          onAnimationEnd={(e) => e.currentTarget.lastElementChild === e.target && e.currentTarget.classList.remove('is-wave')}
          // the letter left of the pointed one dips too (globals.css); marked here instead of a costly :has()
          onPointerOver={(e) => {
            const box = e.currentTarget;
            box.querySelector('[data-near]')?.removeAttribute('data-near');
            const letter = (e.target as HTMLElement).closest('[data-wordmark] > span');
            letter?.previousElementSibling?.setAttribute('data-near', '');
          }}
          onPointerLeave={(e) => e.currentTarget.querySelector('[data-near]')?.removeAttribute('data-near')}
          className="relative z-10 flex justify-center overflow-hidden pt-2 pb-4 font-groovy text-[clamp(3rem,16vw,19rem)] leading-[0.9] select-none"
        >
          {'HenaWeb'.split('').map((c, i) => (
            <span key={i} className="chrome inline-block pr-[0.02em]" style={{ '--i': i } as React.CSSProperties}>
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* the two controls get a 3rem-tall hit area (WCAG 2.5.8) without moving the line */}
      <div className="label relative z-10 mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <span>
          © {new Date().getFullYear()} {site.legalName}
          {site.cnpj && <> · CNPJ {site.cnpj}</>}
          {UPDATED && (
            <>
              {' '}· atualizado em <time dateTime={process.env.NEXT_PUBLIC_UPDATED}>{UPDATED}</time>
            </>
          )}
        </span>
        <span>
          {site.city} · <Clock />
        </span>
        <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN))} className="label -my-3 py-3 hover:text-ink">
          Cookies
        </button>
        <BackToTop />
      </div>
    </footer>
  );
}

/**
 * "Back to top" also says how far up the top is, in screens ("· 19 telas"), measured when the link
 * comes into view; the arrow lifts on hover/focus. Same-page anchor: on a case or service page "/#topo"
 * sent the visitor to the home page.
 */
function BackToTop() {
  const el = useRef<HTMLAnchorElement>(null);
  const [screens, setScreens] = useState(0);

  useEffect(() => {
    const node = el.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setScreens(Math.round(window.scrollY / window.innerHeight));
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <a ref={el} href="#conteudo" className="group -my-3 py-3 hover:text-ink">
      Voltar ao topo{' '}
      <span aria-hidden className="inline-block transition-transform duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1">
        ↑
      </span>
      {/* the count arrives after the link is seen: its room is kept from the start so the footer line doesn't shift */}
      <span aria-hidden className="inline-block min-w-[9ch] text-left">
        {screens >= 2 ? ` · ${screens} telas` : ''}
      </span>
    </a>
  );
}

function FooterColumn({
  title,
  count,
  children,
  className = '',
  listClassName = 'flex',
}: {
  title: string;
  /** shown after the folder name, like a file manager's item count ("casos/ · 7") */
  count: number;
  children: React.ReactNode;
  className?: string;
  listClassName?: string;
}) {
  return (
    <nav aria-label={title.replace('/', '')} className={className}>
      <span className="label mb-4 block font-mono !text-teal">
        {title}
        <span aria-hidden className="ml-2 !text-ink/55">
          · {count} {count === 1 ? 'item' : 'itens'}
        </span>
      </span>
      <ul className={`flex-col gap-2.5 ${listClassName}`}>{children}</ul>
    </nav>
  );
}

function FooterLink({ href, children, accent = false }: { href: string; children: React.ReactNode; accent?: boolean }) {
  // the file tree marks the page you are on, like an open file in an editor
  const here = usePathname() === href;
  return (
    <li>
      <a
        href={href}
        aria-current={here ? 'page' : undefined}
        className={`group relative inline-flex items-baseline gap-2 transition-colors ${
          here ? 'font-medium text-ink' : accent ? 'font-medium text-acid' : 'text-ink/75 hover:text-ink'
        }`}
      >
        {/* the lists read as `tree` output under their folder ("casos/ · 7 itens"): ├─ for each entry, └─ for the
            last (globals.css, data-tree); the open page keeps its ● */}
        <span
          aria-hidden
          data-tree={here ? undefined : ''}
          className={`w-[2ch] shrink-0 font-mono text-xs transition-colors ${here ? 'text-acid' : 'text-ink/35 group-hover:text-acid group-focus-visible:text-acid'}`}
        >
          {here ? '●' : ''}
        </span>
        {/* one inline run: a name that wraps ("Sistemas / públicos") used to leave "(aberto)" stranded beside
            its first line; now the tag follows the last word */}
        <span>
          {/* short accent labels ("Ver todos →") stay whole; a narrow column breaks before the tag instead */}
          <span className={accent ? 'whitespace-nowrap' : ''}>{children}</span>
          {here && <span aria-hidden className="ml-2 inline-block font-mono text-[0.65rem] tracking-wide whitespace-nowrap text-ink/55">(aberto)</span>}
        </span>
      </a>
    </li>
  );
}
