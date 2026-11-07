/**
 * The checklist tick as a pen stroke: a short hand-drawn check that inks itself in (globals.css, tick-draw)
 * while its box stamps down (check-pop). With reduced motion it is simply there, fully drawn.
 */
export default function Tick({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={`tick-draw size-3.5 overflow-visible ${className}`}>
      <path d="M2.6 8.9c1.3.8 2.4 2 3.3 3.4C7.6 8.6 10 5.6 13.6 3" pathLength={1} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
