import { createClient } from "@/lib/supabase/client"

export type OAuthProvider = "google" | "discord"

export async function signInWithOAuth(provider: OAuthProvider) {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}
