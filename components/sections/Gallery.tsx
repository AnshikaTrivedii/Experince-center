"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiPlay, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GALLERY_ITEMS } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";

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
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4"
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
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
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
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={GALLERY_ITEMS[active].src}
              alt={GALLERY_ITEMS[active].title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <p className="text-lg font-medium text-white">
              {GALLERY_ITEMS[active].title}
            </p>
          </div>
        </motion.div>
      </motion.div>
    ) : null;

  return (
    <section id="gallery" className="relative py-16 sm:py-24 lg:py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Interactive Gallery"
          title={
            <>
              A glimpse of the{" "}
              <span className="text-gradient-accent">experience</span>
            </>
          }
          description="Photos and walkthroughs from our centers and installations across India."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => open(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: (i % 4) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black"
            >
              {item.src.startsWith("/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />
              {item.type === "video" && (
                <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <FiPlay className="ml-0.5" size={18} />
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 p-4 text-left">
                <p className="text-sm font-medium text-white drop-shadow-md">
                  {item.title}
                </p>
              </div>
            </motion.button>
          ))}
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
