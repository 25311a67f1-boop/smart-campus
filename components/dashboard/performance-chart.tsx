'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TrendingUp, BarChart3, Award, Info, ChevronRight, BookOpen } from 'lucide-react'

interface DataPoint {
  month: string
  fullMonth: string
  gpa: number
  classAvg: number
  credits: number
  topSubject: string
  topScore: string
}

export function PerformanceChart({ dataPoints }: { dataPoints: DataPoint[] }) {
  const reduce = useReducedMotion()
  const [hoveredIndex, setHoveredIndex] = useState<number>(Math.max(0, dataPoints.length - 1)) // default to latest month
  const [activeMetric, setActiveMetric] = useState<'gpa' | 'pct'>('gpa')

  const activePoint = dataPoints[hoveredIndex]

  if (dataPoints.length === 0) {
    return (
      <section id="analytics" className="pb-8">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-2">
            <TrendingUp className="h-3.5 w-3.5" /> Academic Trajectory
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">Academic Performance</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">No academic performance records are available yet.</p>
          <div className="mt-6 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Faculty/admin grade entries will appear here automatically.
          </div>
        </div>
      </section>
    )
  }

  // Chart dimensions & scaling
  const width = 640
  const height = 220
  const paddingX = 40
  const paddingY = 30

  const minVal = 6.8
  const maxVal = 9.0

  const getX = (index: number) => dataPoints.length === 1 ? width / 2 : paddingX + (index / (dataPoints.length - 1)) * (width - 2 * paddingX)
  const getY = (val: number) => height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * paddingY)

  // Construct smooth SVG path using Catmull-Rom or cubic Bezier
  const points = dataPoints.map((d, i) => ({ x: getX(i), y: getY(d.gpa) }))
  const avgPoints = dataPoints.map((d, i) => ({ x: getX(i), y: getY(d.classAvg) }))

  function createSmoothPath(pts: Array<{ x: number; y: number }>) {
    if (pts.length === 0) return ''
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)]
      const p1 = pts[i]
      const p2 = pts[i + 1]
      const p3 = pts[Math.min(pts.length - 1, i + 2)]

      const cp1x = p1.x + (p2.x - p0.x) / 6
      const cp1y = p1.y + (p2.y - p0.y) / 6
      const cp2x = p2.x - (p3.x - p1.x) / 6
      const cp2y = p2.y - (p3.y - p1.y) / 6

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
    }
    return d
  }

  const linePath = createSmoothPath(points)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
  const avgLinePath = createSmoothPath(avgPoints)

  return (
    <section id="analytics" className="pb-8">
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Header with Title & Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-border/70">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-2">
              <TrendingUp className="h-3.5 w-3.5" /> Academic Trajectory
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
              Academic Performance
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              6-month cumulative grading curve vs. cohort average benchmark.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center rounded-xl border border-border bg-muted/50 p-1 text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveMetric('gpa')}
                className={`rounded-lg px-3 py-1.5 transition-all ${
                  activeMetric === 'gpa'
                    ? 'bg-card font-semibold text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                CGPA Trend
              </button>
              <button
                type="button"
                onClick={() => setActiveMetric('pct')}
                className={`rounded-lg px-3 py-1.5 transition-all ${
                  activeMetric === 'pct'
                    ? 'bg-card font-semibold text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Percentage Scale
              </button>
            </div>
          </div>
        </div>

        {/* Chart + Insights side-by-side on wide screens */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
          {/* Main SVG Vector Chart */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                  Your CGPA ({activePoint.gpa})
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                  Cohort Average ({activePoint.classAvg})
                </span>
              </div>
              <span className="text-[11px]">Hover data points for details</span>
            </div>

            <div className="relative w-full overflow-hidden rounded-2xl border border-border/80 bg-background/50 p-3 sm:p-4">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full h-auto overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="gpaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--secondary)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--secondary)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[7.0, 7.5, 8.0, 8.5].map((level) => {
                  const y = getY(level)
                  return (
                    <g key={level}>
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
                        x={paddingX - 10}
                        y={y + 3}
                        fontSize="10"
                        textAnchor="end"
                        fill="var(--muted-foreground)"
                        fontWeight="500"
                      >
                        {level.toFixed(1)}
                      </text>
                    </g>
                  )
                })}

                {/* Area Gradient under curve */}
                <path d={areaPath} fill="url(#gpaGradient)" />

                {/* Cohort average dashed line */}
                <path
                  d={avgLinePath}
                  fill="none"
                  stroke="var(--muted-foreground)"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  opacity="0.6"
                />

                {/* Main GPA Line */}
                <path
                  d={linePath}
                  fill="none"
                  stroke="var(--secondary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Hover vertical line */}
                {hoveredIndex !== null && (
                  <line
                    x1={getX(hoveredIndex)}
                    y1={paddingY - 10}
                    x2={getX(hoveredIndex)}
                    y2={height - paddingY}
                    stroke="var(--secondary)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    opacity="0.7"
                  />
                )}

                {/* Data Points */}
                {points.map((pt, i) => {
                  const isHovered = hoveredIndex === i
                  return (
                    <g
                      key={dataPoints[i].month}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(i)}
                      onClick={() => setHoveredIndex(i)}
                    >
                      {/* Invisible larger hover area */}
                      <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                      {/* Visible circle */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isHovered ? 7 : 4.5}
                        fill="var(--card)"
                        stroke="var(--secondary)"
                        strokeWidth={isHovered ? 3 : 2}
                        className="transition-all duration-200"
                      />
                      {isHovered && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="12"
                          fill="var(--secondary)"
                          opacity="0.2"
                        />
                      )}

                      {/* Month Label */}
                      <text
                        x={pt.x}
                        y={height - paddingY + 18}
                        fontSize="11"
                        textAnchor="middle"
                        fill={isHovered ? 'var(--foreground)' : 'var(--muted-foreground)'}
                        fontWeight={isHovered ? '700' : '500'}
                      >
                        {dataPoints[i].month}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>

          {/* Interactive Highlight Card */}
          <div className="lg:col-span-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePoint.month}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col justify-between rounded-2xl border border-secondary/20 bg-secondary/[0.04] p-5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      {activePoint.fullMonth}
                    </span>
                    <span className="rounded-md bg-success/15 px-2 py-0.5 text-[11px] font-bold text-success">
                      +0.3 Above Avg
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold tracking-tight text-foreground">
                      {activeMetric === 'gpa' ? activePoint.gpa : `${(activePoint.gpa * 9.5).toFixed(1)}%`}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {activeMetric === 'gpa' ? 'GPA' : 'Equiv %'}
                    </span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between border-b border-border/50 pb-1.5">
                      <span className="text-muted-foreground">Class Cohort Average</span>
                      <span className="font-semibold text-foreground">{activePoint.classAvg} GPA</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-1.5">
                      <span className="text-muted-foreground">Credits Completed</span>
                      <span className="font-semibold text-foreground">{activePoint.credits} Credits</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-border/50 pb-1.5">
                      <span className="text-muted-foreground">Highest Scoring Course</span>
                      <span className="font-semibold text-foreground truncate max-w-[140px]" title={activePoint.topSubject}>
                        {activePoint.topSubject}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-0.5">
                      <span className="text-muted-foreground">Course Score</span>
                      <span className="font-bold text-success">{activePoint.topScore}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-card border border-border p-3">
                  <div className="flex items-start gap-2">
                    <Award className="h-4 w-4 text-primary flex-none mt-0.5" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      On track for <strong>Dean&apos;s Honor Roll</strong> with consistent month-on-month improvement.
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
