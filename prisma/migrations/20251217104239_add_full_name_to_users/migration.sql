-- This is an empty migration.
ALTER TABLE users
ADD COLUMN full_name text
GENERATED ALWAYS AS (family_name || given_name) STORED;