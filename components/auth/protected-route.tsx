"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: "user" | "creator" | "admin"
  redirectTo?: string
}

export function ProtectedRoute({ children, requiredRole, redirectTo = "/login" }: ProtectedRouteProps) {
  const { user, loading, getUserRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(redirectTo)
        return
      }

      if (requiredRole) {
        const userRole = getUserRole()

        // Role hierarchy: admin > creator > user
        const roleHierarchy = { user: 1, creator: 2, admin: 3 }
        const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
        const requiredLevel = roleHierarchy[requiredRole]

        if (userLevel < requiredLevel) {
          router.push("/unauthorized")
          return
        }
      }
    }
  }, [user, loading, requiredRole, router, redirectTo, getUserRole])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole) {
    const userRole = getUserRole()
    const roleHierarchy = { user: 1, creator: 2, admin: 3 }
    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0
    const requiredLevel = roleHierarchy[requiredRole]

    if (userLevel < requiredLevel) {
      return null
    }
  }

  return <>{children}</>
}
