const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const dateTime = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

/** Prices are stored as whole rupiah integers. */
export function formatRupiah(amount: number): string {
  return rupiah.format(amount);
}

export function formatCostRange(min: number, max: number): string {
  return min === max
    ? formatRupiah(min)
    : `${formatRupiah(min)} – ${formatRupiah(max)}`;
}

export function formatDateTime(value: string | Date): string {
  return dateTime.format(new Date(value));
}
