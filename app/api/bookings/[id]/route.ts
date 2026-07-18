import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/middleware/requireAdmin";
import { BOOKING_STATUSES } from "@/models/Booking";
import {
  deleteBooking,
  getBookingById,
  serializeBooking,
  updateBookingStatus,
} from "@/services/bookingService";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const booking = await getBookingById(id);
  if (!booking) {
    return NextResponse.json(
      { ok: false, message: "Booking not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    booking: serializeBooking(booking as unknown as Record<string, unknown>),
  });
}

const patchSchema = z.object({
  status: z.enum(BOOKING_STATUSES),
});

export async function PATCH(request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const body = await request.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Invalid status" },
      { status: 422 }
    );
  }

  const booking = await updateBookingStatus(id, parsed.data.status);
  if (!booking) {
    return NextResponse.json(
      { ok: false, message: "Booking not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    booking: serializeBooking(booking as unknown as Record<string, unknown>),
  });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { error } = await requireAdmin();
  if (error) return error;

  const { id } = await params;
  const booking = await deleteBooking(id);
  if (!booking) {
    return NextResponse.json(
      { ok: false, message: "Booking not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, message: "Booking deleted" });
}
