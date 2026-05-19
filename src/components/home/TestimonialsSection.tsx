"use client"

import Image from "next/image"
import { Star } from "lucide-react"

import { TESTIMONIALS } from "@/lib/constants"

import { useAnimeInView } from "./motion/useAnimeInView"
import { SectionHead } from "./ui/SectionHead"

export function TestimonialsSection() {
  const [featured, ...rest] = TESTIMONIALS.items
  const layoutRef = useAnimeInView<HTMLDivElement>({
    childSelector: "[data-quote]",
    stagger: 130,
    from: "up",
    delay: 60,
  })

  return (
    <section className="lb-section bg-white" aria-labelledby="voices-heading">
      <div className="lb-wrap">
        <SectionHead
          id="voices-heading"
          eyebrow="Testimoni"
          title={TESTIMONIALS.title}
          align="center"
        />

        <div ref={layoutRef} className="mt-14 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {featured ? (
            <blockquote
              data-quote
              className="relative flex min-h-72 flex-col justify-between overflow-hidden rounded-(--lb-radius-lg) bg-linear-to-br from-blue-600 via-blue-500 to-cyan-400 p-8 text-white opacity-0 shadow-xl lg:col-span-7 sm:p-10"
            >
              <div className="flex gap-1" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <p className="mt-6 text-lg font-medium leading-relaxed text-white/95 sm:text-xl">
                &ldquo;{featured.text}&rdquo;
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <Portrait src={featured.portraitSrc} name={featured.name} large />
                <cite className="not-italic">
                  <span className="block font-semibold">{featured.name}</span>
                  <span className="block text-sm text-blue-100">{featured.role}</span>
                </cite>
              </footer>
            </blockquote>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {rest.map((item) => (
              <CompactQuote key={item.name} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type Item = (typeof TESTIMONIALS.items)[number]

function CompactQuote({ item }: { item: Item }) {
  return (
    <blockquote data-quote className="lb-card-hover flex h-full flex-col p-6 opacity-0 sm:p-7 rounded-((--lb-radius-lg) bg-[#EEF4FB] border border-blue-100">
      <div className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm italic leading-relaxed text-slate-700">
        &ldquo;{item.text}&rdquo;
      </p>
      <footer className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <Portrait src={item.portraitSrc} name={item.name} />
        <cite className="not-italic">
          <span className="block text-sm font-bold text-slate-900">{item.name}</span>
          <span className="block text-xs text-slate-500">{item.role}</span>
        </cite>
      </footer>
    </blockquote>
  )
}

function Portrait({ src, name, large }: { src: string; name: string; large?: boolean }) {
  return (
    <div
      className={
        large
          ? "relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white/40"
          : "relative size-10 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-100"
      }
    >
      <Image src={src} alt={name} fill className="object-cover" sizes={large ? "56px" : "40px"} />
    </div>
  )
}
