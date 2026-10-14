'use client';

import { useEffect } from 'react';

const AWAY = '👻 Volte! O caso ainda não acabou';

/** The tab gets haunted while the visitor is away; a note waits in the console for curious devs. */
export default function TabHaunt() {
  useEffect(() => {
    let original = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        original = document.title;
        document.title = AWAY;
      } else if (document.title === AWAY) {
        document.title = original;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    console.log(
      '%cHenaWeb%c\nInvestigando o código? A gente gosta de gente curiosa.\nhenrique@henaweb.com',
      'font: 700 28px Georgia, serif; color: #f7931e; text-shadow: 3px 3px 0 #140a26;',
      'font: 13px monospace; color: #3cc6b4;',
    );

    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return null;
}
