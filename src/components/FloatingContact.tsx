'use client';

import { useEffect, useState } from 'react';
import { whatsappLink } from '@/lib/content';

/**
 * Phones only: a WhatsApp button that appears once the hero has scrolled away and
 * steps aside while the contact section or the footer is on screen.
 */
export default function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let pastHero = false;
    const covered = new Set<Element>();
    const update = () => setShow(pastHero && covered.size === 0);

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.85;
      update();
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? covered.add(e.target) : covered.delete(e.target)));
        update();
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll('#contato, footer').forEach((el) => io.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a HenaWeb pelo WhatsApp"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`toon-sm fixed right-4 z-40 flex items-center gap-2 rounded-full bg-[#25d366] py-2.5 pr-4 pl-3 font-medium text-acid-ink transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z" />
      </svg>
      WhatsApp
    </a>
  );
}
