"use client";

import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent-gradient bg-[length:200%_auto] text-white shadow-glow-lg hover:bg-[position:100%_center] hover:shadow-[0_0_60px_-10px_rgba(34,211,238,0.7)]",
        secondary:
          "glass text-white hover:border-white/25 hover:bg-white/[0.06]",
        ghost: "text-white/70 hover:text-white",
        outline:
          "border border-white/15 text-white hover:border-accent-cyan/50 hover:bg-white/[0.03]",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  shimmer?: boolean;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, children, shimmer = true, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {shimmer && variant === "primary" && (
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { buttonVariants };
