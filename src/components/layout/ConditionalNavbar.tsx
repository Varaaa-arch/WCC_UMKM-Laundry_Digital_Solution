"use client"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/layout/Navbar"

export function ConditionalNavbar() {
  const pathname = usePathname()
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/history") ||
    pathname.startsWith("/profile")
  )
    return null
  return <Navbar />
}
