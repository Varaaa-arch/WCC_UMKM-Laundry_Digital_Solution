"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl } from "@/lib/supabase/config";

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
  // TODO: Gunakan createClient() biasa + auth.getUser() setelah sistem login siap
  // Sementara pakai service role untuk bypass RLS selama testing
  const supabase = createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );

  // TODO: Ganti dummy user_id dengan autentikasi asli setelah sistem login siap
  // const { data: { user }, error: authError } = await supabase.auth.getUser();
  // if (authError || !user) {
  //   return { success: false, error: "Sesi login tidak ditemukan. Silakan login ulang." };
  // }
  const DUMMY_USER_ID = "22222222-2222-2222-2222-222222222222"; // dummy untuk testing (Budi Santoso dari seed)

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
      customer_name: "Budi Santoso",      // TODO: ambil dari profil user setelah login
      phone:         "081200000002",        // TODO: ambil dari profil user setelah login
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
