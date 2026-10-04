import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getDashboard } from '@/lib/dashboard'
import { DashboardNavbar } from '@/components/dashboard/dashboard-navbar'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { MetricCards } from '@/components/dashboard/metric-cards'
import { PerformanceChart } from '@/components/dashboard/performance-chart'
import { AttendanceSection } from '@/components/dashboard/attendance-section'
import { AiInsightCard } from '@/components/dashboard/ai-insight-card'
import { UpcomingEvents } from '@/components/dashboard/upcoming-events'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { AssignmentsSection } from '@/components/dashboard/assignments-section'

export const metadata: Metadata = {
  title: 'Student Dashboard | Smart Campus Intelligence',
  description: 'Real-time academic performance, verified attendance analytics, AI study recommendations, and campus schedule.',
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.role === 'admin' || user.role === 'faculty') redirect('/admin')
  const currentUser = user
  const dashboard = await getDashboard(currentUser.id)

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
      {/* Top sticky navigation bar */}
      <DashboardNavbar user={currentUser} activities={dashboard.activities} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Personalized Student Greeting & Live Operational Status */}
        <DashboardHeader user={currentUser} />

        {/* 4 Animated Core Metric Cards */}
        <MetricCards metrics={dashboard.metrics} />

        {/* Prominent AI Insight Card */}
        <AiInsightCard metrics={dashboard.metrics} />

        {/* Quick Intelligence Actions */}
        <QuickActions />

        {/* Faculty-created assignments are now actionable from the student portal */}
        <AssignmentsSection initialAssignments={dashboard.assignments} />

        {/* 6-Month Academic Performance Chart with Interactive Tooltips */}
        <PerformanceChart dataPoints={dashboard.performance} />

        {/* Attendance Breakdown (Present / Absent / Leave / Subjects) */}
        <AttendanceSection subjects={dashboard.attendance} />

        {/* Upcoming Events Grid */}
        <UpcomingEvents events={dashboard.events} />

        {/* Recent Activity Stream */}
        <RecentActivity activities={dashboard.activities} />
      </main>

      {/* Subtle Dashboard Footer */}
      <footer className="mt-12 border-t border-border bg-card/50 py-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Smart Campus Intelligence System • Student Portal v2.4</span>
          <span>Connected to Campus Academic & Telemetry Node</span>
        </div>
      </footer>
    </div>
  )
}
