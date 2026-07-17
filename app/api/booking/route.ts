import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateBooking, type BookingFormValues } from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(body: BookingFormValues, reference: string) {
  const rows: Array<[string, string]> = [
    ["Name", body.name],
    ["Company", body.company || "—"],
    ["Mobile", body.phone],
    ["Email", body.email],
    ["City", body.city || "—"],
    ["Preferred Centre", body.center],
    ["Preferred Date", body.visitDate || "—"],
    ["Preferred Time", body.visitTime || "—"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin: 0 0 8px;">New Experience Centre Visit Request</h2>
      <p style="margin: 0 0 20px; color: #555;">Reference: <strong>${escapeHtml(reference)}</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb; background: #f9fafb; width: 40%; font-weight: 600;">
              ${escapeHtml(label)}
            </td>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">
              ${escapeHtml(value)}
            </td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;
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

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { ok: false, message: "Email service is not configured" },
        { status: 500 }
      );
    }

    const toEmail =
      process.env.BOOKING_TO_EMAIL || "prachi.sharma@orion-led.com";
    const fromEmail =
      process.env.BOOKING_FROM_EMAIL ||
      "Orion Experience Centre <onboarding@resend.dev>";

    const reference = `ORION-${Date.now().toString(36).toUpperCase()}`;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: body.email,
      subject: `New visit request — ${body.name} (${body.center})`,
      html: buildEmailHtml(body, reference),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, message: "Failed to send booking email" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Booking received",
      reference,
    });
  } catch (err) {
    console.error("Booking API error:", err);
    return NextResponse.json(
      { ok: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
