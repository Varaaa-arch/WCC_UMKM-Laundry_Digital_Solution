import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin/auth"

export async function GET(request: NextRequest) {
  const ctx = await requireAdmin()
  if (!ctx.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: ctx.status })
  }

  const { searchParams } = request.nextUrl
  const q = searchParams.get("q")?.trim() ?? ""
  const status = searchParams.get("status") ?? "all"
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100)

  let query = ctx.supabase
    .from("orders")
    .select("id, order_number, customer_name, phone, status, total_price, order_type, created_at, services(name)")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (status !== "all") {
    query = query.eq("status", status)
  }

  if (q) {
    query = query.or(
      `order_number.ilike.%${q}%,customer_name.ilike.%${q}%,phone.ilike.%${q}%`
    )
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ orders: data ?? [] })
}
