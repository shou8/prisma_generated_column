-- This is an empty migration.
ALTER TABLE logs
ADD COLUMN user_id TEXT
GENERATED ALWAYS AS (message->>'user_id') STORED;