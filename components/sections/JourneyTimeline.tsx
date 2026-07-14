"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { JOURNEY_STEPS, type JourneyStep } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";

export function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Your Visit, Step by Step"
          title={
            <>
              What you&apos;ll{" "}
              <span className="text-gradient-accent">experience</span>
            </>
          }
          description="A guided, no-pressure journey designed to give you total clarity and confidence."
        />

        <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
          {/* base line */}
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          {/* animated line */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-accent-blue via-accent-cyan to-accent-purple md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-12">
            {JOURNEY_STEPS.map((step, i) => (
              <TimelineItem key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ step, index }: { step: JourneyStep; index: number }) {
  const isLeft = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-center gap-6 pl-16 md:pl-0 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* node */}
      <span className="absolute left-6 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center md:left-1/2">
        <span className="absolute h-4 w-4 animate-ping rounded-full bg-accent-cyan/40" />
        <span className="relative h-3 w-3 rounded-full bg-accent-cyan shadow-glow" />
      </span>

      {/* card */}
      <div className="w-full md:w-[calc(50%-2.5rem)]">
        <div className="group rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent-cyan/30 hover:shadow-glow">
          <span className="font-display text-4xl font-bold text-white/10 transition-colors duration-500 group-hover:text-accent-cyan/30">
            {step.step}
          </span>
          <h3 className="-mt-4 font-display text-xl font-semibold text-white">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            {step.description}
          </p>
        </div>
      </div>

      <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
    </motion.div>
  );
}
