"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Banknote,
  CheckCircle2,
  Clock,
  QrCode,
  Upload,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { formatCurrency } from "@/lib/admin/constants"
import type { PaymentMethodType } from "@/lib/payment/types"
import { buildQrisPayload } from "@/lib/payment/constants"

type PaymentMethodSectionProps = {
  method: PaymentMethodType
  onMethodChange: (method: PaymentMethodType) => void
  total: number
  codAgreed: boolean
  onCodAgreedChange: (v: boolean) => void
  proofFile: File | null
  onProofChange: (file: File | null) => void
  countdownLabel: string
}

const METHODS: {
  id: PaymentMethodType
  title: string
  description: string
  icon: typeof QrCode
}[] = [
  {
    id: "qris",
    title: "QRIS",
    description: "Scan QR & upload bukti pembayaran",
    icon: QrCode,
  },
  {
    id: "cod",
    title: "COD",
    description: "Bayar langsung saat layanan selesai.",
    icon: Banknote,
  },
]

export function PaymentMethodSection({
  method,
  onMethodChange,
  total,
  codAgreed,
  onCodAgreedChange,
  proofFile,
  onProofChange,
  countdownLabel,
}: PaymentMethodSectionProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const qrisPayload = buildQrisPayload({
    merchant: "LummyBlue",
    amount: total,
    orderRef: `LB-${Date.now()}`,
  })
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&margin=12&data=${encodeURIComponent(qrisPayload)}`

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl sm:p-8"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600/80">
          Metode Pembayaran
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
          Pilih cara bayar
        </h2>
      </div>

      <motion.div layout className="grid gap-3 sm:grid-cols-2">
        {METHODS.map(({ id, title, description, icon: Icon }) => {
          const selected = method === id
          return (
            <motion.button
              key={id}
              type="button"
              layout
              onClick={() => onMethodChange(id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={cn(
                "relative flex flex-col items-start gap-3 rounded-2xl border-2 p-5 text-left transition-colors duration-200",
                selected
                  ? "border-blue-500 bg-blue-50/80 shadow-md shadow-blue-500/10"
                  : "border-slate-100 bg-white/50 hover:border-slate-200 hover:bg-white"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="payment-method-active"
                  className="absolute inset-0 -z-10 rounded-2xl bg-blue-50/90"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-xl",
                  selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                )}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-bold text-slate-900">{title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                  {description}
                </p>
              </div>
              <span
                className={cn(
                  "absolute right-4 top-4 flex size-5 items-center justify-center rounded-full border-2",
                  selected ? "border-blue-600 bg-blue-600" : "border-slate-300"
                )}
              >
                {selected && <CheckCircle2 className="size-3 text-white" />}
              </span>
            </motion.button>
          )
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {method === "qris" && (
          <motion.div
            key="qris-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 space-y-5 rounded-2xl border border-blue-100/80 bg-blue-50/40 p-5 sm:p-6">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <motion.div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                  <QrCode className="size-4" />
                  Scan QRIS
                </motion.div>
                <div className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm">
                  <Clock className="size-3.5" />
                  {countdownLabel}
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mx-auto flex max-w-[280px] flex-col items-center"
              >
                <div className="relative rounded-2xl bg-white p-4 shadow-lg shadow-blue-500/10">
                  <Image
                    src={qrUrl}
                    alt="QRIS pembayaran LummyBlue"
                    width={280}
                    height={280}
                    className="size-full rounded-xl"
                    unoptimized
                  />
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    QRIS
                  </span>
                </div>
                <p className="mt-5 text-center text-sm font-bold text-slate-900">
                  {formatCurrency(total)}
                </p>
              </motion.div>

              <ol className="space-y-2 text-sm text-slate-600">
                {[
                  "Buka aplikasi e-wallet atau mobile banking.",
                  "Scan kode QR di atas.",
                  "Pastikan nominal sesuai total pembayaran.",
                  "Upload bukti transfer di bawah ini.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-2">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onProofChange(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className={cn(
                    "flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-8 transition-all duration-200",
                    proofFile
                      ? "border-emerald-300 bg-emerald-50/50"
                      : "border-slate-200 bg-white/60 hover:border-blue-300 hover:bg-blue-50/30"
                  )}
                >
                  {proofFile ? (
                    <>
                      <CheckCircle2 className="size-8 text-emerald-600" />
                      <span className="text-sm font-semibold text-emerald-800">
                        {proofFile.name}
                      </span>
                      <span className="text-xs text-emerald-600">Ketuk untuk ganti file</span>
                    </>
                  ) : (
                    <>
                      <Upload className="size-8 text-blue-500" />
                      <span className="text-sm font-semibold text-slate-700">
                        Upload bukti pembayaran
                      </span>
                      <span className="text-xs text-slate-400">PNG, JPG — maks. 5MB</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {method === "cod" && (
          <motion.div
            key="cod-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-5"
            >
              <Banknote className="mt-0.5 size-5 shrink-0 text-blue-600" />
              <p className="text-sm leading-relaxed text-slate-600">
                Bayar langsung saat layanan selesai. Tidak perlu transfer di muka —
                tim kami akan menginformasikan total akhir setelah penimbangan.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-4 flex items-start gap-3 rounded-2xl border border-blue-100 bg-white/80 p-4"
            >
              <Checkbox
                id="cod-agree"
                checked={codAgreed}
                onCheckedChange={(v) => onCodAgreedChange(v === true)}
              />
              <Label
                htmlFor="cod-agree"
                className="cursor-pointer text-sm leading-relaxed text-slate-700"
              >
                Saya memahami dan setuju membayar tunai (COD) setelah layanan laundry
                selesai.
              </Label>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
