"use client";

import { motion } from "framer-motion";

/**
 * Site-wide moving background glow + grid + noise. Fixed behind all content.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {/* base */}
      <div className="absolute inset-0 bg-ink" />

      {/* animated grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* moving color blobs */}
      <motion.div
        className="absolute -left-40 top-[-10%] h-[45rem] w-[45rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.28), transparent 60%)",
        }}
        animate={{ x: [0, 120, 0], y: [0, 80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-10%] top-[30%] h-[40rem] w-[40rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.24), transparent 60%)",
        }}
        animate={{ x: [0, -100, 0], y: [0, 120, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.20), transparent 60%)",
        }}
        animate={{ x: [0, 80, 0], y: [0, -90, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* noise */}
      <div className="absolute inset-0 noise opacity-[0.035] mix-blend-overlay" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
    </div>
  );
}
