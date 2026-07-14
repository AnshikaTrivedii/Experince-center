"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { INDUSTRIES } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Industries() {
  const [active, setActive] = useState(0);
  const industry = INDUSTRIES[active];

  return (
    <section id="industries" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Industries We Light Up"
          title={
            <>
              Built for{" "}
              <span className="text-gradient-accent">every environment</span>
            </>
          }
          description="Hover or tap an industry to see where Orion displays make the biggest impact."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* selector list */}
          <div className="flex flex-col">
            {INDUSTRIES.map((item, i) => (
              <button
                key={item.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="group relative flex items-center justify-between border-b border-white/8 py-5 text-left transition-colors"
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className={`font-mono text-xs transition-colors ${
                      active === i ? "text-accent-cyan" : "text-white/30"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className={`font-display text-2xl font-semibold tracking-tight transition-all duration-300 sm:text-3xl ${
                      active === i
                        ? "translate-x-2 text-white"
                        : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {item.name}
                  </span>
                </span>
                <FiArrowRight
                  className={`transition-all duration-300 ${
                    active === i
                      ? "translate-x-0 text-accent-cyan opacity-100"
                      : "-translate-x-2 text-white/40 opacity-0"
                  }`}
                />
                {active === i && (
                  <motion.span
                    layoutId="industry-underline"
                    className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple"
                  />
                )}
              </button>
            ))}
          </div>

          {/* image panel */}
          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-white/10 lg:min-h-full">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={industry.image}
                  alt={industry.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="font-display text-3xl font-semibold text-white">
                    {industry.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">
                    {industry.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
