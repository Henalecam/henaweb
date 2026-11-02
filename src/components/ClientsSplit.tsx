'use client';

import { useState } from 'react';

type Group = 'public' | 'private';

/**
 * Clients strip: the two counts ("N no setor público", "N empresas") are also switches. Pressing one leaves its
 * logos in full colour on the passing tape and fades the others, so "who are the public ones?" is answered by
 * looking; pressing it again (or the other) changes the view. Pointing at a count previews the same thing (CSS,
 * globals.css). The logos keep moving and keep their names; only their emphasis changes.
 */
export default function ClientsSplit({ publicCount, privateCount }: { publicCount: number; privateCount: number }) {
  const [show, setShow] = useState<Group | null>(null);

  const pick = (g: Group) => {
    const next = show === g ? null : g;
    setShow(next);
    const section = document.getElementById('clientes');
    if (next) section?.setAttribute('data-show', next);
    else section?.removeAttribute('data-show');
  };

  const chip = (g: Group, n: number, label: string, dot: string) => (
    <button
      type="button"
      data-split={g}
      aria-pressed={show === g}
      onClick={() => pick(g)}
      className="clients-chip inline-flex min-h-7 items-center gap-1.5 rounded-full border border-acid-ink/25 px-2 py-0.5 uppercase"
    >
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {n} {label}
      <span className="sr-only"> (destacar estes logos)</span>
    </button>
  );

  return (
    <p data-clients-split className="flex flex-wrap gap-2 font-mono text-[0.68rem] tracking-wider text-acid-ink/75">
      {chip('public', publicCount, 'no setor público', 'bg-teal')}
      <span className="sr-only">, </span>
      {chip('private', privateCount, 'empresas', 'bg-acid')}
    </p>
  );
}
