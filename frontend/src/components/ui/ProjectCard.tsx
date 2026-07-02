import { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import type { Project } from "../../data/content";
import { fadeUp } from "../../lib/motion";

export default function ProjectCard({ project }: { project: Project }) {
  // Wide/dark screenshots (e.g. workflow diagrams) get framed inside a clean
  // white card; standard-ratio photos fill the frame. Decided from the image.
  const [contain, setContain] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border surface shadow-soft transition-shadow duration-300 hover:shadow-card"
    >
      {/* Image — full-bleed photo, or a wide screenshot framed on a light card */}
      <div
        className={`relative aspect-[16/10] overflow-hidden ${
          contain
            ? "bg-gradient-to-br from-slate-50 to-brand-500/5 p-3 sm:p-4"
            : "bg-slate-100"
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`h-full w-full transition-transform duration-700 ${
            contain
              ? "rounded-xl border surface bg-white object-contain p-2 group-hover:scale-[1.02]"
              : "object-cover group-hover:scale-105"
          }`}
          onLoad={(e) => {
            const img = e.currentTarget;
            // Much wider than the 16:10 frame (e.g. a workflow diagram) → frame
            // it whole inside a white card instead of cropping the edge nodes.
            if (img.naturalWidth / img.naturalHeight > 1.9) setContain(true);
          }}
          onError={(e) => {
            // Hide a missing/broken image but keep the light frame.
            (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
          }}
        />
        {/* Whisper-soft grounding gradient — only under full-bleed photos */}
        {!contain && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        )}

        {/* Hover action overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-brand-600/30 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo of ${project.title}`}
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-600 shadow-lg transition-transform hover:scale-110"
            >
              <FiExternalLink size={20} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Source code of ${project.title}`}
              className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand-600 shadow-lg transition-transform hover:scale-110"
            >
              <FiGithub size={20} />
            </a>
          )}
        </div>

        {project.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-glow">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-semibold transition-colors group-hover:text-brand-500">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
