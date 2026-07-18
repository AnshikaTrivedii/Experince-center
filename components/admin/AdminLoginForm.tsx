"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiUser } from "react-icons/fi";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }
    router.replace("/admin/dashboard");
    router.refresh();
  });

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-white/40">
          Username
        </label>
        <div className="relative">
          <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            {...register("username")}
            autoComplete="username"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="admin"
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-xs text-rose-400">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.18em] text-white/40">
          Password
        </label>
        <div className="relative">
          <FiLock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            {...register("password")}
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-rose-400">{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(34,211,238,0.7)] transition hover:brightness-110 disabled:opacity-60"
      >
        {isSubmitting ? "Signing in…" : "Login"}
      </button>
    </form>
  );
}
