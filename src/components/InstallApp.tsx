'use client';

import { useEffect, useState } from 'react';

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

/**
 * "Instalar o app": where the browser offers to install the site (Chrome/Edge/Android fire beforeinstallprompt once
 * the manifest and service worker qualify), a row in /links lets the visitor do it from here: the studio on the home
 * screen, opening offline on the pages already read and appearing in the share sheet. Nothing shows where the
 * browser doesn't offer it (iPhone Safari, already installed), so there's never a dead button.
 */
export default function InstallApp({ className = '' }: { className?: string }) {
  const [evt, setEvt] = useState<InstallEvent | null>(null);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault(); // keep the browser's own mini-bar from popping up; the row below asks instead
      setEvt(e as InstallEvent);
    };
    const onInstalled = () => {
      setEvt(null);
      setDone(true);
    };
    addEventListener('beforeinstallprompt', onPrompt);
    addEventListener('appinstalled', onInstalled);
    return () => {
      removeEventListener('beforeinstallprompt', onPrompt);
      removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (done)
    return (
      <li className={`${className} justify-center bg-[#d7f0e4]`}>
        <span role="status" data-installed>
          ✓ App instalado: procure a HenaWeb na tela inicial
        </span>
      </li>
    );
  if (!evt) return null;
  return (
    <li>
      <button
        type="button"
        data-install
        onClick={async () => {
          await evt.prompt();
          const { outcome } = await evt.userChoice;
          if (outcome === 'accepted') setDone(true);
          setEvt(null); // the event can only be used once
        }}
        className={`${className} w-full bg-lemon`}
      >
        Instalar o app da HenaWeb <span aria-hidden>📲</span>
      </button>
    </li>
  );
}
