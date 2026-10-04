import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { newId, readDb, writeDb } from '@/lib/db'

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const db = await readDb()
  const assignment = db.assignments.find((item) => item.id === id && item.userId === user.id)
  if (!assignment) return NextResponse.json({ error: 'Assignment not found.' }, { status: 404 })
  const { status } = await request.json()
  if (status !== 'completed' && status !== 'pending') return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
  assignment.status = status
  db.activities.push({ id: newId(), userId: user.id, title: 'Assignment status updated', detail: `${assignment.title} marked ${status}.`, time: 'Just now', category: 'assignment', statusBadge: status === 'completed' ? 'Completed' : 'Pending', createdAt: new Date().toISOString() })
  await writeDb(db)
  return NextResponse.json({ assignment })
}
