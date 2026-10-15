import { projects, testimonials } from '@/lib/content';

/**
 * Real client quotes as signed case notes. Renders nothing until `testimonials` in content.ts
 * has entries, so the home page never shows placeholder praise.
 */
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section id="depoimentos" aria-labelledby="depoimentos-titulo" className="paper relative z-30 border-t-[3px] border-toon py-[clamp(5rem,9vw,8rem)] text-bg">
      <div className="gutter">
        <span className="label !text-bg/55">Depoimentos</span>
        <h2 id="depoimentos-titulo" className="mt-6 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.05em]">
          Quem teve o caso resolvido <span className="font-groovy text-[0.85em] tracking-normal text-[#c2410c]">conta.</span>
        </h2>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => {
            const caseLink = t.project && projects.find((p) => p.slug === t.project);
            return (
              <li key={t.name + t.org}>
                <figure className="toon flex h-full flex-col rounded-2xl bg-paper p-6">
                  <blockquote className="serif flex-1 text-xl leading-snug text-acid-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-acid-ink/15 pt-4 text-sm text-acid-ink/75">
                    <span className="block font-medium text-acid-ink">{t.name}</span>
                    {t.role}, {t.org}
                    {caseLink && (
                      <a href={`/casos/${caseLink.slug}`} className="mt-2 block w-fit font-medium text-[#c2410c] underline-offset-4 hover:underline">
                        Ver o caso {caseLink.name} →
                      </a>
                    )}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
