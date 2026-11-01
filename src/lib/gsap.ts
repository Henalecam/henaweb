'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs `cb` once the preloader has finished (or immediately if it already did). */
export function onReady(cb: () => void) {
  if (document.documentElement.dataset.ready === 'true') {
    cb();
    return () => {};
  }
  window.addEventListener('hena:ready', cb, { once: true });
  return () => window.removeEventListener('hena:ready', cb);
}

// SplitText lives in ./split: only the home's sections split text, so the other pages don't ship it
export { gsap, ScrollTrigger, useGSAP };
