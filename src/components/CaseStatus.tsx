'use client';

import { useEffect, useState } from 'react';

/**
 * /casos: the archive's status bar, like the one along the bottom of an Explorer window. How many cases are
 * showing (after a service filter), how many of them this browser already opened (hena:read, ReadMarks) and how
 * many the archive holds, and the order when the details view's headers changed it. Read from the list itself and kept in step with the filter and the read marks.
 */
export default function CaseStatus() {
  const [s, setS] = useState<{ shown: number; read: number; total: number; sort?: string; onlyUnread?: boolean } | null>(null);

  useEffect(() => {
    const list = document.querySelector<HTMLElement>('[data-case-list]');
    if (!list) return;
    const read = () => {
      const rows = [...list.querySelectorAll<HTMLElement>(':scope > li[data-case-slug]')];
      const shown = rows.filter((li) => !li.hidden);
      const readCount = shown.filter((li) => li.hasAttribute('data-case-read')).length;
      // "mostrar só os que faltam" (ReadProgress, html[data-only-unread]) hides the read rows: count what's on screen
      const onlyUnread = document.documentElement.hasAttribute('data-only-unread');
      const visible = onlyUnread ? shown.length - readCount : shown.length;
      // the empty folder that fills an odd grid (globals.css data-odd) follows what is really on screen
      list.toggleAttribute('data-odd', visible % 2 === 1);
      setS({ shown: visible, read: readCount, total: rows.length, sort: list.dataset.sort, onlyUnread });
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(list, { subtree: false, childList: true, attributes: true, attributeFilter: ['hidden', 'data-case-read', 'data-sort'] });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-only-unread'] });
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
        {s.onlyUnread && ' · só os que faltam'}
      </span>
      <span>
        {s.read} {s.read === 1 ? 'investigado' : 'investigados'}
      </span>
      {/* the order picked in the details view's headers (CaseSort), or the archive's name when it's the usual one */}
      <span className={s.sort ? '' : 'hidden sm:inline'}>{s.sort ? `ordem: ${s.sort}` : 'arquivo_de_casos'}</span>
    </p>
  );
}
