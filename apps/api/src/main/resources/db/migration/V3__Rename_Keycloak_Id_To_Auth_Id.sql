DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='keycloak_id') THEN
        ALTER TABLE users RENAME COLUMN keycloak_id TO auth_id;
    END IF;
END $$;
