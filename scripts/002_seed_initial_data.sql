-- Seed initial data for 9jaAgents platform with default login credentials

-- Insert default categories
INSERT INTO categories (id, name, slug, description, icon, color, sort_order) VALUES
(uuid_generate_v4(), 'Data Processing & Analytics', 'data-processing', 'AI agents for data cleaning, processing, and analytics', '📊', '#3B82F6', 1),
(uuid_generate_v4(), 'Content Creation', 'content-creation', 'AI agents for generating and managing content', '✍️', '#10B981', 2),
(uuid_generate_v4(), 'Customer Service', 'customer-service', 'AI agents for customer support and communication', '💬', '#8B5CF6', 3),
(uuid_generate_v4(), 'Marketing & Sales', 'marketing-sales', 'AI agents for marketing automation and sales', '📈', '#F59E0B', 4),
(uuid_generate_v4(), 'Finance & Accounting', 'finance-accounting', 'AI agents for financial management and accounting', '💰', '#EF4444', 5),
(uuid_generate_v4(), 'Human Resources', 'human-resources', 'AI agents for HR management and recruitment', '👥', '#06B6D4', 6),
(uuid_generate_v4(), 'Operations & Workflow', 'operations-workflow', 'AI agents for business operations and workflow automation', '⚙️', '#84CC16', 7),
(uuid_generate_v4(), 'Education & Training', 'education-training', 'AI agents for learning and training purposes', '🎓', '#F97316', 8),
(uuid_generate_v4(), 'Healthcare', 'healthcare', 'AI agents for healthcare and medical applications', '🏥', '#EC4899', 9),
(uuid_generate_v4(), 'E-commerce', 'ecommerce', 'AI agents for online retail and e-commerce', '🛒', '#6366F1', 10);

-- Insert default admin user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@9jaagents.com',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Admin", "last_name": "User", "role": "admin", "username": "admin"}',
  false,
  'authenticated'
);

-- Insert default creator user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'creator@9jaagents.com',
  crypt('Creator123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Creator", "last_name": "User", "role": "creator", "username": "creator"}',
  false,
  'authenticated'
);

-- Insert default regular user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'user@9jaagents.com',
  crypt('User123!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"]}',
  '{"first_name": "Test", "last_name": "User", "role": "user", "username": "testuser"}',
  false,
  'authenticated'
);

-- Insert platform settings
INSERT INTO platform_settings (key, value, description, is_public) VALUES
('platform_name', '"9jaAgents"', 'Platform name', true),
('platform_tagline', '"AI Agents for African Businesses"', 'Platform tagline', true),
('default_currency', '"NGN"', 'Default currency for the platform', true),
('commission_rate', '0.15', 'Platform commission rate (15%)', false),
('max_file_upload_size', '52428800', 'Maximum file upload size in bytes (50MB)', false),
('supported_currencies', '["NGN", "USD"]', 'Supported currencies', true),
('supported_languages', '["English", "Yoruba", "Hausa", "Igbo", "Pidgin English"]', 'Supported languages', true),
('review_process_days', '3', 'Average review process duration in days', true),
('featured_agents_limit', '12', 'Maximum number of featured agents on homepage', false),
('free_trial_duration', '7', 'Default free trial duration in days', true);

-- Insert sample collections (will be linked to users after auth setup)
INSERT INTO collections (id, name, slug, description, is_public, is_featured) VALUES
(uuid_generate_v4(), 'Getting Started', 'getting-started', 'Essential AI agents for new businesses', true, true),
(uuid_generate_v4(), 'Nigerian Business Essentials', 'nigerian-business-essentials', 'AI agents specifically designed for Nigerian market needs', true, true),
(uuid_generate_v4(), 'Free Tools', 'free-tools', 'Collection of free AI agents to get you started', true, true);

