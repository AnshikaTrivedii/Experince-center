/**
 * Seeds the default admin account (username: admin, password: Admin@123).
 * Requires MONGODB_URI in the environment (.env.local or shell).
 *
 * Usage: node --env-file=.env.local scripts/seed-admin.mjs
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;
const username = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
const password = process.env.ADMIN_PASSWORD || "Admin@123";

if (!MONGODB_URI) {
  console.error("MONGODB_URI is required");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function main() {
  await mongoose.connect(MONGODB_URI);
  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`Admin "${username}" already exists — nothing to do.`);
    await mongoose.disconnect();
    return;
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ username, passwordHash });
  console.log(`Created admin "${username}" (password hashed).`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
