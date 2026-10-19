'use client';

import { usePathname } from 'next/navigation';
import { nav, site, whatsappLink } from '@/lib/site';
import { projectLinks } from '@/lib/projectLinks';
import { serviceLinks } from '@/lib/serviceLinks';
import { CONSENT_OPEN } from '@/lib/consent';
import Clock from './Clock';
import Chase from './Chase';
import Social from './Social';
import CopyEmail from './CopyEmail';

export default function Footer() {

  return (
    <footer className="sky gutter relative z-50 -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon pt-20 pb-6">
      <div className="relative z-20 grid gap-12 lg:grid-cols-12">
        {/* who we are + the two ways to reach us */}
        <div className="lg:col-span-4">
          <p className="max-w-sm text-2xl leading-tight font-medium tracking-tight">
            Studio de engenharia de software para empresas e governos.{' '}
            <span className="font-groovy text-acid">Mistérios resolvidos sob medida.</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="toon-sm toon-press inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-medium text-acid-ink"
            >
              WhatsApp · {site.whatsappDisplay}
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
          <FooterColumn title="serviços/">
            {serviceLinks.map((x) => (
              <FooterLink key={x.slug} href={`/servicos/${x.slug}`}>
                {x.name}
              </FooterLink>
            ))}
          </FooterColumn>
          <FooterColumn title="casos/">
            {projectLinks.map((x) => (
              <FooterLink key={x.slug} href={`/casos/${x.slug}`}>
                {x.name}
              </FooterLink>
            ))}
            <FooterLink href="/casos" accent>
              Ver todos →
            </FooterLink>
          </FooterColumn>
          <FooterColumn title="studio/" className="col-span-2 sm:col-span-1" listClassName="grid grid-cols-2 gap-x-6 sm:flex">
            {[...nav.filter((n) => n.label !== 'Casos'), { label: 'Perguntas', href: '/#perguntas' }, { label: 'Contato', href: '/#contato' }].map(
              (n) => (
                <FooterLink key={n.href} href={n.href}>
                  {n.label}
                </FooterLink>
              ),
            )}
          </FooterColumn>
        </div>
      </div>

      {/* the chase, full bleed */}
      <div className="relative -mx-[clamp(1rem,4vw,3.5rem)] mt-16 border-y-[3px] border-toon">
        <Chase />
      </div>

      <div className="relative">
        <div
          data-wordmark
          aria-hidden
          className="relative z-10 flex justify-center overflow-hidden pt-2 pb-4 font-groovy text-[clamp(3rem,16vw,19rem)] leading-[0.9] select-none"
        >
          {'HenaWeb'.split('').map((c, i) => (
            <span key={i} className="chrome inline-block pr-[0.02em]">
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
        </span>
        <span>
          {site.city} · <Clock />
        </span>
        <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN))} className="label -my-3 py-3 hover:text-ink">
          Cookies
        </button>
        {/* same-page anchor: on a case or service page "/#topo" sent the visitor to the home page */}
        <a href="#conteudo" className="-my-3 py-3 hover:text-ink">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
  className = '',
  listClassName = 'flex',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  listClassName?: string;
}) {
  return (
    <nav aria-label={title.replace('/', '')} className={className}>
      <span className="label mb-4 block font-mono !text-teal">{title}</span>
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
        className={`group inline-flex items-baseline gap-2 transition-colors ${
          here ? 'font-medium text-ink' : accent ? 'font-medium text-acid' : 'text-ink/75 hover:text-ink'
        }`}
      >
        {(!accent || here) && (
          <span aria-hidden className={`font-mono text-xs transition-colors ${here ? 'text-acid' : 'text-ink/30 group-hover:text-acid group-focus-visible:text-acid'}`}>
            {here ? '●' : '›'}
          </span>
        )}
        {children}
        {here && <span aria-hidden className="font-mono text-[0.65rem] tracking-wide text-ink/55">(aberto)</span>}
      </a>
    </li>
  );
}
