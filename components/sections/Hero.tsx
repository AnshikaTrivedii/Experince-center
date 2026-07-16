"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { Particles } from "@/components/effects/Particles";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";
import { MEDIA } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

const headline = ["Welcome,", "OAC 2026", "Visitors!"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const heroVideo = MEDIA.hero.video;

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[85svh] items-center justify-center overflow-hidden pb-10 pt-20 md:min-h-[100svh] md:pb-0 md:pt-24"
    >
      <motion.div style={{ scale }} className="absolute inset-0 z-0 bg-ink">
        {/* Soft fill behind letterboxing on tall phones (no second video decode) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroVideo.poster}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover object-center opacity-60 blur-2xl md:hidden"
        />

        {/* Main video — full frame on mobile, cinematic cover on desktop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroVideo.poster}
          aria-label={heroVideo.alt}
          className="absolute inset-0 h-full w-full object-contain object-center md:scale-105 md:object-cover"
        >
          <source src={heroVideo.src} type={heroVideo.type} />
        </video>

        <div className="absolute inset-0 bg-ink/10 md:bg-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/5 to-ink/80 md:from-ink/45 md:via-ink/10 md:to-ink/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/15 via-transparent to-ink/15 md:from-ink/20 md:to-ink/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,5,0.35)_100%)] md:bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(5,5,5,0.45)_100%)]" />
      </motion.div>

      {/* Cinematic light orbs */}
      <motion.div style={{ opacity: glowOpacity }} className="pointer-events-none absolute inset-0 z-[1]">
        <div className="aurora-blob absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent-cyan/25" />
        <div
          className="aurora-blob absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-accent-purple/20"
          style={{ animationDelay: "-5s" }}
        />
        <div
          className="aurora-blob absolute bottom-1/4 left-1/3 h-64 w-64 rounded-full bg-accent-blue/20"
          style={{ animationDelay: "-9s" }}
        />
      </motion.div>

      <Particles density={22} />

      <motion.div
        style={{ y, opacity }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.08] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-accent-cyan shadow-[0_0_40px_-12px_rgba(34,211,238,0.8)] backdrop-blur-md sm:mb-7 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.25em]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent-cyan/70" />
            <span className="relative h-2 w-2 rounded-full bg-accent-cyan" />
          </span>
          An Exclusive Invitation from Orion LED
        </motion.span>

        <h1 className="max-w-5xl font-display text-4xl font-semibold leading-[0.98] tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl">
          {headline.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 48, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.85, delay: 0.2 + i * 0.14, ease }}
              className={
                i === 1
                  ? "mx-2 inline-block text-shimmer sm:mx-3"
                  : "inline-block text-white"
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.85, ease }}
          className="mt-7 h-px w-28 origin-center bg-gradient-to-r from-transparent via-accent-cyan to-transparent sm:w-40"
        />

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.95, ease }}
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:mt-8 sm:text-lg md:text-xl"
        >
          Experience India&apos;s premium LED display solutions at our{" "}
          <span className="font-medium text-white">Mumbai</span> or{" "}
          <span className="font-medium text-white">Delhi Experience Centre</span>.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease }}
          className="mt-3 max-w-xl text-sm leading-relaxed text-white/50 sm:mt-4 sm:text-base md:text-lg"
        >
          Register today and unlock exclusive OAC privileges for your next LED
          project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.25, ease }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4"
        >
          <MagneticButton>
            <GlowButton size="lg" onClick={() => go("#book")}>
              Reserve My Visit
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </MagneticButton>
          <MagneticButton>
            <GlowButton
              size="lg"
              variant="outline"
              shimmer={false}
              onClick={() => go("#why")}
              className="border-white/20 bg-white/[0.04] backdrop-blur-md hover:border-accent-cyan/50"
            >
              <FiPlay className="text-accent-cyan" />
              Explore the Experience
            </GlowButton>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/40 sm:mt-14 sm:gap-x-8 sm:gap-y-3 sm:text-[11px] sm:tracking-[0.22em]"
        >
          {["Mumbai", "Delhi NCR", "5× Free Benefits"].map((label) => (
            <span key={label} className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent-cyan/80" />
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 sm:bottom-8"
      >
        <motion.a
          href="#why"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-white"
          aria-label="Scroll down"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/25 p-1.5">
            <motion.span
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.9)]"
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
