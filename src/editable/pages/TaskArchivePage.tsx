import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Newspaper, Search, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { ArticleListCard, EditorialFeatureCard, ImageFirstCard, MinimalTextCard, getEditableCategory, getEditableExcerpt, getEditableTitle, postHref } from '@/editable/cards/PostCards'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const placeholder = '/placeholder.svg?height=900&width=1200'
const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getCategory = (post: SitePost, fallback: string) => getEditableCategory(post) || fallback
const getSummary = (post: SitePost) => getEditableExcerpt(post, 170)
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; badge: string; promise: string }> = {
  mediaDistribution: { icon: Newspaper, badge: 'Distribution desk', promise: 'Browse public announcements, release notes, media placements, and visibility updates.' },
  article: { icon: FileText, badge: 'Editorial desk', promise: 'Read articles, announcements, perspectives, and updates in a clean publication view.' },
  listing: { icon: Building2, badge: 'Directory', promise: 'Find businesses, service profiles, locations, and contact-ready listings.' },
  classified: { icon: Megaphone, badge: 'Offer board', promise: 'Browse short-form offers, notices, product details, and opportunity posts.' },
  image: { icon: Camera, badge: 'Visual library', promise: 'Explore image-led posts with strong previews and quick discovery.' },
  sbm: { icon: Bookmark, badge: 'Saved resources', promise: 'Scan useful links, resources, and public bookmarks in a compact card layout.' },
  pdf: { icon: Download, badge: 'Document shelf', promise: 'Open documents, reports, guides, and downloadable resources.' },
  profile: { icon: UserRound, badge: 'Profile index', promise: 'Discover people, contributors, companies, and profile-style entries.' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': preset.colors.background, '--archive-text': preset.colors.foreground, '--archive-surface': preset.colors.surface, '--archive-accent': '#2b7db7' } as CSSProperties
  const dynamicCategories = Array.from(new Map([
    ...CATEGORY_OPTIONS,
    ...posts.map((post) => {
      const raw = getCategory(post, '')
      return raw ? { name: raw, slug: normalizeCategory(raw) } : null
    }).filter((item): item is { name: string; slug: string } => Boolean(item)),
  ].map((item) => [item.slug, item])).values())
  const categoryLabel = category === 'all' ? 'All categories' : dynamicCategories.find((item) => item.slug === category)?.name || category

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[linear-gradient(180deg,#fff_0%,#f7fbff_46%,#fff_100%)] text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-100 py-14 sm:py-20">
          <div className="pointer-events-none absolute -left-28 top-14 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 top-28 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />
          <div className="relative mx-auto grid max-w-[1280px] gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black text-[var(--slot4-accent)] shadow-sm"><Icon className="h-4 w-4" /> {deck.badge}</div>
              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-7xl">
                {category === 'all' ? (voice?.headline || `Browse ${label}`) : categoryLabel}
              </h1>
              <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-slate-600">{voice?.description || deck.promise}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={basePath} className="rounded-xl bg-[var(--slot4-accent)] px-6 py-3 text-sm font-black text-white shadow-[0_12px_28px_rgba(43,125,183,.22)]">Browse all</Link>
                <Link href="/search" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm">Search posts</Link>
              </div>
            </div>
            <form action={basePath} className="self-end rounded-[1.5rem] border border-slate-200 bg-white/90 p-5 shadow-[0_16px_44px_rgba(24,42,64,.09)] backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-slate-400"><Filter className="h-4 w-4" /> Filter by category</div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold outline-none">
                <option value="all">All categories</option>
                {dynamicCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
              </select>
              <button className="mt-3 h-12 w-full rounded-xl bg-slate-950 text-sm font-black text-white">Apply filter</button>
              <p className="mt-3 text-xs font-bold text-slate-400">Showing: {categoryLabel}</p>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          {posts.length ? (
            <ArchiveLayout posts={posts} task={task} basePath={basePath} label={label} />
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <Search className="mx-auto h-9 w-9 text-slate-300" />
              <h2 className="mt-5 text-3xl font-black tracking-[-0.04em]">No posts found</h2>
              <p className="mt-2 text-sm font-medium text-slate-500">Try another category or refresh after publishing new content.</p>
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black shadow-sm">Previous</Link> : null}
            <span className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-black shadow-sm">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchiveLayout({ posts, task, basePath, label }: { posts: SitePost[]; task: TaskKey; basePath: string; label: string }) {
  if (task === 'mediaDistribution' || task === 'article') {
    const lead = posts[0]
    const rest = posts.slice(1)
    return (
      <div className="grid gap-8">
        {lead ? <EditorialFeatureCard post={lead} href={postHref(task, lead, basePath)} label={`Featured ${label}`} /> : null}
        <div className="grid gap-5 lg:grid-cols-2">
          {rest.map((post, index) => <ArticleListCard key={post.id || post.slug} post={post} href={postHref(task, post, basePath)} index={index} />)}
        </div>
      </div>
    )
  }

  if (task === 'image') {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post, index) => index % 5 === 0 ? <ImageFirstCard key={post.id || post.slug} post={post} href={`${basePath}/${post.slug}`} /> : <ImageArchiveCard key={post.id || post.slug} post={post} href={`${basePath}/${post.slug}`} index={index} />)}
      </div>
    )
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
    </div>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  return <MinimalTextCard post={post} href={href} index={index} />
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const title = getEditableTitle(post)
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(24,42,64,.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(24,42,64,.14)]">
      <div className={index % 3 === 0 ? 'aspect-[3/4] overflow-hidden bg-slate-100' : 'aspect-[4/3] overflow-hidden bg-slate-100'}>
        <img src={getImage(post)} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.035em]">{title}</h2>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const title = getEditableTitle(post)
  const logo = getImages(post)[0]
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-[0_12px_34px_rgba(24,42,64,.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(24,42,64,.14)] sm:grid-cols-[110px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 ring-1 ring-slate-200">
        {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 text-[var(--slot4-accent)]" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-slate-950 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-slate-500"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.04em]">{title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-slate-500 sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const title = getEditableTitle(post)
  const image = getImages(post)[0]
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(24,42,64,.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(24,42,64,.14)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-slate-950 p-6 text-white">
          <span className="rounded-full bg-white/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.055em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/70">{location || 'Details inside'}</p>
          {image ? <img src={image} alt="" className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.04em]">{title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-500">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const title = getEditableTitle(post)
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:bg-slate-950 hover:text-white hover:shadow-[0_20px_50px_rgba(24,42,64,.14)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.04em]">{title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.14em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const title = getEditableTitle(post)
  return (
    <Link href={href} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(24,42,64,.14)]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-slate-950 p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{getCategory(post, 'PDF')}</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.04em]">{title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-500">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const title = getEditableTitle(post)
  const avatar = getImages(post)[0]
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(24,42,64,.14)]">
      <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-blue-50 ring-1 ring-slate-200">
        {avatar ? <img src={avatar} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 text-[var(--slot4-accent)]" />}
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.035em]">{title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">{getSummary(post)}</p>
    </Link>
  )
}
