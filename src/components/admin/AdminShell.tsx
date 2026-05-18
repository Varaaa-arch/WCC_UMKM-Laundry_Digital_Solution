"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminHeader } from "@/components/admin/AdminHeader"
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
  const { mobileOpen, setMobileOpen } = useAdminUiStore()

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

      <AdminSidebar />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <AdminSidebar mobile />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader title={title} subtitle={subtitle} userName={userName} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
