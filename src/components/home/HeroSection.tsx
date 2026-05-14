"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Heart, Play, Sparkles } from "lucide-react"
import anime from "animejs"

import { HERO, HOW_TO_ORDER } from "@/lib/constants"
import { cn } from "@/lib/utils"

const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.06,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOutExpo },
  },
}

const staggerIn = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.04,
    },
  },
}

function SoftBlob({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full bg-linear-to-br from-sky-200/50 via-blue-100/30 to-transparent blur-3xl",
        className
      )}
      aria-hidden
    />
  )
}

/** Awan samar di bagian atas langit (studio / mockup). */
function FaintSkyClouds() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[min(42%,20rem)] overflow-hidden" aria-hidden>
      <div className="absolute -left-10 top-6 h-24 w-[min(55vw,22rem)] rounded-full bg-white/35 blur-2xl sm:top-10 sm:h-28" />
      <div className="absolute left-[18%] top-2 h-16 w-[min(40vw,16rem)] rounded-full bg-white/25 blur-xl" />
      <div className="absolute right-[5%] top-10 h-20 w-[min(48vw,18rem)] rounded-full bg-sky-100/40 blur-2xl sm:right-[8%]" />
      <div className="absolute right-[22%] top-0 h-14 w-40 rounded-full bg-white/30 blur-xl" />
    </div>
  )
}

/** Dua lapisan awan (biru + putih), scallop bulat ala kartun — tanpa gambar. */
function HeroCloudStack({ floorColor }: { floorColor: string }) {
  const vb = "0 0 1440 160"
  const blueScallop =
    "M0,160 L0,96 Q72,34 144,96 Q216,52 288,96 Q360,38 432,96 Q504,58 576,96 Q648,42 720,96 Q792,56 864,96 Q936,40 1008,96 Q1080,54 1152,96 Q1224,44 1296,96 Q1368,50 1440,92 L1440,160 L0,160 Z"
  const whiteScallop =
    "M0,160 L0,118 Q96,72 192,118 Q288,86 384,116 Q480,70 576,118 Q672,88 768,114 Q864,76 960,118 Q1056,90 1152,116 Q1248,74 1344,118 Q1392,96 1440,108 L1440,160 L0,160 Z"

  return (
    <div
      className="pointer-events-none relative z-1 mt-10 w-full sm:mt-14 lg:mt-18"
      aria-hidden
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(9.5rem, 18vw, 13rem)" }}
      >
        <svg
          className="absolute inset-x-0 bottom-0 z-[1] h-full w-full"
          viewBox={vb}
          preserveAspectRatio="none"
        >
          <path fill={floorColor} d={blueScallop} />
        </svg>
        <svg
          className="absolute inset-x-0 bottom-0 z-[2] h-[54%] w-full text-white sm:h-[52%]"
          viewBox={vb}
          preserveAspectRatio="none"
        >
          <path fill="currentColor" d={whiteScallop} />
        </svg>
      </div>
      <div className="h-3 w-full bg-white sm:h-4" />
    </div>
  )
}

function FloatingParticles({ rootRef }: { rootRef: React.RefObject<HTMLElement | null> }) {
  const reduce = useReducedMotion()

  React.useEffect(() => {
    if (reduce) return
    const root = rootRef.current
    if (!root) return
    const nodes = root.querySelectorAll<HTMLElement>("[data-hero-float]")
    if (!nodes.length) return

    const anim = anime({
      targets: nodes,
      translateY: [0, -10],
      duration: 4200,
      direction: "alternate",
      loop: true,
      easing: "easeInOutSine",
      delay: anime.stagger(520, { start: 200 }),
    })

    return () => {
      anim.pause()
    }
  }, [reduce, rootRef])

  return (
    <>
      <span
        data-hero-float
        className="absolute left-[6%] top-[32%] flex size-9 items-center justify-center rounded-full bg-white/80 text-sky-500 shadow-md backdrop-blur-sm sm:left-[8%] sm:top-[28%] sm:size-10"
      >
        <Heart className="size-4 fill-sky-400 stroke-sky-500 sm:size-4.5" aria-hidden />
      </span>
      <span
        data-hero-float
        className="absolute right-[7%] top-[36%] flex size-8 items-center justify-center rounded-full bg-sky-100/90 text-sky-600 shadow-md backdrop-blur-sm sm:right-[10%] sm:top-[30%] sm:size-9"
      >
        <Sparkles className="size-3.5 sm:size-4" aria-hidden />
      </span>
      <span
        data-hero-float
        className="absolute left-[18%] bottom-[18%] size-3 rounded-full bg-sky-300/80 shadow sm:size-3.5"
      />
      <span
        data-hero-float
        className="absolute right-[20%] bottom-[22%] size-2.5 rounded-full bg-blue-200/90 shadow sm:size-3"
      />
      <span
        data-hero-float
        className="absolute right-[4%] top-[48%] hidden size-7 rounded-full border border-white/80 bg-white/65 text-sky-400 shadow backdrop-blur sm:flex sm:items-center sm:justify-center"
      >
        <Heart className="size-3.5 fill-none stroke-current" aria-hidden />
      </span>
    </>
  )
}

