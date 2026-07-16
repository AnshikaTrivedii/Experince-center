"use client";

import { motion } from "framer-motion";
import {
  FiMap,
  FiMessageCircle,
  FiBox,
  FiLayout,
  FiFileText,
  FiArrowRight,
  FiGift,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";
import { MediaImage } from "@/components/common/MediaImage";
import { MEDIA } from "@/lib/media";

const ease = [0.22, 1, 0.36, 1] as const;

const BENEFITS: {
  icon: IconType;
  title: string;
  blurb: string;
  image: { src: string; alt: string };
}[] = [
  {
    icon: FiMap,
    title: "Site Survey",
    blurb: "On-ground assessment of space, mounting & viewing distance.",
    image: MEDIA.benefits.siteSurvey,
  },
  {
    icon: FiMessageCircle,
    title: "LED Consultation",
    blurb: "Pixel pitch & series matched to your use-case.",
    image: MEDIA.benefits.ledConsultation,
  },
  {
    icon: FiBox,
    title: "3D Mockup",
    blurb: "Visualize the wall in your environment.",
    image: MEDIA.benefits.mockup3d,
  },
  {
    icon: FiLayout,
    title: "Installation Layout",
    blurb: "Cabinet map & power plan for site teams.",
    image: MEDIA.benefits.installationLayout,
  },
  {
    icon: FiFileText,
    title: "Feasibility Report",
    blurb: "Go / no-go insights with timeline & budget cues.",
    image: MEDIA.benefits.feasibilityReport,
  },
];

export function OacBenefits() {
  return (
    <section id="benefits" className="relative overflow-hidden py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-48 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.16),transparent_70%)] blur-3xl"
      />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.07] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-accent-cyan"
          >
            <FiGift size={10} />
            Exclusive Privileges
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Your Exclusive{" "}
            <span className="text-gradient-accent">OAC Benefits</span>
          </motion.h2>
        </div>

        <div className="mx-auto mt-7 grid max-w-6xl grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease,
                }}
                whileHover={{ y: -4 }}
                className="card-shine group overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f16] transition-all duration-300 hover:border-accent-cyan/40 hover:shadow-glow"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <MediaImage
                    src={benefit.image.src}
                    alt={benefit.image.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-black/55 text-accent-cyan backdrop-blur-sm">
                    <Icon size={14} />
                  </span>
                  <span className="absolute right-2.5 top-2.5 rounded-full bg-accent-cyan px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#041018] shadow-[0_0_18px_rgba(34,211,238,0.75)] ring-2 ring-white/30">
                    Free
                  </span>
                </div>

                <div className="px-3 py-3 sm:px-3.5 sm:py-3.5">
                  <h3 className="font-display text-sm font-semibold tracking-tight text-white sm:text-base">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/55 sm:text-xs">
                    {benefit.blurb}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5, ease }}
          className="mt-7 flex flex-col items-center gap-2.5 sm:mt-8"
        >
          <MagneticButton>
            <GlowButton
              size="md"
              onClick={() =>
                document
                  .querySelector("#book")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Reserve My Visit
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </MagneticButton>
          <p className="max-w-sm text-center text-[11px] text-white/35">
            All five unlock with your Mumbai or Delhi visit registration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
