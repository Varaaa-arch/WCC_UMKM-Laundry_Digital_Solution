"use client"

import { MotionConfig } from "framer-motion"
import type { ReactNode } from "react"

import { LenisProvider } from "./LenisProvider"

type MotionProviderProps = {
  children: ReactNode
}

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>{children}</LenisProvider>
    </MotionConfig>
  )
}
