import { whatsappLink } from '@/lib/content';

type Props = {
  /** Plain part of the headline; the accent closes it in the groovy face. */
  title: string;
  accent: string;
  text: string;
  /** Pre-filled WhatsApp message, so the conversation starts with context. */
  whatsappMessage: string;
};

/**
 * The last thing on a subpage before the footer: after reading a case or a service page the
 * visitor gets one clear next step instead of running into the footer. Section id feeds
 * click placement in ConversionTracking.
 */
export default function ClosingCta({ title, accent, text, whatsappMessage }: Props) {
  return (
    <section id="proximo-passo" aria-labelledby="proximo-passo-titulo" className="mt-24" data-print-hide>
      <div className="win">
        <div className="win-bar">
          <span>novo_caso.exe</span>
          <span className="ml-auto flex gap-1" aria-hidden>
            <span className="win-btn">_</span>
            <span className="win-btn">×</span>
          </span>
        </div>
        <div className="paper m-1.5 grid gap-8 p-6 text-acid-ink md:grid-cols-[1.4fr_1fr] md:items-end md:p-10">
          <div>
            <h2 id="proximo-passo-titulo" className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[0.95] font-medium tracking-[-0.04em]">
              {title}{' '}
              <span className="font-groovy text-[0.9em] tracking-normal text-[#c2410c]">{accent}</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-acid-ink/75">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href="/#contato" className="toon toon-press rounded-full bg-acid px-6 py-4 font-medium text-acid-ink">
              Abrir um caso →
            </a>
            <a
              href={whatsappLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="toon toon-press rounded-full bg-[#25d366] px-6 py-4 font-medium text-acid-ink"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
