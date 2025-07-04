"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="p-12 text-center">
            {!isSubscribed ? (
              <>
                <Mail className="h-12 w-12 mx-auto mb-6 opacity-90" />
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated with AI Trends</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Get the latest AI agents, Nigerian business insights, and exclusive offers delivered to your inbox
                  weekly.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                  />
                  <Button type="submit" disabled={isLoading} className="bg-white text-green-600 hover:bg-gray-100">
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </form>

                <p className="text-sm opacity-70 mt-4">No spam, unsubscribe at any time. We respect your privacy.</p>
              </>
            ) : (
              <div className="space-y-4">
                <CheckCircle className="h-16 w-16 mx-auto text-green-200" />
                <h3 className="text-2xl font-bold">Thank You!</h3>
                <p className="text-lg opacity-90">
                  You've successfully subscribed to our newsletter. Check your inbox for a welcome message!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
