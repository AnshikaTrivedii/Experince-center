"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS, type Stat } from "@/lib/data";
import { useCountUp } from "@/hooks/useCountUp";

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-14"
        >
          <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-blue/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-purple/20 blur-[100px]" />

          <div className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} inView={inView} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({
  stat,
  inView,
  index,
}: {
  stat: Stat;
  inView: boolean;
  index: number;
}) {
  const value = useCountUp(stat.value, { start: inView, duration: 2200 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <span className="font-display text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
        <span className="text-gradient-accent">
          {stat.prefix}
          {value}
          {stat.suffix}
        </span>
      </span>
      <span className="mt-3 text-sm font-medium uppercase tracking-[0.15em] text-white/50">
        {stat.label}
      </span>
    </motion.div>
  );
}
