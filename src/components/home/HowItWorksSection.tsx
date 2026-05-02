import { BadgeCheck, ClipboardList, Shirt, Warehouse } from "lucide-react"

import { HOW_IT_WORKS } from "@/lib/constants"

const STEP_ICONS = [ClipboardList, Warehouse, Shirt, BadgeCheck] as const

export function HowItWorksSection() {
  const steps = HOW_IT_WORKS.steps

  return (
    <section
      className="border-t border-slate-50 bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="how-it-works-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[2rem]"
          >
            {HOW_IT_WORKS.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            {HOW_IT_WORKS.subtitle}
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[10%] right-[10%] top-[3.875rem] z-0 hidden h-px border-t border-dashed border-blue-300 md:block lg:left-[13%] lg:right-[13%]"
          />

          <ol className="relative z-10 flex flex-col gap-14 md:flex-row md:flex-nowrap md:justify-between md:gap-8 lg:gap-10 xl:gap-12">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index] ?? ClipboardList

              return (
                <li
                  key={`${step.n}-${step.title}`}
                  className="relative flex flex-1 md:block"
                >
                  {index > 0 ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute left-[calc(1.75rem_-_1px)] top-[-2.875rem] h-[2.875rem] w-px border-l border-dashed border-blue-300 md:hidden"
                    />
                  ) : null}

                  <div className="relative flex gap-6 md:flex-col md:items-center md:text-center md:leading-snug">
                    <div className="flex shrink-0 flex-col items-center gap-2 md:gap-3">
                      <Icon
                        className="relative z-10 size-9 shrink-0 text-blue-500 sm:size-10"
                        strokeWidth={1.85}
                        aria-hidden
                      />
                      <span className="relative z-10 flex size-11 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold tabular-nums text-white shadow-sm ring-6 ring-white">
                        {step.n}
                      </span>
                    </div>

                    <div className="pt-10 md:w-full md:pt-24">
                      <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600 md:mx-auto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
