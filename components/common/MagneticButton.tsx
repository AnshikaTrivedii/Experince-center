"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function MagneticButton({
  children,
  className,
  strength = 0.35,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const Comp = motion[as];

  return (
    <Comp
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 220, damping: 18, mass: 0.4 }}
      className={cn("inline-flex", className)}
    >
      {children}
    </Comp>
  );
}
