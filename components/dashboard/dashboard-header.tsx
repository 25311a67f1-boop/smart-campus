'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Sparkles, Calendar, Zap, ShieldCheck } from 'lucide-react'

export function DashboardHeader({ user }: { user: { fullName: string; role: string; email: string; studentId?: string; department?: string; course?: string; year?: number; section?: string; semester?: number } }) {
  const reduce = useReducedMotion()

  return (
    <section className="pt-8 pb-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          {/* Status badge */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-xs"
          >
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-success"
                  animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            <span className="text-foreground/90 font-medium">Campus systems operational</span>
            <span className="text-muted-foreground">• Real-time Sync</span>
          </motion.div>

          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Good morning, {user.fullName.split(" ")[0]} 👋
          </motion.h1>

          <motion.p
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-1 text-base text-muted-foreground"
          >
            Here&apos;s your campus and academic overview.
          </motion.p>
        </div>

        {/* Quick Semester Info Card */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-xs"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <div className="pr-2">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-semibold text-foreground">Current academic term</span>
              <span className="rounded-md bg-secondary/10 px-1.5 py-0.5 text-[10px] font-bold text-secondary">
                {user.role === 'student' ? 'Student Portal' : `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)} Portal`}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Academic information is loaded from your campus records.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
