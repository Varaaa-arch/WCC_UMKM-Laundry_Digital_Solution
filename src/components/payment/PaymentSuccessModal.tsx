"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type PaymentSuccessModalProps = {
  open: boolean
  orderId?: string
  onOpenChange: (open: boolean) => void
}

export function PaymentSuccessModal({
  open,
  orderId,
  onOpenChange,
}: PaymentSuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden rounded-3xl border-white/60 bg-white/95 p-0 shadow-2xl backdrop-blur-xl sm:max-w-md">
        <div className="relative px-6 pb-6 pt-10 text-center">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-emerald-50/80 to-transparent"
          />
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
            className="relative mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-emerald-100 shadow-lg shadow-emerald-200/50"
          >
            <CheckCircle2 className="size-11 text-emerald-600" strokeWidth={1.5} />
          </motion.div>
          <DialogHeader className="relative space-y-2">
            <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">
              Booking Berhasil!
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-slate-500">
              Pembayaran telah dikonfirmasi. Pesanan laundry Anda sedang diproses.
            </DialogDescription>
          </DialogHeader>
          {orderId && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-500"
            >
              ID Pesanan
              <span className="mt-1 block font-mono text-sm font-bold text-blue-600">
                {orderId.slice(0, 8).toUpperCase()}
              </span>
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative mt-6 flex flex-col gap-2.5"
          >
            <Button
              asChild
              className="h-11 w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <Link href="/dashboard/history">Lihat Riwayat Booking</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 w-full rounded-xl border-slate-200 text-sm font-semibold"
            >
              <Link href="/dashboard">Ke Dashboard</Link>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
