import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin/auth"

export async function GET(request: NextRequest) {
  const ctx = await requireAdmin()
  if (!ctx.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: ctx.status })
  }

  const q = request.nextUrl.searchParams.get("q")?.trim() ?? ""
  const limit = Math.min(Number(request.nextUrl.searchParams.get("limit") ?? 50), 100)

  let query = ctx.supabase
    .from("profiles")
    .select("id, name, email, phone, is_admin, created_at")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (q) {
    query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`)
  }

  const { data: profiles, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const ids = profiles?.map((p) => p.id) ?? []
  const orderCounts = new Map<string, number>()

  if (ids.length > 0) {
    const { data: orders } = await ctx.supabase
      .from("orders")
      .select("user_id")
      .in("user_id", ids)

    orders?.forEach((o) => {
      orderCounts.set(o.user_id, (orderCounts.get(o.user_id) ?? 0) + 1)
    })
  }

  const customers =
    profiles?.map((p) => ({
      ...p,
      order_count: orderCounts.get(p.id) ?? 0,
    })) ?? []

  return NextResponse.json({ customers })
}
