DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='keycloak_id') 
    AND NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='auth_id') THEN
        ALTER TABLE users ADD COLUMN keycloak_id VARCHAR(255) UNIQUE;
        ALTER TABLE users ALTER COLUMN keycloak_id SET NOT NULL;
    END IF;
END $$;
