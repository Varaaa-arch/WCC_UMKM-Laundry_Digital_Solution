import type { LucideIcon } from "lucide-react"
import { Calendar, ShieldCheck, Sparkles, Zap } from "lucide-react"

import { ADVANTAGES } from "@/lib/constants"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const FEATURE_ICONS: [LucideIcon, LucideIcon, LucideIcon, LucideIcon] = [
  Zap,
  ShieldCheck,
  Calendar,
  Sparkles,
]

export function AdvantagesSection() {
  const [f1, f2, f3, f4] = ADVANTAGES.features

  return (
    <section
      className="bg-sky-50/70 py-16 sm:py-20 lg:py-24"
      aria-labelledby="advantages-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr] lg:items-stretch xl:gap-8">
          <Card className="border-none bg-blue-500 px-2 py-2 text-white shadow-[0_20px_50px_-28px_rgba(37,99,235,0.75)] lg:max-w-none">
            <CardHeader className="px-6 pb-4 pt-8">
              <h2
                id="advantages-heading"
                className="text-3xl font-bold leading-tight sm:text-[2rem]"
              >
                {ADVANTAGES.mainTitle}
              </h2>
            </CardHeader>
            <CardContent className="px-6 pb-8">
              <p className="text-base leading-relaxed text-blue-50 sm:text-[1.0625rem]">
                {ADVANTAGES.mainDescription}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 self-stretch md:grid-cols-2 lg:flex-1">
            <MiniFeatureCard
              icon={FEATURE_ICONS[0]}
              title={f1.title}
              description={f1.description}
            />
            <MiniFeatureCard
              icon={FEATURE_ICONS[1]}
              title={f2.title}
              description={f2.description}
            />
            <MiniFeatureCard
              icon={FEATURE_ICONS[2]}
              title={f3.title}
              description={f3.description}
            />
            <MiniFeatureCard
              icon={FEATURE_ICONS[3]}
              title={f4.title}
              description={f4.description}
              className="md:col-span-2"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function MiniFeatureCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon
  title: string
  description: string
  className?: string
}) {
  return (
    <Card
      className={cn(
        "h-full border-none shadow-[0_8px_30px_-12px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/80",
        className
      )}
    >
      <CardHeader className="flex flex-row gap-4 pb-2">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white">
          <Icon className="size-5 shrink-0" aria-hidden />
        </div>
        <CardTitle className="self-center pt-1 text-lg font-bold text-slate-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}
