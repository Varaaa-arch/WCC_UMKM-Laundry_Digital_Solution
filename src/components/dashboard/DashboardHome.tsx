"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  Star,
  Wallet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Package,
  Clock,
} from "lucide-react"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { StatCard } from "@/components/admin/StatCard"
import { OrderStatusBadge } from "@/components/admin/OrderStatusBadge"
import { UserQuickActions } from "@/components/dashboard/UserQuickActions"
import { formatCurrency } from "@/lib/admin/constants"
import type { Order } from "@/hooks/useOrder"
import { cn } from "@/lib/utils"

const TRACK_STEPS = [
  { key: "picked_up", label: "Dijemput" },
  { key: "washing", label: "Dicuci" },
  { key: "finished", label: "Dikeringkan" },
  { key: "ready_pickup", label: "Siap Diambil" },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Selamat pagi"
  if (h < 17) return "Selamat siang"
  return "Selamat malam"
}

type DashboardHomeProps = {
  firstName: string
  orders: Order[]
  loading: boolean
}

export function DashboardHome({ firstName, orders, loading }: DashboardHomeProps) {
  const activeOrders = orders.filter((o) => !["delivered", "finished"].includes(o.status))
  const doneOrders = orders.filter((o) => ["delivered", "finished"].includes(o.status))
  const totalSpent = doneOrders.reduce((sum, o) => sum + (o.total_price ?? 0), 0)
  const loyaltyPts = doneOrders.length * 50
  const trackOrder = activeOrders[0] ?? null
  const trackStepIdx = trackOrder
    ? TRACK_STEPS.findIndex((s) => s.key === trackOrder.status)
    : -1
  const recentOrders = orders.slice(0, 4)
  const today = format(new Date(), "EEEE, d MMMM yyyy", { locale: localeId })

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-blue-950 to-indigo-900 p-5 sm:p-6"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-blue-500/20 blur-3xl"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/3 size-40 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-blue-300/80">
              {getGreeting()}
            </p>
            <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">
              Halo, {firstName}! 👋
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-300">
              Yuk, pantau laundry kamu hari ini.. status order, poin loyalitas, dan promo spesial.
            </p>
          </div>
          <p className="shrink-0 text-xs font-medium text-blue-200/70">{today}</p>
        </div>
      </motion.section>

      <UserQuickActions />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Order Aktif"
          value={activeOrders.length}
          icon={ShoppingBag}
          gradient="bg-blue-500"
          iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
          loading={loading}
          index={0}
          footer={
            <Link
              href="/dashboard/history"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
            >
              Lihat detail <ArrowRight className="size-3" />
            </Link>
          }
        />
        <StatCard
          title="Poin Loyalitas"
          value={loyaltyPts}
          icon={Star}
          gradient="bg-emerald-500"
          iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
          loading={loading}
          index={1}
          footer={
            <span className="text-xs font-medium text-emerald-600">
              50 poin lagi buat reward berikutnya
            </span>
          }
        />
        <StatCard
          title="Total Pengeluaran"
          value={totalSpent}
          icon={Wallet}
          gradient="bg-violet-500"
          iconBg="bg-gradient-to-br from-violet-500 to-purple-600"
          loading={loading}
          index={2}
          formatValue={formatCurrency}
          footer={
            <span className="text-xs text-slate-500">Dari order selesai</span>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Tracking */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
          className={cn(
            "lg:col-span-3 rounded-2xl border border-white/60 bg-white/80 p-5",
            "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl"
          )}
        >
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Lacak Laundry Kamu</h3>
              {trackOrder ? (
                <p className="mt-0.5 text-xs text-slate-500">
                  Order #{trackOrder.id.slice(0, 8).toUpperCase()}
                  {trackOrder.services?.name ? ` · ${trackOrder.services.name}` : ""}
                </p>
              ) : (
                <p className="mt-0.5 text-xs text-slate-500">Belum ada order aktif saat ini</p>
              )}
            </div>
            {trackOrder && <OrderStatusBadge status={trackOrder.status} />}
          </div>

          <div className="relative mt-2 flex items-center justify-between">
            <div className="absolute left-0 right-0 top-4 z-0 h-0.5 bg-slate-200" />
            <div
              className="absolute left-0 top-4 z-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-500 transition-all duration-700"
              style={{
                width:
                  trackStepIdx < 0
                    ? "0%"
                    : `${(trackStepIdx / (TRACK_STEPS.length - 1)) * 100}%`,
              }}
            />

            {TRACK_STEPS.map((step, idx) => {
              const done = trackStepIdx > idx
              const current = trackStepIdx === idx
              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: current ? 1.08 : 1,
                      boxShadow: current
                        ? "0 0 0 4px rgba(37, 99, 235, 0.15)"
                        : "0 0 0 0px rgba(37, 99, 235, 0)",
                    }}
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border-2 transition-colors",
                      done && "border-blue-500 bg-blue-500",
                      current && "border-blue-500 bg-white",
                      !done && !current && "border-slate-200 bg-white"
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="size-4 text-white" />
                    ) : current ? (
                      <span className="size-2.5 animate-pulse rounded-full bg-blue-500" />
                    ) : (
                      <span className="size-2 rounded-full bg-slate-200" />
                    )}
                  </motion.div>
                  <span
                    className={cn(
                      "text-center text-[10px] font-semibold sm:text-[11px]",
                      current && "text-blue-600",
                      done && !current && "text-slate-600",
                      !done && !current && "text-slate-300"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
              )
            })}
          </div>

          {!trackOrder && (
            <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 py-6 text-center">
              <Package className="mx-auto mb-2 size-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-600">Belum ada laundry yang diproses</p>
              <Link
                href="/dashboard/pesan"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
              >
                Buat order sekarang <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}
        </motion.section>

        {/* Recent orders */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.45 }}
          className={cn(
            "lg:col-span-2 rounded-2xl border border-white/60 bg-white/80 p-5",
            "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl"
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Pesanan Terakhir</h3>
              <p className="text-xs text-slate-500">Riwayat singkat order kamu</p>
            </div>
            <Link
              href="/dashboard/history"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Semua
            </Link>
          </div>

          {loading ? (
            <ul className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <li key={i} className="h-14 animate-pulse rounded-xl bg-slate-100" />
              ))}
            </ul>
          ) : recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-8 text-center">
              <Clock className="mb-2 size-7 text-slate-300" />
              <p className="text-sm text-slate-500">Belum ada pesanan</p>
            </div>
          ) : (
            <ul className="space-y-1">
              {recentOrders.map((order, i) => (
                <motion.li
                  key={order.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href="/dashboard/history"
                    className="group flex items-center justify-between gap-2 rounded-xl p-2.5 transition-colors hover:bg-blue-50/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {order.services?.name ?? "Laundry"}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {format(new Date(order.created_at), "d MMM yyyy", { locale: localeId })}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-semibold text-slate-800">
                        {formatCurrency(order.total_price ?? 0)}
                      </p>
                      <OrderStatusBadge status={order.status} className="mt-1 scale-90" />
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.section>
      </div>

      {/* Promo */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        whileHover={{ scale: 1.005 }}
        className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 via-blue-500 to-indigo-500 p-5 sm:p-6"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl"
        />
        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
              Penawaran Spesial
            </span>
            <h3 className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl">
              Coba Premium Wash &amp; Fold
            </h3>
            <p className="mt-1.5 max-w-md text-sm leading-relaxed text-blue-100">
              Pakaian kesayangan kamu dirawat dengan deterjen premium ramah lingkungan.
              Diskon 20% untuk order premium pertamamu!
            </p>
          </div>
          <Link
            href="/layanan"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-50 hover:shadow-xl"
          >
            <Sparkles className="size-4" />
            Ambil Promo
          </Link>
        </div>
      </motion.section>
    </div>
  )
}
