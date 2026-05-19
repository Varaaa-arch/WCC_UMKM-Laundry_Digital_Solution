"use client"

import type { ComponentProps } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

import { lbView, springReveal } from "./presets"

type MotionDivProps = ComponentProps<typeof motion.div>

export type RevealProps = MotionDivProps & {
  delay?: number
  soft?: boolean
  from?: "up" | "left" | "right"
}

export function Reveal({
  className,
  children,
  delay = 0,
  soft,
  from = "up",
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion()
  const offset = from === "left" ? { x: -28, y: 0 } : from === "right" ? { x: 28, y: 0 } : { x: 0, y: 22 }
  const transition = soft
    ? { ...springReveal(delay), stiffness: 240, damping: 32 }
    : springReveal(delay)

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, ...offset }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={lbView}
      transition={reduce ? { duration: 0.01 } : transition}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
