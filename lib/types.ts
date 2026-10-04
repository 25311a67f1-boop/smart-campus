export type Role = 'student' | 'faculty' | 'admin'

export interface User {
  id: string
  fullName: string
  email: string
  passwordHash: string
  role: Role
  studentId?: string
  department?: string
  course?: string
  year?: number
  section?: string
  semester?: number
  phone?: string
  createdAt: string
}

export interface AttendanceRecord {
  id: string
  userId: string
  code: string
  subject: string
  present: number
  total: number
  updatedAt: string
}

export interface PerformancePoint {
  id: string
  userId: string
  month: string
  fullMonth: string
  gpa: number
  classAvg: number
  credits: number
  topSubject: string
  topScore: string
  recordedAt: string
}

export interface Assignment {
  id: string
  userId: string
  title: string
  status: 'completed' | 'pending'
  dueDate: string
}

export interface EventItem {
  id: string
  title: string
  date: string
  monthDay: string
  time: string
  location: string
  category: string
  badge: string
  icon: 'workshop' | 'hackathon' | 'meetup'
}

export interface Registration {
  id: string
  userId: string
  eventId: string
  createdAt: string
}

export interface ParticipationRecord {
  id: string
  userId: string
  activity: string
  points: number
  recordedAt: string
}

export interface Activity {
  id: string
  userId: string
  title: string
  detail: string
  time: string
  category: 'assignment' | 'attendance' | 'workshop' | 'announcement'
  statusBadge: string
  createdAt: string
}

export interface Database {
  users: User[]
  attendance: AttendanceRecord[]
  performance: PerformancePoint[]
  assignments: Assignment[]
  events: EventItem[]
  registrations: Registration[]
  activities: Activity[]
  participation: ParticipationRecord[]
  sessions: Array<{ id: string; userId: string; tokenHash: string; expiresAt: string; createdAt: string }>
}
