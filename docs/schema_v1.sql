-- KUBIKU PLATFORM SCHEMA (v1)
-- Target: PostgreSQL (Supabase)

-- ENUMS
CREATE TYPE listing_type AS ENUM ('HOSPITALITY', 'REAL_ESTATE');
CREATE TYPE unit_type AS ENUM ('ROOM', 'APARTMENT', 'VILLA', 'SUITE', 'STUDIO');
CREATE TYPE booking_status AS ENUM ('REQUESTED', 'APPROVED', 'REJECTED', 'PAYMENT_PENDING', 'PAID', 'CONFIRMED', 'CANCELLED');
CREATE TYPE lead_status AS ENUM ('NEW', 'CONTACTED', 'CONVERTED', 'CLOSED');

-- 1. USERS (Profiles linked to Auth)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'USER', -- USER, PARTNER, ADMIN
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. LISTINGS (Unified Core Model)
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    location_name TEXT NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    images JSONB DEFAULT '[]'::jsonb,
    owner_id UUID NOT NULL REFERENCES users(id),
    is_verified BOOLEAN DEFAULT FALSE,
    type listing_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. HOSPITALITY MODULE
CREATE TABLE room_units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    type unit_type NOT NULL,
    base_price DECIMAL(12,2) NOT NULL,
    total_units INTEGER NOT NULL DEFAULT 1,
    amenities JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    room_unit_id UUID NOT NULL REFERENCES room_units(id),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    status booking_status DEFAULT 'REQUESTED',
    total_price DECIMAL(12,2) NOT NULL,
    cancellation_rule TEXT, -- As defined in PRD 2.5
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. REAL ESTATE MODULE
CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    price DECIMAL(15,2) NOT NULL,
    agent_id UUID NOT NULL REFERENCES users(id),
    property_features JSONB DEFAULT '{}'::jsonb, -- e.g. { "beds": 3, "baths": 2, "sqft": 1500 }
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id), -- Optional if guest
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT,
    message TEXT,
    status lead_status DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. PAYMENTS MODULE
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    stripe_payment_intent_id TEXT UNIQUE,
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'AOA', -- Kwanza (Angola)
    status TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. NOTIFICATIONS
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT NOT NULL, -- BOOKING_UPDATE, PAYMENT_EVENT, LEAD_INQUIRY
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- TRIGGERS for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
