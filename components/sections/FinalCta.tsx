"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";
import { MediaImage } from "@/components/common/MediaImage";
import { MEDIA } from "@/lib/media";

export function FinalCta() {
  return (
    <section id="final-cta" className="relative py-24 sm:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0f16]"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative aspect-[16/11] min-h-[240px] lg:aspect-auto lg:min-h-[420px]">
              <MediaImage
                src={MEDIA.finalCta.booth.src}
                alt={MEDIA.finalCta.booth.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>

            <div className="relative flex flex-col items-center justify-center px-8 py-14 text-center sm:px-12 lg:items-start lg:text-left">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.08),transparent_60%)]" />

              <p className="relative mb-5 text-xs font-medium uppercase tracking-[0.28em] text-accent-cyan">
                Page 03 · Closing Offer
              </p>

              <h2 className="relative font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.25rem]">
                See It.{" "}
                <span className="text-gradient-accent">Experience It.</span>{" "}
                Build It.
              </h2>

              <p className="relative mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                Complete the form above to unlock an additional{" "}
                <span className="font-medium text-white">1-year warranty</span> on
                your Orion LED display and connect with our experts for a tailored
                solution. This exclusive offer is available only to{" "}
                <span className="font-medium text-white">OAC 2026 visitors</span>.
              </p>

              <MagneticButton className="relative mt-10">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
