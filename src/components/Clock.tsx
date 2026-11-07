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
  const [gap, setGap] = useState('');
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
      if (mine === hqShort.format(now)) return setTheirs('');
      // how far ahead (or behind) the visitor is, so "aí" reads as a difference too: "+3h", "-1h30"
      const wall = (tz?: string) => new Date(now.toLocaleString('en-US', { timeZone: tz })).getTime();
      const diff = Math.round((wall() - wall(HQ)) / 900_000) * 15;
      const abs = Math.abs(diff);
      setGap(diff ? ` (${diff > 0 ? '+' : '−'}${Math.floor(abs / 60)}h${abs % 60 ? String(abs % 60).padStart(2, '0') : ''})` : '');
      setTheirs(mine);
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
    // data-clock: five quick taps on it are the touch way into the "elementar" easter egg (Elementar.tsx)
    <span data-clock className={`tabular-nums ${stack ? 'md:relative' : ''}`}>
      {/* fixed width from the first paint, so the glyph arriving after hydration moves nothing */}
      <span aria-hidden className="mr-1 inline-block w-[1em] text-center">
        {sky}
      </span>
      {/* a desk clock: the colons blink and the last second digit rolls in from above on each tick (CSS; with
          reduced motion both stand still). Keyed by its value so each new digit remounts and replays the roll */}
      {time ? (
        <>
          {time.slice(0, -1).split(':').map((part, i, all) => (
            <span key={i}>
              {part}
              {i < all.length - 1 && <span data-clock-colon>:</span>}
            </span>
          ))}
          <span key={time.slice(-1)} data-clock-roll className="inline-block">
            {time.slice(-1)}
          </span>
        </>
      ) : (
        '--:--:--'
      )}
      {theirs && (
        <span className={`opacity-70 ${stack ? 'md:absolute md:top-full md:right-0 md:mt-1 md:whitespace-nowrap' : ''}`}>
          <span className={stack ? 'md:hidden' : ''}> · </span>aí: {theirs}
          {/* in the phone hero the line is already near full width: the difference would wrap it to two */}
          {gap && <span className={stack ? 'hidden md:inline' : ''}>{gap}</span>}
        </span>
      )}
    </span>
  );
}
