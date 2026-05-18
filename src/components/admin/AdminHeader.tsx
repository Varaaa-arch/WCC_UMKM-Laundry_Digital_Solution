"use client"

import { motion } from "framer-motion"
import { Bell, Menu, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAdminUiStore } from "@/store/useAdminUiStore"

type AdminHeaderProps = {
  title: string
  subtitle?: string
  userName?: string
}

export function AdminHeader({ title, subtitle, userName = "Admin" }: AdminHeaderProps) {
  const setMobileOpen = useAdminUiStore((s) => s.setMobileOpen)
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100/80 bg-white/70 px-4 py-3 backdrop-blur-xl sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0"
          >
            <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-xs text-slate-500 sm:text-sm">{subtitle}</p>
            )}
          </motion.div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative hidden lg:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Cari di dashboard…"
              className="h-9 w-56 border-slate-200/80 bg-white/80 pl-8"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-500 hover:bg-slate-100"
          >
            <Bell className="size-4" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-blue-500" />
          </Button>
          <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white/80 py-1 pl-1 pr-2.5 shadow-sm">
            <Avatar className="size-8">
              <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-slate-700 sm:block">
              {userName}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
