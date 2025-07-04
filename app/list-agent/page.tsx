"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { X, Plus, ArrowLeft, ArrowRight, Check, AlertCircle, FileText, Zap, DollarSign, Info } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AgentFormData {
  // Basic Information
  name: string
  tagline: string
  description: string
  category_id: string
  subcategory: string

  // Pricing
  pricing_model: string
  price: number
  currency: string

  // Features & Capabilities
  features: string[]
  use_cases: string[]
  capabilities: string[]

  // Technical Details
  requirements: string
  integrations: string[]
  api_access: boolean

  // Media & Documentation
  screenshots: string[]
  demo_video: string
  documentation: string
  instructions: string

  // Metadata
  tags: string[]
  target_audience: string[]
  supported_languages: string[]

  // Legal & Compliance
  terms_accepted: boolean
  data_privacy: boolean
  nigerian_compliance: boolean
}

interface Category {
  id: string
  name: string
  slug: string
}

const pricingModels = [
  { value: "one-time", label: "One-time Purchase" },
  { value: "subscription", label: "Monthly Subscription" },
  { value: "usage-based", label: "Usage-based Pricing" },
  { value: "freemium", label: "Freemium" },
  { value: "free", label: "Free" },
]

const integrationOptions = [
  "Slack",
  "Microsoft Teams",
  "WhatsApp Business",
  "Telegram",
  "Discord",
  "Zapier",
  "Make.com",
  "Google Workspace",
  "Microsoft 365",
  "Salesforce",
  "HubSpot",
  "Shopify",
  "WooCommerce",
  "PayStack",
  "Flutterwave",
  "QuickBooks",
  "Xero",
  "Zoho",
  "Custom API",
  "Webhook",
]

const languageOptions = ["English", "Yoruba", "Hausa", "Igbo", "Pidgin English", "French", "Arabic"]

