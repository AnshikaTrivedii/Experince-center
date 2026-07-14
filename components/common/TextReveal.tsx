"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Reveals a string word-by-word as it scrolls into view.
 */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const words = text.split(" ");

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
