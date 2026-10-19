/**
 * LGPD: measurement tools (Meta Pixel, GA4, Clarity) only load after the visitor says yes.
 * The choice lives in localStorage; the loader itself is an inline script in the layout
 * (window.henaAnalytics), so a returning visitor who accepted gets the tools without waiting
 * for React.
 */

export type Consent = 'granted' | 'denied';

export const CONSENT_KEY = 'hena:consent';
/** fired to reopen the banner, e.g. from the footer */
export const CONSENT_OPEN = 'hena:consent-open';

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(choice: Consent) {
  const before = readConsent();
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // private mode: the choice holds for this page only
  }
  if (choice === 'granted') (window as unknown as { henaAnalytics?: () => void }).henaAnalytics?.();
  // tools that already loaded cannot be unloaded: start clean without them
  else if (before === 'granted') location.reload();
}

type Ids = { pixel?: string; ga?: string; clarity?: string };

/** Inline loader for the layout: defines window.henaAnalytics and runs it if consent was given before. */
export function analyticsLoader({ pixel, ga, clarity }: Ids) {
  const parts: string[] = [];
  if (pixel)
    parts.push(
      `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`,
    );
  if (ga)
    parts.push(
      `var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=${ga}';document.head.appendChild(g);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${ga}');`,
    );
  if (clarity)
    parts.push(
      `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${clarity}");`,
    );
  return `(function(){var done=false;window.henaAnalytics=function(){if(done)return;done=true;${parts.join('')}};try{if(localStorage.getItem('${CONSENT_KEY}')==='granted')window.henaAnalytics()}catch(e){}})();`;
}
