"use client"

import { useEffect, useRef, type ReactNode } from "react"
import anime from "animejs"

type AnimeParallaxProps = {
  children: ReactNode
  className?: string
  intensity?: number
  disabled?: boolean
}

/** Subtle scroll-linked parallax (Awwwards-style depth) */
export function AnimeParallax({
  children,
  className,
  intensity = 0.12,
  disabled = false,
}: AnimeParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled) return
    const el = ref.current
    if (!el) return

    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const vh = window.innerHeight
        const progress = 1 - (rect.top + rect.height * 0.5) / (vh + rect.height * 0.5)
        const y = (progress - 0.5) * 80 * intensity
        el.style.transform = `translate3d(0, ${y}px, 0)`
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [intensity, disabled])

  return (
    <div ref={ref} className={className} style={{ willChange: disabled ? undefined : "transform" }}>
      {children}
    </div>
  )
}
