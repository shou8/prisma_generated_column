-- This is an empty migration.
ALTER TABLE locations
ADD COLUMN point geography(Point, 4326) NOT NULL
GENERATED ALWAYS AS (ST_Point(longitude, latitude, 4326)::geography) STORED;