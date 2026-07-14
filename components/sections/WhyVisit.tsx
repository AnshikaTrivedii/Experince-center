"use client";

import { motion } from "framer-motion";
import { WHY_VISIT_FEATURES, type Feature } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { TiltCard } from "@/components/common/TiltCard";

export function WhyVisit() {
  return (
    <section id="why" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Why Visit"
          title={
            <>
              Reasons to step into an{" "}
              <span className="text-gradient-accent">Experience Center</span>
            </>
          }
          description="Specs on paper can't capture how a wall feels in a room. Here's what you'll unlock in person."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_VISIT_FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective group"
    >
      <TiltCard
        intensity={8}
        className="h-full rounded-3xl glass p-6 transition-all duration-500 group-hover:-translate-y-2 group-hover:border-accent-cyan/30 group-hover:shadow-glow"
      >
        <div className="[transform:translateZ(40px)]">
          <div className="relative mb-6 inline-flex">
            <span className="absolute inset-0 rounded-2xl bg-accent-cyan/20 blur-lg transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
            <span className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent text-accent-cyan transition-transform duration-500 group-hover:scale-110">
              <Icon size={24} />
            </span>
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-white">
            {feature.title}
          </h3>
          <p className="text-sm leading-relaxed text-white/55">
            {feature.description}
          </p>
        </div>
      </TiltCard>
    </motion.div>
  );
}
