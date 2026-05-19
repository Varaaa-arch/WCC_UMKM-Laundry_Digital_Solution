import { QueryProvider } from "@/providers/QueryProvider"
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient"
import { Toaster } from "sonner"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
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
