import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from "@/contexts/auth-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "9jaAgents - AI Marketplace for Nigerian Businesses",
  description:
    "Discover and deploy powerful AI automation solutions designed specifically for the Nigerian market. Connect with local creators and transform your business with intelligent agents.",
  keywords: "AI agents, Nigeria, automation, marketplace, business tools, artificial intelligence",
  authors: [{ name: "9jaAgents Team" }],
  creator: "9jaAgents",
  publisher: "9jaAgents",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://9jaagents.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "9jaAgents - AI Marketplace for Nigerian Businesses",
    description: "Discover and deploy powerful AI automation solutions designed specifically for the Nigerian market.",
    url: "https://9jaagents.com",
    siteName: "9jaAgents",
    locale: "en_NG",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "9jaAgents - AI Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "9jaAgents - AI Marketplace for Nigerian Businesses",
    description: "Discover and deploy powerful AI automation solutions designed specifically for the Nigerian market.",
    images: ["/og-image.png"],
    creator: "@9jaagents",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
