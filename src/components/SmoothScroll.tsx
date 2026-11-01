'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { prefersReducedMotion } from '@/lib/motion';
import { withScrollTrigger } from '@/lib/scrollBridge';

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Lenis runs on its own rAF (it used to ride GSAP's ticker, which put GSAP on every page); where the page has
    // ScrollTrigger (the home's scenes), each scroll step updates it, as before
    const lenis = new Lenis({ lerp: 0.09, anchors: { offset: -40 }, autoRaf: true });
    let unhook = () => {};
    const unwait = withScrollTrigger((st) => {
      lenis.on('scroll', st.update);
      unhook = () => lenis.off('scroll', st.update);
    });

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
    // a glide to a page position (the hero's "role para investigar ↓" cue), at the scroller's own pace
    const glide = (e: Event) => {
      e.preventDefault();
      lenis.scrollTo((e as CustomEvent<number>).detail, { duration: 1.2 });
    };
    window.addEventListener('hena:glide', glide);

    return () => {
      window.removeEventListener('hena:jump', jump);
      window.removeEventListener('hena:glide', glide);
      watch.disconnect();
      unwait();
      unhook();
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
    // pinned scenes re-measure on ScrollTrigger's refresh (home only); elsewhere the settle below is enough
    let unlisten = () => {};
    const unwait = withScrollTrigger((st) => {
      st.addEventListener('refresh', land);
      unlisten = () => st.removeEventListener('refresh', land);
    });
    const stop = () => {
      unwait();
      unlisten();
      window.clearTimeout(timer);
      for (const e of ['wheel', 'touchstart', 'keydown'] as const) window.removeEventListener(e, stop);
    };
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
