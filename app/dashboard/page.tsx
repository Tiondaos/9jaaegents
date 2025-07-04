"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Star, Download, TrendingUp, CheckCircle, Plus, Eye, Heart } from "lucide-react"
import Link from "next/link"

function DashboardContent() {
  const { user } = useAuth()

  const userStats = {
    agentsPurchased: 5,
    totalSpent: 125000,
    activeAgents: 4,
    favoriteAgents: 8,
  }

  const recentPurchases = [
    {
      id: "1",
      name: "DataClean Pro",
      category: "Data Processing",
      purchaseDate: "2024-01-15",
      status: "active",
      price: 25000,
    },
    {
      id: "2",
      name: "Content Genius",
      category: "Content Creation",
      purchaseDate: "2024-01-10",
      status: "active",
      price: 35000,
    },
    {
      id: "3",
      name: "ChatBot Nigeria",
      category: "Customer Service",
      purchaseDate: "2024-01-05",
      status: "setup_required",
      price: 45000,
    },
  ]

  const recommendations = [
    {
      id: "1",
      name: "Sales Automation Pro",
      category: "Sales & Marketing",
      rating: 4.9,
      price: 40000,
      description: "Automate your sales pipeline with AI-powered lead qualification",
    },
    {
      id: "2",
      name: "Invoice Generator AI",
      category: "Finance",
      rating: 4.7,
      price: 20000,
      description: "Generate professional invoices with Nigerian tax compliance",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "setup_required":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.user_metadata?.first_name || "User"}!</h1>
            <p className="text-muted-foreground">Manage your AI agents and discover new automation solutions</p>
          </div>
          <Button asChild>
            <Link href="/marketplace">
              <Plus className="h-4 w-4 mr-2" />
              Browse Agents
            </Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Agents Purchased</p>
                  <p className="text-2xl font-bold">{userStats.agentsPurchased}</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(userStats.totalSpent)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold">{userStats.activeAgents}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Favorites</p>
                  <p className="text-2xl font-bold">{userStats.favoriteAgents}</p>
                </div>
                <Heart className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="agents" className="space-y-6">
          <TabsList>
            <TabsTrigger value="agents">My Agents</TabsTrigger>
            <TabsTrigger value="recommendations">Recommended</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My AI Agents</CardTitle>
                <CardDescription>Manage and monitor your purchased AI automation solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPurchases.map((agent) => (
                    <div
                      key={agent.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{agent.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{agent.category}</Badge>
                            <Badge className={getStatusColor(agent.status)}>
                              {agent.status === "active" ? "Active" : "Setup Required"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Purchased on {new Date(agent.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-green-600">{formatCurrency(agent.price)}</span>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/agents/${agent.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        {agent.status === "setup_required" && <Button size="sm">Setup</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>AI agents that complement your current automation setup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommendations.map((agent) => (
                    <div key={agent.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{agent.name}</h3>
                          <Badge variant="outline" className="mt-1">
                            {agent.category}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1 text-sm">{agent.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-green-600">{formatCurrency(agent.price)}</span>
                        <Button size="sm" asChild>
                          <Link href={`/agents/${agent.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and agent interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Download className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Downloaded DataClean Pro</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Star className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Rated Content Genius - 5 stars</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Purchased ChatBot Nigeria</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
