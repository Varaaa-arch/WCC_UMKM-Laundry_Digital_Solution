import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { getSupabaseEnv } from "@/lib/supabase/config"

const PROTECTED = ["/dashboard", "/admin", "/layanan/booking", "/history", "/settings"]
const ADMIN_ONLY = ["/admin"]

export async function proxy(request: NextRequest) {
  const response = await updateSession(request)

  const { pathname } = request.nextUrl
  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  if (!isProtected) return response

  const { url, anonKey } = getSupabaseEnv()
  if (!url || !anonKey) return response

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: () => {},
    },
  })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  const isAdminRoute = ADMIN_ONLY.some((p) => pathname.startsWith(p))
  if (isAdminRoute) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single()

    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|placeholder.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
