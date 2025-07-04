"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Star } from "lucide-react"

interface MarketInsight {
  id: string
  title: string
  value: string
  change: string
  trend: "up" | "down" | "stable"
  icon: React.ReactNode
}

export function MarketInsights() {
  const [insights, setInsights] = useState<MarketInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching market insights
    const fetchInsights = async () => {
      // In real implementation, this would fetch from your Supabase analytics
      const mockInsights: MarketInsight[] = [
        {
          id: "1",
          title: "Total Revenue",
          value: "₦2,450,000",
          change: "+12.5%",
          trend: "up",
          icon: <DollarSign className="h-4 w-4" />,
        },
        {
          id: "2",
          title: "Active Users",
          value: "1,234",
          change: "+8.2%",
          trend: "up",
          icon: <Users className="h-4 w-4" />,
        },
        {
          id: "3",
          title: "Avg Rating",
          value: "4.7",
          change: "+0.3",
          trend: "up",
          icon: <Star className="h-4 w-4" />,
        },
        {
          id: "4",
          title: "Growth Rate",
          value: "23.4%",
          change: "+5.1%",
          trend: "up",
          icon: <TrendingUp className="h-4 w-4" />,
        },
      ]

      setInsights(mockInsights)
      setLoading(false)
    }

    fetchInsights()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {insights.map((insight) => (
        <Card key={insight.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{insight.title}</CardTitle>
            <div className="text-muted-foreground">{insight.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insight.value}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Badge
                variant={insight.trend === "up" ? "default" : "secondary"}
                className={insight.trend === "up" ? "bg-green-100 text-green-800" : ""}
              >
                {insight.change}
              </Badge>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
