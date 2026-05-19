"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function useAdminAuth() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [profileName, setProfileName] = useState("Admin")
  const checked = useRef(false)

  useEffect(() => {
    if (checked.current) return
    checked.current = true

    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) {
        router.replace("/login")
        return
      }
      const { data } = await supabase
        .from("profiles")
        .select("is_admin, name")
        .eq("id", user.id)
        .single()

      if (!data?.is_admin) {
        setIsAdmin(false)
        router.replace("/dashboard")
        return
      }
      setIsAdmin(true)
      setProfileName(data.name ?? "Admin")
    })
  }, [router])

  return {
    loading: isAdmin === null,
    isAdmin: isAdmin === true,
    profileName,
  }
}
