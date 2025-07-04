"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Check,
  ShoppingCart,
  Star,
  Users,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"
import { generateUserAvatar, formatTimeAgo } from "@/lib/utils"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error" | "purchase" | "review" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionText?: string
  sender?: string
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "purchase",
      title: "Purchase Confirmed",
      message: "Your purchase of 'Customer Service AI Agent' has been confirmed. You can now download and deploy it.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false,
      actionUrl: "/agents/customer-service-ai",
      actionText: "View Agent",
      sender: "system@9jaagents.com",
    },
    {
      id: "2",
      type: "review",
      title: "New Review Received",
      message: "Your 'Sales Automation Agent' received a 5-star review from a customer.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionUrl: "/creator/agents/sales-automation",
      actionText: "View Review",
      sender: "reviews@9jaagents.com",
    },
    {
      id: "3",
      type: "system",
      title: "Platform Maintenance",
      message:
        "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM WAT. Some features may be temporarily unavailable.",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      read: true,
      sender: "admin@9jaagents.com",
    },
    {
      id: "4",
      type: "success",
      title: "Agent Approved",
      message: "Your 'Inventory Management AI' has been approved and is now live on the marketplace!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionUrl: "/agents/inventory-management-ai",
      actionText: "View Listing",
      sender: "approval@9jaagents.com",
    },
    {
      id: "5",
      type: "warning",
      title: "Payment Reminder",
      message:
        "Your subscription payment is due in 3 days. Please update your payment method to avoid service interruption.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: false,
      actionUrl: "/settings/billing",
      actionText: "Update Payment",
      sender: "billing@9jaagents.com",
    },
    {
      id: "6",
      type: "error",
      title: "Payment Failed",
      message: "We couldn't process your payment for the Premium Plan. Please check your payment details.",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      actionUrl: "/settings/billing",
      actionText: "Retry Payment",
      sender: "billing@9jaagents.com",
    },
    {
      id: "7",
      type: "info",
      title: "New Features Available",
      message: "Check out our new AI agent analytics dashboard to track your agent's performance and earnings.",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      read: true,
      actionUrl: "/creator/analytics",
      actionText: "Explore Features",
      sender: "updates@9jaagents.com",
    },
  ])

  const [activeTab, setActiveTab] = useState("all")

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingCart className="h-4 w-4" />
      case "review":
        return <Star className="h-4 w-4" />
      case "system":
        return <Users className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertCircle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      case "info":
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "purchase":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20"
      case "review":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20"
      case "system":
        return "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/20"
      case "success":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20"
      case "warning":
        return "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/20"
      case "error":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20"
      case "info":
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "unread") return !notification.read
    if (activeTab === "read") return notification.read
    return true
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: false } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="text-gray-600 dark:text-gray-400">Stay updated with your latest activities</p>
            </div>
          </div>

          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="read">Read ({notifications.length - unreadCount})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center">
                    {activeTab === "unread"
                      ? "You're all caught up! No unread notifications."
                      : activeTab === "read"
                        ? "No read notifications yet."
                        : "You don't have any notifications yet."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md ${
                    !notification.read ? "border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Avatar */}
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        <AvatarImage
                          src={generateUserAvatar(notification.sender || "system")}
                          alt="Notification sender"
                        />
                        <AvatarFallback>
                          {notification.sender ? notification.sender[0].toUpperCase() : "S"}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                            {!notification.read && (
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              >
                                New
                              </Badge>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-1 ml-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                notification.read ? markAsUnread(notification.id) : markAsRead(notification.id)
                              }
                              className="h-8 w-8 p-0"
                            >
                              {notification.read ? <MarkAsUnread className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{notification.message}</p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </span>

                          {notification.actionUrl && notification.actionText && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={notification.actionUrl}>{notification.actionText}</a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
