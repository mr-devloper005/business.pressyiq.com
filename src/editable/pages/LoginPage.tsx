import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#fff_0%,#f7fbff_52%,#fff_100%)] text-slate-950">
        <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 top-40 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
              <h1 className="mt-8 max-w-xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-7xl">{pagesContent.auth.login.title}</h1>
              <p className="mt-6 max-w-xl text-xl font-semibold leading-9 text-slate-600">{pagesContent.auth.login.description}</p>
              <div className="mt-8 grid gap-3 text-sm font-bold text-slate-600">
                {['Manage release drafts', 'Continue distribution requests', 'Access publishing tools'].map((item) => <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[var(--slot4-accent)]" /> {item}</span>)}
              </div>
            </div>
            <div className="rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-10">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">Account access</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.04em]">{pagesContent.auth.login.formTitle}</h2>
              <EditableLocalLoginForm />
              <p className="mt-6 border-t border-slate-200 pt-5 text-sm font-medium text-slate-600">New here? <Link href="/signup" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
