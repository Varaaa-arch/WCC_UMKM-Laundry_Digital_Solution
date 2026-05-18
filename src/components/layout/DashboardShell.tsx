"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingBag, History, User, Bell, HelpCircle, Home } from "lucide-react"

const NAV_ITEMS = [
  { label: "Dashboard",     href: "/dashboard",         icon: LayoutDashboard },
  { label: "Pesan Laundry", href: "/dashboard/pesan",   icon: ShoppingBag },
  { label: "Riwayat",       href: "/dashboard/history", icon: History },
  { label: "Profil",        href: "/dashboard/profile", icon: User },
]

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen overflow-hidden bg-[#F0F4FA]">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-white border-r border-gray-100 shrink-0 h-screen sticky top-0">
        <div className="px-5 py-6 border-b border-gray-100">
          <p className="text-blue-600 font-bold text-lg leading-none">LummyBlue</p>
          <p className="text-gray-400 text-[11px] mt-0.5">Laundry Management</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link key={label} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-gray-100">
          <Link href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            <Home className="w-4 h-4 shrink-0" />
            Kembali ke Beranda
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-end gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto">          {children}
        </main>
      </div>
    </div>
  )
}
