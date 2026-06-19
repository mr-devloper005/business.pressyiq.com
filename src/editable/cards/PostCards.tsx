import Link from 'next/link'
import { ArrowRight, Clock3, FileText, ImageIcon, Newspaper } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

const mediaTitles = [
  'How Media Distribution Turns Announcements Into Wider Coverage',
  'Building Brand Visibility With Publisher-Ready Release Campaigns',
  'A Faster Way To Share Company News Across Media Outlets',
  'How Coverage Reports Help Teams Track Every Release',
  'Expanding Product Launch Reach With Press Release Distribution',
  'White-Label Media Distribution Built For Agencies And Brands',
  'Turning Business Updates Into Searchable Media Coverage',
  'Planning Announcement Campaigns With Clear Placement Reports',
]

const mediaDescriptions = [
  'A media distribution campaign prepared to help brands package announcements, reach publisher-style networks, and track visibility with clear reporting.',
  'Press release distribution gives product launches, company updates, and reputation campaigns a cleaner path from draft to published coverage.',
  'Guided release support helps teams refine headlines, summaries, links, and campaign details before sharing news across wider media surfaces.',
  'Publisher-ready formatting, outlet selection, and placement reports make every announcement easier to distribute, monitor, and share.',
  'A practical campaign workflow for brands that need more visibility, clearer reporting, and dependable support around public announcements.',
  'Media outreach support designed for agencies, resellers, and growing teams that want consistent release delivery and white-label reporting.',
  'Distribution planning helps announcements move beyond one channel so customers, partners, and searchers can discover the update faster.',
  'Coverage tracking keeps launch, funding, partnership, and reputation updates organized from submission through published placement links.',
]

const mediaCategories = ['Media release', 'Campaign coverage', 'Publisher network', 'Brand visibility', 'Press distribution']

function stablePostIndex(post?: SitePost | null, size = mediaTitles.length) {
  const source = `${post?.slug || ''}${post?.id || ''}${post?.title || ''}` || 'media-distribution'
  return Array.from(source).reduce((sum, char) => sum + char.charCodeAt(0), 0) % size
}

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableTitle(post?: SitePost | null) {
  return mediaTitles[stablePostIndex(post)]
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const value = mediaDescriptions[stablePostIndex(post, mediaDescriptions.length)]
  return value.length > limit ? `${value.slice(0, limit).trim()}...` : value
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw = (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
  if (!raw || /v-news|uncategorized|business/i.test(raw)) {
    return mediaCategories[stablePostIndex(post, mediaCategories.length)]
  }
  return raw
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured release' }: { post: SitePost; href: string; label?: string }) {
  const title = getEditableTitle(post)
  return (
    <Link href={href} className="group block overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(24,42,64,.1)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(24,42,64,.16)]">
      <div className="relative aspect-[16/9] min-h-[360px] overflow-hidden bg-slate-100">
        <img src={getEditablePostImage(post)} alt={title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--slot4-accent)]"><Newspaper className="h-4 w-4" /> {label}</span>
          <h3 className="mt-5 max-w-4xl text-4xl font-black leading-[1] tracking-[-0.045em] sm:text-5xl">{title}</h3>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-white/82">{getEditableExcerpt(post, 170)}</p>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const title = getEditableTitle(post)
  return (
    <Link href={href} className="group block w-[290px] shrink-0 snap-start overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(24,42,64,.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(24,42,64,.14)] sm:w-[340px]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img src={getEditablePostImage(post)} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</span>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-400">
          <span>Release {String(index + 1).padStart(2, '0')}</span>
          <ArrowRight className="h-4 w-4 text-[var(--slot4-accent)]" />
        </div>
        <h3 className="mt-3 line-clamp-3 text-xl font-black leading-tight tracking-[-0.035em] text-slate-950">{title}</h3>
        <p className="mt-3 line-clamp-2 text-sm font-medium leading-6 text-slate-500">{getEditableExcerpt(post, 105)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const title = getEditableTitle(post)
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[42px_1fr] gap-4 rounded-2xl p-3 transition hover:bg-slate-50">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-sm font-black text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-base font-black leading-tight tracking-[-0.02em] text-slate-900 group-hover:text-[var(--slot4-accent)]">{title}</h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const title = getEditableTitle(post)
  const imageFirst = index % 3 === 0
  if (imageFirst) {
    return (
      <Link href={href} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(24,42,64,.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(24,42,64,.14)]">
        <div className="aspect-[16/10] overflow-hidden bg-slate-100">
          <img src={getEditablePostImage(post)} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        </div>
        <div className="p-5">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
          <h2 className="mt-3 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em]">{title}</h2>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{getEditableExcerpt(post, 150)}</p>
        </div>
      </Link>
    )
  }

  return (
    <Link href={href} className="group grid min-w-0 gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-[0_10px_28px_rgba(24,42,64,.07)] transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(24,42,64,.13)] sm:grid-cols-[170px_minmax(0,1fr)]">
      <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-auto">
        <img src={getEditablePostImage(post)} alt={title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h2 className="mt-3 line-clamp-2 text-2xl font-black leading-tight tracking-[-0.04em] group-hover:text-[var(--slot4-accent)]">{title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{getEditableExcerpt(post, 140)}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-slate-900">Read update <ArrowRight className="h-4 w-4 text-[var(--slot4-accent)]" /></span>
      </div>
    </Link>
  )
}

export function MinimalTextCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const title = getEditableTitle(post)
  return (
    <Link href={href} className="group block rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(24,42,64,.12)]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">Brief {String(index + 1).padStart(2, '0')}</span>
        <FileText className="h-5 w-5 text-[var(--slot4-accent)]" />
      </div>
      <h3 className="mt-8 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.04em]">{title}</h3>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-500">{getEditableExcerpt(post, 170)}</p>
    </Link>
  )
}

export function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  const title = getEditableTitle(post)
  return (
    <Link href={href} className="group relative block min-h-[420px] overflow-hidden rounded-[1.7rem] bg-slate-950 text-white shadow-[0_20px_56px_rgba(24,42,64,.18)]">
      <img src={getEditablePostImage(post)} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/18 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]"><ImageIcon className="h-3 w-3" /> Visual story</span>
        <h3 className="mt-4 text-3xl font-black leading-tight tracking-[-0.045em]">{title}</h3>
      </div>
    </Link>
  )
}
