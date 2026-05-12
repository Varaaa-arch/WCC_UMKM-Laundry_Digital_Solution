import Image from "next/image"
import Link from "next/link"
import { Clock, Play, Shirt, ThumbsUp } from "lucide-react"

import { HERO } from "@/lib/constants"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const HERO_BG =
  "linear-gradient(135deg, #EEF6FD 0%, #E9F2F9 38%, #E3F0FA 72%, #DCEBFA 100%)"

function FeatureBlurb({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof Clock
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-2xl bg-white/60 p-4 shadow-[0_10px_40px_-14px_rgba(37,99,235,0.22)] ring-1 ring-sky-100/90 backdrop-blur-sm sm:gap-4 sm:p-5",
        className
      )}
    >
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-b from-sky-100 to-sky-50 text-blue-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:size-12"
        aria-hidden
      >
        <Icon className="size-5 sm:size-6" strokeWidth={2} />
      </div>
      <p className="text-sm leading-relaxed text-slate-700 sm:text-[0.9375rem]">{children}</p>
    </div>
  )
}

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pb-0"
      style={{ background: HERO_BG }}
      aria-labelledby="hero-heading"
    >
      <p className="sr-only">{HERO.subtitle}</p>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%232563eb' stroke-width='1'%3E%3Cpath d='M48 36h56l10 18h28v88H40V54h8z'/%3E%3Ccircle cx='100' cy='108' r='20'/%3E%3Cpath d='M32 62h136M64 44l-10 18M136 44l10 18'/%3E%3Cpath d='M72 132c14-10 42-10 56 0M88 92l18 28M118 112l-18 28'/%3E%3Ccircle cx='156' cy='44' r='6'/%3E%3Cpath d='M152 44v24M144 56h24'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "240px 240px",
        }}
      />

      <div className="relative z-1 mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pb-28 sm:pt-8 lg:px-8 lg:pb-32 lg:pt-6">
        <Badge
          variant="outline"
          className="rounded-full border-sky-200/90 bg-sky-100/90 px-3.5 py-1 text-xs font-semibold text-blue-800 shadow-sm"
        >
          {HERO.badge}
        </Badge>

        <div className="mx-auto mt-6 max-w-4xl text-center lg:mt-8">
          <h1
            id="hero-heading"
            className="text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[2.75rem] xl:text-[3rem]"
          >
            <span className="block sm:inline">{HERO.titleLine1}</span>{" "}
            <span className="block text-[#1e6fd9] sm:inline">{HERO.titleLine2}</span>
          </h1>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(240px,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-5 xl:gap-10">
          <div className="order-2 flex max-w-lg flex-col gap-5 justify-self-center lg:order-1 lg:justify-self-stretch lg:gap-6">
            <FeatureBlurb icon={Clock}>{HERO.features.leftTop}</FeatureBlurb>
            <FeatureBlurb icon={Shirt} className="lg:translate-y-1">
              {HERO.features.leftBottom}
            </FeatureBlurb>
          </div>

          <div className="relative order-1 flex justify-center lg:order-2">
            <div className="relative aspect-square w-full max-w-[min(100%,380px)] sm:max-w-[420px] lg:max-w-none lg:scale-[1.02] xl:scale-105">
              <Image
                src="/images/laundry-mascot.png"
                alt={HERO.imageAlt}
                fill
                priority
                className="pointer-events-none object-contain drop-shadow-[0_28px_48px_rgba(37,99,235,0.18)]"
                sizes="(max-width: 1024px) 90vw, min(520px, 45vw)"
              />
            </div>
          </div>

          <div className="order-3 flex max-w-lg flex-col gap-6 justify-self-center lg:max-w-none lg:justify-self-stretch">
            <FeatureBlurb icon={ThumbsUp}>{HERO.features.rightTop}</FeatureBlurb>
            <Button
              asChild
              size="lg"
              className="h-14 w-full rounded-full border-0 bg-linear-to-r from-sky-400 via-blue-500 to-blue-600 px-8 text-base font-semibold text-white shadow-[0_14px_36px_-8px_rgba(37,99,235,0.55),0_4px_0_rgba(30,64,175,0.25)] transition-[filter,transform] hover:brightness-[1.03] active:translate-y-0.5 focus-visible:ring-blue-500/40 sm:h-13"
            >
              <Link
                href={HERO.primaryHref}
                className="inline-flex items-center justify-center gap-2.5"
              >
                <Play className="size-[18px] fill-current" aria-hidden />
                {HERO.primaryBtn}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-1 -mt-1 w-full leading-0" aria-hidden>
        <svg
          className="h-14 w-full text-white sm:h-16 md:h-20 lg:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M0,52L60,42C120,32,240,12,360,21.3C480,31,600,61,720,66.7C840,72,960,52,1080,45.3C1200,39,1320,47,1380,50.7L1440,54.7V120H0V52Z"
          />
        </svg>
      </div>
    </section>
  )
}
