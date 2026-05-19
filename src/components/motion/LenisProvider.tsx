"use client"

import Lenis from "lenis"
import { usePathname } from "next/navigation"
import { useEffect, useRef, type ReactNode } from "react"
import { useReducedMotion } from "framer-motion"

import { shouldEnableLenis } from "@/lib/motion/routes"

type LenisProviderProps = {
  children: ReactNode
}

export function LenisProvider({ children }: LenisProviderProps) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const mobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
    const enabled = shouldEnableLenis(pathname) && !reduced && !mobile

    if (!enabled) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove("lenis", "lenis-smooth")
      return
    }

    document.documentElement.classList.add("lenis", "lenis-smooth")

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })
    lenisRef.current = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [pathname, reduced])

  return children
}
