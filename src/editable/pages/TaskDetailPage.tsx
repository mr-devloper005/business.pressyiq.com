import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import { ArrowLeft, Bookmark, Building2, Camera, CheckCircle2, Download, ExternalLink, FileText, Globe2, Mail, MapPin, MessageCircle, Phone, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { getEditableCategory, getEditableExcerpt, getEditableTitle } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' || task === 'mediaDistribution' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singleImages].filter(Boolean).slice(0, 12)
}

const getBody = (post: SitePost) => {
  const title = getEditableTitle(post)
  const summary = getEditableExcerpt(post, 220)
  return `${title}\n\n${summary}\n\nThis media distribution update is prepared for teams that want clearer announcements, broader publisher-style reach, and practical coverage reporting. The campaign can support press releases, product launches, reputation updates, agency workflows, and brand visibility programs.\n\nEach release can include a focused headline, supporting summary, relevant links, images, company details, and reporting notes so the announcement is easier to review, publish, and track.`
}

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const safeUrl = (value: string) => /^https?:\/\//i.test(value) ? value : '#'

const linkifyMarkdown = (value: string) => value
  .replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) => linkifyMarkdown(value)
  .replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) => html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
  let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\starget=/i.test(next)) next += ' target="_blank"'
  if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
  return `<a ${next}>`
})

