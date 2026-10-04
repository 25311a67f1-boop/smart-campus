import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import type { Database, User } from './types'

const dataDir = path.join(process.cwd(), 'data')
const dbFile = path.join(dataDir, 'db.json')

const emptyDb: Database = {
  users: [], attendance: [], performance: [], assignments: [], events: [],
  registrations: [], activities: [], participation: [], sessions: [],
}

let pgPool: import('pg').Pool | null = null
let schemaReady: Promise<void> | null = null

function hasPostgres() { return Boolean(process.env.DATABASE_URL) }

async function getPool() {
  if (!hasPostgres()) return null
  if (!pgPool) {
    const { Pool } = await import('pg')
    pgPool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false } })
  }
  if (!schemaReady) schemaReady = ensurePostgresSchema(pgPool)
  await schemaReady
  return pgPool
}

async function ensurePostgresSchema(pool: import('pg').Pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY, full_name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('student','faculty','admin')) DEFAULT 'student',
      student_id TEXT UNIQUE, department TEXT, course TEXT, year INTEGER, section TEXT, semester INTEGER, phone TEXT,
      created_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, code TEXT NOT NULL,
      subject TEXT NOT NULL, present INTEGER NOT NULL, total INTEGER NOT NULL, updated_at TIMESTAMPTZ NOT NULL,
      UNIQUE(user_id, code)
    );
    CREATE TABLE IF NOT EXISTS performance (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, month TEXT NOT NULL,
      full_month TEXT NOT NULL, gpa DOUBLE PRECISION NOT NULL, class_avg DOUBLE PRECISION NOT NULL, credits DOUBLE PRECISION NOT NULL,
      top_subject TEXT NOT NULL, top_score TEXT NOT NULL, recorded_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, title TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('completed','pending')), due_date TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY, title TEXT NOT NULL, date TEXT NOT NULL, month_day TEXT NOT NULL, time TEXT NOT NULL,
      location TEXT NOT NULL, category TEXT NOT NULL, badge TEXT NOT NULL, icon TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS registrations (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, event_id TEXT NOT NULL REFERENCES events(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL, UNIQUE(user_id,event_id)
    );
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, title TEXT NOT NULL,
      detail TEXT NOT NULL, time TEXT NOT NULL, category TEXT NOT NULL, status_badge TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS participation (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, activity TEXT NOT NULL,
      points INTEGER NOT NULL, recorded_at TIMESTAMPTZ NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, token_hash TEXT UNIQUE NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_attendance_user ON attendance(user_id);
    CREATE INDEX IF NOT EXISTS idx_performance_user ON performance(user_id);
    CREATE INDEX IF NOT EXISTS idx_assignments_user ON assignments(user_id);
    CREATE INDEX IF NOT EXISTS idx_activities_user ON activities(user_id);
    CREATE INDEX IF NOT EXISTS idx_participation_user ON participation(user_id);
  `)
}

async function ensureJsonDb() {
  await fs.mkdir(dataDir, { recursive: true })
  try { await fs.access(dbFile) } catch { await fs.writeFile(dbFile, JSON.stringify(emptyDb, null, 2), 'utf8') }
}

async function readPostgres(pool: import('pg').Pool): Promise<Database> {
  const [users, attendance, performance, assignments, events, registrations, activities, participation, sessions] = await Promise.all([
    pool.query('SELECT id, full_name, email, password_hash, role, student_id, department, course, year, section, semester, phone, created_at FROM users'),
    pool.query('SELECT id, user_id, code, subject, present, total, updated_at FROM attendance'),
    pool.query('SELECT id, user_id, month, full_month, gpa, class_avg, credits, top_subject, top_score, recorded_at FROM performance'),
    pool.query('SELECT id, user_id, title, status, due_date FROM assignments'),
    pool.query('SELECT id, title, date, month_day, time, location, category, badge, icon FROM events'),
    pool.query('SELECT id, user_id, event_id, created_at FROM registrations'),
    pool.query('SELECT id, user_id, title, detail, time, category, status_badge, created_at FROM activities'),
    pool.query('SELECT id, user_id, activity, points, recorded_at FROM participation'),
    pool.query('SELECT id, user_id, token_hash, expires_at, created_at FROM sessions'),
  ])
  return {
    users: users.rows.map((r) => ({ id:r.id, fullName:r.full_name, email:r.email, passwordHash:r.password_hash, role:r.role, studentId:r.student_id ?? undefined, department:r.department ?? undefined, course:r.course ?? undefined, year:r.year ?? undefined, section:r.section ?? undefined, semester:r.semester ?? undefined, phone:r.phone ?? undefined, createdAt:new Date(r.created_at).toISOString() })),
    attendance: attendance.rows.map((r) => ({ id:r.id,userId:r.user_id,code:r.code,subject:r.subject,present:r.present,total:r.total,updatedAt:new Date(r.updated_at).toISOString() })),
    performance: performance.rows.map((r) => ({ id:r.id,userId:r.user_id,month:r.month,fullMonth:r.full_month,gpa:Number(r.gpa),classAvg:Number(r.class_avg),credits:Number(r.credits),topSubject:r.top_subject,topScore:r.top_score,recordedAt:new Date(r.recorded_at).toISOString() })),
    assignments: assignments.rows.map((r) => ({ id:r.id,userId:r.user_id,title:r.title,status:r.status,dueDate:r.due_date })),
    events: events.rows,
    registrations: registrations.rows.map((r) => ({ id:r.id,userId:r.user_id,eventId:r.event_id,createdAt:new Date(r.created_at).toISOString() })),
    activities: activities.rows.map((r) => ({ id:r.id,userId:r.user_id,title:r.title,detail:r.detail,time:r.time,category:r.category,statusBadge:r.status_badge,createdAt:new Date(r.created_at).toISOString() })),
    participation: participation.rows.map((r) => ({ id:r.id,userId:r.user_id,activity:r.activity,points:r.points,recordedAt:new Date(r.recorded_at).toISOString() })),
    sessions: sessions.rows.map((r) => ({ id:r.id,userId:r.user_id,tokenHash:r.token_hash,expiresAt:new Date(r.expires_at).toISOString(),createdAt:new Date(r.created_at).toISOString() })),
  }
}

async function writePostgres(pool: import('pg').Pool, db: Database) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    await client.query('TRUNCATE sessions, activities, registrations, participation, assignments, performance, attendance, events, users CASCADE')
    for (const u of db.users) await client.query('INSERT INTO users(id,full_name,email,password_hash,role,student_id,department,course,year,section,semester,phone,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [u.id,u.fullName,u.email,u.passwordHash,u.role,u.studentId??null,u.department??null,u.course??null,u.year??null,u.section??null,u.semester??null,u.phone??null,u.createdAt])
    for (const x of db.attendance) await client.query('INSERT INTO attendance(id,user_id,code,subject,present,total,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7)', [x.id,x.userId,x.code,x.subject,x.present,x.total,x.updatedAt])
    for (const x of db.performance) await client.query('INSERT INTO performance(id,user_id,month,full_month,gpa,class_avg,credits,top_subject,top_score,recorded_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [x.id,x.userId,x.month,x.fullMonth,x.gpa,x.classAvg,x.credits,x.topSubject,x.topScore,x.recordedAt])
    for (const x of db.assignments) await client.query('INSERT INTO assignments(id,user_id,title,status,due_date) VALUES($1,$2,$3,$4,$5)', [x.id,x.userId,x.title,x.status,x.dueDate])
    for (const x of db.events) await client.query('INSERT INTO events(id,title,date,month_day,time,location,category,badge,icon) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', [x.id,x.title,x.date,x.monthDay,x.time,x.location,x.category,x.badge,x.icon])
    for (const x of db.registrations) await client.query('INSERT INTO registrations(id,user_id,event_id,created_at) VALUES($1,$2,$3,$4)', [x.id,x.userId,x.eventId,x.createdAt])
    for (const x of db.activities) await client.query('INSERT INTO activities(id,user_id,title,detail,time,category,status_badge,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8)', [x.id,x.userId,x.title,x.detail,x.time,x.category,x.statusBadge,x.createdAt])
    for (const x of db.participation) await client.query('INSERT INTO participation(id,user_id,activity,points,recorded_at) VALUES($1,$2,$3,$4,$5)', [x.id,x.userId,x.activity,x.points,x.recordedAt])
    for (const x of db.sessions) await client.query('INSERT INTO sessions(id,user_id,token_hash,expires_at,created_at) VALUES($1,$2,$3,$4,$5)', [x.id,x.userId,x.tokenHash,x.expiresAt,x.createdAt])
    await client.query('COMMIT')
  } catch (error) { await client.query('ROLLBACK'); throw error } finally { client.release() }
}

export async function readDb(): Promise<Database> {
  const pool = await getPool()
  if (pool) return readPostgres(pool)
  await ensureJsonDb()
  return JSON.parse(await fs.readFile(dbFile, 'utf8')) as Database
}

export async function writeDb(db: Database) {
  const pool = await getPool()
  if (pool) return writePostgres(pool, db)
  await ensureJsonDb()
  const tmp = `${dbFile}.${process.pid}.tmp`
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), 'utf8')
  await fs.rename(tmp, dbFile)
}

export function newId() { return randomUUID() }

export function publicUser(user: User) {
  return { id:user.id, fullName:user.fullName, email:user.email, role:user.role, studentId:user.studentId, department:user.department, course:user.course, year:user.year, section:user.section, semester:user.semester, phone:user.phone, createdAt:user.createdAt }
}
