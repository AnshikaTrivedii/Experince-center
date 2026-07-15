"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic hover — DOM transforms only (no React re-renders per mousemove).
 */
export function MagneticButton({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "inline-flex transition-transform duration-200 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
