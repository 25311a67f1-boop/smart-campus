'use client'

import { motion, useReducedMotion } from 'motion/react'
import { FileCheck, CalendarCheck, Sparkles, Megaphone, Clock, CheckCircle2, ArrowRight } from 'lucide-react'

interface Activity {
  id: string
  title: string
  detail: string
  time: string
  icon: typeof FileCheck
  category: 'assignment' | 'attendance' | 'workshop' | 'announcement'
  statusBadge: string
}


export function RecentActivity({ activities }: { activities: Array<Omit<Activity, 'icon'> & { category: Activity['category'] }> }) {
  const reduce = useReducedMotion()

  return (
    <section className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between pb-5 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-muted-foreground mb-2">
              <Clock className="h-3.5 w-3.5" /> Real-time Feed
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Recent Activity
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Your latest academic submissions, verified check-ins, and campus notices.
            </p>
          </div>

          <span className="text-xs font-semibold text-primary hidden sm:inline-block">
            Auto-synced
          </span>
        </div>

        <div className="mt-6 divide-y divide-border/60">
          {activities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No activity has been recorded yet. Your real campus activity will appear here.
            </div>
          ) : activities.map((item, index) => {
            const Icon = item.category === 'attendance' ? CalendarCheck : item.category === 'assignment' ? FileCheck : item.category === 'workshop' ? Sparkles : Megaphone
            return (
              <motion.div
                key={item.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 group"
              >
                {/* Icon marker */}
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-muted text-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h3 className="font-display text-sm font-bold text-foreground">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-muted-foreground font-medium">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-foreground">
                      {item.statusBadge}
                    </span>
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
