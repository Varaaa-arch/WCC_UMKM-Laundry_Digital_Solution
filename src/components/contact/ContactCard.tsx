"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type ContactCardProps = {
  label: string
  value: string
  href: string
  icon: LucideIcon
  gradient: string
  iconBg: string
  hoverShadow: string
  index?: number
}

const cardMotion = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export function ContactCard({
  label,
  value,
  href,
  icon: Icon,
  gradient,
  iconBg,
  hoverShadow,
  index = 0,
}: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      custom={index}
      variants={cardMotion}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className={cn(
        "group relative flex min-h-[120px] flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/80 p-5",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        "transition-shadow duration-300",
        hoverShadow
      )}
    >
      <motion.span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 block size-32 rounded-full opacity-40 blur-2xl",
          gradient
        )}
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative grid flex-1 grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-slate-500">{label}</p>
          <p
            className="mt-1.5 truncate text-sm font-bold leading-snug tracking-tight text-slate-900 sm:text-base"
            title={value}
          >
            {value}
          </p>
        </div>
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl shadow-lg",
            iconBg
          )}
        >
          <Icon className="size-5 text-white" />
        </span>

        <span className="col-span-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Hubungi
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  )
}
