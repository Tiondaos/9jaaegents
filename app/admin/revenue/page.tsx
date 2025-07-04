"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Users, Bot, Percent, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// Mock data
const revenueData = [
  { month: "Jul", revenue: 45000, commission: 6750, creatorPayout: 38250 },
  { month: "Aug", revenue: 52000, commission: 7800, creatorPayout: 44200 },
  { month: "Sep", revenue: 48000, commission: 7200, creatorPayout: 40800 },
  { month: "Oct", revenue: 61000, commission: 9150, creatorPayout: 51850 },
  { month: "Nov", revenue: 55000, commission: 8250, creatorPayout: 46750 },
  { month: "Dec", revenue: 67000, commission: 10050, creatorPayout: 56950 },
]

const categoryRevenue = [
  { name: "Data Processing", revenue: 85000, color: "#0088FE" },
  { name: "Content Creation", revenue: 72000, color: "#00C49F" },
  { name: "Automation", revenue: 58000, color: "#FFBB28" },
  { name: "Customer Service", revenue: 45000, color: "#FF8042" },
  { name: "Analytics", revenue: 38000, color: "#8884D8" },
  { name: "Finance", revenue: 30000, color: "#82ca9d" },
]

const topCreators = [
  {
    id: 1,
    name: "David Brown",
    email: "david@example.com",
    agents: 5,
    revenue: 67000,
    commission: 56950,
    growth: 15.3,
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    agents: 3,
    revenue: 45000,
    commission: 38250,
    growth: 8.7,
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    agents: 2,
    revenue: 35000,
    commission: 29750,
    growth: -2.1,
    avatar: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Lisa Garcia",
    email: "lisa@example.com",
    agents: 4,
    revenue: 28000,
    commission: 23800,
    growth: 12.4,
    avatar: "/placeholder.svg",
  },
]

export default function AdminRevenuePage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    platformCommission: 0,
    creatorPayouts: 0,
    monthlyGrowth: 0,
    avgRevenuePerAgent: 0,
    totalTransactions: 0,
    conversionRate: 0,
    topCategory: "",
  })

  useEffect(() => {
    // Calculate stats from mock data
    const totalRevenue = revenueData.reduce((sum, month) => sum + month.revenue, 0)
    const platformCommission = revenueData.reduce((sum, month) => sum + month.commission, 0)
    const creatorPayouts = revenueData.reduce((sum, month) => sum + month.creatorPayout, 0)

    setStats({
      totalRevenue,
      platformCommission,
      creatorPayouts,
      monthlyGrowth: 12.5,
      avgRevenuePerAgent: 2240,
      totalTransactions: 3456,
      conversionRate: 12.8,
      topCategory: "Data Processing",
    })
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
        <p className="text-gray-600">Track platform revenue, commissions, and creator earnings</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">+{stats.monthlyGrowth}%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Commission (15%)</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.platformCommission)}</div>
            <p className="text-xs text-muted-foreground">Platform earnings from sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Creator Payouts (85%)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.creatorPayouts)}</div>
            <p className="text-xs text-muted-foreground">Total paid to creators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Revenue/Agent</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.avgRevenuePerAgent)}</div>
            <p className="text-xs text-muted-foreground">Per agent performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue breakdown showing platform commission vs creator payouts</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value as number),
                  name === "revenue"
                    ? "Total Revenue"
                    : name === "commission"
                      ? "Platform Commission (15%)"
                      : "Creator Payouts (85%)",
                ]}
              />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={3} name="revenue" />
              <Line type="monotone" dataKey="commission" stroke="#ff7300" strokeWidth={2} name="commission" />
              <Line type="monotone" dataKey="creatorPayout" stroke="#00C49F" strokeWidth={2} name="creatorPayout" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Performance and Commission Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Category</CardTitle>
            <CardDescription>Performance breakdown by agent category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Split</CardTitle>
            <CardDescription>Platform vs Creator revenue distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Creator Payouts (85%)", value: stats.creatorPayouts, color: "#00C49F" },
                    { name: "Platform Commission (15%)", value: stats.platformCommission, color: "#ff7300" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#00C49F" />
                  <Cell fill="#ff7300" />
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Creators */}
      <Card>
        <CardHeader>
          <CardTitle>Top Earning Creators</CardTitle>
          <CardDescription>Creators ranked by total revenue generated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topCreators.map((creator, index) => (
              <div key={creator.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                    <AvatarFallback>
                      {creator.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{creator.name}</h4>
                    <p className="text-sm text-muted-foreground">{creator.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{creator.agents} agents</span>
                      <span>•</span>
                      <div className="flex items-center">
                        {creator.growth > 0 ? (
                          <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                        )}
                        <span className={creator.growth > 0 ? "text-green-600" : "text-red-600"}>
                          {Math.abs(creator.growth)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{formatCurrency(creator.revenue)}</div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="text-sm font-medium text-green-600 mt-1">
                    {formatCurrency(creator.commission)} earned
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Volume</CardTitle>
            <CardDescription>Total completed transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
            <Progress value={75} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
            <CardDescription>Visitors to purchasers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.conversionRate}%</div>
            <Progress value={stats.conversionRate} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">+2.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Category</CardTitle>
            <CardDescription>Highest revenue category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.topCategory}</div>
            <div className="text-lg text-green-600 font-medium">{formatCurrency(categoryRevenue[0].revenue)}</div>
            <p className="text-xs text-muted-foreground mt-2">
              {((categoryRevenue[0].revenue / stats.totalRevenue) * 100).toFixed(1)}% of total revenue
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
