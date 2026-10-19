import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { services, serviceBySlug } from '@/lib/services';
import { projects, site, whatsappLink } from '@/lib/content';
import ClosingCta from '@/components/ClosingCta';
import Footer from '@/components/Footer';
import { FaqCopyLink, FaqHashOpener } from '@/components/FaqLink';
import { faqId } from '@/lib/slug';
import SectionLink from '@/components/SectionLink';
import ServiceSymptoms from '@/components/ServiceSymptoms';
import ShareCase from '@/components/ShareCase';
import MockUI from '@/components/MockUI';

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/servicos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  const path = `/servicos/${s.slug}`;
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    keywords: s.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      title: `${s.seoTitle} · HenaWeb`,
      description: s.seoDescription,
      locale: 'pt_BR',
      siteName: 'HenaWeb',
    },
    twitter: { card: 'summary_large_image', title: `${s.seoTitle} · HenaWeb`, description: s.seoDescription },
  };
}

export default async function ServicePage({ params }: PageProps<'/servicos/[slug]'>) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  const url = `${site.url}/servicos/${s.slug}`;
  const caseCount = projects.filter((p) => p.service === s.slug).length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: s.name,
        serviceType: s.seoTitle,
        description: s.seoDescription,
        url,
        provider: { '@id': `${site.url}/#organization` },
        areaServed: { '@type': 'Country', name: 'Brasil' },
        availableChannel: { '@type': 'ServiceChannel', serviceUrl: `${site.url}/#contato`, availableLanguage: 'pt-BR' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Serviços', item: `${site.url}/#capacidades` },
          { '@type': 'ListItem', position: 3, name: s.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  const others = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="conteudo" tabIndex={-1} className="sky min-h-screen text-ink">
        <article className="gutter mx-auto max-w-6xl pt-36 pb-24">
          <nav aria-label="Trilha" className="label">
            <ol className="flex flex-wrap gap-2">
              <li>
                <a href="/" className="hover:text-ink">Início</a>
              </li>
              <li aria-hidden>·</li>
              <li>
                <a href="/#capacidades" className="hover:text-ink">Serviços</a>
              </li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="text-ink">{s.name}</li>
            </ol>
          </nav>

          <h1 className="mt-8 max-w-4xl text-[clamp(2.6rem,6.5vw,6rem)] leading-[0.92] font-medium tracking-[-0.05em]">
            {s.h1}{' '}
            <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">{s.h1Accent}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">{s.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3" data-print-hide>
            <a href="/#contato" className="toon toon-press rounded-full bg-acid px-6 py-4 font-medium text-acid-ink">
              Abrir um caso →
            </a>
            <a
              href={whatsappLink(`Olá! Quero conversar sobre ${s.name} com a HenaWeb.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="toon toon-press rounded-full bg-cyan px-6 py-4 font-medium text-acid-ink"
            >
              WhatsApp
            </a>
            <ShareCase title={`${s.name} · HenaWeb`} text={s.intro} label="Enviar para alguém ↗" placement="service-share" />
          </div>

          {/* long page on a phone: a table of contents with the section count, jumping to the same ids SectionLink copies */}
          <nav aria-label="Nesta página" className="mt-12 font-mono text-xs" data-print-hide>
            <span className="label mr-3">Nesta página</span>
            <ol className="mt-3 flex flex-wrap gap-2">
              {[
                { id: 'sintomas', label: 'Sintomas', n: s.problems.length },
                { id: 'entregas', label: 'O que você recebe', n: s.deliverables.length },
                { id: 'exemplos', label: 'Exemplos', n: s.examples.length },
                { id: 'perguntas', label: 'Perguntas', n: s.faq.length },
              ].map((t, i) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="inline-flex min-h-9 items-center gap-2 rounded-full border-2 border-ink/25 px-3 text-ink/80 transition-colors hover:border-acid hover:text-ink"
                  >
                    <span className="text-acid">{String(i + 1).padStart(2, '0')}</span>
                    {t.label}
                    <span className="text-ink/60">({t.n})</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section className="group relative mt-24" aria-labelledby="sintomas">
            <h2 id="sintomas" className="font-groovy text-[clamp(1.8rem,3.5vw,3rem)] text-groovy [text-shadow:3px_3px_0_#140a26]">
              Sintomas que resolvemos
            </h2>
            <SectionLink id="sintomas" title="Sintomas que resolvemos" />
            <ServiceSymptoms problems={s.problems} service={s.name} />
          </section>

          <section className="group relative mt-24" aria-labelledby="entregas">
            <h2 id="entregas" className="font-groovy text-[clamp(1.8rem,3.5vw,3rem)] text-teal [text-shadow:3px_3px_0_#140a26]">
              O que você recebe
            </h2>
            <SectionLink id="entregas" title="O que você recebe" />
            <ol className="mt-8 grid gap-5 md:grid-cols-2">
              {s.deliverables.map((d, i) => (
                <li key={d.title} className="win flex flex-col">
                  <div className="win-bar">
                    <span>etapa_{String(i + 1).padStart(2, '0')}.txt</span>
                  </div>
                  <div className="m-1.5 flex-1 border-2 border-[#7d7394] bg-paper p-6 text-acid-ink">
                    <h3 className="text-2xl font-medium tracking-tight">{d.title}</h3>
                    <p className="mt-2 leading-relaxed text-acid-ink/75">{d.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="group relative mt-24" aria-labelledby="exemplos">
            <h2 id="exemplos" className="font-groovy text-[clamp(1.8rem,3.5vw,3rem)] text-acid [text-shadow:3px_3px_0_#140a26]">
              Exemplos
            </h2>
            <SectionLink id="exemplos" title="Exemplos" />
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {s.examples.map((e) => (
                <li key={e.name} className="toon-sm overflow-hidden rounded-xl bg-bg-2/80 p-5">
                  {/* examples that are cases on this site show the top of their screenshot, like a folder tab */}
                  {(() => {
                    const pr = projects.find((x) => x.name === e.name);
                    if (!pr || (!pr.shot && !pr.mock)) return null;
                    return (
                      <a
                        href={`/casos/${pr.slug}`}
                        aria-hidden
                        tabIndex={-1}
                        className="group -mx-5 -mt-5 mb-5 block aspect-[16/9.4] overflow-hidden border-b-2 border-toon bg-acid-ink"
                      >
                        {pr.shot ? (
                          <Image
                            src={pr.shot.desktop.replace(/\.jpg$/, '-top.jpg')}
                            alt=""
                            width={1440}
                            height={846}
                            sizes="(max-width: 768px) 92vw, 380px"
                            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                          />
                        ) : (
                          pr.mock && <MockUI variant={pr.mock.variant} hue={pr.mock.hue} />
                        )}
                      </a>
                    );
                  })()}
                  <h3 className="text-xl font-medium tracking-tight">
                    {(() => {
                      const caseSlug = projects.find((pr) => pr.name === e.name)?.slug;
                      if (caseSlug)
                        return (
                          <a href={`/casos/${caseSlug}`} className="hover:text-acid">
                            {e.name} →
                          </a>
                        );
                      return e.href ? (
                        <a href={e.href} target="_blank" rel="noopener noreferrer" className="hover:text-acid">
                          {e.name} ↗
                        </a>
                      ) : (
                        e.name
                      );
                    })()}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/70">{e.note}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <span key={t} className="rounded-full border-2 border-ink/25 px-3 py-0.5 font-mono text-xs text-ink/75 uppercase">
                  {t}
                </span>
              ))}
            </p>
            {/* the archive already filters by service (?servico=, CaseFilter): link straight to this service's cases */}
            {caseCount > 0 && (
              <a
                href={`/casos?servico=${s.slug}`}
                data-print-hide
                className="mt-8 inline-flex items-center gap-2 font-medium text-acid underline-offset-4 hover:underline"
              >
                Ver {caseCount === 1 ? 'o caso' : `os ${caseCount} casos`} de {s.name} no arquivo →
              </a>
            )}
          </section>

          <section className="group relative mt-24" aria-labelledby="perguntas">
            <h2 id="perguntas" className="font-groovy text-[clamp(1.8rem,3.5vw,3rem)] text-groovy [text-shadow:3px_3px_0_#140a26]">
              Perguntas frequentes
            </h2>
            <SectionLink id="perguntas" title="Perguntas frequentes" />
            <div className="mt-8 flex flex-col gap-3">
              {s.faq.map((f) => (
                <details key={f.q} id={faqId(f.q)} className="toon-sm group scroll-mt-28 rounded-xl bg-paper p-5 text-acid-ink">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                    {f.q}
                    <span className="text-2xl transition-transform group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-acid-ink/75">{f.a}</p>
                  <FaqCopyLink id={faqId(f.q)} />
                </details>
              ))}
            </div>
            <FaqHashOpener />
          </section>

          <section className="mt-24" aria-labelledby="outros" data-print-hide>
            <h2 id="outros" className="label">
              Outras capacidades
            </h2>
            {/* each one pitched with its own page headline, plus how many solved cases back it up */}
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {others.map((o) => {
                const n = projects.filter((p) => p.service === o.slug).length;
                return (
                  <li key={o.slug}>
                    <a href={`/servicos/${o.slug}`} className="toon-sm toon-press group flex h-full flex-col rounded-2xl bg-lemon p-5 text-acid-ink">
                      <span className="font-mono text-xs tracking-wide text-acid-ink/70 uppercase">{o.name}</span>
                      <span className="mt-2 text-xl leading-tight font-medium tracking-tight">
                        {o.h1} {o.h1Accent}
                      </span>
                      <span className="mt-auto pt-4 text-sm text-acid-ink/75">
                        {n > 0 ? `${n} ${n === 1 ? 'caso resolvido' : 'casos resolvidos'} · ` : ''}
                        <span className="font-medium text-acid-ink underline-offset-4 group-hover:underline group-focus-visible:underline">Ver serviço →</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <ClosingCta
            title="Seu caso parece com"
            accent="esse?"
            text="Marque os sintomas no formulário e receba um diagnóstico preliminar na hora, ou chame direto no WhatsApp."
            whatsappMessage={`Olá! Quero conversar sobre ${s.name} com a HenaWeb.`}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
