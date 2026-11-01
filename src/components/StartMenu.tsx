'use client';

import { useEffect, useRef, useState } from 'react';
import { serviceLinks } from '@/lib/serviceLinks';

const ITEMS: { label: string; href: string; icon: string }[] = [
  { label: 'Casos resolvidos', href: '/casos', icon: '🗂' },
  ...serviceLinks.map((s) => ({ label: s.name, href: `/servicos/${s.slug}`, icon: '📄' })),
  { label: 'Passa tempo', href: '/passatempo', icon: '🕹' },
  { label: 'Abrir um caso', href: '/#contato', icon: '✉' },
];

/**
 * The footer's last line starts like a Windows 95 taskbar: an "Iniciar" button that pops a start menu up with the
 * site's places, a "Procurar…" that opens the search, and the classic "Desligar…", which only shows the old
 * "you may now turn off your computer" screen (any key or click brings the site back). A native popover: Esc and
 * a click outside close it; the button reports its state.
 */
export default function StartMenu() {
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [off, setOff] = useState(false);

  // the popover lives in the top layer: sit it on the button, opening upwards like the real one
  useEffect(() => {
    const m = menu.current;
    if (!m) return;
    const onToggle = (e: Event) => {
      const isOpen = (e as ToggleEvent).newState === 'open';
      setOpen(isOpen);
      if (!isOpen || !btn.current) return;
      const r = btn.current.getBoundingClientRect();
      m.style.left = `${Math.max(8, Math.min(r.left, innerWidth - m.offsetWidth - 8))}px`;
      m.style.top = `${Math.max(8, r.top - m.offsetHeight - 6)}px`;
      m.querySelector<HTMLElement>('a, button')?.focus();
    };
    m.addEventListener('toggle', onToggle);
    return () => m.removeEventListener('toggle', onToggle);
  }, []);

  useEffect(() => {
    if (!off) return;
    const wake = () => setOff(false);
    const t = window.setTimeout(() => {
      addEventListener('keydown', wake, { once: true });
      addEventListener('pointerdown', wake, { once: true });
    }, 300);
    return () => {
      clearTimeout(t);
      removeEventListener('keydown', wake);
      removeEventListener('pointerdown', wake);
    };
  }, [off]);

  const close = () => menu.current?.hidePopover();

  return (
    <>
      <button
        ref={btn}
        type="button"
        popoverTarget="menu-iniciar"
        aria-expanded={open}
        data-start-btn
        className="start-btn -my-1 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs font-bold tracking-normal text-acid-ink normal-case"
      >
        <span aria-hidden className="start-flag" />
        Iniciar
      </button>
      <div ref={menu} id="menu-iniciar" popover="auto" aria-label="Menu Iniciar" className="start-menu win m-0 w-64 p-0 text-acid-ink">
        <div className="flex">
          <span aria-hidden className="start-side font-groovy">
            Hena<span className="text-acid">Web</span>
          </span>
          <nav className="flex-1 bg-[#c9c3d8] p-1">
            <ul className="flex flex-col">
              {ITEMS.map((it) => (
                <li key={it.href}>
                  <a href={it.href} onClick={close} className="start-item">
                    <span aria-hidden className="w-5 text-center">{it.icon}</span>
                    {it.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  className="start-item w-full"
                  onClick={() => {
                    close();
                    window.dispatchEvent(new CustomEvent('hena:search', { detail: '' }));
                  }}
                >
                  <span aria-hidden className="w-5 text-center">🔎</span>
                  Procurar…
                </button>
              </li>
              <li aria-hidden className="mx-1 my-1 border-t border-b border-t-[#7d7394] border-b-white" />
              <li>
                <button
                  type="button"
                  className="start-item w-full"
                  onClick={() => {
                    close();
                    setOff(true);
                  }}
                >
                  <span aria-hidden className="w-5 text-center">⏻</span>
                  Desligar…
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {off && (
        <div role="alertdialog" aria-label="Desligado" className="fixed inset-0 z-[200] grid place-items-center bg-black p-6 text-center">
          <p className="font-mono text-[clamp(1.1rem,3vw,1.8rem)] leading-snug text-acid">
            Agora você pode desligar
            <br />o computador com segurança.
            <span className="mt-6 block text-sm text-ink/60">(ou aperte qualquer tecla para voltar ao caso)</span>
          </p>
        </div>
      )}
    </>
  );
}
