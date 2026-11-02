'use client';

import { useEffect, useState } from 'react';

/**
 * /casos: the archive's status bar, like the one along the bottom of an Explorer window. How many cases are
 * showing (after a service filter), how many of them this browser already opened (hena:read, ReadMarks) and how
 * many the archive holds. Read from the list itself and kept in step with the filter and the read marks.
 */
export default function CaseStatus() {
  const [s, setS] = useState<{ shown: number; read: number; total: number } | null>(null);

  useEffect(() => {
    const list = document.querySelector<HTMLElement>('[data-case-list]');
    if (!list) return;
    const read = () => {
      const rows = [...list.querySelectorAll<HTMLElement>(':scope > li[data-case-slug]')];
      const shown = rows.filter((li) => !li.hidden);
      setS({ shown: shown.length, read: shown.filter((li) => li.hasAttribute('data-case-read')).length, total: rows.length });
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(list, { subtree: false, childList: true, attributes: true, attributeFilter: ['hidden', 'data-case-read'] });
    // the rows' own attributes change, not the list's: watch each of them too
    list.querySelectorAll(':scope > li').forEach((li) => obs.observe(li, { attributes: true, attributeFilter: ['hidden', 'data-case-read'] }));
    return () => obs.disconnect();
  }, []);

  if (!s) return null;
  return (
    <p className="case-status mt-6 flex gap-[3px] border-2 border-[#7d7394] bg-[#c9c3d8] p-[3px] font-mono text-[0.68rem] text-[#12082a] shadow-[inset_1px_1px_0_#fff] print:hidden">
      <span className="flex-1">
        {s.shown} {s.shown === 1 ? 'caso' : 'casos'}
        {s.shown < s.total && ` de ${s.total}`}
      </span>
      <span>
        {s.read} {s.read === 1 ? 'investigado' : 'investigados'}
      </span>
      <span className="hidden sm:inline">arquivo_de_casos</span>
    </p>
  );
}
