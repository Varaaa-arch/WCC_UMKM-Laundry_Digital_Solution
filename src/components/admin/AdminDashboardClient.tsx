"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useQueryClient } from "@tanstack/react-query"
import {
  ShoppingBag,
  Wallet,
  Users,
  Clock,
} from "lucide-react"
import { AdminShell } from "@/components/admin/AdminShell"
import { StatCard } from "@/components/admin/StatCard"
import { RevenueChart } from "@/components/admin/RevenueChart"
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable"
import { ActivityFeed } from "@/components/admin/ActivityFeed"
import { QuickActions } from "@/components/admin/QuickActions"
import { useAdminStats } from "@/hooks/useAdminDashboard"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { formatCurrency } from "@/lib/admin/constants"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Selamat pagi"
  if (h < 17) return "Selamat siang"
  return "Selamat malam"
}

export default function AdminDashboardClient() {
  const { loading: authLoading, profileName } = useAdminAuth()
  const { data, isLoading, refetch } = useAdminStats()
  const qc = useQueryClient()

  useEffect(() => {
    const handler = () => {
      refetch()
      qc.invalidateQueries({ queryKey: ["admin", "orders"] })
    }
    window.addEventListener("admin-refresh", handler)
    return () => window.removeEventListener("admin-refresh", handler)
  }, [refetch, qc])

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F0F4FA]">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <p className="text-sm text-slate-500">Memuat dashboard admin…</p>
        </div>
      </div>
    )
  }

  const stats = data?.stats
  const today = format(new Date(), "EEEE, d MMMM yyyy", { locale: localeId })

  return (
    <AdminShell
      title="Admin Dashboard"
      subtitle={today}
      userName={profileName}
    >
      <div className="space-y-6 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-blue-950 to-indigo-900 p-5 sm:p-6"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-blue-500/20 blur-3xl"
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-10 left-1/3 size-40 rounded-full bg-indigo-500/20 blur-3xl"
          />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-widest text-blue-300/80">
              {getGreeting()}
            </p>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Halo, {profileName.split(" ")[0]} 👋
            </h2>
            <p className="mt-2 max-w-lg text-sm text-slate-300">
              Pantau performa bisnis laundry Anda secara real-time — pesanan, revenue, dan aktivitas pelanggan.
            </p>
          </div>
        </motion.div>

        <QuickActions />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders ?? 0}
            change={stats?.ordersChange}
            icon={ShoppingBag}
            gradient="bg-blue-500"
            iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
            loading={isLoading}
            index={0}
          />
          <StatCard
            title="Revenue"
            value={stats?.revenue ?? 0}
            change={stats?.revenueChange}
            icon={Wallet}
            gradient="bg-emerald-500"
            iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
            loading={isLoading}
            index={1}
            formatValue={formatCurrency}
          />
          <StatCard
            title="Active Users"
            value={stats?.activeUsers ?? 0}
            icon={Users}
            gradient="bg-violet-500"
            iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
            loading={isLoading}
            index={2}
          />
          <StatCard
            title="Pending Orders"
            value={stats?.pendingOrders ?? 0}
            icon={Clock}
            gradient="bg-amber-500"
            iconBg="bg-gradient-to-br from-amber-500 to-orange-500"
            loading={isLoading}
            index={3}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RevenueChart data={data?.chart ?? []} loading={isLoading} />
          </div>
          <ActivityFeed items={data?.activity ?? []} loading={isLoading} />
        </div>

        <RecentOrdersTable />
      </div>
    </AdminShell>
  )
}
