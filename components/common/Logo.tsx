"use client";

import { cn } from "@/lib/utils";
import { MEDIA } from "@/lib/media";

export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  const { src, alt, width, height } = MEDIA.brand.logo;

  return (
    <a
      href="#hero"
      className={cn("group inline-flex shrink-0 items-center", className)}
      aria-label="Orion LED — home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "h-auto w-auto object-contain transition-opacity duration-300 group-hover:opacity-90",
          size === "lg" ? "h-[4.5rem] sm:h-20" : "h-12 sm:h-14"
        )}
      />
    </a>
  );
}
