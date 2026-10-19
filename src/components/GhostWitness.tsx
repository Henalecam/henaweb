'use client';

import { useEffect, useRef, useState } from 'react';

const REACH = 260; // px: how close the pointer gets before the ghost backs off
const FLEE = 90; // px: the furthest it drifts away

/**
 * The 404 ghost is a shy witness: its eyes follow the pointer and, if you get too close, it slides
 * away and the "?" turns into a startled "!". Fine pointers only; with reduced motion the eyes
 * still look but the ghost stays put.
 */
export default function GhostWitness() {
  const svg = useRef<SVGSVGElement>(null);
  const pupils = useRef<SVGGElement>(null);
  const [startled, setStartled] = useState(false);

  useEffect(() => {
    const el = svg.current;
    const eyes = pupils.current;
    if (!el || !eyes || !matchMedia('(pointer: fine)').matches) return;
    const still = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let px = 0;
    let py = 0;
    let shy = false;

    const tick = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      // measure from where the ghost would be without the flee offset
      const [ox, oy] = (el.dataset.off ?? '0,0').split(',').map(Number);
      const cx = r.left + r.width / 2 - ox;
      const cy = r.top + r.height * 0.4 - oy;
      const dx = px - cx;
      const dy = py - cy;
      const dist = Math.hypot(dx, dy) || 1;
      eyes.setAttribute('transform', `translate(${((dx / dist) * Math.min(dist, 120) * 6) / 120} ${((dy / dist) * Math.min(dist, 120) * 6) / 120})`);
      let fx = 0;
      let fy = 0;
      if (!still.matches && dist < REACH) {
        const push = ((REACH - dist) / REACH) * FLEE;
        fx = (-dx / dist) * push;
        fy = (-dy / dist) * push * 0.6;
      }
      el.dataset.off = `${fx},${fy}`;
      el.style.transform = `translate(${fx}px, ${fy}px)`;
      const now = dist < REACH * 0.6;
      if (now !== shy) setStartled((shy = now));
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <svg
      ref={svg}
      viewBox="0 0 260 300"
      aria-hidden
      data-ghost
      className="ghost-bob pointer-events-none absolute top-1/2 right-[6vw] hidden w-[clamp(14rem,22vw,20rem)] -translate-y-1/2 transition-transform duration-500 ease-out lg:block"
    >
      <ellipse cx="120" cy="288" rx="70" ry="8" fill="#140a26" opacity="0.35" />
      <path
        d="M40 250 V120 a80 80 0 0 1 160 0 V250 l-20 -18 l-20 22 l-20 -22 l-20 22 l-20 -22 l-20 22 l-20 -22 z"
        fill="#eef6d2"
        stroke="#140a26"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <path d="M58 124 a62 62 0 0 1 40 -58" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
      {/* eyes: the pupils look at the pointer */}
      <ellipse cx="96" cy="118" rx="14" ry={startled ? 20 : 18} fill="#fff" stroke="#140a26" strokeWidth="5" />
      <ellipse cx="146" cy="118" rx="14" ry={startled ? 20 : 18} fill="#fff" stroke="#140a26" strokeWidth="5" />
      <g ref={pupils} transform="translate(-4 8)">
        <circle cx="96" cy="118" r={startled ? 5 : 7} fill="#140a26" />
        <circle cx="146" cy="118" r={startled ? 5 : 7} fill="#140a26" />
      </g>
      <path
        d={startled ? 'M80 88 q16 -14 30 -4 M132 84 q16 -10 30 4' : 'M80 94 q16 -10 30 0 M132 94 q16 -10 30 0'}
        fill="none"
        stroke="#140a26"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {startled ? (
        <ellipse cx="120" cy="160" rx="8" ry="10" fill="#140a26" />
      ) : (
        <path d="M108 160 q12 -8 24 0" fill="none" stroke="#140a26" strokeWidth="5" strokeLinecap="round" />
      )}
      <ellipse cx="78" cy="148" rx="9" ry="5" fill="#f7931e" opacity="0.5" />
      <ellipse cx="164" cy="148" rx="9" ry="5" fill="#f7931e" opacity="0.5" />
      {/* arm and magnifier */}
      <path d="M60 190 q-30 10 -30 40" fill="none" stroke="#140a26" strokeWidth="6" strokeLinecap="round" />
      <line x1="34" y1="222" x2="12" y2="252" stroke="#140a26" strokeWidth="10" strokeLinecap="round" />
      <line x1="34" y1="222" x2="12" y2="252" stroke="#f7931e" strokeWidth="5" strokeLinecap="round" />
      <circle cx="50" cy="196" r="28" fill="#3cc6b4" fillOpacity="0.35" stroke="#140a26" strokeWidth="7" />
      <path d="M36 186 a16 16 0 0 1 14 -10" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      {/* a question mark floating above; a startled "!" when you get too close */}
      <text x="210" y="60" fontFamily="var(--font-shrikhand), serif" fontSize="56" fill={startled ? '#f7931e' : '#f9e27d'} stroke="#140a26" strokeWidth="3" paintOrder="stroke">
        {startled ? '!' : '?'}
      </text>
    </svg>
  );
}
