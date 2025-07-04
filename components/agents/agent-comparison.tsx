"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Star } from "lucide-react"

interface Agent {
  id: string
  name: string
  price: number
  rating: number
  features: string[]
  category: string
  image: string
}

interface AgentComparisonProps {
  agents: Agent[]
  onRemoveAgent: (agentId: string) => void
  onPurchase: (agentId: string) => void
}

export function AgentComparison({ agents, onRemoveAgent, onPurchase }: AgentComparisonProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Get all unique features across compared agents
  const allFeatures = Array.from(new Set(agents.flatMap((agent) => agent.features)))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (agents.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">No Agents to Compare</h3>
          <p className="text-muted-foreground">Add agents to your comparison list to see them here.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Compare AI Agents</h2>
        <Badge variant="secondary">{agents.length} agents selected</Badge>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="font-semibold text-lg">Features</div>
            {agents.map((agent) => (
              <Card key={agent.id} className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => onRemoveAgent(agent.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardHeader className="pb-2">
                  <img
                    src={agent.image || "/placeholder.svg"}
                    alt={agent.name}
                    className="w-full h-32 object-cover rounded-md mb-2"
                  />
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{agent.rating}</span>
                    </div>
                    <Badge variant="outline">{agent.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-4">{formatPrice(agent.price)}</div>
                  <Button className="w-full" onClick={() => onPurchase(agent.id)}>
                    Purchase Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allFeatures.map((feature) => (
                  <div
                    key={feature}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="font-medium">{feature}</div>
                    {agents.map((agent) => (
                      <div key={`${agent.id}-${feature}`} className="flex justify-center">
                        {agent.features.includes(feature) ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300" />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
