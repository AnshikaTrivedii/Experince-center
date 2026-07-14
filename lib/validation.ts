export interface BookingFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  center: string;
  timeline: string;
}

export type BookingErrors = Partial<Record<keyof BookingFormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[\d\s-]{8,15}$/;

export function validateBooking(values: BookingFormValues): BookingErrors {
  const errors: BookingErrors = {};

  if (!values.name.trim()) errors.name = "Please enter your name";
  else if (values.name.trim().length < 2) errors.name = "Name is too short";

  if (!values.email.trim()) errors.email = "Email is required";
  else if (!emailRegex.test(values.email)) errors.email = "Enter a valid email";

  if (!values.phone.trim()) errors.phone = "Mobile number is required";
  else if (!phoneRegex.test(values.phone))
    errors.phone = "Enter a valid mobile number";

  if (!values.center) errors.center = "Select a preferred experience centre";

  return errors;
}

export const initialBookingValues: BookingFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  center: "",
  timeline: "",
};

export const PROJECT_TIMELINES = [
  "Immediate (0–1 month)",
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "Just exploring",
] as const;
