import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { CampusNumbers } from '@/components/campus-numbers'
import { CampusPulse } from '@/components/campus-pulse'
import { DataStory } from '@/components/data-story'
import { AiInsights } from '@/components/ai-insights'
import { FinalCta } from '@/components/final-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <CampusNumbers />
        <CampusPulse />
        <DataStory />
        <AiInsights />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
