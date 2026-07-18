import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middleware/requireAdmin";
import {
  listBookings,
  serializeBooking,
} from "@/services/bookingService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const result = await listBookings({
    page: Number(searchParams.get("page") || 1),
    limit: Number(searchParams.get("limit") || 10),
    search: searchParams.get("search") || undefined,
    status: searchParams.get("status") || undefined,
    centre: searchParams.get("centre") || undefined,
    date: searchParams.get("date") || undefined,
    sort: (searchParams.get("sort") as "newest" | "oldest") || "newest",
  });

  return NextResponse.json({
    ok: true,
    ...result,
    items: result.items.map((item) =>
      serializeBooking(item as unknown as Record<string, unknown>)
    ),
  });
}
