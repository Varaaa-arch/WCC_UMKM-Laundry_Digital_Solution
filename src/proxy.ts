import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function proxy(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|placeholder.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
