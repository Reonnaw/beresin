import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { ServiceBookingWithModel } from "@/types/domain";

/** RLS returns only the signed-in user's bookings. */
export async function getMyBookings(): Promise<ServiceBookingWithModel[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("service_bookings")
    .select("*, laptop_models(name)")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Gagal memuat booking: ${error.message}`);
  return data;
}
