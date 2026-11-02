'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = '',
  separator = <span className="mx-8 inline-block h-2 w-2 rotate-45 bg-acid align-middle" />,
}: {
  items: ReactNode[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  separator?: ReactNode;
}) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          {item}
          {separator}
        </span>
      ))}
    </div>
  );

  // hover already stops it with a mouse; a tap (phones never hover) freezes it so a logo can be read, a second tap lets it go
  const [paused, setPaused] = useState(false);

  // scrolling winds the tape up: the faster the page moves, the faster it runs (up to 4×), easing back to its own
  // pace when the page stops. Playback rate only, so hover/tap/P pauses still hold it; nothing with reduced motion
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let lastY = scrollY;
    let lastT = performance.now();
    let rate = 1;
    let target = 1;
    let raf = 0;
    let prev = 0;
    // time-based easing (not per frame), so a slow device winds down as quickly as a fast one
    const tick = (now: number) => {
      const dt = prev ? Math.min(200, now - prev) : 16;
      prev = now;
      const anim = el.getAnimations()[0];
      target += (1 - target) * (1 - Math.exp(-dt / 280));
      rate += (target - rate) * (1 - Math.exp(-dt / 80));
      if (anim) anim.playbackRate = rate;
      if (Math.abs(rate - 1) > 0.01 || Math.abs(target - 1) > 0.01) raf = requestAnimationFrame(tick);
      else {
        if (anim) anim.playbackRate = 1;
        raf = 0;
        prev = 0;
      }
    };
    const onScroll = () => {
      const now = performance.now();
      const v = Math.abs(scrollY - lastY) / Math.max(16, now - lastT); // px per ms
      lastY = scrollY;
      lastT = now;
      if (el.closest('[data-offscreen]')) return;
      target = Math.max(target, Math.min(4, 1 + v * 1.6));
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`group relative flex overflow-hidden ${className}`} onClick={() => setPaused((p) => !p)}>
      <div
        ref={track}
        data-marquee-track
        // the inline `animation` shorthand resets the play state, so hover needs !important and the tap state rides inline
        className="flex w-max group-hover:[animation-play-state:paused]!"
        style={{ animation: `marquee ${speed}s linear infinite ${reverse ? 'reverse' : 'normal'} ${paused ? 'paused' : 'running'}` }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
