"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Heart, Play, Sparkles } from "lucide-react"
import anime from "animejs"

import { HERO } from "@/lib/constants"
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
        "pointer-events-none absolute rounded-full bg-gradient-to-br from-sky-200/50 via-blue-100/30 to-transparent blur-3xl",
        className
      )}
      aria-hidden
    />
  )
}

function HeroCloudStack({
  cloudWaveSrc,
  floorColor,
}: {
  cloudWaveSrc: string
  floorColor: string
}) {
  return (
    <div
      className="pointer-events-none relative z-[1] mt-[-4.5rem] w-full sm:mt-[-5.5rem] lg:mt-[-6.5rem]"
      aria-hidden
    >
      <div
        className="relative h-[clamp(10rem,22vw,14rem)] w-full overflow-hidden sm:h-[clamp(11rem,24vw,15rem)]"
        style={{ backgroundColor: floorColor }}
      >
        <svg
          className="absolute -top-px left-0 w-full text-sky-200/90"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ height: "4.5rem" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,80 C180,20 360,100 540,55 C720,10 900,90 1080,50 C1260,10 1380,70 1440,45 L1440,120 L0,120 Z"
          />
        </svg>
        <svg
          className="absolute left-0 top-6 w-full text-sky-300/85"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ height: "4.25rem" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,95 C200,40 400,110 620,60 C840,10 1040,100 1240,55 C1340,35 1400,55 1440,40 L1440,120 L0,120 Z"
          />
        </svg>
        <svg
          className="absolute left-0 top-10 w-full text-[#7eb8ea]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={{ height: "4rem" }}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,105 C240,55 480,115 720,70 C960,25 1200,95 1440,60 L1440,120 L0,120 Z"
          />
        </svg>
        <div className="absolute inset-x-0 bottom-0 top-14 bg-gradient-to-b from-transparent via-sky-300/20 to-sky-400/25" />
        <Image
          src={cloudWaveSrc}
          alt=""
          fill
          className="object-cover object-top mix-blend-soft-light opacity-90"
          sizes="100vw"
        />
      </div>
      <div className="h-3 w-full bg-white sm:h-4" />
    </div>
  )
}

function FeatureCard({
  iconSrc,
  children,
  rotateClass,
}: {
  iconSrc: string
  children: React.ReactNode
  rotateClass: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "relative max-w-[17.5rem] rounded-3xl border border-white/75 bg-white/70 p-3.5 shadow-[0_20px_50px_rgba(15,55,120,0.07)] backdrop-blur-md sm:p-4",
        rotateClass
      )}
      whileHover={
        reduce
          ? undefined
          : {
              y: -4,
              rotate: 0,
              boxShadow: "0 28px 60px rgba(15, 55, 120, 0.12)",
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }
      }
    >
      <div className="flex items-start gap-3 sm:gap-3.5">
        <div className="relative size-12 shrink-0 sm:size-14">
          <Image src={iconSrc} alt="" fill className="object-contain drop-shadow-sm" sizes="56px" />
        </div>
        <p className="text-[0.8125rem] leading-snug text-[#2a4a63] sm:text-sm sm:leading-relaxed">
          {children}
        </p>
      </div>
    </motion.div>
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
        <Heart className="size-4 fill-sky-400 stroke-sky-500 sm:size-[1.125rem]" aria-hidden />
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
  const assets = HERO.assets
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
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#eef6ff]"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(148 197 255 / 0.22) 1px, transparent 0)`,
          backgroundSize: "44px 44px",
        }}
        aria-hidden
      />
      <SoftBlob className="-left-24 top-10 size-[min(85vw,28rem)] sm:-left-16" />
      <SoftBlob className="-right-20 top-32 size-[min(80vw,24rem)] opacity-80 sm:right-0" />
      <div
        className="pointer-events-none absolute inset-x-0 top-[18%] h-px max-w-3xl bg-gradient-to-r from-transparent via-sky-300/40 to-transparent blur-sm"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-[1200px] flex-col px-4 pb-0 pt-[5.25rem] sm:px-6 sm:pt-[5.75rem] lg:max-w-[1280px] lg:px-8 lg:pt-24">
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
          className="mx-auto w-full max-w-[56rem] text-center"
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
            <span className="mt-1 block bg-gradient-to-r from-[#1e8ef7] via-[#3db0ff] to-[#6bc9ff] bg-clip-text text-transparent sm:mt-1.5">
              {HERO.titleLine2}
            </span>
          </motion.h1>
        </motion.div>

        <motion.div className="relative mt-5 flex flex-1 flex-col lg:mt-6">
          <motion.div
            className="grid flex-1 grid-cols-1 items-end gap-y-5 pb-2 pt-2 lg:grid-cols-[minmax(0,1fr)_minmax(260px,420px)_minmax(0,1fr)] lg:gap-x-3 lg:gap-y-0 lg:pb-3 xl:gap-x-5"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={staggerIn}
              className="order-2 flex flex-col items-center gap-3.5 lg:order-1 lg:items-end lg:justify-end lg:gap-3 lg:pb-6 xl:pb-10"
            >
              <FeatureCard iconSrc={assets.iconClock} rotateClass="-rotate-[2.5deg] lg:mr-1">
                {HERO.features.leftTop}
              </FeatureCard>
              <FeatureCard iconSrc={assets.iconShirt} rotateClass="rotate-[2deg] lg:mr-0">
                {HERO.features.leftBottom}
              </FeatureCard>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative z-20 order-1 flex justify-center lg:order-2 lg:pb-0"
            >
              <div
                ref={mascotZoneRef}
                className="relative w-[min(92vw,22rem)] sm:w-[min(88vw,26rem)] lg:w-[min(100%,24.5rem)] xl:w-[27.5rem]"
              >
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
                    className="object-contain drop-shadow-[0_28px_60px_rgba(25,100,180,0.22)]"
                    sizes="(max-width: 1024px) 92vw, 440px"
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={staggerIn}
              className="order-3 flex flex-col items-center gap-3.5 lg:items-start lg:justify-end lg:gap-3 lg:pb-6 lg:pl-1 xl:pb-10"
            >
              <FeatureCard iconSrc={assets.iconThumbs} rotateClass="-rotate-[1.5deg] lg:ml-0">
                {HERO.features.rightTop}
              </FeatureCard>
              <motion.div
                variants={fadeUp}
                className="w-full max-w-[17.5rem] lg:ml-0.5"
                whileHover={reduce ? undefined : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
              >
                <Link
                  href={HERO.primaryHref}
                  className={cn(
                    "relative flex h-[3.35rem] w-full items-center justify-center gap-2.5 overflow-hidden rounded-full",
                    "bg-gradient-to-r from-[#38a7f0] via-[#1e8ef7] to-[#1570c7]",
                    "text-[0.9375rem] font-bold text-white shadow-[0_14px_40px_-8px_rgba(30,120,220,0.55),0_0_0_1px_rgba(255,255,255,0.12)_inset]",
                    "transition-[filter,box-shadow] duration-300",
                    "hover:shadow-[0_18px_48px_-6px_rgba(30,120,220,0.65),0_0_32px_rgba(56,167,240,0.35)]",
                    "hover:brightness-[1.03] active:scale-[0.99]"
                  )}
                >
                  <span
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-60"
                    aria-hidden
                  />
                  <Play className="relative size-4 shrink-0 fill-current" aria-hidden />
                  <span className="relative">{HERO.primaryBtn}</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <HeroCloudStack cloudWaveSrc={assets.cloudWave} floorColor={HERO.cloudFloorColor} />
      </div>
    </section>
  )
}
