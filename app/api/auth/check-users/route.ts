import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

export async function GET() {
  try {
    const supabaseAdmin = getSupabaseAdmin()

    const demoEmails = ["admin@9jaagents.com", "creator@9jaagents.com", "user@9jaagents.com"]

    const results = []

    for (const email of demoEmails) {
      const { data, error } = await supabaseAdmin.auth.admin.getUserByEmail(email)

      if (error) {
        results.push({
          email,
          exists: false,
          error: error.message,
        })
      } else {
        results.push({
          email,
          exists: !!data.user,
          id: data.user?.id,
          role: data.user?.user_metadata?.role,
          created_at: data.user?.created_at,
        })
      }
    }

    return NextResponse.json({
      success: true,
      users: results,
    })
  } catch (error) {
    console.error("Error checking users:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check users",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
