"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlay } from "react-icons/fi";
import { FaQuoteRight } from "react-icons/fa6";
import { TESTIMONIALS } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(id);
  }, [paused]);

  const active = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative py-28 sm:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <SectionHeading
          eyebrow="Trusted by Leaders"
          title={
            <>
              What visitors{" "}
              <span className="text-gradient-accent">say</span>
            </>
          }
          description="Decisions made with confidence, after seeing it for real."
        />

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* video placeholder */}
          <div className="group relative aspect-video overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
              alt="Video testimonial"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40" />
            <button
              className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full glass-strong text-white transition-transform duration-300 group-hover:scale-110"
              aria-label="Play video testimonial"
            >
              <span className="absolute inset-0 animate-ping rounded-full border border-accent-cyan/40" />
              <FiPlay className="ml-1" size={26} />
            </button>
            <div className="absolute bottom-5 left-5">
              <p className="text-sm font-medium text-white">
                Watch client stories
              </p>
              <p className="text-xs text-white/60">2 min · Experience Center</p>
            </div>
          </div>

          {/* quote card */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[2rem] glass-strong p-8 sm:p-10"
              >
                <FaQuoteRight
                  className="absolute right-8 top-8 text-accent-cyan/20"
                  size={44}
                />
                <p className="font-display text-2xl font-medium leading-snug tracking-tight text-white/90 sm:text-3xl">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/15">
                    <Image
                      src={active.avatar}
                      alt={active.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{active.name}</p>
                    <p className="text-sm text-white/55">{active.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index
                      ? "w-8 bg-accent-cyan"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
