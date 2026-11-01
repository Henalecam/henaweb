'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { SplitText } from '@/lib/split';
import { manifesto, facts } from '@/lib/content';
import { chisel, chiselTap } from '@/lib/chisel';

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // reduced motion: entrances are skipped, the content just sits in place (CSS can't stop GSAP tweens)
      if (prefersReducedMotion()) return;
      const split = SplitText.create('[data-manifesto]', { type: 'words', aria: 'none' });
      // tween the colour, not opacity: opacity also faded each word's dark halo, leaving the
      // unread words almost invisible where they cross the striped sun
      const ink = getComputedStyle(split.words[0] ?? document.body).color;
      const dim = ink.replace(/^rgba?\(([^,)]+),\s*([^,)]+),\s*([^,)]+).*$/, 'rgba($1, $2, $3, 0.38)');
      gsap.fromTo(
        split.words,
        { color: dim },
        {
          color: ink,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );
      gsap.from('[data-fact]', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        // GSAP folds the card's CSS tilt into its inline transform while it animates; once landed, hand the
        // tilt back to CSS so the hover can straighten it (globals.css, .fact-card)
        clearProps: 'transform',
        scrollTrigger: { trigger: '[data-facts]', start: 'top 85%' },
      });
      // the numbers roll to their value as the cards land; "0 caixa-preta" counts *down* from 99,
      // as if the black box were being emptied. The server HTML already holds the final digits.
      const offs: (() => void)[] = [];
      gsap.utils.toArray<HTMLElement>('[data-fact-n]').forEach((el) => {
        const to = Number(el.dataset.factN);
        if (!Number.isFinite(to)) return;
        const counter = { v: to === 0 ? 99 : 0 };
        el.textContent = String(counter.v);
        // a mechanical counter: each new digit drops into place with a small tick, and the final value lands
        // with a clunk (Web Animations on `translate`/`scale`, so the card's own tilt is untouched)
        const show = () => {
          const n = String(Math.round(counter.v));
          if (n === el.textContent) return;
          el.textContent = n;
          el.animate([{ translate: '0 -0.14em', opacity: 0.5 }, { translate: '0 0', opacity: 1 }], { duration: 110, easing: 'ease-out' });
          if (Number(n) === to) el.animate([{ scale: 1.14 }, { scale: 0.97 }, { scale: 1 }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
        };
        const roll = gsap.to(counter, {
          v: to,
          duration: to === 0 ? 1.6 : 1.2,
          ease: 'power3.out',
          delay: 0.15,
          onUpdate: show,
          scrollTrigger: { trigger: '[data-facts]', start: 'top 85%' },
        });
        // pointing at a card rolls its number again, quicker (ignored while it is still rolling). The mouse
        // does it on entering; on touch, where there is no hover, a tap on the card does the same
        const card = el.closest<HTMLElement>('[data-fact]');
        const replay = () => {
          if (roll.isActive() || gsap.isTweening(counter)) return;
          gsap.fromTo(counter, { v: to === 0 ? 99 : 0 }, { v: to, duration: 0.7, ease: 'power3.out', onUpdate: roll.vars.onUpdate });
        };
        const onEnter = (e: PointerEvent) => e.pointerType === 'mouse' && replay();
        const onTap = (e: PointerEvent) => e.pointerType !== 'mouse' && replay();
        card?.addEventListener('pointerenter', onEnter);
        card?.addEventListener('pointerup', onTap);
        offs.push(() => {
          card?.removeEventListener('pointerenter', onEnter);
          card?.removeEventListener('pointerup', onTap);
        });
      });
      // the quote is carved out left to right, like the line it quotes (negative insets keep its hard shadow)
      gsap.fromTo(
        '[data-quote]',
        { clipPath: 'inset(-20% 100% -40% -4%)' },
        {
          clipPath: 'inset(-20% -6% -40% -4%)',
          duration: 1.6,
          ease: 'power2.inOut',
          clearProps: 'clipPath',
          scrollTrigger: { trigger: '[data-quote]', start: 'top 85%' },
        },
      );
      return () => {
        split.revert();
        offs.forEach((off) => off());
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="gutter relative py-[clamp(6rem,16vw,14rem)]">
      <div className="grid min-h-[70svh] content-center gap-8 md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-6">
          {/* the label also crosses the hero sun: a dark chip keeps it readable over the stripes (contrast fell to ~1:1) */}
          <span className="label inline-block rounded-sm bg-[rgb(18_8_42/0.85)] px-1.5 py-0.5">(I) Manifesto</span>
          <p
            data-manifesto
            // the text scrolls over the hero sun; the dark halo keeps it legible over its stripes, as in the headline
            className="mt-8 text-[clamp(1.75rem,3.6vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.035em] [text-shadow:0_0_2px_rgb(18_8_42/0.9),0_2px_10px_rgb(18_8_42/0.85),0_0_36px_rgb(18_8_42/0.9)]"
          >
            {/* the manifesto's turn ("um sistema claro") gets a pen stroke under it as it scrolls up the screen */}
            {(() => {
              const key = 'sistema claro';
              const at = manifesto.indexOf(key);
              if (at < 0) return manifesto;
              return (
                <>
                  {manifesto.slice(0, at)}
                  <span className="mf-key">{key}</span>
                  {manifesto.slice(at + key.length)}
                </>
              );
            })()}
          </p>
          {/* the quote about carving answers the chisel too: the mouse knocks marble chips off it, and so does a tap,
              as on the hero's "esculpidos" */}
          <p data-quote onPointerMove={chisel} onPointerDown={chiselTap} className="font-groovy mt-8 text-2xl text-acid [text-shadow:3px_3px_0_#120626]">“Vi o anjo no mármore e esculpi até libertá-lo.”</p>
          <span className="label mt-2 block">Frase atribuída a Michelangelo</span>
        </div>
      </div>

      <div data-facts className="mt-[clamp(4rem,10vw,9rem)] grid gap-5 md:grid-cols-3">
        {facts.map((f) => (
          <div key={f.l} data-fact className="fact-card toon flex items-end justify-between gap-6 rounded-2xl bg-paper p-6 text-acid-ink md:p-8">
            {/* the rolling counter is for the eyes only: mid-roll a screen reader read "0 time só" or "71 caixa-preta";
                the real number sits beside it for assistive tech */}
            <span data-fact-n={f.n} aria-hidden className="font-groovy text-[clamp(3.5rem,7vw,6rem)] leading-none text-[#c2410c] tabular-nums print:hidden">
              {f.n}
            </span>
            {/* on paper, the real number: the counter above sits at its starting digit (0 or 99) until the cards
                scroll into view, so printing the page from the top put "0 · 0 · 99" on the sheet instead of the facts */}
            <span aria-hidden className="font-groovy hidden text-[clamp(3.5rem,7vw,6rem)] leading-none text-[#c2410c] tabular-nums print:inline">
              {f.n}
            </span>
            <span className="sr-only">{f.n} </span>
            {/* the promise behind each number, readable at a glance (was 11px mono caps at 70%) */}
            <span className="max-w-[18ch] text-right text-base leading-snug font-medium text-acid-ink/80 md:text-lg">{f.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
