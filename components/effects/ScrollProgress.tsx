"use client";

import { motion, useScroll } from "framer-motion";

/** Thin top progress bar — transform only, no spring smoothing overhead. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple"
    />
  );
}
