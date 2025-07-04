-- Create useful views and functions for the 9jaAgents platform

-- View: Agent statistics with calculated metrics
CREATE OR REPLACE VIEW agent_stats AS
SELECT 
    a.id,
    a.name,
    a.slug,
    a.status,
    a.price,
    a.currency,
    a.is_featured,
    a.created_at,
    a.published_at,
    u.first_name || ' ' || u.last_name as creator_name,
    c.name as category_name,
    
    -- Review statistics
    COALESCE(AVG(ar.rating), 0) as avg_rating,
    COUNT(ar.id) as review_count,
    
    -- Purchase statistics
    COALESCE(SUM(oi.quantity), 0) as total_sales,
    COALESCE(SUM(oi.total_price), 0) as total_revenue,
    
    -- Analytics statistics (last 30 days)
    COALESCE(SUM(aa.views), 0) as total_views,
    COALESCE(SUM(aa.downloads), 0) as total_downloads,
    
    -- Popularity score calculation
    (
        COALESCE(AVG(ar.rating), 0) * 0.3 +
        LEAST(COUNT(ar.id), 100) * 0.002 +
        LEAST(COALESCE(SUM(oi.quantity), 0), 1000) * 0.0005 +
        LEAST(COALESCE(SUM(aa.views), 0), 10000) * 0.00001 +
        (CASE WHEN a.is_featured THEN 1 ELSE 0 END) * 0.5
    ) as popularity_score

FROM agents a
LEFT JOIN users u ON a.creator_id = u.id
LEFT JOIN categories c ON a.category_id = c.id
LEFT JOIN agent_reviews ar ON a.id = ar.agent_id AND ar.status = 'published'
LEFT JOIN order_items oi ON a.id = oi.agent_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
LEFT JOIN agent_analytics aa ON a.id = aa.agent_id AND aa.date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY a.id, u.first_name, u.last_name, c.name;

-- View: User purchase history with agent details
CREATE OR REPLACE VIEW user_purchase_history AS
SELECT 
    u.id as user_id,
    u.first_name || ' ' || u.last_name as user_name,
    u.email,
    a.id as agent_id,
    a.name as agent_name,
    a.slug as agent_slug,
    c.name as category_name,
    o.id as order_id,
    o.order_number,
    o.total_amount,
    o.currency,
    o.status as order_status,
    o.created_at as purchase_date,
    uap.license_key,
    uap.expires_at,
    uap.is_active as license_active,
    uap.usage_count,
    uap.last_used_at
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN agents a ON oi.agent_id = a.id
JOIN categories c ON a.category_id = c.id
LEFT JOIN user_agent_purchases uap ON u.id = uap.user_id AND a.id = uap.agent_id AND o.id = uap.order_id
WHERE o.status = 'completed';

-- View: Creator earnings and performance
CREATE OR REPLACE VIEW creator_earnings AS
SELECT 
    u.id as creator_id,
    u.first_name || ' ' || u.last_name as creator_name,
    u.email,
    COUNT(DISTINCT a.id) as total_agents,
    COUNT(DISTINCT CASE WHEN a.status = 'approved' THEN a.id END) as active_agents,
    COALESCE(SUM(oi.total_price), 0) as gross_revenue,
    COALESCE(SUM(oi.total_price * 0.85), 0) as net_revenue, -- 85% to creator
    COALESCE(SUM(oi.quantity), 0) as total_sales,
    COALESCE(AVG(ar.rating), 0) as avg_rating,
    COUNT(ar.id) as total_reviews
FROM users u
LEFT JOIN agents a ON u.id = a.creator_id
LEFT JOIN order_items oi ON a.id = oi.agent_id
LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
LEFT JOIN agent_reviews ar ON a.id = ar.agent_id AND ar.status = 'published'
WHERE u.role IN ('creator', 'admin')
GROUP BY u.id, u.first_name, u.last_name, u.email;

