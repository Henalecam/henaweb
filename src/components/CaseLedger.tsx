'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { projectLinks } from '@/lib/projectLinks';

/**
 * 404: a lost visitor still has a trail. The case files this browser already opened (hena:read, ReadMarks) show as
 * stamped folders, the rest as closed ones, with the next unread case as the obvious way out. Nothing is sent
 * anywhere; on a first visit it simply suggests the first case.
 */
export default function CaseLedger() {
  const [read, setRead] = useState<string[] | null>(null);

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem('hena:read') ?? '[]');
      setRead(Array.isArray(v) ? v.filter((s) => typeof s === 'string') : []);
    } catch {
      setRead([]);
    }
  }, []);

  if (!read) return <div className="mt-12 min-h-[11rem]" aria-hidden />;

  const done = projectLinks.filter((p) => read.includes(p.slug)).length;
  const next = projectLinks.find((p) => !read.includes(p.slug));
  const total = projectLinks.length;

  return (
    <section aria-labelledby="ledger-title" className="mt-12 min-h-[11rem]">
      <h2 id="ledger-title" className="label !text-teal">
        Seu arquivo de investigação
      </h2>
      <p className="mt-3 text-ink/75">
        {done === 0
          ? 'Nenhum caso aberto ainda neste navegador. Que tal começar pelo primeiro?'
          : done === total
            ? `Você já leu os ${total} casos. Detetive de carteirinha.`
            : `${done} de ${total} casos investigados neste navegador.`}
      </p>
      <ol className="ledger mt-4 flex flex-wrap gap-2.5">
        {projectLinks.map((p, i) => {
          const isRead = read.includes(p.slug);
          const isNext = p.slug === next?.slug;
          return (
            <li key={p.slug}>
              <a
                href={`/casos/${p.slug}`}
                className="ledger-folder"
                data-read={isRead ? '' : undefined}
                data-next={isNext ? '' : undefined}
                aria-label={`Caso ${p.name}${isRead ? ' (já investigado)' : isNext ? ' (próxima pista)' : ''}`}
                style={{ '--i': i } as CSSProperties}
              >
                <span aria-hidden className="ledger-ico" />
                <span aria-hidden className="ledger-name">{p.name}</span>
                {isRead && (
                  <span aria-hidden className="ledger-ok">
                    ✓
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ol>
      {next && (
        <p className="mt-5">
          <a href={`/casos/${next.slug}`} className="font-medium text-acid underline decoration-2 underline-offset-4 hover:text-ink">
            Próxima pista: {next.name} →
          </a>
        </p>
      )}
    </section>
  );
}
