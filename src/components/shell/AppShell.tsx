"use client"

import { memo } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { AppSidebar } from "@/components/shell/AppSidebar"
import { AppHeader } from "@/components/shell/AppHeader"
import type { ShellNavItem, ShellUiStore } from "@/components/shell/types"

type AppShellProps = {
  children: React.ReactNode
  title?: string
  subtitle?: string
  userName?: string
  nav: ShellNavItem[]
  panelLabel: string
  layoutId: string
  useUiStore: () => ShellUiStore
}

function AppShellInner({
  children,
  title = "Dashboard",
  subtitle,
  userName,
  nav,
  panelLabel,
  layoutId,
  useUiStore,
}: AppShellProps) {
  const { mobileOpen, setMobileOpen } = useUiStore()

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4FA]">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[#F0F4FA]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -left-32 top-0 size-[420px] rounded-full bg-blue-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 bottom-0 size-[380px] rounded-full bg-indigo-400/10 blur-3xl"
      />

      <AppSidebar
        nav={nav}
        panelLabel={panelLabel}
        layoutId={layoutId}
        useUiStore={useUiStore}
      />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <AppSidebar
            mobile
            nav={nav}
            panelLabel={panelLabel}
            layoutId={layoutId}
            useUiStore={useUiStore}
          />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader
          title={title}
          subtitle={subtitle}
          userName={userName}
          useUiStore={useUiStore}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export const AppShell = memo(AppShellInner)
