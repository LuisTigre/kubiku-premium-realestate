-- 0. Mock Supabase Auth schema if it doesn't exist (for local development)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') THEN
        CREATE SCHEMA auth;
        CREATE FUNCTION auth.uid() RETURNS uuid AS 'SELECT "id" FROM users LIMIT 1' LANGUAGE SQL STABLE;
    END IF;
END $$;

-- 1. Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- USERS Table Policies
-- Allow users to see their own profile
CREATE POLICY "Users can view own profile" 
ON users FOR SELECT 
USING (auth.uid()::text = auth_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON users FOR UPDATE 
USING (auth.uid()::text = auth_id);

-- LISTINGS Table Policies
-- Anyone (including guests) can view listings
CREATE POLICY "Anyone can view listings" 
ON listings FOR SELECT 
USING (true);

-- Only owners can modify their listings
CREATE POLICY "Owners can modify their listings" 
ON listings FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = listings.owner_id 
    AND users.auth_id = auth.uid()::text
  )
);

-- PROPERTIES Table Policies
-- Anyone can view property details
CREATE POLICY "Anyone can view properties" 
ON properties FOR SELECT 
USING (true);

-- Only agents/owners can modify properties
CREATE POLICY "Agents can modify their properties" 
ON properties FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = properties.agent_id 
    AND users.auth_id = auth.uid()::text
  )
);

-- ROOM_UNITS Table Policies
-- Anyone can view room units
CREATE POLICY "Anyone can view room units" 
ON room_units FOR SELECT 
USING (true);

-- BOOKINGS Table Policies
-- Users can see their own bookings
CREATE POLICY "Users can view own bookings" 
ON bookings FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE users.id = bookings.user_id 
    AND users.auth_id = auth.uid()::text
  )
);
