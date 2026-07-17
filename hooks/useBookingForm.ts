"use client";

import { useState } from "react";
import {
  validateBooking,
  initialBookingValues,
  type BookingFormValues,
  type BookingErrors,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function useBookingForm() {
  const [values, setValues] = useState<BookingFormValues>(() => ({
    ...initialBookingValues,
  }));
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [reference, setReference] = useState<string | null>(null);

  const setField = <K extends keyof BookingFormValues>(
    key: K,
    value: BookingFormValues[K]
  ) => {
    setValues((prev) => ({ ...initialBookingValues, ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const submit = async () => {
    const normalized = { ...initialBookingValues, ...values };
    const validationErrors = validateBooking(normalized);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        setStatus("error");
        return false;
      }
      setReference(data.reference ?? null);
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  };

  const reset = () => {
    setValues({ ...initialBookingValues });
    setErrors({});
    setStatus("idle");
    setReference(null);
  };

  return { values, errors, status, reference, setField, submit, reset };
}
