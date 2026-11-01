/**
 * A latent fingerprint, the kind a detective dusts off a case file: broken concentric loops around an
 * off-centre core. Decorative only. Deterministic (no Math.random) so server and client draw the same print.
 */
const loops = Array.from({ length: 10 }, (_, i) => {
  const rx = 5 + i * 4.2;
  const ry = rx * 1.32;
  // each ridge breaks in a different place, like real ridges that end and fork
  const gap = 6 + ((i * 7) % 11);
  const dash = `${rx * 2.2} ${gap} ${rx * 1.1} ${gap / 2}`;
  const offset = (i * 37) % 60;
  return { rx, ry, dash, offset };
});

export default function Fingerprint({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-50 -62 100 124" aria-hidden data-fingerprint className={`pointer-events-none ${className}`}>
      <g fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" transform="translate(-3 4) rotate(-8)">
        {loops.map((l, i) => (
          <ellipse key={i} cx={i * 0.35} cy={-i * 0.6} rx={l.rx} ry={l.ry} strokeDasharray={l.dash} strokeDashoffset={l.offset} />
        ))}
      </g>
    </svg>
  );
}
