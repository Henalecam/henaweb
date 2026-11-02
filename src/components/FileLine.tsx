'use client';

import { useEffect, useState, type CSSProperties } from 'react';

/**
 * The blank case file's first line (ClosingCta): "cliente: você", until the visitor has started the contact form
 * in this tab. Then the file already knows who it is for and says their first name ("cliente: Ana"), read from the
 * same-tab draft Contact keeps (sessionStorage, never sent anywhere). The server HTML keeps "você".
 */
export default function FileLine({ caseNo }: { caseNo: string }) {
  const [who, setWho] = useState('você');
  useEffect(() => {
    try {
      const d = JSON.parse(sessionStorage.getItem('hena:draft') ?? 'null');
      const first = typeof d?.fields?.name === 'string' ? d.fields.name.trim().split(/\s+/)[0] : '';
      // a name-like first word only, and short enough to keep the line on one row
      if (first && first.length <= 16 && /^[\p{L}'’-]+$/u.test(first)) setWho(first);
    } catch {
      // no storage (private mode, blocked): the file stays addressed to "você"
    }
  }, []);
  const line = `Caso nº ${caseNo} · em aberto · cliente: ${who}`;
  return (
    <span data-typed style={{ '--n': line.length } as CSSProperties}>
      {line}
    </span>
  );
}
