import { connectDB } from "@/lib/db/mongoose";
import { Booking, type BookingStatus } from "@/models/Booking";
import type { BookingFormValues } from "@/lib/validation";

export function createBookingReference() {
  return `ORION-${Date.now().toString(36).toUpperCase()}`;
}

export async function createBookingFromForm(
  body: BookingFormValues,
  reference: string
) {
  await connectDB();
  return Booking.create({
    name: body.name.trim(),
    company: body.company?.trim() || "",
    mobile: body.phone.trim(),
    email: body.email.trim().toLowerCase(),
    city: body.city?.trim() || "",
    experienceCentre: body.center.trim(),
    preferredDate: body.visitDate.trim(),
    preferredTime: body.visitTime.trim(),
    status: "Pending",
    reference,
  });
}

export type BookingListQuery = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  centre?: string;
  date?: string;
  sort?: "newest" | "oldest";
};

export async function listBookings(query: BookingListQuery) {
  await connectDB();

  const page = Math.max(1, query.page || 1);
  const limit = Math.min(5000, Math.max(1, query.limit || 10));
  const filter: Record<string, unknown> = {};

  if (query.status && query.status !== "all") {
    filter.status = query.status;
  }
  if (query.centre && query.centre !== "all") {
    filter.experienceCentre = query.centre;
  }
  if (query.date) {
    filter.preferredDate = query.date;
  }
  if (query.search?.trim()) {
    const q = query.search.trim();
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { company: { $regex: q, $options: "i" } },
      { mobile: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { city: { $regex: q, $options: "i" } },
      { reference: { $regex: q, $options: "i" } },
    ];
  }

  const sort = query.sort === "oldest" ? { createdAt: 1 as const } : { createdAt: -1 as const };

  const [items, total] = await Promise.all([
    Booking.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Booking.countDocuments(filter),
  ]);

  return {
    items,
    total,
    page,
    limit,
    pages: Math.max(1, Math.ceil(total / limit)),
  };
}

export async function getBookingById(id: string) {
  await connectDB();
  return Booking.findById(id).lean();
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  await connectDB();
  return Booking.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).lean();
}

export async function deleteBooking(id: string) {
  await connectDB();
  return Booking.findByIdAndDelete(id).lean();
}

export async function getDashboardStats() {
  await connectDB();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const [
    total,
    today,
    pending,
    confirmed,
    cancelled,
    completed,
    recent,
    byCentre,
    byStatus,
    byMonth,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ createdAt: { $gte: startOfToday } }),
    Booking.countDocuments({ status: "Pending" }),
    Booking.countDocuments({ status: "Confirmed" }),
    Booking.countDocuments({ status: "Cancelled" }),
    Booking.countDocuments({ status: "Completed" }),
    Booking.find().sort({ createdAt: -1 }).limit(8).lean(),
    Booking.aggregate([
      { $group: { _id: "$experienceCentre", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]),
    Booking.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      { $limit: 12 },
    ]),
  ]);

  return {
    cards: {
      total,
      today,
      pending,
      confirmed,
      cancelled,
      completed,
    },
    recent,
    charts: {
      byCentre,
      byStatus,
      byMonth,
    },
  };
}

export function serializeBooking(doc: Record<string, unknown>) {
  return {
    id: String(doc._id),
    reference: doc.reference,
    name: doc.name,
    company: doc.company,
    mobile: doc.mobile,
    email: doc.email,
    city: doc.city,
    experienceCentre: doc.experienceCentre,
    preferredDate: doc.preferredDate,
    preferredTime: doc.preferredTime,
    status: doc.status,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
