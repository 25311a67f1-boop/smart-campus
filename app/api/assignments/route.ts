import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { readDb, writeDb, newId } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = await readDb()
  return NextResponse.json({ assignments: db.assignments.filter((item) => item.userId === user.id) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role === 'student') return NextResponse.json({ error: 'Only faculty/admin can create assignments.' }, { status: 403 })
  try {
    const { title, dueDate, userId } = await request.json()
    if (!title || !dueDate || !userId) return NextResponse.json({ error: 'title, dueDate and userId are required.' }, { status: 400 })
    const db = await readDb()
    if (!db.users.some((item) => item.id === userId)) return NextResponse.json({ error: 'Student not found.' }, { status: 404 })
    const assignment = { id: newId(), userId, title, dueDate, status: 'pending' as const }
    db.assignments.push(assignment)
    db.activities.push({ id: newId(), userId, title: 'Assignment created', detail: title, time: 'Just now', category: 'assignment', statusBadge: 'New assignment', createdAt: new Date().toISOString() })
    await writeDb(db)
    return NextResponse.json({ assignment }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
