import { NextResponse } from "next/server";
import { validateBooking, type BookingFormValues } from "@/lib/validation";

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

    // TODO: integrate with CRM / email / DB here.
    // e.g. await sendToCrm(body); await notifySales(body);

    return NextResponse.json({
      ok: true,
      message: "Booking received",
      reference: `ORION-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
