'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function EditableContactLeadForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setMessage('')
    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data?.message || 'Unable to send your request.')
      setStatus('success')
      setMessage(data?.message || 'Thanks. Your distribution request has been received.')
      form.reset()
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Unable to send your request.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 border-t border-slate-200 bg-white pt-7">
      <div className="grid gap-4 md:grid-cols-2">
        <Field name="name" label="Full name" placeholder="Your name" required />
        <Field name="email" type="email" label="Email address" placeholder="you@example.com" required />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Field name="phone" label="Phone number" placeholder="Optional" />
        <Field name="subject" label="Release topic" placeholder="What are you announcing?" />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-black text-slate-700">
        Distribution details
        <textarea name="message" required rows={6} placeholder="Tell us about your release, target audience, timing, and support needs..." className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium outline-none transition focus:border-[var(--slot4-accent)]" />
      </label>
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {message ? (
        <div className={`mt-5 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm font-bold ${status === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
          {status === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
          <span>{message}</span>
        </div>
      ) : null}
      <button type="submit" disabled={status === 'submitting'} className="mt-6 inline-flex h-[3.25rem] w-full items-center justify-center gap-2 rounded-xl bg-[var(--slot4-accent)] px-6 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_28px_rgba(43,125,183,.22)] transition hover:bg-[#226897] disabled:cursor-not-allowed disabled:opacity-70">
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Send distribution request
      </button>
    </form>
  )
}

function Field({ name, label, type = 'text', placeholder, required = false }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-700">
      {label}
      <input name={name} type={type} required={required} placeholder={placeholder} className="h-[3.25rem] rounded-xl border border-slate-200 bg-white px-4 text-base font-medium outline-none transition focus:border-[var(--slot4-accent)]" />
    </label>
  )
}
