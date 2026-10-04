'use client'

import { useState } from 'react'
import { AppNavbar } from '@/components/layout/app-navbar'
import { SiteFooter } from '@/components/site-footer'
import { AnalyticsHeader, AnalyticsFilterState } from '@/components/analytics/analytics-header'
import { AnalyticsMetricCards } from '@/components/analytics/analytics-metric-cards'
import { AcademicDistributionChart } from '@/components/analytics/academic-distribution-chart'
import { DepartmentComparisonChart } from '@/components/analytics/department-comparison-chart'
import { ResourceUtilizationChart } from '@/components/analytics/resource-utilization-chart'
import { RotateCcw, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react'

const initialFilters: AnalyticsFilterState = {
  dateRange: 'Semester 5 (Current)',
  department: 'All Departments',
  year: 'All Batches',
  category: 'All Metrics',
}

export default function AnalyticsPage() {
  const [filters, setFilters] = useState<AnalyticsFilterState>(initialFilters)
  const [isExporting, setIsExporting] = useState(false)
  const [exportNotice, setExportNotice] = useState(false)

  const handleFilterChange = (key: keyof AnalyticsFilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleReset = () => {
    setFilters(initialFilters)
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      setExportNotice(true)
      setTimeout(() => setExportNotice(false), 4000)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground flex flex-col justify-between">
      <div>
        {/* Universal Navbar */}
        <AppNavbar />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Multi-Dimensional Filters */}
          <AnalyticsHeader
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            onExport={handleExport}
            isExporting={isExporting}
          />

          {/* Export Success Toast / Notice */}
          {exportNotice && (
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-success/30 bg-success/10 px-4 py-3 text-xs font-semibold text-success shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Executive Analytics Report (PDF) compiled and downloaded successfully.</span>
              </div>
              <span className="font-mono text-[11px]">Report #AR-2026-AUG</span>
            </div>
          )}

          {/* Top Summary Metric Cards */}
          <AnalyticsMetricCards filters={filters} />

          {/* CGPA & Grade Bracket Distribution Chart */}
          <AcademicDistributionChart />

          {/* Departmental Analytics Matrix */}
          <DepartmentComparisonChart />

          {/* Resource & Facility Utilization */}
          <ResourceUtilizationChart />
        </main>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
