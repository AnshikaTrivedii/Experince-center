"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiGrid,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FiGrid },
  { href: "/admin/bookings", label: "Bookings", icon: FiCalendar },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  const NavLinks = (
    <nav className="flex min-h-0 flex-1 flex-col gap-1 p-3">
      <div className="flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-cyan-500/15 text-cyan-300"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
      <button
        type="button"
        onClick={logout}
        disabled={loggingOut}
        className="mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-red-500/10 hover:text-red-300"
      >
        <FiLogOut size={18} />
        {loggingOut ? "Signing out…" : "Logout"}
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#070a0f] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/8 bg-[#0b1018] lg:flex lg:flex-col">
          <div className="border-b border-white/8 px-5 py-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-400">
              Orion LED
            </p>
            <h1 className="mt-1 font-semibold tracking-tight">Admin Portal</h1>
          </div>
          {NavLinks}
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/8 bg-[#070a0f]/90 px-4 py-3 backdrop-blur lg:px-8">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={18} />
            </button>
            <p className="text-sm text-white/45">
              Experience Centre bookings
            </p>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
              admin
            </span>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-[#0b1018] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <span className="font-semibold">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10"
              >
                <FiX />
              </button>
            </div>
            {NavLinks}
          </aside>
        </div>
      )}
    </div>
  );
}
