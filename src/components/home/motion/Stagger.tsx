"use client"

import type { ComponentProps } from "react"
import { motion, useReducedMotion, type Variants } from "framer-motion"

import { cn } from "@/lib/utils"

import { lbView, springReveal } from "./presets"

type MotionDivProps = ComponentProps<typeof motion.div>

const itemActive: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: springReveal(0) },
}

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
  stagger = 0.1,
  delayChildren = 0.05,
  ...rest
}: StaggerRootProps) {
  const reduce = useReducedMotion()

  const root: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: stagger, delayChildren },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={root}
      initial="hidden"
      whileInView="show"
      viewport={lbView}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ className, children, ...rest }: MotionDivProps) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={cn(className)} variants={reduce ? itemStill : itemActive} {...rest}>
      {children}
    </motion.div>
  )
}
