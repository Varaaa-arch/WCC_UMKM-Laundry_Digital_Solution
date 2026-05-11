"use client"

import AuthForm from '@/components/auth/auth-form'

interface AuthData {
  isLogin: boolean
}

export default function AuthPage() {
  const handleSubmit = (data: AuthData) => {
    console.log('Auth data:', data)
    // Handle authentication logic here
  }

  return <AuthForm onSubmit={handleSubmit} />
}
