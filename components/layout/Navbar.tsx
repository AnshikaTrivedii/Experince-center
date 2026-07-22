"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiArrowRight } from "react-icons/fi";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/Logo";
import { GlowButton } from "@/components/ui/GlowButton";
import { MagneticButton } from "@/components/common/MagneticButton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-5",
            scrolled
              ? "glass-strong shadow-card"
              : "border border-transparent bg-transparent"
          )}
        >
          <Logo className="relative z-10" />

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white"
              >
                {link.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent-cyan to-transparent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <MagneticButton className="hidden sm:inline-flex">
              <GlowButton
                size="sm"
                variant="outline"
                shimmer={false}
                onClick={() => scrollTo("#book")}
                className="border-white/20 bg-white/[0.04] backdrop-blur-md hover:border-accent-cyan/50"
              >
                Reserve My Visit
              </GlowButton>
            </MagneticButton>
            <MagneticButton className="hidden md:inline-flex">
              <GlowButton
                size="sm"
                onClick={() =>
                  window.open(
                    "https://orion-led.com/vision/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="ring-2 ring-accent-cyan/40 ring-offset-2 ring-offset-transparent shadow-[0_0_40px_-6px_rgba(34,211,238,0.85)]"
              >
                Partner with ORION LED
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </GlowButton>
            </MagneticButton>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full glass text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.05 }}
              className="absolute inset-x-4 top-24 rounded-3xl glass-strong p-6"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="rounded-2xl px-4 py-3 text-lg font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <GlowButton
                  className="mt-4 w-full"
                  variant="outline"
                  shimmer={false}
                  onClick={() => {
                    setOpen(false);
                    scrollTo("#book");
                  }}
                >
                  Reserve My Visit
                </GlowButton>
                <GlowButton
                  className="mt-2 w-full ring-2 ring-accent-cyan/40 shadow-[0_0_40px_-6px_rgba(34,211,238,0.85)]"
                  onClick={() => {
                    setOpen(false);
                    window.open(
                      "https://orion-led.com/vision/",
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  Partner with ORION LED
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function scrollTo(hash: string) {
  const el = document.querySelector(hash);
  el?.scrollIntoView({ behavior: "smooth" });
}
