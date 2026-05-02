import Image from "next/image"
import { Star } from "lucide-react"

import { TESTIMONIALS } from "@/lib/constants"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

export function TestimonialsSection() {
  const items = TESTIMONIALS.items

  return (
    <section
      className="py-16 sm:py-20 lg:py-24"
      style={{ background: "linear-gradient(135deg, #EEF6FD 0%, #E9F2F9 40%, #E3F0FA 75%, #DCEBFA 100%)" }}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="testimonials-heading"
          className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]"
        >
          {TESTIMONIALS.title}
        </h2>

        <div className="mx-auto mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {items.map((item) => {
            const avatarSrc = item.avatarAlt.startsWith("/")
              ? item.avatarAlt
              : "/placeholder.svg"

            return (
              <Card
                key={item.name}
                className="h-full border-none bg-white/95 pb-6 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.15)] ring-1 ring-blue-500/15"
              >
              <CardHeader className="space-y-0 px-7 pb-0 pt-7">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, ratingIndex) => (
                    <Star
                      key={ratingIndex}
                      className="size-[18px] shrink-0 fill-yellow-400 text-yellow-400"
                      aria-hidden
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-7 pt-5 pb-2">
                <p className="text-sm leading-relaxed text-slate-700 italic">{item.text}</p>
              </CardContent>
                <CardFooter className="gap-4 border-none bg-transparent px-7 pb-7 pt-4">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-sky-100 ring-[3px] ring-white">
                    <Image
                      src={avatarSrc}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.role}</p>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
