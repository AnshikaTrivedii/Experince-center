"use client";

import { motion } from "framer-motion";
import { FiStar, FiTruck, FiShield, FiTag } from "react-icons/fi";
import type { IconType } from "react-icons";
import { OAC_VIP_PRIVILEGES } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TiltCard } from "@/components/common/TiltCard";

const ICONS: IconType[] = [FiStar, FiTruck, FiShield, FiTag];

export function OacVipPrivileges() {
  return (
    <section id="privileges" className="relative py-28 sm:py-36">
      <div className="container">
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
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="perspective group"
              >
                <TiltCard
                  intensity={8}
                  className="flex h-full items-start gap-4 rounded-3xl glass p-6 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-accent-cyan/35 group-hover:shadow-glow"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/10 text-accent-cyan [transform:translateZ(28px)]">
                    <Icon size={22} />
                  </span>
                  <div className="[transform:translateZ(28px)]">
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                      Included
                    </p>
                    <h3 className="font-display text-lg font-semibold leading-snug text-white">
                      {item}
                    </h3>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
