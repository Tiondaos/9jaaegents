"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, TrendingUp, Users, DollarSign, Eye, Check, Clock, FileText } from "lucide-react"
import Link from "next/link"

function CreatorDashboardContent() {
  const myAgents = [
    {
      id: "1",
      name: "DataClean Pro",
      status: "Active",
      sales: 184,
      revenue: 2450000,
      views: 12500,
      rating: 4.8,
    },
    {
      id: "2",
      name: "Content Genius",
      status: "Active",
      sales: 89,
      revenue: 1225000,
      views: 8900,
      rating: 4.6,
    },
    {
      id: "3",
      name: "AutoFlow Master",
      status: "Draft",
      sales: 0,
      revenue: 0,
      views: 0,
      rating: 0,
    },
  ]

  const recentSubmissions = [
    {
      id: "sub_002",
      name: "Content Genius",
      status: "under_review",
      submittedDays: 2,
    },
    {
      id: "sub_003",
      name: "AutoFlow Master",
      status: "changes_requested",
      submittedDays: 5,
    },
    {
      id: "sub_004",
      name: "Invoice Helper",
      status: "pending",
      submittedDays: 1,
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
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "changes_requested":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "under_review":
        return <Clock className="h-3 w-3" />
      case "changes_requested":
        return <FileText className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">Manage your AI agents and track performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild>
              <Link href="/creator/submissions">
                <FileText className="h-4 w-4 mr-2" />
                View Submissions
              </Link>
            </Button>
            <Button asChild>
              <Link href="/creator/agents/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Agent
              </Link>
            </Button>
          </div>
        </div>

        {/* Call to Action Card */}
        <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Ready to List Your Next Agent?</h2>
                <p className="text-blue-100 mb-4">
                  Share your AI automation solution with thousands of Nigerian businesses. Listing is completely free!
                </p>
                <div className="flex items-center space-x-4 text-sm text-blue-100">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Free to list
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Keep 85% revenue
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 mr-1" />
                    Global reach
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/creator/agents/new">
                  <Plus className="h-5 w-5 mr-2" />
                  List New Agent
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(3675000)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">273</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">21,400</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Agents</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Agents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myAgents.map((agent) => (
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
                            <Badge variant={agent.status === "Active" ? "default" : "secondary"}>{agent.status}</Badge>
                            {agent.rating > 0 && (
                              <span className="text-sm text-muted-foreground">★ {agent.rating}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="font-semibold">{agent.sales}</div>
                          <div className="text-xs text-muted-foreground">Sales</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-green-600">{formatCurrency(agent.revenue)}</div>
                          <div className="text-xs text-muted-foreground">Revenue</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{agent.views.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">Views</div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/creator/agents/${agent.id}`}>View Analytics</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Submissions */}
          <div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Submissions</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/creator/submissions">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{submission.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          Submitted {submission.submittedDays} day{submission.submittedDays !== 1 ? "s" : ""} ago
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(submission.status)} text-xs`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(submission.status)}
                          <span>
                            {submission.status === "under_review"
                              ? "In Review"
                              : submission.status === "changes_requested"
                                ? "Changes"
                                : "Pending"}
                          </span>
                        </div>
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/creator/submissions">
                      <FileText className="h-4 w-4 mr-2" />
                      Track All Submissions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CreatorDashboardPage() {
  return (
    <ProtectedRoute requiredRole="creator">
      <CreatorDashboardContent />
    </ProtectedRoute>
  )
}
