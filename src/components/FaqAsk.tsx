import { whatsappLink } from '@/lib/site';

/**
 * Under an FAQ answer: "Perguntar mais no WhatsApp". The chat opens with the question already quoted,
 * so a visitor whose doubt the answer didn't settle keeps the thread instead of starting from zero.
 * Tracked as a WhatsApp click by the site-wide listener (ConversionTracking).
 */
export default function FaqAsk({ q }: { q: string }) {
  return (
    <a
      href={whatsappLink(`Olá! Li no site a resposta para “${q}” e queria saber mais.`)}
      target="_blank"
      rel="noopener noreferrer"
      data-print-hide
      className="label mt-4 inline-flex min-h-8 items-center gap-1.5 !text-current opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100"
    >
      <span aria-hidden>💬</span> Perguntar mais no WhatsApp <span aria-hidden>↗</span>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  );
}
