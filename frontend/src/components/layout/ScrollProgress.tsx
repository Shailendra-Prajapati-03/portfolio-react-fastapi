import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar at the top showing read progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r
        from-brand-500 via-brand-400 to-accent"
    />
  );
}
