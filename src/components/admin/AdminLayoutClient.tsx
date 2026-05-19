"use client"

import { AdminAppShell } from "@/components/admin/AdminShell"
import { ShellMetaProvider, useShellMeta } from "@/components/shell/ShellMetaContext"

function AdminShellFrame({ children }: { children: React.ReactNode }) {
  const { title, subtitle, userName } = useShellMeta()
  return (
    <AdminAppShell title={title} subtitle={subtitle} userName={userName}>
      {children}
    </AdminAppShell>
  )
}

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ShellMetaProvider segment="admin">
      <AdminShellFrame>{children}</AdminShellFrame>
    </ShellMetaProvider>
  )
}
