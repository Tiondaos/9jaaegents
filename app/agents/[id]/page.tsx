"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import {
  Star,
  Download,
  Heart,
  Share2,
  CheckCircle,
  Zap,
  ArrowLeft,
  ExternalLink,
  Copy,
  Eye,
  ThumbsUp,
  Verified,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Agent {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  rating: number
  downloads: number
  category: string
  images: string[]
  tags: string[]
  features: string[]
  useCases: string[]
  requirements: string[]
  developer: {
    name: string
    avatar: string
    verified: boolean
    joinDate: string
  }
  lastUpdated: string
  version: string
  compatibility: string[]
  isNew: boolean
  isOpenSource: boolean
  isPlatform: boolean
}

interface Review {
  id: string
  user: {
    name: string
    avatar: string
    verified: boolean
  }
  rating: number
  comment: string
  date: string
  helpful: number
}

interface AlternativeAgent {
  id: string
  name: string
  description: string
  logo: string
  category: string
}

export default function AgentDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [agent, setAgent] = useState<Agent | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [alternatives, setAlternatives] = useState<AlternativeAgent[]>([])
  const [featuredAgents, setFeaturedAgents] = useState<AlternativeAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // Simulate fetching agent details
    const fetchAgent = async () => {
      const mockAgent: Agent = {
        id: params.id as string,
        name: "DataClean Pro",
        description: "Powerful AI Agents Anyone Can Build, Regardless Of Technical Abilities",
        longDescription: `Build agents for any business process in minutes using natural language. DataClean Pro is a comprehensive AI-powered data cleaning and processing solution specifically designed for Nigerian businesses.

        This powerful agent can automatically detect and fix common data quality issues, standardize formats, remove duplicates, and validate information against Nigerian business standards. Perfect for SMEs, banks, fintech companies, and any organization dealing with large datasets.`,
        price: 15000,
        rating: 5.0,
        downloads: 1250,
        category: "Data Processing",
        images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
        tags: ["data", "cleaning", "processing", "excel", "csv", "nigerian"],
        features: [
          "Automatic data cleaning and validation",
          "Support for Nigerian data formats",
          "Multi-language processing (English, Yoruba, Hausa, Igbo)",
          "Excel and CSV file processing",
          "Duplicate detection and removal",
          "Data standardization",
          "Compliance with Nigerian data standards",
          "Batch processing capabilities",
        ],
        useCases: [
          "All business processes",
          "Customer data management",
          "Financial record cleaning",
          "Inventory management",
          "Sales data processing",
        ],
        requirements: [
          "Windows 10 or macOS 10.14+",
          "4GB RAM minimum",
          "1GB free disk space",
          "Internet connection for updates",
        ],
        developer: {
          name: "AI Agents Directory",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
          joinDate: "Jul 2, 2024",
        },
        lastUpdated: "2024-01-15",
        version: "2.1.0",
        compatibility: ["Windows", "macOS", "Web Browser"],
        isNew: true,
        isOpenSource: true,
        isPlatform: true,
      }

      const mockReviews: Review[] = [
        {
          id: "1",
          user: {
            name: "Louis Bourmelenne",
            avatar: "/placeholder.svg?height=32&width=32",
            verified: true,
          },
          rating: 5,
          comment:
            "Smooth and clean. Smooth experience, clean UI and I can say with confidence that Activepieces have the least overhead to get started with agents compared to all other platforms. Chapeau! 🎩",
          date: "Jul 2, 2024",
          helpful: 12,
        },
      ]

      const mockAlternatives: AlternativeAgent[] = [
        {
          id: "1",
          name: "Voiceflow",
          description: "Conversational AI Assistant that helps you...",
          logo: "/placeholder.svg?height=32&width=32",
          category: "AI Platform",
        },
        {
          id: "2",
          name: "Oraczen's Zen Platform",
          description: "Creating the Generative Enterprise",
          logo: "/placeholder.svg?height=32&width=32",
          category: "Enterprise",
        },
        {
          id: "3",
          name: "Beam AI",
          description: "AI-powered automation platform",
          logo: "/placeholder.svg?height=32&width=32",
          category: "Automation",
        },
      ]

      const mockFeaturedAgents: AlternativeAgent[] = [
        {
          id: "1",
          name: "Teammates.ai",
          description: "AI teammates that take on entire business...",
          logo: "/placeholder.svg?height=32&width=32",
          category: "Business AI",
        },
        {
          id: "2",
          name: "Oraczen's Zen Platform",
          description: "Creating the Generative Enterprise",
          logo: "/placeholder.svg?height=32&width=32",
          category: "Enterprise",
        },
        {
          id: "3",
          name: "Agentverse",
          description: "Search and discover AI Agents",
          logo: "/placeholder.svg?height=32&width=32",
          category: "Directory",
        },
      ]

      setAgent(mockAgent)
      setReviews(mockReviews)
      setAlternatives(mockAlternatives)
      setFeaturedAgents(mockFeaturedAgents)
      setLoading(false)
    }

    fetchAgent()
  }, [params.id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handlePurchase = () => {
    toast({
      title: "Added to Cart",
      description: `${agent?.name} has been added to your cart.`,
    })
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${agent?.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="https://9jaagents.com/embed/${agent?.id}" width="100%" height="400"></iframe>`
    navigator.clipboard.writeText(embedCode)
    toast({
      title: "Embed Code Copied",
      description: "The embed code has been copied to your clipboard.",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <p className="text-muted-foreground mb-4">The agent you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/marketplace">Browse Marketplace</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/marketplace" className="hover:text-foreground flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Marketplace
          </Link>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header Section */}
            <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h1 className="text-3xl font-bold">{agent.name}</h1>
                        <div className="flex space-x-1">
                          {agent.isNew && <Badge className="bg-green-100 text-green-800 hover:bg-green-200">New</Badge>}
                          {agent.isOpenSource && (
                            <Badge variant="outline" className="border-blue-200 text-blue-700">
                              Open Source
                            </Badge>
                          )}
                          {agent.isPlatform && (
                            <Badge variant="outline" className="border-purple-200 text-purple-700">
                              AI Agents Platform
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 font-semibold">{agent.rating}</span>
                          <span className="text-muted-foreground ml-1">({reviews.length})</span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="#reviews">Write a Review</Link>
                        </Button>
                      </div>

                      <p className="text-lg text-muted-foreground mb-6">{agent.description}</p>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-muted-foreground">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{agent.downloads.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>8</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Download className="h-4 w-4 mr-1" />
                          <span>0</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={handleWishlist}>
                      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                  <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                    <Zap className="h-4 w-4 mr-2" />
                    Agent Arena
                  </Button>
                  <Button variant="outline" size="lg">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                  <Button variant="outline" size="lg" onClick={copyEmbedCode}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy embed code
                  </Button>
                </div>

                {/* Developer Info */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Listed by</div>
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">{agent.developer.name}</span>
                        {agent.developer.verified && <Verified className="h-4 w-4 text-blue-500" />}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{agent.developer.joinDate}</div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <Tabs defaultValue="overview" className="w-full">
                <div className="border-b px-6">
                  <TabsList className="grid w-full grid-cols-6 bg-transparent h-auto p-0">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none py-4"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="features"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none py-4"
                    >
                      Features
                    </TabsTrigger>
                    <TabsTrigger
                      value="use-cases"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none py-4"
                    >
                      Use Cases
                    </TabsTrigger>
                    <TabsTrigger
                      value="pricing"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none py-4"
                    >
                      Pricing
                    </TabsTrigger>
                    <TabsTrigger
                      value="alternatives"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none py-4"
                    >
                      Alternatives
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none py-4"
                    >
                      Reviews
                      <Badge variant="secondary" className="ml-2">
                        {reviews.length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{agent.name} Overview</h3>
                    <div className="prose max-w-none">
                      {agent.longDescription.split("\n\n").map((paragraph, index) => (
                        <p key={index} className="mb-4 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">{agent.name} Use Cases</h4>
                    <ul className="space-y-2">
                      {agent.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {agent.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="use-cases" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
                  <div className="space-y-4">
                    {agent.useCases.map((useCase, index) => (
                      <div key={index} className="p-4 rounded-lg border bg-white">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="font-medium">{useCase}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="p-6">
                  <div className="text-center py-12">
                    <div className="text-4xl font-bold text-green-600 mb-2">{formatPrice(agent.price)}</div>
                    <p className="text-muted-foreground mb-6">One-time purchase</p>
                    <Button size="lg" onClick={handlePurchase} className="bg-green-600 hover:bg-green-700">
                      Purchase Now
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="alternatives" className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Alternative AI Agents</h3>
                  <div className="space-y-4">
                    {alternatives.map((alt) => (
                      <div key={alt.id} className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50">
                        <img src={alt.logo || "/placeholder.svg"} alt={alt.name} className="w-10 h-10 rounded-lg" />
                        <div className="flex-1">
                          <div className="font-semibold">{alt.name}</div>
                          <div className="text-sm text-muted-foreground">{alt.description}</div>
                        </div>
                        <Badge variant="outline">{alt.category}</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="p-6" id="reviews">
                  <div className="space-y-6">
                    {/* Rating Summary */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">Reviews & Ratings</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 font-semibold">{agent.rating}</span>
                          </div>
                          <span className="text-muted-foreground">Based on {reviews.length} review</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline">Write a Review</Button>
                        <Button variant="outline">Most Recent</Button>
                      </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-6xl font-bold mb-2">{agent.rating}</div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-6 w-6 ${
                                i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-muted-foreground">Based on {reviews.length} review</div>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center space-x-2">
                            <span className="text-sm w-8">{stars}</span>
                            <Progress value={stars === 5 ? 100 : 0} className="flex-1" />
                            <span className="text-sm text-muted-foreground w-8">{stars === 5 ? "1" : "0"}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                              <AvatarFallback>
                                {review.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-semibold">{review.user.name}</span>
                                {review.user.verified && <Verified className="h-4 w-4 text-blue-500" />}
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-3">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <button className="hover:text-foreground flex items-center space-x-1">
                                  <ThumbsUp className="h-3 w-3" />
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                                <span>{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Featured AI Agents */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Featured AI Agents
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredAgents.map((agent) => (
                  <div key={agent.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <img
                      src={agent.logo || "/placeholder.svg"}
                      alt={agent.name}
                      className="w-8 h-8 rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{agent.name}</div>
                      <div className="text-xs text-muted-foreground line-clamp-2">{agent.description}</div>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-xs">
                          {agent.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Categories */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Popular Categories
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/categories">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "AI Agents Platform", count: 156, icon: "🤖", color: "bg-blue-100 text-blue-800" },
                  { name: "Productivity", count: 108, icon: "⚡", color: "bg-green-100 text-green-800" },
                  { name: "AI Agents Frameworks", count: 101, icon: "🔧", color: "bg-purple-100 text-purple-800" },
                  { name: "Voice AI Agents", count: 79, icon: "🎤", color: "bg-orange-100 text-orange-800" },
                  { name: "Customer Service", count: 75, icon: "💬", color: "bg-pink-100 text-pink-800" },
                  { name: "Content Creation", count: 68, icon: "✍️", color: "bg-yellow-100 text-yellow-800" },
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center text-sm`}>
                        {category.icon}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{category.name}</div>
                        <div className="text-xs text-muted-foreground">{category.count} agents</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      +{Math.floor(Math.random() * 20)}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
