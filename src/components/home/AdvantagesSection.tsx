import type { LucideIcon } from "lucide-react"
import { Calendar, ShieldCheck, Zap } from "lucide-react"

import { ADVANTAGES } from "@/lib/constants"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const FEATURE_ICONS: [LucideIcon, LucideIcon, LucideIcon] = [
  Zap,
  ShieldCheck,
  Calendar,
]

export function AdvantagesSection() {
  const [f1, f2, f3] = ADVANTAGES.features

  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(135deg, #EEF6FD 0%, #E9F2F9 40%, #E3F0FA 75%, #DCEBFA 100%)" }}
      aria-labelledby="advantages-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="advantages-heading" className="sr-only">
          {ADVANTAGES.mainTitle}
        </h2>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="border-none bg-blue-500 text-white shadow-[0_20px_50px_-28px_rgba(37,99,235,0.75)]">
            <CardHeader className="px-10 pb-4 pt-10">
              <CardTitle className="text-4xl font-bold leading-tight text-white sm:text-[2.6rem]">
                {ADVANTAGES.mainTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-10 pb-10">
              <p className="text-lg leading-relaxed text-blue-50">
                {ADVANTAGES.mainDescription}
              </p>
            </CardContent>
          </Card>

          {f1 && (
            <TopFeatureCard
              icon={FEATURE_ICONS[0]}
              title={f1.title}
              description={f1.description}
            />
          )}
          {f2 && (
            <TopFeatureCard
              icon={FEATURE_ICONS[1]}
              title={f2.title}
              description={f2.description}
            />
          )}
          {f3 && (
            <BottomFeatureCard
              className="lg:col-span-3"
              icon={FEATURE_ICONS[2]}
              title={f3.title}
              description={f3.description}
            />
          )}
        </div>
      </div>
    </section>
  )
}

function TopFeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <Card className="h-full border border-sky-100 bg-white shadow-none">
      <CardHeader className="flex flex-col items-center px-10 pb-3 pt-10 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-sky-50 text-blue-600">
          <Icon className="size-10 shrink-0" aria-hidden />
        </div>
        <CardTitle className="w-full pt-3 text-center text-[2rem] font-bold text-slate-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-10 pb-10 text-center">
        <p className="text-lg leading-relaxed text-slate-700">{description}</p>
      </CardContent>
    </Card>
  )
}

function BottomFeatureCard({
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
    <Card className={cn("border border-sky-100 bg-white shadow-none", className)}>
      <CardContent className="flex flex-col gap-5 px-10 py-10 sm:flex-row sm:items-center sm:gap-7">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-sky-50 text-blue-600">
          <Icon className="size-8 shrink-0" aria-hidden />
        </div>
        <div>
          <h3 className="text-[2rem] font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-lg leading-relaxed text-slate-700">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
