"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await signIn(email, password)

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  const handleDemoLogin = async (role: "admin" | "creator" | "user") => {
    setLoading(true)
    setError("")

    const credentials = {
      admin: { email: "admin@9jaagents.com", password: "Admin123!" },
      creator: { email: "creator@9jaagents.com", password: "Creator123!" },
      user: { email: "user@9jaagents.com", password: "User123!" },
    }

    const { email: demoEmail, password: demoPassword } = credentials[role]
    setEmail(demoEmail)
    setPassword(demoPassword)

    const { error } = await signIn(demoEmail, demoPassword)

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <div className="text-center">
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm text-center text-gray-600 mb-3">Demo Accounts:</p>
            <div className="grid gap-2">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("admin")}
                disabled={loading}
                className="w-full text-left justify-start"
              >
                👑 Admin Demo (admin@9jaagents.com)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("creator")}
                disabled={loading}
                className="w-full text-left justify-start"
              >
                🎨 Creator Demo (creator@9jaagents.com)
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin("user")}
                disabled={loading}
                className="w-full text-left justify-start"
              >
                👤 User Demo (user@9jaagents.com)
              </Button>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-center text-gray-600 w-full">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
