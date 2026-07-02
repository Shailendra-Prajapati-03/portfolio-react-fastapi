import { FiArrowUp } from "react-icons/fi";
import { navLinks, profile } from "../../data/content";
import SocialIcons from "../ui/SocialIcons";
import Logo from "../ui/Logo";

export default function Footer() {
  const year = 2026; // build-time constant; update on release

  return (
    <footer className="relative overflow-hidden border-t surface">
      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-hero-glow" />
      <div className="container-page py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo textClassName="text-xl" />
            <p className="mt-3 max-w-xs text-sm text-muted">{profile.tagline}</p>
            <SocialIcons className="mt-5" />
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Navigate
            </h4>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-muted transition-colors hover:text-brand-500"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="transition-colors hover:text-brand-500"
                >
                  {profile.email}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted sm:flex-row"
          style={{ borderColor: "rgb(var(--border))" }}>
          <p>
            © {year} {profile.name}.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 rounded-lg border surface px-4 py-2
              transition-all hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-500"
          >
            Back to top <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
}
