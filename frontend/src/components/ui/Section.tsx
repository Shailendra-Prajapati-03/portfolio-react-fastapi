import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

/** Standard section shell: anchor id, centered heading block, content slot. */
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-12 sm:py-16 ${className}`}>
      <div className="container-page">
        {(eyebrow || title) && (
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-sm text-muted sm:text-base">{subtitle}</p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
