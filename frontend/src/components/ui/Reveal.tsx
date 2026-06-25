import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  delay?: number;
  className?: string;
  once?: boolean;
}

/** Reveals children when scrolled into view. */
export default function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
