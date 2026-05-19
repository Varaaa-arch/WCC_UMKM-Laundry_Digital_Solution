import { create } from "zustand"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

interface AuthState {
  user: User | null
  isAdmin: boolean
  roleLoaded: boolean
  loading: boolean
  init: () => () => void
}

async function loadProfileRole(
  user: User | null,
  set: (partial: Partial<Pick<AuthState, "isAdmin" | "roleLoaded">>) => void
) {
  if (!user) {
    set({ isAdmin: false, roleLoaded: true })
    return
  }

  const supabase = createClient()
  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  set({ isAdmin: Boolean(data?.is_admin), roleLoaded: true })
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAdmin: false,
  roleLoaded: false,
  loading: true,

  init: () => {
    const supabase = createClient()

    supabase.auth.getUser().then(async ({ data }) => {
      set({ user: data.user, loading: false, roleLoaded: false })
      await loadProfileRole(data.user, set)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null
      set({ user, loading: false, roleLoaded: false })
      await loadProfileRole(user, set)
    })

    return () => subscription.unsubscribe()
  },
}))
