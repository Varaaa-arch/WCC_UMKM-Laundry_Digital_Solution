import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin/auth"

export async function GET() {
  const ctx = await requireAdmin()
  if (!ctx.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: ctx.status })
  }

  const { data, error } = await ctx.supabase
    .from("services")
    .select("id, name, price_per_kg, description, duration, slug")
    .order("name", { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ services: data ?? [] })
}

export async function PATCH(request: NextRequest) {
  const ctx = await requireAdmin()
  if (!ctx.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: ctx.status })
  }

  const body = await request.json()
  const { id, name, price_per_kg, description, duration } = body as {
    id?: string
    name?: string
    price_per_kg?: number
    description?: string
    duration?: string
  }

  if (!id) {
    return NextResponse.json({ error: "ID layanan wajib diisi" }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}
  if (name !== undefined) updates.name = name
  if (price_per_kg !== undefined) updates.price_per_kg = price_per_kg
  if (description !== undefined) updates.description = description
  if (duration !== undefined) updates.duration = duration

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "Tidak ada data untuk diperbarui" }, { status: 400 })
  }

  const { data, error } = await ctx.supabase
    .from("services")
    .update(updates)
    .eq("id", id)
    .select("id, name, price_per_kg, description, duration, slug")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ service: data })
}
