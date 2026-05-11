"use client"

import React, { useState, useMemo } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Eye, EyeOff, Sparkles, Zap, Shield, ArrowRight, Loader2 } from 'lucide-react'
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { FaDiscord } from "react-icons/fa"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFocused, setIsFocused] = useState('')
  const shouldReduceMotion = useReducedMotion()

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Login attempt:', { email, password })
    setIsLoading(false)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`)
  }

  // Particle background animation - using deterministic values to fix impure function error
  const particles = useMemo(() => [
    { id: 0, x: 10, y: 20, scale: 0.6, duration: 12 },
    { id: 1, x: 85, y: 15, scale: 0.8, duration: 15 },
    { id: 2, x: 45, y: 80, scale: 0.7, duration: 18 },
    { id: 3, x: 25, y: 45, scale: 0.9, duration: 14 },
    { id: 4, x: 70, y: 60, scale: 0.5, duration: 20 },
    { id: 5, x: 15, y: 70, scale: 0.8, duration: 16 },
    { id: 6, x: 90, y: 40, scale: 0.6, duration: 13 },
    { id: 7, x: 35, y: 25, scale: 0.7, duration: 19 },
    { id: 8, x: 60, y: 85, scale: 0.9, duration: 11 },
    { id: 9, x: 80, y: 30, scale: 0.5, duration: 17 },
    { id: 10, x: 20, y: 55, scale: 0.8, duration: 14 },
    { id: 11, x: 55, y: 10, scale: 0.6, duration: 21 },
    { id: 12, x: 75, y: 75, scale: 0.7, duration: 12 },
    { id: 13, x: 40, y: 40, scale: 0.9, duration: 18 },
    { id: 14, x: 30, y: 65, scale: 0.5, duration: 15 },
    { id: 15, x: 65, y: 20, scale: 0.8, duration: 16 },
    { id: 16, x: 50, y: 50, scale: 0.6, duration: 13 },
    { id: 17, x: 95, y: 85, scale: 0.7, duration: 19 },
    { id: 18, x: 5, y: 35, scale: 0.9, duration: 14 },
    { id: 19, x: 85, y: 70, scale: 0.5, duration: 17 }
  ], [])

  // Enhanced animation variants
  const containerVariants = shouldReduceMotion ? {
    hidden: {},
    visible: {}
  } : {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = shouldReduceMotion ? {
    hidden: {},
    visible: {}
  } : {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  }

  const mascotVariants = shouldReduceMotion ? {
    hidden: {},
    visible: {},
    float: {}
  } : {
    hidden: { 
      y: 100, 
      opacity: 0,
      rotate: -10,
      scale: 0.8
    },
    visible: { 
      y: 0, 
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1] as const,
        type: "spring" as const,
        stiffness: 100
      }
    },
    float: {
      y: [0, -15, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  const buttonVariants = shouldReduceMotion ? {
    initial: {},
    hover: {},
    tap: {}
  } : {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const socialButtonVariants = shouldReduceMotion ? {
    initial: {},
    hover: {},
    tap: {}
  } : {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.08,
      y: -5,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 400
      }
    },
    tap: { 
      scale: 0.92,
      transition: { duration: 0.1 }
    }
  }

  const inputVariants = shouldReduceMotion ? {
    focused: {},
    blur: {}
  } : {
    focused: {
      scale: 1.02,
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1), 0 10px 25px rgba(59, 130, 246, 0.15)",
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    },
    blur: {
      scale: 1,
      borderColor: "#d1d5db",
      boxShadow: "0 0 0 0px transparent",
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Animated Particles Background */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [particle.scale, particle.scale * 1.5, particle.scale],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.id * 0.5
              }}
            />
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row min-h-screen relative z-10">
        {/* Left Panel - Mascot with Enhanced Animations */}
        <motion.div 
          className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-blue-600 to-blue-800 relative items-center justify-center overflow-hidden"
          variants={mascotVariants}
          initial="hidden"
          animate={["visible", "float"]}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
                "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))",
                "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            variants={mascotVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20 flex flex-col items-center"
          >
            {/* Glow Effect Behind Mascot */}
            <motion.div
              className="absolute -inset-4 bg-blue-400/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Mascot Image */}
            <motion.div
              animate="float"
              className="relative z-30"
            >
              <Image
                src="/images/laundry-mascot.png"
                alt="ResikLaundry Mascot"
                width={200}
                height={200}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Animated Ground Shadow */}
            <motion.div
              className="w-40 h-6 bg-black/30 rounded-full blur-2xl mt-6"
              animate={{
                scale: [1, 0.8, 1],
                opacity: [0.5, 0.2, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Brand Name with Sparkles */}
            <motion.div
              variants={itemVariants}
              className="mt-10 text-center"
            >
              <motion.div
                className="flex items-center justify-center gap-2 mb-2"
                whileHover={{ scale: 1.1 }}
              >
                <h2 className="text-white text-3xl font-light tracking-wide">ResikLaundry</h2>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-yellow-300" />
                </motion.div>
              </motion.div>
              <p className="text-blue-100 text-base">Laundry premium untuk kamu</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Panel - Enhanced Form */}
        <motion.div 
          className="lg:w-[55%] bg-white/95 backdrop-blur-sm min-h-screen flex items-center justify-center p-8 lg:p-12 relative"
          variants={itemVariants}
        >
          {/* Floating Icons */}
          <motion.div
            className="absolute top-8 right-8 flex gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-blue-100 rounded-full"
            >
              <Shield className="w-5 h-5 text-blue-600" />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: -15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-purple-100 rounded-full"
            >
              <Zap className="w-5 h-5 text-purple-600" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="w-full max-w-md"
          >
            {/* Heading with Animated Underline */}
            <motion.div variants={itemVariants} className="mb-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back!</h1>
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.div>

            {/* Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 mb-8 text-lg"
            >
              Masuk ke akun ResikLaundry kamu
            </motion.p>

            {/* Email Input with Enhanced Animation */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
            >
              <motion.label 
                className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
                animate={{ x: isFocused === 'email' ? 5 : 0 }}
              >
                Email
                {isFocused === 'email' && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                  </motion.div>
                )}
              </motion.label>
              <motion.input
                variants={inputVariants}
                animate={isFocused === 'email' ? 'focused' : 'blur'}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused('email')}
                onBlur={() => setIsFocused('')}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl outline-none transition-all text-lg"
                placeholder="email@example.com"
              />
            </motion.div>

            {/* Password Input with Enhanced Animation */}
            <motion.div
              variants={itemVariants}
              className="mb-8"
            >
              <motion.label 
                className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
                animate={{ x: isFocused === 'password' ? 5 : 0 }}
              >
                Password
                {isFocused === 'password' && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.3 }}
                  >
                    <Shield className="w-4 h-4 text-blue-500" />
                  </motion.div>
                )}
              </motion.label>
              <div className="relative">
                <motion.input
                  variants={inputVariants}
                  animate={isFocused === 'password' ? 'focused' : 'blur'}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused('password')}
                  onBlur={() => setIsFocused('')}
                  className="w-full px-4 py-4 pr-14 border-2 border-gray-300 rounded-xl outline-none transition-all text-lg"
                  placeholder="••••••••"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <AnimatePresence mode="wait">
                    {showPassword ? (
                      <motion.div
                        key="hide"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <EyeOff className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="show"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>

            {/* Submit Button with Loading State */}
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="text"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <span>Masuk</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Enhanced Divider */}
            <motion.div
              variants={itemVariants}
              className="relative my-8"
            >
              <motion.div
                className="absolute inset-0 flex items-center"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="w-full border-t-2 border-gray-200"></div>
              </motion.div>
              <motion.div
                className="relative flex justify-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <span className="px-6 bg-white text-gray-500 font-medium">atau</span>
              </motion.div>
            </motion.div>

            {/* Enhanced Social Login Buttons */}
            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              {/* Google */}
              <motion.button
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleSocialLogin('google')}
                className="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-blue-400 transition-all text-lg font-medium group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <FcGoogle className="w-6 h-6" />
                </motion.div>
                <span>Google</span>
              </motion.button>

              {/* Discord */}
              <motion.button
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleSocialLogin('discord')}
                className="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-[#5865F2] transition-all text-lg font-medium"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaDiscord className="w-6 h-6 text-[#5865F2]" />
                </motion.div>
                <span>Discord</span>
              </motion.button>

              {/* GitHub */}
              <motion.button
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleSocialLogin('github')}
                className="w-full flex items-center justify-center gap-4 px-6 py-4 border-2 border-gray-300 rounded-xl hover:border-gray-800 transition-all text-lg font-medium"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaGithub className="w-6 h-6" />
                </motion.div>
                <span>GitHub</span>
              </motion.button>
            </motion.div>

            {/* Enhanced Footer */}
            <motion.p
              variants={itemVariants}
              className="text-center text-gray-600 text-lg"
            >
              Belum punya akun?{" "}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 hover:text-blue-700 font-bold transition-colors relative"
              >
                Daftar
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
