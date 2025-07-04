"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function DemoCredentials() {
  const { toast } = useToast()

  const credentials = [
    {
      role: "Admin",
      email: "admin@9jaagents.com",
      password: "Admin123!",
      description: "Full platform access, user management, system settings",
      badge: "👑 Admin",
      color: "destructive" as const,
    },
    {
      role: "Creator",
      email: "creator@9jaagents.com",
      password: "Creator123!",
      description: "Create and manage AI agents, view analytics, handle submissions",
      badge: "🎨 Creator",
      color: "secondary" as const,
    },
    {
      role: "User",
      email: "user@9jaagents.com",
      password: "User123!",
      description: "Browse marketplace, purchase agents, manage personal dashboard",
      badge: "👤 User",
      color: "outline" as const,
    },
  ]

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {credentials.map((cred) => (
        <Card key={cred.role} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{cred.role} Account</CardTitle>
              <Badge variant={cred.color}>{cred.badge}</Badge>
            </div>
            <CardDescription className="text-sm">{cred.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(cred.email, "Email")}
                  className="h-auto p-1"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <code className="block text-xs bg-muted p-2 rounded">{cred.email}</code>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Password:</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(cred.password, "Password")}
                  className="h-auto p-1"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <code className="block text-xs bg-muted p-2 rounded">{cred.password}</code>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
