import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateBooking, type BookingFormValues } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Amplify env vars often break `Name <email@x.com>` — support plain email + name. */
function resolveFromAddress() {
  const raw = (process.env.BOOKING_FROM_EMAIL || "onboarding@resend.dev").trim();
  const name = (
    process.env.BOOKING_FROM_NAME || "Orion Experience Centre"
  ).trim();

  if (raw.includes("<") && raw.includes(">")) {
    return raw;
  }

  if (raw.includes("@")) {
    return `${name} <${raw}>`;
  }

  return "Orion Experience Centre <onboarding@resend.dev>";
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

    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          ok: false,
          message:
            "Email service is not configured. Set RESEND_API_KEY in Amplify and redeploy.",
        },
        { status: 500 }
      );
    }

    const toEmail = (
      process.env.BOOKING_TO_EMAIL || "prachi.sharma@orion-led.com"
    ).trim();
    const fromEmail = resolveFromAddress();
    const reference = `ORION-${Date.now().toString(36).toUpperCase()}`;

    const resend = new Resend(apiKey);

    let sendResult: Awaited<ReturnType<typeof resend.emails.send>>;
    try {
      sendResult = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: body.email,
        subject: `New visit request — ${body.name} (${body.center})`,
        html: buildEmailHtml(body, reference),
      });
    } catch (sendErr) {
      const detail =
        sendErr instanceof Error ? sendErr.message : "Unknown Resend failure";
      console.error("Resend threw:", sendErr);
      return NextResponse.json(
        {
          ok: false,
          message: `Email send failed: ${detail}`,
        },
        { status: 502 }
      );
    }

    if (sendResult.error) {
      console.error("Resend error:", sendResult.error);
      return NextResponse.json(
        {
          ok: false,
          message:
            sendResult.error.message ||
            "Failed to send booking email. Verify Resend API key, from address, and recipient.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Booking received",
      reference,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Invalid request";
    console.error("Booking API error:", err);
    return NextResponse.json(
      { ok: false, message: detail },
      { status: 500 }
    );
  }
}
