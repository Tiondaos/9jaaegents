"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Download, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { Agent } from "@/lib/supabase"

export function FeaturedAgents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedAgents()
  }, [])

  const fetchFeaturedAgents = async () => {
    try {
      const response = await fetch("/api/agents?limit=4&sortBy=popular")
      const data = await response.json()
      setAgents(data.agents || [])
    } catch (error) {
      console.error("Error fetching featured agents:", error)
      setAgents([])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency = "NGN") => {
    if (price === 0) return "Free"

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured AI Agents</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {agents.length > 0
              ? "Discover the most popular and effective AI agents trusted by Nigerian businesses"
              : "Be the first to create and share AI agents on our marketplace"}
          </p>
        </div>

        {agents.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">No Agents Yet</h3>
              <p className="text-muted-foreground mb-6">
                Be the first creator to list an AI agent on our marketplace and help Nigerian businesses automate their
                workflows.
              </p>
              <Link href="/list-agent">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  List Your Agent
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {agents.map((agent) => (
                <Card key={agent.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={agent.screenshots?.[0] || "/placeholder.svg?height=200&width=300"}
                      alt={agent.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-green-600">Featured</Badge>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{agent.category?.name || "Uncategorized"}</Badge>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm">{agent.rating || "New"}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPrice(agent.price, agent.currency)}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Download className="h-4 w-4 mr-1" />
                        {agent.total_sales || 0}
                      </div>
                    </div>

                    <Button className="w-full group" asChild>
                      <Link href={`/agents/${agent.id}`}>
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/marketplace">
                  View All Agents
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
