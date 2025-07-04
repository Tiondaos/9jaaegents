-- This script sets up demo users directly in the auth.users table
-- Note: In production, users should be created through the Supabase Auth API

-- First, let's ensure we have the necessary functions
CREATE OR REPLACE FUNCTION create_demo_user(
    user_email TEXT,
    user_password TEXT,
    user_metadata JSONB DEFAULT '{}'::jsonb
) RETURNS UUID AS $$
DECLARE
    user_id UUID;
    encrypted_password TEXT;
BEGIN
    -- Generate a new UUID for the user
    user_id := gen_random_uuid();
    
    -- Hash the password (simplified for demo - in production use proper bcrypt)
    encrypted_password := crypt(user_password, gen_salt('bf'));
    
    -- Insert into auth.users
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin,
        role
    ) VALUES (
        user_id,
        '00000000-0000-0000-0000-000000000000',
        user_email,
        encrypted_password,
        NOW(),
        NOW(),
        NOW(),
        user_metadata,
        false,
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;
    
    RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create demo users
DO $$
DECLARE
    admin_id UUID;
    creator_id UUID;
    user_id UUID;
BEGIN
    -- Create admin user
    admin_id := create_demo_user(
        'admin@9jaagents.com',
        'Admin123!',
        '{"first_name": "Admin", "last_name": "User", "role": "admin", "username": "admin"}'::jsonb
    );
    
    -- Create creator user
    creator_id := create_demo_user(
        'creator@9jaagents.com',
        'Creator123!',
        '{"first_name": "Creator", "last_name": "User", "role": "creator", "username": "creator"}'::jsonb
    );
    
    -- Create regular user
    user_id := create_demo_user(
        'user@9jaagents.com',
        'User123!',
        '{"first_name": "Test", "last_name": "User", "role": "user", "username": "testuser"}'::jsonb
    );
    
    RAISE NOTICE 'Demo users created successfully';
END $$;

-- Clean up the function (optional)
DROP FUNCTION IF EXISTS create_demo_user(TEXT, TEXT, JSONB);
