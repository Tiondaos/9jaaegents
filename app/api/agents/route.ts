import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "popular"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const offset = (page - 1) * limit

    let query = supabase
      .from("agents")
      .select(`
        *,
        category:categories(name, slug, color),
        creator:profiles(first_name, last_name, username)
      `)
      .eq("status", "approved")

    // Apply filters
    if (category && category !== "all") {
      query = query.eq("categories.slug", category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,tags.cs.{${search}}`)
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        query = query.order("total_sales", { ascending: false })
        break
      case "rating":
        query = query.order("rating", { ascending: false })
        break
      case "price-low":
        query = query.order("price", { ascending: true })
        break
      case "price-high":
        query = query.order("price", { ascending: false })
        break
      case "newest":
        query = query.order("created_at", { ascending: false })
        break
      default:
        query = query.order("total_sales", { ascending: false })
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data: agents, error, count } = await query

    if (error) {
      console.error("Error fetching agents:", error)
      return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from("agents")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved")

    return NextResponse.json({
      agents: agents || [],
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Error in agents API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const agentData = await request.json()

    // Insert agent into database
    const { data: agent, error } = await supabase
      .from("agents")
      .insert({
        ...agentData,
        creator_id: user.id,
        status: "pending", // All new agents start as pending
        total_sales: 0,
        total_revenue: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating agent:", error)
      return NextResponse.json({ error: "Failed to create agent" }, { status: 500 })
    }

    return NextResponse.json({ agent }, { status: 201 })
  } catch (error) {
    console.error("Error in POST agents API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
