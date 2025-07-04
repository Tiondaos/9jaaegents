"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Download, Heart, ShoppingCart, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Agent, Category } from "@/lib/supabase"

const AGENTS_PER_PAGE = 12

export default function MarketplacePage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [totalAgents, setTotalAgents] = useState(0)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchAgents()
  }, [searchQuery, selectedCategory, sortBy, currentPage])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchAgents = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: AGENTS_PER_PAGE.toString(),
        sortBy,
      })

      if (searchQuery) params.append("search", searchQuery)
      if (selectedCategory !== "all") params.append("category", selectedCategory)

      const response = await fetch(`/api/agents?${params}`)
      const data = await response.json()

      setAgents(data.agents || [])
      setTotalPages(data.pagination?.totalPages || 1)
      setTotalAgents(data.pagination?.total || 0)
    } catch (error) {
      console.error("Error fetching agents:", error)
      setAgents([])
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number, currency = "NGN") => {
    if (price === 0) return "Free"

    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const renderPaginationNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages)
      }
    }

    return pages.map((page, index) => (
      <Button
        key={index}
        variant={page === currentPage ? "default" : "outline"}
        size="sm"
        onClick={() => typeof page === "number" && handlePageChange(page)}
        disabled={typeof page !== "number"}
        className="min-w-[40px]"
      >
        {page === "..." ? <MoreHorizontal className="h-4 w-4" /> : page}
      </Button>
    ))
  }

  if (isLoading && agents.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">AI Agent Marketplace</h1>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="h-10 bg-muted rounded-md flex-1 animate-pulse" />
            <div className="h-10 bg-muted rounded-md w-48 animate-pulse" />
            <div className="h-10 bg-muted rounded-md w-32 animate-pulse" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-3 bg-muted rounded mb-4" />
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-muted rounded w-16" />
                  <div className="h-4 bg-muted rounded w-12" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Agent Marketplace</h1>
        <p className="text-muted-foreground mb-6">Discover powerful AI automation solutions for your business</p>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="price-low">Price: Low</SelectItem>
              <SelectItem value="price-high">Price: High</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * AGENTS_PER_PAGE + 1}-{Math.min(currentPage * AGENTS_PER_PAGE, totalAgents)} of{" "}
            {totalAgents} agents
          </p>
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      </div>

      {/* Agents Grid */}
      {agents.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No agents found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || selectedCategory !== "all"
              ? "Try adjusting your search criteria or browse all categories."
              : "Be the first to list an agent on our marketplace!"}
          </p>
          <Link href="/list-agent">
            <Button>List Your Agent</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {agents.map((agent) => (
              <Card key={agent.id} className="group hover:shadow-lg transition-all duration-200">
                <div className="relative">
                  <Image
                    src={agent.screenshots?.[0] || "/placeholder.svg?height=200&width=300"}
                    alt={agent.name}
                    width={300}
                    height={200}
                    className="w-full aspect-video object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 left-2 bg-gradient-to-r from-green-600 to-blue-600">
                    {agent.category?.name || "Uncategorized"}
                  </Badge>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-sm lg:text-base line-clamp-1 mb-1">{agent.name}</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2 mb-2">{agent.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{agent.rating || "New"}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Download className="h-3 w-3 mr-1" />
                        <span>{agent.total_sales || 0}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {agent.pricing_model}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm lg:text-base">{formatPrice(agent.price, agent.currency)}</p>
                    </div>
                    <Button size="sm" className="h-8 px-3" asChild>
                      <Link href={`/agents/${agent.id}`}>
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Link>
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground mt-2">
                    by {agent.creator?.first_name} {agent.creator?.last_name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <div className="flex space-x-1">{renderPaginationNumbers()}</div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
