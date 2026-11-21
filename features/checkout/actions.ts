"use server";

import { redirect } from "next/navigation";

import { parseOrderLines } from "@/features/checkout/lib/order-input";
import { createClient } from "@/lib/supabase/server";

export type CheckoutState = { error?: string };

const MAX_ADDRESS_LENGTH = 500;

export async function placeOrder(_: CheckoutState, formData: FormData): Promise<CheckoutState> {
  const lines = parseOrderLines(formData.get("items"));
  if (!lines) return { error: "Isi keranjang tidak valid. Muat ulang halaman lalu coba lagi." };

  const address = String(formData.get("shippingAddress") ?? "").trim();
  if (!address) return { error: "Alamat pengiriman wajib diisi." };
  if (address.length > MAX_ADDRESS_LENGTH) return { error: "Alamat pengiriman terlalu panjang." };

  const supabase = await createClient();
  // place_order prices items from the database and reserves stock in one transaction.
  const { data: orderId, error } = await supabase.rpc("place_order", {
    items: lines,
    shipping_address: address,
  });

  if (error) {
    // P0001 / 28000 carry user-facing messages raised by place_order itself.
    const known = error.code === "P0001" || error.code === "28000";
    return { error: known ? error.message : "Pesanan gagal dibuat. Coba beberapa saat lagi." };
  }
  redirect(`/checkout/success?order=${orderId}`);
}
