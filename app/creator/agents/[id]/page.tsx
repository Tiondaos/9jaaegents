"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import {
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Eye,
  Edit,
  Settings,
  BarChart3,
  Calendar,
  Globe,
  ArrowLeft,
  RefreshCw,
  MoreHorizontal,
  Flag,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface AgentAnalytics {
  totalRevenue: number
  totalSales: number
  totalViews: number
  averageRating: number
  conversionRate: number
  monthlyGrowth: number
  activeUsers: number
  refundRate: number
}

interface SalesData {
  month: string
  sales: number
  revenue: number
  views: number
}

interface CountryData {
  country: string
  flag: string
  percentage: number
  sales: number
}

interface UserRetentionData {
  week: number
  newUsers: number
  returningUsers: number
  retentionRate: number
}

export default function CreatorAgentDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [analytics, setAnalytics] = useState<AgentAnalytics | null>(null)
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [countryData, setCountryData] = useState<CountryData[]>([])
  const [retentionData, setRetentionData] = useState<UserRetentionData[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("monthly")

  useEffect(() => {
    // Simulate fetching creator analytics
    const fetchAnalytics = async () => {
      const mockAnalytics: AgentAnalytics = {
        totalRevenue: 2450000,
        totalSales: 184,
        totalViews: 12500,
        averageRating: 4.8,
        conversionRate: 12.5,
        monthlyGrowth: 23.4,
        activeUsers: 156,
        refundRate: 2.1,
      }

      const mockSalesData: SalesData[] = [
        { month: "Jan", sales: 45, revenue: 675000, views: 1200 },
        { month: "Feb", sales: 52, revenue: 780000, views: 1450 },
        { month: "Mar", sales: 48, revenue: 720000, views: 1300 },
        { month: "Apr", sales: 61, revenue: 915000, views: 1600 },
        { month: "May", sales: 55, revenue: 825000, views: 1500 },
        { month: "Jun", sales: 67, revenue: 1005000, views: 1800 },
        { month: "Jul", sales: 72, revenue: 1080000, views: 1950 },
        { month: "Aug", sales: 68, revenue: 1020000, views: 1850 },
        { month: "Sep", sales: 78, revenue: 1170000, views: 2100 },
        { month: "Oct", sales: 84, revenue: 1260000, views: 2250 },
        { month: "Nov", sales: 91, revenue: 1365000, views: 2400 },
        { month: "Dec", sales: 89, revenue: 1335000, views: 2300 },
      ]

      const mockCountryData: CountryData[] = [
        { country: "Nigeria", flag: "🇳🇬", percentage: 45.2, sales: 83 },
        { country: "Ghana", flag: "🇬🇭", percentage: 18.7, sales: 34 },
        { country: "Kenya", flag: "🇰🇪", percentage: 13.8, sales: 25 },
        { country: "South Africa", flag: "🇿🇦", percentage: 10.5, sales: 19 },
        { country: "Others", flag: "🌍", percentage: 11.8, sales: 23 },
      ]

      const mockRetentionData: UserRetentionData[] = [
        { week: 1, newUsers: 45, returningUsers: 0, retentionRate: 100 },
        { week: 2, newUsers: 12, returningUsers: 38, retentionRate: 84 },
        { week: 3, newUsers: 8, returningUsers: 32, retentionRate: 71 },
        { week: 4, newUsers: 15, returningUsers: 28, retentionRate: 62 },
        { week: 5, newUsers: 22, returningUsers: 25, retentionRate: 56 },
        { week: 6, newUsers: 18, returningUsers: 23, retentionRate: 51 },
        { week: 7, newUsers: 25, returningUsers: 21, retentionRate: 47 },
        { week: 8, newUsers: 30, returningUsers: 20, retentionRate: 44 },
      ]

      setAnalytics(mockAnalytics)
      setSalesData(mockSalesData)
      setCountryData(mockCountryData)
      setRetentionData(mockRetentionData)
      setLoading(false)
    }

    fetchAnalytics()
  }, [params.id])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-96 bg-gray-200 rounded-lg"></div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Analytics Not Available</h1>
          <p className="text-muted-foreground mb-4">Unable to load agent analytics.</p>
          <Button asChild>
            <Link href="/creator/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/creator/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-3xl font-bold">DataClean Pro Analytics</h1>
              <p className="text-muted-foreground">Monitor your agent's performance and user engagement</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              {timeRange === "monthly" ? "Monthly" : "Weekly"}
            </Button>
            <Button size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Agent
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">{formatCurrency(analytics.totalRevenue)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+{analytics.monthlyGrowth}%</span>
                    <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                  <p className="text-3xl font-bold">{formatNumber(analytics.totalSales)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                    <span className="text-sm text-blue-600">+12.5%</span>
                    <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                  <p className="text-3xl font-bold">{formatNumber(analytics.totalViews)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-purple-500 mr-1" />
                    <span className="text-sm text-purple-600">+8.2%</span>
                    <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-3xl font-bold">{analytics.conversionRate}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-sm text-orange-600">+2.1%</span>
                    <span className="text-sm text-muted-foreground ml-1">vs last month</span>
                  </div>
                </div>
                <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sales Performance Chart */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sales Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">Revenue and sales trends over time</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className={timeRange === "monthly" ? "bg-blue-50" : ""}>
                    Monthly
                  </Button>
                  <Button variant="outline" size="sm">
                    Weekly
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [name === "revenue" ? formatCurrency(Number(value)) : value, name]}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.1}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stackId="2"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Breakdown */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed metrics for your agent</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#f97316"
                          strokeWidth="2"
                          strokeDasharray={`${analytics.conversionRate * 2.51}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold">{analytics.conversionRate}%</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Conversion Rate</div>
                    <div className="text-xs text-muted-foreground">{analytics.totalSales} sales</div>
                  </div>

                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeDasharray={`${analytics.averageRating * 20}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold">{analytics.averageRating}</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Average Rating</div>
                    <div className="text-xs text-muted-foreground">Based on reviews</div>
                  </div>

                  <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeDasharray={`${(100 - analytics.refundRate) * 2.51}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold">{(100 - analytics.refundRate).toFixed(1)}%</span>
                      </div>
                    </div>
                    <div className="text-sm font-medium">Satisfaction Rate</div>
                    <div className="text-xs text-muted-foreground">{analytics.refundRate}% refund rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Analytics */}
          <div className="space-y-8">
            {/* Top Performing Countries */}
            <Card className="bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Top Performing Countries
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {countryData.map((country, index) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="font-medium">{country.country}</div>
                        <div className="text-sm text-muted-foreground">{country.percentage}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{country.sales}</div>
                      <div className="text-sm text-muted-foreground">sales</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User Retention */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  User Retention Cohorts
                </CardTitle>
                <p className="text-sm text-muted-foreground">Performing • 8 weeks</p>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold mb-2">44%</div>
                  <div className="text-sm text-muted-foreground">After 8 weeks</div>
                  <div className="text-xs text-muted-foreground">vs 40% last period</div>
                </div>

                {/* Retention Heatmap */}
                <div className="grid grid-cols-8 gap-1 mb-4">
                  {retentionData.map((week) => (
                    <div
                      key={week.week}
                      className={`h-8 rounded text-xs flex items-center justify-center text-white font-medium ${
                        week.retentionRate > 80
                          ? "bg-green-500"
                          : week.retentionRate > 60
                            ? "bg-yellow-500"
                            : week.retentionRate > 40
                              ? "bg-orange-500"
                              : "bg-red-500"
                      }`}
                    >
                      {week.retentionRate}%
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Week 1</span>
                  <span>Week 8</span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded"></div>
                      <span>First-Time Buyers</span>
                    </div>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Loyal Customers</span>
                    </div>
                    <span className="font-medium">40%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Agent Details
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Pricing
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Flag className="h-4 w-4 mr-2" />
                  Promote Agent
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
