import { NextResponse } from 'next/server'
import { createUser, getCurrentUser } from '@/lib/auth'
import { publicUser, readDb, writeDb } from '@/lib/db'

async function requireStaff() {
  const user = await getCurrentUser()
  if (!user || (user.role !== 'admin' && user.role !== 'faculty')) return null
  return user
}

export async function GET() {
  const staff = await requireStaff()
  if (!staff) return NextResponse.json({ error: 'Faculty/admin access required.' }, { status: 403 })
  const db = await readDb()
  return NextResponse.json({ users: db.users.map(publicUser) })
}

export async function POST(request: Request) {
  const staff = await requireStaff()
  if (!staff || staff.role !== 'admin') return NextResponse.json({ error: 'Only admins can create staff accounts.' }, { status: 403 })
  try {
    const body = await request.json()
    const role = body.role === 'faculty' || body.role === 'admin' ? body.role : null
    if (!role || !body.fullName || !body.email || !body.password) return NextResponse.json({ error: 'fullName, email, password and valid staff role are required.' }, { status: 400 })
    if (String(body.password).length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    const user = await createUser({ fullName: String(body.fullName), email: String(body.email), password: String(body.password), role, department: body.department ? String(body.department) : undefined })
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_EXISTS') return NextResponse.json({ error: 'Email already exists.' }, { status: 409 })
    console.error(error)
    return NextResponse.json({ error: 'Unable to create staff account.' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const staff = await requireStaff()
  if (!staff || staff.role !== 'admin') return NextResponse.json({ error: 'Only admins can edit users.' }, { status: 403 })
  try {
    const body = await request.json()
    if (!body.userId) return NextResponse.json({ error: 'userId is required.' }, { status: 400 })
    const db = await readDb()
    const user = db.users.find((item) => item.id === String(body.userId))
    if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    if (body.fullName !== undefined) user.fullName = String(body.fullName).trim()
    if (body.department !== undefined) user.department = String(body.department).trim() || undefined
    if (body.course !== undefined) user.course = String(body.course).trim() || undefined
    if (body.year !== undefined) user.year = Number(body.year) || undefined
    if (body.section !== undefined) user.section = String(body.section).trim() || undefined
    if (body.semester !== undefined) user.semester = Number(body.semester) || undefined
    if (body.phone !== undefined) user.phone = String(body.phone).trim() || undefined
    await writeDb(db)
    return NextResponse.json({ user: publicUser(user) })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
