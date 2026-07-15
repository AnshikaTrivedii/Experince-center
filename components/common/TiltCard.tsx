"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight tilt on hover — CSS transforms, no Framer springs.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * intensity;
    const ry = (px - 0.5) * intensity;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "relative transition-transform duration-200 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
