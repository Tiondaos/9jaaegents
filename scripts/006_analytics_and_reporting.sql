-- Advanced analytics and reporting tables for the 9jaAgents platform

-- Daily platform metrics
CREATE TABLE platform_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL UNIQUE,
    
    -- User metrics
    total_users INTEGER DEFAULT 0,
    new_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    total_creators INTEGER DEFAULT 0,
    new_creators INTEGER DEFAULT 0,
    
    -- Agent metrics
    total_agents INTEGER DEFAULT 0,
    new_agents INTEGER DEFAULT 0,
    approved_agents INTEGER DEFAULT 0,
    pending_agents INTEGER DEFAULT 0,
    
    -- Transaction metrics
    total_orders INTEGER DEFAULT 0,
    completed_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    platform_revenue DECIMAL(12,2) DEFAULT 0,
    creator_revenue DECIMAL(12,2) DEFAULT 0,
    
    -- Engagement metrics
    total_views INTEGER DEFAULT 0,
    total_downloads INTEGER DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    avg_rating DECIMAL(3,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User behavior tracking
CREATE TABLE user_activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID,
    activity_type VARCHAR(50) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search analytics
CREATE TABLE search_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    search_query TEXT NOT NULL,
    filters_applied JSONB DEFAULT '{}',
    results_count INTEGER DEFAULT 0,
    clicked_result_id UUID,
    clicked_position INTEGER,
    session_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email campaign tracking
CREATE TABLE email_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    subject VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    target_audience JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'cancelled')),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    sent_at TIMESTAMP WITH TIME ZONE,
    total_recipients INTEGER DEFAULT 0,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email campaign metrics
CREATE TABLE email_campaign_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES email_campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained')),
    event_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A/B test experiments
CREATE TABLE ab_experiments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    hypothesis TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'paused', 'completed', 'cancelled')),
    start_date DATE,
    end_date DATE,
    traffic_allocation DECIMAL(3,2) DEFAULT 0.5, -- 0.5 = 50/50 split
    success_metric VARCHAR(100) NOT NULL,
    variants JSONB NOT NULL, -- Array of variant configurations
    results JSONB DEFAULT '{}',
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- A/B test participant tracking
CREATE TABLE ab_experiment_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    experiment_id UUID NOT NULL REFERENCES ab_experiments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID,
    variant VARCHAR(50) NOT NULL,
    converted BOOLEAN DEFAULT FALSE,
    conversion_value DECIMAL(10,2) DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue analytics by various dimensions
CREATE TABLE revenue_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    dimension_type VARCHAR(50) NOT NULL, -- 'category', 'creator', 'pricing_model', 'country'
    dimension_value VARCHAR(200) NOT NULL,
    
    -- Revenue metrics
    gross_revenue DECIMAL(12,2) DEFAULT 0,
    net_revenue DECIMAL(12,2) DEFAULT 0,
    platform_fee DECIMAL(12,2) DEFAULT 0,
    
    -- Volume metrics
    orders_count INTEGER DEFAULT 0,
    units_sold INTEGER DEFAULT 0,
    unique_customers INTEGER DEFAULT 0,
    
    -- Performance metrics
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    customer_lifetime_value DECIMAL(10,2) DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, dimension_type, dimension_value)
);

-- Cohort analysis for user retention
CREATE TABLE user_cohorts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cohort_month DATE NOT NULL, -- First day of the month when users joined
    period_number INTEGER NOT NULL, -- 0 = first month, 1 = second month, etc.
    users_count INTEGER NOT NULL,
    active_users INTEGER NOT NULL,
    retention_rate DECIMAL(5,4) NOT NULL,
    revenue DECIMAL(12,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(cohort_month, period_number)
);

-- Funnel analysis tracking
CREATE TABLE conversion_funnels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    steps JSONB NOT NULL, -- Array of funnel steps
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Funnel step tracking
CREATE TABLE funnel_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    funnel_id UUID NOT NULL REFERENCES conversion_funnels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID,
    step_name VARCHAR(100) NOT NULL,
    step_order INTEGER NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create materialized views for performance
CREATE MATERIALIZED VIEW daily_agent_performance AS
SELECT 
    a.id as agent_id,
    a.name as agent_name,
    a.slug,
    c.name as category_name,
    u.first_name || ' ' || u.last_name as creator_name,
    DATE(aa.date) as date,
    COALESCE(aa.views, 0) as views,
    COALESCE(aa.downloads, 0) as downloads,
    COALESCE(aa.purchases, 0) as purchases,
    COALESCE(aa.revenue, 0) as revenue,
    COALESCE(AVG(ar.rating), 0) as avg_rating,
    COUNT(ar.id) as review_count
FROM agents a
LEFT JOIN agent_analytics aa ON a.id = aa.agent_id
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN users u ON a.creator_id = u.id
LEFT JOIN agent_reviews ar ON a.id = ar.agent_id AND ar.status = 'published'
WHERE a.status = 'approved'
GROUP BY a.id, a.name, a.slug, c.name, u.first_name, u.last_name, aa.date, aa.views, aa.downloads, aa.purchases, aa.revenue;

-- Create indexes for analytics tables
CREATE INDEX idx_platform_metrics_date ON platform_metrics(date);

CREATE INDEX idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX idx_user_activities_activity_type ON user_activities(activity_type);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at);
CREATE INDEX idx_user_activities_resource ON user_activities(resource_type, resource_id);

