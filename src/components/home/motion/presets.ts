import type { Transition } from "framer-motion"

export const lbView = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const

export const lbViewTight = {
  once: true,
  amount: 0.35,
  margin: "0px 0px -6% 0px",
} as const

export function springReveal(delay = 0): Transition {
  return {
    type: "spring",
    stiffness: 320,
    damping: 36,
    mass: 0.95,
    delay,
  }
}

export function springGentle(delay = 0): Transition {
  return {
    type: "spring",
    stiffness: 260,
    damping: 34,
    mass: 1.05,
    delay,
  }
}

/** @deprecated use springReveal */
export const homeInView = lbView
export const homeInViewHero = lbViewTight
export const springIn = springReveal
export const springSoft = springGentle
export const springSnappy = springReveal
