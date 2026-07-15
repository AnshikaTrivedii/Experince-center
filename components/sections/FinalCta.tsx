"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";
import { MediaImage } from "@/components/common/MediaImage";
import { MEDIA } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCta() {
  return (
    <section id="final-cta" className="relative py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease }}
          className="card-shine group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0f16] transition-all duration-500 hover:border-accent-cyan/30 hover:shadow-glow-lg"
        >
          <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent-cyan/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-accent-purple/15 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[16/11] min-h-[240px] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <MediaImage
                src={MEDIA.finalCta.booth.src}
                alt={MEDIA.finalCta.booth.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0f16]/50 max-lg:hidden" />
            </div>

            <div className="relative flex flex-col items-center justify-center px-8 py-14 text-center sm:px-12 lg:items-start lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.55, ease }}
                className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-accent-cyan"
              >
                Closing Offer
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.75, ease }}
                className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.25rem]"
              >
                See It.{" "}
                <span className="text-shimmer">Experience It.</span> Build It.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35, duration: 0.65, ease }}
                className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
              >
                Complete the form above to unlock an additional{" "}
                <span className="font-medium text-white">1-year warranty</span> on
                your Orion LED display and connect with our experts for a tailored
                solution. This exclusive offer is available only to{" "}
                <span className="font-medium text-white">OAC 2026 visitors</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45, duration: 0.65, ease }}
                className="mt-10"
              >
                <MagneticButton>
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
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
