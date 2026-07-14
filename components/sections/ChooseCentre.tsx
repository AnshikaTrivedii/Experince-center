"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiCheck,
  FiClock,
  FiArrowRight,
  FiNavigation,
} from "react-icons/fi";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useBookingUi } from "@/components/providers/BookingUiProvider";
import { cn } from "@/lib/utils";

type CenterOption = {
  id: string;
  label: string;
  formValue: string;
  tagline: string;
  address: string;
  hours: string;
  mapUrl: string;
  highlights: string[];
  image: string;
  video?: string;
};

const CENTER_OPTIONS: CenterOption[] = [
  {
    id: "mumbai",
    label: "Mumbai",
    formValue: "Mumbai",
    tagline: "West India Experience Centre",
    address: "Bandra Kurla Complex, Bandra East, Mumbai 400051",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Bandra+Kurla+Complex+Mumbai",
    highlights: ["Live Demo Wall", "VIP Tour", "Consultation"],
    image:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "delhi",
    label: "Delhi NCR",
    formValue: "Delhi NCR",
    tagline: "Flagship Experience Centre",
    address: "ABW Elegance Tower, Jasola, New Delhi 110025",
    hours: "Mon – Sat · 10:00 AM – 7:00 PM",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=ABW+Elegance+Tower+Jasola+New+Delhi",
    highlights: ["COB & SMD Walls", "CMS Demo", "Meeting Room"],
    image: "/images/delhi-experience-centre.png",
  },
];

export function ChooseCentre() {
  const { selectedCenter, setSelectedCenter } = useBookingUi();

  return (
    <section id="centers" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-[120px]" />

      <div className="container relative z-10">
        <SectionHeading
          eyebrow="Locations"
          title={
            <>
              Choose Your{" "}
              <span className="text-gradient-accent">Experience Centre</span>
            </>
          }
          description="Pick a city — we’ll confirm your visit and unlock OAC privileges."
        />

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-2">
          {CENTER_OPTIONS.map((center, i) => {
            const selected = selectedCenter === center.formValue;
            return (
              <motion.div
                key={center.id}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "group flex flex-col overflow-hidden rounded-[1.75rem] border transition-all duration-500",
                  selected
                    ? "border-accent-cyan/45 shadow-glow-lg"
                    : "border-white/10 hover:border-white/20"
                )}
              >
                {/* Clean media frame — dominant height */}
                <div className="relative shrink-0 overflow-hidden bg-black">
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      center.video
                        ? "aspect-[16/10] min-h-[280px] sm:min-h-[340px] lg:min-h-[380px]"
                        : "aspect-[16/10]"
                    )}
                  >
                    {center.video ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls={false}
                        poster={center.image}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      >
                        <source src={center.video} type="video/mp4" />
                      </video>
                    ) : center.image.startsWith("/") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={center.image}
                        alt={`${center.label} Experience Centre`}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <Image
                        src={center.image}
                        alt={`${center.label} Experience Centre`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                    )}
                  </div>

                  <div className="pointer-events-none absolute left-3 top-3 flex gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Open now
                    </span>
                    {center.video && (
                      <span className="rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/90 backdrop-blur-md">
                        Video
                      </span>
                    )}
                  </div>
                </div>

                {/* Compact info panel */}
                <button
                  type="button"
                  onClick={() => setSelectedCenter(center.formValue)}
                  className="flex shrink-0 flex-col gap-3 bg-white/[0.025] px-5 py-4 text-left transition-colors sm:px-5 sm:py-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-cyan">
                        <FiMapPin size={11} />
                        India
                      </p>
                      <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {center.label}
                      </h3>
                      <p className="mt-0.5 text-xs text-white/50 sm:text-sm">
                        {center.tagline}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        selected
                          ? "border-accent-cyan bg-accent-cyan text-ink shadow-glow"
                          : "border-white/15 text-white/40 group-hover:border-accent-cyan/40 group-hover:text-accent-cyan"
                      )}
                    >
                      <FiCheck size={16} strokeWidth={2.5} />
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-white/55 sm:text-sm">
                    <p className="flex items-start gap-2">
                      <FiMapPin className="mt-0.5 shrink-0 text-accent-cyan" size={13} />
                      <span>{center.address}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FiClock className="shrink-0 text-accent-cyan" size={13} />
                      <span>{center.hours}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {center.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] text-white/60"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </button>

                <div className="flex shrink-0 flex-wrap items-center gap-2.5 border-t border-white/8 bg-white/[0.02] px-5 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCenter(center.formValue);
                      document
                        .querySelector("#book")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                      selected
                        ? "bg-accent-gradient text-white shadow-glow"
                        : "border border-white/12 text-white hover:border-accent-cyan/40"
                    )}
                  >
                    Continue with {center.label.split(" ")[0]}
                    <FiArrowRight size={15} />
                  </button>
                  <a
                    href={center.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-white/55 transition-colors hover:text-white"
                  >
                    <FiNavigation className="text-accent-cyan" size={13} />
                    Map
                  </a>
                  {selected && (
                    <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-cyan">
                      Selected
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {selectedCenter && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center text-sm text-white/45"
          >
            <span className="text-accent-cyan">{selectedCenter}</span> selected —
            complete the form below to reserve your slot.
          </motion.p>
        )}
      </div>
    </section>
  );
}
