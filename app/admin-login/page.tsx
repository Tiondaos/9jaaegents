"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, AlertTriangle, ArrowLeft, Crown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn(email, password)

    if (result.error) {
      setError(result.error)
    } else {
      router.push("/admin")
    }

    setLoading(false)
  }

  const handleDemoLogin = async () => {
    setLoading(true)
    setError("")

    const result = await signIn("admin@9jaagents.com", "Admin123!")

    if (result.error) {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to 9jaAgents
          </Link>
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Portal</h1>
          </div>
          <p className="text-gray-600">Secure access for administrators only</p>
        </div>

        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <strong>Restricted Access:</strong> This portal is for authorized administrators only. All login attempts
            are monitored and logged.
          </AlertDescription>
        </Alert>

        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800">Administrator Sign In</CardTitle>
            <CardDescription className="text-red-600">
              Enter your administrator credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {error && (
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Administrator Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@9jaagents.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="border-red-200 focus:border-red-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="border-red-200 focus:border-red-400"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                {loading ? "Authenticating..." : "Access Admin Panel"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-red-50">
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-red-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-red-50 px-2 text-red-600">Demo Access</span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full mt-4 border-red-200 text-red-700 hover:bg-red-50 flex items-center justify-center space-x-2 bg-transparent"
              >
                <Crown className="w-4 h-4" />
                <span>Demo Admin Access</span>
              </Button>
            </div>

            <div className="text-center text-xs text-red-600">Need help? Contact system administrator</div>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secured by 9jaAgents Security Protocol</span>
          </div>
        </div>
      </div>
    </div>
  )
}
