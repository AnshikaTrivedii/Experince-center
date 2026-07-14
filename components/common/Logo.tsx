"use client";

import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <a
      href="#hero"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label="Orion LED — home"
    >
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 rounded-full bg-accent-cyan/40 blur-md transition-all duration-500 group-hover:bg-accent-cyan/60" />
        <svg
          viewBox="0 0 32 32"
          className={cn(
            "relative",
            size === "lg" ? "h-9 w-9" : "h-7 w-7"
          )}
          aria-hidden
        >
          <defs>
            <linearGradient id="orionGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="11"
            fill="none"
            stroke="url(#orionGrad)"
            strokeWidth="2.5"
          />
          <circle cx="16" cy="16" r="3.2" fill="url(#orionGrad)" />
        </svg>
      </span>
      <span
        className={cn(
          "font-display font-semibold tracking-tight text-white",
          size === "lg" ? "text-2xl" : "text-lg"
        )}
      >
        ORION
        <span className="text-gradient-accent"> LED</span>
      </span>
    </a>
  );
}
