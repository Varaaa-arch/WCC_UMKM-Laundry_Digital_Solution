"use client"

import { motion } from "framer-motion"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import type { ChartPoint } from "@/lib/admin/types"
import { formatCurrency } from "@/lib/admin/constants"

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: { value: number; dataKey: string }[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  const revenue = payload.find((p) => p.dataKey === "revenue")?.value ?? 0
  const orders = payload.find((p) => p.dataKey === "orders")?.value ?? 0

  return (
    <div className="rounded-xl border border-white/80 bg-white/95 px-3 py-2 shadow-xl backdrop-blur-md">
      <p className="text-[11px] font-semibold text-slate-500">{label}</p>
      <p className="text-sm font-bold text-slate-900">{formatCurrency(revenue)}</p>
      <p className="text-xs text-slate-500">{orders} pesanan</p>
    </div>
  )
}

export function RevenueChart({
  data,
  loading,
}: {
  data: ChartPoint[]
  loading?: boolean
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.45 }}
      className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl"
    >
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Analytics Revenue</h3>
          <p className="text-xs text-slate-500">Performa 14 hari terakhir</p>
        </div>
        <ul className="flex gap-4 text-xs">
          <li className="flex items-center gap-1.5 text-slate-600">
            <span className="size-2 rounded-full bg-blue-500" />
            Revenue
          </li>
          <li className="flex items-center gap-1.5 text-slate-600">
            <span className="size-2 rounded-full bg-violet-400" />
            Orders
          </li>
        </ul>
      </header>

      {loading ? (
        <Skeleton className="h-[260px] w-full rounded-xl" />
      ) : data.length === 0 ? (
        <div className="flex h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center">
          <p className="text-sm font-medium text-slate-600">Belum ada data</p>
          <p className="mt-1 text-xs text-slate-400">Data akan muncul setelah ada pesanan</p>
        </div>
      ) : (
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  v >= 1_000_000
                    ? `${(v / 1_000_000).toFixed(1)}jt`
                    : `${(v / 1000).toFixed(0)}rb`
                }
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.section>
  )
}
