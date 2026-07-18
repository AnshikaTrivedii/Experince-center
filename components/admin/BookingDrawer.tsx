"use client";

import {
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { AdminBooking, BookingStatus } from "@/lib/admin/types";
import { BOOKING_STATUS_OPTIONS } from "@/lib/admin/types";

type BookingDrawerProps = {
  booking: AdminBooking | null;
  open: boolean;
  updating?: boolean;
  onClose: () => void;
  onStatusChange: (status: BookingStatus) => void;
  onMarkConfirmed: () => void;
  onDelete: () => void;
};

export function BookingDrawer({
  booking,
  open,
  updating,
  onClose,
  onStatusChange,
  onMarkConfirmed,
  onDelete,
}: BookingDrawerProps) {
  if (!open || !booking) return null;

  const rows: Array<{ label: string; value: string }> = [
    { label: "Booking ID", value: booking.reference || booking.id },
    { label: "Name", value: booking.name },
    { label: "Company", value: booking.company || "—" },
    { label: "Phone", value: booking.mobile },
    { label: "Email", value: booking.email },
    { label: "City", value: booking.city || "—" },
    { label: "Experience Centre", value: booking.experienceCentre },
    { label: "Preferred Date", value: booking.preferredDate },
    { label: "Preferred Time", value: booking.preferredTime },
    {
      label: "Created",
      value: booking.createdAt
        ? new Date(booking.createdAt).toLocaleString()
        : "—",
    },
  ];

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close drawer"
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0b1018] shadow-2xl">
        <div className="flex items-start justify-between border-b border-white/8 px-5 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400">
              Booking details
            </p>
            <h3 className="mt-1 text-lg font-semibold">{booking.name}</h3>
            <div className="mt-2">
              <StatusBadge status={booking.status} />
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white/60 hover:bg-white/5"
          >
            <FiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <dl className="space-y-4">
            {rows.map((row) => (
              <div key={row.label}>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-white/35">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm text-white/85">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            <label className="text-[11px] uppercase tracking-[0.16em] text-white/35">
              Change status
            </label>
            <select
              value={booking.status}
              disabled={updating}
              onChange={(e) =>
                onStatusChange(e.target.value as BookingStatus)
              }
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm outline-none focus:border-cyan-400/40"
            >
              {BOOKING_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status} className="bg-[#0b1018]">
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-white/8 p-4">
          <a
            href={`tel:${booking.mobile}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
          >
            <FiPhone size={16} /> Call
          </a>
          <a
            href={`mailto:${booking.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
          >
            <FiMail size={16} /> Email
          </a>
          <button
            type="button"
            disabled={updating || booking.status === "Confirmed"}
            onClick={onMarkConfirmed}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600/90 px-3 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            <FiCheckCircle size={16} /> Mark Confirmed
          </button>
          <button
            type="button"
            disabled={updating}
            onClick={onDelete}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600/90 px-3 py-2.5 text-sm font-semibold text-white hover:bg-rose-500 disabled:opacity-50"
          >
            <FiTrash2 size={16} /> Delete
          </button>
        </div>
      </aside>
    </div>
  );
}
