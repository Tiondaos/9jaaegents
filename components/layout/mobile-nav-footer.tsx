"use client"

import { Home, Search, ShoppingCart, Bell, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNavFooter() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      name: "Search",
      href: "/marketplace",
      icon: Search,
    },
    {
      name: "Cart",
      href: "/cart",
      icon: ShoppingCart,
      badge: 3,
    },
    {
      name: "Notifications",
      href: "/notifications",
      icon: Bell,
      badge: 5,
    },
    {
      name: "Profile",
      href: "/dashboard",
      icon: User,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 dark:bg-gray-900/80 dark:border-gray-800 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 relative",
                isActive ? "text-green-600 dark:text-green-400" : "text-gray-600 dark:text-gray-400",
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
