"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  PenTool,
  Zap,
  BarChart3,
  MessageSquare,
  Shield,
  Briefcase,
  Users,
  Smartphone,
  Globe,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "data-processing",
    name: "Data Processing",
    description: "Clean, analyze, and transform your business data",
    icon: Database,
    count: 45,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: "content-creation",
    name: "Content Creation",
    description: "Generate content in multiple Nigerian languages",
    icon: PenTool,
    count: 38,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: "automation",
    name: "Automation",
    description: "Streamline workflows and business processes",
    icon: Zap,
    count: 52,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Market insights and business intelligence",
    icon: BarChart3,
    count: 29,
    color: "bg-green-100 text-green-600",
  },
  {
    id: "customer-service",
    name: "Customer Service",
    description: "AI-powered customer support solutions",
    icon: MessageSquare,
    count: 34,
    color: "bg-red-100 text-red-600",
  },
  {
    id: "security",
    name: "Security",
    description: "Protect your business with AI security",
    icon: Shield,
    count: 21,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial analysis and accounting automation",
    icon: Briefcase,
    count: 27,
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: "hr",
    name: "Human Resources",
    description: "Recruitment and employee management",
    icon: Users,
    count: 19,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: "mobile",
    name: "Mobile Solutions",
    description: "Mobile-first AI applications",
    icon: Smartphone,
    count: 31,
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: "web",
    name: "Web Integration",
    description: "Website and web application AI tools",
    icon: Globe,
    count: 25,
    color: "bg-cyan-100 text-cyan-600",
  },
]

export function Categories() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect AI solution for your specific business needs across various industries
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/marketplace?category=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>

                    <h3 className="font-semibold mb-2 text-sm lg:text-base">{category.name}</h3>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{category.description}</p>

                    <Badge variant="secondary" className="text-xs">
                      {category.count} agents
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
