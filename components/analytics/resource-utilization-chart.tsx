'use client'

import { motion, useReducedMotion } from 'motion/react'
import { Server, Monitor, BookOpen, Dumbbell, Coffee, CheckCircle2, TrendingUp } from 'lucide-react'

interface ResourceItem {
  id: string
  name: string
  category: string
  capacity: string
  utilization: number
  status: 'Optimal' | 'High' | 'Moderate'
  peakHour: string
  icon: typeof Server
}

const resources: ResourceItem[] = [
  { id: 'res-1', name: 'GPU Cluster & AI High Performance Lab', category: 'Computing Nodes', capacity: '64 / 64 NVIDIA A100 Nodes', utilization: 92, status: 'High', peakHour: '2:00 PM – 6:00 PM', icon: Server },
  { id: 'res-2', name: 'Central Computing Lab (Rooms 301–304)', category: 'Workstations', capacity: '220 / 240 Desktops Active', utilization: 88, status: 'High', peakHour: '10:00 AM – 4:00 PM', icon: Monitor },
  { id: 'res-3', name: 'Main Academic Library & Study Pods', category: 'Spatial Seating', capacity: '468 / 600 Seats Occupied', utilization: 78, status: 'Optimal', peakHour: '3:00 PM – 7:00 PM', icon: BookOpen },
  { id: 'res-4', name: 'Indoor Sports & Fitness Arena', category: 'Recreation', capacity: '85 / 150 Occupants', utilization: 56, status: 'Moderate', peakHour: '5:30 PM – 8:30 PM', icon: Dumbbell },
  { id: 'res-5', name: 'Central Student Dining & Cafe', category: 'Hospitality', capacity: '310 / 500 Seated', utilization: 62, status: 'Moderate', peakHour: '12:30 PM – 2:00 PM', icon: Coffee },
]

export function ResourceUtilizationChart() {
  const reduce = useReducedMotion()

  return (
    <section className="pb-12">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-2">
              <Server className="h-3.5 w-3.5" /> Spatial & Computing Infrastructure
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Campus Resource & Facility Utilization
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Real-time capacity tracking across HPC supercomputing clusters, study zones, and athletics.
            </p>
          </div>

          <span className="rounded-xl border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
            All 5 Main Clusters Online
          </span>
        </div>

        {/* Resource List / Grid */}
        <div className="mt-6 space-y-3">
          {resources.map((r, idx) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background/50 p-4 transition-all duration-200 hover:border-foreground/20 hover:bg-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-muted text-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-foreground truncate">
                        {r.name}
                      </h3>
                      <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase hidden sm:inline-block">
                        {r.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.capacity} • Peak: {r.peakHour}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:w-64">
                  <div className="flex-1">
                    <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                      <span className="text-muted-foreground">Load</span>
                      <span className="font-bold text-foreground font-mono">{r.utilization}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${
                          r.utilization >= 90
                            ? 'bg-destructive'
                            : r.utilization >= 75
                            ? 'bg-primary'
                            : 'bg-success'
                        }`}
                        style={{ width: `${r.utilization}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`rounded-md px-2 py-1 text-[11px] font-bold whitespace-nowrap ${
                      r.status === 'High'
                        ? 'bg-destructive/15 text-destructive'
                        : r.status === 'Optimal'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
