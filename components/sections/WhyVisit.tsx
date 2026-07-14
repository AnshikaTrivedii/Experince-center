"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiMonitor, FiUsers, FiAperture, FiArrowUpRight } from "react-icons/fi";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

const WHY_ITEMS: {
  icon: IconType;
  number: string;
  title: string;
  detail: string;
  image: string;
  accent: string;
}[] = [
  {
    icon: FiMonitor,
    number: "01",
    title: "Live technology",
    detail: "Experience our latest LED display technologies live",
    image: "/images/orion-booth.jpg",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: FiUsers,
    number: "02",
    title: "Expert guidance",
    detail: "Get expert recommendations for your project",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80",
    accent: "from-cyan-400 to-emerald-300",
  },
  {
    icon: FiAperture,
    number: "03",
    title: "Real installations",
    detail: "Explore real-world installations and product demos",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1400&q=80",
    accent: "from-violet-500 to-fuchsia-400",
  },
];

export function WhyVisit() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <section
      ref={ref}
      id="why"
      className="relative overflow-hidden py-32 sm:py-40"
    >
      {/* Soft ambient light */}
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
            Page 01 · OAC 2026
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

        {/* Image-led reason cards */}
        <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
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
                className="group relative isolate overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-card"
              >
                <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
                  {item.image.startsWith("/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 via-transparent to-accent-purple/15 opacity-60 mix-blend-screen" />

                  {/* Top meta */}
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 sm:p-6">
                    <span
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white shadow-glow backdrop-blur-sm",
                        item.accent
                      )}
                    >
                      <Icon size={20} />
                    </span>
                    <span className="font-display text-4xl font-bold tracking-tighter text-white/25 transition-colors duration-500 group-hover:text-white/40 sm:text-5xl">
                      {item.number}
                    </span>
                  </div>

                  {/* Bottom content */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-cyan">
                      Reason {item.number}
                    </p>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[18rem] text-sm leading-relaxed text-white/65 sm:text-base">
                      {item.detail}
                    </p>
                    <div
                      className={cn(
                        "mt-5 h-px w-10 bg-gradient-to-r transition-all duration-500 group-hover:w-24",
                        item.accent
                      )}
                    />
                  </div>

                  {/* Hover cue */}
                  <span className="absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-white/0 opacity-0 backdrop-blur transition-all duration-500 group-hover:text-white group-hover:opacity-100 sm:bottom-6 sm:right-6">
                    <FiArrowUpRight size={18} />
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Cinematic wide strip using booth photo */}
        <motion.div
          style={{ y: bgY }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/10"
        >
          <div className="relative aspect-[21/9] min-h-[200px] w-full sm:min-h-[260px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/orion-experience-showroom.png"
              alt="Orion LED Experience Centre showroom"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
            <div className="absolute inset-0 flex items-end p-6 sm:p-10 md:items-center md:p-14">
              <p className="max-w-md font-display text-2xl font-medium tracking-tight text-white sm:text-3xl md:text-4xl">
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
