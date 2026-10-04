'use client'

import { motion, useReducedMotion } from 'motion/react'
import {
  GraduationCap,
  CalendarCheck,
  Award,
  Layers,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Users,
} from 'lucide-react'
import { AnalyticsFilterState } from './analytics-header'

interface AnalyticsMetricCardsProps {
  filters: AnalyticsFilterState
}

export function AnalyticsMetricCards({ filters }: AnalyticsMetricCardsProps) {
  const reduce = useReducedMotion()

  // Dynamic sample data adjusted slightly based on department / year
  const isCS = filters.department.includes('Computer')
  const isEE = filters.department.includes('Electronics')

  const metrics = [
    {
      id: 'm-gpa',
      title: 'Cohort Mean CGPA',
      value: isCS ? '8.42' : isEE ? '8.15' : '8.28',
      change: '+0.34 vs Term 4',
      isUp: true,
      subtext: 'Dean’s list threshold: 8.50',
      icon: GraduationCap,
      badge: 'Top Decile',
      accentColor: 'border-primary/20 bg-primary/[0.03] text-primary',
    },
    {
      id: 'm-att',
      title: 'Biometric Attendance Rate',
      value: isCS ? '83.6%' : '81.2%',
      change: '+3.1% attendance lift',
      isUp: true,
      subtext: 'Campus compliance: 75% required',
      icon: CalendarCheck,
      badge: 'Compliant',
      accentColor: 'border-success/20 bg-success/[0.03] text-success',
    },
    {
      id: 'm-pass',
      title: 'Course Completion Index',
      value: '94.8%',
      change: '+1.8% vs last year',
      isUp: true,
      subtext: '42 course sections evaluated',
      icon: Award,
      badge: 'High Yield',
      accentColor: 'border-secondary/20 bg-secondary/[0.03] text-secondary',
    },
    {
      id: 'm-students',
      title: 'Active Cohort Headcount',
      value: isCS ? '1,240' : filters.department === 'All Departments' ? '4,850' : '960',
      change: '100% telemetry synced',
      isUp: true,
      subtext: 'Cross-verified RFID entries',
      icon: Users,
      badge: 'Verified',
      accentColor: 'border-foreground/20 bg-muted/40 text-foreground',
    },
  ]

  return (
    <div className="pt-6 pb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon
          return (
            <motion.div
              key={m.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={reduce ? undefined : { y: -2 }}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${m.accentColor}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                    {m.badge}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    {m.title}
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      {m.value}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {m.subtext}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-success font-medium">
                  <TrendingUp className="h-3 w-3" /> {m.change}
                </span>
                <span className="text-muted-foreground">Filtered slice</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
