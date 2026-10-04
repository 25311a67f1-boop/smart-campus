import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { newId, readDb, writeDb } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = await readDb()
  return NextResponse.json({ performance: db.performance.filter((item) => item.userId === user.id) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role === 'student') return NextResponse.json({ error: 'Only faculty/admin can add performance records.' }, { status: 403 })
  try {
    const body = await request.json()
    const { userId, month, fullMonth, gpa, classAvg, credits, topSubject, topScore } = body
    if (!userId || !month || !fullMonth || !Number.isFinite(gpa) || !Number.isFinite(classAvg) || !Number.isFinite(credits) || !topSubject || !topScore) {
      return NextResponse.json({ error: 'userId, month, fullMonth, gpa, classAvg, credits, topSubject and topScore are required.' }, { status: 400 })
    }
    if (gpa < 0 || gpa > 10 || classAvg < 0 || classAvg > 10 || credits < 0) return NextResponse.json({ error: 'Performance values are invalid.' }, { status: 400 })
    const db = await readDb()
    if (!db.users.some((item) => item.id === userId)) return NextResponse.json({ error: 'Student not found.' }, { status: 404 })
    const point = { id: newId(), userId, month, fullMonth, gpa, classAvg, credits, topSubject, topScore, recordedAt: new Date().toISOString() }
    db.performance.push(point)
    db.activities.push({ id: newId(), userId, title: 'Academic result updated', detail: `${fullMonth} performance record added with GPA ${gpa.toFixed(2)}.`, time: 'Just now', category: 'assignment', statusBadge: 'Grade recorded', createdAt: new Date().toISOString() })
    await writeDb(db)
    return NextResponse.json({ performance: point }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
