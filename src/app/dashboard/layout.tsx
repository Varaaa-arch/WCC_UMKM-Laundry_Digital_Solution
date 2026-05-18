import { QueryProvider } from "@/providers/QueryProvider"
import { Toaster } from "sonner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
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
