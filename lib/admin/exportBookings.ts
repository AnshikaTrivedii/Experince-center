import * as XLSX from "xlsx";
import type { AdminBooking } from "@/lib/admin/types";

const HEADERS = [
  "Booking ID",
  "Name",
  "Company",
  "Phone",
  "Email",
  "City",
  "Experience Centre",
  "Preferred Date",
  "Preferred Time",
  "Status",
  "Created Date",
] as const;

function rowsFromBookings(bookings: AdminBooking[]) {
  return bookings.map((b) => [
    b.reference || b.id,
    b.name,
    b.company,
    b.mobile,
    b.email,
    b.city,
    b.experienceCentre,
    b.preferredDate,
    b.preferredTime,
    b.status,
    b.createdAt ? new Date(b.createdAt).toLocaleString() : "",
  ]);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportBookingsCsv(bookings: AdminBooking[]) {
  const lines = [
    HEADERS.join(","),
    ...rowsFromBookings(bookings).map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
        .join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  downloadBlob(blob, `orion-bookings-${Date.now()}.csv`);
}

export function exportBookingsExcel(bookings: AdminBooking[]) {
  const sheetData = [HEADERS as unknown as string[], ...rowsFromBookings(bookings)];
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  downloadBlob(blob, `orion-bookings-${Date.now()}.xlsx`);
}
