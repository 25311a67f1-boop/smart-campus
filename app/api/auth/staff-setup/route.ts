import { NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'
import { readDb } from '@/lib/db'

export async function GET() {
  const db = await readDb()

  const staffExists = db.users.some(
    (u) => u.role === 'admin' || u.role === 'faculty'
  )

  return NextResponse.json({
    available: !staffExists,
  })
}

export async function POST(request: Request) {
  try {
    const db = await readDb()

    // Allow staff setup only when there are no staff accounts.
    if (db.users.some((u) => u.role === 'admin' || u.role === 'faculty')) {
      return NextResponse.json(
        {
          error:
            'Staff accounts already exist. Use an admin account to create additional staff.',
        },
        { status: 409 }
      )
    }

    const body = await request.json()

    const admin = body.admin
    const faculty = body.faculty

    // Admin details are required.
    if (!admin?.fullName || !admin?.email || !admin?.password) {
      return NextResponse.json(
        {
          error: 'Admin name, email and password are required.',
        },
        { status: 400 }
      )
    }

    // Password must be at least 8 characters.
    if (
      String(admin.password).length < 8 ||
      (faculty?.password && String(faculty.password).length < 8)
    ) {
      return NextResponse.json(
        {
          error: 'Staff passwords must be at least 8 characters.',
        },
        { status: 400 }
      )
    }

    const created = []

    // Create Admin account.
    const adminUser = await createUser({
      fullName: String(admin.fullName),
      email: String(admin.email),
      password: String(admin.password),
      role: 'admin',
      department: admin.department
        ? String(admin.department)
        : undefined,
    })

    created.push({
      fullName: adminUser.fullName,
      email: adminUser.email,
      role: adminUser.role,
    })

    // Create Faculty account if details were provided.
    if (faculty?.fullName && faculty?.email && faculty?.password) {
      const facultyUser = await createUser({
        fullName: String(faculty.fullName),
        email: String(faculty.email),
        password: String(faculty.password),
        role: 'faculty',
        department: faculty.department
          ? String(faculty.department)
          : undefined,
      })

      created.push({
        fullName: facultyUser.fullName,
        email: facultyUser.email,
        role: facultyUser.role,
      })
    }

    return NextResponse.json(
      { created },
      { status: 201 }
    )
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'EMAIL_EXISTS'
    ) {
      return NextResponse.json(
        {
          error: 'One of these emails already exists.',
        },
        { status: 409 }
      )
    }

    console.error(error)

    return NextResponse.json(
      {
        error: 'Unable to create staff accounts.',
      },
      { status: 500 }
    )
  }
}