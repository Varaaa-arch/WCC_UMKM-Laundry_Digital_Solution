"use client"

import { motion } from "framer-motion"
import { PackagePlus, RefreshCw, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const actions = [
  {
    label: "Order Baru",
    icon: PackagePlus,
    description: "Buat pesanan manual",
    onClick: () => toast.info("Fitur order manual segera hadir"),
  },
  {
    label: "Refresh Data",
    icon: RefreshCw,
    description: "Sinkronkan dashboard",
    onClick: () => {
      window.dispatchEvent(new Event("admin-refresh"))
      toast.success("Data diperbarui")
    },
  },
  {
    label: "Kelola User",
    icon: Users,
    description: "Lihat semua pengguna",
    onClick: () => toast.info("Manajemen user segera hadir"),
  },
  {
    label: "Pengaturan",
    icon: Settings,
    description: "Konfigurasi sistem",
    onClick: () => toast.info("Pengaturan admin segera hadir"),
  },
]

export function QuickActions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {actions.map((action) => (
        <motion.div key={action.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            onClick={action.onClick}
            className="h-auto w-full flex-col items-start gap-2 rounded-xl border-white/60 bg-white/70 px-3 py-3 text-left shadow-sm backdrop-blur-sm hover:border-blue-200 hover:bg-white hover:shadow-md"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25">
              <action.icon className="size-4" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-slate-800">{action.label}</span>
              <span className="mt-0.5 block text-[10px] font-normal text-slate-500">
                {action.description}
              </span>
            </span>
          </Button>
        </motion.div>
      ))}
    </motion.section>
  )
}
