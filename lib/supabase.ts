import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Public Supabase client — safe for the browser.
 * Uses NEXT_PUBLIC_* env vars that are automatically inlined
 * by Next.js.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Database types
export interface Agent {
  id: string
  name: string
  tagline: string
  description: string
  long_description?: string
  category_id: string
  subcategory?: string
  pricing_model: string
  price: number
  currency: string
  features: string[]
  use_cases: string[]
  capabilities: string[]
  requirements?: string
  integrations: string[]
  api_access: boolean
  screenshots: string[]
  demo_video?: string
  documentation?: string
  instructions: string
  tags: string[]
  target_audience: string[]
  supported_languages: string[]
  creator_id: string
  status: "draft" | "pending" | "approved" | "rejected"
  rating?: number
  total_sales: number
  total_revenue: number
  created_at: string
  updated_at: string
  // Relations
  category?: Category
  creator?: Profile
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  email: string
  first_name: string
  last_name: string
  username: string
  role: "user" | "creator" | "admin"
  avatar_url?: string
  created_at: string
  updated_at: string
}

/**
 * Admin client:
 * - Only instantiated on the server.
 * - Will be undefined in the browser bundle, avoiding
 *   the "supabaseKey is required" error.
 */
export let supabaseAdmin: SupabaseClient | undefined

if (typeof window === "undefined") {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (serviceKey && supabaseUrl !== "https://placeholder.supabase.co") {
    supabaseAdmin = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
}
