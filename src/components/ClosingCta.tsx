import { projects, whatsappLink } from '@/lib/content';
import NewTab from './NewTab';
import FileLine from './FileLine';

// the file this conversation would open: the next number after the solved cases, so it follows the archive
const nextCase = String(projects.length + 1).padStart(2, '0');

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
          <span>caso_{nextCase}.exe</span>
          <span className="ml-auto flex gap-1" aria-hidden>
            <span className="win-btn">_</span>
            <span className="win-btn">×</span>
          </span>
        </div>
        <div className="paper m-1.5 grid gap-8 p-6 text-acid-ink md:grid-cols-[1.4fr_1fr] md:items-end md:p-10">
          <div>
            {/* a blank case file waiting for the visitor: the number continues the archive, the caret waits (and taps
                out the studio's name in Morse, globals.css .morse-caret) */}
            <p className="mb-4 font-mono text-xs tracking-[0.2em] text-acid-ink/60 uppercase">
              {/* the file line types itself as the window scrolls in, the caret riding its head (globals.css, data-typed) */}
              {/* addressed to the visitor by first name once they've started the contact form in this tab (FileLine) */}
              <FileLine caseNo={nextCase} />
              <span aria-hidden className="morse-caret ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-acid-ink/60" />
            </p>
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
              <NewTab />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
