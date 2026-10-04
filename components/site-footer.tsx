import Link from 'next/link'
import { Sparkles } from 'lucide-react'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Student Dashboard', href: '/dashboard' },
      { label: 'Campus Intelligence', href: '/intelligence' },
      { label: 'Analytics & Trends', href: '/analytics' },
      { label: 'AI Insights Engine', href: '/ai-insights' },
    ],
  },
  {
    title: 'About & Access',
    links: [
      { label: 'About Project', href: '/about' },
      { label: 'Student Login', href: '/login' },
      { label: 'Register Account', href: '/signup' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                SmartCampus
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Turning campus data into meaningful, real-time insight for students and administrators.
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs sm:text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SmartCampus Intelligence System. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">Built for smarter campuses.</p>
        </div>
      </div>
    </footer>
  )
}