const sanitizeHtml = (html: string) => hardenLinks(html
  .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
  .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"'))

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => getEditableExcerpt(post, 220)
const categoryOf = (post: SitePost, fallback: string) => getEditableCategory(post) || fallback
const titleOf = (post: SitePost) => getEditableTitle(post)
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const detailVars = { '--detail-bg': preset.colors.background, '--detail-text': preset.colors.foreground, '--detail-surface': preset.colors.surface, '--detail-accent': '#2b7db7' } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[linear-gradient(180deg,#fff_0%,#f7fbff_48%,#fff_100%)] text-slate-950">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' || task === 'mediaDistribution' ? <ArticleDetail task={task} post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-slate-600 shadow-sm transition hover:text-[var(--slot4-accent)]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function ArticleDetail({ task, post, related, comments }: { task: TaskKey; post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  const published = post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''
  const title = titleOf(post)
  return (
    <section>
      <header className="relative overflow-hidden border-b border-slate-100 py-12 sm:py-16">
        <div className="pointer-events-none absolute -left-28 top-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-28 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />
        <div className="relative mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <BackLink task={task} />
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-[var(--slot4-accent)]">{categoryOf(post, 'News')}</span>
            {published ? <time>{published}</time> : null}
            <span>{SITE_CONFIG.name}</span>
          </div>
          <h1 className="mt-6 max-w-6xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-[5.5rem]">{title}</h1>
          {summaryText(post) ? <p className="mt-7 max-w-4xl text-xl font-semibold leading-8 text-slate-600 sm:text-2xl">{summaryText(post)}</p> : null}
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8">
        {images[0] ? (
          <figure className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-[0_20px_56px_rgba(24,42,64,.12)]">
            <img src={images[0]} alt="" className="max-h-[720px] w-full object-cover" />
            <figcaption className="border-t border-slate-100 px-5 py-3 text-sm font-medium text-slate-400">Featured image for {title}</figcaption>
          </figure>
        ) : null}
      </div>

      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,760px)_320px] lg:px-8 lg:pb-20">
        <article className="min-w-0 rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
          <BodyContent post={post} />
          <EditableComments slug={post.slug} comments={comments} />
        </article>
        <RelatedPanel task={task} post={post} related={related} />
      </div>
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-8 grid gap-7 lg:grid-cols-[minmax(0,1fr)_400px]">
        <article className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[1.4rem] bg-blue-50 ring-1 ring-slate-200">
              {logo ? <img src={logo} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 text-[var(--slot4-accent)]" />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Business listing</p>
              <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl">{titleOf(post)}</h1>
              <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || titleOf(post)} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[1280px] gap-7 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16">
      <aside className="rounded-[1.7rem] bg-slate-950 p-7 text-white shadow-xl lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-xs font-black uppercase tracking-[0.18em] text-white/55">Classified notice</p>
        <h1 className="mt-4 text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl">{titleOf(post)}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <ContactAction website={website} phone={phone} email={email} dark />
      </aside>
      <article className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="image" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-sm lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white"><Camera className="h-4 w-4" /> Image story</div>
          <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-5xl">{titleOf(post)}</h1>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">{summaryText(post)}</p>
          <BodyContent post={post} compact />
        </aside>
        <div className="columns-1 gap-5 space-y-5 md:columns-2">
          {(images.length ? images : ['/placeholder.svg?height=900&width=1200']).map((image, index) => (
            <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
              <img src={image} alt="" className="w-full object-cover" />
              {index === 0 ? <figcaption className="p-5 text-sm font-bold text-slate-500">Featured visual from this image post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-10">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-950 text-white"><Bookmark className="h-9 w-9" /></div>
        <h1 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl">{titleOf(post)}</h1>
        <p className="mt-5 max-w-3xl text-lg font-medium leading-9 text-slate-600">{summaryText(post)}</p>
        {website ? <Link href={safeExternal(website)} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Open saved resource <ExternalLink className="h-4 w-4" /></Link> : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  return (
    <section className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-[1.7rem] border border-slate-200 bg-white p-6 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-9">
        <BackLink task="pdf" />
        <div className="mt-8 grid gap-6 sm:grid-cols-[120px_1fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-slate-950 text-white"><FileText className="h-12 w-12" /></div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">PDF resource</p>
            <h1 className="mt-3 text-4xl font-black leading-[0.98] tracking-[-0.055em] sm:text-6xl">{titleOf(post)}</h1>
          </div>
        </div>
        <BodyContent post={post} />
        {fileUrl ? (
          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white p-4">
              <span className="text-sm font-black">Document preview</span>
              <Link href={safeExternal(fileUrl)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-xs font-black text-white">Download <Download className="h-4 w-4" /></Link>
            </div>
            <iframe src={`${safeExternal(fileUrl)}#toolbar=0&navpanes=0&scrollbar=0`} title={titleOf(post)} className="h-[78vh] w-full" />
          </div>
        ) : null}
      </article>
      <RelatedPanel task="pdf" post={post} related={related} />
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:px-8 lg:py-16">
      <aside className="rounded-[1.7rem] border border-slate-200 bg-white p-8 text-center shadow-[0_20px_56px_rgba(24,42,64,.1)] lg:sticky lg:top-24 lg:self-start">
        <BackLink task="profile" />
        <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-blue-50 ring-1 ring-slate-200">
          {images[0] ? <img src={images[0]} alt="" className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 text-[var(--slot4-accent)]" />}
        </div>
        <h1 className="mt-6 text-4xl font-black leading-[0.98] tracking-[-0.055em]">{titleOf(post)}</h1>
        {role ? <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{role}</p> : null}
        <ContactAction website={website} email={email} />
      </aside>
      <article className="rounded-[1.7rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
        <BodyContent post={post} />
        <ImageStrip images={images.slice(1)} label="Profile gallery" />
        <RelatedPanel task="profile" post={post} related={related} />
      </article>
    </section>
  )
}

function safeExternal(value: string) {
  if (!value) return '#'
  if (/^https?:\/\//i.test(value) || value.startsWith('/')) return value
  return `https://${value}`
}

function BodyContent({ post, compact = false }: { post: SitePost; compact?: boolean }) {
  return <div className={`article-content max-w-none ${compact ? 'mt-6 text-base leading-8' : 'mt-8 text-lg leading-9'}`} dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-400"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm font-bold leading-6 text-slate-700">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] rounded-2xl object-cover ring-1 ring-slate-200" />)}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 p-4 text-sm font-black"><MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email, dark = false }: { website?: string; phone?: string; email?: string; dark?: boolean }) {
  if (!website && !phone && !email) return null
  return (
    <div className={`mt-5 rounded-[1.5rem] border p-5 shadow-sm ${dark ? 'border-white/15 bg-white/8 text-white' : 'border-slate-200 bg-white text-slate-950'}`}>
      <p className={`text-xs font-black uppercase tracking-[0.16em] ${dark ? 'text-white/50' : 'text-slate-400'}`}>Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={safeExternal(website)} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black ${dark ? 'bg-white text-slate-950' : 'bg-slate-950 text-white'}`}>Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-black ${dark ? 'border-white/20' : 'border-slate-200'}`}><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-black ${dark ? 'border-white/20' : 'border-slate-200'}`}><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm"><span className="font-black uppercase tracking-[0.14em] text-white/55">{label}</span><span className="font-black">{value}</span></div>
}

function RelatedPanel({ task, post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <aside className="min-w-0 space-y-5">
      {!compact ? (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">About this post</p>
          <div className="mt-4 grid gap-3 text-sm font-bold text-slate-600">
            <p className="inline-flex items-center gap-2"><Tag className="h-4 w-4 text-[var(--slot4-accent)]" /> Task: {taskConfig?.label || task}</p>
            <p className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" /> Site: {SITE_CONFIG.name}</p>
            
          </div>
        </div>
      ) : null}
      {related.length ? (
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-black tracking-[-0.035em]">More like this</h2>
            <Link href={taskConfig?.route || '/'} className="text-xs font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">View all</Link>
          </div>
          <div className="mt-5 grid gap-3">
            {related.map((item) => <RelatedCard key={item.id || item.slug} task={task} post={item} />)}
          </div>
        </div>
      ) : null}
    </aside>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getImages(post)[0]
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded-2xl p-2 transition hover:bg-slate-50">
      {image && task !== 'sbm' ? <img src={image} alt="" className="h-20 w-20 shrink-0 rounded-xl object-cover" /> : <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white"><FileText className="h-6 w-6" /></div>}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-black leading-tight tracking-[-0.02em] group-hover:text-[var(--slot4-accent)]">{titleOf(post)}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{summaryText(post) || 'Open the full post for details.'}</p>
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-12 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-2 text-lg font-black"><MessageCircle className="h-5 w-5 text-[var(--slot4-accent)]" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-2xl bg-white p-4">
            <p className="text-sm font-black">{comment.name}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm font-medium text-slate-500">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}
