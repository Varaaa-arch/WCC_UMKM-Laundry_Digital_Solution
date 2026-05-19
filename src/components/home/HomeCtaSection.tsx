"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { HERO } from "@/lib/constants"

import { useAnimeInView } from "./motion/useAnimeInView"

export function HomeCtaSection() {
  const ref = useAnimeInView<HTMLDivElement>({ from: "scale", duration: 1200 })

  return (
    <section className="lb-section pt-0 pb-16 sm:pb-20" aria-labelledby="cta-heading">
      <div className="lb-wrap">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-(--lb-radius-xl) px-8 py-12 opacity-0 sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12"
          style={{ background: "var(--lb-cta-gradient)" }}
        >
          <div className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-cyan-300/25 blur-3xl" aria-hidden />
          <div
            className="pointer-events-none absolute -right-6 bottom-0 size-48 opacity-25 sm:size-64"
            aria-hidden
          >
            <Image
              src="/images/mascot/laundry-mascot.png"
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="256px"
            />
          </div>

          <div className="relative max-w-xl">
            <h2 id="cta-heading" className="lb-display text-2xl text-white sm:text-3xl">
              Siap bebaskan waktu Anda?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-50 sm:text-base">{HERO.features.leftTop}</p>
          </div>

          <Link
            href={HERO.primaryHref}
            className="relative mt-8 inline-flex min-h-12 items-center gap-2 rounded-(--lb-radius-pill) bg-white px-7 text-sm font-bold text-blue-600 shadow-lg transition-transform hover:scale-[1.03] active:scale-[0.98] lg:mt-0 lg:shrink-0"
          >
            {HERO.primaryBtn}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
