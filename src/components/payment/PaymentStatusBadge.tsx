"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PAYMENT_STATUS_CONFIG } from "@/lib/payment/constants"
import type { PaymentStatusType } from "@/lib/payment/types"

type PaymentStatusBadgeProps = {
  status: PaymentStatusType
  className?: string
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = PAYMENT_STATUS_CONFIG[status]

  return (
    <motion.span
      key={status}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-300",
        config.className,
        className
      )}
    >
      <span className={cn("size-2 rounded-full", config.dotClassName)} />
      {config.label}
    </motion.span>
  )
}
