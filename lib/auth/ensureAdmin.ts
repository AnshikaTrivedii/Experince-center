import { connectDB } from "@/lib/db/mongoose";
import { Admin } from "@/models/Admin";
import { hashPassword } from "@/lib/auth/password";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "Admin@123";

/** Ensures the default admin exists (password hashed). Safe to call repeatedly. */
export async function ensureDefaultAdmin() {
  await connectDB();

  const username = (
    process.env.ADMIN_USERNAME || DEFAULT_USERNAME
  ).toLowerCase();
  const password = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;

  const existing = await Admin.findOne({ username });
  if (existing) return existing;

  const passwordHash = await hashPassword(password);
  return Admin.create({ username, passwordHash });
}
