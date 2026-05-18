"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { useAuthStore } from "@/store/useAuthStore"
import { useOrders } from "@/hooks/useOrder"
import DashboardShell from "@/components/layout/DashboardShell"
import { DashboardHome } from "@/components/dashboard/DashboardHome"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading: authLoading, init } = useAuthStore()
  const { orders, loading: ordersLoading } = useOrders()

  useEffect(() => {
    const unsub = init()
    return unsub
  }, [init])

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login")
  }, [authLoading, user, router])

  const displayName =
    (user?.user_metadata?.full_name as string) ?? user?.email?.split("@")[0] ?? "User"
  const firstName = displayName.split(" ")[0]
  const today = format(new Date(), "EEEE, d MMMM yyyy", { locale: localeId })

  if (authLoading || !user) {
    return (
      <DashboardShell title="Dashboard" subtitle={today}>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
            <p className="text-sm text-slate-500">Memuat dashboard…</p>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell title="Dashboard" subtitle={today} userName={displayName}>
      <DashboardHome firstName={firstName} orders={orders} loading={ordersLoading} />
    </DashboardShell>
  )
}
