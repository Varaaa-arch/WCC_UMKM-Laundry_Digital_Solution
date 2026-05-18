"use client"

import { motion } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { Activity, Package, UserPlus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { ActivityItem } from "@/lib/admin/types"
import { cn } from "@/lib/utils"

const icons = {
  order: Package,
  status: Activity,
  user: UserPlus,
}

const iconStyles = {
  order: "bg-blue-500/10 text-blue-600",
  status: "bg-violet-500/10 text-violet-600",
  user: "bg-emerald-500/10 text-emerald-600",
}

export function ActivityFeed({
  items,
  loading,
}: {
  items: ActivityItem[]
  loading?: boolean
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45 }}
      className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl"
    >
      <header className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Aktivitas Terbaru</h3>
        <p className="text-xs text-slate-500">Update real-time dari sistem</p>
      </header>

      {loading ? (
        <ul className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="flex gap-3">
              <Skeleton className="size-9 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2 w-1/2" />
              </div>
            </li>
          ))}
        </ul>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-10 text-center">
          <Activity className="mb-2 size-8 text-slate-300" />
          <p className="text-sm font-medium text-slate-600">Belum ada aktivitas</p>
        </div>
      ) : (
        <ul className="space-y-1">
          {items.map((item, i) => {
            const Icon = icons[item.type] ?? Activity
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-50/80"
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-xl",
                    iconStyles[item.type]
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="truncate text-xs text-slate-500">{item.description}</p>
                </div>
                <time className="shrink-0 text-[10px] text-slate-400">
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                    locale: localeId,
                  })}
                </time>
              </motion.li>
            )
          })}
        </ul>
      )}
    </motion.section>
  )
}
