"use client"

import { motion, useReducedMotion } from "framer-motion"
import { usePathname } from "next/navigation"
import type { PropsWithChildren } from "react"

import { transitionShell } from "@/lib/motion/presets"
import { hasBuiltInPageMotion } from "@/lib/motion/routes"

export function ShellPageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const skip = hasBuiltInPageMotion(pathname)

  if (reduced || skip) {
    return <div className="motion-gpu min-h-0 flex-1">{children}</div>
  }

  return (
    <motion.div
      key={pathname}
      className="motion-gpu min-h-0 flex-1"
      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={transitionShell()}
    >
      {children}
    </motion.div>
  )
}
