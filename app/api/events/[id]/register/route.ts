import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { newId, readDb, writeDb } from '@/lib/db'

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const db = await readDb()
  if (!db.events.some((event) => event.id === id)) return NextResponse.json({ error: 'Event not found.' }, { status: 404 })
  if (!db.registrations.some((r) => r.userId === user.id && r.eventId === id)) db.registrations.push({ id: newId(), userId: user.id, eventId: id, createdAt: new Date().toISOString() })
  db.activities.push({ id: newId(), userId: user.id, title: 'Event registered', detail: `You registered for ${db.events.find((e) => e.id === id)?.title}.`, time: 'Just now', category: 'workshop', statusBadge: 'RSVP Confirmed', createdAt: new Date().toISOString() })
  await writeDb(db)
  return NextResponse.json({ ok: true })
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const db = await readDb()
  db.registrations = db.registrations.filter((r) => !(r.userId === user.id && r.eventId === id))
  await writeDb(db)
  return NextResponse.json({ ok: true })
}
