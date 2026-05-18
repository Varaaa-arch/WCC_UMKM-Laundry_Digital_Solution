"use client"

import { AppShell } from "@/components/shell/AppShell"
import { ADMIN_NAV } from "@/components/shell/nav-config"
import { useAdminUiStore } from "@/store/useAdminUiStore"

type AdminShellProps = {
  children: React.ReactNode
  title?: string
  subtitle?: string
  userName?: string
}

export function AdminShell({
  children,
  title = "Dashboard",
  subtitle = "Ringkasan operasional laundry",
  userName,
}: AdminShellProps) {
  return (
    <AppShell
      title={title}
      subtitle={subtitle}
      userName={userName}
      nav={ADMIN_NAV}
      panelLabel="Admin Panel"
      layoutId="admin-nav-active"
      useUiStore={useAdminUiStore}
    >
      {children}
    </AppShell>
  )
}
