"use client"

import React, { useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { signIn } from '@/actions/auth-action'

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

          <motion.p variants={item(5)} initial="hidden" animate="visible" className="text-center text-sm text-gray-500 mt-6">
            Belum punya akun?{' '}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">Daftar</a>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
