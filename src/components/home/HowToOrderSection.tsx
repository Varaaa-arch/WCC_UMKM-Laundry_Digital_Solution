"use client"

import { Store, Truck } from "lucide-react"

import { HOW_TO_ORDER } from "@/lib/constants"

import { useAnimeInView } from "./motion/useAnimeInView"
import { SectionHead } from "./ui/SectionHead"

const CARDS = [
  { icon: Truck, iconBg: "bg-blue-50 text-blue-600", ring: "ring-blue-100", blob: "from-blue-400 to-cyan-300" },
  { icon: Store, iconBg: "bg-violet-50 text-violet-600", ring: "ring-violet-100", blob: "from-violet-400 to-purple-300" },
] as const

export function HowToOrderSection() {
  const gridRef = useAnimeInView<HTMLDivElement>({
    childSelector: "[data-order-card]",
    stagger: 140,
    from: "up",
    delay: 80,
  })

  return (
    <section
      id="pilih-cara"
      className="lb-section scroll-mt-24 bg-[#EEF4FB]"
      aria-labelledby="order-heading"
    >
      <div className="lb-wrap">
        <SectionHead
          id="order-heading"
          eyebrow="Mode layanan"
          title={HOW_TO_ORDER.title}
          description={HOW_TO_ORDER.subtitle}
          align="center"
        />

        <div ref={gridRef} className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {HOW_TO_ORDER.cards.map((card, index) => {
            const meta = CARDS[index] ?? CARDS[0]
            const Icon = meta.icon
            return (
              <article
                key={card.title}
                data-order-card
                className="lb-card lb-card-hover group relative overflow-hidden p-8 opacity-0 sm:p-10"
              >
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-linear-to-br ${meta.blob} opacity-20 blur-2xl`}
                  aria-hidden
                />
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl ring-4 ${meta.iconBg} ${meta.ring}`}
                >
                  <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 sm:text-2xl">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
