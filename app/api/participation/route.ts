import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { newId, readDb, writeDb } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = await readDb()
  return NextResponse.json({ participation: db.participation.filter((item) => item.userId === user.id) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role === 'student') return NextResponse.json({ error: 'Only faculty/admin can add participation records.' }, { status: 403 })
  try {
    const { userId, activity, points } = await request.json()
    if (!userId || !activity || !Number.isFinite(points)) return NextResponse.json({ error: 'userId, activity and points are required.' }, { status: 400 })
    if (points < 0 || points > 100) return NextResponse.json({ error: 'points must be between 0 and 100.' }, { status: 400 })
    const db = await readDb()
    if (!db.users.some((item) => item.id === userId)) return NextResponse.json({ error: 'Student not found.' }, { status: 404 })
    const record = { id: newId(), userId, activity, points, recordedAt: new Date().toISOString() }
    db.participation.push(record)
    await writeDb(db)
    return NextResponse.json({ participation: record }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
