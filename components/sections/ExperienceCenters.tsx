"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiClock,
  FiNavigation,
  FiArrowUpRight,
} from "react-icons/fi";
import {
  EXPERIENCE_CENTERS,
  type ExperienceCenter,
} from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { GlowButton } from "@/components/ui/GlowButton";

export function ExperienceCenters() {
  return (
    <section id="center-details" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="Experience Centers"
          title={
            <>
              Two doors to the{" "}
              <span className="text-gradient-accent">future of display</span>
            </>
          }
          description="Purpose-built spaces where our full range comes alive. Choose the city closest to you."
        />

        <div className="mt-16 flex flex-col gap-8">
          {EXPERIENCE_CENTERS.map((center, i) => (
            <CenterCard key={center.id} center={center} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CenterCard({
  center,
  reverse,
}: {
  center: ExperienceCenter;
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="group grid overflow-hidden rounded-[2rem] glass-strong lg:grid-cols-2"
    >
      {/* Image */}
      <div
        className={`relative min-h-[320px] overflow-hidden lg:min-h-[520px] ${
          reverse ? "lg:order-2" : ""
        }`}
      >
        <motion.div style={{ y: imgY }} className="absolute inset-0 scale-125">
          <Image
            src={center.image}
            alt={`Orion LED Experience Center ${center.city}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent lg:bg-gradient-to-r" />
        <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white">
          <span className="h-2 w-2 animate-pulse-glow rounded-full bg-green-400" />
          Open now
        </div>
        <div className="absolute bottom-6 left-6">
          <h3 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {center.city}
          </h3>
          <p className="mt-1 text-sm text-white/60">{center.tagline}</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-6 p-7 sm:p-10">
        <div className="flex flex-col gap-4">
          <InfoRow icon={FiMapPin}>{center.address}</InfoRow>
          <InfoRow icon={FiClock}>{center.hours}</InfoRow>
          <InfoRow icon={FiPhone}>
            <a
              href={`tel:${center.phone}`}
              className="transition-colors hover:text-white"
            >
              {center.phone}
            </a>
          </InfoRow>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
            Facilities
          </p>
          <div className="flex flex-wrap gap-2">
            {center.facilities.map((f) => {
              const FIcon = f.icon;
              return (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-cyan/40 hover:text-white"
                >
                  <FIcon className="text-accent-cyan" size={14} />
                  {f.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <GlowButton
            size="md"
            onClick={() =>
              document
                .querySelector("#book")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Book Slot
            <FiArrowUpRight />
          </GlowButton>
          <a href={center.mapUrl} target="_blank" rel="noopener noreferrer">
            <GlowButton size="md" variant="outline">
              <FiNavigation className="text-accent-cyan" />
              Google Map
            </GlowButton>
          </a>
          <a href={`tel:${center.phone}`}>
            <GlowButton size="md" variant="ghost">
              <FiPhone />
              Call
            </GlowButton>
          </a>
          <GlowButton size="md" variant="ghost">
            Virtual Tour
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
}

function InfoRow({
  icon: Icon,
  children,
}: {
  icon: typeof FiMapPin;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-sm text-white/65">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-accent-cyan">
        <Icon size={15} />
      </span>
      <span className="leading-relaxed">{children}</span>
    </div>
  );
}
