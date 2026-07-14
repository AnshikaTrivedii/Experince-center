"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(
  target: number,
  { duration = 2000, start = false }: { duration?: number; start?: boolean }
) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, duration, start]);

  return value;
}
