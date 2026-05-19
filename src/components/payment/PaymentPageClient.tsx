"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronRight, Loader2, ShieldCheck } from "lucide-react"
import { Footer } from "@/components/layout/Footer"
import { BookingSummaryCard } from "@/components/payment/BookingSummaryCard"
import { PaymentMethodSection } from "@/components/payment/PaymentMethodSection"
import { PaymentStatusBadge } from "@/components/payment/PaymentStatusBadge"
import { PaymentSuccessModal } from "@/components/payment/PaymentSuccessModal"
import { confirmBooking } from "@/actions/booking-action"
import { getServices } from "@/actions/service-action"
import { useAuthStore } from "@/store/useAuthStore"
import { useOrderStore, ANTAR_JEMPUT_FEE } from "@/store/useOrderStore"
import { PAYMENT_COUNTDOWN_SECONDS } from "@/lib/payment/constants"
import type { PaymentMethodType, PaymentStatusType } from "@/lib/payment/types"
import type { Service } from "@/types/service"
import { cn } from "@/lib/utils"

function formatCountdown(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
}

export function PaymentPageClient({ slug }: { slug: string }) {
  const router = useRouter()
  const { user, init } = useAuthStore()
  const {
    selectedService,
    setService,
    estimatedWeight,
    pickupMethod,
    address,
    note,
    pickupTime,
    paymentMethod,
    setPaymentMethod,
    reset,
  } = useOrderStore()

  const [service, setServiceState] = useState<Service | null>(
    selectedService?.slug === slug ? selectedService : null
  )
  const [method, setMethod] = useState<PaymentMethodType>(
    paymentMethod === "cod" ? "cod" : "qris"
  )
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusType>("pending")
  const [codAgreed, setCodAgreed] = useState(false)
  const [proofFile, setProofFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [orderId, setOrderId] = useState<string | undefined>()
  const [countdown, setCountdown] = useState(PAYMENT_COUNTDOWN_SECONDS)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsub = init()
    return unsub
  }, [init])

  useEffect(() => {
    if (selectedService?.slug === slug) {
      setServiceState(selectedService)
      return
    }
    getServices().then((services) => {
      const found = services.find((s) => s.slug === slug)
      if (!found) {
        router.replace("/layanan")
        return
      }
      setServiceState(found)
      setService(found)
    })
  }, [slug, selectedService, setService, router])

  useEffect(() => {
    if (method !== "qris") return
    if (countdown <= 0) return
    const t = setInterval(() => setCountdown((c) => c - 1), 1000)
    return () => clearInterval(t)
  }, [method, countdown])

  const total = useMemo(() => {
    if (!service) return 0
    const sub = service.price_per_kg * estimatedWeight
    return sub + (pickupMethod === "antar-jemput" ? ANTAR_JEMPUT_FEE : 0)
  }, [service, estimatedWeight, pickupMethod])

  const customerName =
    (user?.user_metadata?.full_name as string) ??
    user?.email?.split("@")[0] ??
    "Pelanggan"

  const canConfirm = useMemo(() => {
    if (method === "cod") return codAgreed
    return proofFile !== null && countdown > 0
  }, [method, codAgreed, proofFile, countdown])

  const handleConfirm = useCallback(async () => {
    if (!service || !canConfirm) return
    setError(null)
    setLoading(true)
    setPaymentStatus("processing")
    setPaymentMethod(method)

    const result = await confirmBooking({
      serviceId: service.id,
      estimatedWeight,
      totalPrice: total,
      paymentMethod: method,
      pickupMethod,
      address,
      note,
      pickupTime,
    })

    setLoading(false)

    if (!result.success) {
      setPaymentStatus("failed")
      setError(result.error)
      return
    }

    setPaymentStatus("success")
    setOrderId(result.orderId)
    setSuccessOpen(true)
    reset()
  }, [
    service,
    canConfirm,
    method,
    setPaymentMethod,
    estimatedWeight,
    total,
    pickupMethod,
    address,
    note,
    pickupTime,
    reset,
  ])

  if (!service) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EEF4FB]">
        <Loader2 className="size-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-[#EEF4FB] px-4 pb-16 pt-24 sm:px-6">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-20 size-[420px] rounded-full bg-blue-400/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 bottom-0 size-[380px] rounded-full bg-indigo-400/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-6xl">
          <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 sm:mb-10"
          >
            <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Link href="/layanan" className="hover:text-blue-600 transition-colors">
                Layanan
              </Link>
              <ChevronRight className="size-3.5" />
              <Link
                href={`/layanan/booking/${slug}`}
                className="hover:text-blue-600 transition-colors"
              >
                Booking
              </Link>
              <ChevronRight className="size-3.5" />
              <span className="font-medium text-slate-800">Pembayaran</span>
            </nav>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Pembayaran
                </h1>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-base">
                  Selesaikan pembayaran untuk melanjutkan booking.
                </p>
              </div>
              <PaymentStatusBadge status={paymentStatus} />
            </div>
          </motion.header>

          <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
            <div className="lg:col-span-3 space-y-6">
              <BookingSummaryCard
                data={{
                  serviceName: service.name,
                  pricePerKg: service.price_per_kg,
                  weight: estimatedWeight,
                  total,
                  customerName,
                  pickupMethod,
                  pickupTime,
                  address: address || undefined,
                }}
              />
              <PaymentMethodSection
                method={method}
                onMethodChange={setMethod}
                total={total}
                codAgreed={codAgreed}
                onCodAgreedChange={setCodAgreed}
                proofFile={proofFile}
                onProofChange={setProofFile}
                countdownLabel={
                  countdown > 0
                    ? `Bayar dalam ${formatCountdown(countdown)}`
                    : "Waktu habis — refresh halaman"
                }
              />
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="lg:col-span-2"
            >
              <motion.div
                layout
                className="sticky top-24 rounded-3xl border border-white/60 bg-white/75 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl sm:p-7"
              >
                <div className="mb-5 flex items-center gap-2 text-sm text-slate-500">
                  <ShieldCheck className="size-4 text-blue-600" />
                  Transaksi aman & terenkripsi
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Total
                </p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  Rp {total.toLocaleString("id-ID")}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  *Final disesuaikan setelah penimbangan
                </p>

                {error && (
                  <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleConfirm}
                  disabled={loading || !canConfirm}
                  className={cn(
                    "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all duration-200",
                    "bg-linear-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30",
                    "hover:shadow-xl hover:shadow-blue-500/40 hover:brightness-105",
                    "disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:brightness-100"
                  )}
                >
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Konfirmasi Pembayaran
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => router.push(`/layanan/booking/${slug}`)}
                  disabled={loading}
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  <ArrowLeft className="size-4" />
                  Kembali
                </button>

                <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-400">
                  Dengan mengonfirmasi, Anda menyetujui syarat layanan LummyBlue.
                </p>
              </motion.div>
            </motion.aside>
          </div>
        </div>
      </main>

      <Footer />

      <PaymentSuccessModal
        open={successOpen}
        orderId={orderId}
        onOpenChange={setSuccessOpen}
      />
    </>
  )
}
