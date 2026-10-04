'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TrendingUp, Users, Zap, Wifi, GraduationCap, Calendar, BarChart2 } from 'lucide-react'

type TrendCategory = 'footfall' | 'energy' | 'wifi' | 'academics'

interface TrendSeries {
  label: string
  points: { time: string; value: number; secondary?: number }[]
  unit: string
  yMin: number
  yMax: number
  description: string
  peakTime: string
  peakValue: string
  statusBadge: string
}

const trendData: Record<TrendCategory, TrendSeries> = {
  footfall: {
    label: 'Campus Footfall & Density (Hourly)',
    unit: 'People',
    yMin: 0,
    yMax: 5000,
    description: 'Real-time pedestrian flow aggregated across smart gate turnstiles and corridor sensors.',
    peakTime: '1:30 PM (Lunch & Class Transition)',
    peakValue: '4,650 Students',
    statusBadge: 'Normal Velocity',
    points: [
      { time: '08:00', value: 1200, secondary: 900 },
      { time: '10:00', value: 3400, secondary: 2800 },
      { time: '12:00', value: 4100, secondary: 3600 },
      { time: '14:00', value: 4650, secondary: 4000 },
      { time: '16:00', value: 3800, secondary: 3200 },
      { time: '18:00', value: 2400, secondary: 1900 },
      { time: '20:00', value: 1100, secondary: 800 },
    ],
  },
  energy: {
    label: 'Campus Power Grid Load (24-Hour Curve)',
    unit: 'kW',
    yMin: 200,
    yMax: 1500,
    description: 'Live sub-metering of HVAC, server labs, lighting, and electric shuttle charging stations.',
    peakTime: '2:15 PM (Lab Peak)',
    peakValue: '1,280 kW',
    statusBadge: '34% Solar Offset',
    points: [
      { time: '08:00', value: 650, secondary: 200 },
      { time: '10:00', value: 980, secondary: 420 },
      { time: '12:00', value: 1210, secondary: 560 },
      { time: '14:00', value: 1280, secondary: 520 },
      { time: '16:00', value: 1050, secondary: 380 },
      { time: '18:00', value: 780, secondary: 140 },
      { time: '20:00', value: 490, secondary: 20 },
    ],
  },
  wifi: {
    label: 'Campus Wi-Fi Bandwidth & Concurrent Clients',
    unit: 'Gbps',
    yMin: 0,
    yMax: 20,
    description: 'High-throughput 10Gbps optical backbone traffic and active Wi-Fi 6 connected endpoints.',
    peakTime: '11:45 AM (Lecture Synchronous Lab)',
    peakValue: '16.4 Gbps',
    statusBadge: 'Low Latency (4ms)',
    points: [
      { time: '08:00', value: 3.2, secondary: 2.1 },
      { time: '10:00', value: 12.8, secondary: 8.4 },
      { time: '12:00', value: 15.6, secondary: 11.2 },
      { time: '14:00', value: 16.4, secondary: 12.0 },
      { time: '16:00', value: 14.1, secondary: 9.8 },
      { time: '18:00', value: 8.5, secondary: 6.2 },
      { time: '20:00', value: 4.8, secondary: 3.5 },
    ],
  },
  academics: {
    label: 'Cohort Average GPA Progression (Terms 1–6)',
    unit: 'CGPA',
    yMin: 6.0,
    yMax: 10.0,
    description: 'Comparative grading analytics tracking institutional performance milestones across terms.',
    peakTime: 'Term 5 (Current)',
    peakValue: '8.4 Term Average',
    statusBadge: 'Upward Trajectory',
    points: [
      { time: 'Term 1', value: 7.4, secondary: 7.1 },
      { time: 'Term 2', value: 7.6, secondary: 7.2 },
      { time: 'Term 3', value: 7.9, secondary: 7.3 },
      { time: 'Term 4', value: 8.1, secondary: 7.4 },
      { time: 'Term 5', value: 8.4, secondary: 7.6 },
      { time: 'Term 6 (Est)', value: 8.6, secondary: 7.8 },
    ],
  },
}

