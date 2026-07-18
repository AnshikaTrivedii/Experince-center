import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middleware/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { admin, error } = await requireAdmin();
  if (error) return error;
  return NextResponse.json({ ok: true, admin });
}
