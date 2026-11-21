export type OrderLine = { spare_part_id: string; quantity: number };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const MAX_LINE_QUANTITY = 99;

/** Parses the cart sent by the browser. Returns null for anything malformed. */
export function parseOrderLines(raw: unknown): OrderLine[] | null {
  if (typeof raw !== "string") return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!Array.isArray(value) || value.length === 0) return null;

  const lines: OrderLine[] = [];
  for (const entry of value) {
    const { spare_part_id, quantity } = (entry ?? {}) as Record<string, unknown>;
    if (typeof spare_part_id !== "string" || !UUID.test(spare_part_id)) return null;
    if (!Number.isInteger(quantity) || (quantity as number) < 1 || (quantity as number) > MAX_LINE_QUANTITY) {
      return null;
    }
    lines.push({ spare_part_id, quantity: quantity as number });
  }
  return lines;
}
