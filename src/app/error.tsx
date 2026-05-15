"use client"

import { useEffect } from "react"

import { BubbleButton } from "@/components/ui/bubble-button"

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white px-6 py-24 text-center text-slate-900">
      <div className="max-w-lg space-y-3">
        <h1 className="text-xl font-semibold">[ERROR_TITLE]</h1>
        <p className="text-sm leading-relaxed text-slate-600">[ERROR_DESCRIPTION]</p>
      </div>
      <BubbleButton type="button" onClick={() => reset()} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
        [ERROR_TRY_AGAIN]
      </BubbleButton>
    </main>
  )
}
