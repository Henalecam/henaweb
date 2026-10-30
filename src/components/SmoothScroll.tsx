'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap';

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -40 } });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // a modal (search, shortcuts, full screenshot) freezes the page behind it: without this the
    // wheel over the backdrop kept gliding the page underneath
    const syncDialogs = () => {
      const open = !!document.querySelector('dialog[open]');
      document.documentElement.toggleAttribute('data-modal', open); // html[data-modal] { overflow: hidden }
      if (open) lenis.stop();
      else lenis.start();
    };
    const watch = new MutationObserver(syncDialogs);
    watch.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });

    // a jump requested by the page (the order ticket's lines → their step): Lenis owns the scroll position,
    // so a plain scrollIntoView was pulled straight back; an immediate Lenis jump lands where asked. Cancelling
    // the event tells the caller it was handled.
    const jump = (e: Event) => {
      const el = document.getElementById((e as CustomEvent<string>).detail);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { immediate: true, force: true });
    };
    window.addEventListener('hena:jump', jump);

    return () => {
      window.removeEventListener('hena:jump', jump);
      watch.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  // Arriving with a hash (/#projetos from a subpage, a shared link, an ad to /#contato): the browser
  // jumps to the section right away, but the pinned scenes above it are measured afterwards and add
  // screens of scroll space, leaving the visitor far above the target. Follow the target through those
  // re-measures for a few seconds, and stop as soon as the visitor scrolls on their own.
  useEffect(() => {
    const id = decodeURIComponent(location.hash.slice(1));
    // #mensagem focuses and centres itself (Contact); FAQ answers have their own opener
    if (!id || id === 'mensagem' || id.startsWith('pergunta-')) return;
    const target = document.getElementById(id);
    if (!target) return;
    const land = () => {
      if (Math.abs(target.getBoundingClientRect().top) > 120) target.scrollIntoView({ block: 'start' });
    };
    const stop = () => {
      ScrollTrigger.removeEventListener('refresh', land);
      window.clearTimeout(timer);
      for (const e of ['wheel', 'touchstart', 'keydown'] as const) window.removeEventListener(e, stop);
    };
    ScrollTrigger.addEventListener('refresh', land);
    const timer = window.setTimeout(stop, 4000);
    const settle = window.setTimeout(land, 900);
    for (const e of ['wheel', 'touchstart', 'keydown'] as const) window.addEventListener(e, stop, { passive: true });
    return () => {
      stop();
      window.clearTimeout(settle);
    };
  }, []);

  return null;
}
