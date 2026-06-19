import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#ffffff',
  '--slot4-page-text': '#171c2a',
  '--slot4-panel-bg': '#f7fbff',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#526071',
  '--slot4-soft-muted-text': '#8b96a7',
  '--slot4-accent': '#2b7db7',
  '--slot4-accent-fill': '#2b7db7',
  '--slot4-accent-2': '#8b2eea',
  '--slot4-accent-soft': '#e9f5ff',
  '--slot4-dark-bg': '#172131',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#edf4fb',
  '--slot4-cream': '#f8fbff',
  '--slot4-warm': '#ffffff',
  '--slot4-lavender': '#8b2eea',
  '--slot4-gray': '#eef4fa',
  '--slot4-body-gradient': 'radial-gradient(circle at 8% 18%, rgba(84,130,255,.13), transparent 24rem), radial-gradient(circle at 90% 34%, rgba(225,73,122,.12), transparent 25rem), linear-gradient(180deg,#fff 0%,#f9fcff 60%,#fff 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-slate-200',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_12px_32px_rgba(24,42,64,0.08)]',
  shadowStrong: 'shadow-[0_26px_80px_rgba(24,42,64,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.72))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[280px] shrink-0 snap-start sm:w-[330px]',
  },
  type: {
    eyebrow: 'text-[11px] font-extrabold uppercase tracking-[0.16em]',
    heroTitle: 'text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl lg:text-[6rem]',
    sectionTitle: 'text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[1.35rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[1.35rem] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[1.35rem] ${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--slot4-accent-fill)] px-7 py-4 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(43,125,183,.22)] transition hover:-translate-y-0.5 hover:bg-[#226897]',
    secondary: 'inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-extrabold text-[var(--slot4-accent)] shadow-[0_10px_24px_rgba(24,42,64,.08)] transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]',
    accent: 'inline-flex items-center justify-center gap-3 rounded-xl bg-[var(--slot4-accent-fill)] px-7 py-4 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(43,125,183,.22)] transition hover:-translate-y-0.5 hover:bg-[#226897]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.35rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(24,42,64,0.14)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use a clean PR distribution product style: floating white navigation, blue accents, broad white sections, dark pricing bands, and soft gradients.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays.',
  'Use postHref() for all post links so route aliases and task-specific detail pages remain functional.',
  'Render missing post images, summaries, and categories safely with fallbacks.',
  'Branding must remain dynamic from SITE_CONFIG; never hardcode a fake company team or newsroom claim.',
] as const
