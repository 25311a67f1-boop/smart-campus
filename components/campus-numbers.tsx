'use client'

import { Users, CalendarCheck, AlertTriangle, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CountUp } from './count-up'
import { Reveal, StaggerGroup, StaggerItem } from './reveal'

type Stat = {
  value: number
  suffix?: string
  label: string
  icon: LucideIcon
  accent: string
}

const stats: Stat[] = [
  { value: 12480, label: 'Students', icon: Users, accent: 'text-secondary' },
  { value: 87, suffix: '%', label: 'Average Attendance', icon: CalendarCheck, accent: 'text-success' },
  { value: 1248, label: 'Active Issues', icon: AlertTriangle, accent: 'text-primary' },
  { value: 94, suffix: '%', label: 'Resolution Rate', icon: CheckCircle2, accent: 'text-success' },
]

export function CampusNumbers() {
  return (
    <section id="intelligence" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            Campus at a glance
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
            Your Campus, In Numbers.
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <StaggerItem key={stat.label}>
                <div className="group h-full rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(15_23_42/0.2)]">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-muted ${stat.accent}`}>
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="mt-6 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
