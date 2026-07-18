"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiDownload,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { BookingDrawer } from "@/components/admin/BookingDrawer";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ToastStack, type ToastMessage } from "@/components/admin/Toast";
import {
  exportBookingsCsv,
  exportBookingsExcel,
} from "@/lib/admin/exportBookings";
import {
  BOOKING_STATUS_OPTIONS,
  type AdminBooking,
  type BookingStatus,
} from "@/lib/admin/types";
import { EXPERIENCE_CENTER_OPTIONS } from "@/lib/data";

type ListResponse = {
  ok: boolean;
  items: AdminBooking[];
  total: number;
  page: number;
  pages: number;
  message?: string;
};

export function BookingsManager() {
  const [items, setItems] = useState<AdminBooking[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [centre, setCentre] = useState("all");
  const [date, setDate] = useState("");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<AdminBooking | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminBooking | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [exporting, setExporting] = useState(false);

  const pushToast = useCallback(
    (type: ToastMessage["type"], text: string) => {
      setToasts((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, type, text },
      ]);
    },
    []
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status, centre, date, sort]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
      sort,
    });
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (status !== "all") params.set("status", status);
    if (centre !== "all") params.set("centre", centre);
    if (date) params.set("date", date);
    return params.toString();
  }, [page, sort, debouncedSearch, status, centre, date]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?${queryString}`);
      const data = (await res.json()) as ListResponse;
      if (!res.ok) throw new Error(data.message || "Failed to load bookings");
      setItems(data.items);
      setTotal(data.total);
      setPages(data.pages);
    } catch (err) {
      pushToast(
        "error",
        err instanceof Error ? err.message : "Failed to load bookings"
      );
    } finally {
      setLoading(false);
    }
  }, [queryString, pushToast]);

  useEffect(() => {
    void load();
  }, [load]);

  const openBooking = (booking: AdminBooking) => {
    setSelected(booking);
    setDrawerOpen(true);
  };

  const patchStatus = async (id: string, next: BookingStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      const updated = data.booking as AdminBooking;
      setItems((prev) => prev.map((b) => (b.id === id ? updated : b)));
      setSelected((prev) => (prev?.id === id ? updated : prev));
      pushToast("success", `Status updated to ${next}`);
    } catch (err) {
      pushToast(
        "error",
        err instanceof Error ? err.message : "Failed to update status"
      );
    } finally {
      setUpdating(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/bookings/${deleteTarget.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      pushToast("success", "Booking deleted");
      setDeleteTarget(null);
      setDrawerOpen(false);
      setSelected(null);
      await load();
    } catch (err) {
      pushToast(
        "error",
        err instanceof Error ? err.message : "Failed to delete booking"
      );
    } finally {
      setDeleting(false);
    }
  };

  const fetchForExport = async () => {
    const params = new URLSearchParams({
      page: "1",
      limit: "5000",
      sort,
    });
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (status !== "all") params.set("status", status);
    if (centre !== "all") params.set("centre", centre);
    if (date) params.set("date", date);
    const res = await fetch(`/api/bookings?${params.toString()}`);
    const data = (await res.json()) as ListResponse;
    if (!res.ok) throw new Error(data.message || "Export failed");
    return data.items;
  };

  const handleExport = async (format: "csv" | "xlsx") => {
    setExporting(true);
    try {
      const rows = await fetchForExport();
      if (rows.length === 0) {
        pushToast("info", "No bookings to export");
        return;
      }
      if (format === "csv") exportBookingsCsv(rows);
      else exportBookingsExcel(rows);
      pushToast("success", `Exported ${rows.length} booking(s)`);
    } catch (err) {
      pushToast(
        "error",
        err instanceof Error ? err.message : "Export failed"
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Bookings
          </h2>
          <p className="mt-1 text-sm text-white/45">
            {total} total · manage Experience Centre reservations
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/5"
          >
            <FiRefreshCw size={14} /> Refresh
          </button>
          <button
            type="button"
            disabled={exporting}
            onClick={() => void handleExport("csv")}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70 hover:bg-white/5 disabled:opacity-50"
          >
            <FiDownload size={14} /> CSV
          </button>
          <button
            type="button"
            disabled={exporting}
            onClick={() => void handleExport("xlsx")}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600/90 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-50"
          >
            <FiDownload size={14} /> Excel
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl border border-white/8 bg-[#0b1018] p-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, company, phone, email, city…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3 text-sm outline-none focus:border-cyan-400/40"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-cyan-400/40"
        >
          <option value="all" className="bg-[#0b1018]">
            All statuses
          </option>
          {BOOKING_STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="bg-[#0b1018]">
              {s}
            </option>
          ))}
        </select>
        <select
          value={centre}
          onChange={(e) => setCentre(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-cyan-400/40"
        >
          <option value="all" className="bg-[#0b1018]">
            All centres
          </option>
          {EXPERIENCE_CENTER_OPTIONS.map((c) => (
            <option key={c} value={c} className="bg-[#0b1018]">
              {c}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-cyan-400/40"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-cyan-400/40"
          >
            <option value="newest" className="bg-[#0b1018]">
              Newest
            </option>
            <option value="oldest" className="bg-[#0b1018]">
              Oldest
            </option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#0b1018]">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left text-sm">
            <thead className="bg-white/[0.02] text-[11px] uppercase tracking-wider text-white/35">
              <tr>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Centre</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="border-t border-white/6">
                      <td colSpan={12} className="px-4 py-3">
                        <div className="h-8 animate-pulse rounded-lg bg-white/[0.04]" />
                      </td>
                    </tr>
                  ))
                : items.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => openBooking(row)}
                      className="cursor-pointer border-t border-white/6 transition hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-cyan-300/90">
                        {row.reference || row.id.slice(-8)}
                      </td>
                      <td className="px-4 py-3 font-medium">{row.name}</td>
                      <td className="px-4 py-3 text-white/60">
                        {row.company || "—"}
                      </td>
                      <td className="px-4 py-3 text-white/60">{row.mobile}</td>
                      <td className="px-4 py-3 text-white/60">{row.email}</td>
                      <td className="px-4 py-3 text-white/60">
                        {row.city || "—"}
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {row.experienceCentre}
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {row.preferredDate}
                      </td>
                      <td className="px-4 py-3 text-white/60">
                        {row.preferredTime}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-3 text-white/45">
                        {row.createdAt
                          ? new Date(row.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(row);
                          }}
                          className="rounded-lg border border-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/10"
                          aria-label="Delete booking"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
              {!loading && items.length === 0 && (
                <tr>
                  <td
                    colSpan={12}
                    className="px-4 py-16 text-center text-white/40"
                  >
                    No bookings match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/8 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            Page {page} of {pages} · 10 per page
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-sm text-white/70 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pages || loading}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="rounded-xl border border-white/10 px-3 py-1.5 text-sm text-white/70 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <BookingDrawer
        booking={selected}
        open={drawerOpen}
        updating={updating}
        onClose={() => setDrawerOpen(false)}
        onStatusChange={(next) => {
          if (selected) void patchStatus(selected.id, next);
        }}
        onMarkConfirmed={() => {
          if (selected) void patchStatus(selected.id, "Confirmed");
        }}
        onDelete={() => {
          if (selected) setDeleteTarget(selected);
        }}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete booking?"
        description={`This will permanently remove the booking for ${deleteTarget?.name || "this guest"}. This cannot be undone.`}
        confirmLabel="Delete"
        danger
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => void confirmDelete()}
      />

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
