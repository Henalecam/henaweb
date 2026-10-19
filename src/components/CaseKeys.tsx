'use client';

import { useEffect } from 'react';

/** ← / → walk through the case files, like flipping folders in a cabinet. */
export default function CaseKeys({ prev, next }: { prev: string; next: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea, select, [contenteditable="true"], [role="tablist"], dialog[open]')) return;
      if (document.querySelector('dialog[open]')) return;
      e.preventDefault();
      window.location.href = e.key === 'ArrowLeft' ? prev : next;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);
  return null;
}
