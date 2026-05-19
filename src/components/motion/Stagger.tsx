"use client"

import type { ComponentProps } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

import { inView, staggerContainer, staggerItem } from "@/lib/motion/presets"
import { cn } from "@/lib/utils"

type MotionDivProps = ComponentProps<typeof motion.div>

const itemStill: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
}

type StaggerRootProps = MotionDivProps & {
  stagger?: number
  delayChildren?: number
}

export function StaggerRoot({
  className,
  children,
  stagger = 0.08,
  delayChildren = 0.04,
  ...rest
}: StaggerRootProps) {
  const reduced = useReducedMotion()

  const root: Variants = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }

  return (
    <motion.div
      className={cn("motion-gpu", className)}
      variants={root}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ className, children, ...rest }: MotionDivProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={cn(className)}
      variants={reduced ? itemStill : staggerItem}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerFadeItem({ className, children, ...rest }: MotionDivProps) {
  const reduced = useReducedMotion()
  const variants: Variants = reduced
    ? itemStill
    : {
        hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      }

  return (
    <motion.div className={cn(className)} variants={variants} {...rest}>
      {children}
    </motion.div>
  )
}
