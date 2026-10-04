'use client'

import { motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { LineChart, Sparkles, Network, Calendar, ArrowUpRight, Shield } from 'lucide-react'

interface QuickAction {
  title: string
  desc: string
  href: string
  icon: typeof LineChart
  accentClass: string
  badge: string
}

const actions: QuickAction[] = [
  {
    title: 'View Analytics',
    desc: 'Deep-dive into 6-month CGPA curves, credit progression, and exam history.',
    href: '#analytics',
    icon: LineChart,
    accentClass: 'bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground',
    badge: 'Academics',
  },
  {
    title: 'AI Insights',
    desc: 'Review personalized recommendations and study optimization tips.',
    href: '#ai-insights',
    icon: Sparkles,
    accentClass: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
    badge: 'AI Engine',
  },
  {
    title: 'Campus Intelligence',
    desc: 'Check live campus pulse, occupancy rates, and facility metrics.',
    href: '/#analytics',
    icon: Network,
    accentClass: 'bg-foreground/10 text-foreground group-hover:bg-foreground group-hover:text-background',
    badge: 'Live Pulse',
  },
  {
    title: 'Events & Workshops',
    desc: 'Explore hackathons, guest lectures, and manage your registrations.',
    href: '#events',
    icon: Calendar,
    accentClass: 'bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground',
    badge: 'Calendar',
  },
]

export function QuickActions() {
  const reduce = useReducedMotion()

  return (
    <section className="pb-12">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
            Quick Actions
          </h2>
          <p className="text-xs text-muted-foreground">
            Instant navigation to critical intelligence modules.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Link
              key={action.title}
              href={action.href}
              className="group block focus:outline-none"
            >
              <motion.div
                whileHover={reduce ? undefined : { y: -3 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 leading-none">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 ${action.accentClass}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                    </span>
                    <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                      {action.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                    {action.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>

                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {action.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-semibold text-primary">
                  Open module →
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
