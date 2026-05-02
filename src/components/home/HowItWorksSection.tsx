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

        <ol className="relative z-10 mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? ClipboardList
            return (
              <li
                key={`${step.n}-${step.title}`}
                className="flex flex-col items-center text-center p-8"
                style={{
                  background: "linear-gradient(135deg, #EEF6FD 0%, #E9F2F9 40%, #E3F0FA 75%, #DCEBFA 100%)",
                  borderRadius: "32px",
                }}
              >
                <div className="flex size-12 items-center justify-center rounded-full mb-4" style={{ background: "linear-gradient(135deg, #EEF6FD 0%, #E9F2F9 40%, #E3F0FA 75%, #DCEBFA 100%)" }}>
                  <Icon className="size-7 text-blue-500" strokeWidth={1.85} aria-hidden />
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
