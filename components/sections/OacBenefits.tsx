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
import { cn } from "@/lib/utils";

const BENEFITS: {
  icon: IconType;
  title: string;
  blurb: string;
  span: string;
  image: { src: string; alt: string };
}[] = [
  {
    icon: FiMap,
    title: "Site Survey",
    blurb: "On-ground assessment of your space, mounting & viewing distance.",
    span: "md:col-span-2 md:row-span-2",
    image: MEDIA.benefits.siteSurvey,
  },
  {
    icon: FiMessageCircle,
    title: "LED Consultation",
    blurb: "Pixel pitch & series matched to your use-case.",
    span: "md:col-span-1",
    image: MEDIA.benefits.ledConsultation,
  },
  {
    icon: FiBox,
    title: "3D Mockup",
    blurb: "Visualize the wall in your environment.",
    span: "md:col-span-1",
    image: MEDIA.benefits.mockup3d,
  },
  {
    icon: FiLayout,
    title: "Installation Layout",
    blurb: "Cabinet map & power plan, ready for site teams.",
    span: "md:col-span-1",
    image: MEDIA.benefits.installationLayout,
  },
  {
    icon: FiFileText,
    title: "Project Feasibility Report",
    blurb: "Clear go / no-go insights with timeline & budget cues.",
    span: "md:col-span-2",
    image: MEDIA.benefits.feasibilityReport,
  },
];

export function OacBenefits() {
  return (
    <section
      id="benefits"
      className="relative overflow-hidden py-32 sm:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.2),rgba(34,211,238,0.1),transparent_65%)] blur-3xl"
      />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-accent-cyan"
          >
            <FiGift size={12} />
            Exclusive Privileges
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-semibold leading-[1.02] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Your Exclusive{" "}
            <span className="text-gradient-accent">OAC Benefits</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Register your visit and receive complimentary project support —
            reserved for OAC 2026 visitors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/70"
          >
            <span className="rounded-full bg-accent-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
              5× Free
            </span>
            Worth thousands — unlocked with one registration
          </motion.div>
        </div>

        {/* Image-led bento — sharp media + solid text panels */}
        <div className="mx-auto mt-16 grid max-w-6xl auto-rows-[minmax(auto,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            const featured = benefit.span.includes("row-span-2");
            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0f16] transition-all duration-500 hover:-translate-y-1 hover:border-accent-cyan/40 hover:shadow-glow",
                  benefit.span,
                  featured && "md:min-h-[420px]"
                )}
              >
                {/* Meta row */}
                <div className="flex items-start justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
                  <span
                    className={cn(
                      "grid place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent-cyan/25 to-accent-purple/10 text-accent-cyan transition-transform duration-500 group-hover:scale-105",
                      featured ? "h-14 w-14" : "h-11 w-11"
                    )}
                  >
                    <Icon size={featured ? 24 : 18} />
                  </span>
                  <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent-cyan">
                    Free
                  </span>
                </div>

                {/* Sharp framed image — not a faded background */}
                <div
                  className={cn(
                    "relative mx-5 mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black sm:mx-6",
                    featured ? "flex-1" : ""
                  )}
                >
                  <div
                    className={cn(
                      "relative",
                      featured ? "aspect-[16/11] h-full min-h-[200px] md:aspect-auto md:min-h-[220px]" : "aspect-[16/10]"
                    )}
                  >
                    <MediaImage
                      src={benefit.image.src}
                      alt={benefit.image.alt}
                      fill
                      sizes={
                        featured
                          ? "(max-width: 768px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                    />
                  </div>
                </div>

                {/* Text on solid panel */}
                <div className="flex flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                  <p className="mb-1.5 font-mono text-[11px] tracking-[0.2em] text-white/30">
                    0{i + 1}
                  </p>
                  <h3
                    className={cn(
                      "font-display font-semibold tracking-tight text-white",
                      featured ? "text-2xl sm:text-3xl" : "text-xl"
                    )}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 leading-relaxed text-white/55",
                      featured ? "max-w-md text-sm sm:text-base" : "text-sm"
                    )}
                  >
                    {benefit.blurb}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-4"
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
              Reserve My Visit
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </MagneticButton>
          <p className="max-w-md text-center text-sm text-white/40">
            All five deliverables unlock when you register for your Mumbai or
            Delhi Experience Centre visit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
