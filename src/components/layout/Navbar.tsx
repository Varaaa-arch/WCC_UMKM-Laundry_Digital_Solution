"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { NAV } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const headerVariants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOutExpo },
  },
}

const navListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
}

const navLinkItemVariants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
}

const ctaClusterVariants = {
  hidden: { opacity: 0, x: 14 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: easeOutExpo, delay: 0.12 },
  },
}

const mobileNavListVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
}

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: 12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 360, damping: 28 },
  },
}

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4)
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const instant = { duration: 0.01 }
  const navSpring = { type: "spring" as const, stiffness: 400, damping: 28, mass: 0.42 }
  const reduced = Boolean(prefersReducedMotion)

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent bg-white transition-shadow",
        scrolled && "shadow-sm"
      )}
      variants={reduced ? undefined : headerVariants}
      initial={reduced ? false : "initial"}
      animate={reduced ? undefined : "animate"}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-17 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <motion.div
          className="inline-block"
          whileHover={reduced ? undefined : { scale: 1.02, y: -1 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
          transition={reduced ? instant : { type: "spring", stiffness: 400, damping: 22 }}
        >
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-blue-600 sm:text-xl"
          >
            {NAV.logo}
          </Link>
        </motion.div>

        <motion.ul
          className="absolute left-1/2 hidden -translate-x-1/2 gap-10 md:flex lg:gap-12"
          variants={reduced ? undefined : navListVariants}
          initial={reduced ? false : "hidden"}
          animate={reduced ? undefined : "show"}
        >
          {NAV.links.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <motion.li
                key={item.label}
                className="relative"
                variants={reduced ? undefined : navLinkItemVariants}
                style={{ transformOrigin: "center bottom" }}
                whileHover={reduced ? undefined : { y: -2 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={reduced ? instant : { type: "spring", stiffness: 450, damping: 26 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"
                  )}
                >
                  {item.label}
                </Link>
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    layout="position"
                    className="pointer-events-none absolute inset-x-0 top-full mt-1 h-0.5 rounded-full bg-blue-600"
                    initial={reduced ? false : { opacity: 0, scaleX: 0.45 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    style={{ transformOrigin: "center center" }}
                    transition={
                      reduced
                        ? instant
                        : {
                            layout: navSpring,
                            opacity: { duration: 0.2, ease: easeOutExpo },
                            scaleX: { type: "spring", stiffness: 520, damping: 24 },
                          }
                    }
                  />
                )}
              </motion.li>
            )
          })}
        </motion.ul>

        <motion.div
          className="hidden items-center gap-6 md:flex"
          variants={reduced ? undefined : ctaClusterVariants}
          initial={reduced ? false : "hidden"}
          animate={reduced ? undefined : "show"}
        >
          <Link
            href={NAV.loginHref}
            className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            {NAV.loginLabel}
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-md bg-blue-500 px-6 py-2 h-10 text-white shadow-none hover:bg-blue-600 focus-visible:ring-blue-600/40"
          >
            <Link href={NAV.ctaHref}>{NAV.cta}</Link>
          </Button>
        </motion.div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden rounded-lg border-blue-300 text-blue-600 hover:bg-blue-50 sm:inline-flex"
          >
            <Link href={NAV.ctaHref}>{NAV.cta}</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="border-slate-200 text-slate-700"
                aria-label={NAV.mobileMenuLabel}
              >
                <Menu className="size-5 shrink-0" aria-hidden />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,320px)] sm:max-w-sm">
              <SheetHeader className="text-left">
                <SheetTitle className="sr-only">{NAV.mobileSheetTitle}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-2 pb-8 pt-2">
                <motion.ul
                  className="flex flex-col gap-4"
                  variants={reduced ? undefined : mobileNavListVariants}
                  initial={reduced ? false : "hidden"}
                  animate={reduced ? undefined : "show"}
                >
                  {NAV.links.map((item) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                    return (
                      <motion.li
                        key={`${item.label}-mobile`}
                        variants={reduced ? undefined : mobileNavItemVariants}
                        whileHover={reduced ? undefined : { x: -4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                      >
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block py-2 text-base font-medium",
                              isActive ? "text-blue-600" : "text-slate-800"
                            )}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </motion.li>
                    )
                  })}
                </motion.ul>
                <SheetClose asChild>
                  <Link
                    href={NAV.loginHref}
                    className="py-2 text-base font-semibold text-blue-600"
                  >
                    {NAV.loginLabel}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Link href={NAV.ctaHref}>{NAV.cta}</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}