export default function ListAgentPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<AgentFormData>({
    name: "",
    tagline: "",
    description: "",
    category_id: "",
    subcategory: "",
    pricing_model: "",
    price: 0,
    currency: "NGN",
    features: [],
    use_cases: [],
    capabilities: [],
    requirements: "",
    integrations: [],
    api_access: false,
    screenshots: [],
    demo_video: "",
    documentation: "",
    instructions: "",
    tags: [],
    target_audience: [],
    supported_languages: ["English"],
    terms_accepted: false,
    data_privacy: false,
    nigerian_compliance: false,
  })

  const [newFeature, setNewFeature] = useState("")
  const [newUseCase, setNewUseCase] = useState("")
  const [newTag, setNewTag] = useState("")

  const totalSteps = 5

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  // Redirect if not authenticated or not a creator/admin
  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    if (user.user_metadata?.role !== "creator" && user.user_metadata?.role !== "admin") {
      toast({
        title: "Access Denied",
        description: "You need to be a creator to list agents.",
        variant: "destructive",
      })
      router.push("/")
      return
    }
  }, [user, router, toast])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error("Error fetching categories:", error)
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: keyof AgentFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addToArray = (field: keyof AgentFormData, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      const currentArray = formData[field] as string[]
      if (!currentArray.includes(value.trim())) {
        handleInputChange(field, [...currentArray, value.trim()])
        setter("")
      }
    }
  }

  const removeFromArray = (field: keyof AgentFormData, index: number) => {
    const currentArray = formData[field] as string[]
    handleInputChange(
      field,
      currentArray.filter((_, i) => i !== index),
    )
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.tagline && formData.description && formData.category_id)
      case 2:
        return !!(formData.pricing_model && (formData.pricing_model === "free" || formData.price > 0))
      case 3:
        return formData.features.length > 0 && formData.use_cases.length > 0
      case 4:
        return !!(formData.instructions && formData.supported_languages.length > 0)
      case 5:
        return formData.terms_accepted && formData.data_privacy && formData.nigerian_compliance
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    } else {
      toast({
        title: "Please complete all required fields",
        description: "Fill in all required information before proceeding.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast({
        title: "Please complete all required fields",
        description: "Accept all terms and conditions to submit your agent.",
        variant: "destructive",
      })
      return
    }

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit your agent.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/agents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit agent")
      }

      const data = await response.json()

      toast({
        title: "Agent submitted successfully!",
        description: "Your agent is now under review. You'll be notified once it's approved.",
      })

      router.push("/creator/dashboard")
    } catch (error) {
      console.error("Error submitting agent:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting your agent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-blue-600">
              <Info className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Agent Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., DataClean Pro"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline *</Label>
                <Input
                  id="tagline"
                  placeholder="e.g., Clean and organize your data effortlessly"
                  value={formData.tagline}
                  onChange={(e) => handleInputChange("tagline", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of what your agent does, its benefits, and how it helps users..."
                className="min-h-[120px]"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">{formData.description.length}/500 characters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category_id} onValueChange={(value) => handleInputChange("category_id", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  placeholder="e.g., Data Cleaning, Text Processing"
                  value={formData.subcategory}
                  onChange={(e) => handleInputChange("subcategory", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-green-600">
              <DollarSign className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Pricing & Monetization</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pricingModel">Pricing Model *</Label>
                <Select
                  value={formData.pricing_model}
                  onValueChange={(value) => handleInputChange("pricing_model", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing model" />
                  </SelectTrigger>
                  <SelectContent>
                    {pricingModels.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {formData.pricing_model !== "free" && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <div className="flex">
                    <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NGN">₦</SelectItem>
                        <SelectItem value="USD">$</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0"
                      className="flex-1 ml-2"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pricing Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Research similar agents to price competitively</li>
                <li>• Consider offering a free trial or freemium model</li>
                <li>• Nigerian market: ₦5,000 - ₦50,000 is typical for business tools</li>
                <li>• Subscription models often generate more revenue long-term</li>
              </ul>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-purple-600">
              <Zap className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Features & Capabilities</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Key Features *</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Add a key feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addToArray("features", newFeature, setNewFeature)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addToArray("features", newFeature, setNewFeature)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{feature}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("features", index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Use Cases *</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Add a use case"
                    value={newUseCase}
                    onChange={(e) => setNewUseCase(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addToArray("use_cases", newUseCase, setNewUseCase)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addToArray("use_cases", newUseCase, setNewUseCase)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.use_cases.map((useCase, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{useCase}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("use_cases", index)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Integrations</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {integrationOptions.map((integration) => (
                    <div key={integration} className="flex items-center space-x-2">
                      <Checkbox
                        id={integration}
                        checked={formData.integrations.includes(integration)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("integrations", [...formData.integrations, integration])
                          } else {
                            handleInputChange(
                              "integrations",
                              formData.integrations.filter((i) => i !== integration),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={integration} className="text-sm">
                        {integration}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="apiAccess"
                  checked={formData.api_access}
                  onCheckedChange={(checked) => handleInputChange("api_access", checked)}
                />
                <Label htmlFor="apiAccess">Provides API access for developers</Label>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-orange-600">
              <FileText className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Documentation & Media</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instructions">Setup Instructions *</Label>
                <Textarea
                  id="instructions"
                  placeholder="Provide step-by-step instructions on how to set up and use your agent..."
                  className="min-h-[120px]"
                  value={formData.instructions}
                  onChange={(e) => handleInputChange("instructions", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documentation">Additional Documentation</Label>
                <Textarea
                  id="documentation"
                  placeholder="Any additional documentation, API references, troubleshooting guides..."
                  className="min-h-[100px]"
                  value={formData.documentation}
                  onChange={(e) => handleInputChange("documentation", e.target.value)}
                />
              </div>

              <div>
                <Label>Supported Languages *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {languageOptions.map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={formData.supported_languages.includes(language)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange("supported_languages", [...formData.supported_languages, language])
                          } else {
                            handleInputChange(
                              "supported_languages",
                              formData.supported_languages.filter((l) => l !== language),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={language} className="text-sm">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Add tags for better discoverability"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addToArray("tags", newTag, setNewTag)}
                  />
                  <Button type="button" variant="outline" onClick={() => addToArray("tags", newTag, setNewTag)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{tag}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeFromArray("tags", index)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Terms & Compliance</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.terms_accepted}
                  onCheckedChange={(checked) => handleInputChange("terms_accepted", checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="termsAccepted" className="text-sm font-medium">
                    I accept the Terms of Service and Creator Agreement *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you agree to our{" "}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/creator-agreement" className="text-blue-600 hover:underline">
                      Creator Agreement
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataPrivacy"
                  checked={formData.data_privacy}
                  onCheckedChange={(checked) => handleInputChange("data_privacy", checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="dataPrivacy" className="text-sm font-medium">
                    I comply with data privacy and protection requirements *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Your agent must comply with applicable data protection laws including GDPR and local Nigerian data
                    protection regulations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="nigerianCompliance"
                  checked={formData.nigerian_compliance}
                  onCheckedChange={(checked) => handleInputChange("nigerian_compliance", checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="nigerianCompliance" className="text-sm font-medium">
                    I confirm Nigerian market compliance *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Your agent is suitable for the Nigerian market and complies with local business practices and
                    regulations.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🎉 Ready to Submit!</h4>
              <p className="text-sm text-green-800">
                Your agent will be reviewed by our team within 2-3 business days. You'll receive an email notification
                once it's approved and live on the marketplace.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">📋 Review Checklist</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>Clear agent name and description</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>Appropriate pricing model</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>Detailed features and use cases</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>Setup instructions provided</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Check className="h-4 w-4" />
                  <span>All compliance requirements met</span>
                </li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-4">Please log in to list your agent.</p>
          <Link href="/login">
            <Button>Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/creator/dashboard" className="flex items-center text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-3xl font-bold">List Your Agent</h1>
              <p className="text-muted-foreground">Share your AI automation solution with the Nigerian market</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Pricing & Monetization"}
                {currentStep === 3 && "Features & Capabilities"}
                {currentStep === 4 && "Documentation & Media"}
                {currentStep === 5 && "Terms & Compliance"}
              </span>
              <Badge variant="outline">Free to List</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex space-x-2">
                {currentStep < totalSteps ? (
                  <Button onClick={nextStep} disabled={!validateStep(currentStep)}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!validateStep(5) || isSubmitting}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Submit Agent
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">📚 Creator Guide</h4>
                  <p className="text-muted-foreground">Learn best practices for creating successful agents</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">💬 Community Support</h4>
                  <p className="text-muted-foreground">Join our creator community for tips and support</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📧 Contact Us</h4>
                  <p className="text-muted-foreground">Get direct help from our creator success team</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
