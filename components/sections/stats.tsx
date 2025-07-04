"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Zap, Award } from "lucide-react"

interface Stat {
  id: string
  label: string
  value: string
  change: string
  icon: React.ReactNode
  color: string
}

export function Stats() {
  const [stats, setStats] = useState<Stat[]>([])

  useEffect(() => {
    const mockStats: Stat[] = [
      {
        id: "1",
        label: "Active AI Agents",
        value: "500+",
        change: "+12% this month",
        icon: <Zap className="h-6 w-6" />,
        color: "text-blue-600",
      },
      {
        id: "2",
        label: "Nigerian Businesses",
        value: "10,000+",
        change: "+25% this month",
        icon: <Users className="h-6 w-6" />,
        color: "text-green-600",
      },
      {
        id: "3",
        label: "Revenue Generated",
        value: "₦2.5B+",
        change: "+18% this month",
        icon: <TrendingUp className="h-6 w-6" />,
        color: "text-purple-600",
      },
      {
        id: "4",
        label: "Success Rate",
        value: "98.5%",
        change: "+2.1% this month",
        icon: <Award className="h-6 w-6" />,
        color: "text-orange-600",
      },
    ]

    setStats(mockStats)
  }, [])

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.id} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${stat.color} mb-4 flex justify-center`}>{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
