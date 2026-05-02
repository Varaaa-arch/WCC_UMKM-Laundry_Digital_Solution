import Link from "next/link"
import { Bird, Camera, Users } from "lucide-react"

import { FOOTER } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-lg font-bold text-blue-600">{FOOTER.logo}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {FOOTER.tagline}
            </p>
          </div>

          {FOOTER.columns.map((column) => (
            <div key={column.heading}>
              <p className="text-sm font-semibold text-slate-900">{column.heading}</p>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-slate-200 lg:my-14" />

        <div className="flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">{FOOTER.copyright}</p>
          <div className="flex items-center gap-4">
            <Link
              href={FOOTER.socialInstagramHref}
              className="text-slate-500 transition-colors hover:text-blue-600"
              aria-label={FOOTER.socialInstagramAria}
              title={FOOTER.socialInstagramAria}
            >
              <Camera className="size-5" aria-hidden />
            </Link>
            <Link
              href={FOOTER.socialFacebookHref}
              className="text-slate-500 transition-colors hover:text-blue-600"
              aria-label={FOOTER.socialFacebookAria}
              title={FOOTER.socialFacebookAria}
            >
              <Users className="size-5" aria-hidden />
            </Link>
            <Link
              href={FOOTER.socialTwitterHref}
              className="text-slate-500 transition-colors hover:text-blue-600"
              aria-label={FOOTER.socialTwitterAria}
              title={FOOTER.socialTwitterAria}
            >
              <Bird className="size-5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
