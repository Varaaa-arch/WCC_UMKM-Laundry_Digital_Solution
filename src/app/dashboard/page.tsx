"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag, Star, Wallet, CheckCircle2, ArrowRight, Sparkles } from "lucide-react"
import { useAuthStore } from "@/store/useAuthStore"
import { useOrders } from "@/hooks/useOrder"
import DashboardShell from "@/components/layout/DashboardShell"

const stagger = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
})

const TRACK_STEPS = [
  { key: "picked_up",    label: "Dijemput" },
  { key: "washing",      label: "Dicuci" },
  { key: "finished",     label: "Dikeringkan" },
  { key: "ready_pickup", label: "Siap Diambil" },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return "Selamat pagi"
  if (h < 17) return "Selamat siang"
  return "Selamat malam"
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
  const firstName = displayName.split(" ")[0]

  const activeOrders = orders.filter((o) => !["delivered", "finished"].includes(o.status))
  const doneOrders   = orders.filter((o) => ["delivered", "finished"].includes(o.status))
  const totalSpent   = doneOrders.reduce((sum, o) => sum + (o.total_price ?? 0), 0)
  const loyaltyPts   = doneOrders.length * 50

  // Latest active order for tracking
  const trackOrder = activeOrders[0] ?? null
  const trackStepIdx = trackOrder
    ? TRACK_STEPS.findIndex((s) => s.key === trackOrder.status)
    : -1

  return (
    <DashboardShell>
      <div className="px-6 py-6 space-y-5">

          {/* Greeting */}
          <motion.div variants={stagger(0)} initial="hidden" animate="visible">
            <h1 className="text-2xl font-bold text-gray-900">
              {getGreeting()}, {firstName}! 👋
            </h1>
            <p className="text-gray-400 text-sm mt-0.5">
              Yuk, pantau laundry kamu hari ini.
            </p>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Active Orders */}
            <motion.div variants={stagger(1)} initial="hidden" animate="visible"
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start justify-between"
            >
              <div>
                <p className="text-xs text-gray-400 font-medium">Order Aktif</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {ordersLoading ? "—" : activeOrders.length}
                </p>
                <Link href="/history"
                  className="flex items-center gap-1 text-xs text-blue-600 font-medium mt-2 hover:underline"
                >
                  <ArrowRight className="w-3 h-3" /> Lihat Detail
                </Link>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Loyalty Points */}
            <motion.div variants={stagger(2)} initial="hidden" animate="visible"
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start justify-between"
            >
              <div>
                <p className="text-xs text-gray-400 font-medium">Poin Loyalitas</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {ordersLoading ? "—" : loyaltyPts}
                </p>
                <p className="text-xs text-green-500 font-medium mt-2">
                  50 poin lagi buat reward berikutnya
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
            </motion.div>

            {/* Total Spent */}
            <motion.div variants={stagger(3)} initial="hidden" animate="visible"
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start justify-between"
            >
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Pengeluaran (Bulan Ini)</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {ordersLoading ? "—" : `Rp ${totalSpent.toLocaleString("id-ID")}`}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          </div>

          {/* Track Your Laundry */}
          <motion.div variants={stagger(4)} initial="hidden" animate="visible"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Lacak Laundry Kamu</h3>
                {trackOrder ? (
                  <p className="text-xs text-gray-400 mt-0.5">
                    Order #{trackOrder.id.slice(0, 8).toUpperCase()} &bull; Estimasi selesai hari ini, 17.00
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 mt-0.5">Belum ada order aktif</p>
                )}
              </div>
              {trackOrder && (
                <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                  In Progress
                </span>
              )}
            </div>

            {/* Progress bar */}
            <div className="relative flex items-center justify-between mt-2">
              {/* connector line */}
              <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0" />
              <div
                className="absolute left-0 top-4 h-0.5 bg-blue-500 z-0 transition-all duration-700"
                style={{
                  width: trackStepIdx < 0
                    ? "0%"
                    : `${(trackStepIdx / (TRACK_STEPS.length - 1)) * 100}%`,
                }}
              />

              {TRACK_STEPS.map((step, idx) => {
                const done    = trackStepIdx > idx
                const current = trackStepIdx === idx
                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center gap-1.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                      done    ? "bg-blue-500 border-blue-500" :
                      current ? "bg-white border-blue-500" :
                                "bg-white border-gray-200"
                    }`}>
                      {done ? (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      ) : current ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                      )}
                    </div>
                    <span className={`text-[11px] font-medium ${
                      current ? "text-blue-600" : done ? "text-gray-600" : "text-gray-300"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>

            {!trackOrder && (
              <div className="mt-4 text-center">
                <Link href="/dashboard/pesan"
                  className="text-sm text-blue-600 font-medium hover:underline"
                >
                  Buat order sekarang →
                </Link>
              </div>
            )}
          </motion.div>

          {/* Special Offer Banner */}
          <motion.div variants={stagger(5)} initial="hidden" animate="visible"
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 p-5 flex items-center justify-between gap-4"
          >
            <div>
              <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                Penawaran Spesial
              </span>
              <h3 className="text-white font-bold text-lg mt-2 leading-snug">
                Coba Premium Wash &amp; Fold
              </h3>
              <p className="text-blue-100 text-xs mt-1 max-w-xs leading-relaxed">
                Pakaian kesayangan kamu bakal dirawat pakai deterjen premium ramah lingkungan.
                Diskon 20% buat order premium pertama kamu!
              </p>
            </div>
            <Link href="/layanan"
              className="shrink-0 bg-white text-blue-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ambil Promo
            </Link>
          </motion.div>

      </div>
    </DashboardShell>
  )
}
