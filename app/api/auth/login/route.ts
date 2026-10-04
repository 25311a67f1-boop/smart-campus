import { NextResponse } from 'next/server'
import { authenticate, createSession } from '@/lib/auth'
import { publicUser } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    const user = await authenticate(email, password)
    if (!user) return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    await createSession(user.id)
    const destination = user.role === 'student' ? '/dashboard' : '/admin'
    return NextResponse.json({ user: publicUser(user), destination })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to log in.' }, { status: 500 })
  }
}
