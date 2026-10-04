'use client'

import { AppNavbar } from '@/components/layout/app-navbar'
import { SiteFooter } from '@/components/site-footer'
import { AboutHero } from '@/components/about/about-hero'
import { MissionPillars } from '@/components/about/mission-pillars'
import { SystemArchitecture } from '@/components/about/system-architecture'
import { TechStackOverview } from '@/components/about/tech-stack-overview'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground flex flex-col justify-between">
      <div>
        {/* Top Navbar */}
        <AppNavbar />

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AboutHero />
          <MissionPillars />
          <SystemArchitecture />
          <TechStackOverview />
        </main>
      </div>

      {/* Universal Footer */}
      <SiteFooter />
    </div>
  )
}
