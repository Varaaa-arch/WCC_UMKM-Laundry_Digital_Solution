"use client"

import type { ComponentProps } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { inView, revealLeft, revealRight, revealScale, revealUp, transitionReveal } from "@/lib/motion/presets"
import { cn } from "@/lib/utils"

type MotionDivProps = ComponentProps<typeof motion.div>

export type RevealProps = MotionDivProps & {
  delay?: number
  from?: "up" | "left" | "right" | "scale"
  blur?: boolean
}

const variantMap = {
  up: revealUp,
  left: revealLeft,
  right: revealRight,
  scale: revealScale,
} as const

export function Reveal({
  className,
  children,
  delay = 0,
  from = "up",
  blur = false,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <motion.div className={cn(className)} {...rest}>
        {children}
      </motion.div>
    )
  }

  const variants = variantMap[from]

  return (
    <motion.div
      className={cn("motion-gpu", className)}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={transitionReveal(delay)}
      style={blur ? { willChange: "transform, opacity, filter" } : undefined}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
