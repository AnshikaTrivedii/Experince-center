"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal direction="up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-accent-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-glow" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal direction="up" delay={0.05}>
        <h2 className="max-w-4xl text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal direction="up" delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg",
              align === "center" ? "mx-auto" : ""
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
