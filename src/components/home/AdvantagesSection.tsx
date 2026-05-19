"use client"

import type { LucideIcon } from "lucide-react"
import { Calendar, ShieldCheck, Zap } from "lucide-react"

import { ADVANTAGES } from "@/lib/constants"

import { useAnimeInView } from "./motion/useAnimeInView"

const ICONS: LucideIcon[] = [Zap, ShieldCheck, Calendar]
const ACCENTS = ["text-amber-500 bg-amber-50", "text-emerald-600 bg-emerald-50", "text-cyan-600 bg-cyan-50"]

export function AdvantagesSection() {
  const gridRef = useAnimeInView<HTMLDivElement>({
    childSelector: "[data-adv-card]",
    stagger: 110,
    from: "up",
  })

  const [first, second, third] = ADVANTAGES.features

  return (
    <section className="lb-section bg-white" aria-labelledby="advantages-heading">
      <div className="lb-wrap">
        <div ref={gridRef} className="grid gap-4 sm:grid-cols-2">
          <article
            data-adv-card
            className="relative overflow-hidden rounded-(--lb-radius-lg) bg-blue-500 p-8 text-white shadow-[0_20px_50px_-24px_rgba(37,99,235,0.65)] opacity-0 sm:col-span-2 sm:p-10"
          >
            <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-cyan-300/30 blur-2xl" aria-hidden />
            <p className="text-xs font-bold uppercase tracking-widest text-blue-100">LummyBlue</p>
            <h2 id="advantages-heading" className="mt-3 text-2xl font-bold">{ADVANTAGES.mainTitle}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-blue-50">{ADVANTAGES.mainDescription}</p>
          </article>

          {first ? <FeatureCard icon={ICONS[0]} accent={ACCENTS[0]} title={first.title} body={first.description} /> : null}
          {second ? <FeatureCard icon={ICONS[1]} accent={ACCENTS[1]} title={second.title} body={second.description} /> : null}
          {third ? <FeatureCard icon={ICONS[2]} accent={ACCENTS[2]} title={third.title} body={third.description} wide /> : null}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  accent,
  wide,
}: {
  icon: LucideIcon
  title: string
  body: string
  accent: string
  wide?: boolean
}) {
  return (
    <article
      data-adv-card
      className={`lb-card-hover flex h-full flex-col p-7 opacity-0 sm:p-8 rounded-(--lb-radius-lg) bg-[#EEF4FB] border border-blue-100 ${wide ? "sm:col-span-2" : ""}`}
    >
      <div className={`flex size-12 items-center justify-center rounded-xl ${accent}`}>
        <Icon className="size-6" strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{body}</p>
    </article>
  )
}
