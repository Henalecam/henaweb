'use client';

import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/site';

/**
 * Phones only: a WhatsApp button that appears once the hero has scrolled away and
 * steps aside while the FAQ, the contact section, the closing CTA or the footer is on screen. While reading
 * downward it shrinks to a round icon so it covers less text; scrolling up brings the label back.
 * If text sits under the button while reading downward, it tucks into the screen edge (a sliver stays
 * visible) so no line is hidden; scrolling up brings it back whole.
 * On a service or case page the pre-filled message names that page, so the chat starts with context.
 */

const SIZE = 44; // compact button, px
const EDGE = 16; // right-4

/** True when visible text lies under the spot the compact button occupies. */
function textUnderButton() {
  const bottom = 16; // bottom: max(1rem, safe area); the safe area only adds room below
  const box = { left: innerWidth - EDGE - SIZE, right: innerWidth - EDGE, top: innerHeight - bottom - SIZE, bottom: innerHeight - bottom };
  const seen = new Set<Element>();
  const range = document.createRange();
  for (const fx of [0.15, 0.5, 0.85])
    for (const fy of [0.15, 0.5, 0.85]) {
      const x = box.left + SIZE * fx;
      const y = box.top + SIZE * fy;
      for (const el of document.elementsFromPoint(x, y)) {
        if (seen.has(el) || el.closest('[data-placement="floating"]')) continue;
        seen.add(el);
        for (const n of el.childNodes) {
          if (n.nodeType !== Node.TEXT_NODE || !n.textContent?.trim()) continue;
          range.selectNodeContents(n);
          for (const r of range.getClientRects())
            if (r.right > box.left && r.left < box.right && r.bottom > box.top && r.top < box.bottom) return true;
        }
      }
    }
  return false;
}
export default function FloatingContact() {
  const [show, setShow] = useState(false);
  const [compact, setCompact] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [href, setHref] = useState(() => whatsappLink());
  // the first time the button shows up in a visit, its phone icon rings once (a hello, not a nag: never again
  // in the same tab session)
  const [ring, setRing] = useState(false);
  useEffect(() => {
    // only where the button is actually drawn (phones) and allowed to move
    if (!show || !matchMedia('(max-width: 767px) and (prefers-reduced-motion: no-preference)').matches) return;
    try {
      if (sessionStorage.getItem('hena:rang')) return;
      sessionStorage.setItem('hena:rang', '1');
    } catch {
      return;
    }
    setRing(true);
  }, [show]);

  useEffect(() => {
    // service pages already carry a tailored message in the closing CTA; case pages name the case
    const closing = document.querySelector<HTMLAnchorElement>('#proximo-passo a[href*="api.whatsapp.com"]');
    const caseName = location.pathname.startsWith('/casos/')
      ? document.querySelector('main h1')?.textContent?.replace(/[.\s]+$/, '').trim()
      : undefined;
    if (closing) setHref(closing.href);
    else if (caseName) setHref(whatsappLink(`Olá! Vi o caso ${caseName} no site e quero algo parecido para a minha operação.`));
  }, []);

  useEffect(() => {
    let pastHero = false;
    let lastY = window.scrollY;
    const covered = new Set<Element>();
    const update = () => setShow(pastHero && covered.size === 0);

    let down = false;
    let raf = 0;
    let settle = 0;
    const checkText = () => {
      raf = 0;
      setTucked(down && textUnderButton());
    };
    const onScroll = () => {
      const y = window.scrollY;
      pastHero = y > window.innerHeight * 0.85;
      if (Math.abs(y - lastY) > 8) {
        down = y > lastY;
        setCompact(down);
        lastY = y;
      }
      update();
      if (!raf) raf = requestAnimationFrame(checkText);
      // smooth scrolling keeps moving after the last event: check again once it rests
      clearTimeout(settle);
      settle = window.setTimeout(checkText, 180);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? covered.add(e.target) : covered.delete(e.target)));
        update();
      },
      { threshold: 0.15 },
    );
    // the FAQ toggles sit on the right edge, right where the button floats (on subpages the id is on
    // the heading, so watch its whole section); contact, the closing CTA and the footer already show
    // WhatsApp themselves
    const faq = document.getElementById('perguntas');
    const watched = [faq?.closest('section') ?? faq, ...document.querySelectorAll('#contato, #proximo-passo, footer')];
    watched.forEach((el) => el && io.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <a
      data-print-hide
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a HenaWeb pelo WhatsApp (abre em nova aba)"
      data-placement="floating"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`toon-sm fixed right-4 z-40 flex h-11 items-center overflow-hidden rounded-full bg-[#25d366] pl-3 font-medium text-acid-ink transition-[translate,transform,opacity,padding] duration-500 ease-[var(--ease-out-expo)] md:hidden ${compact ? 'pr-3' : 'pr-4'} ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      } ${tucked ? 'translate-x-[calc(100%+6px)] focus-visible:translate-x-0' : 'translate-x-0'} [html[data-menu=open]_&]:pointer-events-none [html[data-menu=open]_&]:opacity-0`}
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <svg
        viewBox="0 0 24 24"
        data-ring={ring ? '' : undefined}
        onAnimationEnd={() => setRing(false)}
        className="h-5 w-5 shrink-0"
        fill="currentColor"
        aria-hidden
      >
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z" />
      </svg>
      <span
        className={`overflow-hidden whitespace-nowrap transition-[max-width,margin,opacity] duration-500 ease-[var(--ease-out-expo)] ${
          compact ? 'ml-0 max-w-0 opacity-0' : 'ml-2 max-w-24 opacity-100'
        }`}
      >
        WhatsApp
      </span>
    </a>
  );
}
