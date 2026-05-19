import { createClient } from "@/lib/supabase/server"
import { getAppHomePath } from "./home-path"

/** Resolve post-auth redirect from profiles.is_admin */
export async function resolveAppHomePath() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return "/login"

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single()

  return getAppHomePath(Boolean(profile?.is_admin))
}
