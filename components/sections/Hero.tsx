"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { Particles } from "@/components/effects/Particles";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";

const headline = ["Experience", "LED", "Like", "Never", "Before"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      {/* Cinematic LED wall + animated gradient mesh */}
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="h-full w-full object-cover opacity-45"
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-lighten"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-night-city-traffic-1581/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/65 to-ink" />
        <div className="absolute inset-0 animate-gradient-pan bg-[linear-gradient(120deg,rgba(59,130,246,0.22),rgba(168,85,247,0.14),rgba(34,211,238,0.18))] bg-[length:200%_200%] mix-blend-screen" />
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute -left-1/4 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent animate-[shimmer_6s_linear_infinite]" />
        </div>
      </motion.div>

      <Particles density={70} />

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent-cyan" />
          Delhi · Mumbai Experience Centers
        </motion.span>

        <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.95] tracking-tighter text-white sm:text-7xl lg:text-8xl">
          {headline.map((word, i) => (
            <span key={word} className="inline-block overflow-hidden pb-2">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.15 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  word === "LED"
                    ? "mr-4 inline-block text-gradient-accent"
                    : "mr-4 inline-block"
                }
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl"
        >
          Don&apos;t buy an LED display from a catalogue.
          <br className="hidden sm:block" />
          <span className="text-white/85"> Experience it in real life.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton>
            <GlowButton size="lg" onClick={() => go("#book")}>
              Book a Visit
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </MagneticButton>
          <MagneticButton>
            <GlowButton
              size="lg"
              variant="secondary"
              onClick={() => go("#centers")}
            >
              <FiPlay className="text-accent-cyan" />
              Explore Centers
            </GlowButton>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-white"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/25 p-1">
            <motion.span
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-accent-cyan"
            />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}

function go(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}
