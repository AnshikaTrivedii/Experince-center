import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/db/mongoose";
import { Admin } from "@/models/Admin";
import { ensureDefaultAdmin } from "@/lib/auth/ensureAdmin";
import { verifyPassword } from "@/lib/auth/password";
import { setAdminCookie, signAdminToken } from "@/lib/auth/jwt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: "Username and password are required" },
        { status: 422 }
      );
    }

    await ensureDefaultAdmin();
    await connectDB();

    const username = parsed.data.username.trim().toLowerCase();
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        { ok: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(
      parsed.data.password,
      admin.passwordHash
    );
    if (!valid) {
      return NextResponse.json(
        { ok: false, message: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = await signAdminToken({
      sub: String(admin._id),
      username: admin.username,
      role: "admin",
    });
    await setAdminCookie(token);

    return NextResponse.json({
      ok: true,
      admin: { username: admin.username },
    });
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json(
      {
        ok: false,
        message:
          err instanceof Error ? err.message : "Login failed. Check server config.",
      },
      { status: 500 }
    );
  }
}
