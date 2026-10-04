'use client'

import { useState } from 'react'
import { AppNavbar } from '@/components/layout/app-navbar'
import { SiteFooter } from '@/components/site-footer'
import { IntelligenceHeader } from '@/components/intelligence/intelligence-header'
import { CampusStatsGrid } from '@/components/intelligence/campus-stats-grid'
import { TrendsSection } from '@/components/intelligence/trends-section'
import { PredictionsSection } from '@/components/intelligence/predictions-section'
import { AiCampusInsights } from '@/components/intelligence/ai-campus-insights'

export default function IntelligencePage() {
  const [selectedZone, setSelectedZone] = useState('All Campus')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground flex flex-col justify-between">
      <div>
        {/* Universal Top Navigation */}
        <AppNavbar />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Intelligence Header & Zone Selector */}
          <IntelligenceHeader
            selectedZone={selectedZone}
            onZoneChange={setSelectedZone}
            onRefresh={handleRefresh}
            isRefreshing={isRefreshing}
          />

          {/* Real-time Campus Telemetry & IoT Sensor Grid */}
          <CampusStatsGrid zone={selectedZone} isRefreshing={isRefreshing} />

          {/* Time Series & Longitudinal Trends */}
          <TrendsSection />

          {/* Neural Predictive Modeling & Outcomes */}
          <PredictionsSection />

          {/* AI-Generated Strategic Insights */}
          <AiCampusInsights />
        </main>
      </div>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
