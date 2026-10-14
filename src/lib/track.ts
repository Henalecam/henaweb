/**
 * Conversion events, sent to every analytics tool that is loaded (Meta Pixel, GA4).
 * Missing tools are skipped silently, so this is safe to call anywhere on the client.
 */

type Fbq = (cmd: 'track' | 'trackCustom', event: string, params?: Record<string, unknown>) => void;
type Gtag = (cmd: 'event', event: string, params?: Record<string, unknown>) => void;

export type ConversionEvent =
  | { name: 'lead'; capability?: string; timeline?: string }
  | { name: 'whatsapp_click'; placement: string }
  | { name: 'email_click'; placement: string }
  | { name: 'cta_click'; placement: string; label: string }
  | { name: 'case_card_download' }
  | { name: 'case_study_view'; project: string };

// Meta has standard events for some of these; the rest go as custom events.
const META_STANDARD: Partial<Record<ConversionEvent['name'], string>> = {
  lead: 'Lead',
  whatsapp_click: 'Contact',
  email_click: 'Contact',
};

export function track(event: ConversionEvent) {
  if (typeof window === 'undefined') return;
  const { name, ...params } = event;
  const w = window as unknown as { fbq?: Fbq; gtag?: Gtag };
  try {
    const standard = META_STANDARD[name];
    if (standard) w.fbq?.('track', standard, { ...params, event_label: name });
    else w.fbq?.('trackCustom', name, params);
    w.gtag?.('event', name === 'lead' ? 'generate_lead' : name, params);
  } catch {
    // analytics must never break the page
  }
}
