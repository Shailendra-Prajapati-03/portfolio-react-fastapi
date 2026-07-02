import {
  FiCheckCircle,
  FiCheck,
  FiGlobe,
  FiTool,
  FiExternalLink,
} from "react-icons/fi";
import { qaExperience } from "../../data/content";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

/** Subsection label with a small brand-tinted icon (matches the card style). */
function GroupLabel({
  icon: Icon,
  children,
}: {
  icon: typeof FiGlobe;
  children: React.ReactNode;
}) {
  return (
    <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
      <Icon className="text-brand-500" size={14} />
      {children}
    </h4>
  );
}

export default function ManualQA() {
  const qa = qaExperience;
  return (
    <Section
      id="qa"
      eyebrow="Quality Assurance"
      title="Manual QA Testing Experience"
      subtitle="Hands-on experience testing real-world web applications by identifying bugs, validating workflows, improving usability, and ensuring software quality."
    >
      <Reveal>
        <div
          className="glass rounded-3xl p-6 shadow-soft transition-[box-shadow,border-color] duration-300
            ease-out hover:border-brand-400/60 hover:shadow-card sm:p-8"
        >
          {/* Role header */}
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent text-white shadow-glow">
              <FiCheckCircle size={22} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold leading-tight">
                {qa.role}
              </h3>
              <p className="text-sm text-muted">{qa.roleLabel}</p>
            </div>
          </div>

          {/* Summary */}
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
            {qa.description}
          </p>

          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            {/* Left: websites + tools */}
            <div className="space-y-6">
              <div>
                <GroupLabel icon={FiGlobe}>Websites Tested</GroupLabel>
                <div className="flex flex-wrap gap-2">
                  {qa.websites.map((w) => (
                    <a
                      key={w.label}
                      href={w.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-brand-500/20
                        bg-brand-500/10 px-3 py-1.5 text-xs font-medium text-brand-500 transition-all duration-300
                        hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white hover:shadow-glow"
                    >
                      {w.label}
                      <FiExternalLink
                        size={12}
                        className="opacity-70 transition-opacity group-hover:opacity-100"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <GroupLabel icon={FiTool}>Tools &amp; Skills</GroupLabel>
                <div className="flex flex-wrap gap-2">
                  {qa.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-500"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: responsibilities checklist */}
            <div>
              <GroupLabel icon={FiCheckCircle}>Responsibilities</GroupLabel>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {qa.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm">
                    <FiCheck
                      className="mt-0.5 shrink-0 text-brand-500"
                      size={15}
                    />
                    <span className="text-muted">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
