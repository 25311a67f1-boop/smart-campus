import { readDb } from './db'

export async function getDashboard(userId: string) {
  const db = await readDb()
  const attendance = db.attendance.filter((x) => x.userId === userId)
  const totalPresent = attendance.reduce((sum, x) => sum + x.present, 0)
  const totalClasses = attendance.reduce((sum, x) => sum + x.total, 0)
  const assignments = db.assignments.filter((x) => x.userId === userId)
  const participation = db.participation.filter((x) => x.userId === userId)
  const completed = assignments.filter((x) => x.status === 'completed').length
  const performance = db.performance
    .filter((x) => x.userId === userId)
    .sort((a, b) => a.recordedAt.localeCompare(b.recordedAt))
  const registrations = db.registrations.filter((x) => x.userId === userId)
  const registered = new Set(registrations.map((x) => x.eventId))
  const events = db.events.map((event) => ({ ...event, registered: registered.has(event.id) }))
  const activities = db.activities
    .filter((x) => x.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 10)
  const latest = performance.at(-1)

  return {
    metrics: {
      attendance: totalClasses ? Number(((totalPresent / totalClasses) * 100).toFixed(1)) : 0,
      academicPerformance: latest?.gpa ?? 0,
      assignmentsCompleted: completed,
      assignmentsTotal: assignments.length,
      campusParticipation: participation.length ? Math.round(participation.reduce((sum, item) => sum + item.points, 0) / participation.length) : 0,
    },
    performance,
    attendance,
    assignments,
    events,
    activities,
    participation,
  }
}