-- View: Platform analytics dashboard
CREATE OR REPLACE VIEW platform_analytics AS
SELECT 
    -- User metrics
    (SELECT COUNT(*) FROM users WHERE role = 'user') as total_users,
    (SELECT COUNT(*) FROM users WHERE role = 'creator') as total_creators,
    (SELECT COUNT(*) FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_users_30d,
    
    -- Agent metrics
    (SELECT COUNT(*) FROM agents WHERE status = 'approved') as total_active_agents,
    (SELECT COUNT(*) FROM agents WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as new_agents_30d,
    (SELECT COUNT(*) FROM agents WHERE status = 'pending') as pending_reviews,
    
    -- Revenue metrics
    (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status = 'completed') as total_revenue,
    (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status = 'completed' AND created_at >= CURRENT_DATE - INTERVAL '30 days') as revenue_30d,
    (SELECT COALESCE(SUM(total_amount * 0.15), 0) FROM orders WHERE status = 'completed') as platform_commission,
    
    -- Activity metrics
    (SELECT COUNT(*) FROM orders WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as orders_30d,
    (SELECT COUNT(*) FROM agent_reviews WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as reviews_30d,
    (SELECT COALESCE(SUM(views), 0) FROM agent_analytics WHERE date >= CURRENT_DATE - INTERVAL '30 days') as total_views_30d;

-- Function: Calculate agent popularity score
CREATE OR REPLACE FUNCTION calculate_agent_popularity_score(agent_id UUID)
RETURNS DECIMAL(10,4) AS $$
DECLARE
    avg_rating DECIMAL(3,2);
    review_count INTEGER;
    total_sales INTEGER;
    total_views INTEGER;
    is_featured BOOLEAN;
    popularity_score DECIMAL(10,4);
BEGIN
    SELECT 
        COALESCE(AVG(ar.rating), 0),
        COUNT(ar.id),
        COALESCE(SUM(oi.quantity), 0),
        COALESCE(SUM(aa.views), 0),
        a.is_featured
    INTO avg_rating, review_count, total_sales, total_views, is_featured
    FROM agents a
    LEFT JOIN agent_reviews ar ON a.id = ar.agent_id AND ar.status = 'published'
    LEFT JOIN order_items oi ON a.id = oi.agent_id
    LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
    LEFT JOIN agent_analytics aa ON a.id = aa.agent_id AND aa.date >= CURRENT_DATE - INTERVAL '30 days'
    WHERE a.id = agent_id
    GROUP BY a.is_featured;
    
    -- Calculate popularity score with weighted factors
    popularity_score := (
        avg_rating * 0.3 +
        LEAST(review_count, 100) * 0.002 +
        LEAST(total_sales, 1000) * 0.0005 +
        LEAST(total_views, 10000) * 0.00001 +
        (CASE WHEN is_featured THEN 1 ELSE 0 END) * 0.5
    );
    
    RETURN popularity_score;
END;
$$ LANGUAGE plpgsql;

-- Function: Get trending agents
CREATE OR REPLACE FUNCTION get_trending_agents(
    limit_count INTEGER DEFAULT 10,
    category_filter UUID DEFAULT NULL,
    days_back INTEGER DEFAULT 7
)
RETURNS TABLE (
    agent_id UUID,
    agent_name VARCHAR(200),
    agent_slug VARCHAR(200),
    category_name VARCHAR(100),
    creator_name TEXT,
    avg_rating DECIMAL(3,2),
    total_sales BIGINT,
    recent_views BIGINT,
    popularity_score DECIMAL(10,4)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.name,
        a.slug,
        c.name,
        u.first_name || ' ' || u.last_name,
        COALESCE(AVG(ar.rating), 0)::DECIMAL(3,2),
        COALESCE(SUM(oi.quantity), 0)::BIGINT,
        COALESCE(SUM(aa.views), 0)::BIGINT,
        calculate_agent_popularity_score(a.id)
    FROM agents a
    JOIN users u ON a.creator_id = u.id
    JOIN categories c ON a.category_id = c.id
    LEFT JOIN agent_reviews ar ON a.id = ar.agent_id AND ar.status = 'published'
    LEFT JOIN order_items oi ON a.id = oi.agent_id
    LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
    LEFT JOIN agent_analytics aa ON a.id = aa.agent_id AND aa.date >= CURRENT_DATE - INTERVAL (days_back || ' days')::INTERVAL
    WHERE a.status = 'approved'
    AND (category_filter IS NULL OR a.category_id = category_filter)
    GROUP BY a.id, a.name, a.slug, c.name, u.first_name, u.last_name
    ORDER BY calculate_agent_popularity_score(a.id) DESC, a.created_at DESC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function: Update agent analytics
CREATE OR REPLACE FUNCTION update_agent_analytics(
    agent_id UUID,
    event_type VARCHAR(20), -- 'view', 'download', 'purchase'
    event_count INTEGER DEFAULT 1
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO agent_analytics (agent_id, date, views, downloads, purchases)
    VALUES (
        agent_id, 
        CURRENT_DATE,
        CASE WHEN event_type = 'view' THEN event_count ELSE 0 END,
        CASE WHEN event_type = 'download' THEN event_count ELSE 0 END,
        CASE WHEN event_type = 'purchase' THEN event_count ELSE 0 END
    )
    ON CONFLICT (agent_id, date)
    DO UPDATE SET
        views = agent_analytics.views + CASE WHEN event_type = 'view' THEN event_count ELSE 0 END,
        downloads = agent_analytics.downloads + CASE WHEN event_type = 'download' THEN event_count ELSE 0 END,
        purchases = agent_analytics.purchases + CASE WHEN event_type = 'purchase' THEN event_count ELSE 0 END,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function: Search agents with filters
CREATE OR REPLACE FUNCTION search_agents(
    search_query TEXT DEFAULT NULL,
    category_filter UUID DEFAULT NULL,
    price_min DECIMAL DEFAULT NULL,
    price_max DECIMAL DEFAULT NULL,
    rating_min DECIMAL DEFAULT NULL,
    sort_by VARCHAR(20) DEFAULT 'popularity', -- 'popularity', 'rating', 'price', 'newest'
    limit_count INTEGER DEFAULT 20,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    agent_id UUID,
    agent_name VARCHAR(200),
    agent_slug VARCHAR(200),
    tagline VARCHAR(300),
    category_name VARCHAR(100),
    creator_name TEXT,
    price DECIMAL(10,2),
    currency VARCHAR(3),
    avg_rating DECIMAL(3,2),
    review_count BIGINT,
    total_sales BIGINT,
    is_featured BOOLEAN,
    popularity_score DECIMAL(10,4)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.id,
        a.name,
        a.slug,
        a.tagline,
        c.name,
        u.first_name || ' ' || u.last_name,
        a.price,
        a.currency,
        COALESCE(AVG(ar.rating), 0)::DECIMAL(3,2),
        COUNT(ar.id)::BIGINT,
        COALESCE(SUM(oi.quantity), 0)::BIGINT,
        a.is_featured,
        calculate_agent_popularity_score(a.id)
    FROM agents a
    JOIN users u ON a.creator_id = u.id
    JOIN categories c ON a.category_id = c.id
    LEFT JOIN agent_reviews ar ON a.id = ar.agent_id AND ar.status = 'published'
    LEFT JOIN order_items oi ON a.id = oi.agent_id
    LEFT JOIN orders o ON oi.order_id = o.id AND o.status = 'completed'
    WHERE a.status = 'approved'
    AND (search_query IS NULL OR (
        a.name ILIKE '%' || search_query || '%' OR
        a.description ILIKE '%' || search_query || '%' OR
        a.tags::text ILIKE '%' || search_query || '%'
    ))
    AND (category_filter IS NULL OR a.category_id = category_filter)
    AND (price_min IS NULL OR a.price >= price_min)
    AND (price_max IS NULL OR a.price <= price_max)
    GROUP BY a.id, a.name, a.slug, a.tagline, c.name, u.first_name, u.last_name, a.price, a.currency, a.is_featured
    HAVING (rating_min IS NULL OR COALESCE(AVG(ar.rating), 0) >= rating_min)
    ORDER BY 
        CASE WHEN sort_by = 'popularity' THEN calculate_agent_popularity_score(a.id) END DESC,
        CASE WHEN sort_by = 'rating' THEN COALESCE(AVG(ar.rating), 0) END DESC,
        CASE WHEN sort_by = 'price' THEN a.price END ASC,
        CASE WHEN sort_by = 'newest' THEN a.published_at END DESC,
        a.is_featured DESC,
        a.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Function: Generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR(50) AS $$
DECLARE
    order_number VARCHAR(50);
    counter INTEGER;
BEGIN
    -- Get daily counter
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 10) AS INTEGER)), 0) + 1
    INTO counter
    FROM orders 
    WHERE order_number LIKE '9JA' || TO_CHAR(CURRENT_DATE, 'YYMMDD') || '%';
    
    -- Generate order number: 9JA + YYMMDD + 4-digit counter
    order_number := '9JA' || TO_CHAR(CURRENT_DATE, 'YYMMDD') || LPAD(counter::TEXT, 4, '0');
    
    RETURN order_number;
END;
$$ LANGUAGE plpgsql;

-- Create indexes for the views and functions
CREATE INDEX IF NOT EXISTS idx_agent_analytics_date_agent ON agent_analytics(date, agent_id);
CREATE INDEX IF NOT EXISTS idx_agents_search_text ON agents USING gin(to_tsvector('english', name || ' ' || description));
CREATE INDEX IF NOT EXISTS idx_agents_tags ON agents USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_orders_date ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_reviews_status ON agent_reviews(status);
