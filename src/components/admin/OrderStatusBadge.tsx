"use client"

import { cn } from "@/lib/utils"
import {
  STATUS_LABELS,
  STATUS_STYLES,
  type OrderStatus,
} from "@/lib/admin/constants"

export function OrderStatusBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  const key = status as OrderStatus
  const style = STATUS_STYLES[key] ?? STATUS_STYLES.pending
  const label = STATUS_LABELS[key] ?? status

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        style.bg,
        style.text,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", style.dot)} />
      {label}
    </span>
  )
}
