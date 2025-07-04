"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Star,
  Download,
  Shield,
  Headphones,
  CreditCard,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { formatPrice, generateUserAvatar } from "@/lib/utils"

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  downloads: number
  quantity: number
  creator: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Customer Service AI Agent",
      description: "Automated customer support with natural language processing for Nigerian businesses",
      price: 25000,
      originalPrice: 35000,
      image: "/placeholder.svg?height=80&width=80",
      category: "Customer Service",
      rating: 4.8,
      downloads: 1250,
      quantity: 1,
      creator: "TechSolutions NG",
    },
    {
      id: "2",
      name: "Sales Automation Agent",
      description: "Streamline your sales process with intelligent lead qualification and follow-up",
      price: 45000,
      image: "/placeholder.svg?height=80&width=80",
      category: "Sales & Marketing",
      rating: 4.9,
      downloads: 890,
      quantity: 2,
      creator: "AI Innovations Ltd",
    },
    {
      id: "3",
      name: "Inventory Management AI",
      description: "Smart inventory tracking and automated reordering for retail businesses",
      price: 35000,
      originalPrice: 50000,
      image: "/placeholder.svg?height=80&width=80",
      category: "Operations",
      rating: 4.7,
      downloads: 650,
      quantity: 1,
      creator: "RetailTech Africa",
    },
  ])

  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    const validCodes = {
      WELCOME10: 0.1,
      SAVE20: 0.2,
      NEWUSER: 0.15,
    }

    const discount = validCodes[promoCode.toUpperCase() as keyof typeof validCodes]
    if (discount) {
      setAppliedPromo({ code: promoCode.toUpperCase(), discount })
      setPromoCode("")
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const total = subtotal - discountAmount

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Discover amazing AI agents to automate your business processes
            </p>
            <Button asChild>
              <Link href="/marketplace">
                Browse Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <ShoppingCart className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                            {item.originalPrice && (
                              <Badge variant="destructive" className="text-xs">
                                Sale
                              </Badge>
                            )}
                          </div>

                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Avatar className="h-5 w-5">
                                <AvatarImage
                                  src={generateUserAvatar(item.creator) || "/placeholder.svg"}
                                  alt={item.creator}
                                />
                                <AvatarFallback className="text-xs">{item.creator[0]}</AvatarFallback>
                              </Avatar>
                              <span>{item.creator}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{item.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Download className="h-4 w-4" />
                              <span>{item.downloads.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div className="font-bold text-lg text-gray-900 dark:text-white">
                              {formatPrice(item.price)}
                            </div>
                            {item.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(item.originalPrice)}
                              </div>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode.trim()}>
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="text-sm text-green-600 dark:text-green-400">
                      ✓ {appliedPromo.code} applied ({appliedPromo.discount * 100}% off)
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-4 pt-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">30-day refund</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Headphones className="h-5 w-5 text-blue-600" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">24/7 support</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">
                  Secure checkout powered by Paystack
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/marketplace">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
