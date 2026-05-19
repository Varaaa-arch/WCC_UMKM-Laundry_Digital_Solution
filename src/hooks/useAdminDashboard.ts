"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { AdminOrder, AdminStats, ActivityItem, ChartPoint } from "@/lib/admin/types"

async function fetchStats() {
  const res = await fetch("/api/admin/stats")
  if (!res.ok) throw new Error("Gagal memuat statistik")
  return res.json() as Promise<{
    stats: AdminStats
    chart: ChartPoint[]
    activity: ActivityItem[]
  }>
}

async function fetchOrders(params: { q: string; status: string; limit: number }) {
  const sp = new URLSearchParams()
  if (params.q) sp.set("q", params.q)
  if (params.status !== "all") sp.set("status", params.status)
  sp.set("limit", String(params.limit))

  const res = await fetch(`/api/admin/orders?${sp}`)
  if (!res.ok) throw new Error("Gagal memuat pesanan")
  return res.json() as Promise<{ orders: AdminOrder[] }>
}

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin", "stats"],
    queryFn: fetchStats,
  })
}

export function useAdminOrders(q: string, status: string, limit = 15) {
  return useQuery({
    queryKey: ["admin", "orders", q, status, limit],
    queryFn: () => fetchOrders({ q, status, limit }),
  })
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Gagal memperbarui status")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin"] })
    },
  })
}
