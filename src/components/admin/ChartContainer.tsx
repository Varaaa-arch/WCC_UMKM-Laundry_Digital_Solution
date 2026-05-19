"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type ChartContainerProps = {
  height: number
  className?: string
  children: (size: { width: number; height: number }) => ReactNode
}

/** Hindari Recharts width/height -1 saat parent belum punya layout. */
export function ChartContainer({ height, className, children }: ChartContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const { width, height: h } = el.getBoundingClientRect()
      if (width > 0 && h > 0) {
        setSize({ width: Math.floor(width), height: Math.floor(h) })
      }
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn("w-full min-w-0", className)}
      style={{ height }}
    >
      {size.width > 0 && size.height > 0 ? children(size) : null}
    </div>
  )
}
