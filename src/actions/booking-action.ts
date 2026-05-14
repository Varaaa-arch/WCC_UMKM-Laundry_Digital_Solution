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

  // TODO: Ganti dummy user_id dengan autentikasi asli setelah sistem login siap
  // const { data: { user }, error: authError } = await supabase.auth.getUser();
  // if (authError || !user) {
  //   return { success: false, error: "Sesi login tidak ditemukan. Silakan login ulang." };
  // }
  const DUMMY_USER_ID = "00000000-0000-0000-0000-000000000001"; // dummy untuk testing

  // Mapping service slug → service_id dari tabel services (seed data)
  const SERVICE_ID_MAP: Record<string, string> = {
    "cuci-kering-setrika": "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1",
    "setrika-ekspres":     "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2",
  };

  const serviceId = SERVICE_ID_MAP[payload.service];
  if (!serviceId) {
    return { success: false, error: `Layanan tidak dikenali: ${payload.service}` };
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id:       DUMMY_USER_ID,
      customer_name: "Guest (Testing)",   // TODO: ambil dari profil user setelah login
      phone:         "000000000000",       // TODO: ambil dari profil user setelah login
      service_id:    serviceId,
      weight:        payload.estimatedWeight,
      order_type:    "dropoff",            // TODO: sesuaikan dengan pilihan pickup method ('pickup' | 'dropoff')
      total_price:   payload.totalPrice,
    })
    .select()
    .single();

  if (error) {
    console.error("Booking error:", error.message, error.details, error.hint);
    return { success: false, error: `Gagal membuat pesanan: ${error.message}` };
  }

  revalidatePath("/layanan/booking");
  return { success: true, orderId: data.id };
}
