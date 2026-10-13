import type { ReactNode } from 'react';

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

  return (
    <div className={`group relative flex overflow-hidden ${className}`}>
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row}
        {row}
      </div>
    </div>
  );
}
