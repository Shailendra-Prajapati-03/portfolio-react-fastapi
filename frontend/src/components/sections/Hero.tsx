import { motion } from "framer-motion";
import { FiArrowDown, FiDownload } from "react-icons/fi";
import { profile } from "../../data/content";
import { staggerContainer, fadeUp } from "../../lib/motion";
import Typewriter from "../ui/Typewriter";
import SocialIcons from "../ui/SocialIcons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] items-center overflow-hidden pt-28"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-[size:48px_48px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border surface px-4 py-1.5 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-muted">Available for opportunities</span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl"
          >
            Hi, I'm <span className="text-gradient animate-gradient-text">{profile.firstName}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 font-display text-xl font-semibold text-muted sm:text-2xl"
          >
            <Typewriter words={profile.roles} className="text-brand-500" />
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary">
              Hire me
            </a>
            <a href={profile.resumeUrl} className="btn-ghost" download>
              <FiDownload /> Download CV
            </a>
            <SocialIcons className="ml-1" />
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={fadeUp}
            className="mt-10 grid max-w-md grid-cols-3 gap-4"
          >
            {profile.stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold text-brand-500 sm:text-3xl">
                  {s.value}
                </p>
                <p className="text-xs text-muted sm:text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Portrait / visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-xs sm:max-w-sm md:block"
        >
          <div className="relative aspect-square animate-float">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-brand-500 to-accent opacity-20 blur-2xl" />
            <div className="glass relative h-full w-full overflow-hidden rounded-[2rem] shadow-card">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // graceful fallback to a gradient monogram
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-display text-8xl font-extrabold text-gradient opacity-40">
                  SP
                </span>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              className="glass absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 shadow-card"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-xs text-muted">Currently</p>
              <p className="font-semibold">Full-Stack Dev</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <FiArrowDown size={22} />
      </motion.a>
    </section>
  );
}
