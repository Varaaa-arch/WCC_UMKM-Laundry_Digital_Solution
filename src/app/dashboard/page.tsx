"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  LayoutDashboard, ShoppingBag, History, Settings,
  LogOut, Bell, ChevronRight, Package, Clock, CheckCircle2, Truck
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: ShoppingBag, label: "Pesan Laundry", href: "/layanan" },
  { icon: History, label: "Riwayat", href: "/history" },
  { icon: Settings, label: "Pengaturan", href: "/settings" },
]

const STATS = [
  { label: "Order Aktif", value: "2", icon: Package, color: "bg-blue-50 text-blue-600" },
  { label: "Sedang Diproses", value: "1", icon: Clock, color: "bg-amber-50 text-amber-600" },
  { label: "Selesai Bulan Ini", value: "8", icon: CheckCircle2, color: "bg-green-50 text-green-600" },
  { label: "Dalam Pengiriman", value: "1", icon: Truck, color: "bg-purple-50 text-purple-600" },
]

const RECENT_ORDERS = [
  { id: "ORD-001", service: "Cuci Setrika", weight: "3 kg", status: "Dalam Pengiriman", date: "12 Mei 2026", statusColor: "bg-purple-100 text-purple-700" },
  { id: "ORD-002", service: "Cuci Kering", weight: "2 kg", status: "Sedang Diproses", date: "11 Mei 2026", statusColor: "bg-amber-100 text-amber-700" },
  { id: "ORD-003", service: "Express", weight: "1.5 kg", status: "Selesai", date: "9 Mei 2026", statusColor: "bg-green-100 text-green-700" },
  { id: "ORD-004", service: "Cuci Setrika", weight: "4 kg", status: "Selesai", date: "5 Mei 2026", statusColor: "bg-green-100 text-green-700" },
]

const item = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } }
})

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="hidden md:flex w-60 bg-white border-r border-gray-100 flex-col fixed h-full z-20">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-gray-100">
          <span className="text-lg font-bold text-blue-600">ResikLaundry</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href, active }) => (
            <Link key={label} href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-gray-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4 shrink-0" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-60 flex flex-col">

        {/* Topbar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-base font-semibold text-gray-900">Dashboard</h1>
            <p className="text-xs text-gray-400">Selasa, 12 Mei 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-semibold">JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-6 space-y-6">

          {/* Welcome */}
          <motion.div variants={item(0)} initial="hidden" animate="visible"
            className="rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 p-6 text-white flex items-center justify-between"
          >
            <div>
              <p className="text-blue-100 text-sm">Selamat datang kembali 👋</p>
              <h2 className="text-xl font-bold mt-0.5">John Doe</h2>
              <p className="text-blue-100 text-xs mt-1">Kamu punya 2 order aktif saat ini</p>
            </div>
            <Link href="/layanan"
              className="flex items-center gap-1.5 bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors shrink-0"
            >
              Pesan Sekarang <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ label, value, icon: Icon, color }, i) => (
              <motion.div key={label} variants={item(i + 1)} initial="hidden" animate="visible"
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders */}
          <motion.div variants={item(5)} initial="hidden" animate="visible"
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 text-sm">Order Terbaru</h3>
              <Link href="/history" className="text-xs text-blue-600 font-medium hover:underline">
                Lihat semua
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {RECENT_ORDERS.map((order) => (
                <div key={order.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.service}</p>
                      <p className="text-xs text-gray-400">{order.id} · {order.weight} · {order.date}</p>
                    </div>
                  </div>
                  <Badge className={`text-[11px] font-medium border-0 ${order.statusColor}`}>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </motion.div>

        </main>
      </div>
    </div>
  )
}
