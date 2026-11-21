import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { OrderWithItems } from "@/types/domain";

/** RLS limits this to the signed-in user's own orders. */
export async function getOrder(orderId: string): Promise<OrderWithItems | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, spare_parts(*))")
    .eq("id", orderId)
    .maybeSingle();
  // An invalid uuid is a "not found", not a crash.
  if (error?.code === "22P02") return null;
  if (error) throw new Error(`Gagal memuat pesanan: ${error.message}`);
  return data;
}
