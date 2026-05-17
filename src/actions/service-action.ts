"use server";

import { createClient } from "@/lib/supabase/server";
import type { Service } from "@/types/service";

function toSlug(name: string) {
  return name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("id, name, description, price_per_kg")
    .order("price_per_kg", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map((s) => ({ ...s, slug: toSlug(s.name), image_url: null }));
}
