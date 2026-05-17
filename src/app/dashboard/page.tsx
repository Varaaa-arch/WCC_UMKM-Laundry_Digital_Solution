"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  ShoppingBag, History, Package, Clock,
  CheckCircle2, Truck, ChevronRight, Plus, ArrowRight
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BubbleButton } from "@/components/ui/bubble-button"
import { useAuthStore } from "@/store/useAuthStore"
import { useOrders } from "@/hooks/useOrder"
import { useEffect } from "react"
import Link from "next/link"

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
})

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending:      { label: "Menunggu",       color: "bg-gray-100 text-gray-600" },
  picked_up:    { label: "Dijemput",       color: "bg-blue-100 text-blue-700" },
  washing:      { label: "Sedang Dicuci",  color: "bg-amber-100 text-amber-700" },
  finished:     { label: "Selesai Dicuci", color: "bg-teal-100 text-teal-700" },
  ready_pickup: { label: "Siap Diambil",   color: "bg-purple-100 text-purple-700" },
  delivered:    { label: "Terkirim",       color: "bg-green-100 text-green-700" },
}

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

  if (authLoading || !user) return null

  const displayName = (user.user_metadata?.full_name as string) ?? user.email?.split("@")[0] ?? "User"
  const initials = displayName.slice(0, 2).toUpperCase()

  const activeOrders = orders.filter((o) => !["delivered", "finished"].includes(o.status))
  const doneOrders   = orders.filter((o) => ["delivered", "finished"].includes(o.status))
  const recentOrders = orders.slice(0, 5)

  const STATS = [
    { label: "Order Aktif",        value: activeOrders.length, icon: Package,      color: "bg-blue-50 text-blue-600" },
    { label: "Sedang Diproses",    value: orders.filter(o => o.status === "washing").length, icon: Clock, color: "bg-amber-50 text-amber-600" },
    { label: "Selesai",            value: doneOrders.length,   icon: CheckCircle2, color: "bg-green-50 text-green-600" },
    { label: "Dalam Pengiriman",   value: orders.filter(o => o.status === "picked_up").length, icon: Truck, color: "bg-purple-50 text-purple-600" },
  ]

  return (
    <div className="min-h-screen bg-[#EEF4FB]">
      <main className="max-w-5xl mx-auto px-4 pt-28 pb-12 space-y-6">

        {/* Welcome banner */}
        <motion.div variants={stagger(0)} initial="hidden" animate="visible"
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 shrink-0">
              <AvatarFallback className="bg-white/20 text-white font-bold text-base">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-blue-100 text-sm">Selamat datang kembali 👋</p>
              <h2 className="text-xl font-bold">{displayName}</h2>
              <p className="text-blue-100 text-xs mt-0.5">
                {activeOrders.length > 0 ? `${activeOrders.length} order sedang aktif` : "Belum ada order aktif"}
              </p>
            </div>
          </div>
          <Link href="/layanan"
            className="flex items-center gap-1.5 bg-white text-blue-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Pesan
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value, icon: Icon, color }, i) => (
            <motion.div key={label} variants={stagger(i + 1)} initial="hidden" animate="visible"
              className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{ordersLoading ? "—" : value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick actions */}
        <motion.div variants={stagger(5)} initial="hidden" animate="visible"
          className="grid grid-cols-2 gap-4"
        >
          <Link href="/layanan"
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">Pesan Laundry</p>
              <p className="text-xs text-gray-400 mt-0.5">Mulai order baru</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors shrink-0" />
          </Link>
          <Link href="/history"
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
              <History className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">Riwayat</p>
              <p className="text-xs text-gray-400 mt-0.5">Lihat semua order</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors shrink-0" />
          </Link>
        </motion.div>

        {/* Recent orders */}
        <motion.div variants={stagger(6)} initial="hidden" animate="visible"
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">Order Terbaru</h3>
            <Link href="/history" className="flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {ordersLoading ? (
            <div className="px-5 py-8 text-center text-sm text-gray-400">Memuat...</div>
          ) : recentOrders.length === 0 ? (
            <div className="px-5 py-10 text-center">
              <Package className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-400">Belum ada order</p>
              <Link href="/layanan" className="mt-3 inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium hover:underline">
                Buat order pertama <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentOrders.map((order) => {
                const s = STATUS_MAP[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-600" }
                return (
                  <div key={order.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Package className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{order.services?.name ?? "Layanan"}</p>
                        <p className="text-xs text-gray-400">
                          {order.weight ? `${order.weight} kg · ` : ""}
                          {new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <Badge className={`text-[11px] font-medium border-0 ${s.color}`}>{s.label}</Badge>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>

      </main>
    </div>
  )
}
