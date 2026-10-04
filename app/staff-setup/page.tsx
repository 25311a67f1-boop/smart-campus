'use client'

import { useEffect, useState, type Dispatch, type SetStateAction, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, UserRound, CheckCircle2 } from 'lucide-react'

type Staff = { fullName: string; email: string; password: string; department: string }
const empty: Staff = { fullName: '', email: '', password: '', department: '' }

export default function StaffSetupPage() {
  const [available, setAvailable] = useState<boolean | null>(null)
  const [admin, setAdmin] = useState<Staff>(empty)
  const [faculty, setFaculty] = useState<Staff>(empty)
  const [includeFaculty, setIncludeFaculty] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => { fetch('/api/auth/staff-setup').then(async r => { const d = await r.json(); setAvailable(Boolean(d.available)); if (!r.ok) setError(d.error || 'Staff setup is unavailable.') }) }, [])

  function update(setter: Dispatch<SetStateAction<Staff>>, key: keyof Staff, value: string) {
    setter(prev => ({ ...prev, [key]: value }))
    setError('')
  }

  async function submit(e: FormEvent) {
    e.preventDefault(); setSaving(true); setError('')
    try {
      const response = await fetch('/api/auth/staff-setup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ admin, faculty: includeFaculty ? faculty : null }) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to create staff accounts.')
      setSuccess(true); setAvailable(false)
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to create staff accounts.') } finally { setSaving(false) }
  }

  return <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6"><div className="mx-auto max-w-3xl">
    <Link href="/login" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4"/> Back to login</Link>
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ShieldCheck className="h-6 w-6"/></div><div><h1 className="font-display text-2xl font-semibold">First-time staff setup</h1><p className="mt-1 text-sm text-muted-foreground">Create the first Admin account and, optionally, a Faculty account for local development.</p></div></div>
    {available === false && !success && <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4 text-sm">Staff accounts already exist. Please use the normal login page. An Admin can create additional staff from the Admin Console.</div>}
    {success ? <div className="mt-8 rounded-2xl border border-success/20 bg-success/10 p-5"><div className="flex items-center gap-2 font-semibold text-success"><CheckCircle2 className="h-5 w-5"/> Staff accounts created successfully</div><p className="mt-2 text-sm text-muted-foreground">You can now log in with the Admin or Faculty email and password you entered.</p><Link href="/login" className="mt-5 inline-flex h-11 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground">Go to login</Link></div> : available && <form onSubmit={submit} className="mt-8 space-y-8">
      <StaffSection title="Admin account" icon={<ShieldCheck className="h-5 w-5"/>} staff={admin} setStaff={setAdmin} update={update}/>
      <div className="border-t border-border pt-8"><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={includeFaculty} onChange={e=>setIncludeFaculty(e.target.checked)} className="h-4 w-4 accent-primary"/> Create a Faculty account too</label>{includeFaculty && <div className="mt-5"><StaffSection title="Faculty account" icon={<UserRound className="h-5 w-5"/>} staff={faculty} setStaff={setFaculty} update={update}/></div>}</div>
      {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
      <button disabled={saving} className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground disabled:opacity-60">{saving ? 'Creating accounts…' : 'Create staff accounts'}</button>
      <p className="text-xs text-muted-foreground">This bootstrap page works only while the app is running in development mode and before any staff account exists.</p>
    </form>}
    </section>
  </div></main>
}

function StaffSection({title,icon,staff,setStaff,update}:{title:string;icon:ReactNode;staff:Staff;setStaff:Dispatch<SetStateAction<Staff>>;update:(s:Dispatch<SetStateAction<Staff>>,k:keyof Staff,v:string)=>void}) {
  return <div><div className="flex items-center gap-2 font-display text-lg font-semibold">{icon}{title}</div><div className="mt-4 grid gap-4 sm:grid-cols-2"><Field label="Full name" value={staff.fullName} onChange={v=>update(setStaff,'fullName',v)} placeholder="Campus Admin"/><Field label="Department (optional)" value={staff.department} onChange={v=>update(setStaff,'department',v)} placeholder="Administration"/><Field label="Email" type="email" value={staff.email} onChange={v=>update(setStaff,'email',v)} placeholder="admin@campus.edu"/><Field label="Password" type="password" value={staff.password} onChange={v=>update(setStaff,'password',v)} placeholder="At least 8 characters"/></div></div>
}
function Field({label,value,onChange,placeholder,type='text'}:{label:string;value:string;onChange:(v:string)=>void;placeholder?:string;type?:string}){return <label className="text-sm font-medium">{label}<input required={label!=='Department (optional)'} type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"/></label>}
