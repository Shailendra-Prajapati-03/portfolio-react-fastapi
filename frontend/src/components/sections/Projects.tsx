import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../data/content";
import { projects as fallbackProjects } from "../../data/content";
import { fetchProjects } from "../../lib/api";
import { staggerContainer } from "../../lib/motion";
import Section from "../ui/Section";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {
  const [items, setItems] = useState<Project[]>(fallbackProjects);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    let active = true;
    fetchProjects().then((data) => {
      if (active) setItems(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(() => {
    const tags = new Set<string>();
    items.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags)];
  }, [items]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? items
        : items.filter((p) => p.tags.includes(filter)),
    [items, filter]
  );

  return (
    <Section
      id="projects"
      eyebrow="My work"
      title="Featured Projects"
      subtitle="A selection of things I've designed and built — from playful apps to full platforms."
    >
      {/* Filter chips */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === cat
                ? "bg-brand-600 text-white shadow-glow"
                : "border surface text-muted hover:border-brand-400 hover:text-brand-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        layout
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
