import { NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin/auth"
import { format, subDays, startOfDay } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { ORDER_STATUSES, STATUS_LABELS, type OrderStatus } from "@/lib/admin/constants"
import type { ActivityItem, ChartPoint, StatusBreakdown } from "@/lib/admin/types"

export async function GET() {
  const ctx = await requireAdmin()
  if (!ctx.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: ctx.status })
  }

  const { supabase } = ctx
  const now = new Date()
  const thirtyDaysAgo = subDays(now, 30).toISOString()
  const sixtyDaysAgo = subDays(now, 60).toISOString()

  const [
    { count: totalOrders },
    { data: revenueRows },
    { count: pendingOrders },
    { data: recentOrders },
    { data: prevRevenueRows },
    { count: prevOrders },
    { data: chartOrders },
    { data: trackingLogs },
    { count: newUsers },
    { data: allOrdersForBreakdown },
    { count: paidCount },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("total_price")
      .in("status", ["finished", "ready_pickup", "delivered"]),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("orders").select("user_id").gte("created_at", thirtyDaysAgo),
    supabase
      .from("orders")
      .select("total_price")
      .in("status", ["finished", "ready_pickup", "delivered"])
      .gte("created_at", sixtyDaysAgo)
      .lt("created_at", thirtyDaysAgo),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .gte("created_at", sixtyDaysAgo)
      .lt("created_at", thirtyDaysAgo),
    supabase
      .from("orders")
      .select("created_at, total_price")
      .gte("created_at", subDays(now, 14).toISOString())
      .order("created_at", { ascending: true }),
    supabase
      .from("tracking_logs")
      .select("id, order_id, status, description, created_at")
      .order("created_at", { ascending: false })
      .limit(12),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thirtyDaysAgo),
    supabase.from("orders").select("status, total_price, is_paid"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("is_paid", true),
  ])

  const revenue =
    revenueRows?.reduce((sum, r) => sum + Number(r.total_price ?? 0), 0) ?? 0
  const prevRevenue =
    prevRevenueRows?.reduce((sum, r) => sum + Number(r.total_price ?? 0), 0) ?? 0
  const uniqueUsers = new Set(recentOrders?.map((o) => o.user_id) ?? []).size

  const revenueChange =
    prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0
  const ordersChange =
    (prevOrders ?? 0) > 0
      ? (((totalOrders ?? 0) - (prevOrders ?? 0)) / (prevOrders ?? 1)) * 100
      : 0

  const chartMap = new Map<string, ChartPoint>()
  for (let i = 13; i >= 0; i--) {
    const d = startOfDay(subDays(now, i))
    const key = format(d, "yyyy-MM-dd")
    chartMap.set(key, {
      date: key,
      label: format(d, "d MMM", { locale: localeId }),
      revenue: 0,
      orders: 0,
    })
  }

  chartOrders?.forEach((o) => {
    const key = format(startOfDay(new Date(o.created_at)), "yyyy-MM-dd")
    const point = chartMap.get(key)
    if (point) {
      point.orders += 1
      point.revenue += Number(o.total_price ?? 0)
    }
  })

  const statusCounts = new Map<string, number>()
  ORDER_STATUSES.forEach((s) => statusCounts.set(s, 0))
  allOrdersForBreakdown?.forEach((o) => {
    statusCounts.set(o.status, (statusCounts.get(o.status) ?? 0) + 1)
  })

  const statusBreakdown: StatusBreakdown[] = ORDER_STATUSES.map((status) => ({
    status,
    label: STATUS_LABELS[status as OrderStatus],
    count: statusCounts.get(status) ?? 0,
  }))

  const total = totalOrders ?? 0
  const paidRate = total > 0 ? Math.round(((paidCount ?? 0) / total) * 100) : 0
  const totalValue =
    allOrdersForBreakdown?.reduce((s, o) => s + Number(o.total_price ?? 0), 0) ?? 0
  const avgOrderValue = total > 0 ? Math.round(totalValue / total) : 0

  const activity: ActivityItem[] =
    trackingLogs?.map((log) => ({
      id: log.id,
      type: "status" as const,
      title: "Status diperbarui",
      description: log.description ?? `Status: ${log.status}`,
      created_at: log.created_at,
    })) ?? []

  if (newUsers && newUsers > 0) {
    activity.unshift({
      id: "new-users",
      type: "user" as const,
      title: "Pengguna baru",
      description: `${newUsers} pengguna terdaftar bulan ini`,
      created_at: now.toISOString(),
    })
  }

  return NextResponse.json({
    stats: {
      totalOrders: total,
      revenue,
      activeUsers: uniqueUsers,
      pendingOrders: pendingOrders ?? 0,
      revenueChange: Math.round(revenueChange * 10) / 10,
      ordersChange: Math.round(ordersChange * 10) / 10,
    },
    chart: Array.from(chartMap.values()),
    activity: activity.slice(0, 12),
    statusBreakdown,
    paidRate,
    avgOrderValue,
  })
}
