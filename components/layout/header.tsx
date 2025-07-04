"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Menu,
  ShoppingCart,
  Bell,
  User,
  Settings,
  LogOut,
  Plus,
  BarChart3,
  Crown,
  Palette,
  Shield,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const getUserInitials = (user: any) => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`.toUpperCase()
    }
    return user?.email?.[0]?.toUpperCase() || "U"
  }

  const getUserRole = (user: any) => {
    return user?.user_metadata?.role || "user"
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge variant="destructive" className="text-xs">
            <Crown className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      case "creator":
        return (
          <Badge variant="secondary" className="text-xs">
            <Palette className="h-3 w-3 mr-1" />
            Creator
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-xs">
            <User className="h-3 w-3 mr-1" />
            User
          </Badge>
        )
    }
  }

  const canListAgents = (role: string) => {
    return role === "creator" || role === "admin"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-blue-600 text-white font-bold">
              9A
            </div>
            <span className="hidden font-bold sm:inline-block">9jaAgents</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
              Marketplace
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search agents..."
                className="pl-10 pr-4"
                onFocus={() => setIsSearchOpen(true)}
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* List Your Agent Button - Only for creators and admins */}
            {user && canListAgents(getUserRole(user)) && (
              <Button asChild className="hidden md:flex bg-green-600 hover:bg-green-700">
                <Link href="/list-agent">
                  <Plus className="h-4 w-4 mr-2" />
                  List Your Agent
                </Link>
              </Button>
            )}

            {/* Search Button (Mobile) */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-4 w-4" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">0</Badge>
            </Button>

            {/* Notifications */}
            {user && (
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-red-500">3</Badge>
              </Button>
            )}

            {/* User Menu or Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt="Avatar" />
                      <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <div className="pt-1">{getRoleBadge(getUserRole(user))}</div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Role-based menu items */}
                  {getUserRole(user) === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <Shield className="mr-2 h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  {canListAgents(getUserRole(user)) && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/creator/dashboard">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Creator Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/list-agent">
                          <Plus className="mr-2 h-4 w-4" />
                          List Your Agent
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get started</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin-login">Admin</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-4">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search agents..." className="pl-10" />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-2">
                    <Link
                      href="/marketplace"
                      className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                    >
                      <span>Marketplace</span>
                    </Link>
                    <Link
                      href="/categories"
                      className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                    >
                      <span>Categories</span>
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                    >
                      <span>About</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                    >
                      <span>Contact</span>
                    </Link>

                    {/* Mobile List Agent Button */}
                    {user && canListAgents(getUserRole(user)) && (
                      <Link
                        href="/list-agent"
                        className="flex items-center space-x-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors p-2 rounded-md hover:bg-green-50"
                      >
                        <Plus className="h-4 w-4" />
                        <span>List Your Agent</span>
                      </Link>
                    )}
                  </nav>

                  {/* Mobile User Section */}
                  {user && (
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} alt="Avatar" />
                          <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <div className="mt-1">{getRoleBadge(getUserRole(user))}</div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        {getUserRole(user) === "admin" && (
                          <Link
                            href="/admin"
                            className="flex items-center space-x-2 text-sm p-2 rounded-md hover:bg-muted"
                          >
                            <Shield className="h-4 w-4" />
                            <span>Admin Dashboard</span>
                          </Link>
                        )}

                        {canListAgents(getUserRole(user)) && (
                          <Link
                            href="/creator/dashboard"
                            className="flex items-center space-x-2 text-sm p-2 rounded-md hover:bg-muted"
                          >
                            <BarChart3 className="h-4 w-4" />
                            <span>Creator Dashboard</span>
                          </Link>
                        )}

                        <Link
                          href="/dashboard"
                          className="flex items-center space-x-2 text-sm p-2 rounded-md hover:bg-muted"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center space-x-2 text-sm p-2 rounded-md hover:bg-muted"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center space-x-2 text-sm p-2 rounded-md hover:bg-muted text-left w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Log out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
