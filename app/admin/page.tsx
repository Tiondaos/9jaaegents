"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Bot,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Download,
  Eye,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

function AdminDashboardContent() {
  const stats = {
    totalUsers: 1247,
    totalAgents: 89,
    totalRevenue: 12450000,
    monthlyGrowth: 23.5,
    pendingReviews: 12,
    activeAgents: 67,
    suspendedUsers: 3,
    featuredAgents: 8,
  }

  const recentActivity = [
    {
      id: "1",
      type: "agent_submitted",
      message: "New agent 'Invoice Generator Pro' submitted for review",
      time: "2 hours ago",
      user: "John Doe",
    },
    {
      id: "2",
      type: "user_registered",
      message: "New creator account registered",
      time: "4 hours ago",
      user: "Jane Smith",
    },
    {
      id: "3",
      type: "agent_approved",
      message: "Agent 'DataClean Pro' approved and published",
      time: "6 hours ago",
      user: "Admin",
    },
    {
      id: "4",
      type: "payment_processed",
      message: "Payment of ₦25,000 processed successfully",
      time: "8 hours ago",
      user: "System",
    },
  ]

  const topAgents = [
    {
      id: "1",
      name: "DataClean Pro",
      creator: "TechSolutions NG",
      sales: 184,
      revenue: 2450000,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Content Genius",
      creator: "AI Innovations",
      sales: 156,
      revenue: 1950000,
      rating: 4.7,
    },
    {
      id: "3",
      name: "ChatBot Nigeria",
      creator: "BotMakers Ltd",
      sales: 134,
      revenue: 1680000,
      rating: 4.9,
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "agent_submitted":
        return <Bot className="h-4 w-4 text-blue-500" />
      case "user_registered":
        return <Users className="h-4 w-4 text-green-500" />
      case "agent_approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "payment_processed":
        return <DollarSign className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform performance and manage operations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/agents">
              <Bot className="h-4 w-4 mr-2" />
              Manage Agents
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/users">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Link>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% this month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Agents</p>
                <p className="text-2xl font-bold">{stats.totalAgents}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+8% this month</span>
                </div>
              </div>
              <Bot className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{stats.monthlyGrowth}% this month</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</p>
                <div className="flex items-center mt-2">
                  <Clock className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Requires attention</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">by {activity.user}</span>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Agents */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Performing Agents</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/revenue">
                  View All
                  <ArrowUpRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAgents.map((agent, index) => (
                  <div key={agent.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg text-white font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{agent.name}</h4>
                      <p className="text-xs text-muted-foreground">{agent.creator}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs ml-1">{agent.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs ml-1">{agent.sales}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm text-green-600">{formatCurrency(agent.revenue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
          <Link href="/admin/agents">
            <CardContent className="p-6 text-center">
              <Bot className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Review Agents</h3>
              <p className="text-sm text-muted-foreground">{stats.pendingReviews} pending reviews</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
          <Link href="/admin/users">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-sm text-muted-foreground">{stats.totalUsers} total users</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
          <Link href="/admin/revenue">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Revenue Analytics</h3>
              <p className="text-sm text-muted-foreground">{formatCurrency(stats.totalRevenue)}</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-semibold">Platform Health</h3>
            <p className="text-sm text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
