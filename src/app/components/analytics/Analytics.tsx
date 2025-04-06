'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    // Função para rastrear visualizações de página
    const trackPageView = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
          page_path: window.location.pathname,
        });
      }
    };

    // Rastrear eventos de clique
    const trackClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'A' || target.closest('a')) {
        const link = target.tagName === 'A' ? target : target.closest('a');
        if (link) {
          window.gtag('event', 'click', {
            event_category: 'Link',
            event_label: link.getAttribute('href'),
          });
        }
      }
    };

    // Rastrear tempo de permanência
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      window.gtag('event', 'time_spent', {
        event_category: 'Engagement',
        event_label: 'Time on Page',
        value: timeSpent,
      });
    };

    window.addEventListener('load', trackPageView);
    window.addEventListener('click', trackClick);
    window.addEventListener('beforeunload', trackTimeOnPage);

    return () => {
      window.removeEventListener('load', trackPageView);
      window.removeEventListener('click', trackClick);
      window.removeEventListener('beforeunload', trackTimeOnPage);
    };
  }, []);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />
    </>
  );
} 