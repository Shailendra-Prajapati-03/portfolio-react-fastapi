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
      <div className="grid gap-6 md:grid-cols-3">
        {skillGroups.map((group, gi) => {
          const Icon = groupIcons[gi % groupIcons.length];
          return (
            <Reveal key={group.title} delay={gi * 0.1} className="h-full">
              <div className="glass flex h-full flex-col rounded-3xl p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-400 hover:shadow-glow">
                {/* Group header */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-accent text-white shadow-glow">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight">
                      {group.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {group.skills.length} technologies
                    </p>
                  </div>
                </div>

                {/* Skill bars — spread to fill the card so all columns stay balanced */}
                <div className="flex flex-1 flex-col justify-between gap-5">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium">
                          <skill.icon className="text-brand-500" size={18} />
                          {skill.name}
                        </span>
                        <span className="font-semibold text-brand-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-brand-500/10">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: 0.2 + si * 0.08,
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
