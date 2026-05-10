"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type BookingPayload = {
  servis: string;
  estimasiBerat: number;
  totalHarga: number;
  metodePembayaran: string;
};

export type BookingResult =
  | { sukses: true; orderId: string }
  | { sukses: false; error: string };

export async function confirmBooking(payload: BookingPayload): Promise<BookingResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      servis: payload.servis,
      estimasi_berat: payload.estimasiBerat,
      total_harga: payload.totalHarga,
      metode_pembayaran: payload.metodePembayaran,
    })
    .select()
    .single();

  if (error) {
    console.error("Booking error:", error);
    return { sukses: false, error: "Gagal membuat pesanan, coba lagi." };
  }

  revalidatePath("/booking");
  return { sukses: true, orderId: data.id };
}
