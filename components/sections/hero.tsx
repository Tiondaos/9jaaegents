"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-900 py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">
                Built for Nigeria
              </Badge>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                AI agents for every business. At every level.
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                Discover, hire, and deploy AI agents tailored for Nigerian businesses. From customer service to sales
                automation.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search for AI agents..."
                  className="pl-10 h-12 border-gray-300 dark:border-gray-600"
                />
              </div>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-6">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">AI Agents</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">₦2M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Transactions</div>
              </div>
            </div>
          </div>

          {/* Right Column - Icon Grid */}
          <div className="relative">
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {/* Row 1 */}
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-4 bg-green-500 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-orange-500 rounded"></div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-4 bg-pink-500 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-indigo-500 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-teal-500 rounded-full"></div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-4 bg-cyan-500 rounded"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full"></div>
                </div>
              </div>
              <div className="w-16 h-16 bg-violet-500 rounded-2xl flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-violet-500 rounded"></div>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-blue-100/20 rounded-3xl blur-3xl -z-10 dark:from-purple-900/20 dark:to-blue-900/20"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
