"use client"

import { useEffect, useRef, type RefObject } from "react"
import { useReducedMotion } from "framer-motion"
import anime from "animejs"

type AnimeFrom = "up" | "down" | "left" | "right" | "scale"

export type AnimeInViewOptions = {
  /** CSS selector for staggered children (relative to root). Default: direct children */
  childSelector?: string
  stagger?: number
  delay?: number
  duration?: number
  from?: AnimeFrom
  threshold?: number
  once?: boolean
  disabled?: boolean
}

const EASE_AWARDS = "easeOutExpo"

function fromProps(from: AnimeFrom) {
  switch (from) {
    case "down":
      return { translateY: [-36, 0] }
    case "left":
      return { translateX: [-40, 0] }
    case "right":
      return { translateX: [40, 0] }
    case "scale":
      return { scale: [0.92, 1] }
    default:
      return { translateY: [48, 0] }
  }
}

export function useAnimeInView<T extends HTMLElement>(
  options: AnimeInViewOptions = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const played = useRef(false)
  const prefersReduced = useReducedMotion()

  const {
    childSelector,
    stagger = 70,
    delay = 0,
    duration = 1100,
    from = "up",
    threshold = 0.18,
    once = true,
    disabled = false,
  } = options

  useEffect(() => {
    if (disabled) return
    const root = ref.current
    if (!root) return

    const revealStill = () => {
      const nodes = childSelector
        ? root.querySelectorAll<HTMLElement>(childSelector)
        : (Array.from(root.children) as HTMLElement[])
      if (nodes.length) {
        nodes.forEach((n) => {
          n.style.opacity = "1"
          n.style.transform = "none"
        })
      } else {
        root.style.opacity = "1"
        root.style.transform = "none"
      }
    }

    if (prefersReduced) {
      revealStill()
      return
    }

    const run = () => {
      if (once && played.current) return
      played.current = true

      const targets = childSelector
        ? root.querySelectorAll<HTMLElement>(childSelector)
        : (Array.from(root.children) as HTMLElement[])

      if (!targets.length) {
        const motion = fromProps(from)
        anime({
          targets: root,
          ...motion,
          opacity: [0, 1],
          duration,
          delay,
          easing: EASE_AWARDS,
        })
        return
      }

      const motion = fromProps(from)
      anime({
        targets,
        ...motion,
        opacity: [0, 1],
        duration,
        delay: anime.stagger(stagger, { start: delay }),
        easing: EASE_AWARDS,
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run()
          if (once) observer.disconnect()
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [
    childSelector,
    stagger,
    delay,
    duration,
    from,
    threshold,
    once,
    disabled,
    prefersReduced,
  ])

  return ref
}
