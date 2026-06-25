import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import type { IconType } from "react-icons";
import { socials } from "../../data/content";

const iconMap: Record<string, IconType> = {
  GitHub: FiGithub,
  LinkedIn: FiLinkedin,
  Instagram: FiInstagram,
};

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map((s) => {
        const Icon = iconMap[s.label] ?? FiGithub;
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="grid h-10 w-10 place-items-center rounded-xl border surface
              transition-all duration-300 hover:-translate-y-1 hover:border-brand-400
              hover:text-brand-500 hover:shadow-glow"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
