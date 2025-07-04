"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, Users, Star, DollarSign } from "lucide-react"

interface AgentPerformance {
  id: string
  name: string
  totalSales: number
  revenue: number
  rating: number
  downloads: number
  conversionRate: number
  monthlyGrowth: number
}

interface SalesData {
  month: string
  sales: number
  revenue: number
}

interface CategoryData {
  name: string
  value: number
  color: string
}

export function AgentPerformanceDashboard() {
  const [performanceData, setPerformanceData] = useState<AgentPerformance[]>([])
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [categoryData, setCategoryData] = useState<CategoryData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching performance data
    const fetchData = async () => {
      const mockPerformance: AgentPerformance[] = [
        {
          id: "1",
          name: "DataClean Pro",
          totalSales: 156,
          revenue: 2340000,
          rating: 4.8,
          downloads: 1250,
          conversionRate: 12.5,
          monthlyGrowth: 23.4,
        },
        {
          id: "2",
          name: "Content Genius",
          totalSales: 89,
          revenue: 2225000,
          rating: 4.6,
          downloads: 890,
          conversionRate: 10.0,
          monthlyGrowth: 18.2,
        },
        {
          id: "3",
          name: "AutoFlow Master",
          totalSales: 67,
          revenue: 2345000,
          rating: 4.9,
          downloads: 567,
          conversionRate: 11.8,
          monthlyGrowth: 15.7,
        },
      ]

      const mockSalesData: SalesData[] = [
        { month: "Jan", sales: 45, revenue: 675000 },
        { month: "Feb", sales: 52, revenue: 780000 },
        { month: "Mar", sales: 48, revenue: 720000 },
        { month: "Apr", sales: 61, revenue: 915000 },
        { month: "May", sales: 55, revenue: 825000 },
        { month: "Jun", sales: 67, revenue: 1005000 },
      ]

      const mockCategoryData: CategoryData[] = [
        { name: "Data Processing", value: 35, color: "#8884d8" },
        { name: "Content Creation", value: 25, color: "#82ca9d" },
        { name: "Automation", value: 20, color: "#ffc658" },
        { name: "Analytics", value: 15, color: "#ff7300" },
        { name: "Others", value: 5, color: "#00ff00" },
      ]

      setPerformanceData(mockPerformance)
      setSalesData(mockSalesData)
      setCategoryData(mockCategoryData)
      setLoading(false)
    }

    fetchData()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Agent Performance Dashboard</h2>
        <Badge variant="secondary">Last 30 days</Badge>
      </div>

      {/* Top Performing Agents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {performanceData.map((agent, index) => (
          <Card key={agent.id} className="relative overflow-hidden">
            {index === 0 && <Badge className="absolute top-2 right-2 bg-yellow-500">#1 Best Seller</Badge>}
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{agent.name}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm">{agent.rating}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Revenue
                  </div>
                  <div className="text-lg font-semibold text-green-600">{formatCurrency(agent.revenue)}</div>
                </div>
                <div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    Sales
                  </div>
                  <div className="text-lg font-semibold">{agent.totalSales}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Conversion Rate</span>
                  <span>{agent.conversionRate}%</span>
                </div>
                <Progress value={agent.conversionRate} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly Growth</span>
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />+{agent.monthlyGrowth}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Sales Trends</TabsTrigger>
          <TabsTrigger value="categories">Category Distribution</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Revenue"]} />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
