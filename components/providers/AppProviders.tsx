"use client";

import { usePathname } from "next/navigation";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return <>{children}</>;
  }
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
