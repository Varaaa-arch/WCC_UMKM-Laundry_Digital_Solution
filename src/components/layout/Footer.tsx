import Link from "next/link"
import { X } from "lucide-react"

import { FOOTER } from "@/lib/constants"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-5 sm:px-6 lg:px-8 lg:pt-20 lg:pb-8">
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
                {(column.links as unknown as { label: string; href?: string }[]).map((link) => (
                  <li key={(link.href ?? link.label) + link.label}>
                    {link.href ? (
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 transition-colors hover:text-blue-600"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-slate-600">{link.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-6 bg-slate-200 lg:my-8" />

        <div className="flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-sm text-slate-500">{FOOTER.copyright}</p>
          <div className="flex items-center gap-4">
            <Link
              href={FOOTER.socialInstagramHref}
              className="text-slate-500 transition-colors hover:text-blue-600"
              aria-label={FOOTER.socialInstagramAria}
              title={FOOTER.socialInstagramAria}
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                aria-hidden
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-2.74-3.83 4 4 0 0 1 2.74 3.83z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </Link>
            <Link
              href={FOOTER.socialFacebookHref}
              className="text-slate-500 transition-colors hover:text-blue-600"
              aria-label={FOOTER.socialFacebookAria}
              title={FOOTER.socialFacebookAria}
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.88 3.8-3.88 1.1 0 2.25.2 2.25.2v2.46h-1.27c-1.25 0-1.64.77-1.64 1.57V12h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </Link>
            <Link
              href={FOOTER.socialTwitterHref}
              className="text-slate-500 transition-colors hover:text-blue-600"
              aria-label={FOOTER.socialTwitterAria}
              title={FOOTER.socialTwitterAria}
            >
              <X className="size-5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