-- Insert sample categories
INSERT INTO categories (name, description, icon, color) VALUES
('Data Processing', 'AI agents for data cleaning, transformation, and analysis', 'database', '#3B82F6'),
('Content Creation', 'AI agents for generating and managing content', 'edit', '#10B981'),
('Customer Service', 'AI chatbots and customer support automation', 'message-circle', '#8B5CF6'),
('Sales & Marketing', 'AI agents for lead generation and marketing automation', 'trending-up', '#F59E0B'),
('Finance & Accounting', 'AI agents for financial analysis and accounting tasks', 'dollar-sign', '#EF4444'),
('Automation & Workflows', 'AI agents for business process automation', 'zap', '#6366F1'),
('Data Analysis', 'AI tools for data processing and business intelligence', '📊', '#8B5CF6'),
('Content Creation', 'Agents for writing, design, and content generation', '✍️', '#F59E0B'),
('E-commerce', 'Shopping assistants and e-commerce automation', '🛒', '#EF4444'),
('Finance', 'Financial analysis and accounting automation', '💰', '#06B6D4'),
('Healthcare', 'Medical assistance and healthcare automation', '🏥', '#84CC16'),
('Education', 'Learning assistants and educational tools', '📚', '#F97316'),
('Real Estate', 'Property management and real estate assistance', '🏠', '#EC4899'),
('Agriculture', 'Farming and agricultural optimization tools', '🌾', '#22C55E');

-- Insert sample agents
INSERT INTO agents (
  name, 
  description, 
  long_description,
  category_id, 
  price, 
  creator_id, 
  status,
  features,
  tags,
  demo_url,
  documentation_url,
  support_email,
  version,
  compatibility,
  rating,
  total_sales,
  total_revenue
) VALUES 
(
  'DataClean Pro',
  'Advanced AI agent for cleaning and processing Nigerian business data',
  'DataClean Pro is a powerful AI agent specifically designed for Nigerian businesses to clean, validate, and process their data. It handles common data quality issues like duplicate records, missing values, inconsistent formatting, and data validation according to Nigerian standards.',
  (SELECT id FROM categories WHERE name = 'Data Processing'),
  25000,
  (SELECT id FROM auth.users WHERE email = 'creator@9jaagents.com'),
  'approved',
  '["Duplicate detection", "Data validation", "Nigerian phone number formatting", "Address standardization", "Currency conversion", "Export to Excel/CSV"]',
  '["data", "cleaning", "validation", "nigeria", "business"]',
  'https://demo.dataclean.pro',
  'https://docs.dataclean.pro',
  'support@dataclean.pro',
  '2.1.0',
  '["Excel", "Google Sheets", "CSV", "JSON", "API"]',
  4.8,
  184,
  4600000
),
(
  'Content Genius',
  'AI-powered content creation agent for Nigerian businesses',
  'Content Genius helps Nigerian businesses create engaging content for social media, blogs, and marketing materials. It understands local context, culture, and languages to produce relevant content that resonates with Nigerian audiences.',
  (SELECT id FROM categories WHERE name = 'Content Creation'),
  35000,
  (SELECT id FROM auth.users WHERE email = 'creator@9jaagents.com'),
  'approved',
  '["Social media posts", "Blog articles", "Product descriptions", "Email campaigns", "Nigerian Pidgin support", "Local context awareness"]',
  '["content", "writing", "social media", "marketing", "nigeria"]',
  'https://demo.contentgenius.ng',
  'https://docs.contentgenius.ng',
  'hello@contentgenius.ng',
  '1.5.2',
  '["WordPress", "Social Media APIs", "Email platforms", "CMS"]',
  4.6,
  156,
  5460000
),
(
  'ChatBot Nigeria',
  'Intelligent customer service chatbot for Nigerian businesses',
  'ChatBot Nigeria is an AI-powered customer service agent that understands Nigerian languages, culture, and business practices. It can handle customer inquiries, process orders, and provide support in English, Pidgin, Hausa, Yoruba, and Igbo.',
  (SELECT id FROM categories WHERE name = 'Customer Service'),
  45000,
  (SELECT id FROM auth.users WHERE email = 'creator@9jaagents.com'),
  'approved',
  '["Multi-language support", "Order processing", "FAQ automation", "Live chat integration", "WhatsApp Business API", "Voice support"]',
  '["chatbot", "customer service", "multilingual", "whatsapp", "nigeria"]',
  'https://demo.chatbot.ng',
  'https://docs.chatbot.ng',
  'support@chatbot.ng',
  '3.0.1',
  '["WhatsApp Business", "Website chat", "Facebook Messenger", "Telegram"]',
  4.9,
  134,
  6030000
);

-- Create a function to setup default users after Supabase auth users are created
CREATE OR REPLACE FUNCTION setup_default_user_profiles()
RETURNS void AS $$
BEGIN
  -- This function will be called after the Supabase users are created
  -- It will insert the corresponding profile data
  
  -- Note: The actual user creation happens through Supabase Auth
  -- This is just a placeholder for the profile setup
  RAISE NOTICE 'Default user profiles setup function created. Run after Supabase Auth users are created.';
END;
$$ LANGUAGE plpgsql;
