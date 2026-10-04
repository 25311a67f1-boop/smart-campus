import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { publicUser, readDb, writeDb } from '@/lib/db'

const allowedDepartments = new Set(['Data Science','Computer Science','Information Technology','Electronics & Communication','Electrical & Electronics','Mechanical','Civil','Other'])

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ profile: user })
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await request.json()
    const studentId = String(body.studentId ?? '').trim()
    const department = String(body.department ?? '').trim()
    const course = String(body.course ?? '').trim()
    const year = Number(body.year)
    const section = String(body.section ?? '').trim()
    const semester = Number(body.semester)
    const phone = body.phone ? String(body.phone).trim() : undefined
    if (!studentId || !department || !course || !section || !Number.isInteger(year) || year < 1 || year > 6 || !Number.isInteger(semester) || semester < 1 || semester > 12) return NextResponse.json({ error: 'Student ID, department, course, year, section and semester are required.' }, { status: 400 })
    if (!allowedDepartments.has(department)) return NextResponse.json({ error: 'Invalid department.' }, { status: 400 })
    const db = await readDb()
    const duplicate = db.users.find((item) => item.studentId?.toLowerCase() === studentId.toLowerCase() && item.id !== user.id)
    if (duplicate) return NextResponse.json({ error: 'That Student ID is already in use.' }, { status: 409 })
    const record = db.users.find((item) => item.id === user.id)
    if (!record) return NextResponse.json({ error: 'User not found.' }, { status: 404 })
    Object.assign(record, { studentId, department, course, year, section, semester, phone })
    await writeDb(db)
    return NextResponse.json({ profile: publicUser(record) })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
