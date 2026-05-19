/** Routes that use the persistent dashboard/admin shell (sidebar stays mounted). */
export function isShellRoute(pathname: string) {
  return pathname.startsWith("/dashboard") || pathname.startsWith("/admin")
}

export function isNavActive(pathname: string, href: string) {
  if (href === "/admin" || href === "/dashboard") {
    return pathname === href
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
