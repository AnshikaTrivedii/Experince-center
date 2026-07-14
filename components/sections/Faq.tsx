"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { FAQS } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Reveal } from "@/components/common/Reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 sm:py-36">
      <div className="container">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions,{" "}
              <span className="text-gradient-accent">answered</span>
            </>
          }
          description="Everything you might want to know before you visit."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.question} direction="up" delay={i * 0.05}>
              <div className="border-b border-white/8">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span
                    className={`font-display text-lg font-medium transition-colors sm:text-xl ${
                      open === i ? "text-white" : "text-white/70"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-colors ${
                      open === i
                        ? "border-accent-cyan/50 bg-accent-cyan/10 text-accent-cyan"
                        : "border-white/10 text-white/60"
                    }`}
                  >
                    <FiPlus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-12 text-sm leading-relaxed text-white/55 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
