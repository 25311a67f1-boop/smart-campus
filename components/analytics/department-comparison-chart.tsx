'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Building, TrendingUp, Users, CheckCircle2, ChevronRight } from 'lucide-react'

interface DeptMetric {
  name: string
  code: string
  students: number
  meanGpa: number
  attendance: number
  labUtil: number
  badge: string
}

const deptData: DeptMetric[] = [
  { name: 'Computer Science & Engineering', code: 'CSE', students: 1240, meanGpa: 8.42, attendance: 83.6, labUtil: 91, badge: 'Highest GPA' },
  { name: 'Electronics & Communication', code: 'ECE', students: 980, meanGpa: 8.15, attendance: 82.1, labUtil: 84, badge: 'Strong Lab Load' },
  { name: 'Mechanical & Robotics', code: 'MECH', students: 760, meanGpa: 7.94, attendance: 80.4, labUtil: 88, badge: 'High Practical' },
  { name: 'Business & Information Systems', code: 'BIS', students: 640, meanGpa: 8.28, attendance: 84.8, labUtil: 72, badge: 'Highest Attendance' },
]

export function DepartmentComparisonChart() {
  const reduce = useReducedMotion()
  const [activeMetric, setActiveMetric] = useState<'attendance' | 'meanGpa' | 'labUtil'>('attendance')

  return (
    <section className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-2">
              <Building className="h-3.5 w-3.5" /> Cross-Departmental Benchmarking
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Departmental Analytics Matrix
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Comparative analysis across 4 academic schools and 3,620 total enrolled students.
            </p>
          </div>

          {/* Metric Selector Buttons */}
          <div className="flex flex-wrap items-center rounded-xl border border-border bg-muted/60 p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveMetric('attendance')}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                activeMetric === 'attendance'
                  ? 'bg-card font-semibold text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Attendance %
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('meanGpa')}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                activeMetric === 'meanGpa'
                  ? 'bg-card font-semibold text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Mean CGPA
            </button>
            <button
              type="button"
              onClick={() => setActiveMetric('labUtil')}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                activeMetric === 'labUtil'
                  ? 'bg-card font-semibold text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Lab Utilization
            </button>
          </div>
        </div>

        {/* Department Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {deptData.map((d, idx) => {
            const displayVal =
              activeMetric === 'attendance'
                ? `${d.attendance}%`
                : activeMetric === 'meanGpa'
                ? `${d.meanGpa} CGPA`
                : `${d.labUtil}% Load`

            const progressVal =
              activeMetric === 'attendance'
                ? d.attendance
                : activeMetric === 'meanGpa'
                ? (d.meanGpa / 10) * 100
                : d.labUtil

            return (
              <motion.div
                key={d.code}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-background/50 p-5 transition-all duration-200 hover:border-foreground/20 hover:bg-card hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-muted-foreground">
                      {d.code}
                    </span>
                    <span className="rounded-md bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                      {d.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-sm font-bold text-foreground leading-snug">
                    {d.name}
                  </h3>

                  <div className="mt-4">
                    <span className="text-[11px] text-muted-foreground uppercase font-semibold">
                      {activeMetric === 'attendance'
                        ? 'Attendance Rate'
                        : activeMetric === 'meanGpa'
                        ? 'Mean GPA'
                        : 'Lab Concurrency'}
                    </span>
                    <div className="mt-1 font-display text-2xl font-bold text-foreground">
                      {displayVal}
                    </div>
                  </div>

                  {/* Progress visual */}
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressVal}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-1.5 border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Enrolled:</span>
                    <span className="font-semibold text-foreground font-mono">{d.students}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CGPA vs Target:</span>
                    <span className="font-semibold text-success">+0.42</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
