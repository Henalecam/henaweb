'use client';

import { useEffect, useState } from 'react';

/**
 * The status bar of the phone mock-up on a case page: the visitor's own time, as their phone would show it,
 * with signal and battery. Purely decorative (aria-hidden); the clock ticks once a minute, only with the tab
 * visible. The server sends an empty bar, so the time arriving after hydration moves nothing.
 */
export default function PhoneStatus() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' });
    let id = 0;
    const tick = () => setTime(fmt.format(new Date()));
    const start = () => {
      window.clearTimeout(id);
      if (document.hidden) return;
      tick();
      // land on the next minute boundary, then keep going
      const loop = () => {
        id = window.setTimeout(() => {
          tick();
          loop();
        }, 60_000 - (Date.now() % 60_000) + 50);
      };
      loop();
    };
    start();
    document.addEventListener('visibilitychange', start);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener('visibilitychange', start);
    };
  }, []);

  return (
    <div
      aria-hidden
      data-phone-status
      className="absolute inset-x-0 top-0 flex h-[11cqw] items-center justify-between bg-black px-[7cqw] pt-[1.5cqw] font-sans text-[5.6cqw] leading-none font-semibold text-white tabular-nums"
    >
      <span className="w-[16cqw]">{time}</span>
      {/* the camera cut-out */}
      <span className="h-[5cqw] w-[22cqw] rounded-full bg-[#1c1c1e]" />
      <span className="flex w-[16cqw] items-center justify-end gap-[1.4cqw]">
        {/* signal: four rising bars */}
        <span className="flex items-end gap-[0.6cqw]">
          {[1.4, 2.2, 3, 3.8].map((h) => (
            <span key={h} data-fc-fill className="w-[0.9cqw] rounded-[0.3cqw] bg-white" style={{ height: `${h}cqw` }} />
          ))}
        </span>
        {/* battery: outline, a well-charged fill and the cap */}
        <span className="relative flex h-[3.4cqw] w-[6.4cqw] items-center rounded-[0.9cqw] border-[0.45cqw] border-white/55 p-[0.4cqw]">
          <span data-fc-fill className="h-full w-[80%] rounded-[0.4cqw] bg-white" />
          <span data-fc-fill className="absolute top-1/2 -right-[1.3cqw] h-[1.4cqw] w-[0.7cqw] -translate-y-1/2 rounded-r-[0.4cqw] bg-white/55" />
        </span>
      </span>
    </div>
  );
}
