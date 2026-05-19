"use client"

import { UserShell } from "@/components/dashboard/UserShell"
import { ShellMetaProvider, useShellMeta } from "@/components/shell/ShellMetaContext"

function DashboardShellFrame({ children }: { children: React.ReactNode }) {
  const { title, subtitle, userName } = useShellMeta()
  return (
    <UserShell title={title} subtitle={subtitle} userName={userName}>
      {children}
    </UserShell>
  )
}

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ShellMetaProvider segment="dashboard">
      <DashboardShellFrame>{children}</DashboardShellFrame>
    </ShellMetaProvider>
  )
}
