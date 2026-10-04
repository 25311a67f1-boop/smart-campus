'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  BarChart3,
  Filter,
  Download,
  RotateCcw,
  Calendar,
  Building,
  GraduationCap,
  Layers,
  CheckCircle2,
} from 'lucide-react'

export interface AnalyticsFilterState {
  dateRange: string
  department: string
  year: string
  category: string
}

interface AnalyticsHeaderProps {
  filters: AnalyticsFilterState
  onFilterChange: (key: keyof AnalyticsFilterState, value: string) => void
  onReset: () => void
  onExport: () => void
  isExporting: boolean
}

export function AnalyticsHeader({
  filters,
  onFilterChange,
  onReset,
  onExport,
  isExporting,
}: AnalyticsHeaderProps) {
  const dateRanges = ['Semester 5 (Current)', 'This Month (August)', 'Last 90 Days', 'Full Academic Year']
  const departments = ['All Departments', 'Computer Science & Eng', 'Electronics & Comm', 'Mechanical & Robotics', 'Business & Analytics']
  const years = ['All Batches', '1st Year (Freshman)', '2nd Year (Sophomore)', '3rd Year (Junior)', '4th Year (Senior)']
  const categories = ['All Metrics', 'Academic & Grades', 'Attendance Telemetry', 'Lab & Spatial Utilization', 'Campus Events']

  const isFiltered =
    filters.department !== 'All Departments' ||
    filters.year !== 'All Batches' ||
    filters.category !== 'All Metrics' ||
    filters.dateRange !== 'Semester 5 (Current)'

  return (
    <div className="pt-8 pb-6 border-b border-border/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary mb-2">
            <BarChart3 className="h-3.5 w-3.5" /> Institutional Data Warehouse
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Analytics & Reports
          </h1>
          <p className="mt-1.5 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Interactive multi-dimensional analytics examining cohort trajectories, faculty grade distributions, and resource efficiency.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={onExport}
            disabled={isExporting}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2 text-xs font-semibold text-background transition-all hover:bg-foreground/90 active:scale-95 disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isExporting ? 'Generating PDF...' : 'Export Analytics Report'}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl border border-border bg-card p-3 shadow-xs">
        {/* Date Range Filter */}
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-none" />
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Timeline
            </span>
            <select
              value={filters.dateRange}
              onChange={(e) => onFilterChange('dateRange', e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer truncate"
            >
              {dateRanges.map((d) => (
                <option key={d} value={d} className="bg-card text-foreground">
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
          <Building className="h-3.5 w-3.5 text-muted-foreground flex-none" />
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Department
            </span>
            <select
              value={filters.department}
              onChange={(e) => onFilterChange('department', e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer truncate"
            >
              {departments.map((dep) => (
                <option key={dep} value={dep} className="bg-card text-foreground">
                  {dep}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
          <GraduationCap className="h-3.5 w-3.5 text-muted-foreground flex-none" />
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Student Batch
            </span>
            <select
              value={filters.year}
              onChange={(e) => onFilterChange('year', e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer truncate"
            >
              {years.map((y) => (
                <option key={y} value={y} className="bg-card text-foreground">
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
          <Layers className="h-3.5 w-3.5 text-muted-foreground flex-none" />
          <div className="min-w-0 flex-1">
            <span className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Metric Focus
            </span>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
              className="w-full bg-transparent text-xs font-medium text-foreground focus:outline-none cursor-pointer truncate"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-card text-foreground">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
