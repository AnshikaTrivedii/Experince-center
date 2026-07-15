"use client";

import { motion } from "framer-motion";
import { FiMonitor, FiUsers, FiAperture, FiArrowUpRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import { MediaImage } from "@/components/common/MediaImage";
import { MEDIA } from "@/lib/media";
import { cn } from "@/lib/utils";

const WHY_ITEMS: {
  icon: IconType;
  number: string;
  title: string;
  detail: string;
  image: { src: string; alt: string };
  accent: string;
}[] = [
  {
    icon: FiMonitor,
    number: "01",
    title: "Live technology",
    detail: "Experience our latest LED display technologies live",
    image: MEDIA.whyVisit.liveTechnology,
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: FiUsers,
    number: "02",
    title: "Expert guidance",
    detail: "Get expert recommendations for your project",
    image: MEDIA.whyVisit.expertGuidance,
    accent: "from-cyan-400 to-emerald-300",
  },
  {
    icon: FiAperture,
    number: "03",
    title: "Real installations",
    detail: "Explore real-world installations and product demos",
    image: MEDIA.whyVisit.realInstallations,
    accent: "from-violet-500 to-fuchsia-400",
  },
];

export function WhyVisit() {
  return (
    <section id="why" className="relative overflow-hidden py-32 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)]"
      />

      <div className="container relative z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.28em] text-accent-cyan"
          >
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent-cyan" />
            OAC 2026
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl font-semibold leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
          >
            <span className="text-white">Why </span>
            <span className="text-gradient-accent">Visit?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Step into Orion&apos;s Experience Centre and see the difference
            before you decide.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6 md:items-start">
          {WHY_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0f16]"
              >
                <div className="flex items-start justify-between px-5 pt-5 sm:px-6 sm:pt-6">
                  <span
                    className={cn(
                      "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow",
                      item.accent
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="font-display text-4xl font-bold tracking-tighter text-white/20 transition-colors duration-500 group-hover:text-white/35 sm:text-5xl">
                    {item.number}
                  </span>
                </div>

                <div className="relative mx-5 mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black sm:mx-6">
                  <div className="relative aspect-[4/3]">
                    <MediaImage
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className="pointer-events-none absolute bottom-3 right-3 h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                </div>

                <div className="relative flex flex-col px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-cyan">
                    Reason {item.number}
                  </p>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
                    {item.detail}
                  </p>

                  <div className="mt-5 flex items-end justify-between">
                    <div
                      className={cn(
                        "h-px w-10 bg-gradient-to-r transition-all duration-500 group-hover:w-20",
                        item.accent
                      )}
                    />
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/[0.04] text-white/70 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/[0.08] group-hover:text-white">
                      <FiArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0f16]"
        >
          <div className="grid md:grid-cols-[1.35fr_1fr]">
            <div className="relative aspect-[16/10] min-h-[220px] md:aspect-auto md:min-h-[300px]">
              <MediaImage
                src={MEDIA.whyVisit.boothStrip.src}
                alt={MEDIA.whyVisit.boothStrip.alt}
                fill
                sizes="(max-width: 768px) 100vw, 65vw"
              />
            </div>
            <div className="flex items-center border-t border-white/10 p-6 sm:p-10 md:border-l md:border-t-0 md:p-12">
              <p className="font-display text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
                Specs on a PDF can&apos;t compete with{" "}
                <span className="text-gradient-accent">seeing it for real.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
