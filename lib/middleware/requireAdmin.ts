import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/auth/jwt";

export async function requireAdmin() {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return {
      admin: null,
      error: NextResponse.json(
        { ok: false, message: "Unauthorized" },
        { status: 401 }
      ),
    };
  }
  return { admin, error: null };
}
