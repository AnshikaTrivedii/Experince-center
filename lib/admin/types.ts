export type BookingStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

export type AdminBooking = {
  id: string;
  reference: string;
  name: string;
  company: string;
  mobile: string;
  email: string;
  city: string;
  experienceCentre: string;
  preferredDate: string;
  preferredTime: string;
  status: BookingStatus | string;
  createdAt: string;
  updatedAt?: string;
};

export const BOOKING_STATUS_OPTIONS: BookingStatus[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];
