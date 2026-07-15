"use client";

import { useEffect, useRef } from "react";

/**
 * Mouse spotlight — RAF only while moving, pauses when idle.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isCoarse || prefersReduced) return;

    let raf = 0;
    let idleTimer = 0;
    let active = false;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };

    const stop = () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.x - 200}px, ${
          pos.y - 200
        }px, 0)`;
        glowRef.current.style.opacity = "1";
      }
      const settled =
        Math.abs(target.x - pos.x) < 0.4 && Math.abs(target.y - pos.y) < 0.4;
      if (settled) {
        active = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${
          e.clientY - 4
        }px, 0)`;
      }
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(stop, 900);
      if (!active) {
        active = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.clearTimeout(idleTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-300 md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.09) 0%, rgba(59,130,246,0.05) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-2 w-2 rounded-full bg-accent-cyan/80 md:block"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
