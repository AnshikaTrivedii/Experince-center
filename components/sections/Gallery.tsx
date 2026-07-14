"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiPlay, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GALLERY_ITEMS, type GalleryItem } from "@/lib/data";
import { SectionHeading } from "@/components/common/SectionHeading";
import { cn } from "@/lib/utils";

const spanClasses: Record<GalleryItem["span"], string> = {
  tall: "sm:row-span-2",
  wide: "sm:col-span-2",
  square: "",
  big: "sm:col-span-2 sm:row-span-2",
};

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const open = (index: number) => setActive(index);
  const close = () => setActive(null);
  const next = () =>
    setActive((a) => (a === null ? a : (a + 1) % GALLERY_ITEMS.length));
  const prev = () =>
    setActive((a) =>
      a === null ? a : (a - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );

  return (
    <section id="gallery" className="relative py-28 sm:py-36">
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

        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => open(i)}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: (i % 4) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-white/10",
                spanClasses[item.span]
              )}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
              {item.type === "video" && (
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full glass-strong text-white transition-transform duration-300 group-hover:scale-110">
                  <FiPlay className="ml-0.5" />
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">{item.title}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
            onClick={close}
          >
            <button
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full glass text-white transition-colors hover:text-accent-cyan"
              onClick={close}
              aria-label="Close"
            >
              <FiX size={20} />
            </button>
            <button
              className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass text-white transition-colors hover:text-accent-cyan sm:left-8"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full glass text-white transition-colors hover:text-accent-cyan sm:right-8"
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
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={GALLERY_ITEMS[active].src}
                alt={GALLERY_ITEMS[active].title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-lg font-medium text-white">
                  {GALLERY_ITEMS[active].title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
