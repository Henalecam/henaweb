'use client';

import { addToDraft } from '@/lib/draft';

/**
 * "Abrir um caso parecido" on a case page: the form opens with the case already named in the message ("Vi o caso
 * EcoBrain e quero algo parecido."), on the message box, so the visitor goes on from there instead of explaining
 * which case they meant. Without JavaScript it is the plain link to the form.
 */
export default function SimilarCase({ name, className }: { name: string; className: string }) {
  return (
    <a
      href="/#contato"
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        addToDraft(`Vi o caso ${name} e quero algo parecido.`);
        location.href = '/#mensagem';
      }}
      className={className}
    >
      Abrir um caso parecido →
    </a>
  );
}
