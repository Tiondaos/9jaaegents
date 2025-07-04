import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    const demoUsers = [
      {
        email: "admin@9jaagents.com",
        password: "Admin123!",
        user_metadata: {
          first_name: "Admin",
          last_name: "User",
          role: "admin",
        },
      },
      {
        email: "creator@9jaagents.com",
        password: "Creator123!",
        user_metadata: {
          first_name: "Creator",
          last_name: "User",
          role: "creator",
        },
      },
      {
        email: "user@9jaagents.com",
        password: "User123!",
        user_metadata: {
          first_name: "Regular",
          last_name: "User",
          role: "user",
        },
      },
    ]

    const results = []

    for (const userData of demoUsers) {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(userData.email)

      if (existingUser.user) {
        results.push({
          email: userData.email,
          status: "already_exists",
          id: existingUser.user.id,
        })
        continue
      }

      // Create new user
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        user_metadata: userData.user_metadata,
        email_confirm: true,
      })

      if (error) {
        results.push({
          email: userData.email,
          status: "error",
          error: error.message,
        })
      } else {
        results.push({
          email: userData.email,
          status: "created",
          id: data.user?.id,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Demo users processed",
      results,
    })
  } catch (error) {
    console.error("Error creating demo users:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create demo users",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST() {
  return GET() // Allow both GET and POST
}
