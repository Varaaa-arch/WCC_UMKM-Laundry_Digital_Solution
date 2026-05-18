"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/store/useAuthStore"

export function useAdminAuth() {
  const router = useRouter()
  const { user, loading: authLoading, init } = useAuthStore()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [profileName, setProfileName] = useState("Admin")

  useEffect(() => {
    const unsub = init()
    return unsub
  }, [init])

  useEffect(() => {
    if (authLoading) return
    if (!user) {
      router.replace("/login")
      return
    }

    const supabase = createClient()
    supabase
      .from("profiles")
      .select("is_admin, name")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (!data?.is_admin) {
          router.replace("/dashboard")
          return
        }
        setIsAdmin(true)
        setProfileName(data.name ?? "Admin")
      })
  }, [authLoading, user, router])

  return {
    user,
    loading: authLoading || isAdmin === null,
    isAdmin: isAdmin === true,
    profileName,
  }
}
