'use client'

import { motion, useReducedMotion } from 'motion/react'
import { CalendarCheck, GraduationCap, CheckSquare, Users, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react'
import { CountUp } from '@/components/count-up'
import { StaggerGroup, StaggerItem } from '@/components/reveal'

export function MetricCards({ metrics }: { metrics: { attendance: number; academicPerformance: number; assignmentsCompleted: number; assignmentsTotal: number; campusParticipation: number } }) {
  const reduce = useReducedMotion()

  return (
    <section id="overview" className="pb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          Core Metrics
        </h2>
        <span className="text-xs font-medium text-muted-foreground">
          Updated 10 mins ago
        </span>
      </div>

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Attendance */}
        <StaggerItem>
          <motion.div
            whileHover={reduce ? undefined : { y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs transition-shadow duration-200 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Attendance
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <CalendarCheck className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                  <CountUp to={metrics.attendance} suffix="%" duration={1.5} />
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                  <TrendingUp className="h-3 w-3" />
                  Live data
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {metrics.attendance >= 75 ? 'Above the 75% minimum threshold' : 'Below the 75% minimum threshold'}
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground mb-1.5">
                <span>Monthly Target</span>
                <span className="text-foreground font-semibold">{metrics.attendance} / 100%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={reduce ? { width: `${metrics.attendance}%` } : { width: '0%' }}
                  whileInView={{ width: `${metrics.attendance}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </motion.div>
        </StaggerItem>

        {/* Card 2: Academic Performance */}
        <StaggerItem>
          <motion.div
            whileHover={reduce ? undefined : { y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs transition-shadow duration-200 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Academic Performance
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
                  <GraduationCap className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {metrics.academicPerformance.toFixed(1)} <span className="text-sm font-medium text-muted-foreground">CGPA</span>
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  Live data
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                Latest recorded academic result
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground mb-1.5">
                <span>Scale (out of 10.0)</span>
                <span className="text-foreground font-semibold">{Math.min(100, Math.max(0, Math.round(metrics.academicPerformance * 10)))}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={reduce ? { width: `${Math.min(100, Math.max(0, metrics.academicPerformance * 10))}%` } : { width: '0%' }}
                  whileInView={{ width: `${Math.min(100, Math.max(0, metrics.academicPerformance * 10))}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-secondary"
                />
              </div>
            </div>
          </motion.div>
        </StaggerItem>

        {/* Card 3: Assignments */}
        <StaggerItem>
          <motion.div
            whileHover={reduce ? undefined : { y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs transition-shadow duration-200 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Assignments
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-success/10 text-success transition-colors group-hover:bg-success group-hover:text-success-foreground">
                  <CheckSquare className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                  {metrics.assignmentsCompleted} / {metrics.assignmentsTotal}
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-foreground">
                  {metrics.assignmentsTotal ? Math.round((metrics.assignmentsCompleted / metrics.assignmentsTotal) * 100) : 0}%
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {metrics.assignmentsTotal - metrics.assignmentsCompleted} assignments remaining this semester
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground mb-1.5">
                <span>Completed Tasks</span>
                <span className="text-foreground font-semibold">{metrics.assignmentsCompleted} of {metrics.assignmentsTotal}</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={reduce ? { width: `${metrics.assignmentsTotal ? (metrics.assignmentsCompleted / metrics.assignmentsTotal) * 100 : 0}%` } : { width: '0%' }}
                  whileInView={{ width: `${metrics.assignmentsTotal ? (metrics.assignmentsCompleted / metrics.assignmentsTotal) * 100 : 0}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-success"
                />
              </div>
            </div>
          </motion.div>
        </StaggerItem>

        {/* Card 4: Campus Participation */}
        <StaggerItem>
          <motion.div
            whileHover={reduce ? undefined : { y: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-xs transition-shadow duration-200 hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Campus Participation
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Users className="h-4 w-4" />
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                  <CountUp to={metrics.campusParticipation} suffix="%" duration={1.5} />
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-md bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
                  <TrendingUp className="h-3 w-3" />
                  Live data
                </span>
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                No participation records yet
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground mb-1.5">
                <span>Engagement Index</span>
                <span className="text-foreground font-semibold">{metrics.campusParticipation}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={reduce ? { width: `${metrics.campusParticipation}%` } : { width: '0%' }}
                  whileInView={{ width: `${metrics.campusParticipation}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </div>
          </motion.div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  )
}
