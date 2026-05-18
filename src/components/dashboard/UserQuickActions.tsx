"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { History, PlusCircle, User, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const actions = [
  {
    label: "Pesan Laundry",
    description: "Booking layanan baru",
    href: "/dashboard/pesan",
    icon: PlusCircle,
  },
  {
    label: "Riwayat Order",
    description: "Lihat semua pesanan",
    href: "/dashboard/history",
    icon: History,
  },
  {
    label: "Profil Saya",
    description: "Kelola akun kamu",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    label: "Layanan",
    description: "Jelajahi paket laundry",
    href: "/layanan",
    icon: Sparkles,
  },
]

export function UserQuickActions() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4 }}
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {actions.map((action) => (
        <motion.div key={action.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            asChild
            className="h-auto w-full flex-col items-start gap-2 rounded-xl border-white/60 bg-white/70 px-3 py-3 text-left shadow-sm backdrop-blur-sm hover:border-blue-200 hover:bg-white hover:shadow-md"
          >
            <Link href={action.href}>
              <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/25">
                <action.icon className="size-4" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-slate-800">{action.label}</span>
                <span className="mt-0.5 block text-[10px] font-normal text-slate-500">
                  {action.description}
                </span>
              </span>
            </Link>
          </Button>
        </motion.div>
      ))}
    </motion.section>
  )
}
