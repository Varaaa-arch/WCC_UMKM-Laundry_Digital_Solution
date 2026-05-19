"use client"

import { motion } from "framer-motion"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import type { StatusBreakdown } from "@/lib/admin/types"

export function StatusBreakdownChart({
  data,
  loading,
}: {
  data: StatusBreakdown[]
  loading?: boolean
}) {
  const total = data.reduce((s, d) => s + d.count, 0)

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-12px_rgba(15,23,42,0.1)] backdrop-blur-xl"
    >
      <header className="mb-5">
        <h3 className="text-base font-semibold text-slate-900">Distribusi Status</h3>
        <p className="text-xs text-slate-500">Semua pesanan berdasarkan status</p>
      </header>

      {loading ? (
        <Skeleton className="h-[240px] w-full rounded-xl" />
      ) : total === 0 ? (
        <motion.div
          className="flex h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 text-center"
        >
          <p className="text-sm font-medium text-slate-600">Belum ada data</p>
        </motion.div>
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-25}
                textAnchor="end"
                height={56}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="count" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.section>
  )
}
