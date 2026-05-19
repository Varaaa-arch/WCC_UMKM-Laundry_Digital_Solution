"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

type AdminPageBannerProps = {
  label: string
  title: string
  description: string
  icon?: LucideIcon
}

export function AdminPageBanner({
  label,
  title,
  description,
  icon: Icon,
}: AdminPageBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-blue-950 to-indigo-900 p-5 sm:p-6"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-blue-500/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 left-1/3 size-40 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div className="relative flex items-start gap-4">
        {Icon && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm">
            <Icon className="size-5" />
          </span>
        )}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-blue-300/80">
            {label}
          </p>
          <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{title}</h2>
          <p className="mt-2 max-w-xl text-sm text-slate-300">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}
