"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Bot, Clock, CheckCircle, XCircle, Star, Download, Eye, Ban } from "lucide-react"

interface Agent {
  id: string
  name: string
  description: string
  creator: string
  category: string
  status: "active" | "pending" | "suspended" | "rejected"
  price: number
  rating: number
  downloads: number
  revenue: number
  submittedDate: string
  approvedDate?: string
  featured: boolean
}

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching agents
    const fetchAgents = async () => {
      const mockAgents: Agent[] = [
        {
          id: "1",
          name: "DataClean Pro",
          description: "Advanced data cleaning and processing for Nigerian businesses",
          creator: "John Doe",
          category: "Data Processing",
          status: "active",
          price: 15000,
          rating: 4.8,
          downloads: 1250,
          revenue: 18750,
          submittedDate: "2024-01-10",
          approvedDate: "2024-01-12",
          featured: true,
        },
        {
          id: "2",
          name: "Content Genius",
          description: "AI-powered content creation in multiple Nigerian languages",
          creator: "Jane Smith",
          category: "Content Creation",
          status: "active",
          price: 25000,
          rating: 4.6,
          downloads: 890,
          revenue: 22250,
          submittedDate: "2024-01-08",
          approvedDate: "2024-01-10",
          featured: false,
        },
        {
          id: "3",
          name: "Email Automation Pro",
          description: "Professional email marketing automation tool",
          creator: "Mike Johnson",
          category: "Marketing",
          status: "pending",
          price: 20000,
          rating: 0,
          downloads: 0,
          revenue: 0,
          submittedDate: "2024-01-18",
          featured: false,
        },
        {
          id: "4",
          name: "ChatBot Nigeria",
          description: "Customer service chatbot with local language support",
          creator: "David Brown",
          category: "Customer Service",
          status: "active",
          price: 20000,
          rating: 4.7,
          downloads: 1100,
          revenue: 22000,
          submittedDate: "2024-01-05",
          approvedDate: "2024-01-07",
          featured: true,
        },
        {
          id: "5",
          name: "Spam Generator",
          description: "Tool for generating spam content",
          creator: "Bad Actor",
          category: "Content Creation",
          status: "rejected",
          price: 5000,
          rating: 0,
          downloads: 0,
          revenue: 0,
          submittedDate: "2024-01-15",
          featured: false,
        },
        {
          id: "6",
          name: "Invoice Generator",
          description: "Automated invoice generation with tax compliance",
          creator: "Lisa Garcia",
          category: "Finance",
          status: "suspended",
          price: 12000,
          rating: 4.5,
          downloads: 2100,
          revenue: 25200,
          submittedDate: "2024-01-01",
          approvedDate: "2024-01-03",
          featured: false,
        },
      ]

      setAgents(mockAgents)
      setFilteredAgents(mockAgents)
      setLoading(false)
    }

    fetchAgents()
  }, [])

  useEffect(() => {
    let filtered = agents

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.creator.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter((agent) => agent.category === categoryFilter)
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((agent) => agent.status === statusFilter)
    }

    setFilteredAgents(filtered)
  }, [agents, searchTerm, categoryFilter, statusFilter])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      case "rejected":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleAgentAction = (agentId: string, action: string) => {
    // Simulate agent action
    console.log(`Performing ${action} on agent ${agentId}`)

    if (action === "approve") {
      setAgents((prev) =>
        prev.map((agent) =>
          agent.id === agentId
            ? { ...agent, status: "active" as const, approvedDate: new Date().toISOString().split("T")[0] }
            : agent,
        ),
      )
    } else if (action === "reject") {
      setAgents((prev) =>
        prev.map((agent) => (agent.id === agentId ? { ...agent, status: "rejected" as const } : agent)),
      )
    } else if (action === "suspend") {
      setAgents((prev) =>
        prev.map((agent) => (agent.id === agentId ? { ...agent, status: "suspended" as const } : agent)),
      )
    } else if (action === "feature") {
      setAgents((prev) => prev.map((agent) => (agent.id === agentId ? { ...agent, featured: !agent.featured } : agent)))
    }
  }

  const categories = [
    "Data Processing",
    "Content Creation",
    "Automation",
    "Customer Service",
    "Analytics",
    "Finance",
    "Marketing",
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Agent Management</h1>
        <p className="text-gray-600">Review, approve, and manage all AI agents on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.filter((a) => a.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.filter((a) => a.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">85%</span> approval rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Agents</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.filter((a) => a.featured).length}</div>
            <p className="text-xs text-muted-foreground">Premium placement</p>
          </CardContent>
        </Card>
      </div>

      {/* Agents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Agents</CardTitle>
          <CardDescription>Review and manage all AI agents on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          {agent.name}
                          {agent.featured && <Star className="h-4 w-4 text-yellow-500 ml-1 fill-current" />}
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-1">{agent.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{agent.creator}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{agent.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(agent.status)}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(agent.price)}</TableCell>
                    <TableCell>
                      {agent.rating > 0 ? (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          {agent.rating}
                        </div>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 text-muted-foreground mr-1" />
                        {agent.downloads.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(agent.revenue)}</TableCell>
                    <TableCell>{formatDate(agent.submittedDate)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleAgentAction(agent.id, "view")}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />

                          {agent.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleAgentAction(agent.id, "approve")}
                                className="text-green-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve Agent
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleAgentAction(agent.id, "reject")}
                                className="text-red-600"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject Agent
                              </DropdownMenuItem>
                            </>
                          )}

                          {agent.status === "active" && (
                            <>
                              <DropdownMenuItem onClick={() => handleAgentAction(agent.id, "feature")}>
                                <Star className="mr-2 h-4 w-4" />
                                {agent.featured ? "Unfeature" : "Feature"} Agent
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleAgentAction(agent.id, "suspend")}
                                className="text-red-600"
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend Agent
                              </DropdownMenuItem>
                            </>
                          )}

                          {agent.status === "suspended" && (
                            <DropdownMenuItem onClick={() => handleAgentAction(agent.id, "approve")}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Reactivate Agent
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No agents found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
