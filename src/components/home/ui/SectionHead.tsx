"use client"

import { cn } from "@/lib/utils"

import { useAnimeInView } from "../motion/useAnimeInView"

type SectionHeadProps = {
  eyebrow: string
  title: string
  description?: string
  align?: "left" | "center"
  id?: string
  light?: boolean
}

export function SectionHead({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  light,
}: SectionHeadProps) {
  const ref = useAnimeInView<HTMLDivElement>({
    childSelector: "[data-head-line]",
    stagger: 100,
    from: "up",
  })

  return (
    <div ref={ref} className={cn(align === "center" && "mx-auto max-w-2xl text-center")}>
      <p
        data-head-line
        className={cn("lb-eyebrow lb-anime-hidden opacity-0", light && "text-blue-100")}
      >
        <span className={cn("lb-eyebrow-dot", light && "bg-cyan-300")} />
        {eyebrow}
      </p>
      <h2
        id={id}
        data-head-line
        className={cn(
          "lb-display lb-anime-hidden mt-5 text-[clamp(1.875rem,4.5vw,2.75rem)] opacity-0",
          light ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          data-head-line
          className={cn(
            "lb-lead lb-anime-hidden mt-4 opacity-0",
            align === "center" && "mx-auto",
            light ? "text-blue-100/90" : "text-slate-600"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
