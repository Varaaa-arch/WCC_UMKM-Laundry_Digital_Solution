import Link from "next/link"
import { ArrowRight, Store, Truck } from "lucide-react"

import { HOW_TO_ORDER } from "@/lib/constants"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CARD_ICONS = [Truck, Store] as const

type HowToOrderSectionProps = {
  /** When true, title/subtitle render in {@link HeroSection} instead; this section shows cards only. */
  hideHeader?: boolean
}

export function HowToOrderSection({ hideHeader = false }: HowToOrderSectionProps) {
  return (
    <section
      id={hideHeader ? undefined : "pilih-cara"}
      className={cn(
        "scroll-mt-24 bg-white",
        hideHeader
          ? "border-t-0 py-6 sm:py-8 lg:py-10"
          : "border-t border-slate-50 py-16 sm:py-20 lg:py-24"
      )}
      aria-labelledby="how-to-order-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {!hideHeader ? (
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="how-to-order-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]"
            >
              {HOW_TO_ORDER.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              {HOW_TO_ORDER.subtitle}
            </p>
          </div>
        ) : null}

        <div className={cn("grid gap-6 md:grid-cols-2 md:gap-8", hideHeader ? "mt-0" : "mt-12 lg:mt-14")}>
          {HOW_TO_ORDER.cards.map((card, index) => {
            const Icon = CARD_ICONS[index] ?? Truck
            return (
              <Card
                key={card.title}
                className="border-none shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80"
              >
                <CardHeader className="pb-3">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-sky-100 text-blue-600">
                    <Icon className="size-7 shrink-0" aria-hidden />
                  </div>
                  <CardTitle className="mt-6 text-xl font-bold text-slate-900">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {card.description}
                  </p>
                </CardContent>
                <CardFooter className="border-none bg-transparent px-4 pb-6 pt-0">
                  <Link
                    href={card.href}
                    aria-label={card.linkAria}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {card.linkLabel}
                    <ArrowRight className="size-4 shrink-0" aria-hidden />
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
