import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { newId, readDb, writeDb } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const db = await readDb()
  const registered = new Set(db.registrations.filter((r) => r.userId === user.id).map((r) => r.eventId))
  return NextResponse.json({ events: db.events.map((event) => ({ ...event, registered: registered.has(event.id) })) })
}

export async function POST(request: Request) {
  const user = await getCurrentUser()
  if (!user || user.role === 'student') return NextResponse.json({ error: 'Only faculty/admin can create events.' }, { status: 403 })
  try {
    const body = await request.json()
    const required = ['title', 'date', 'monthDay', 'time', 'location', 'category', 'badge']
    if (required.some((key) => !body[key])) return NextResponse.json({ error: 'title, date, monthDay, time, location, category and badge are required.' }, { status: 400 })
    const icon = ['workshop', 'hackathon', 'meetup'].includes(body.icon) ? body.icon : 'workshop'
    const event = { id: newId(), title: body.title, date: body.date, monthDay: body.monthDay, time: body.time, location: body.location, category: body.category, badge: body.badge, icon }
    const db = await readDb()
    db.events.push(event)
    await writeDb(db)
    return NextResponse.json({ event }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }
}
