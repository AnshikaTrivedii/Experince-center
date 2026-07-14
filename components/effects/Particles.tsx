"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  alpha: number;
}

const COLORS = [190, 210, 265]; // cyan, blue, purple hues

export function Particles({ density = 60 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = Math.min(density, Math.floor((width * height) / 16000));
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(),
      r: Math.random() * 2 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25 - 0.1,
      hue: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.15,
    }));

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const twinkle = p.alpha + Math.sin(Date.now() * 0.001 + p.x) * 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.6 + p.z), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${Math.max(0, twinkle)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 65%, 0.8)`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };

    if (!prefersReduced) {
      raf = requestAnimationFrame(render);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
