import { motion } from "framer-motion";
import { FiLayout, FiDatabase, FiTool } from "react-icons/fi";
import type { IconType } from "react-icons";
import { skillGroups } from "../../data/content";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

const groupIcons: IconType[] = [FiLayout, FiDatabase, FiTool];

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="What I work with"
      title="Skills & Technologies"
      subtitle="A toolkit honed across frontend, backend, and developer tooling."
    >
      <div className="grid items-stretch gap-4 sm:gap-5 md:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const Icon = groupIcons[gi % groupIcons.length];
          return (
            <Reveal key={group.title} delay={gi * 0.08} className="h-full">
              <div
                className="glass flex h-full flex-col rounded-3xl p-5 shadow-card
                  transition-[transform,box-shadow,border-color] duration-300 ease-out
                  hover:-translate-y-1 hover:border-brand-400/60 hover:shadow-glow"
              >
                {/* Group header */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-accent text-white shadow-glow">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold leading-tight tracking-tight">
                      {group.title}
                    </h3>
                    <p className="text-[0.7rem] uppercase tracking-wider text-muted">
                      {group.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skill bars — spread to fill the card so all columns stay balanced */}
                <div className="flex flex-1 flex-col justify-between gap-3.5">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex min-w-0 items-center gap-2 text-[0.8rem] font-medium">
                          <skill.icon
                            className="shrink-0 text-brand-500"
                            size={16}
                          />
                          <span className="truncate">{skill.name}</span>
                        </span>
                        <span className="shrink-0 text-[0.7rem] font-semibold tabular-nums text-brand-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-brand-500/10">
                        {/* Animate scaleX (transform) not width — no per-frame layout, stays 60fps */}
                        <motion.div
                          className="h-full w-full origin-left rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-accent"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: skill.level / 100 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            duration: 1.1,
                            delay: 0.15 + si * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
