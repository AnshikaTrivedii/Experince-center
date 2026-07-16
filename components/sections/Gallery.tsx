"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiX,
  FiPlay,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from "react-icons/fi";
import { GALLERY_ITEMS, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const spanClasses: Record<GalleryItem["span"], string> = {
  big: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-2",
  tall: "lg:row-span-2",
  square: "",
};

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const open = (index: number) => setActive(index);
  const close = () => setActive(null);
  const next = () =>
    setActive((a) => (a === null ? a : (a + 1) % GALLERY_ITEMS.length));
  const prev = () =>
    setActive((a) =>
      a === null ? a : (a - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const lightbox =
    active !== null ? (
      <motion.div
        key="gallery-lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery image"
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
        onClick={close}
      >
        <button
          type="button"
          className="absolute right-5 top-5 z-[210] grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-accent-cyan"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          aria-label="Close"
        >
          <FiX size={20} />
        </button>

        <button
          type="button"
          className="absolute left-4 top-1/2 z-[210] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-accent-cyan sm:left-8"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          aria-label="Previous"
        >
          <FiChevronLeft size={22} />
        </button>

        <button
          type="button"
          className="absolute right-4 top-1/2 z-[210] grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 hover:text-accent-cyan sm:right-8"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next"
        >
          <FiChevronRight size={22} />
        </button>

        <motion.div
          key={active}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)]"
          onClick={(e) => e.stopPropagation()}
        >
          {GALLERY_ITEMS[active].type === "video" &&
          GALLERY_ITEMS[active].videoSrc ? (
            <video
              key={GALLERY_ITEMS[active].videoSrc}
              autoPlay
              controls
              playsInline
              poster={GALLERY_ITEMS[active].src}
              className="absolute inset-0 h-full w-full object-contain"
            >
              <source
                src={GALLERY_ITEMS[active].videoSrc}
                type="video/mp4"
              />
            </video>
          ) : GALLERY_ITEMS[active].src.startsWith("/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={GALLERY_ITEMS[active].src}
              alt={GALLERY_ITEMS[active].title}
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : (
            <Image
              src={GALLERY_ITEMS[active].src}
              alt={GALLERY_ITEMS[active].title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent-cyan">
              0{active + 1} / 0{GALLERY_ITEMS.length}
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
              {GALLERY_ITEMS[active].title}
            </p>
          </div>
        </motion.div>
      </motion.div>
    ) : null;

  return (
    <section id="gallery" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-3xl"
      />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-cyan/25 bg-accent-cyan/[0.07] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-accent-cyan"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan shadow-glow" />
            Installations Across India
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease }}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-6xl"
          >
            A glimpse of the{" "}
            <span className="text-gradient-accent">experience</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-base"
          >
            Real Orion LED installations — from indoor pillars to city-scale
            DOOH — click any frame to explore.
          </motion.p>
        </div>

        {/* Bento gallery — featured + 5 tiles, fills 3×3 cleanly */}
        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:auto-rows-[minmax(170px,1fr)] lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, i) => {
            const featured = item.span === "big";
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => open(i)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease,
                }}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition-all duration-500 hover:border-accent-cyan/40 hover:shadow-[0_0_40px_-12px_rgba(34,211,238,0.45)]",
                  spanClasses[item.span],
                  featured && "min-h-[280px] sm:aspect-auto lg:min-h-0"
                )}
              >
                {item.src.startsWith("/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes={
                      featured
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 100vw, 25vw"
                    }
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-accent-cyan/0 transition-colors duration-500 group-hover:bg-accent-cyan/[0.06]" />

                <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-accent-cyan/80">
                  0{i + 1}
                </span>

                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-90">
                  {item.type === "video" ? (
                    <FiPlay className="ml-0.5" size={14} />
                  ) : (
                    <FiMaximize2 size={14} />
                  )}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p
                    className={cn(
                      "font-display font-semibold tracking-tight text-white drop-shadow-md",
                      featured ? "text-xl sm:text-2xl" : "text-sm sm:text-base"
                    )}
                  >
                    {item.title}
                  </p>
                  <p className="mt-1 max-w-[16rem] translate-y-1 text-xs text-white/0 transition-all duration-300 group-hover:translate-y-0 group-hover:text-white/55">
                    Tap to view full screen
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>{lightbox}</AnimatePresence>,
          document.body
        )}
    </section>
  );
}
