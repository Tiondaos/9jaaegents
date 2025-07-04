import { supabaseAdmin } from "@/lib/supabase-admin"

async function setupDemoUsers() {
  console.log("Setting up demo users...")

  const demoUsers = [
    {
      email: "admin@9jaagents.com",
      password: "Admin123!",
      user_metadata: {
        first_name: "Admin",
        last_name: "User",
        role: "admin",
        username: "admin",
      },
    },
    {
      email: "creator@9jaagents.com",
      password: "Creator123!",
      user_metadata: {
        first_name: "Creator",
        last_name: "User",
        role: "creator",
        username: "creator",
      },
    },
    {
      email: "user@9jaagents.com",
      password: "User123!",
      user_metadata: {
        first_name: "Test",
        last_name: "User",
        role: "user",
        username: "testuser",
      },
    },
  ]

  for (const userData of demoUsers) {
    try {
      // Check if user already exists
      const { data: existingUser } = await supabaseAdmin.auth.admin.getUserByEmail(userData.email)

      if (existingUser.user) {
        console.log(`User ${userData.email} already exists, skipping...`)
        continue
      }

      // Create the user
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        user_metadata: userData.user_metadata,
        email_confirm: true, // Auto-confirm email for demo users
      })

      if (error) {
        console.error(`Error creating user ${userData.email}:`, error.message)
      } else {
        console.log(`✅ Created demo user: ${userData.email} (${userData.user_metadata.role})`)
      }
    } catch (error) {
      console.error(`Error processing user ${userData.email}:`, error)
    }
  }

  console.log("Demo users setup complete!")
}

// Run the setup
setupDemoUsers().catch(console.error)
