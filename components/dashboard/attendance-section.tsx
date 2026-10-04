'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { CalendarCheck, AlertCircle, CheckCircle2, Clock, Check, ShieldAlert, Sparkles } from 'lucide-react'

interface SubjectAttendance {
  code: string
  name: string
  present: number
  total: number
  pct: number
  status: 'Safe' | 'Attention' | 'Good'
}


export function AttendanceSection({ subjects }: { subjects: Array<{ code: string; subject: string; present: number; total: number }> }) {
  const reduce = useReducedMotion()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  // Overall calculations
  const totalSessions = subjects.reduce((sum, s) => sum + s.total, 0)
  const presentSessions = subjects.reduce((sum, s) => sum + s.present, 0)
  const absentSessions = totalSessions - presentSessions
  const leaveSessions = 0
  const overallPct = totalSessions ? Math.round((presentSessions / totalSessions) * 100) : 0
  const presentPct = totalSessions ? Math.round((presentSessions / totalSessions) * 100) : 0
  const absentPct = totalSessions ? Math.round((absentSessions / totalSessions) * 100) : 0
  const leavePct = totalSessions ? Math.round((leaveSessions / totalSessions) * 100) : 0

  return (
    <section id="attendance" className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
              <CalendarCheck className="h-3.5 w-3.5" /> Biometric & RFID Telemetry
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Attendance Analytics
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Verified attendance recorded by the campus system.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> {overallPct >= 75 ? 'Minimum 75% Criteria Met' : 'Below 75% Criteria'}
            </span>
          </div>
        </div>

        {/* Top Summary Breakdown Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* Overall */}
          <div className="rounded-2xl border border-primary/20 bg-primary/[0.04] p-4 text-center sm:text-left">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Overall Percentage
            </span>
            <div className="mt-2 flex items-baseline justify-center sm:justify-start gap-1">
              <span className="font-display text-3xl font-bold text-foreground">{overallPct}%</span>
              <span className="text-xs font-medium text-muted-foreground">Live</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{presentSessions} of {totalSessions} attended</p>
          </div>

          {/* Present */}
          <div className="rounded-2xl border border-success/20 bg-success/[0.04] p-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Present
              </span>
              <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-success" />
            </div>
            <div className="mt-2 flex items-baseline justify-center sm:justify-start gap-1">
              <span className="font-display text-3xl font-bold text-success">{presentSessions}</span>
              <span className="text-xs text-muted-foreground font-medium">sessions</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{presentPct}% of total</p>
          </div>

          {/* Absent */}
          <div className="rounded-2xl border border-destructive/20 bg-destructive/[0.04] p-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Absent
              </span>
              <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-destructive" />
            </div>
            <div className="mt-2 flex items-baseline justify-center sm:justify-start gap-1">
              <span className="font-display text-3xl font-bold text-destructive">{absentSessions}</span>
              <span className="text-xs text-muted-foreground font-medium">sessions</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">{absentPct}% of total</p>
          </div>

          {/* Leave */}
          <div className="rounded-2xl border border-secondary/20 bg-secondary/[0.04] p-4 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Approved Leave
              </span>
              <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-secondary" />
            </div>
            <div className="mt-2 flex items-baseline justify-center sm:justify-start gap-1">
              <span className="font-display text-3xl font-bold text-secondary">{leaveSessions}</span>
              <span className="text-xs text-muted-foreground font-medium">sessions</span>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">No leave records yet</p>
          </div>
        </div>

        {/* Multi-segment visual bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-2">
            <span>Session Distribution</span>
            <span>Total: {totalSessions} Lectures & Labs</span>
          </div>
          <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-muted p-0.5">
            <motion.div
              initial={reduce ? { width: `${presentPct}%` } : { width: '0%' }}
              whileInView={{ width: `${presentPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-l-full bg-success"
              title={`Present: ${presentPct}%`}
            />
            <motion.div
              initial={reduce ? { width: `${absentPct}%` } : { width: '0%' }}
              whileInView={{ width: `${absentPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-destructive"
              title={`Absent: ${absentPct}%`}
            />
            <motion.div
              initial={reduce ? { width: `${leavePct}%` } : { width: '0%' }}
              whileInView={{ width: `${leavePct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-r-full bg-secondary"
              title={`Leave: ${leavePct}%`}
            />
          </div>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-success" /> Present ({presentPct}%)
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-destructive" /> Absent ({absentPct}%)
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-secondary" /> Leave ({leavePct}%)
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground italic">
              Calculated from recorded attendance
            </span>
          </div>
        </div>

        {/* Subject-Wise Attendance Breakdown Table */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-base font-semibold text-foreground">
              Subject Breakdown
            </h3>
            <span className="text-xs text-muted-foreground">75% threshold required per course</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 font-semibold">Course</th>
                  <th className="pb-3 font-semibold">Attended</th>
                  <th className="pb-3 font-semibold">Percentage</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Buffer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {subjects.map((s) => { const pct = s.total ? Math.round((s.present / s.total) * 100) : 0; const status = pct >= 85 ? 'Good' : pct >= 75 ? 'Safe' : 'Attention'; return (
                  <tr
                    key={s.code}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <td className="py-3.5 pr-3">
                      <span className="font-semibold text-foreground block">{s.subject}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{s.code}</span>
                    </td>
                    <td className="py-3.5 pr-3 font-medium text-foreground whitespace-nowrap">
                      {s.present} / {s.total}
                    </td>
                    <td className="py-3.5 pr-3 w-44">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className={`h-full rounded-full ${
                              pct >= 85
                                ? 'bg-success'
                                : pct >= 75
                                ? 'bg-primary'
                                : 'bg-destructive'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-bold text-foreground font-mono w-9">{pct}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-3">
                      {status === 'Good' && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-semibold text-success">
                          <CheckCircle2 className="h-3 w-3" /> Optimal
                        </span>
                      )}
                      {status === 'Safe' && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                          <Check className="h-3 w-3" /> Safe
                        </span>
                      )}
                      {status === 'Attention' && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                          <AlertCircle className="h-3 w-3" /> Low Buffer
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-right font-medium text-muted-foreground">
                      {pct >= 85 ? '+3 classes buffer' : pct >= 75 ? '+1 class buffer' : 'Must attend next'}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
