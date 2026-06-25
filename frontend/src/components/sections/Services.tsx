import { FiZap, FiBarChart2, FiCode, FiCheck } from "react-icons/fi";
import type { IconType } from "react-icons";
import { services } from "../../data/content";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

const icons: IconType[] = [FiZap, FiBarChart2, FiCode];

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="What I offer"
      title="Services"
      subtitle="How I can help bring your product ideas to life."
    >
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={service.title} delay={i * 0.1}>
              <div className="group relative h-full overflow-hidden rounded-3xl border surface p-7 transition-all duration-300 hover:-translate-y-2 hover:border-brand-400 hover:shadow-card">
                {/* hover glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent text-white shadow-glow">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {service.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <FiCheck className="mt-0.5 shrink-0 text-brand-500" />
                      <span className="text-muted">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
