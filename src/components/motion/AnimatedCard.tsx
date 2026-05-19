"use client"

import type { ComponentProps } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cardHover, cardTap } from "@/lib/motion/presets"
import { cn } from "@/lib/utils"

type AnimatedCardProps = ComponentProps<typeof motion.div> & {
  interactive?: boolean
  glow?: boolean
}

export function AnimatedCard({
  className,
  children,
  interactive = true,
  glow = true,
  ...rest
}: AnimatedCardProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={cn(
        "motion-gpu rounded-2xl border border-white/60 bg-white/80",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-8px_rgba(15,23,42,0.08)]",
        "transition-[box-shadow,filter] duration-300",
        glow && "hover:shadow-[0_8px_32px_-8px_rgba(37,99,235,0.18)]",
        className
      )}
      whileHover={reduced || !interactive ? undefined : cardHover}
      whileTap={reduced || !interactive ? undefined : cardTap}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
