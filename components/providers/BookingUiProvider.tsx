"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type BookingUiContextValue = {
  selectedCenter: string;
  setSelectedCenter: (center: string) => void;
};

const BookingUiContext = createContext<BookingUiContextValue | null>(null);

export function BookingUiProvider({ children }: { children: ReactNode }) {
  const [selectedCenter, setSelectedCenter] = useState("");
  const value = useMemo(
    () => ({ selectedCenter, setSelectedCenter }),
    [selectedCenter]
  );
  return (
    <BookingUiContext.Provider value={value}>
      {children}
    </BookingUiContext.Provider>
  );
}

export function useBookingUi() {
  const ctx = useContext(BookingUiContext);
  if (!ctx) {
    throw new Error("useBookingUi must be used within BookingUiProvider");
  }
  return ctx;
}