export function TrendsSection() {
  const reduce = useReducedMotion()
  const [activeTab, setActiveTab] = useState<TrendCategory>('footfall')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(3)

  const current = trendData[activeTab]

  // Chart configuration
  const width = 640
  const height = 230
  const paddingX = 40
  const paddingY = 32

  const getX = (index: number) =>
    paddingX + (index / (current.points.length - 1)) * (width - 2 * paddingX)
  const getY = (val: number) =>
    height -
    paddingY -
    ((val - current.yMin) / (current.yMax - current.yMin)) * (height - 2 * paddingY)

  // Construct SVG paths
  const pts = current.points.map((p, i) => ({ x: getX(i), y: getY(p.value) }))
  const secPts = current.points.map((p, i) => ({
    x: getX(i),
    y: getY(p.secondary || current.yMin),
  }))

  function makeSmoothPath(pointsList: { x: number; y: number }[]) {
    if (pointsList.length === 0) return ''
    let d = `M ${pointsList[0].x} ${pointsList[0].y}`
    for (let i = 0; i < pointsList.length - 1; i++) {
      const p0 = pointsList[Math.max(0, i - 1)]
      const p1 = pointsList[i]
      const p2 = pointsList[i + 1]
      const p3 = pointsList[Math.min(pointsList.length - 1, i + 2)]

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return d
  }

  const primaryPath = makeSmoothPath(pts)
  const areaPath = `${primaryPath} L ${pts[pts.length - 1].x} ${height - paddingY} L ${pts[0].x} ${height - paddingY} Z`
  const secondaryPath = makeSmoothPath(secPts)

  const activePoint = hoveredIdx !== null ? current.points[hoveredIdx] : current.points[current.points.length - 1]

  return (
    <section className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-2">
              <TrendingUp className="h-3.5 w-3.5" /> Longitudinal Analytics
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Campus Trends & Time Series
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Temporal analysis of energy, pedestrian flow, network bandwidth, and cohort grades.
            </p>
          </div>

          {/* Interactive Metric Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-border bg-muted/60 p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('footfall')
                setHoveredIdx(3)
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'footfall'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Users className="h-3.5 w-3.5" /> Footfall
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('energy')
                setHoveredIdx(3)
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'energy'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Zap className="h-3.5 w-3.5" /> Energy
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('wifi')
                setHoveredIdx(3)
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'wifi'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Wifi className="h-3.5 w-3.5" /> Wi-Fi
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('academics')
                setHoveredIdx(4)
              }}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                activeTab === 'academics'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" /> Grades
            </button>
          </div>
        </div>

        {/* Chart + Highlight Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          {/* Main SVG Visualization */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span className="font-semibold text-foreground">{current.label}</span>
              <span className="text-[11px]">Hover nodes for details</span>
            </div>

            <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-background/50 p-4">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto select-none">
                <defs>
                  <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid */}
                {[0.25, 0.5, 0.75, 1.0].map((ratio) => {
                  const val = current.yMin + ratio * (current.yMax - current.yMin)
                  const y = getY(val)
                  return (
                    <g key={ratio}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={width - paddingX}
                        y2={y}
                        stroke="var(--border)"
                        strokeDasharray="4 4"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingX - 8}
                        y={y + 3}
                        fontSize="10"
                        textAnchor="end"
                        fill="var(--muted-foreground)"
                        fontWeight="500"
                      >
                        {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(val < 10 ? 1 : 0)}
                      </text>
                    </g>
                  )
                })}

                {/* Filled Area */}
                <path d={areaPath} fill="url(#trendGradient)" />

                {/* Secondary Baseline (e.g. solar offset / cohort average) */}
                <path
                  d={secondaryPath}
                  fill="none"
                  stroke="var(--muted-foreground)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity="0.55"
                />

                {/* Primary Trend Line */}
                <path
                  d={primaryPath}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Vertical hover line indicator */}
                {hoveredIdx !== null && (
                  <line
                    x1={getX(hoveredIdx)}
                    y1={paddingY - 10}
                    x2={getX(hoveredIdx)}
                    y2={height - paddingY}
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    opacity="0.7"
                  />
                )}

                {/* Clickable / Hoverable Points */}
                {pts.map((pt, i) => {
                  const isHovered = hoveredIdx === i
                  return (
                    <g
                      key={i}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIdx(i)}
                      onClick={() => setHoveredIdx(i)}
                    >
                      <circle cx={pt.x} cy={pt.y} r="16" fill="transparent" />
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 7 : 4}
                        fill="var(--card)"
                        stroke="var(--primary)"
                        strokeWidth={isHovered ? 3 : 2}
                      />
                      <text
                        x={pt.x}
                        y={height - paddingY + 18}
                        fontSize="10"
                        textAnchor="middle"
                        fill={isHovered ? 'var(--foreground)' : 'var(--muted-foreground)'}
                        fontWeight={isHovered ? '700' : '500'}
                      >
                        {current.points[i].time}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Highlight Card */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + (hoveredIdx ?? 0)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col justify-between rounded-2xl border border-primary/20 bg-primary/[0.03] p-5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {activePoint.time} Telemetry Snapshot
                    </span>
                    <span className="rounded-md bg-success/15 px-2 py-0.5 text-[10px] font-bold text-success">
                      {current.statusBadge}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                      {activePoint.value}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{current.unit}</span>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {current.description}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-border/60 pt-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Historical Peak:</span>
                      <span className="font-semibold text-foreground">{current.peakValue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Peak Window:</span>
                      <span className="font-medium text-foreground">{current.peakTime}</span>
                    </div>
                    {activePoint.secondary !== undefined && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Baseline Offset:</span>
                        <span className="font-mono text-primary font-semibold">
                          {activePoint.secondary} {current.unit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-border bg-card p-3 text-[11px] text-muted-foreground">
                  AI Trend Analysis: Variance within <strong>±2.4%</strong> of neural simulation baseline.
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
