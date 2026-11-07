'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { provideScrollTrigger } from './scrollBridge';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  // the smooth scroller drives ScrollTrigger only on pages that load it (lib/scrollBridge)
  provideScrollTrigger(ScrollTrigger);
}

// the library-free helpers live in ./motion (so non-GSAP components don't import this file); re-exported here
export { prefersReducedMotion, onReady } from './motion';

// SplitText lives in ./split: only the home's sections split text, so the other pages don't ship it
export { gsap, ScrollTrigger, useGSAP };
