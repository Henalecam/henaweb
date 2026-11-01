'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Ouvir o caso": the case file read aloud by the device's own Portuguese voice (Web Speech API, nothing is
 * downloaded or sent anywhere), like a detective's tape recording. For reading with the eyes elsewhere, or for
 * anyone who'd rather listen. The button only shows where the browser can speak and has a Portuguese voice; it
 * turns into "■ Parar" while playing, with a small spinning reel, and stops on its own when leaving the page.
 */
export default function ListenCase({ lines }: { lines: string[] }) {
  const [ok, setOk] = useState(false);
  const [playing, setPlaying] = useState(false);
  const voice = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const pick = () => {
      const voices = speechSynthesis.getVoices();
      voice.current = voices.find((v) => v.lang === 'pt-BR') ?? voices.find((v) => v.lang.startsWith('pt')) ?? null;
      setOk(!!voice.current);
    };
    pick();
    speechSynthesis.addEventListener('voiceschanged', pick);
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', pick);
      speechSynthesis.cancel();
    };
  }, []);

  if (!ok) return null;
  const toggle = () => {
    if (playing) {
      speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    speechSynthesis.cancel();
    lines.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'pt-BR';
      u.voice = voice.current;
      u.rate = 1;
      if (i === lines.length - 1) u.onend = () => setPlaying(false);
      u.onerror = () => setPlaying(false);
      speechSynthesis.speak(u);
    });
    setPlaying(true);
  };
  return (
    <button
      type="button"
      onClick={toggle}
      data-print-hide
      data-listen
      className="label mt-5 inline-flex min-h-8 items-center gap-1.5 rounded-full !text-ink/70 transition-colors hover:!text-ink focus-visible:!text-ink"
    >
      <span aria-hidden className={playing ? 'reel inline-block' : 'inline-block'}>
        ✇
      </span>
      {playing ? '■ Parar a gravação' : '▶ Ouvir o caso'}
    </button>
  );
}
