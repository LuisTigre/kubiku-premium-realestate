ALTER TABLE users ADD COLUMN keycloak_id VARCHAR(255) UNIQUE;
-- For existing users (if any), we'd need a default, but since it's fresh, we just make it NOT NULL after adding it if possible.
-- But since it's empty, I'll just add it with NOT NULL if I want.
ALTER TABLE users ALTER COLUMN keycloak_id SET NOT NULL;
