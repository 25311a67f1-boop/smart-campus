import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { newId, readDb, writeDb } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = await readDb()
  return NextResponse.json({ attendance: db.attendance.filter((item) => item.userId === user.id) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role === 'student') return NextResponse.json({ error: 'Only faculty/admin can add attendance.' }, { status: 403 })
  try {
    const body = await request.json()
    const { userId, code, subject, present, total } = body
    if (!userId || !code || !subject || !Number.isInteger(present) || !Number.isInteger(total)) {
      return NextResponse.json({ error: 'userId, code, subject, integer present and integer total are required.' }, { status: 400 })
    }
    if (present < 0 || total <= 0 || present > total) return NextResponse.json({ error: 'Attendance values are invalid.' }, { status: 400 })
    const db = await readDb()
    if (!db.users.some((item) => item.id === userId)) return NextResponse.json({ error: 'Student not found.' }, { status: 404 })
    const existing = db.attendance.find((item) => item.userId === userId && item.code === code)
    const record = existing ?? { id: newId(), userId, code, subject, present: 0, total: 0, updatedAt: '' }
    record.subject = subject
    record.present = present
    record.total = total
    record.updatedAt = new Date().toISOString()
    if (!existing) db.attendance.push(record)
    db.activities.push({ id: newId(), userId, title: 'Attendance updated', detail: `${subject}: ${present} of ${total} sessions recorded.`, time: 'Just now', category: 'attendance', statusBadge: `${Math.round((present / total) * 100)}% attendance`, createdAt: new Date().toISOString() })
    await writeDb(db)
    return NextResponse.json({ attendance: record }, { status: existing ? 200 : 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
