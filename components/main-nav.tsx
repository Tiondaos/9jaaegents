"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {}

export function MainNav({ className, ...props }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/marketplace"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/marketplace" ? "text-foreground" : "text-foreground/60",
        )}
      >
        Marketplace
      </Link>
      <Link
        href="/categories"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/categories" ? "text-foreground" : "text-foreground/60",
        )}
      >
        Categories
      </Link>
      <Link
        href="/about"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/about" ? "text-foreground" : "text-foreground/60",
        )}
      >
        About
      </Link>
      <Link
        href="/contact"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/contact" ? "text-foreground" : "text-foreground/60",
        )}
      >
        Contact
      </Link>
    </nav>
  )
}
