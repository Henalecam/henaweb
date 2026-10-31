'use client';

import { useState, type ReactNode } from 'react';

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

  return (
    <div className={`group relative flex overflow-hidden ${className}`} onClick={() => setPaused((p) => !p)}>
      <div
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
