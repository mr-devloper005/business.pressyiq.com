'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Release planning', body: 'Ask about formatting, summaries, categories, timing, and preparing an announcement for distribution.' },
  { icon: Megaphone, title: 'Media distribution', body: 'Discuss publisher reach, campaign visibility, reporting, white-label use, and outlet-style placement needs.' },
  { icon: Mail, title: 'Account support', body: 'Get help with login access, submissions, corrections, publishing questions, or contact workflow details.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#fff_0%,#f7fbff_52%,#fff_100%)] text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-100 py-14 sm:py-20">
          <div className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <p className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-7xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-9 text-slate-600">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8 lg:py-20">
          <aside className="grid gap-5">
            {desks.map((desk, index) => (
              <div key={desk.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between"><desk.icon className="h-6 w-6 text-[var(--slot4-accent)]" /><span className="text-xs font-black text-slate-300">0{index + 1}</span></div>
                <h2 className="mt-6 text-2xl font-black tracking-[-0.035em]">{desk.title}</h2>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{desk.body}</p>
              </div>
            ))}
          </aside>
          <div className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">Send a message</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
