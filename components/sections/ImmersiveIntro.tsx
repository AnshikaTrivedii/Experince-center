"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LINES = [
  "Every pixel tells a story.",
  "Every brightness level.",
  "Every refresh rate.",
  "Every color.",
];

export function ImmersiveIntro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      id="intro"
      className="relative flex min-h-[90vh] items-center overflow-hidden py-32"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow-radial blur-2xl"
      />

      <div className="container relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-xs font-medium uppercase tracking-[0.35em] text-accent-cyan"
        >
          The Orion Difference
        </motion.p>

        <div className="flex flex-col gap-3 font-display text-4xl font-medium leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          {LINES.map((line, i) => (
            <LineReveal key={line} line={line} index={i} highlight={i === 0} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 text-2xl font-light tracking-tight text-white/50 sm:text-4xl"
        >
          Experience{" "}
          <span className="font-medium text-gradient-accent">before</span> you
          invest.
        </motion.p>
      </div>
    </section>
  );
}

function LineReveal({
  line,
  index,
  highlight,
}: {
  line: string;
  index: number;
  highlight: boolean;
}) {
  const words = line.split(" ");
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.08, delayChildren: index * 0.15 }}
      className={highlight ? "text-white" : "text-white/35"}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="mr-[0.25em] inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
