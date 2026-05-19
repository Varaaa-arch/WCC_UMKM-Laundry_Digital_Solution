"use client"

import Link from "next/link"
import { memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, Home, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarNavLink } from "@/components/shell/SidebarNavLink"
import type { ShellNavItem, ShellUiStore } from "@/components/shell/types"

type AppSidebarProps = {
  mobile?: boolean
  nav: ShellNavItem[]
  panelLabel: string
  layoutId: string
  useUiStore: () => ShellUiStore
}

function AppSidebarInner({
  mobile = false,
  nav,
  panelLabel,
  layoutId,
  useUiStore,
}: AppSidebarProps) {
  const { sidebarCollapsed, toggleSidebar, setMobileOpen } = useUiStore()
  const collapsed = !mobile && sidebarCollapsed

  const content = (
    <>
      <motion.div
        layout
        className={cn(
          "flex items-center border-b border-slate-100/80 px-4 py-5",
          collapsed ? "justify-center" : "gap-3"
        )}
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30">
          <Sparkles className="size-4 text-white" />
        </span>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="text-sm font-bold leading-none text-slate-900">LummyBlue</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-slate-400">
                {panelLabel}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => (
          <SidebarNavLink
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            disabled={item.disabled}
            collapsed={collapsed}
            mobile={mobile}
            layoutId={layoutId}
            onNavigate={() => setMobileOpen(false)}
          />
        ))}
      </nav>

      <motion.div layout className="border-t border-slate-100/80 px-3 py-4">
        <Link
          href="/"
          onClick={() => mobile && setMobileOpen(false)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-800",
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
              "mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-400 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-600",
              collapsed && "justify-center"
            )}
          >
            <ChevronLeft
              className={cn("size-4 transition-transform duration-200", collapsed && "rotate-180")}
            />
            {!collapsed && <span>Tutup sidebar</span>}
          </button>
        )}
      </motion.div>
    </>
  )

  if (mobile) {
    return <motion.div layout className="flex h-full flex-col bg-white">{content}</motion.div>
  }

  return (
    <motion.aside
      layout
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="hidden h-screen shrink-0 flex-col border-r border-slate-100/80 bg-white/80 backdrop-blur-xl md:flex"
    >
      {content}
    </motion.aside>
  )
}

export const AppSidebar = memo(AppSidebarInner)
