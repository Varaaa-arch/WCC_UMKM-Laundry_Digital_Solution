"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Menu, Package, CheckCircle2, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { ShellUiStore } from "@/components/shell/types"

// ─── dummy notifications ──────────────────────────────────────────────────────
const NOTIFS = [
  { id: 1, icon: Package, color: "bg-blue-100 text-blue-600", title: "Pesanan sedang diproses", desc: "Pesanan #LB-001 sedang dalam pengerjaan.", time: "2 menit lalu", read: false },
  { id: 2, icon: CheckCircle2, color: "bg-green-100 text-green-600", title: "Pesanan selesai!", desc: "Pesanan #LB-002 siap diambil atau diantar.", time: "1 jam lalu", read: false },
  { id: 3, icon: Clock, color: "bg-amber-100 text-amber-600", title: "Pengambilan dijadwalkan", desc: "Kurir akan tiba pukul 14.00–15.00 WIB.", time: "3 jam lalu", read: true },
]

function NotificationPopup({ onClose }: { onClose: () => void }) {
  const [notifs, setNotifs] = useState(NOTIFS)
  const unread = notifs.filter((n) => !n.read).length

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.96 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white border border-slate-100 shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm">Notifikasi</span>
          {unread > 0 && (
            <span className="rounded-full bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 leading-none">
              {unread}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unread > 0 && (
            <button onClick={markAllRead} className="text-xs text-blue-500 hover:text-blue-700 font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors">
              Tandai semua
            </button>
          )}
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="size-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
        {notifs.map((n) => {
          const Icon = n.icon
          return (
            <div
              key={n.id}
              className={`flex gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${!n.read ? "bg-blue-50/40" : ""}`}
              onClick={() => setNotifs((prev) => prev.map((x) => x.id === n.id ? { ...x, read: true } : x))}
            >
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-full ${n.color}`}>
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${n.read ? "text-slate-600" : "text-slate-900 font-semibold"}`}>{n.title}</p>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug">{n.desc}</p>
                <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
              </div>
              {!n.read && <span className="mt-1.5 size-2 rounded-full bg-blue-500 shrink-0" />}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-slate-100 text-center">
        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors">
          Lihat semua notifikasi
        </button>
      </div>
    </motion.div>
  )
}

// ─── AppHeader ────────────────────────────────────────────────────────────────
type AppHeaderProps = {
  title: string
  subtitle?: string
  userName?: string
  useUiStore: () => ShellUiStore
}

export function AppHeader({ title, subtitle, userName = "User", useUiStore }: AppHeaderProps) {
  const { setMobileOpen } = useUiStore()
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)

  const initials = userName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()

  // Close on outside click
  useEffect(() => {
    if (!notifOpen) return
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [notifOpen])

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100/80 bg-white/70 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="size-5" />
          </Button>
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h1>
            {subtitle && <p className="truncate text-xs text-slate-500 sm:text-sm">{subtitle}</p>}
          </motion.div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Bell with popup */}
          <div ref={notifRef} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-slate-500 hover:bg-slate-100"
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Notifikasi"
            >
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-blue-500" />
            </Button>
            <AnimatePresence>
              {notifOpen && <NotificationPopup onClose={() => setNotifOpen(false)} />}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white/80 py-1 pl-1 pr-2.5 shadow-sm">
            <Avatar className="size-8">
              <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">{userName}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
