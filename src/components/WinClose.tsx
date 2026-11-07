/**
 * The × of a Win95 title bar: the bevelled square stays its period size (18×17) while the button around
 * it is a 24×24 target (WCAG 2.5.8), pulled back with negative margins so the title bar doesn't grow.
 */
export default function WinClose({
  onClick,
  label,
  autoFocus,
  className = '',
}: {
  onClick: () => void;
  label: string;
  autoFocus?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      autoFocus={autoFocus}
      className={`group -mx-[2.8px] -my-[3.6px] grid h-6 w-6 shrink-0 place-items-center ${className}`}
    >
      <span aria-hidden className="win-btn group-hover:brightness-110">
        ×
      </span>
    </button>
  );
}
