import type { Metadata } from 'next';
import { site } from '@/lib/site';
import OfflineList from '@/components/OfflineList';

export const metadata: Metadata = {
  title: 'Sem sinal',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: { url: null },
};

/**
 * What the service worker (public/sw.js) shows when the visitor is offline and opens a page they never read
 * here: a Win95 "no signal" window listing the pages this browser did keep, which do open without internet.
 */
export default function Offline() {
  return (
    <main id="conteudo" tabIndex={-1} className="sky relative flex min-h-[100svh] items-center overflow-x-clip text-ink">
      <div className="grid-floor !h-[28%] opacity-50" aria-hidden />
      <div className="relative mx-auto w-[min(100%-2rem,32rem)] py-28">
        <div className="win">
          <div className="win-bar">
            <span>sem_sinal.exe</span>
          </div>
          <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-6 text-acid-ink">
            <p className="label !text-[#c2410c]">Conexão perdida</p>
            <h1 className="mt-2 text-3xl leading-tight font-medium tracking-tight">
              A pista sumiu do <span className="font-groovy tracking-normal text-[#c2410c]">radar.</span>
            </h1>
            <p className="mt-3 text-acid-ink/75">
              Você está sem internet e esta página ainda não tinha sido aberta aqui. Mas o arquivo guarda o que você já leu:
            </p>
            <OfflineList />
            <p className="mt-6 font-mono text-xs text-acid-ink/70">
              Quando o sinal voltar, é só recarregar. Ou fale direto: {site.whatsappDisplay} · {site.email}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
