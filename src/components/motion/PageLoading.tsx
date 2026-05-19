"use client"

import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type PageLoadingProps = {
  className?: string
  label?: string
}

export function PageLoading({ className, label = "Memuat..." }: PageLoadingProps) {
  const reduced = useReducedMotion()

  return (
    <div
      className={cn(
        "flex min-h-[40vh] flex-col items-center justify-center gap-6 p-10",
        className
      )}
    >
      <div className="w-full max-w-md space-y-4">
        <motion.div
          className="lb-shimmer h-4 w-2/5 rounded-lg"
          initial={reduced ? false : { opacity: 0.4 }}
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="lb-shimmer h-28 w-full rounded-2xl" />
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div className="lb-shimmer h-20 rounded-xl" />
          <motion.div className="lb-shimmer h-20 rounded-xl" />
        </motion.div>
      </div>
      <motion.p
        className="text-sm font-medium text-slate-400"
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        {label}
      </motion.p>
      <motion.div
        className="size-8 rounded-full border-2 border-blue-200 border-t-blue-500"
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
        aria-hidden
      />
    </div>
  )
}
