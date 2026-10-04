import type { Metadata } from 'next'
import { LoginVisual, LoginBrand } from '@/components/login-visual'
import { SignupForm } from '@/components/signup-form'

export const metadata: Metadata = {
  title: 'Sign up — Smart Campus Intelligence',
  description:
    'Create your account and start exploring intelligent campus insights with Smart Campus Intelligence.',
}

export default function SignupPage() {
  return (
    <main className="grid min-h-screen w-full overflow-x-hidden lg:grid-cols-[1.05fr_1fr]">
      {/* Left: dark campus data visualization */}
      <section className="relative hidden min-h-[16rem] flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14">
        <LoginVisual />
        <div className="relative z-10">
          <LoginBrand />
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-white text-balance xl:text-5xl">
            Build a smarter campus experience.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-300 text-pretty">
            Create your account and start exploring intelligent campus insights.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-xs text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Live campus intelligence · updated continuously
        </div>
      </section>

      {/* Right: light auth panel */}
      <section className="relative flex min-h-screen flex-col bg-background">
        {/* Compact brand for mobile where the visual is hidden */}
        <div className="flex items-center justify-between p-6 lg:hidden">
          <a href="/" className="inline-flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-display text-sm font-bold">S</span>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              SmartCampus
            </span>
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
          <SignupForm />
        </div>
      </section>
    </main>
  )
}
