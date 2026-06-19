import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#fff_0%,#f7fbff_48%,#fff_100%)] text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-100 py-16 sm:py-24">
          <div className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 top-32 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <p className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-7xl">
              {pagesContent.about.title}
            </h1>
            <p className="mt-7 max-w-3xl text-xl font-semibold leading-9 text-slate-600">{pagesContent.about.description}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1280px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8 lg:py-20">
          <article className="rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-10">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">About {SITE_CONFIG.name}</p>
              <div className="article-content mt-8">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/login" className="inline-flex items-center gap-2 rounded-xl bg-[var(--slot4-accent)] px-6 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(43,125,183,.22)]">Browse releases <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm">Contact support</Link>
            </div>
          </article>
          <aside className="grid gap-5">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <CheckCircle2 className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <span className="text-xs font-black text-slate-300">0{index + 1}</span>
                </div>
                <h2 className="mt-5 text-2xl font-black leading-tight tracking-[-0.035em]">{value.title}</h2>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>

        <section className="bg-[var(--slot4-dark-bg)] text-white">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-[-0.045em] sm:text-5xl">Ready to move an announcement into wider public view?</h2>
            <Link href="/signup" className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-black text-slate-950">Start distribution <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
