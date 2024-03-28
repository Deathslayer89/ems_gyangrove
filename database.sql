CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  event_name TEXT NOT NULL,
  city_name TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);