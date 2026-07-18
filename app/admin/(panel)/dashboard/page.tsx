"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatusBadge } from "@/components/admin/StatusBadge";
import Link from "next/link";

type StatsResponse = {
  cards: {
    total: number;
    today: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
  };
  recent: Array<{
    id: string;
    name: string;
    experienceCentre: string;
    preferredDate: string;
    preferredTime: string;
    status: string;
    createdAt: string;
  }>;
  charts: {
    byCentre: Array<{ _id: string; count: number }>;
    byStatus: Array<{ _id: string; count: number }>;
    byMonth: Array<{ _id: { year: number; month: number }; count: number }>;
  };
};

const STATUS_COLORS: Record<string, string> = {
  Pending: "#f59e0b",
  Confirmed: "#10b981",
  Completed: "#38bdf8",
  Cancelled: "#f43f5e",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Failed to load stats");
        if (alive) setData(json);
      } catch (err) {
        if (alive)
          setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const monthData = useMemo(
    () =>
      (data?.charts.byMonth || []).map((row) => ({
        label: `${row._id.month}/${row._id.year}`,
        count: row.count,
      })),
    [data]
  );

  const centreData = useMemo(
    () =>
      (data?.charts.byCentre || []).map((row) => ({
        name: row._id || "Unknown",
        count: row.count,
      })),
    [data]
  );

  const statusData = useMemo(
    () =>
      (data?.charts.byStatus || []).map((row) => ({
        name: row._id,
        value: row.count,
      })),
    [data]
  );

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-2xl border border-white/8 bg-white/[0.03]"
          />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200">
        {error || "Unable to load dashboard"}
      </div>
    );
  }

  const cards = [
    { label: "Total Bookings", value: data.cards.total },
    { label: "Today's Bookings", value: data.cards.today },
    { label: "Pending", value: data.cards.pending },
    { label: "Confirmed", value: data.cards.confirmed },
    { label: "Cancelled", value: data.cards.cancelled },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-white/45">
          Overview of Experience Centre bookings
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.05] to-transparent p-5"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">
              {card.label}
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/8 bg-[#0b1018] p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-medium text-white/70">
            Bookings per month
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthData}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="count" fill="#22d3ee" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#0b1018] p-5">
          <h3 className="mb-4 text-sm font-medium text-white/70">
            Status distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {statusData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={STATUS_COLORS[entry.name] || "#64748b"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-[#0b1018] p-5">
        <h3 className="mb-4 text-sm font-medium text-white/70">
          Experience Centre wise bookings
        </h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={centreData} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                width={100}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="count" fill="#818cf8" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-white/8 bg-[#0b1018]">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <h3 className="text-sm font-medium text-white/70">Recent bookings</h3>
          <Link
            href="/admin/bookings"
            className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wider text-white/35">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Centre</th>
                <th className="px-5 py-3">Date / Time</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.map((row) => (
                <tr key={row.id} className="border-t border-white/6">
                  <td className="px-5 py-3 font-medium">{row.name}</td>
                  <td className="px-5 py-3 text-white/60">
                    {row.experienceCentre}
                  </td>
                  <td className="px-5 py-3 text-white/60">
                    {row.preferredDate} · {row.preferredTime}
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
              {data.recent.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-10 text-center text-white/40"
                  >
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
