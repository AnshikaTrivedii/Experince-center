export interface BookingFormValues {
  name: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  center: string;
  date: string;
  time: string;
  purpose: string;
  projectType: string;
  screenSize: string;
  message: string;
  contactMethod: string;
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

  if (!values.phone.trim()) errors.phone = "Phone is required";
  else if (!phoneRegex.test(values.phone))
    errors.phone = "Enter a valid phone number";

  if (!values.center) errors.center = "Select a center";
  if (!values.date) errors.date = "Pick a date";
  if (!values.time) errors.time = "Pick a time slot";

  return errors;
}

export const initialBookingValues: BookingFormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  center: "",
  date: "",
  time: "",
  purpose: "",
  projectType: "",
  screenSize: "",
  message: "",
  contactMethod: "Call",
};
