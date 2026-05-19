"use client"

import { motion } from "framer-motion"
import {
  CalendarDays,
  Clock,
  Package,
  Truck,
  User,
  Wallet,
} from "lucide-react"
import { format } from "date-fns"
import { id as localeId } from "date-fns/locale"
import { formatCurrency } from "@/lib/admin/constants"
import type { PickupMethod } from "@/store/useOrderStore"

export type BookingSummaryData = {
  serviceName: string
  pricePerKg: number
  weight: number
  total: number
  customerName: string
  pickupMethod: PickupMethod
  pickupTime: string
  address?: string
}

type BookingSummaryCardProps = {
  data: BookingSummaryData
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export function BookingSummaryCard({ data }: BookingSummaryCardProps) {
  const bookingDate = format(new Date(), "EEEE, d MMMM yyyy", { locale: localeId })
  const methodLabel =
    data.pickupMethod === "antar-jemput" ? "Antar-Jemput" : "Ambil Sendiri"

  const rows = [
    { icon: Package, label: "Layanan", value: data.serviceName },
    { icon: Wallet, label: "Harga / kg", value: formatCurrency(data.pricePerKg) },
    { icon: CalendarDays, label: "Tanggal booking", value: bookingDate },
    { icon: Clock, label: "Jam booking", value: data.pickupTime },
    { icon: User, label: "Nama customer", value: data.customerName },
    { icon: Truck, label: "Metode layanan", value: methodLabel },
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl sm:p-8"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-blue-400/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 size-40 rounded-full bg-indigo-400/10 blur-3xl"
      />

      <motion.div variants={itemVariants} initial="hidden" animate="show" className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600/80">
          Ringkasan Booking
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Detail Pesanan
        </h2>
      </motion.div>

      <motion.ul
        className="space-y-4"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        initial="hidden"
        animate="show"
      >
        {rows.map(({ icon: Icon, label, value }) => (
          <motion.li
            key={label}
            variants={itemVariants}
            transition={{ duration: 0.35 }}
            className="flex items-start justify-between gap-4 border-b border-slate-100/80 pb-4 last:border-0 last:pb-0"
          >
            <motion.div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon className="size-4" />
              </span>
              <span className="text-sm text-slate-500">{label}</span>
            </motion.div>
            <span className="max-w-[55%] text-right text-sm font-semibold text-slate-900">
              {value}
            </span>
          </motion.li>
        ))}
      </motion.ul>

      {data.address && data.pickupMethod === "antar-jemput" && (
        <motion.p
          variants={itemVariants}
          className="mt-4 rounded-2xl bg-slate-50/80 px-4 py-3 text-xs leading-relaxed text-slate-600"
        >
          <span className="font-semibold text-slate-700">Alamat: </span>
          {data.address}
        </motion.p>
      )}

      <motion.div
        variants={itemVariants}
        className="mt-6 flex items-center justify-between rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 px-5 py-4 text-white shadow-lg shadow-blue-500/25"
      >
        <span className="text-sm font-medium text-blue-100">Total Pembayaran</span>
        <span className="text-xl font-bold tracking-tight sm:text-2xl">
          {formatCurrency(data.total)}
        </span>
      </motion.div>
    </motion.section>
  )
}
