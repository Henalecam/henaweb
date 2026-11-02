'use client';

/** /acessibilidade: opens the same keyboard-shortcuts list as the "?" key (Nav listens for hena:help). */
export default function ShowShortcuts() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event('hena:help'))}
      className="mt-3 inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-acid-ink underline decoration-acid-ink/40 underline-offset-4 hover:decoration-acid-ink print:hidden"
    >
      <kbd className="rounded border border-b-2 border-acid-ink/50 px-1 font-mono text-xs">?</kbd> Ver os atalhos
    </button>
  );
}
