"use client"

import { BarChart3, ShoppingBag, Wallet, Percent, Receipt } from "lucide-react"
import { AdminShell } from "@/components/admin/AdminShell"
import { AdminPageBanner } from "@/components/admin/AdminPageBanner"
import { AdminLoadingScreen } from "@/components/admin/AdminLoadingScreen"
import { StatCard } from "@/components/admin/StatCard"
import { RevenueChart } from "@/components/admin/RevenueChart"
import { ActivityFeed } from "@/components/admin/ActivityFeed"
import { StatusBreakdownChart } from "@/components/admin/StatusBreakdownChart"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { useAdminAnalytics } from "@/hooks/useAdminPages"
import { formatCurrency } from "@/lib/admin/constants"

export default function AdminAnalyticsClient() {
  const { loading: authLoading, profileName } = useAdminAuth()
  const { data, isLoading } = useAdminAnalytics()

  if (authLoading) return <AdminLoadingScreen message="Memuat analytics…" />

  const stats = data?.stats

  return (
    <AdminShell
      title="Analytics"
      subtitle="Laporan performa bisnis"
      userName={profileName}
    >
      <div className="space-y-6 p-4 sm:p-6">
        <AdminPageBanner
          label="Analytics"
          title="Laporan & Insight"
          description="Analisis revenue, tren pesanan, distribusi status, dan aktivitas sistem."
          icon={BarChart3}
        />

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
            title="Rata-rata Order"
            value={data?.avgOrderValue ?? 0}
            icon={Receipt}
            gradient="bg-violet-500"
            iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
            loading={isLoading}
            index={2}
            formatValue={formatCurrency}
          />
          <StatCard
            title="Tingkat Dibayar"
            value={data?.paidRate ?? 0}
            icon={Percent}
            gradient="bg-amber-500"
            iconBg="bg-gradient-to-br from-amber-500 to-orange-500"
            loading={isLoading}
            index={3}
            suffix="%"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="min-w-0 xl:col-span-2">
            <RevenueChart data={data?.chart ?? []} loading={isLoading} />
          </div>
          <ActivityFeed items={data?.activity ?? []} loading={isLoading} />
        </div>

        <StatusBreakdownChart
          data={data?.statusBreakdown ?? []}
          loading={isLoading}
        />
      </div>
    </AdminShell>
  )
}
