import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import { site, whatsappLink } from '@/lib/site';
import { services } from '@/lib/services';
import NewTab from '@/components/NewTab';
import ShareCase from '@/components/ShareCase';
import InstallApp from '@/components/InstallApp';

const description = 'Todos os caminhos da HenaWeb num lugar só: WhatsApp, e-mail, serviços, casos resolvidos e redes.';

export const metadata: Metadata = {
  title: 'Links',
  description,
  alternates: { canonical: '/links' },
  // a hub for the social bios: it repeats the site's own links, so it stays out of search results
  robots: { index: false, follow: true },
  openGraph: { type: 'website', url: '/links', title: 'Links · HenaWeb', description, locale: 'pt_BR', siteName: 'HenaWeb' },
};

const big = 'toon toon-press flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-left font-medium text-acid-ink';

/**
 * /links: the "link in bio" page for Instagram and LinkedIn. A phone-first Win95 window with the studio's
 * ways in, built from the same data as the rest of the site (contact details, services, socials), so it never
 * drifts. Clicks are tagged data-placement="links" for the conversion tracking.
 */
export default function Links() {
  // each button drops into place one after another once the opening curtain lifts, like windows cascading open
  let k = 0;
  const pop = () => ({ className: 'links-pop', style: { '--i': k++ } as CSSProperties });
  return (
    <main id="conteudo" tabIndex={-1} data-placement="links" className="sky relative min-h-[100svh] overflow-x-clip text-ink">
      <noscript>
        <style>{'.links-pop{opacity:1!important;animation:none!important}'}</style>
      </noscript>
      <div className="grid-floor !h-[26%] opacity-50" aria-hidden />
      <div className="relative mx-auto w-[min(100%-2rem,28rem)] pt-28 pb-20">
        <div className="win">
          <div className="win-bar">
            <span aria-hidden>atalhos.exe</span>
          </div>
          <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-5 text-acid-ink">
            <p className="label !text-[#c2410c]">HenaWeb · {site.city}</p>
            <h1 className="mt-2 text-3xl leading-tight font-medium tracking-tight">
              Studio de engenharia de <span className="font-groovy tracking-normal text-[#c2410c]">software.</span>
            </h1>
            <p className="mt-2 text-sm text-acid-ink/75">Sistemas sob medida, setor público, automação com IA e sites.</p>

            <ul className="mt-6 flex flex-col gap-3">
              <li {...pop()}>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${big} bg-[#25d366]`}>
                  Conversar no WhatsApp <span aria-hidden>↗</span>
                  <NewTab />
                </a>
              </li>
              <li {...pop()}>
                <a href="/#contato" className={`${big} bg-acid`}>
                  Abrir um caso <span aria-hidden>→</span>
                </a>
              </li>
              <li {...pop()}>
                <a href={`mailto:${site.email}`} className={`${big} bg-white`}>
                  <span className="truncate">{site.email}</span> <span aria-hidden>✉</span>
                </a>
              </li>
            </ul>

            <p className="label mt-8 !text-acid-ink/70">Serviços</p>
            <ul className="mt-3 grid grid-cols-2 gap-2.5">
              {services.map((s) => (
                <li key={s.slug} {...pop()}>
                  <a href={`/servicos/${s.slug}`} className="toon-sm toon-press flex h-full min-h-12 items-center rounded-xl bg-white px-3 py-2 text-sm font-medium">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>

            <p className="label mt-8 !text-acid-ink/70">Mais</p>
            <ul className="mt-3 flex flex-col gap-2.5">
              <li {...pop()}>
                <a href="/casos" className="toon-sm toon-press flex min-h-12 items-center justify-between rounded-xl bg-white px-4 text-sm font-medium">
                  Casos resolvidos <span aria-hidden>→</span>
                </a>
              </li>
              <li {...pop()}>
                <a href="/henaweb.vcf" className="toon-sm toon-press flex min-h-12 items-center justify-between rounded-xl bg-white px-4 text-sm font-medium">
                  Salvar contato no celular <span aria-hidden>⤓</span>
                </a>
              </li>
              <li {...pop()}>
                <a href="/passatempo" className="toon-sm toon-press flex min-h-12 items-center justify-between rounded-xl bg-white px-4 text-sm font-medium">
                  Passa tempo (jogos) <span aria-hidden>🕹</span>
                </a>
              </li>
              {/* only where the browser offers installing (Chrome/Edge/Android): home-screen icon, offline pages, share sheet */}
              <InstallApp className="toon-sm toon-press flex min-h-12 items-center justify-between rounded-xl px-4 text-sm font-medium" />
            </ul>

            {/* most studios are found by word of mouth: one tap passes this page on (the phone's share sheet, or a
                copied link on a computer) */}
            <div className="mt-8 flex justify-center">
              <ShareCase
                title="HenaWeb · Studio de engenharia de software"
                text="Sistemas sob medida, setor público, automação com IA e sites."
                label="Indicar para alguém ↗"
                placement="links-share"
              />
            </div>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs" aria-label="Redes sociais">
              {site.social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="pen-link inline-block py-1">
                    {s.name}
                    <NewTab />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* the window's status bar, as in a 95 folder: how many shortcuts it holds and where it lives. The count is
              the buttons above (k, once they have all rendered) plus the social links, so it follows the data */}
          <p className="win-status" aria-hidden>
            <span>{k + site.social.length} atalhos</span>
            <span>{site.url.replace(/^https?:\/\//, '')}/links</span>
          </p>
        </div>
        {/* on a computer, the page is usually opened to pass on to a phone: a QR of the same address, beside the
            window (public/links-qr.svg encodes https://henaweb.com/links; regenerate it if the address changes) */}
        <figure className="win absolute top-28 left-[calc(100%+2.5rem)] hidden w-44 lg:block" data-print-hide>
          <div className="win-bar">
            <span aria-hidden>celular.exe</span>
          </div>
          <div className="m-1.5 border-2 border-[#7d7394] bg-white p-2">
            <img src="/links-qr.svg" alt="QR code para abrir henaweb.com/links no celular" width={160} height={160} className="block h-auto w-full" loading="lazy" />
          </div>
          <figcaption className="px-2 pb-2 text-center font-mono text-[0.65rem] leading-snug text-acid-ink">Aponte a câmera do celular</figcaption>
        </figure>
        <p className="mt-6 text-center font-mono text-xs text-ink/60">
          <a href="/" className="pen-link inline-block py-1">
            henaweb.com
          </a>
        </p>
      </div>
    </main>
  );
}
