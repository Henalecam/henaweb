'use client';

import { useEffect, useState } from 'react';

const HQ = 'America/Sao_Paulo';

/**
 * Curitiba's local time. For a visitor in another time zone (the site serves "todo o Brasil e o
 * exterior"), it also shows theirs, so "the studio's time" reads at a glance. Ticks only while the
 * tab is visible.
 */
export default function Clock({ stack = false }: { stack?: boolean }) {
  const [time, setTime] = useState('');
  const [theirs, setTheirs] = useState('');
  // day or night in Curitiba right now, from the same clock: a sun or a moon before the time
  const [sky, setSky] = useState('');

  useEffect(() => {
    const opts = { hour: '2-digit', minute: '2-digit' } as const;
    const hq = new Intl.DateTimeFormat('pt-BR', { ...opts, second: '2-digit', timeZone: HQ });
    const hqShort = new Intl.DateTimeFormat('pt-BR', { ...opts, timeZone: HQ });
    const local = new Intl.DateTimeFormat('pt-BR', opts);
    const hour = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: HQ });
    let id = 0;
    const update = () => {
      const now = new Date();
      setTime(hq.format(now));
      const h = Number(hour.format(now));
      setSky(h >= 6 && h < 18 ? '☀' : '☾');
      const mine = local.format(now);
      setTheirs(mine !== hqShort.format(now) ? mine : '');
    };
    const start = () => {
      window.clearInterval(id);
      if (document.hidden) return;
      update();
      id = window.setInterval(update, 1000);
    };
    start();
    document.addEventListener('visibilitychange', start);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', start);
    };
  }, []);

  return (
    // stacked (hero, desktop): the visitor's time hangs below Curitiba's without taking layout space; as a
    // block it appeared ~1.5 s after load (the time zone is only known in the browser) and pushed the whole
    // hero headline up 21 px (layout shift 0.008)
    <span className={`tabular-nums ${stack ? 'md:relative' : ''}`}>
      {/* fixed width from the first paint, so the glyph arriving after hydration moves nothing */}
      <span aria-hidden className="mr-1 inline-block w-[1em] text-center">
        {sky}
      </span>
      {time || '--:--:--'}
      {theirs && (
        <span className={`opacity-70 ${stack ? 'md:absolute md:top-full md:right-0 md:mt-1 md:whitespace-nowrap' : ''}`}>
          <span className={stack ? 'md:hidden' : ''}> · </span>aí: {theirs}
        </span>
      )}
    </span>
  );
}
