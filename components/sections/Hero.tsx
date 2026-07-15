"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Particles } from "@/components/effects/Particles";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";
import { MediaImage } from "@/components/common/MediaImage";
import { MEDIA } from "@/lib/media";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const { src, alt } = MEDIA.hero.booth;

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-24"
    >
      <motion.div style={{ scale }} className="absolute inset-0 z-0">
        <MediaImage
          src={src}
          alt={alt}
          fill
          priority
          className="scale-105"
        />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/20 via-transparent to-ink/20" />
      </motion.div>

      <Particles density={50} />

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-xs font-medium uppercase tracking-[0.25em] text-accent-cyan backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent-cyan" />
          An Exclusive Invitation from Orion LED
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl font-display text-4xl font-semibold leading-[0.98] tracking-tighter text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Welcome,{" "}
          <span className="text-gradient-accent">OAC 2026</span> Visitors!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl"
        >
          Experience India&apos;s premium LED display solutions at our{" "}
          <span className="font-medium text-white">Mumbai</span> or{" "}
          <span className="font-medium text-white">Delhi Experience Centre</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-4 max-w-xl text-base leading-relaxed text-white/50 sm:text-lg"
        >
          Register today and unlock exclusive OAC privileges for your next LED
          project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-10"
        >
          <MagneticButton>
            <GlowButton size="lg" onClick={() => go("#book")}>
              Reserve My Visit
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.a
          href="#why"
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
