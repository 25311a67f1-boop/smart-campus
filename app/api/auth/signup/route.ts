import { NextResponse } from 'next/server'
import { createSession } from '@/lib/auth'
import { createUser } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, password, studentId, department, course, year, section, semester, phone } = body
    if (!fullName || !email || !password || !studentId || !department || !course || !year || !section || !semester) return NextResponse.json({ error: 'Complete student profile details are required.' }, { status: 400 })
    if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    const user = await createUser({ fullName, email, password, role: 'student', studentId: String(studentId).trim(), department: String(department).trim(), course: String(course).trim(), year: Number(year), section: String(section).trim(), semester: Number(semester), phone: phone ? String(phone).trim() : undefined })
    await createSession(user.id)
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_EXISTS') return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })
    if (error instanceof Error && error.message === 'STUDENT_ID_EXISTS') return NextResponse.json({ error: 'That Student ID / roll number is already registered.' }, { status: 409 })
    console.error(error)
    return NextResponse.json({ error: 'Unable to create account.' }, { status: 500 })
  }
}
