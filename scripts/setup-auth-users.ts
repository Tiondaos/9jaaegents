import { supabaseAdmin } from "../lib/supabase"

async function setupDefaultUsers() {
  console.log("Setting up default authentication users...")

  try {
    // Create Admin User
    const { data: adminUser, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email: "admin@9jaagents.com",
      password: "Admin123!",
      email_confirm: true,
      user_metadata: {
        first_name: "Admin",
        last_name: "User",
        role: "admin",
        username: "admin",
      },
    })

    if (adminError) {
      console.error("Error creating admin user:", adminError)
    } else {
      console.log("✅ Admin user created:", adminUser.user?.email)
    }

    // Create Creator User
    const { data: creatorUser, error: creatorError } = await supabaseAdmin.auth.admin.createUser({
      email: "creator@9jaagents.com",
      password: "Creator123!",
      email_confirm: true,
      user_metadata: {
        first_name: "John",
        last_name: "Creator",
        role: "creator",
        username: "johncreator",
      },
    })

    if (creatorError) {
      console.error("Error creating creator user:", creatorError)
    } else {
      console.log("✅ Creator user created:", creatorUser.user?.email)
    }

    // Create Regular User
    const { data: regularUser, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: "user@9jaagents.com",
      password: "User123!",
      email_confirm: true,
      user_metadata: {
        first_name: "Jane",
        last_name: "User",
        role: "user",
        username: "janeuser",
      },
    })

    if (userError) {
      console.error("Error creating regular user:", userError)
    } else {
      console.log("✅ Regular user created:", regularUser.user?.email)
    }

    console.log("\n🎉 Default users setup complete!")
    console.log("\n📋 DEFAULT LOGIN CREDENTIALS:")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("👑 ADMIN LOGIN:")
    console.log("   Email: admin@9jaagents.com")
    console.log("   Password: Admin123!")
    console.log("")
    console.log("🎨 CREATOR LOGIN:")
    console.log("   Email: creator@9jaagents.com")
    console.log("   Password: Creator123!")
    console.log("")
    console.log("👤 USER LOGIN:")
    console.log("   Email: user@9jaagents.com")
    console.log("   Password: User123!")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
  } catch (error) {
    console.error("Error setting up default users:", error)
  }
}

// Run the setup
setupDefaultUsers()
