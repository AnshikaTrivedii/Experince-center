"use client";

import { useEffect, useRef } from "react";

interface Piece {
  x: number;
  y: number;
  w: number;
  h: number;
  rot: number;
  vr: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

const COLORS = ["#3b82f6", "#22d3ee", "#a855f7", "#ffffff", "#818cf8"];

export function Confetti({ fire }: { fire: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!fire) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (canvas.width = canvas.offsetWidth * dpr);
    const h = (canvas.height = canvas.offsetHeight * dpr);
    ctx.scale(dpr, dpr);
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;

    const pieces: Piece[] = Array.from({ length: 160 }, () => ({
      x: cw / 2 + (Math.random() - 0.5) * cw * 0.4,
      y: ch * 0.35,
      w: Math.random() * 8 + 4,
      h: Math.random() * 5 + 3,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -14 - 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: 1,
    }));

    let raf = 0;
    const gravity = 0.4;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      let alive = false;
      for (const p of pieces) {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.008;
        if (p.life > 0 && p.y < ch + 40) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }
      if (alive) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => cancelAnimationFrame(raf);
  }, [fire]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
