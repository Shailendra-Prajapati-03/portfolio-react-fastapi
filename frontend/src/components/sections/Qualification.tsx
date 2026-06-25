import { FiAward, FiBriefcase } from "react-icons/fi";
import { timeline } from "../../data/content";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

export default function Qualification() {
  return (
    <Section
      id="qualification"
      eyebrow="My journey"
      title="Education & Experience"
      subtitle="The milestones that shaped my path as a developer."
    >
      <div className="relative mx-auto max-w-3xl">
        {/* Vertical line */}
        <div
          className="absolute left-4 top-0 h-full w-px sm:left-1/2 sm:-translate-x-1/2"
          style={{ background: "rgb(var(--border))" }}
        />

        <div className="space-y-8">
          {timeline.map((item, i) => {
            const left = i % 2 === 0;
            const NodeIcon = item.type === "experience" ? FiBriefcase : FiAward;
            return (
              <Reveal key={`${item.title}-${i}`} delay={i * 0.05}>
                <div
                  className={`relative flex items-start gap-6 pl-12 sm:pl-0 ${
                    left ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-4 top-1 -translate-x-1/2 sm:left-1/2">
                    <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-brand-500 bg-[rgb(var(--bg))] text-brand-500 shadow-glow">
                      <NodeIcon size={15} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="w-full sm:w-1/2">
                    <div
                      className={`rounded-2xl border surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-card ${
                        left ? "sm:mr-10 sm:text-right" : "sm:ml-10"
                      }`}
                    >
                      <span className="inline-block rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-500">
                        {item.period}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-muted">
                        {item.subtitle}
                      </p>
                      {item.detail && (
                        <p className="mt-2 text-sm text-muted">{item.detail}</p>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:block sm:w-1/2" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
