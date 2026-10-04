-- Smart Campus PostgreSQL schema.
-- The app also creates this schema automatically when DATABASE_URL is present.
-- Keep this file for inspection/manual migration in a hosted Postgres provider.

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student','faculty','admin')) DEFAULT 'student',
  student_id TEXT UNIQUE,
  department TEXT,
  course TEXT,
  year INTEGER,
  section TEXT,
  semester INTEGER,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_student_id ON users(student_id);
CREATE INDEX IF NOT EXISTS idx_users_department ON users(department);
