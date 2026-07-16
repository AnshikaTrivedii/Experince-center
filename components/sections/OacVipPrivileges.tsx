"use client";

import { motion } from "framer-motion";
import {
  FiStar,
  FiTruck,
  FiShield,
  FiTag,
  FiArrowRight,
  FiZap,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";

const ease = [0.22, 1, 0.36, 1] as const;

const PRIVILEGES: {
  icon: IconType;
  title: string;
  blurb: string;
  accent: string;
}[] = [
  {
    icon: FiStar,
    title: "VIP Experience Centre Tour",
    blurb: "Private walkthrough with a dedicated LED specialist — not a group queue.",
    accent: "from-accent-cyan/40 to-accent-blue/10",
  },
  {
    icon: FiTruck,
    title: "Priority Delivery",
    blurb: "Your project jumps the production line so screens land when you need them.",
    accent: "from-accent-blue/40 to-accent-purple/10",
  },
  {
    icon: FiShield,
    title: "Additional 1-Year Warranty",
    blurb: "Extra coverage on top of our standard warranty — peace of mind, built in.",
    accent: "from-accent-purple/40 to-accent-cyan/10",
  },
  {
    icon: FiTag,
    title: "Exclusive OAC Pricing",
    blurb: "Event-only rates you won’t see on the open price list after OAC 2026.",
    accent: "from-accent-cyan/35 to-accent-purple/20",
  },
];

export function OacVipPrivileges() {
  return (
    <section id="privileges" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.12),transparent_55%)]"
      />
      <div
        aria-hidden
        className="aurora-blob pointer-events-none absolute -left-24 top-1/3 h-72 w-72 bg-accent-purple/20"
      />
      <div
        aria-hidden
        className="aurora-blob pointer-events-none absolute -right-16 bottom-0 h-80 w-80 bg-accent-cyan/15 [animation-delay:3s]"
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-cyan shadow-[0_0_28px_-8px_rgba(34,211,238,0.65)]"
          >
            <FiZap size={12} className="animate-pulse" />
            VIP Access · OAC 2026
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-6xl"
          >
            More reasons to{" "}
            <span className="text-shimmer text-gradient-accent">
              register today
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12, duration: 0.65, ease }}
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Beyond the complimentary package — four VIP privileges reserved
            exclusively for OAC 2026 guests.
          </motion.p>
        </div>

        {/* Privilege grid */}
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {PRIVILEGES.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                whileHover={{ y: -10 }}
                className="card-shine glow-border group relative flex min-h-[260px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080c12]/95] p-6 transition-all duration-500 hover:border-accent-cyan/45 hover:shadow-[0_0_50px_-12px_rgba(34,211,238,0.55)] sm:p-7"
              >
                {/* Hover wash */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />

                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="mb-6 flex items-start justify-between gap-3">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/12 bg-gradient-to-br from-accent-cyan/30 to-accent-purple/15 text-accent-cyan shadow-[0_0_24px_-6px_rgba(34,211,238,0.5)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={24} />
                    </span>
                    <span className="font-mono text-3xl font-light tracking-tighter text-white/10 transition-colors duration-500 group-hover:text-accent-cyan/35">
                      0{i + 1}
                    </span>
                  </div>

                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.28em] text-accent-cyan">
                    Included
                  </p>
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">
                    {item.blurb}
                  </p>

                  <div className="mt-6 h-px w-10 bg-gradient-to-r from-accent-cyan via-accent-purple/60 to-transparent transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Closing strip */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7, ease }}
          className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-5 overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-r from-accent-cyan/[0.08] via-white/[0.03] to-accent-purple/[0.1] px-6 py-6 sm:mt-12 sm:flex-row sm:px-8"
        >
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold text-white sm:text-xl">
              All four privileges unlock with one registration
            </p>
            <p className="mt-1 text-sm text-white/45">
              Reserve your Mumbai or Delhi Experience Centre visit now.
            </p>
          </div>
          <MagneticButton>
            <GlowButton
              size="md"
              onClick={() =>
                document
                  .querySelector("#book")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Unlock VIP Access
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </GlowButton>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
