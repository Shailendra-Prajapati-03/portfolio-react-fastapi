import { FiMapPin, FiMail, FiUser, FiCalendar } from "react-icons/fi";
import { profile } from "../../data/content";
import Section from "../ui/Section";
import Reveal from "../ui/Reveal";

const facts = [
  { icon: FiUser, label: "Name", value: profile.name },
  { icon: FiCalendar, label: "Age", value: `${profile.age} years` },
  { icon: FiMapPin, label: "Location", value: "Mumbai, Maharashtra" },
  { icon: FiMail, label: "Email", value: profile.email },
];

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="Get to know me"
      title="About Me"
      subtitle="A short introduction to who I am and what drives my work."
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-stretch">
        <Reveal className="h-full">
          <div className="glass relative h-full overflow-hidden rounded-3xl p-1 shadow-card">
            <div className="flex h-full flex-col rounded-[1.4rem] bg-gradient-to-br from-brand-500/10 to-accent/10 p-8">
              <p className="font-display text-lg font-semibold leading-snug sm:text-xl">
                I'm <span className="text-gradient">{profile.name}</span>, a
                Software & Web Developer.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {profile.bio}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                I have a high level of experience in web design and development,
                consistently producing quality work that balances aesthetics,
                performance, and maintainability.
              </p>

              <a href="#contact" className="btn-primary mt-7 self-start">
                Let's work together
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-fr">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div
                className="group h-full rounded-2xl border surface p-5 transition-all duration-300
                  hover:-translate-y-1 hover:border-brand-400 hover:shadow-glow"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                  <f.icon size={20} />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wider text-muted">
                  {f.label}
                </p>
                <p className="mt-1 text-sm font-medium [overflow-wrap:anywhere]">{f.value}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
