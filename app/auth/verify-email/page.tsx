"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <div className="mb-6">
          <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to 9jaAgents
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-16 w-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Check your email</h2>
            <p className="text-muted-foreground text-center mb-6">
              We've sent you a verification link. Please check your email and click the link to activate your account.
            </p>
            <div className="space-y-2 w-full">
              <Button asChild className="w-full">
                <Link href="/auth/login">Continue to sign in</Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/">Back to homepage</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Didn't receive the email? Check your spam folder or contact support.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
