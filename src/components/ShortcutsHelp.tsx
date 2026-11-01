'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import WinClose from './WinClose';

// `here`: the page(s) where a shortcut does something; rows without it work everywhere
const ROWS: { keys: string[][]; what: string; here?: (path: string) => boolean }[] = [
  { keys: [['⌘', 'K'], ['Ctrl', 'K'], ['/']], what: 'Procurar uma pista no site' },
  { keys: [['←'], ['→']], what: 'Folhear os casos ou serviços (dentro de um deles)', here: (p) => /^\/(casos|servicos)\/[\w-]+/.test(p) },
  { keys: [['G', 'H'], ['G', 'C']], what: 'G, depois H ou C: ir para o início ou para os casos' },
  { keys: [['G', 'J'], ['G', 'O']], what: 'G, depois J ou O: ir para os jogos ou abrir um caso' },
  { keys: [['J'], ['K']], what: 'Próximo / anterior caso (no arquivo de casos)', here: (p) => p === '/casos' },
  { keys: [['P']], what: 'Pausar ou retomar as faixas que correm sozinhas (letreiros e logos)', here: (p) => p === '/' },
  { keys: [['1'], ['2'], ['3']], what: 'Escolher uma máquina do fliperama (no Passa tempo)', here: (p) => p === '/passatempo' },
  { keys: [['Ctrl', 'Enter'], ['⌘', 'Enter']], what: 'Enviar o formulário de contato (na caixa de mensagem)', here: (p) => p === '/' },
  // the browser's own print, listed because case and service pages print as a clean dossier (or a PDF)
  { keys: [['Ctrl', 'P'], ['⌘', 'P']], what: 'Salvar um caso ou serviço como dossiê em PDF', here: (p) => /^\/(casos|servicos)\/[\w-]+/.test(p) },
  // AccordionKeys: the home's questions and capabilities, and each service page's questions
  { keys: [['↑'], ['↓'], ['Home'], ['End']], what: 'Pular entre as perguntas (com o foco numa delas)', here: (p) => p === '/' || /^\/servicos\/[\w-]+/.test(p) },
  { keys: [['Esc']], what: 'Fechar janelas e a busca' },
  { keys: [['?']], what: 'Abrir esta ajuda' },
];

/** "?" opens a Win95-style help window listing the keyboard shortcuts scattered around the site. */
export default function ShortcutsHelp({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  // the shortcuts that only work somewhere say whether this page is that place: the ones that work here get a
  // "● aqui", the others fade, so the list answers "what can I press now?" instead of listing everything flat
  const path = usePathname();

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    else if (!open && d.open) d.close();
  }, [open]);

  // try a key while the help is open and its keycap presses down, like a real keyboard
  useEffect(() => {
    if (!open) return;
    const NAMES: Record<string, string> = { Control: 'Ctrl', Meta: '⌘', Escape: 'Esc', ArrowLeft: '←', ArrowRight: '→' };
    const press = (e: KeyboardEvent, down: boolean) => {
      const name = NAMES[e.key] ?? (e.key.length === 1 ? e.key.toUpperCase() : e.key);
      dialog.current?.querySelectorAll('kbd').forEach((k) => {
        if (k.textContent?.toUpperCase() === name.toUpperCase()) k.toggleAttribute('data-down', down);
      });
    };
    const onDown = (e: KeyboardEvent) => press(e, true);
    const onUp = (e: KeyboardEvent) => press(e, false);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      dialog.current?.querySelectorAll('kbd[data-down]').forEach((k) => k.removeAttribute('data-down'));
    };
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="atalhos-titulo"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      data-print-hide
      className="win m-auto w-[min(92vw,30rem)] max-w-none p-0 text-acid-ink backdrop:bg-[#0d0820]/70 backdrop:backdrop-blur-sm"
    >
      <div className="win-bar">
        <span id="atalhos-titulo">atalhos.hlp</span>
        <WinClose onClick={onClose} label="Fechar ajuda" className="ml-auto" autoFocus />
      </div>
      <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-5">
        <p className="font-mono text-xs tracking-[0.12em] text-acid-ink/75 uppercase">Atalhos do detetive</p>
        <dl className="mt-4 divide-y divide-acid-ink/15">
          {ROWS.map((r) => {
            const local = r.here ? r.here(path) : null;
            // rows for other pages are dimmed by colour, not by opacity on the whole row: at 55% the row's text fell under
            // 4.5:1 on the paper (axe, at 390 px); the keycaps alone keep a lighter look
            return (
            <div key={r.what} data-here={local === null ? undefined : String(local)} className={`flex items-center justify-between gap-4 py-2.5 ${local === false ? 'text-acid-ink/75 [&_kbd]:opacity-60' : ''}`}>
              <dt className="flex flex-wrap items-center gap-1.5">
                {r.keys.map((combo, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="mx-1 font-mono text-xs text-acid-ink/60">ou</span>}
                    {combo.map((k) => (
                      <kbd key={k} className="min-w-7 rounded-md border-2 border-acid-ink border-b-4 bg-white px-1.5 py-0.5 text-center font-mono text-xs data-down:mt-0.5 data-down:border-b-2 data-down:bg-lemon">
                        {k}
                      </kbd>
                    ))}
                  </span>
                ))}
              </dt>
              <dd className="text-right text-sm">
                {r.what}
                {local === true && <span className="ml-1.5 font-mono text-[0.68rem] font-bold whitespace-nowrap text-[#c2410c]">● aqui</span>}
                {local === false && <span className="sr-only"> (não nesta página)</span>}
              </dd>
            </div>
            );
          })}
        </dl>
        <p className="serif mt-5 text-sm text-acid-ink/75 italic">Dizem que um código antigo de videogame (ou uma lua nova, lá no rodapé) acende uma lanterna por aqui…</p>
      </div>
    </dialog>
  );
}
