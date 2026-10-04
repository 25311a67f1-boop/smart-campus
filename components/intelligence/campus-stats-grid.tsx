'use client'

import { motion, useReducedMotion } from 'motion/react'
import {
  Wifi,
  Zap,
  BookOpen,
  UtensilsCrossed,
  Bus,
  Wind,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react'

interface StatItem {
  id: string
  title: string
  value: string
  subtext: string
  trend: string
  trendType: 'positive' | 'negative' | 'neutral'
  icon: typeof Wifi
  progress: number
  colorClass: string
  tag: string
}

interface CampusStatsGridProps {
  zone: string
  isRefreshing: boolean
}

export function CampusStatsGrid({ zone, isRefreshing }: CampusStatsGridProps) {
  const reduce = useReducedMotion()

  const stats: StatItem[] = [
    {
      id: 'stat-wifi',
      title: 'Active Connected Devices',
      value: '4,892',
      subtext: 'Across 142 Wi-Fi 6 Access Points',
      trend: '+12% vs yesterday',
      trendType: 'positive',
      icon: Wifi,
      progress: 74,
      colorClass: 'bg-primary/10 text-primary border-primary/20',
      tag: 'Peak Load 82%',
    },
    {
      id: 'stat-library',
      title: 'Central Library Occupancy',
      value: '78%',
      subtext: '468 of 600 seats occupied',
      trend: 'Quiet zone: 42 seats free',
      trendType: 'neutral',
      icon: BookOpen,
      progress: 78,
      colorClass: 'bg-secondary/10 text-secondary border-secondary/20',
      tag: 'Levels 1–4 Active',
    },
    {
      id: 'stat-energy',
      title: 'Power & Solar Efficiency',
      value: '1.24 MW',
      subtext: '34% covered by rooftop solar array',
      trend: '-8.4% energy vs benchmark',
      trendType: 'positive',
      icon: Zap,
      progress: 66,
      colorClass: 'bg-warning/10 text-warning border-warning/20',
      tag: 'Eco-Optimized',
    },
    {
      id: 'stat-transit',
      title: 'Smart Transit Fleet',
      value: '8 / 8 Active',
      subtext: 'Electric autonomous shuttles on route',
      trend: 'Avg wait: 3.2 mins',
      trendType: 'positive',
      icon: Bus,
      progress: 100,
      colorClass: 'bg-success/10 text-success border-success/20',
      tag: '100% On-Schedule',
    },
    {
      id: 'stat-dining',
      title: 'Food Court Live Traffic',
      value: 'Moderate',
      subtext: 'Central Dining: 6 min avg queue',
      trend: 'North Cafe: Zero wait',
      trendType: 'neutral',
      icon: UtensilsCrossed,
      progress: 52,
      colorClass: 'bg-foreground/10 text-foreground border-border',
      tag: 'Catering Live',
    },
    {
      id: 'stat-aqi',
      title: 'Campus Air Quality Index',
      value: '38 AQI',
      subtext: 'Optimal indoor & outdoor ventilation',
      trend: 'Classroom CO2: 460 ppm (Healthy)',
      trendType: 'positive',
      icon: Wind,
      progress: 92,
      colorClass: 'bg-success/10 text-success border-success/20',
      tag: 'Pristine Air',
    },
  ]

  if (isRefreshing) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-6 pb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-border bg-card p-5 h-44 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-9 w-9 rounded-xl bg-muted" />
              <div className="h-4 w-20 rounded-md bg-muted" />
            </div>
            <div className="space-y-2">
              <div className="h-6 w-32 rounded-md bg-muted" />
              <div className="h-3 w-48 rounded-md bg-muted" />
            </div>
            <div className="h-2 w-full rounded-full bg-muted" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="pt-6 pb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-bold tracking-tight text-foreground">
          Core Campus Telemetry ({zone})
        </h2>
        <span className="text-xs text-muted-foreground font-medium">
          Refreshes dynamically
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              whileHover={reduce ? undefined : { y: -3 }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:border-foreground/20 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${stat.colorClass}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                    {stat.tag}
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    {stat.title}
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {stat.subtext}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/60">
                <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                  <span className="text-muted-foreground">Capacity utilization</span>
                  <span className="font-bold text-foreground font-mono">{stat.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    {stat.trendType === 'positive' ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    )}
                    {stat.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
