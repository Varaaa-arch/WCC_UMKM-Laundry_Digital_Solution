import type { Metadata } from "next"

import { SITE } from "@/lib/constants"

export const siteMeta = {
  name: SITE.name,
  tagline: SITE.tagline,
  description: "[SITE_META_DESCRIPTION]",
  keywords: ["[SITE_META_KEYWORDS]"],
  canonicalBase: "[SITE_CANONICAL_BASE]",
  ogLocale: "[OG_LOCALE]",
  twitterCreator: "[TWITTER_CREATOR]",
}

export const defaultSiteMetadata = {
  metadataBase:
    typeof siteMeta.canonicalBase === "string" && siteMeta.canonicalBase.startsWith("http")
      ? new URL(siteMeta.canonicalBase)
      : undefined,
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: siteMeta.description,
  keywords: siteMeta.keywords,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: siteMeta.ogLocale,
    siteName: SITE.name,
    title: SITE.name,
    description: siteMeta.description,
    url:
      typeof siteMeta.canonicalBase === "string" &&
      siteMeta.canonicalBase.startsWith("http")
        ? `${siteMeta.canonicalBase}/`
        : siteMeta.canonicalBase,
    images: [
      {
        url: "/placeholder.svg",
        alt: SITE.tagline,
        width: 1200,
        height: 800,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: siteMeta.description,
    creator: siteMeta.twitterCreator,
    images: ["/placeholder.svg"],
  },
} satisfies Metadata
