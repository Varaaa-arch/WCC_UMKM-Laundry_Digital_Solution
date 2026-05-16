"use client"

import React, { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { signIn } from '@/actions/auth-action'
import { signInWithOAuth } from '@/lib/oauth'

function useBlink() {
  const [isBlinking, setIsBlinking] = useState(false)
  React.useEffect(() => {
    const schedule = () => {
      const delay = 2000 + Math.random() * 3000
      return setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => { setIsBlinking(false); schedule() }, 180)
      }, delay)
    }
    const t = schedule()
    return () => clearTimeout(t)
  }, [])
  return isBlinking
}

const item = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } }
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const isBlinking = useBlink()

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await signIn(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT */}
        <div className="hidden md:flex w-1/2 bg-linear-to-br from-blue-500 to-blue-700 flex-col items-center justify-center relative overflow-hidden p-10">
          <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 bg-white/10 rounded-full" />
          <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
            <div className="relative w-[220px] h-[220px]">
              <Image src="/images/animation/mascot-melek.png" alt="Mascot" width={220} height={220} className="object-contain drop-shadow-2xl" priority />
              <motion.div className="absolute inset-0" animate={{ opacity: isBlinking ? 1 : 0 }} transition={{ duration: 0.06 }}>
                <Image src="/images/animation/mascot-merem.png" alt="Mascot Blink" width={220} height={220} className="object-contain drop-shadow-2xl" />
              </motion.div>
            </div>
          </motion.div>
          <motion.div animate={{ scaleX: [1, 0.8, 1], opacity: [0.3, 0.15, 0.3] }} transition={{ duration: 3.5, repeat: Infinity }} className="w-32 h-4 bg-black/20 rounded-full blur-md mt-2 relative z-10" />
          <div className="mt-8 text-center relative z-10">
            <h2 className="text-white text-2xl font-bold">ResikLaundry</h2>
            <p className="text-blue-100 text-sm mt-1">Laundry premium untuk kamu ✨</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 py-12">
          <motion.div variants={item(0)} initial="hidden" animate="visible" className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
          </motion.div>

          <motion.div variants={item(1)} initial="hidden" animate="visible" className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-500 mt-1 text-sm">Masuk ke akun ResikLaundry kamu</p>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div variants={item(2)} initial="hidden" animate="visible">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" type="email" required placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" />
            </motion.div>

            <motion.div variants={item(3)} initial="hidden" animate="visible">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500 text-center">
                {error}
              </motion.p>
            )}

            <motion.div variants={item(4)} initial="hidden" animate="visible">
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 transition-all text-sm">
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.div key="load" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </motion.div>
                  ) : (
                    <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      Masuk <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>

          <motion.div variants={item(5)} initial="hidden" animate="visible" className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-gray-200" />
            <span className="text-xs text-gray-400">atau</span>
            <div className="flex-1 border-t border-gray-200" />
          </motion.div>

          <motion.div variants={item(6)} initial="hidden" animate="visible" className="flex gap-3">
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="button"
              onClick={() => signInWithOAuth("google")}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </motion.button>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} type="button"
              onClick={() => signInWithOAuth("discord")}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium">
              <svg className="w-5 h-5 text-[#5865F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
              Discord
            </motion.button>
          </motion.div>

          <motion.p variants={item(7)} initial="hidden" animate="visible" className="text-center text-sm text-gray-500 mt-6">
            Belum punya akun?{' '}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">Daftar</a>
          </motion.p>        </div>
      </div>
    </div>
  )
}
