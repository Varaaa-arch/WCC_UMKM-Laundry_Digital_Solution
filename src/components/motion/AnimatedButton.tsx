"use client"

import type { ComponentProps } from "react"
import { motion, useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type AnimatedButtonProps = ComponentProps<typeof motion.button>

export function AnimatedButton({ className, children, ...rest }: AnimatedButtonProps) {
  const reduced = useReducedMotion()

  return (
    <motion.button
      type="button"
      className={cn(
        "motion-gpu inline-flex items-center justify-center transition-[box-shadow,filter] duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60",
        className
      )}
      whileHover={
        reduced
          ? undefined
          : {
              scale: 1.02,
              boxShadow: "0 8px 28px -6px rgba(37, 99, 235, 0.35)",
            }
      }
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
