import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middleware/requireAdmin";
import {
  getDashboardStats,
  serializeBooking,
} from "@/services/bookingService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const stats = await getDashboardStats();
  return NextResponse.json({
    ok: true,
    cards: stats.cards,
    recent: stats.recent.map((item) =>
      serializeBooking(item as unknown as Record<string, unknown>)
    ),
    charts: stats.charts,
  });
}
