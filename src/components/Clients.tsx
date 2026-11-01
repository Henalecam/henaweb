import { clients } from '@/lib/content';
import Marquee from './Marquee';
import ClientsSplit from './ClientsSplit';

/** One line of client logos, looping. */
export default function Clients() {
  const publicCount = clients.filter((c) => c.group === 'public').length;
  const privateCount = clients.length - publicCount;
  return (
    <section
      id="clientes"
      aria-labelledby="clientes-titulo"
      data-sheet className="relative z-[5] -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon bg-white pt-10 pb-16 md:pt-12 md:pb-20"
    >
      <div className="gutter flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
        <h2 id="clientes-titulo" className="label !text-acid-ink/60">
          Alguns de nossos clientes
        </h2>
        {/* who they are, counted from the same list as the logos; each count also highlights its own logos (ClientsSplit) */}
        <ClientsSplit publicCount={publicCount} privateCount={privateCount} />
      </div>
      <ul className="sr-only">
        {clients.map((c) => (
          <li key={c.name}>{c.name}</li>
        ))}
      </ul>
      <div className="mt-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <Marquee
          speed={38}
          separator={<span className="w-[clamp(2.5rem,6vw,5rem)] shrink-0" />}
          items={clients.map((c) => (
            <span key={c.name} data-group={c.group} className="client-logo flex h-[clamp(3rem,6vw,4.5rem)] items-center">
              {c.logo ? (
                // plain img: small SVG/WebP logos (about 2x their display size), sized by height
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.logo}
                  alt={c.name}
                  width={c.w}
                  height={c.h}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-auto max-w-[14rem] object-contain"
                  style={{ transform: c.scale ? `scale(${c.scale})` : undefined }}
                />
              ) : (
                <span className="text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold tracking-[-0.02em] text-[#1a2b5f]">{c.name}</span>
              )}
            </span>
          ))}
        />
      </div>
    </section>
  );
}
