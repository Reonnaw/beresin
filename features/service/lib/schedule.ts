const LOCAL_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export const MIN_LEAD_HOURS = 2;
export const MAX_LEAD_DAYS = 60;
export const OPEN_HOUR = 8;
export const CLOSE_HOUR = 20;

/** <input type="datetime-local"> has no zone; the workshop runs on Jakarta time (UTC+7, no DST). */
export function parseJakartaDateTime(value: unknown): Date | null {
  if (typeof value !== "string" || !LOCAL_DATE_TIME.test(value)) return null;
  const date = new Date(`${value}:00+07:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Returns an error message, or null when the slot can be booked. */
export function validateSchedule(date: Date, now: Date = new Date()): string | null {
  if (date.getTime() < now.getTime() + MIN_LEAD_HOURS * HOUR) {
    return `Jadwal minimal ${MIN_LEAD_HOURS} jam dari sekarang.`;
  }
  if (date.getTime() > now.getTime() + MAX_LEAD_DAYS * DAY) {
    return `Jadwal maksimal ${MAX_LEAD_DAYS} hari ke depan.`;
  }
  const jakartaHour = (date.getUTCHours() + 7) % 24;
  if (jakartaHour < OPEN_HOUR || jakartaHour >= CLOSE_HOUR) {
    return `Jam layanan ${OPEN_HOUR}.00–${CLOSE_HOUR}.00 WIB.`;
  }
  return null;
}
