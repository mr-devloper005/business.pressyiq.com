import Link from 'next/link'
import { ArrowRight, Briefcase, Check, ChevronDown, Globe2, LockKeyhole, Mail, Rocket, Search, ShieldCheck, Sparkles, Tags, Wand2, Zap } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { CompactIndexCard, EditorialFeatureCard, ImageFirstCard, MinimalTextCard, RailPostCard, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const partners = ['Newswire', 'AP', 'MarketWatch', 'USA TODAY', 'Yahoo', 'Digital Journal', 'StreetInsider', 'Barchart']
const stats = [
  ['500+', 'Media Outlets'],
  ['1M+', 'Releases Distributed'],
  ['10K+', 'Brand Campaigns'],
  ['93%', 'Distribution Success'],
]
const features = [
  { icon: Wand2, title: 'Release Writing Support', text: 'Shape announcements with cleaner headlines, summaries, campaign details, and media-ready formatting.' },
  { icon: Zap, title: 'Fast Media Distribution', text: 'Move from submission to publisher outreach quickly with a simple workflow for time-sensitive announcements.' },
  { icon: Globe2, title: 'Publisher Network Reach', text: 'Place brand updates across wider media surfaces so customers, partners, and searchers can discover them faster.' },
  { icon: ShieldCheck, title: 'Coverage & Link Reports', text: 'Track live placements, outlet links, campaign proof, and visibility signals in a shareable report.' },
  { icon: Briefcase, title: 'Agency & White-Label Ready', text: 'Support client campaigns with polished reports and distribution workflows that fit agency operations.' },
  { icon: Mail, title: 'Distribution Support', text: 'Get help with release details, category selection, timing, formatting, and publication questions.' },
]
const testimonials = [
  ['RE', 'Roy E.', 'Our launch announcement moved quickly, and the final placement report was simple enough to share with the whole team.'],
  ['SJ', '@brandops', 'A much easier way to send a company update across media outlets without managing every publisher manually.'],
  ['BS', 'Bessie S.', 'The distribution flow was clear, and support helped tighten the release before it went out.'],
  ['MJ', 'Mary J.', 'We needed wider visibility for a product update. The process was straightforward from draft to report.'],
  ['SV', 'Sarah V.', 'Our correction request was handled before publication, which protected the announcement and the client relationship.'],
  ['AS', 'Arthur S.', 'Useful when a brand needs media exposure quickly, with friendly support and practical campaign tracking.'],
]
const faqs = [
  ['How fast can a media distribution campaign start?', 'A campaign can begin soon after submission. Timing depends on release completeness, category fit, publisher review, and selected distribution reach.'],
  ["What happens if a release needs changes?", 'Support can help review the issue, update details, and confirm the next available publication or correction path.'],
  ['Can I include images, links, or company details?', 'Yes. Releases can include summaries, website links, brand details, images, and supporting information when available.'],
  ['How does distribution reporting work?', 'Reports are designed to show live placements, outlet links, and useful proof points for your brand or client campaign.'],
  ['Is this useful for agencies and resellers?', 'Yes. The workflow supports recurring campaigns, white-label reporting needs, and client-facing media visibility work.'],
]

function mainRoute(primaryRoute: string) {
  return primaryRoute || '/media-distribution'
}

export function EditableHomeHero({ primaryRoute: _primaryRoute }: HomeSectionProps) {
  return (
    <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20 lg:pb-0">
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-36 top-56 h-[30rem] w-[30rem] rounded-full bg-pink-200/32 blur-3xl" />
      <div className={`${dc.shell.section} relative text-center`}>
        
        <h1 className="animate-fade-up mx-auto mt-9 max-w-5xl text-6xl font-black leading-[0.95] tracking-[-0.06em] text-slate-950 sm:text-7xl lg:text-[6.3rem]">
          Wider Media Reach,<br /><span className="press-gradient-text">Clearer Brand Visibility.</span>
        </h1>
        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium leading-8 text-slate-600 sm:text-2xl">
          Distribute press releases, product launches, and company announcements across media outlets with guided delivery, campaign reporting, and support that starts at $15.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/about" className={`${dc.button.primary} animate-pulse-glow`}>About Us <ArrowRight className="h-5 w-5" /></Link>
          <Link href="/contact" className={dc.button.secondary}>Contact Us</Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-slate-500">
          {['Same-Day Campaign Flow', 'White-Label Reports', 'Plans From $15', 'Human Distribution Support'].map((item) => (
            <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#497cff]" /> {item}</span>
          ))}
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl border-t border-slate-200 pt-8 sm:grid-cols-4">
          {stats.map(([value, label]) => (
            <div key={label} className="py-3 text-center">
              <p className="text-3xl font-black text-[var(--slot4-accent)]">{value}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 10)
  return (
    <section className="border-y border-slate-100 bg-white py-16">
      <div className="mx-auto max-w-[1600px] overflow-hidden">
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-[-0.04em] text-slate-950">Media Network Reach</h2>
          <p className="mt-3 text-lg font-medium text-slate-400">Announcements prepared for broader discovery across publisher-style networks</p>
        </div>
        <div className="mt-12 flex overflow-hidden">
          <div className="auto-slider flex min-w-max items-center gap-20 px-10">
            {[...partners, ...partners].map((item, index) => (
              <div key={`${item}-${index}`} className="flex h-20 min-w-28 items-center justify-center text-4xl font-black text-slate-800/80">
                <span className={item === 'Spotify' ? 'rounded-full bg-emerald-400 px-4 py-3 text-xl text-white' : item === 'USA TODAY' ? 'rounded-full bg-blue-400 p-4 text-sm leading-none text-white' : ''}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        {railPosts.length ? (
          <div className={`${dc.shell.section} mt-16`}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className={dc.type.eyebrow + ' text-[var(--slot4-accent)]'}>Latest media updates</p>
                <h3 className="mt-3 text-4xl font-black tracking-[-0.04em]">Recent distribution campaigns</h3>
              </div>
              <Link href={mainRoute(primaryRoute)} className="text-sm font-black text-[var(--slot4-accent)]">View all <ArrowRight className="inline h-4 w-4" /></Link>
            </div>
            <div className={dc.layout.rail}>
              {railPosts.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const listPosts = posts.slice(1, 7)
  return (
    <>
      <section className="bg-white py-20 sm:py-24">
        <div className={`${dc.shell.section}`}>
          <div className="mx-auto max-w-4xl text-center">
            
            <h2 className="mt-8 text-5xl font-black leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-7xl">Distribution Built<br /><span className="press-gradient-text">For Announcements That Need Reach</span></h2>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="grid gap-5">
              {[
                [LockKeyhole, 'Traditional Campaigns Can Get Expensive', 'Legacy distribution often adds contracts, hidden fees, and slower coordination.'],
                [Tags, 'Start Distribution From $15', 'A straightforward path for getting company news in front of more readers.'],
                [Sparkles, 'Built For Efficient Visibility', 'Guided workflows help keep publishing, reporting, and campaign support simple.'],
              ].map(([Icon, title, text]) => {
                const RealIcon = Icon as typeof LockKeyhole
                return (
                  <div key={String(title)} className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(24,42,64,.08)]">
                    <div className="grid gap-5 sm:grid-cols-[44px_1fr]">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[var(--slot4-accent)]"><RealIcon className="h-5 w-5" /></span>
                      <div>
                        <h3 className="text-xl font-black text-slate-950">{String(title)}</h3>
                        <p className="mt-2 text-base font-medium leading-7 text-slate-500">{String(text)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="animate-float-soft overflow-hidden rounded-[1.5rem] bg-slate-950 shadow-[0_28px_80px_rgba(24,42,64,.22)]">
              <div className="grid min-h-[340px] grid-cols-2">
                <div className="bg-[#260a13] p-8 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-red-300">Traditional Campaign</p>
                  
                  <p className="mt-1 text-sm text-white/70">per release</p>
                  <div className="mt-8 grid gap-3 text-sm font-bold text-red-200">
                    <span>x Expensive contracts</span><span>x Slow coordination</span><span>x Limited reporting</span>
                  </div>
                </div>
                <div className="bg-[var(--slot4-accent)] p-8 text-right text-white">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-100">{SITE_CONFIG.name}</p>
                  
                  <p className="mt-1 text-sm text-blue-100">starter campaign</p>
                  <div className="mt-8 grid gap-3 text-sm font-bold text-blue-50">
                    <span>500+ outlet reach</span><span>Campaign reporting</span><span>White-label ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {feature ? (
            <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
              <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} />
              <div className="grid gap-4">
                {listPosts.slice(0, 4).map((post, index) => <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className={`${dc.shell.section}`}>
          <div className="text-center">
           
           
            <h2 className="mt-8 text-5xl font-black tracking-[-0.05em] text-slate-950 sm:text-6xl">Everything Needed For Media Visibility</h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-medium leading-8 text-slate-600">Guided publishing, wider outlet reach, and practical reports help every announcement move with more confidence.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-[1.45rem] border border-slate-200 bg-white p-8 shadow-[0_16px_44px_rgba(24,42,64,.09)] transition hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(24,42,64,.14)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-200 bg-white text-[var(--slot4-accent)] shadow-[0_10px_22px_rgba(24,42,64,.1)]"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-8 text-2xl font-black leading-tight tracking-[-0.035em] text-slate-950">{title}</h3>
                <p className="mt-4 text-base font-medium leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = (collected.length ? collected : posts).slice(0, 12)
  return (
    <>
      <section id="resellers" className="bg-white py-20 sm:py-24">
        <div className={`${dc.shell.section} text-center`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-sm font-black text-[var(--slot4-accent)]"><Briefcase className="h-4 w-4" /> Agency / White Label</div>
          <h2 className="mt-7 text-5xl font-black tracking-[-0.05em] text-slate-950">Built For Agencies And Brands</h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-medium leading-8 text-slate-600">Scale recurring release campaigns with clear reports, straightforward pricing, and simple publishing access.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['Media Campaign Support', 'Agency-Friendly Reports', 'White-Label Delivery', 'Recurring Release Workflows'].map((item) => <span key={item} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm">{item}</span>)}
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <Link href="/signup" className={dc.button.primary}>Start A Campaign <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/contact" className={dc.button.secondary}>Learn More</Link>
          </div>
        </div>
      </section>

      {source.length ? (
        <section className="overflow-hidden bg-white py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--slot4-accent)]"><Rocket className="h-4 w-4" /> Campaign Stories</div>
            <h2 className="mt-8 text-5xl font-black leading-[1] tracking-[-0.05em] text-slate-950">Real Visibility For<br /><span className="press-gradient-text">Real Announcements</span></h2>
            <p className="mt-6 text-xl font-medium text-slate-600">See how brand updates and media distribution campaigns keep moving.</p>
          </div>
          <div className="mt-14 flex overflow-hidden">
            <div className="auto-slider flex min-w-max gap-6 px-4">
              {[...testimonials, ...testimonials].map(([initials, name, quote], index) => (
                <div key={`${name}-${index}`} className="w-[360px] rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(24,42,64,.08)]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-black text-slate-500">{initials}</span><span className="font-black text-slate-800">{name}</span></div>
                    <span className="text-emerald-500">*</span>
                  </div>
                  <p className="mt-6 text-base font-medium leading-7 text-slate-600">&quot;{quote}&quot;</p>
                  <p className="mt-4 text-yellow-400">*****</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${dc.shell.section} mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3`}>
            {source.slice(0, 6).map((post, index) => index === 0 ? <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} /> : <MinimalTextCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </section>
      ) : null}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <>
      <section id="faq" className="bg-[linear-gradient(180deg,#fff_0%,#f7fbff_100%)] py-20 sm:py-24">
        <div className={`${dc.shell.section}`}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--slot4-accent)]"><Search className="h-4 w-4" /> Frequently Asked</div>
            <h2 className="mt-7 text-5xl font-black leading-[1] tracking-[-0.05em] text-slate-950">Media Distribution Questions?<br /><span className="press-gradient-text">We&apos;ve Got Answers</span></h2>
            <p className="mx-auto mt-5 max-w-2xl text-xl font-medium leading-8 text-slate-600">Everything you need to know about distributing announcements, tracking coverage, and improving visibility.</p>
          </div>
          <div className="mx-auto mt-14 max-w-4xl space-y-4">
            {faqs.map(([question, answer], index) => (
              <details key={question} className="group rounded-2xl bg-white p-6 shadow-[0_14px_36px_rgba(24,42,64,.09)]" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-black text-slate-950">
                  {question}
                  <ChevronDown className="h-5 w-5 text-[var(--slot4-accent)] transition group-open:rotate-180" />
                </summary>
                <p className="mt-6 text-base font-medium leading-8 text-slate-600">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-20 text-center sm:py-24">
        <div className={`${dc.shell.section}`}>
          <h2 className="mx-auto max-w-4xl text-6xl font-black leading-[0.96] tracking-[-0.06em] text-slate-950">Ready To Launch<br /><span className="text-[var(--slot4-accent)]">A Media Campaign?</span></h2>
          <p className="mx-auto mt-8 max-w-3xl text-2xl font-medium leading-9 text-slate-600">Publish clearer announcements, reach wider audiences, and keep every distribution result easy to track.</p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/signup" className={`${dc.button.primary} min-w-72`}>Launch Your Release <ArrowRight className="h-5 w-5" /></Link>
            <Link href="/contact" className={`${dc.button.secondary} min-w-56`}>Contact Us</Link>
          </div>
         
        </div>
      </section>
    </>
  )
}
