export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    Confirmed: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    Completed: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    Cancelled: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        styles[status] || "bg-white/10 text-white/60 border-white/15"
      }`}
    >
      {status}
    </span>
  );
}
