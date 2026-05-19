"use client"

import type { LucideIcon } from "lucide-react"
import { BadgeCheck, ClipboardList, Shirt, Warehouse } from "lucide-react"
import { useEffect, useRef } from "react"
import anime from "animejs"
import { useReducedMotion } from "framer-motion"

import { HOW_IT_WORKS } from "@/lib/constants"

import { useAnimeInView } from "./motion/useAnimeInView"
import { SectionHead } from "./ui/SectionHead"

const STEP_ICONS: LucideIcon[] = [ClipboardList, Warehouse, Shirt, BadgeCheck]

export function HowItWorksSection() {
  const reduce = useReducedMotion()
  const lineRef = useRef<HTMLDivElement>(null)
  const gridRef = useAnimeInView<HTMLDivElement>({
    childSelector: "[data-step-card]",
    stagger: 100,
    from: "up",
  })

  useEffect(() => {
    if (reduce || !lineRef.current) return
    const el = lineRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: el,
            scaleX: [0, 1],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 1400,
            delay: 200,
          })
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduce])

  return (
    <section className="lb-section bg-[#EEF4FB]" aria-labelledby="process-heading">
      <div className="lb-wrap">
        <SectionHead
          id="process-heading"
          eyebrow="Alur kerja"
          title={HOW_IT_WORKS.title}
          description={HOW_IT_WORKS.subtitle}
          align="center"
        />

        <div className="relative mt-14 lg:mt-16">
          <div
            ref={lineRef}
            className="absolute top-9 right-[8%] left-[8%] hidden h-0.5 origin-left bg-linear-to-r from-blue-200 via-blue-400 to-cyan-300 opacity-0 lg:block"
            aria-hidden
          />
          <div
            ref={gridRef}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          >
            {HOW_IT_WORKS.steps.map((step, index) => (
              <StepCard key={step.n} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

type Step = (typeof HOW_IT_WORKS.steps)[number]

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = STEP_ICONS[index] ?? ClipboardList

  return (
    <article
      data-step-card
      className="bg-white rounded-(--lb-radius-lg) p-6 text-center opacity-0 sm:p-7 lg:text-center shadow-sm border border-blue-50"
    >
      <div className="relative mx-auto w-fit">
        <div className="flex size-14 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-blue-100">
          <Icon className="size-6 text-blue-500" strokeWidth={1.75} aria-hidden />
          <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-cyan-400 text-[0.625rem] font-bold text-white">
            {step.n}
          </span>
        </div>
      </div>
      <h3 className="mt-5 font-bold text-slate-900">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
    </article>
  )
}
