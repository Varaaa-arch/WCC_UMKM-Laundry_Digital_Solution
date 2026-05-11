"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

interface AuthData {
  isLogin: boolean
}

interface AuthFormProps {
  onSubmit?: (data: AuthData) => void
}

// Animated robot/logo for the left panel
function AnimatedLogo() {
  return (
    <div className="relative flex flex-col items-center justify-center h-full">
      {/* Glow under robot */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] w-32 h-8 bg-white/20 rounded-full blur-xl"
      />

      {/* Robot body */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        {/* Antenna */}
        <motion.div
          animate={{ rotate: [-8, 8, -8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="w-1.5 h-6 bg-white rounded-full" />
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-3 h-3 bg-white rounded-full mt-0.5"
          />
        </motion.div>

        {/* Main robot shape - octagon-like */}
        <div className="relative w-36 h-32 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl"
          style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)' }}
        >
          {/* X eye */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <line x1="2" y1="2" x2="20" y2="20" stroke="#111" strokeWidth="3.5" strokeLinecap="round"/>
              <line x1="20" y1="2" x2="2" y2="20" stroke="#111" strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </div>
          {/* Dot eye */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full"
          />
        </div>

        {/* Left arm */}
        <motion.div
          animate={{ rotate: [-15, 5, -15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-12 bg-white rounded-full origin-top"
        />
        {/* Right arm */}
        <motion.div
          animate={{ rotate: [15, -5, 15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-5 h-12 bg-white rounded-full origin-top"
        />
      </motion.div>

      {/* Shadow */}
      <motion.div
        animate={{ scaleX: [1, 0.8, 1], opacity: [0.3, 0.15, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="mt-6 w-28 h-4 bg-white/30 rounded-full blur-md"
      />
    </div>
  )
}

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    onSubmit?.({ isLogin })
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl flex rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT PANEL — black with animated robot */}
        <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative overflow-hidden">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-white/5 to-transparent" />
          <AnimatedLogo />
        </div>

        {/* RIGHT PANEL — white form */}
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-10 py-12">
          {/* Avatar placeholder */}
          <motion.div
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex justify-center mb-6"
          >
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-500 mt-1 text-sm">Enter your login details</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name field (register only) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required={!isLogin}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm"
              />
            </motion.div>

            {/* Password */}
            <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Remember me + Forgot password */}
            {isLogin && (
              <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible" className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-gray-900"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  Forgot password?
                </button>
              </motion.div>
            )}

            {/* Submit */}
            <motion.div custom={5} variants={itemVariants} initial="hidden" animate="visible">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-sm"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  isLogin ? 'Log in' : 'Sign up'
                )}
              </motion.button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div custom={6} variants={itemVariants} initial="hidden" animate="visible" className="my-6">
            <div className="relative flex items-center">
              <div className="flex-1 border-t border-gray-200" />
              <span className="px-3 text-xs text-gray-400">Or</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>
          </motion.div>

          {/* Social buttons */}
          <motion.div custom={7} variants={itemVariants} initial="hidden" animate="visible" className="flex gap-3">
            {/* Google */}
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </motion.button>

            {/* Apple */}
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </motion.button>

            {/* X / Twitter */}
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.97 }}
              type="button"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </motion.button>
          </motion.div>

          {/* Toggle login/register */}
          <motion.p custom={8} variants={itemVariants} initial="hidden" animate="visible" className="text-center text-sm text-gray-500 mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-900 font-semibold hover:underline transition-all"
            >
              {isLogin ? 'Sign Up' : 'Log in'}
            </button>
          </motion.p>
        </div>
      </div>
    </div>
  )
}
