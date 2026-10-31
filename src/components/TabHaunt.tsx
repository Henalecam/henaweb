'use client';

import { useEffect } from 'react';
import { projectLinks } from '@/lib/projectLinks';
import { serviceLinks } from '@/lib/serviceLinks';

const AWAY = '👻 Volte! O caso ainda não acabou';
// a contact form left half-filled (Contact's same-tab draft, cleared on send) gets a more specific nudge
const AWAY_DRAFT = '✉ Seu caso ficou pela metade';
const hasDraft = () => {
  try {
    const d = JSON.parse(sessionStorage.getItem('hena:draft') ?? 'null');
    return !!d && (d.picked?.length > 0 || Object.values(d.fields ?? {}).some((v) => typeof v === 'string' && v.trim() !== ''));
  } catch {
    return false;
  }
};
// the tab's icon joins in while the visitor is away: a little ghost (or an envelope, when the form was left
// half-filled), drawn inline as SVG and appended as the last icon link, which browsers prefer; removed on return
const svgIcon = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${body}</svg>`)}`;
const GHOST_ICON = svgIcon(
  '<rect width="32" height="32" rx="8" fill="#140c2e"/><path d="M8 27V14a8 8 0 0 1 16 0v13l-2.7-2.2L18.7 27 16 24.8 13.3 27l-2.6-2.2Z" fill="#fdf3e1"/><circle cx="13" cy="14" r="1.8" fill="#140c2e"/><circle cx="19" cy="14" r="1.8" fill="#140c2e"/>',
);
const DRAFT_ICON = svgIcon(
  '<rect width="32" height="32" rx="8" fill="#f7931e"/><rect x="6" y="9" width="20" height="14" rx="2" fill="#fdf3e1" stroke="#1a0f2e" stroke-width="2"/><path d="m7 10 9 7 9-7" fill="none" stroke="#1a0f2e" stroke-width="2"/>',
);
const showAwayIcon = (href: string | null) => {
  document.getElementById('hena-away-icon')?.remove();
  if (!href) return;
  const link = document.createElement('link');
  link.id = 'hena-away-icon';
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  document.head.appendChild(link);
};
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/**
 * "Modo lanterna": the lights go out and the pointer becomes a detective's flashlight. A CSS
 * radial mask over a dark layer, pointer-events none, so the page stays fully usable. Esc or the
 * code again turns the lights back on.
 */
// in the dark, the flashlight finds notes the lights hid: real tips, scattered around the screen
const CLUES = [
  'Pista nº 1: a tecla / abre a busca do site.',
  'Pista nº 2: aperte ? e veja todos os atalhos.',
  'Pista nº 3: lá no rodapé, digite henaweb.',
  'Pista nº 4: a campainha do balcão não gosta de pressa.',
];

function scatterClues() {
  const box = document.createElement('div');
  box.id = 'lanterna-pistas';
  box.setAttribute('aria-hidden', 'true');
  box.dataset.printHide = '';
  Object.assign(box.style, { position: 'fixed', inset: '0', zIndex: '94', pointerEvents: 'none' });
  // one clue per screen quarter, at a random spot inside it, so they never pile up
  CLUES.forEach((text, i) => {
    const el = document.createElement('p');
    el.textContent = text;
    // wide screens: a 2×2 grid, the left column anchored by its left edge and the right one by its right
    // edge; phones: one column, a row each. Nothing runs off screen and no two notes overlap
    const narrow = innerWidth < 640;
    const side = 4 + Math.random() * (narrow ? 20 : 14);
    const top = narrow ? i * 23 + 8 + Math.random() * 8 : Math.floor(i / 2) * 50 + 10 + Math.random() * 25;
    Object.assign(el.style, {
      position: 'absolute',
      [!narrow && i % 2 ? 'right' : 'left']: `${side}%`,
      top: `${top}%`,
      maxWidth: narrow ? '70vw' : '42vw',
      rotate: `${Math.random() * 10 - 5}deg`,
      font: '600 14px/1.3 ui-monospace, monospace',
      color: '#140a26',
      background: '#f9e27d',
      padding: '6px 10px',
      borderRadius: '4px',
      boxShadow: '3px 3px 0 #140a26',
    });
    box.appendChild(el);
  });
  document.body.appendChild(box);
  return box;
}

