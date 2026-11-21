import type { BookingStatus, ServiceType } from "@/types/domain";

export const SERVICE_TYPES = ["drop_off", "home_service"] as const satisfies readonly ServiceType[];

export const SERVICE_TYPE_LABELS = {
  drop_off: "Antar ke workshop",
  home_service: "Teknisi datang ke rumah",
} as const satisfies Record<ServiceType, string>;

export const BOOKING_STATUS_LABELS = {
  pending: "Menunggu konfirmasi",
  confirmed: "Dikonfirmasi",
  in_progress: "Sedang dikerjakan",
  completed: "Selesai",
  cancelled: "Dibatalkan",
} as const satisfies Record<BookingStatus, string>;
