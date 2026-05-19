import type { PaymentStatusLabel, PaymentStatusType } from "@/lib/payment/types"

export const PAYMENT_COUNTDOWN_SECONDS = 15 * 60

export const PAYMENT_STATUS_CONFIG: Record<
  PaymentStatusType,
  {
    label: PaymentStatusLabel
    className: string
    dotClassName: string
  }
> = {
  pending: {
    label: "Menunggu Pembayaran",
    className:
      "border-amber-200/80 bg-amber-50/90 text-amber-800 shadow-sm shadow-amber-100/50",
    dotClassName: "bg-amber-500",
  },
  processing: {
    label: "Diproses",
    className:
      "border-blue-200/80 bg-blue-50/90 text-blue-800 shadow-sm shadow-blue-100/50",
    dotClassName: "bg-blue-500 animate-pulse",
  },
  success: {
    label: "Berhasil",
    className:
      "border-emerald-200/80 bg-emerald-50/90 text-emerald-800 shadow-sm shadow-emerald-100/50",
    dotClassName: "bg-emerald-500",
  },
  failed: {
    label: "Gagal",
    className:
      "border-red-200/80 bg-red-50/90 text-red-800 shadow-sm shadow-red-100/50",
    dotClassName: "bg-red-500",
  },
}

export function buildQrisPayload(params: {
  merchant: string
  amount: number
  orderRef: string
}) {
  return `ID${params.merchant}|${params.amount}|${params.orderRef}`
}
