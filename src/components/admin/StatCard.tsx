"use client"

import { motion } from "framer-motion"
import CountUp from "react-countup"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { TrendingDown, TrendingUp } from "lucide-react"

type StatCardProps = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change?: number
  icon: LucideIcon
  gradient: string
  iconBg: string
  loading?: boolean
  index?: number
  formatValue?: (n: number) => string
}

const cardMotion = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  change,
  icon: Icon,
  gradient,
  iconBg,
  loading,
  index = 0,
  formatValue,
}: StatCardProps) {
  const display = formatValue
    ? formatValue(value)
    : `${prefix}${value.toLocaleString("id-ID")}${suffix}`
  const positive = (change ?? 0) >= 0

  return (
    <motion.article
      custom={index}
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-5",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        "transition-shadow duration-300 hover:shadow-[0_4px_24px_-6px_rgba(37,99,235,0.15)]"
      )}
    >
      <motion.span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 block size-32 rounded-full opacity-40 blur-2xl",
          gradient
        )}
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium tracking-wide text-slate-500">{title}</p>
          {loading ? (
            <div className="mt-2 h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {formatValue ? (
                display
              ) : (
                <>
                  {prefix}
                  <CountUp end={value} duration={1.2} separator="." decimals={0} />
                  {suffix}
                </>
              )}
            </p>
          )}
          {change !== undefined && !loading && (
            <span
              className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                positive
                  ? "bg-emerald-500/10 text-emerald-700"
                  : "bg-rose-500/10 text-rose-700"
              )}
            >
              {positive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
              {positive ? "+" : ""}
              {change}% vs bulan lalu
            </span>
          )}
        </div>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl shadow-lg shadow-blue-500/20",
            iconBg
          )}
        >
          <Icon className="size-5 text-white" />
        </span>
      </div>
    </motion.article>
  )
}
