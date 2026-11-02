'use client';

import { useEffect } from 'react';

/** Registers public/sw.js (offline archive) once the page is idle; production builds only. */
export default function SwRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return;
    const register = () => navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
    // after the page's own work: an idle moment where the browser has one (Safari doesn't), else a beat later
    const go = () => (typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(register) : setTimeout(register, 1500));
    if (document.readyState === 'complete') go();
    else addEventListener('load', go, { once: true });
  }, []);
  return null;
}
