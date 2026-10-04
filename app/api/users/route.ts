import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { publicUser, readDb } from '@/lib/db'

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.role === 'student') return NextResponse.json({ error: 'Only faculty/admin can list users.' }, { status: 403 })
  const db = await readDb()
  return NextResponse.json({ users: db.users.map(publicUser) })
}
