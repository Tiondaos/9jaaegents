"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  Eye,
  Edit,
  ArrowLeft,
  RefreshCw,
  FileText,
  Upload,
} from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface Submission {
  id: string
  agentName: string
  status: "pending" | "under_review" | "approved" | "rejected" | "changes_requested"
  submittedAt: Date
  lastUpdated: Date
  reviewerNotes?: string
  estimatedReviewTime?: string
  category: string
  pricingModel: string
  screenshots: number
  hasDemo: boolean
}

interface ReviewStep {
  name: string
  status: "completed" | "current" | "pending"
  completedAt?: Date
  notes?: string
}

const mockSubmissions: Submission[] = [
  {
    id: "sub_001",
    agentName: "DataClean Pro",
    status: "approved",
    submittedAt: new Date("2024-01-15T10:30:00"),
    lastUpdated: new Date("2024-01-17T14:20:00"),
    reviewerNotes: "Great agent! Well documented and addresses a real market need.",
    category: "Data Processing",
    pricingModel: "One-time",
    screenshots: 4,
    hasDemo: true,
  },
  {
    id: "sub_002",
    agentName: "Content Genius",
    status: "under_review",
    submittedAt: new Date("2024-01-20T09:15:00"),
    lastUpdated: new Date("2024-01-22T11:45:00"),
    estimatedReviewTime: "1-2 business days",
    category: "Content Creation",
    pricingModel: "Subscription",
    screenshots: 3,
    hasDemo: false,
  },
  {
    id: "sub_003",
    agentName: "AutoFlow Master",
    status: "changes_requested",
    submittedAt: new Date("2024-01-18T16:20:00"),
    lastUpdated: new Date("2024-01-21T13:30:00"),
    reviewerNotes:
      "Please add more detailed setup instructions and include at least one demo video. The pricing seems high for the Nigerian market - consider offering a freemium tier.",
    category: "Operations",
    pricingModel: "Subscription",
    screenshots: 2,
    hasDemo: false,
  },
  {
    id: "sub_004",
    agentName: "Invoice Helper",
    status: "pending",
    submittedAt: new Date("2024-01-23T14:10:00"),
    lastUpdated: new Date("2024-01-23T14:10:00"),
    estimatedReviewTime: "2-3 business days",
    category: "Finance",
    pricingModel: "Free",
    screenshots: 5,
    hasDemo: true,
  },
  {
    id: "sub_005",
    agentName: "Social Media Bot",
    status: "rejected",
    submittedAt: new Date("2024-01-12T11:00:00"),
    lastUpdated: new Date("2024-01-14T16:45:00"),
    reviewerNotes:
      "This agent violates our content policy regarding automated social media posting. Please review our guidelines and consider resubmitting with compliance features.",
    category: "Marketing",
    pricingModel: "Usage-based",
    screenshots: 3,
    hasDemo: true,
  },
]

