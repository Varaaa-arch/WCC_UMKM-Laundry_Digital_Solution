"use client"

import { motion, useReducedMotion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState, type PropsWithChildren, useRef } from "react"
import { createPortal } from "react-dom"

import { easeSmooth } from "@/lib/motion/easings"
import { pageEnter, transitionPage } from "@/lib/motion/presets"
import { hasBuiltInPageMotion, isHomeRoute, isShellRoute } from "@/lib/motion/routes"

const TRANSITION_DURATION = 0.6

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const shellRoute = isShellRoute(pathname)
  const homeRoute = isHomeRoute(pathname)
  const skipContentEnter = hasBuiltInPageMotion(pathname)
  const reduced = useReducedMotion()
  const [isExiting, setIsExiting] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const [isVisible, setIsVisible] = useState(true)
  const exitPromiseRef = useRef<{ resolve: () => void } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleExit = () => {
      setIsExiting(true)
      setIsVisible(false)

      setTimeout(() => {
        if (exitPromiseRef.current) {
          exitPromiseRef.current.resolve()
          exitPromiseRef.current = null
        }
      }, TRANSITION_DURATION * 1000)
    }

    window.addEventListener("page-transition-exit", handleExit)
    return () => window.removeEventListener("page-transition-exit", handleExit)
  }, [])

  useEffect(() => {
    if (reduced) {
      setDisplayChildren(children)
      setIsVisible(true)
      return
    }

    setDisplayChildren(children)
    setIsVisible(true)
    setIsExiting(false)
  }, [pathname, children, reduced])

  /** Homepage: no global wrapper — landing animations stay untouched */
  if (homeRoute) {
    return <>{children}</>
  }

  if (shellRoute) {
    return <>{children}</>
  }

  const exitCurtain = (
    <AnimatePresence>
      {isExiting && (
        <motion.div
          key="exit-curtain"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "#2563eb" }}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{
            duration: TRANSITION_DURATION,
            ease: easeSmooth,
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.35, delay: 0.1, ease: easeSmooth }}
          >
            <span className="relative inline-block select-none overflow-hidden text-3xl font-bold tracking-tight">
              <span className="text-blue-300">LummyBlue</span>
              <motion.span
                className="absolute inset-0 text-white"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.4, delay: 0.2, ease: easeSmooth }}
              >
                LummyBlue
              </motion.span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  const enterCurtain = (
    <AnimatePresence>
      {!isExiting && isVisible && (
        <motion.div
          key={`enter-${pathname}`}
          className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "#2563eb" }}
          initial={{ opacity: 1, y: "-100%" }}
          animate={{ opacity: 0, y: "-100%" }}
          exit={{ opacity: 0 }}
          transition={{
            duration: TRANSITION_DURATION,
            ease: easeSmooth,
          }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            animate={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: easeSmooth }}
          >
            <span className="relative inline-block select-none overflow-hidden text-3xl font-bold tracking-tight text-white">
              LummyBlue
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {mounted && createPortal(exitCurtain, document.body)}
      {mounted && createPortal(enterCurtain, document.body)}
      <motion.div
        key={pathname}
        className="motion-gpu"
        initial={
          reduced || skipContentEnter
            ? false
            : pageEnter.hidden
        }
        animate={
          reduced || skipContentEnter
            ? undefined
            : pageEnter.show
        }
        transition={transitionPage()}
      >
        {displayChildren}
      </motion.div>
    </>
  )
}
