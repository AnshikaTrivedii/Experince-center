import { NextResponse } from "next/server";
import { validateBooking, type BookingFormValues } from "@/lib/validation";
import { requireAdmin } from "@/lib/middleware/requireAdmin";
import {
  createBookingFromForm,
  createBookingReference,
  listBookings,
  serializeBooking,
} from "@/services/bookingService";
import { sendBookingNotificationEmail } from "@/services/emailService";

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

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as BookingFormValues;
    const errors = validateBooking(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors, message: "Validation failed" },
        { status: 422 }
      );
    }

    const reference = createBookingReference();

    let booking;
    try {
      booking = await createBookingFromForm(body, reference);
    } catch (err) {
      console.error("[bookings] MongoDB save failed:", err);
      return NextResponse.json(
        {
          ok: false,
          message:
            err instanceof Error
              ? err.message
              : "Failed to save booking. Check MONGODB_URI.",
        },
        { status: 500 }
      );
    }

    let emailId: string | null = null;
    let emailError: string | null = null;
    try {
      emailId = await sendBookingNotificationEmail(body, reference);
    } catch (err) {
      console.error("[bookings] Email failed (booking still saved):", err);
      emailError =
        err instanceof Error ? err.message : "Email notification failed";
    }

    return NextResponse.json({
      ok: true,
      message: emailError
        ? "Booking saved. Email notification failed — request is still in the admin portal."
        : "Booking received",
      reference,
      emailId,
      emailError,
      booking: serializeBooking(booking.toObject()),
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          err instanceof Error ? err.message : "Unexpected booking server error",
      },
      { status: 500 }
    );
  }
}
