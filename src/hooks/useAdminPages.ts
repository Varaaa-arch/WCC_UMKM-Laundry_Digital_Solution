"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type {
  AdminAnalyticsData,
  AdminCustomer,
  AdminService,
} from "@/lib/admin/types"

async function fetchCustomers(q: string) {
  const sp = new URLSearchParams()
  if (q) sp.set("q", q)
  sp.set("limit", "100")
  const res = await fetch(`/api/admin/customers?${sp}`)
  if (!res.ok) throw new Error("Gagal memuat pelanggan")
  return res.json() as Promise<{ customers: AdminCustomer[] }>
}

async function fetchAnalytics() {
  const res = await fetch("/api/admin/analytics")
  if (!res.ok) throw new Error("Gagal memuat analytics")
  return res.json() as Promise<AdminAnalyticsData>
}

async function fetchServices() {
  const res = await fetch("/api/admin/settings/services")
  if (!res.ok) throw new Error("Gagal memuat layanan")
  return res.json() as Promise<{ services: AdminService[] }>
}

export function useAdminCustomers(q: string) {
  return useQuery({
    queryKey: ["admin", "customers", q],
    queryFn: () => fetchCustomers(q),
  })
}

export function useAdminAnalytics() {
  return useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: fetchAnalytics,
  })
}

export function useAdminServices() {
  return useQuery({
    queryKey: ["admin", "services"],
    queryFn: fetchServices,
  })
}

export function useUpdateService() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload: {
      id: string
      name?: string
      price_per_kg?: number
      description?: string
      duration?: string
    }) => {
      const res = await fetch("/api/admin/settings/services", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Gagal menyimpan layanan")
      return res.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "services"] })
    },
  })
}