function toggleFlashlight(force?: boolean) {
  const existing = document.getElementById('lanterna');
  if (force === true && existing) return;
  if (force === false && !existing) return;
  if (existing) {
    existing.remove();
    document.getElementById('lanterna-pistas')?.remove();
    return;
  }
  const clues = scatterClues();
  const el = document.createElement('div');
  el.id = 'lanterna';
  el.setAttribute('aria-hidden', 'true');
  el.dataset.printHide = '';
  Object.assign(el.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '95',
    pointerEvents: 'none',
    background: 'radial-gradient(circle 170px at var(--lx, 50%) var(--ly, 40%), transparent 0 60%, rgb(6 3 16 / 0.94) 100%)',
  });
  document.body.appendChild(el);
  const move = (e: PointerEvent) => {
    el.style.setProperty('--lx', `${e.clientX}px`);
    el.style.setProperty('--ly', `${e.clientY}px`);
  };
  const off = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    el.remove();
    clues.remove();
  };
  window.addEventListener('pointermove', move, { passive: true });
  // touch screens have no hover: the beam jumps to wherever the finger lands
  window.addEventListener('pointerdown', move, { passive: true });
  window.addEventListener('keydown', off);
  new MutationObserver((_, obs) => {
    if (el.isConnected) return;
    clues.remove();
    window.removeEventListener('pointermove', move);
    window.removeEventListener('pointerdown', move);
    window.removeEventListener('keydown', off);
    obs.disconnect();
  }).observe(document.body, { childList: true });
}

/** The tab gets haunted while the visitor is away; a note (and a Konami code) waits in the console for curious devs. */
export default function TabHaunt() {
  useEffect(() => {
    let original = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        original = document.title;
        const draft = hasDraft();
        document.title = draft ? AWAY_DRAFT : AWAY;
        showAwayIcon(draft ? DRAFT_ICON : GHOST_ICON);
      } else {
        showAwayIcon(null);
        if (document.title === AWAY || document.title === AWAY_DRAFT) document.title = original;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // the Konami code turns the site into a flashlight search; the console hints at it
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"]');
      if (typing) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      // mid-code (after ↑ ↑) other arrow shortcuts, like ← → between cases, stand down
      if (progress >= 2) document.documentElement.dataset.konami = '';
      else delete document.documentElement.dataset.konami;
      if (progress === KONAMI.length) {
        progress = 0;
        delete document.documentElement.dataset.konami;
        toggleFlashlight();
      }
    };
    window.addEventListener('keydown', onKey);
    // the other way in, for phones without a keyboard: darkening the footer moon (Chase) puts the lights out
    const onLantern = (e: Event) => toggleFlashlight((e as CustomEvent<boolean>).detail);
    window.addEventListener('hena:lanterna', onLantern);

    console.log(
      '%cHenaWeb%c\nInvestigando o código? A gente gosta de gente curiosa.\nhenrique@henaweb.com\n\nPista: ↑ ↑ ↓ ↓ ← → ← → B A apaga as luzes.\nOu digite %chena.ajuda()%c aqui no console.',
      'font: 700 28px Georgia, serif; color: #f7931e; text-shadow: 3px 3px 0 #140a26;',
      'font: 13px monospace; color: #3cc6b4;',
      'font: 700 13px monospace; color: #f9e27d; background: #140a26; padding: 1px 4px; border-radius: 3px;',
      'font: 13px monospace; color: #3cc6b4;',
    );
    // a small detective kit for whoever opens the console: the case files as a table, the services, the
    // flashlight and a way to reach us, all in the site's own voice
    const tip = 'font: 13px monospace; color: #3cc6b4;';
    const kit = {
      ajuda() {
        console.log(
          '%chena.casos()%c     os casos resolvidos, em tabela\n%chena.servicos()%c  o que a gente faz\n%chena.lanterna()%c apaga (e acende) as luzes\n%chena.contato()%c  abre um caso com a gente',
          ...Array(4).fill(['font: 700 13px monospace; color: #f9e27d;', tip]).flat(),
        );
      },
      casos() {
        console.table(projectLinks.map((c, i) => ({ nº: String(i + 1).padStart(2, '0'), caso: c.name, arquivo: `${location.origin}/casos/${c.slug}` })));
      },
      servicos() {
        console.table(serviceLinks.map((s) => ({ serviço: s.name, página: `${location.origin}/servicos/${s.slug}` })));
      },
      lanterna() {
        toggleFlashlight();
        return document.getElementById('lanterna') ? '🔦 luzes apagadas' : '💡 luzes acesas';
      },
      contato() {
        location.assign('/#contato');
        return 'Abrindo o formulário de contato…';
      },
    };
    (window as unknown as { hena?: typeof kit }).hena = kit;

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      showAwayIcon(null);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('hena:lanterna', onLantern);
      delete (window as unknown as { hena?: unknown }).hena;
    };
  }, []);

  return null;
}
