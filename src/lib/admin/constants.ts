export const ORDER_STATUSES = [
  "pending",
  "picked_up",
  "washing",
  "finished",
  "ready_pickup",
  "delivered",
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Menunggu",
  picked_up: "Dijemput",
  washing: "Dicuci",
  finished: "Selesai Cuci",
  ready_pickup: "Siap Diambil",
  delivered: "Terkirim",
}

export const STATUS_STYLES: Record<
  OrderStatus,
  { bg: string; text: string; dot: string }
> = {
  pending: {
    bg: "bg-amber-500/10",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  picked_up: {
    bg: "bg-sky-500/10",
    text: "text-sky-700",
    dot: "bg-sky-500",
  },
  washing: {
    bg: "bg-blue-500/10",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  finished: {
    bg: "bg-violet-500/10",
    text: "text-violet-700",
    dot: "bg-violet-500",
  },
  ready_pickup: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  delivered: {
    bg: "bg-slate-500/10",
    text: "text-slate-600",
    dot: "bg-slate-400",
  },
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount)
}
