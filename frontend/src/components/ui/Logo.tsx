interface LogoProps {
  /** Extra classes on the wrapping anchor. */
  className?: string;
  /** Size utility for the wordmark text (defaults to navbar size). */
  textClassName?: string;
}

/**
 * Brand mark — a minimal gradient monogram tile paired with the wordmark.
 * The line-style "S" glyph matches the Feather icon language used site-wide,
 * and the brand→accent gradient keeps it on-palette.
 */
export default function Logo({
  className = "",
  textClassName = "text-lg",
}: LogoProps) {
  return (
    <a
      href="#home"
      aria-label="Shailendra — back to top"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br
          from-brand-500 to-accent text-white shadow-glow ring-1 ring-white/20
          transition-transform duration-300 ease-out group-hover:scale-105"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-[18px] w-[18px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16.5 7.4c-1.2-1.5-3-2.1-4.9-1.9-2 .2-3.1 1.3-3.1 2.8 0 1.7 1.4 2.4 3.9 2.9 2.6.5 4.1 1.3 4.1 3.1 0 1.6-1.5 2.9-3.7 3.1-2 .2-3.8-.5-5.1-2" />
        </svg>
      </span>
      <span
        className={`font-display font-bold tracking-tight ${textClassName}`}
      >
        Shailendra
      </span>
    </a>
  );
}
