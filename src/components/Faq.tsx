import { homeFaq } from '@/lib/content';
import { faqId } from '@/lib/slug';
import { FaqCopyLink, FaqHashOpener, FaqToggleAll } from './FaqLink';

/** Visible FAQ; the same Q&A feeds the FAQPage structured data on the home page. */
export default function Faq() {
  return (
    <section id="perguntas" aria-labelledby="perguntas-titulo" className="paper relative z-30 -mt-8 rounded-t-[2rem] border-t-[3px] border-toon py-[clamp(5rem,9vw,8rem)] text-bg">
      <div className="gutter grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="label !text-bg/55">(VIII) Perguntas</span>
          <h2 id="perguntas-titulo" className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.92] font-medium tracking-[-0.05em]">
            Perguntas que <span className="font-groovy text-[0.85em] tracking-normal text-[#c2410c]">todo cliente faz.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-8">
          <div className="flex justify-end text-bg">
            <FaqToggleAll />
          </div>
          {homeFaq.map((f, i) => (
            <details key={f.q} id={faqId(f.q)} className="toon-sm group scroll-mt-28 rounded-xl bg-paper p-5 open:bg-lemon">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium md:text-xl">
                {/* a file index, like the rest of the case archive: easier to say "a pergunta 04" */}
                <span className="flex items-baseline gap-3">
                  <span aria-hidden className="shrink-0 font-mono text-xs text-bg/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{f.q}</span>
                </span>
                <span className="toon-sm flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-acid text-xl transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-bg/75">{f.a}</p>
              <FaqCopyLink id={faqId(f.q)} />
            </details>
          ))}
          <p className="mt-3 text-bg/75" data-print-hide>
            Não achou a sua?{' '}
            <a href="#mensagem" className="font-medium text-bg underline decoration-[#c2410c] decoration-2 underline-offset-4 hover:decoration-4">
              Pergunte direto pra gente →
            </a>
          </p>
        </div>
      </div>
      <FaqHashOpener />
    </section>
  );
}
