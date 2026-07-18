"use client";

import { useEffect } from "react";

export type ToastMessage = {
  id: string;
  type: "success" | "error" | "info";
  text: string;
};

export function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(100%,22rem)] flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const styles =
    toast.type === "success"
      ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-100"
      : toast.type === "error"
        ? "border-rose-500/30 bg-rose-500/15 text-rose-100"
        : "border-white/15 bg-white/10 text-white";

  return (
    <div
      className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur ${styles}`}
    >
      {toast.text}
    </div>
  );
}
