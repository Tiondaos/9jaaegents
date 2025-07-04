"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Globe, Star, Trophy, Edit, Share2 } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const userStats = {
    agentsPurchased: 12,
    totalSpent: 180000,
    reviewsWritten: 8,
    averageRating: 4.6,
    memberSince: "January 2024",
    location: "Lagos, Nigeria",
    website: "https://johndoe.dev",
  }

  const recentPurchases = [
    {
      id: "1",
      name: "DataClean Pro",
      category: "Data Processing",
      purchaseDate: "2024-01-15",
      rating: 5,
    },
    {
      id: "2",
      name: "Content Genius",
      category: "Content Creation",
      purchaseDate: "2024-01-10",
      rating: 4,
    },
    {
      id: "3",
      name: "ChatBot Nigeria",
      category: "Customer Service",
      purchaseDate: "2024-01-05",
      rating: 5,
    },
  ]

  const reviews = [
    {
      id: "1",
      agentName: "DataClean Pro",
      rating: 5,
      comment: "Excellent tool! Saved us countless hours cleaning customer data.",
      date: "2024-01-16",
    },
    {
      id: "2",
      agentName: "Content Genius",
      rating: 4,
      comment: "Great for processing our sales data. The multi-language support is impressive.",
      date: "2024-01-12",
    },
  ]

  const achievements = [
    { name: "Early Adopter", description: "One of the first 100 users", icon: "🚀" },
    { name: "Review Master", description: "Written 5+ helpful reviews", icon: "⭐" },
    { name: "Big Spender", description: "Spent over ₦100,000", icon: "💰" },
    { name: "Community Helper", description: "Helped other users", icon: "🤝" },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg" alt="John Doe" />
                  <AvatarFallback className="text-2xl">JD</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold">John Doe</h1>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    AI enthusiast and business automation expert from Lagos, Nigeria. Passionate about helping
                    businesses leverage AI for growth.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {userStats.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Joined {userStats.memberSince}
                    </div>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      <a href={userStats.website} className="hover:underline">
                        johndoe.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button asChild>
                      <Link href="/settings">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Link>
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{userStats.agentsPurchased}</div>
                <div className="text-sm text-muted-foreground">Agents Owned</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{formatCurrency(userStats.totalSpent)}</div>
                <div className="text-sm text-muted-foreground">Total Spent</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{userStats.reviewsWritten}</div>
                <div className="text-sm text-muted-foreground">Reviews Written</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{userStats.averageRating}</div>
                <div className="text-sm text-muted-foreground">Avg Rating Given</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="reviews">My Reviews</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Purchases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPurchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {purchase.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{purchase.name}</h3>
                            <p className="text-sm text-muted-foreground">{purchase.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < purchase.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">{purchase.purchaseDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Reviews</CardTitle>
                  <p className="text-sm text-muted-foreground">Reviews you've written for AI agents</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{review.agentName}</h4>
                            <div className="flex items-center mt-1">
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
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Achievements
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Your accomplishments on 9jaAgents</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h4 className="font-semibold">{achievement.name}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
