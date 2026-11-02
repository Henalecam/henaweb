'use client';

/**
 * A technology in a service's stack is a search: "PostgreSQL" opens the site search already filled in,
 * listing every service that uses it (the same hena:search event the capability tags use).
 */
export default function StackChip({ tech }: { tech: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent('hena:search', { detail: tech }))}
      aria-label={`Procurar ${tech} no site`}
      className="inline-flex min-h-7 items-center rounded-full border-2 border-ink/25 px-3 font-mono text-xs text-ink/75 uppercase transition-colors hover:border-acid hover:text-ink focus-visible:border-acid focus-visible:text-ink"
    >
      {tech}
    </button>
  );
}
