"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type BookingPayload = {
  service: string;
  estimatedWeight: number;
  totalPrice: number;
  paymentMethod: string;
};

export type BookingResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function confirmBooking(payload: BookingPayload): Promise<BookingResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      servis: payload.service,
      estimasi_berat: payload.estimatedWeight,
      total_harga: payload.totalPrice,
      metode_pembayaran: payload.paymentMethod,
    })
    .select()
    .single();

  if (error) {
    console.error("Booking error:", error);
    return { success: false, error: "Gagal membuat pesanan, coba lagi." };
  }

  revalidatePath("/booking");
  return { success: true, orderId: data.id };
}
