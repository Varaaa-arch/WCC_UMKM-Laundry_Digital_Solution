"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, LogOut, LayoutDashboard } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"

import { NAV } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuthStore } from "@/store/useAuthStore"
import { signOut } from "@/actions/auth-action"

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

export function Navbar() {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const { user, loading, init } = useAuthStore()
  const reduced = Boolean(prefersReducedMotion)

  React.useEffect(() => {
    const unsub = init()
    return unsub
  }, [init])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        className="pointer-events-auto w-full max-w-4xl flex items-center justify-between bg-blue-500 rounded-full px-4 py-2.5 shadow-lg mt-3"
        initial={reduced ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
        aria-label="Primary"
      >
        {/* Logo */}
        <Link href="/" className="text-base font-bold tracking-tight text-white shrink-0 pl-1">
          {NAV.logo}
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV.links.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isActive ? "text-white" : "text-blue-100 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <div className="w-16 h-8 bg-gray-700 rounded-full animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                <Avatar className="w-7 h-7">
                  <AvatarFallback className="bg-blue-500 text-white text-xs font-semibold">
                    {(user.user_metadata?.full_name as string)?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:block">{(user.user_metadata?.full_name as string) ?? user.email}</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href={NAV.loginHref}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-2"
              >
                {NAV.loginLabel}
              </Link>
              <Link
                href={NAV.ctaHref}
                className="rounded-full bg-white text-gray-900 text-sm font-semibold px-5 py-2 hover:bg-gray-100 transition-colors"
              >
                {NAV.cta}
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-gray-300 hover:text-white p-1" aria-label={NAV.mobileMenuLabel}>
                <Menu className="size-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,320px)] sm:max-w-sm">
              <SheetHeader className="text-left">
                <SheetTitle className="sr-only">{NAV.mobileSheetTitle}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-2 pb-8 pt-2">
                <ul className="flex flex-col gap-4">
                  {NAV.links.map((item) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                    return (
                      <li key={`${item.label}-mobile`}>
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
                      </li>
                    )
                  })}
                </ul>
                <SheetClose asChild>
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <Link href="/dashboard" className="flex items-center gap-2 py-2 text-base font-semibold text-blue-600">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 py-2 text-base font-semibold text-red-500"
                      >
                        <LogOut className="w-4 h-4" /> Keluar
                      </button>
                    </div>
                  ) : (
                    <Link href={NAV.loginHref} className="py-2 text-base font-semibold text-blue-600">
                      {NAV.loginLabel}
                    </Link>
                  )}
                </SheetClose>
                {!user && (
                  <SheetClose asChild>
                    <Link
                      href={NAV.ctaHref}
                      className="w-full rounded-full bg-blue-600 text-white text-sm font-semibold px-5 py-3 hover:bg-blue-700 transition-colors text-center"
                    >
                      {NAV.cta}
                    </Link>
                  </SheetClose>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </div>
  )
}
