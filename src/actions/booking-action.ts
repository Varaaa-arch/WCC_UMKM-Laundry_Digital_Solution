"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type BookingPayload = {
  serviceId: string;
  estimatedWeight: number;
  totalPrice: number;
  paymentMethod: string;
  pickupMethod: "ambil-sendiri" | "antar-jemput";
  address?: string;
  note?: string;
  pickupTime?: string;
};

export type BookingResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function confirmBooking(payload: BookingPayload): Promise<BookingResult> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "Sesi login tidak ditemukan. Silakan login ulang." };
  }

  // Ensure profile row exists (handles users created before trigger was set up)
  const { data: profile } = await supabase
    .from("profiles")
    .select("name, phone")
    .eq("id", user.id)
    .single();

  if (!profile) {
    await supabase.from("profiles").upsert({
      id: user.id,
      name: user.user_metadata?.full_name ?? user.email ?? "User",
      email: user.email ?? "",
      phone: "",
    }, { onConflict: "id" });
  }

  // Generate unique order number to avoid race condition on DB trigger
  const year = new Date().getFullYear();
  const unique = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 5)}`.toUpperCase().slice(0, 6);
  const orderNumber = `LND-${year}-${unique}`;

  const { data, error } = await supabase
    .from("orders")
    .insert({
      user_id:       user.id,
      order_number:  orderNumber,
      customer_name: profile?.name ?? user.user_metadata?.full_name ?? user.email ?? "User",
      phone:         profile?.phone ?? "",
      service_id:    payload.serviceId,
      weight:        payload.estimatedWeight,
      order_type:    payload.pickupMethod === "antar-jemput" ? "pickup" : "dropoff",
      total_price:   payload.totalPrice,
      address:       payload.address ?? null,
      note:          payload.note ?? null,
      pickup_time:   payload.pickupTime ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Booking error:", error.message);
    return { success: false, error: `Gagal membuat pesanan: ${error.message}` };
  }

  revalidatePath("/layanan/booking");
  revalidatePath("/dashboard");
  return { success: true, orderId: data.id };
}
