/** Homepage — do not wrap with global page motion (landing is final). */
export function isHomeRoute(pathname: string) {
  return pathname === "/"
}

export function isShellRoute(pathname: string) {
  return pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
}

/** Pages that already have rich framer-motion — skip global enter + auto reveal */
export function hasBuiltInPageMotion(pathname: string) {
  if (pathname === "/faq") return true
  if (pathname === "/login" || pathname === "/register") return true
  if (pathname === "/kebijakan-privasi" || pathname === "/syarat-ketentuan") return true
  if (pathname === "/dashboard") return true
  if (/\/payment\/?$/.test(pathname)) return true
  return false
}

/** Lenis smooth scroll — off on home & reduced-motion handled in provider */
export function shouldEnableLenis(pathname: string) {
  return !isHomeRoute(pathname)
}
