-- Insert sample agents with realistic data for the 9jaAgents platform

-- Get category IDs for reference
DO $$
DECLARE
    data_processing_id UUID;
    content_creation_id UUID;
    customer_service_id UUID;
    marketing_sales_id UUID;
    finance_accounting_id UUID;
    operations_workflow_id UUID;
    
    john_doe_id UUID;
    jane_smith_id UUID;
    mike_johnson_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO data_processing_id FROM categories WHERE slug = 'data-processing';
    SELECT id INTO content_creation_id FROM categories WHERE slug = 'content-creation';
    SELECT id INTO customer_service_id FROM categories WHERE slug = 'customer-service';
    SELECT id INTO marketing_sales_id FROM categories WHERE slug = 'marketing-sales';
    SELECT id INTO finance_accounting_id FROM categories WHERE slug = 'finance-accounting';
    SELECT id INTO operations_workflow_id FROM categories WHERE slug = 'operations-workflow';
    
    -- Get creator IDs
    SELECT id INTO john_doe_id FROM users WHERE username = 'johndoe';
    SELECT id INTO jane_smith_id FROM users WHERE username = 'janesmith';
    SELECT id INTO mike_johnson_id FROM users WHERE username = 'mikejohnson';

    -- Insert sample agents
    INSERT INTO agents (
        id, creator_id, name, slug, tagline, description, long_description, category_id,
        pricing_model, price, currency, features, use_cases, capabilities, integrations,
        supported_languages, requirements, setup_instructions, tags, target_audience,
        status, is_featured, meta_title, meta_description, published_at
    ) VALUES
    (
        uuid_generate_v4(),
        john_doe_id,
        'DataClean Pro',
        'dataclean-pro',
        'Advanced data cleaning and processing for Nigerian businesses',
        'Powerful AI agent that automatically cleans, validates, and processes your business data with Nigerian market-specific rules and compliance.',
        'DataClean Pro is a comprehensive data processing solution designed specifically for Nigerian businesses. It handles everything from customer data validation to financial record processing, ensuring compliance with local regulations and business practices. The agent can process multiple data formats, detect anomalies, and provide detailed reports on data quality.',
        data_processing_id,
        'one_time',
        15000.00,
        'NGN',
        '["Automatic data validation", "Nigerian phone number formatting", "Bank account validation", "Duplicate detection", "Data quality scoring", "Export to multiple formats", "Batch processing", "Real-time monitoring"]',
        '["Customer database cleanup", "Financial record processing", "Inventory data management", "Sales data analysis", "Compliance reporting", "Data migration projects"]',
        '["Data cleaning", "Validation", "Formatting", "Deduplication", "Quality assessment", "Batch processing"]',
        '["Excel", "CSV", "Google Sheets", "QuickBooks", "Sage", "Zoho", "REST API"]',
        '["English", "Yoruba", "Hausa", "Igbo"]',
        'Minimum 4GB RAM, Internet connection for validation services',
        'Download the agent, configure your data sources, set validation rules, and run automated cleaning processes. Detailed setup guide included.',
        '["data-cleaning", "validation", "nigerian-business", "automation", "compliance"]',
        '["Small businesses", "Accountants", "Data analysts", "E-commerce stores", "Financial services"]',
        'approved',
        true,
        'DataClean Pro - Nigerian Business Data Cleaning Solution',
        'Professional data cleaning and validation tool designed for Nigerian businesses. Automate data processing with local compliance.',
        NOW() - INTERVAL '30 days'
    ),
    (
        uuid_generate_v4(),
        jane_smith_id,
        'Content Genius',
        'content-genius',
        'AI-powered content creation in multiple Nigerian languages',
        'Create engaging content for your Nigerian audience in English, Yoruba, Hausa, and Igbo with cultural context and local market understanding.',
        'Content Genius revolutionizes content creation for Nigerian businesses by providing AI-powered writing assistance that understands local culture, languages, and market dynamics. Whether you need social media posts, blog articles, product descriptions, or marketing copy, this agent delivers culturally relevant content that resonates with your Nigerian audience.',
        content_creation_id,
        'subscription',
        25000.00,
        'NGN',
        '["Multi-language support", "Cultural context awareness", "SEO optimization", "Social media templates", "Blog post generation", "Product descriptions", "Email marketing copy", "Local slang integration"]',
        '["Social media marketing", "Blog content creation", "E-commerce product descriptions", "Email campaigns", "Website copy", "Marketing materials", "Press releases"]',
        '["Content generation", "Language translation", "SEO optimization", "Cultural adaptation", "Template creation", "Bulk content creation"]',
        '["WordPress", "Shopify", "Mailchimp", "Hootsuite", "Buffer", "Facebook", "Instagram", "WhatsApp Business"]',
        '["English", "Yoruba", "Hausa", "Igbo", "Pidgin English"]',
        'Internet connection required for AI processing',
        'Install the agent, select your target languages and audience, configure content preferences, and start generating culturally relevant content.',
        '["content-creation", "nigerian-languages", "marketing", "social-media", "seo"]',
        '["Digital marketers", "Content creators", "E-commerce businesses", "Social media managers", "Bloggers"]',
        'approved',
        true,
        'Content Genius - Nigerian Multi-Language Content Creator',
        'AI-powered content creation tool for Nigerian businesses. Generate engaging content in English, Yoruba, Hausa, and Igbo.',
        NOW() - INTERVAL '25 days'
    ),
    (
        uuid_generate_v4(),
        mike_johnson_id,
        'ChatBot Nigeria',
        'chatbot-nigeria',
        'Customer service chatbot with local language support',
        'Intelligent customer service chatbot that speaks your customers language and understands Nigerian business culture and practices.',
        'ChatBot Nigeria is a sophisticated customer service solution designed specifically for Nigerian businesses. It provides 24/7 customer support in multiple local languages, understands cultural nuances, and can handle common customer inquiries about Nigerian business practices, payment methods, and local services.',
        customer_service_id,
        'freemium',
        20000.00,
        'NGN',
        '["24/7 customer support", "Multi-language conversations", "Nigerian payment integration", "Local business knowledge", "WhatsApp integration", "Live chat handover", "Analytics dashboard", "Custom responses"]',
        '["Customer support automation", "Lead qualification", "Order tracking", "Payment assistance", "Product recommendations", "Complaint handling", "FAQ automation"]',
        '["Natural language processing", "Multi-language support", "Context awareness", "Integration capabilities", "Analytics", "Escalation management"]',
        '["WhatsApp Business", "Facebook Messenger", "Website chat", "Telegram", "Paystack", "Flutterwave", "Interswitch"]',
        '["English", "Yoruba", "Hausa", "Igbo", "Pidgin English"]',
        'Web hosting or cloud service for deployment',
        'Deploy the chatbot to your preferred platform, configure language preferences, train with your business-specific responses, and activate customer interactions.',
        '["chatbot", "customer-service", "nigerian-languages", "whatsapp", "automation"]',
        '["E-commerce stores", "Service providers", "Financial services", "Healthcare providers", "Educational institutions"]',
        'approved',
        false,
        'ChatBot Nigeria - Multi-Language Customer Service Bot',
        'Intelligent customer service chatbot for Nigerian businesses with local language support and cultural understanding.',
        NOW() - INTERVAL '20 days'
    ),
    (
        uuid_generate_v4(),
        john_doe_id,
        'Invoice Generator Pro',
        'invoice-generator-pro',
        'Automated invoice generation with Nigerian tax compliance',
        'Generate professional invoices automatically with VAT calculations, Nigerian tax compliance, and integration with local payment gateways.',
        'Invoice Generator Pro streamlines your billing process with automated invoice creation that complies with Nigerian tax regulations. It handles VAT calculations, supports multiple currencies, integrates with local payment gateways, and provides comprehensive financial reporting for your business.',
        finance_accounting_id,
        'one_time',
        12000.00,
        'NGN',
        '["VAT compliance", "Multiple currency support", "Payment gateway integration", "Automated calculations", "Professional templates", "Client management", "Recurring invoices", "Financial reporting"]',
        '["Small business invoicing", "Freelancer billing", "Service provider invoicing", "E-commerce billing", "Subscription billing", "Project-based billing"]',
        '["Invoice generation", "Tax calculations", "Payment processing", "Client management", "Reporting", "Template customization"]',
        '["Paystack", "Flutterwave", "QuickBooks", "Sage", "Zoho Books", "Excel", "Google Sheets"]',
        '["English"]',
        'Windows 10+ or macOS 10.14+, Internet connection for payment processing',
        'Install the software, configure your business details and tax settings, add client information, and start generating compliant invoices.',
        '["invoicing", "billing", "vat-compliance", "nigerian-tax", "payment-gateway"]',
        '["Small businesses", "Freelancers", "Service providers", "Consultants", "E-commerce stores"]',
        'approved',
        false,
        'Invoice Generator Pro - Nigerian Tax Compliant Invoicing',
        'Professional invoicing solution with Nigerian VAT compliance and local payment gateway integration.',
        NOW() - INTERVAL '15 days'
    ),
    (
        uuid_generate_v4(),
        jane_smith_id,
        'Email Marketing Master',
        'email-marketing-master',
        'Professional email marketing automation for Nigerian businesses',
        'Comprehensive email marketing solution with Nigerian market insights, local holiday calendars, and culturally relevant templates.',
        'Email Marketing Master is designed specifically for Nigerian businesses looking to engage their audience through effective email campaigns. It includes templates for local holidays, understands Nigerian consumer behavior, and provides analytics tailored to the African market.',
        marketing_sales_id,
        'subscription',
        18000.00,
        'NGN',
        '["Nigerian holiday templates", "Local market insights", "Automated campaigns", "A/B testing", "Subscriber segmentation", "Analytics dashboard", "Mobile optimization", "Deliverability optimization"]',
        '["Newsletter campaigns", "Product launches", "Holiday promotions", "Customer retention", "Lead nurturing", "Event marketing", "Sales automation"]',
        '["Email automation", "Template design", "List management", "Analytics", "Segmentation", "Personalization"]',
        '["Mailchimp", "Constant Contact", "Sendinblue", "WordPress", "Shopify", "WooCommerce", "Zapier"]',
        '["English", "Pidgin English"]',
        'Internet connection, email service provider account',
        'Connect your email service provider, import your subscriber list, choose Nigerian-focused templates, and launch your campaigns.',
        '["email-marketing", "nigerian-holidays", "automation", "campaigns", "analytics"]',
        '["E-commerce businesses", "Service providers", "Event organizers", "Non-profits", "Educational institutions"]',
        'under_review',
        false,
        'Email Marketing Master - Nigerian Business Email Campaigns',
        'Professional email marketing automation with Nigerian market insights and local holiday templates.',
        NULL
    ),
    (
        uuid_generate_v4(),
        mike_johnson_id,
        'Inventory Tracker',
        'inventory-tracker',
        'Smart inventory management for Nigerian retailers',
        'Intelligent inventory tracking system that understands Nigerian supply chains, seasonal patterns, and local market dynamics.',
        'Inventory Tracker is a comprehensive inventory management solution built for Nigerian retailers and distributors. It accounts for local supply chain challenges, seasonal demand patterns, and provides insights specific to the Nigerian market to help optimize stock levels and reduce waste.',
        operations_workflow_id,
        'one_time',
        22000.00,
        'NGN',
        '["Real-time stock tracking", "Low stock alerts", "Supplier management", "Seasonal forecasting", "Barcode scanning", "Multi-location support", "Cost analysis", "Waste reduction insights"]',
        '["Retail inventory management", "Warehouse operations", "Supply chain optimization", "Stock forecasting", "Vendor management", "Cost control"]',
        '["Inventory tracking", "Forecasting", "Analytics", "Reporting", "Integration", "Automation"]',
        '["POS systems", "QuickBooks", "Sage", "Excel", "Barcode scanners", "Mobile apps"]',
        '["English"]',
        'Windows 10+ or Android device, barcode scanner (optional)',
        'Install the application, set up your product catalog, configure suppliers and locations, and start tracking your inventory in real-time.',
        '["inventory-management", "retail", "supply-chain", "forecasting", "nigerian-market"]',
        '["Retailers", "Distributors", "Wholesalers", "Manufacturers", "Restaurant owners"]',
        'pending',
        false,
        'Inventory Tracker - Smart Nigerian Retail Inventory Management',
        'Intelligent inventory management system designed for Nigerian retailers with local market insights.',
        NULL
    );

    -- Insert agent submissions for the agents
    INSERT INTO agent_submissions (agent_id, submission_type, status, estimated_review_time) 
    SELECT id, 'new', 
           CASE 
               WHEN status = 'approved' THEN 'approved'
               WHEN status = 'under_review' THEN 'under_review'
               WHEN status = 'pending' THEN 'pending'
               ELSE 'pending'
           END,
           '2-3 business days'
    FROM agents;

    -- Insert sample reviews for approved agents
    INSERT INTO agent_reviews (agent_id, user_id, rating, title, comment, is_verified_purchase, helpful_count)
    SELECT 
        a.id,
        u.id,
        CASE 
            WHEN random() < 0.6 THEN 5
            WHEN random() < 0.8 THEN 4
            WHEN random() < 0.95 THEN 3
            ELSE 2
        END,
        CASE 
            WHEN a.name = 'DataClean Pro' THEN 'Excellent data cleaning tool'
            WHEN a.name = 'Content Genius' THEN 'Great for Nigerian content'
            WHEN a.name = 'ChatBot Nigeria' THEN 'Perfect for customer service'
            WHEN a.name = 'Invoice Generator Pro' THEN 'VAT compliance made easy'
            ELSE 'Good product overall'
        END,
        CASE 
            WHEN a.name = 'DataClean Pro' THEN 'This tool saved me hours of manual data cleaning. The Nigerian phone number validation is spot on!'
            WHEN a.name = 'Content Genius' THEN 'Finally, a content tool that understands Nigerian culture. The Yoruba translations are impressive.'
            WHEN a.name = 'ChatBot Nigeria' THEN 'Our customers love chatting in their local language. Great WhatsApp integration.'
            WHEN a.name = 'Invoice Generator Pro' THEN 'VAT calculations are automatic and compliant. Perfect for my consulting business.'
            ELSE 'Solid product that delivers on its promises. Recommended for Nigerian businesses.'
        END,
        true,
        floor(random() * 10)::integer
    FROM agents a
    CROSS JOIN users u
    WHERE a.status = 'approved' 
    AND u.role = 'user'
    AND random() < 0.7; -- 70% chance of review per user-agent combination

END $$;
