"use client";

import { useEffect, useRef } from "react";

/**
 * A GPU-cheap mouse-follow spotlight rendered with a single translated div.
 * Hidden on touch / coarse pointers.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let raf = 0;
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { ...pos };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 4}px, ${
          e.clientY - 4
        }px, 0)`;
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.x - 300}px, ${
          pos.y - 300
        }px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[600px] w-[600px] rounded-full opacity-60 mix-blend-screen md:block"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(59,130,246,0.06) 35%, transparent 70%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-2 w-2 rounded-full bg-accent-cyan shadow-glow md:block"
      />
    </>
  );
}
