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
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 lg:items-stretch">
        <Reveal className="h-full">
          <div className="glass relative h-full overflow-hidden rounded-3xl p-1 shadow-card">
            <div className="flex h-full flex-col rounded-[1.4rem] bg-gradient-to-br from-brand-500/10 to-accent/10 p-6 sm:p-7">
              <p className="font-display text-lg font-semibold leading-snug sm:text-xl">
                I'm <span className="text-gradient">{profile.name}</span>, a
                Software & Web Developer.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                {profile.bio}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                I have a high level of experience in web design and development,
                consistently producing quality work that balances aesthetics,
                performance, and maintainability.
              </p>

              <a href="#contact" className="btn-primary mt-6 self-start">
                Let's work together
              </a>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-fr">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div
                className="group h-full rounded-2xl border surface p-5 shadow-soft
                  transition-[transform,box-shadow,border-color] duration-300 ease-out
                  hover:-translate-y-1 hover:scale-[1.01] hover:border-brand-400/60 hover:shadow-glow"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-500">
                  <f.icon size={18} />
                </div>
                <p className="mt-4 text-[0.7rem] uppercase tracking-wider text-muted">
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