export function HeroSection() {
  const reduce = useReducedMotion()
  const mascotZoneRef = React.useRef<HTMLDivElement>(null)

  const mascotFloat = reduce
    ? {}
    : {
        y: [0, -9, 0],
        transition: {
          duration: 5.2,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      }

  return (
    <section
      className={cn(
        "relative isolate min-h-[90dvh] overflow-hidden lg:min-h-dvh",
        "bg-linear-to-b from-[#f5fbff] via-[#e8f3fc] to-[#dceefe]"
      )}
      aria-labelledby="hero-heading"
    >
      <FaintSkyClouds />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 197 255 / 0.2) 1px, transparent 0)`,
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      <SoftBlob className="-left-24 top-10 size-[min(85vw,28rem)] sm:-left-16" />
      <SoftBlob className="-right-20 top-32 size-[min(80vw,24rem)] opacity-80 sm:right-0" />
      <div
        className="pointer-events-none absolute inset-x-0 top-[18%] h-px max-w-3xl bg-linear-to-r from-transparent via-sky-300/40 to-transparent blur-sm"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-[1200px] flex-col px-4 pb-0 pt-6 sm:px-6 sm:pt-8 lg:max-w-[1280px] lg:px-8 lg:pt-10">
        <motion.div
          className="mb-4 flex justify-center sm:mb-5"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center rounded-full border border-sky-200/80 bg-white/80 px-3.5 py-1.5 text-[0.6875rem] font-semibold tracking-wide text-[#0d4a8c] shadow-sm backdrop-blur-md sm:text-xs"
          >
            {HERO.badge}
          </motion.span>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            id="hero-heading"
            variants={fadeUp}
            className="font-[family-name:var(--font-hero-display),system-ui,sans-serif] text-[clamp(2.15rem,6.5vw,3.85rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0a2540]"
          >
            <span className="block">{HERO.titleLine1}</span>
            <span className="mt-1 block bg-linear-to-r from-[#1e8ef7] via-[#3db0ff] to-[#6bc9ff] bg-clip-text text-transparent sm:mt-1.5">
              {HERO.titleLine2}
            </span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="relative mt-5 flex flex-1 flex-col lg:mt-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={staggerIn}
            className="grid grid-cols-1 gap-5 pb-1 pt-2 sm:gap-6 lg:grid-cols-3 lg:items-start lg:gap-6 lg:pb-2"
          >
            <motion.p
              variants={fadeUp}
              className="max-w-xl text-left text-sm leading-relaxed text-[#2a4a63] sm:text-[0.9375rem] lg:col-start-1 lg:row-start-1 lg:max-w-md lg:pt-1"
            >
              {HERO.features.leftBottom}
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="lg:col-start-3 lg:row-start-1 lg:flex lg:justify-end"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 24 }}
            >
              <Link
                href={HERO.primaryHref}
                className={cn(
                  "relative flex h-[3.35rem] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full sm:max-w-none",
                  "max-w-70 lg:min-w-[12.5rem] lg:max-w-70",
                  "bg-linear-to-r from-[#38a7f0] via-[#1e8ef7] to-[#1570c7]",
                  "text-[0.9375rem] font-bold text-white shadow-[0_14px_40px_-8px_rgba(30,120,220,0.55),0_0_0_1px_rgba(255,255,255,0.12)_inset]",
                  "transition-[filter,box-shadow] duration-300",
                  "hover:shadow-[0_18px_48px_-6px_rgba(30,120,220,0.65),0_0_32px_rgba(56,167,240,0.35)]",
                  "hover:brightness-[1.03] active:scale-[0.99]"
                )}
              >
                <span
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/10 to-transparent opacity-60"
                  aria-hidden
                />
                <Play className="relative size-4 shrink-0 fill-current" aria-hidden />
                <span className="relative">{HERO.primaryBtn}</span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative z-20 mx-auto flex w-full max-w-[min(92vw,26rem)] justify-center sm:max-w-[min(88vw,28rem)] lg:max-w-none lg:w-[min(100%,24.5rem)] xl:w-110"
          >
            <div ref={mascotZoneRef} className="relative w-full">
              <FloatingParticles rootRef={mascotZoneRef} />
              <motion.div
                className="relative mx-auto aspect-square w-[88%] sm:w-[90%]"
                animate={mascotFloat}
              >
                <Image
                  src="/images/laundry-mascot.png"
                  alt={HERO.imageAlt}
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_28px_60px_rgba(25,100,180,0.22)]"
                  sizes="(max-width: 1024px) 92vw, 440px"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <HeroCloudStack floorColor={HERO.cloudFloorColor} />

        <div
          id="pilih-cara"
          className="scroll-mt-24 bg-white px-4 pb-6 pt-10 sm:px-6 sm:pb-8 sm:pt-12 lg:px-8 lg:pb-10 lg:pt-14"
        >
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
        </div>
      </div>
    </section>
  )
}
