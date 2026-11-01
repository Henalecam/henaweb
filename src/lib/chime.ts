/**
 * A counter-bell "ding", synthesised on the spot (no audio file to download): three inharmonic sine partials,
 * the way a struck bell rings, with a quick strike and a long fade. Only ever called from the visitor's own
 * click on the bell, kept quiet, and skipped with reduced motion, which the site reads as "keep the sensory
 * effects down" (same rule as lib/haptic).
 */
let ctx: AudioContext | null = null;

const PARTIALS = [
  { ratio: 1, gain: 1, decay: 1.4 },
  { ratio: 2.76, gain: 0.45, decay: 0.7 },
  { ratio: 5.4, gain: 0.2, decay: 0.35 },
];

export function chime(base = 1568) {
  if (typeof window === 'undefined') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  try {
    ctx ??= new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    const t = ctx.currentTime;
    const out = ctx.createGain();
    out.gain.value = 0.07;
    out.connect(ctx.destination);
    for (const p of PARTIALS) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = base * p.ratio;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(p.gain, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + p.decay);
      osc.connect(g).connect(out);
      osc.start(t);
      osc.stop(t + p.decay + 0.05);
    }
  } catch {
    // audio blocked or unavailable: the bell still swings and shows its DING
  }
}
