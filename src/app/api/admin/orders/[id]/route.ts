import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin/auth"
import { ORDER_STATUSES } from "@/lib/admin/constants"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ctx = await requireAdmin()
  if (!ctx.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: ctx.status })
  }

  const { id } = await params
  const body = await request.json()
  const status = body?.status as string | undefined

  if (!status || !ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const { data, error } = await ctx.supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select("id, status, order_number")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  await ctx.supabase.from("tracking_logs").insert({
    order_id: id,
    status,
    description: `Status order diperbarui ke ${status}`,
  })

  return NextResponse.json({ order: data })
}
