-- Drop tables if they already exist to avoid conflicts
DROP TABLE IF EXISTS clubs;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Create clubs table
CREATE TABLE clubs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  club_name TEXT NOT NULL,
  mean_distance NUMERIC NOT NULL,
  std_dev_distance NUMERIC NOT NULL,
  UNIQUE(user_id, club_name) -- Ensures each user has unique clubs
);

-- Insert sample data
INSERT INTO users (username, password) VALUES
('ryan', 'hashedpassword1'),
('john', 'hashedpassword2');

INSERT INTO clubs (user_id, club_name, mean_distance, std_dev_distance) VALUES
((SELECT id FROM users WHERE username = 'ryan'), '9 Iron', 145, 10),
((SELECT id FROM users WHERE username = 'john'), '8 Iron', 160, 12);
