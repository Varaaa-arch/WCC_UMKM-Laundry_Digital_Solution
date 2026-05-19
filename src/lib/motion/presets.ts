import type { Transition, Variants } from "framer-motion"

import { easeOutExpo, easePremium, easeSmooth } from "./easings"

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.75,
} as const

export const inView = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -8% 0px",
} as const

export const inViewTight = {
  once: true,
  amount: 0.32,
  margin: "0px 0px -5% 0px",
} as const

export function transitionReveal(delay = 0): Transition {
  return {
    duration: DURATION.base,
    delay,
    ease: easeOutExpo,
  }
}

export function transitionPage(): Transition {
  return {
    duration: DURATION.slow,
    ease: easePremium,
  }
}

export function transitionShell(): Transition {
  return {
    duration: 0.6,
    ease: easeSmooth,
  }
}

export const pageEnter = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: transitionPage(),
  },
}

export const pageExit = {
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(6px)",
    transition: { duration: DURATION.fast, ease: easePremium },
  },
}

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: transitionReveal(0) },
}

export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: transitionReveal(0) },
}

export const revealRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: transitionReveal(0) },
}

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: transitionReveal(0) },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: transitionReveal(0) },
}

export const cardHover = {
  y: -3,
  scale: 1.01,
  transition: { duration: 0.28, ease: easeOutExpo },
}

export const cardTap = {
  scale: 0.985,
  transition: { duration: 0.12 },
}
