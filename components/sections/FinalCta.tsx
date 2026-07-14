"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";

export function FinalCta() {
  return (
    <section id="final-cta" className="relative py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
          <div className="absolute inset-0 animate-gradient-pan bg-[linear-gradient(120deg,rgba(59,130,246,0.18),rgba(168,85,247,0.12),rgba(34,211,238,0.16))] bg-[length:200%_200%] mix-blend-screen" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-8 py-16 text-center sm:px-14 sm:py-24">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-accent-cyan">
              Page 03 · Closing Offer
            </p>

            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              See It.{" "}
              <span className="text-gradient-accent">Experience It.</span>{" "}
              Build It.
            </h2>

            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
              Complete the form above to unlock an additional{" "}
              <span className="font-medium text-white">1-year warranty</span> on
              your Orion LED display and connect with our experts for a tailored
              solution. This exclusive offer is available only to{" "}
              <span className="font-medium text-white">OAC 2026 visitors</span>.
            </p>

            <MagneticButton className="mt-10">
              <GlowButton
                size="lg"
                onClick={() =>
                  document
                    .querySelector("#book")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FiZap className="text-white/90" />
                Reserve Your Experience Today
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </GlowButton>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
