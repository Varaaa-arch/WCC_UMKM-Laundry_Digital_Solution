import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

import { HERO } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-linear-to-b from-sky-50 via-white to-white"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(219,234,254,0.85),transparent_55%)]"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:gap-14 sm:px-6 sm:py-20 lg:flex-row lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <div className="flex-1 lg:max-w-xl xl:max-w-2xl">
          <Badge
            variant="outline"
            className="rounded-full border-sky-200 bg-sky-100 px-3 py-1 text-xs font-medium text-blue-700"
          >
            {HERO.badge}
          </Badge>

          <h1
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.35rem]"
          >
            {HERO.title}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {HERO.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              asChild
              size="lg"
              className="h-12 gap-2 rounded-xl bg-blue-500 px-6 text-base font-semibold text-white shadow-none hover:bg-blue-600 focus-visible:ring-blue-600/35"
            >
              <Link href={HERO.primaryHref}>
                <Play className="size-[18px] fill-current" aria-hidden />
                {HERO.primaryBtn}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-xl border-blue-400 bg-transparent px-6 text-base font-semibold text-blue-600 shadow-none hover:bg-blue-50"
            >
              <Link href={HERO.secondaryHref}>{HERO.secondaryBtn}</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md flex-1 items-center justify-center lg:mx-0 lg:max-w-none">
          <div className="relative aspect-5/6 w-full max-w-[420px] sm:aspect-square lg:aspect-11/12 xl:max-w-[480px]">
            <Image
              src="/images/laundry-mascot.png"
              alt={HERO.imageAlt}
              fill
              priority
              className="pointer-events-none object-contain drop-shadow-xl"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
