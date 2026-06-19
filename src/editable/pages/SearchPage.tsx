import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt, getEditableTitle } from '@/editable/cards/PostCards'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => getEditableExcerpt(post, 170)

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const title = getEditableTitle(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Media update'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(24,42,64,.08)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(24,42,64,.14)] ${strong ? 'md:col-span-2' : ''}`}>
      {image ? (
        <div className={`relative overflow-hidden bg-slate-100 ${strong ? 'aspect-[16/7]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{taskLabel}</span>
        </div>
      ) : null}
      <div className="p-5 sm:p-6">
        {!image ? <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-[var(--slot4-accent)]">{taskLabel}</span> : null}
        <h2 className="mt-4 line-clamp-3 text-2xl font-black leading-tight tracking-[-0.035em] text-slate-950">{title}</h2>
        <p className="mt-4 line-clamp-3 text-sm font-medium leading-7 text-slate-600">{summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500 group-hover:text-[var(--slot4-accent)]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[linear-gradient(180deg,#fff_0%,#f7fbff_52%,#fff_100%)] text-slate-950">
        <section className="relative overflow-hidden border-b border-slate-100 py-14 sm:py-20">
          <div className="pointer-events-none absolute -left-28 top-12 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
          <div className="pointer-events-none absolute -right-28 top-40 h-96 w-96 rounded-full bg-purple-200/20 blur-3xl" />
          <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <p className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.08em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
            <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.96] tracking-[-0.055em] sm:text-7xl">{pagesContent.search.hero.title}</h1>
            <p className="mt-6 max-w-3xl text-xl font-semibold leading-9 text-slate-600">{pagesContent.search.hero.description}</p>
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <form action="/search" className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-[0_20px_56px_rgba(24,42,64,.1)] sm:p-7">
            <input type="hidden" name="master" value="1" />
            <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-slate-400" />
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <Filter className="h-4 w-4 text-slate-400" />
                <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-slate-400" />
              </label>
              <select name="task" defaultValue={task} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black outline-none">
                <option value="">All content types</option>
                {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
              <button className="inline-flex h-12 items-center justify-center rounded-xl bg-[var(--slot4-accent)] px-8 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(43,125,183,.22)] transition hover:bg-[#226897]" type="submit">Search</button>
            </div>
          </form>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">{results.length} results</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.04em]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/media-distribution" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.12em] text-slate-800 shadow-sm">Browse releases <ArrowRight className="h-4 w-4 text-[var(--slot4-accent)]" /></Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
              <p className="text-2xl font-black tracking-[-0.04em]">No matching media updates found.</p>
              <p className="mt-3 text-sm font-semibold text-slate-500">Try a different keyword, task type, or distribution category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