const reviewSteps: ReviewStep[] = [
  {
    name: "Initial Submission",
    status: "completed",
    completedAt: new Date("2024-01-20T09:15:00"),
    notes: "Submission received and queued for review",
  },
  {
    name: "Technical Review",
    status: "completed",
    completedAt: new Date("2024-01-21T10:30:00"),
    notes: "Code quality and functionality verified",
  },
  {
    name: "Content Review",
    status: "current",
    notes: "Reviewing documentation and user experience",
  },
  {
    name: "Compliance Check",
    status: "pending",
  },
  {
    name: "Final Approval",
    status: "pending",
  },
]

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions)
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>(mockSubmissions)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    let filtered = submissions

    if (searchTerm) {
      filtered = filtered.filter((submission) => submission.agentName.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((submission) => submission.status === statusFilter)
    }

    setFilteredSubmissions(filtered)
  }, [submissions, searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "changes_requested":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "changes_requested":
        return <AlertCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "under_review":
        return "Under Review"
      case "changes_requested":
        return "Changes Requested"
      case "pending":
        return "Pending Review"
      default:
        return "Unknown"
    }
  }

  const getStatusCounts = () => {
    return {
      all: submissions.length,
      pending: submissions.filter((s) => s.status === "pending").length,
      under_review: submissions.filter((s) => s.status === "under_review").length,
      approved: submissions.filter((s) => s.status === "approved").length,
      changes_requested: submissions.filter((s) => s.status === "changes_requested").length,
      rejected: submissions.filter((s) => s.status === "rejected").length,
    }
  }

  const statusCounts = getStatusCounts()

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
              <h1 className="text-3xl font-bold">Submission Status</h1>
              <p className="text-muted-foreground">Track the review progress of your submitted agents</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button asChild>
              <Link href="/creator/agents/new">
                <Upload className="h-4 w-4 mr-2" />
                Submit New Agent
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{statusCounts.all}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{statusCounts.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.under_review}</div>
              <div className="text-sm text-muted-foreground">In Review</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts.approved}</div>
              <div className="text-sm text-muted-foreground">Approved</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.changes_requested}</div>
              <div className="text-sm text-muted-foreground">Changes</div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{statusCounts.rejected}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Submissions List */}
          <div className="lg:col-span-2">
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Submissions</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search agents..."
                        className="pl-10 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="under_review">Under Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="changes_requested">Changes Requested</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSubmission?.id === submission.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{submission.agentName}</h3>
                        <Badge className={`${getStatusColor(submission.status)} border`}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(submission.status)}
                            <span>{getStatusText(submission.status)}</span>
                          </div>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">Category:</span> {submission.category}
                        </div>
                        <div>
                          <span className="font-medium">Pricing:</span> {submission.pricingModel}
                        </div>
                        <div>
                          <span className="font-medium">Screenshots:</span> {submission.screenshots}
                        </div>
                        <div>
                          <span className="font-medium">Demo:</span> {submission.hasDemo ? "Yes" : "No"}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted {formatDistanceToNow(submission.submittedAt)} ago</span>
                          </div>
                          {submission.estimatedReviewTime && (
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>ETA: {submission.estimatedReviewTime}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {submission.status === "changes_requested" && (
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/creator/agents/edit/${submission.id}`}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                            </Button>
                          )}
                          <Button size="sm" variant="ghost">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {filteredSubmissions.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm || statusFilter !== "all"
                          ? "Try adjusting your search or filter criteria"
                          : "You haven't submitted any agents yet"}
                      </p>
                      <Button asChild>
                        <Link href="/creator/agents/new">Submit Your First Agent</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Submission Details */}
          <div>
            {selectedSubmission ? (
              <div className="space-y-6">
                {/* Submission Details */}
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedSubmission.agentName}</span>
                      <Badge className={`${getStatusColor(selectedSubmission.status)} border`}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(selectedSubmission.status)}
                          <span>{getStatusText(selectedSubmission.status)}</span>
                        </div>
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Submitted:</span>
                        <div>{selectedSubmission.submittedAt.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Last Updated:</span>
                        <div>{selectedSubmission.lastUpdated.toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Category:</span>
                        <div>{selectedSubmission.category}</div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Pricing Model:</span>
                        <div>{selectedSubmission.pricingModel}</div>
                      </div>
                    </div>

                    {selectedSubmission.estimatedReviewTime && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 text-blue-800">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Estimated Review Time</span>
                        </div>
                        <p className="text-blue-700 mt-1">{selectedSubmission.estimatedReviewTime}</p>
                      </div>
                    )}

                    {selectedSubmission.reviewerNotes && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-2 text-gray-800 mb-2">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-medium">Reviewer Notes</span>
                        </div>
                        <p className="text-gray-700 text-sm">{selectedSubmission.reviewerNotes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Review Progress */}
                {selectedSubmission.status === "under_review" && (
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle>Review Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {reviewSteps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : step.status === "current"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {step.status === "completed" ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : step.status === "current" ? (
                                <Clock className="h-4 w-4" />
                              ) : (
                                index + 1
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{step.name}</div>
                              {step.notes && <div className="text-sm text-muted-foreground mt-1">{step.notes}</div>}
                              {step.completedAt && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Completed {formatDistanceToNow(step.completedAt)} ago
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <Card className="bg-white">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      {selectedSubmission.status === "changes_requested" && (
                        <Button className="w-full" asChild>
                          <Link href={`/creator/agents/edit/${selectedSubmission.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Make Requested Changes
                          </Link>
                        </Button>
                      )}
                      {selectedSubmission.status === "approved" && (
                        <Button className="w-full bg-transparent" variant="outline" asChild>
                          <Link href={`/agents/${selectedSubmission.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Live Agent
                          </Link>
                        </Button>
                      )}
                      <Button className="w-full bg-transparent" variant="outline" asChild>
                        <Link href={`/creator/agents/${selectedSubmission.id}/analytics`}>View Analytics</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="bg-white">
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Submission</h3>
                  <p className="text-muted-foreground">
                    Click on any submission from the list to view detailed status and review progress.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Help Section */}
        <Card className="mt-8 bg-white">
          <CardHeader>
            <CardTitle>Review Process Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Review Timeline</TabsTrigger>
                <TabsTrigger value="criteria">Review Criteria</TabsTrigger>
                <TabsTrigger value="tips">Approval Tips</TabsTrigger>
              </TabsList>
              <TabsContent value="timeline" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Clock className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                    <h4 className="font-semibold">Initial Review</h4>
                    <p className="text-sm text-muted-foreground">1-2 business days</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                    <h4 className="font-semibold">Technical Review</h4>
                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <AlertCircle className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                    <h4 className="font-semibold">Final Approval</h4>
                    <p className="text-sm text-muted-foreground">1 business day</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="criteria" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">✅ What We Look For</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Clear and accurate agent description</li>
                      <li>• Proper functionality and reliability</li>
                      <li>• Nigerian market relevance</li>
                      <li>• Complete documentation</li>
                      <li>• Appropriate pricing</li>
                      <li>• Quality screenshots/demos</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-red-600">❌ Common Rejection Reasons</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Incomplete or misleading information</li>
                      <li>• Poor functionality or bugs</li>
                      <li>• Violation of content policies</li>
                      <li>• Insufficient documentation</li>
                      <li>• Inappropriate for Nigerian market</li>
                      <li>• Missing required screenshots</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tips" className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">💡 Pro Tips for Faster Approval</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Test your agent thoroughly before submission</li>
                    <li>• Provide clear, step-by-step setup instructions</li>
                    <li>• Include high-quality screenshots showing key features</li>
                    <li>• Consider Nigerian business context in your description</li>
                    <li>• Offer competitive pricing for the local market</li>
                    <li>• Respond quickly to change requests</li>
                    <li>• Join our creator community for tips and support</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
