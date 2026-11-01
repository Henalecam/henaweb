'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { buzz } from '@/lib/haptic';

const KEY = 'hena:initials';
const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/* writes the player's initials onto every cabinet's screen ("P1 HEN · 1 crédito") */
function paint(tag: string) {
  document.querySelectorAll<HTMLElement>('[data-player]').forEach((el) => {
    el.textContent = tag ? ` ${tag}` : '';
  });
}

/**
 * /passatempo: the arcade's "ENTER YOUR INITIALS" screen. Three slots, typed or spun letter by letter with ↑/↓ like
 * the joystick on a real high-score table; once saved, the initials show on every cabinet. Kept in this browser
 * only (localStorage), never sent anywhere.
 */
export default function PlayerTag() {
  const [saved, setSaved] = useState<string | null>(null);
  const [slots, setSlots] = useState(['A', 'A', 'A']);
  const [ready, setReady] = useState(false);
  const [fresh, setFresh] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const change = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let v: string | null = null;
    try {
      v = localStorage.getItem(KEY);
    } catch {}
    if (v && /^[A-Z]{3}$/.test(v)) {
      setSaved(v);
      setSlots(v.split(''));
      paint(v);
    }
    setReady(true);
  }, []);

  const set = (i: number, ch: string) => setSlots((s) => s.map((c, j) => (j === i ? ch : c)));
  const go = (i: number) => refs.current[Math.max(0, Math.min(2, i))]?.focus();

  const onKey = (i: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      // spin the letter, wrapping Z→A, like the stick on a score table
      e.preventDefault();
      const k = ABC.indexOf(slots[i]);
      set(i, ABC[(k + (e.key === 'ArrowUp' ? 1 : 25)) % 26]);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === 'ArrowLeft' || (e.key === 'Backspace' && i > 0)) {
      e.preventDefault();
      go(i - 1);
    } else if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      set(i, e.key.toUpperCase());
      go(i + 1);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const tag = slots.join('');
    try {
      localStorage.setItem(KEY, tag);
    } catch {}
    paint(tag);
    // a coin dropping into the cabinet, on phones that vibrate
    buzz([6, 40, 6, 40, 14]);
    setSaved(tag);
    setFresh(true);
  };

  // after saving, focus lands on "trocar" (the form it was in is gone); after "trocar", on the first slot
  useEffect(() => {
    if (!ready) return;
    if (saved && fresh) change.current?.focus({ preventScroll: true });
  }, [saved, fresh, ready]);

  return (
    <div className="player-tag mx-auto mt-16 min-h-[9.5rem] max-w-md text-center print:hidden">
      {!ready ? null : saved ? (
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-xs tracking-[0.3em] text-teal uppercase">Jogador da casa</p>
          <p className="font-groovy text-[clamp(2.4rem,7vw,3.4rem)] leading-none text-acid [text-shadow:4px_4px_0_#140a26]">
            {fresh ? 'NEW PLAYER!' : `HI, ${saved}!`}
          </p>
          <p className="font-mono text-sm text-ink/70" role="status">
            {fresh ? `Suas iniciais (${saved}) agora estão nas três máquinas.` : `As máquinas já te conhecem: ${saved}.`}{' '}
            <button
              ref={change}
              type="button"
              className="underline decoration-acid decoration-2 underline-offset-4 hover:decoration-4"
              onClick={() => {
                setSaved(null);
                setFresh(false);
                requestAnimationFrame(() => go(0));
              }}
            >
              trocar
            </button>
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col items-center gap-4" aria-labelledby="player-tag-title">
          <p id="player-tag-title" className="font-mono text-xs tracking-[0.3em] text-teal uppercase">
            Enter your initials
          </p>
          <div className="flex gap-3" role="group" aria-describedby="player-tag-hint">
            {slots.map((c, i) => (
              <input
                key={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                value={c}
                onChange={(e) => {
                  // phones type through the virtual keyboard (no keydown key): take the last letter typed
                  const ch = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(-1);
                  if (ch) {
                    set(i, ch);
                    go(i + 1);
                  }
                }}
                onKeyDown={onKey(i)}
                onFocus={(e) => e.target.select()}
                aria-label={`Inicial ${i + 1} de 3`}
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                inputMode="text"
                className="player-slot font-groovy h-16 w-14 rounded-sm border-2 border-[#7d7394] bg-[#140a26] text-center text-4xl text-acid caret-transparent [text-shadow:3px_3px_0_#000]"
              />
            ))}
          </div>
          <p id="player-tag-hint" className="font-mono text-xs text-ink/65">
            Digite ou gire com ↑ ↓. Fica só neste navegador.
          </p>
          <button type="submit" className="toon-sm toon-press rounded-full bg-acid px-5 py-2 font-medium text-acid-ink">
            Gravar <span aria-hidden>▸</span>
          </button>
        </form>
      )}
    </div>
  );
}
