-- 0. Mock Supabase Auth schema if it doesn't exist (for local development)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') THEN
        CREATE SCHEMA auth;
        CREATE FUNCTION auth.uid() RETURNS uuid AS 'SELECT "id" FROM users LIMIT 1' LANGUAGE SQL STABLE;
    END IF;
END $$;

-- 1. Enable Row Level Security (Can be run multiple times safely)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 2. USERS Table Policies
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own profile' AND tablename = 'users') THEN
        CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = auth_id);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile' AND tablename = 'users') THEN
        CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = auth_id);
    END IF;
END $$;

-- 3. LISTINGS Table Policies
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view listings' AND tablename = 'listings') THEN
        CREATE POLICY "Anyone can view listings" ON listings FOR SELECT USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Owners can modify their listings' AND tablename = 'listings') THEN
        CREATE POLICY "Owners can modify their listings" ON listings FOR ALL USING (
            EXISTS (SELECT 1 FROM users WHERE users.id = listings.owner_id AND users.auth_id = auth.uid()::text)
        );
    END IF;
END $$;

-- 4. PROPERTIES Table Policies
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view properties' AND tablename = 'properties') THEN
        CREATE POLICY "Anyone can view properties" ON properties FOR SELECT USING (true);
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Agents can modify their properties' AND tablename = 'properties') THEN
        CREATE POLICY "Agents can modify their properties" ON properties FOR ALL USING (
            EXISTS (SELECT 1 FROM users WHERE users.id = properties.agent_id AND users.auth_id = auth.uid()::text)
        );
    END IF;
END $$;

-- 5. ROOM_UNITS Table Policies
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view room units' AND tablename = 'room_units') THEN
        CREATE POLICY "Anyone can view room units" ON room_units FOR SELECT USING (true);
    END IF;
END $$;

-- 6. BOOKINGS Table Policies
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view own bookings' AND tablename = 'bookings') THEN
        CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (
            EXISTS (SELECT 1 FROM users WHERE users.id = bookings.user_id AND users.auth_id = auth.uid()::text)
        );
    END IF;
END $$;
