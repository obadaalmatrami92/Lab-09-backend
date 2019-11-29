DROP TABLE IF EXISTS weathers;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS locations;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT
);

CREATE TABLE weathers (
  id SERIAL PRIMARY KEY,
  forecast VARCHAR(225),
  time VARCHAR(225),
  created_at BIGINT,
  location_id INTEGER NOT NULL,
  FOREIGN KEY (location_id) REFERENCES locations (id)
);


CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  link TEXT,
  name TEXT,
  event_date TEXT,
  summary TEXT,
  created_at BIGINT,
  location_id INTEGER NOT NULL,
  FOREIGN KEY (location_id) REFERENCES locations (id)
);




