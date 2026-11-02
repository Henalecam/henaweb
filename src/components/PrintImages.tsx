'use client';

import { useEffect } from 'react';
import { eagerImages } from '@/lib/printImages';

/** Ctrl+P anywhere: the lazy pictures not yet loaded start loading, so the print preview fills them in. */
export default function PrintImages() {
  useEffect(() => {
    const on = () => void eagerImages();
    window.addEventListener('beforeprint', on);
    return () => window.removeEventListener('beforeprint', on);
  }, []);
  return null;
}
