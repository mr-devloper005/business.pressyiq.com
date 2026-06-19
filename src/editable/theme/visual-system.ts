import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'distribution-cloud'
  | 'premium-wire'
  | 'publisher-index'
  | 'agency-portal'
  | 'tech-directory'
  | 'launch-bulletin'
  | 'visual-coverage'

export const visualPresets = {
  'distribution-cloud': {
    label: 'Distribution Cloud',
    mood: 'clean, confident, conversion-focused',
    fontDirection: 'bold modern sans headlines with readable product copy',
    colors: {
      background: '#ffffff',
      foreground: '#171c2a',
      muted: '#526071',
      primary: '#2b7db7',
      accent: '#8b2eea',
      surface: '#ffffff',
    },
    shape: 'floating white navigation, rounded cards, blue accents, soft radial glow',
  },
  'premium-wire': {
    label: 'Premium Wire',
    mood: 'polished, high-trust, media-ready',
    fontDirection: 'large confident headings with compact proof labels',
    colors: {
      background: '#f8fbff',
      foreground: '#101827',
      muted: '#667085',
      primary: '#2b7db7',
      accent: '#0ea5e9',
      surface: '#ffffff',
    },
    shape: 'premium pricing panels, proof rails, partner strips, and report cards',
  },
  'publisher-index': {
    label: 'Publisher Index',
    mood: 'organized, practical, searchable',
    fontDirection: 'modern sans with crisp category and data labels',
    colors: {
      background: '#f6f9fc',
      foreground: '#101827',
      muted: '#5f6b7a',
      primary: '#0f172a',
      accent: '#2b7db7',
      surface: '#ffffff',
    },
    shape: 'directory grids, pill filters, publisher cards, and clear action paths',
  },
  'agency-portal': {
    label: 'Agency Portal',
    mood: 'white-label, efficient, professional',
    fontDirection: 'strong sans headings with clean operational body copy',
    colors: {
      background: '#ffffff',
      foreground: '#172131',
      muted: '#667085',
      primary: '#2b7db7',
      accent: '#12b981',
      surface: '#f8fbff',
    },
    shape: 'reseller chips, workflow cards, rounded inputs, and report-ready sections',
  },
  'tech-directory': {
    label: 'Tech Directory',
    mood: 'fast, useful, data-led',
    fontDirection: 'modern sans with compact metadata accents',
    colors: {
      background: '#f6f9fc',
      foreground: '#101827',
      muted: '#5f6b7a',
      primary: '#0f172a',
      accent: '#2b7db7',
      surface: '#ffffff',
    },
    shape: 'clean grids, pill filters, card stacks, and fast browsing hierarchy',
  },
  'launch-bulletin': {
    label: 'Launch Bulletin',
    mood: 'active, bright, announcement-ready',
    fontDirection: 'bold product headings with friendly support copy',
    colors: {
      background: '#ffffff',
      foreground: '#172131',
      muted: '#667085',
      primary: '#2b7db7',
      accent: '#f97316',
      surface: '#f8fbff',
    },
    shape: 'announcement modules, launch stats, call-to-action blocks, and release cards',
  },
  'visual-coverage': {
    label: 'Visual Coverage',
    mood: 'image-led, campaign-focused, shareable',
    fontDirection: 'minimal sans with strong visual captions',
    colors: {
      background: '#07101f',
      foreground: '#f8fbff',
      muted: '#a9b6c8',
      primary: '#2b7db7',
      accent: '#8b2eea',
      surface: '#101b2d',
    },
    shape: 'large media, campaign visuals, rounded overlays, and coverage galleries',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset:
    slot4BrandConfig.productKind === 'visual'
      ? 'visual-coverage'
      : slot4BrandConfig.productKind === 'editorial'
        ? 'distribution-cloud'
        : slot4BrandConfig.productKind === 'directory'
          ? 'publisher-index'
          : 'distribution-cloud',
  radius: {
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-85',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-xs font-black uppercase tracking-[0.16em]',
    heroTitle: 'text-5xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'text-3xl font-black tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-xs font-bold uppercase tracking-[0.14em]',
  },
  surfaces: {
    glass: 'border border-white/20 bg-white/70 backdrop-blur-xl',
    paper: 'rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_20px_56px_rgba(24,42,64,0.1)]',
    quiet: 'rounded-[1.5rem] border border-slate-200 bg-slate-50',
    dark: 'rounded-[1.5rem] border border-white/10 bg-[var(--slot4-dark-bg)] shadow-[0_24px_70px_rgba(0,0,0,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-20 lg:py-24',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}