CREATE INDEX idx_search_analytics_user_id ON search_analytics(user_id);
CREATE INDEX idx_search_analytics_query ON search_analytics(search_query);
CREATE INDEX idx_search_analytics_created_at ON search_analytics(created_at);

CREATE INDEX idx_email_campaign_metrics_campaign_id ON email_campaign_metrics(campaign_id);
CREATE INDEX idx_email_campaign_metrics_status ON email_campaign_metrics(status);
CREATE INDEX idx_email_campaign_metrics_created_at ON email_campaign_metrics(created_at);

CREATE INDEX idx_ab_experiment_participants_experiment_id ON ab_experiment_participants(experiment_id);
CREATE INDEX idx_ab_experiment_participants_user_id ON ab_experiment_participants(user_id);
CREATE INDEX idx_ab_experiment_participants_variant ON ab_experiment_participants(variant);

CREATE INDEX idx_revenue_analytics_date ON revenue_analytics(date);
CREATE INDEX idx_revenue_analytics_dimension ON revenue_analytics(dimension_type, dimension_value);

CREATE INDEX idx_user_cohorts_cohort_month ON user_cohorts(cohort_month);
CREATE INDEX idx_user_cohorts_period ON user_cohorts(period_number);

CREATE INDEX idx_funnel_events_funnel_id ON funnel_events(funnel_id);
CREATE INDEX idx_funnel_events_user_id ON funnel_events(user_id);
CREATE INDEX idx_funnel_events_step ON funnel_events(step_name, step_order);
CREATE INDEX idx_funnel_events_created_at ON funnel_events(created_at);

-- Functions for analytics calculations
CREATE OR REPLACE FUNCTION calculate_daily_metrics(target_date DATE DEFAULT CURRENT_DATE)
RETURNS VOID AS $$
BEGIN
    INSERT INTO platform_metrics (
        date, total_users, new_users, active_users, total_creators, new_creators,
        total_agents, new_agents, approved_agents, pending_agents,
        total_orders, completed_orders, total_revenue, platform_revenue, creator_revenue,
        total_views, total_downloads, total_reviews, avg_rating
    )
    SELECT 
        target_date,
        (SELECT COUNT(*) FROM users WHERE role IN ('user', 'creator')),
        (SELECT COUNT(*) FROM users WHERE DATE(created_at) = target_date),
        (SELECT COUNT(DISTINCT user_id) FROM user_activities WHERE DATE(created_at) = target_date),
        (SELECT COUNT(*) FROM users WHERE role = 'creator'),
        (SELECT COUNT(*) FROM users WHERE role = 'creator' AND DATE(created_at) = target_date),
        (SELECT COUNT(*) FROM agents),
        (SELECT COUNT(*) FROM agents WHERE DATE(created_at) = target_date),
        (SELECT COUNT(*) FROM agents WHERE status = 'approved'),
        (SELECT COUNT(*) FROM agents WHERE status IN ('pending', 'under_review')),
        (SELECT COUNT(*) FROM orders WHERE DATE(created_at) = target_date),
        (SELECT COUNT(*) FROM orders WHERE status = 'completed' AND DATE(created_at) = target_date),
        (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status = 'completed' AND DATE(created_at) = target_date),
        (SELECT COALESCE(SUM(total_amount * 0.15), 0) FROM orders WHERE status = 'completed' AND DATE(created_at) = target_date),
        (SELECT COALESCE(SUM(total_amount * 0.85), 0) FROM orders WHERE status = 'completed' AND DATE(created_at) = target_date),
        (SELECT COALESCE(SUM(views), 0) FROM agent_analytics WHERE date = target_date),
        (SELECT COALESCE(SUM(downloads), 0) FROM agent_analytics WHERE date = target_date),
        (SELECT COUNT(*) FROM agent_reviews WHERE DATE(created_at) = target_date),
        (SELECT COALESCE(AVG(rating), 0) FROM agent_reviews WHERE DATE(created_at) = target_date)
    ON CONFLICT (date) DO UPDATE SET
        total_users = EXCLUDED.total_users,
        new_users = EXCLUDED.new_users,
        active_users = EXCLUDED.active_users,
        total_creators = EXCLUDED.total_creators,
        new_creators = EXCLUDED.new_creators,
        total_agents = EXCLUDED.total_agents,
        new_agents = EXCLUDED.new_agents,
        approved_agents = EXCLUDED.approved_agents,
        pending_agents = EXCLUDED.pending_agents,
        total_orders = EXCLUDED.total_orders,
        completed_orders = EXCLUDED.completed_orders,
        total_revenue = EXCLUDED.total_revenue,
        platform_revenue = EXCLUDED.platform_revenue,
        creator_revenue = EXCLUDED.creator_revenue,
        total_views = EXCLUDED.total_views,
        total_downloads = EXCLUDED.total_downloads,
        total_reviews = EXCLUDED.total_reviews,
        avg_rating = EXCLUDED.avg_rating;
END;
$$ LANGUAGE plpgsql;

-- Function to refresh materialized views
CREATE OR REPLACE FUNCTION refresh_analytics_views()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW daily_agent_performance;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_email_campaigns_updated_at BEFORE UPDATE ON email_campaigns FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ab_experiments_updated_at BEFORE UPDATE ON ab_experiments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversion_funnels_updated_at BEFORE UPDATE ON conversion_funnels FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
