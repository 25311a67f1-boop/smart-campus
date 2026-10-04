'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, UserRound } from 'lucide-react'

const departments = ['Data Science','Computer Science','Information Technology','Electronics & Communication','Electrical & Electronics','Mechanical','Civil','Other']
type Profile = { fullName:string; email:string; studentId?:string; department?:string; course?:string; year?:number; section?:string; semester?:number; phone?:string }

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetch('/api/profile').then(async (r) => { if (!r.ok) { router.replace('/login'); return }; const data = await r.json(); setProfile(data.profile) }) }, [router])
  if (!profile) return <main className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">Loading profile…</main>

  async function save() {
    setSaving(true); setMessage(''); setError('')
    const response = await fetch('/api/profile', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify(profile) })
    const data = await response.json()
    if (!response.ok) setError(data.error || 'Unable to save profile.')
    else { setProfile(data.profile); setMessage('Profile saved successfully.'); router.refresh() }
    setSaving(false)
  }
  const update = (key: keyof Profile, value: string | number) => setProfile((p) => p ? ({ ...p, [key]: value }) : p)

  return <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6"><div className="mx-auto max-w-3xl">
    <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4"/> Back to dashboard</Link>
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-7 flex items-center gap-4"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"><UserRound className="h-6 w-6"/></div><div><h1 className="font-display text-2xl font-semibold">Student Profile</h1><p className="text-sm text-muted-foreground">Your academic identity used across Smart Campus.</p></div></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">Full name<input disabled value={profile.fullName} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-muted px-3 text-sm"/></label>
        <label className="text-sm font-medium">College email<input disabled value={profile.email} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-muted px-3 text-sm"/></label>
        <Field label="Student ID / Roll No." value={profile.studentId ?? ''} onChange={(v)=>update('studentId',v)} />
        <label className="text-sm font-medium">Department<select value={profile.department ?? ''} onChange={(e)=>update('department',e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"><option value="">Select department</option>{departments.map((d)=><option key={d}>{d}</option>)}</select></label>
        <Field label="Course" value={profile.course ?? ''} onChange={(v)=>update('course',v)} /><Field label="Year" type="number" value={String(profile.year ?? '')} onChange={(v)=>update('year',Number(v))} />
        <Field label="Section" value={profile.section ?? ''} onChange={(v)=>update('section',v)} /><Field label="Semester" type="number" value={String(profile.semester ?? '')} onChange={(v)=>update('semester',Number(v))} />
        <Field label="Phone (optional)" value={profile.phone ?? ''} onChange={(v)=>update('phone',v)} />
      </div>
      {error && <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}{message && <p className="mt-4 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">{message}</p>}
      <button onClick={save} disabled={saving} className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-60"><Save className="h-4 w-4"/>{saving ? 'Saving…' : 'Save profile'}</button>
    </section>
  </div></main>
}
function Field({label,value,onChange,type='text'}:{label:string;value:string;onChange:(v:string)=>void;type?:string}) { return <label className="text-sm font-medium">{label}<input type={type} value={value} onChange={(e)=>onChange(e.target.value)} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"/></label> }
