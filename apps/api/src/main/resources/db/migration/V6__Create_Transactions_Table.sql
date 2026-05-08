CREATE TABLE transactions (
    id UUID PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id),
    amount DECIMAL(19, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'AOA',
    status VARCHAR(50) NOT NULL,
    provider VARCHAR(100),
    provider_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(booking_id)
);

CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_booking ON transactions(booking_id);
