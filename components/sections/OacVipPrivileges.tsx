"use client";

import { motion } from "framer-motion";
import { FiStar, FiTruck, FiShield, FiTag } from "react-icons/fi";
import type { IconType } from "react-icons";
import { OAC_VIP_PRIVILEGES } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";

const ICONS: IconType[] = [FiStar, FiTruck, FiShield, FiTag];
const ease = [0.22, 1, 0.36, 1] as const;

export function OacVipPrivileges() {
  return (
    <section id="privileges" className="relative overflow-hidden py-28 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-3xl"
      />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="OAC Privileges"
          title={
            <>
              More reasons to{" "}
              <span className="text-gradient-accent">register today</span>
            </>
          }
          description="Beyond the complimentary package — unlock VIP access reserved for OAC 2026 guests."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OAC_VIP_PRIVILEGES.map((item, i) => {
            const Icon = ICONS[i] ?? FiStar;
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease,
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card-shine glow-border group relative overflow-hidden rounded-3xl glass p-6 transition-all duration-500 hover:border-accent-cyan/40 hover:shadow-glow"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-cyan/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent-cyan/25 to-accent-purple/15 text-accent-cyan transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <Icon size={22} />
                  </span>
                  <div>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                      Included
                    </p>
                    <h3 className="font-display text-lg font-semibold leading-snug text-white">
                      {item}
                    </h3>
                  </div>
                </div>
                <div className="mt-5 h-px w-8 bg-gradient-to-r from-accent-cyan to-transparent transition-all duration-500 group-hover:w-16" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
