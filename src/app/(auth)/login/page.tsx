"use client"

import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { Eye, EyeOff, MessageCircle } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const handleLogin = () => {
    console.log('Login attempt:', { email, password })
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`)
  }

  // Animation variants
  const mascotContainerVariants = shouldReduceMotion ? {
    initial: {},
    animate: {}
  } : {
    initial: { y: 40, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  const mascotFloatVariants = shouldReduceMotion ? {
    animate: {}
  } : {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const shadowVariants = shouldReduceMotion ? {
    animate: {}
  } : {
    animate: {
      scale: [1, 0.85, 1],
      opacity: [0.6, 0.3, 0.6],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const rightPanelVariants = shouldReduceMotion ? {
    initial: {},
    animate: {}
  } : {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        delay: 0.3,
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {
    initial: {},
    animate: {}
  } : {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  const socialButtonVariants = shouldReduceMotion ? {
    hover: {},
    tap: {}
  } : {
    hover: { 
      y: -2,
      borderColor: "#3b82f6",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.97 }
  }

  const inputFocusVariants = shouldReduceMotion ? {
    focus: {}
  } : {
    focus: {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Mascot */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#0a0a0a] relative items-center justify-center">
        <motion.div
          variants={mascotContainerVariants}
          initial="initial"
          animate="animate"
          className="relative flex flex-col items-center"
        >
          {/* Mascot Image */}
          <motion.div
            variants={mascotFloatVariants}
            animate="animate"
            className="relative z-10"
          >
            <Image
              src="/images/laundry-mascot.png"
              alt="ResikLaundry Mascot"
              width={200}
              height={200}
              className="object-contain"
              priority
            />
          </motion.div>
          
          {/* Ground Shadow */}
          <motion.div
            variants={shadowVariants}
            animate="animate"
            className="w-32 h-4 bg-black/20 rounded-full blur-xl mt-4"
          />
          
          {/* Brand Name */}
          <motion.div
            variants={itemVariants}
            className="mt-8 text-center"
          >
            <h2 className="text-white text-2xl font-light tracking-wide">ResikLaundry</h2>
            <p className="text-gray-400 text-sm mt-2">Laundry premium untuk kamu</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:w-[55%] bg-white min-h-screen flex items-center justify-center p-8 lg:p-12">
        <motion.div
          variants={rightPanelVariants}
          initial="initial"
          animate="animate"
          className="w-full max-w-md"
        >
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Welcome back!
          </motion.h1>
          
          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-gray-600 mb-8"
          >
            Masuk ke akun ResikLaundry kamu
          </motion.p>

          {/* Email Input */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <motion.input
              variants={inputFocusVariants}
              whileFocus="focus"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-all"
              placeholder="email@example.com"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <motion.input
                variants={inputFocusVariants}
                whileFocus="focus"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            onClick={handleLogin}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-6"
          >
            Masuk
          </motion.button>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="relative mb-6"
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">atau</span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-8">
            {/* Google */}
            <motion.button
              variants={socialButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="w-5 h-5 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span className="font-medium">Google</span>
            </motion.button>

            {/* Discord */}
            <motion.button
              variants={socialButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleSocialLogin('discord')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Discord</span>
            </motion.button>

            {/* GitHub */}
            <motion.button
              variants={socialButtonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleSocialLogin('github')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">GH</span>
              </div>
              <span className="font-medium">GitHub</span>
            </motion.button>
          </div>

          {/* Footer */}
          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600"
          >
            Belum punya akun?{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Daftar
            </button>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
