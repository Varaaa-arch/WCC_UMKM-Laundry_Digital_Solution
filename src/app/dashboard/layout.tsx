import { QueryProvider } from "@/providers/QueryProvider"
import { DashboardLayoutClient } from "@/components/dashboard/DashboardLayoutClient"
import { Toaster } from "sonner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          classNames: {
            toast: "rounded-xl border border-slate-200 shadow-lg",
          },
        }}
      />
    </QueryProvider>
  )
}
