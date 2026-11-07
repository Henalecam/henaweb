'use client';

import { SplitText } from 'gsap/SplitText';
import { gsap } from './gsap';

// registered here rather than in ./gsap: every page loads ./gsap (nav, cursor, smooth scroll), but only the home's
// sections split text, so the case, service and other pages no longer download the plugin
if (typeof window !== 'undefined') gsap.registerPlugin(SplitText);

export { SplitText };
