"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Home, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ShellNavItem, ShellUiStore } from "@/components/shell/types"

type AppSidebarProps = {
  mobile?: boolean
  nav: ShellNavItem[]
  panelLabel: string
  layoutId: string
  useUiStore: () => ShellUiStore
}

export function AppSidebar({
  mobile = false,
  nav,
  panelLabel,
  layoutId,
  useUiStore,
}: AppSidebarProps) {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar, setMobileOpen } = useUiStore()
  const collapsed = !mobile && sidebarCollapsed

  const content = (
    <>
      <div
        className={cn(
          "flex items-center border-b border-slate-100/80 px-4 py-5",
          collapsed ? "justify-center" : "gap-3"
        )}
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
          <Sparkles className="size-4 text-white" />
        </span>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <p className="text-sm font-bold leading-none text-slate-900">LummyBlue</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-slate-400">
                {panelLabel}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map(({ label, href, icon: Icon, disabled }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={label}
              href={disabled ? "#" : href}
              onClick={(e) => {
                if (disabled) e.preventDefault()
                if (mobile) setMobileOpen(false)
              }}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                collapsed && "justify-center px-2",
                disabled && "cursor-not-allowed opacity-40",
                active
                  ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-md shadow-blue-500/25"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
              {active && (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-blue-600 to-blue-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

<div className="border-t border-slate-100/80 px-3 py-4">
        <Link
          href="/"
          onClick={() => mobile && setMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-800",
            collapsed && "justify-center px-2"
          )}
        >
          <Home className="size-4 shrink-0" />
          {!collapsed && <span>Beranda</span>}
        </Link>
        {!mobile && (
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              "mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600",
              collapsed && "justify-center"
            )}
          >
            <ChevronLeft
              className={cn("size-4 transition-transform", collapsed && "rotate-180")}
            />
            {!collapsed && <span>Tutup sidebar</span>}
          </button>
        )}
      </div>
    </>
  )

  if (mobile) {
    return <div className="flex h-full flex-col bg-white">{content}</div>

  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="hidden h-screen shrink-0 flex-col border-r border-slate-100/80 bg-white/80 backdrop-blur-xl md:flex"
    >
      {content}
    </motion.aside>
  )
}