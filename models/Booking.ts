import mongoose, { Schema, models, model, type InferSchemaType } from "mongoose";

export const BOOKING_STATUSES = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

const BookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, default: "", trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    city: { type: String, default: "", trim: true },
    experienceCentre: { type: String, required: true, trim: true },
    preferredDate: { type: String, required: true, trim: true },
    preferredTime: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: BOOKING_STATUSES,
      default: "Pending",
      index: true,
    },
    reference: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

BookingSchema.index({ name: "text", company: "text", email: "text", city: "text", mobile: "text" });

export type BookingDocument = InferSchemaType<typeof BookingSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const Booking =
  models.Booking || model("Booking", BookingSchema);
