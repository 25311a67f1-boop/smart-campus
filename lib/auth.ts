import { cookies } from 'next/headers'
import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import { newId, readDb, writeDb, publicUser } from './db'
import type { Role, User } from './types'

const scrypt = promisify(scryptCallback)
const SESSION_COOKIE = 'smartcampus_session'
const SESSION_DAYS = 7

async function hashPassword(password: string, salt = randomBytes(16).toString('hex')) {
  const derived = await scrypt(password, salt, 64) as Buffer
  return `${salt}:${derived.toString('hex')}`
}

async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const derived = await scrypt(password, salt, 64) as Buffer
  const expected = Buffer.from(hash, 'hex')
  return expected.length === derived.length && timingSafeEqual(expected, derived)
}

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function createUser(input: { fullName: string; email: string; password: string; role: Role; studentId?: string; department?: string; course?: string; year?: number; section?: string; semester?: number; phone?: string }) {
  const db = await readDb()
  const email = input.email.trim().toLowerCase()
  if (db.users.some((u) => u.email === email)) throw new Error('EMAIL_EXISTS')
  if (input.studentId && db.users.some((u) => u.studentId?.toLowerCase() === input.studentId!.trim().toLowerCase())) throw new Error('STUDENT_ID_EXISTS')
  const user: User = {
    id: newId(), fullName: input.fullName.trim(), email,
    passwordHash: await hashPassword(input.password), role: input.role,
    studentId: input.studentId?.trim(), department: input.department?.trim(), course: input.course?.trim(),
    year: input.year, section: input.section?.trim(), semester: input.semester, phone: input.phone?.trim(),
    createdAt: new Date().toISOString(),
  }
  db.users.push(user)
  const now = new Date().toISOString()
  db.activities.push({
    id: newId(),
    userId: user.id,
    title: 'Account created',
    detail: 'Your Smart Campus profile was created successfully.',
    time: 'Just now',
    category: 'announcement',
    statusBadge: 'Welcome',
    createdAt: now,
  })
  await writeDb(db)
  return publicUser(user)
}

export async function authenticate(email: string, password: string) {
  const db = await readDb()
  const user = db.users.find((u) => u.email === email.trim().toLowerCase())
  if (!user || !(await verifyPassword(password, user.passwordHash))) return null
  return user
}

export async function createSession(userId: string) {
  const db = await readDb()
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 86400000).toISOString()
  db.sessions = db.sessions.filter((s) => new Date(s.expiresAt) > new Date())
  db.sessions.push({ id: newId(), userId, tokenHash: hashToken(token), expiresAt, createdAt: new Date().toISOString() })
  await writeDb(db)
  const store = await cookies()
  store.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', expires: new Date(expiresAt) })
}

export async function destroySession() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (token) {
    const db = await readDb()
    const tokenHash = hashToken(token)
    db.sessions = db.sessions.filter((s) => s.tokenHash !== tokenHash)
    await writeDb(db)
  }
  store.delete(SESSION_COOKIE)
}

export async function getCurrentUser() {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null
  const db = await readDb()
  const session = db.sessions.find((s) => s.tokenHash === hashToken(token) && new Date(s.expiresAt) > new Date())
  if (!session) return null
  const user = db.users.find((u) => u.id === session.userId)
  return user ? publicUser(user) : null
}
