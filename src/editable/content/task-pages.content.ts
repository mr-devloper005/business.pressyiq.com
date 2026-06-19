import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  mediaDistribution: {
    eyebrow: 'Distribution desk',
    headline: 'Press releases, announcements, and media updates built for wider public reach.',
    description: 'Browse distribution-ready releases, company news, campaign updates, and media visibility posts across categories managed from the master panel.',
    filterLabel: 'Choose distribution category',
    secondaryNote: 'Every category received from the master panel is supported automatically.',
    chips: ['Press releases', 'Media exposure', 'Brand visibility'],
  },
  article: {
    eyebrow: 'Insights desk',
    headline: 'Guides, explainers, and articles for stronger media visibility.',
    description: 'Use this section for educational content about announcements, public relations, distribution planning, and reputation-building campaigns.',
    filterLabel: 'Choose insight topic',
    secondaryNote: 'Article pages help explain distribution strategy, media planning, and publishing best practices.',
    chips: ['PR insights', 'Visibility guides', 'Announcement strategy'],
  },
  classified: {
    eyebrow: 'Opportunity board',
    headline: 'Short-form notices, offers, and campaign opportunities.',
    description: 'Classified-style posts help visitors scan practical offers, time-sensitive updates, publishing options, and distribution-related notices.',
    filterLabel: 'Filter opportunity category',
    secondaryNote: 'Prioritize urgency, clear details, and direct action paths.',
    chips: ['Offers', 'Notices', 'Quick action'],
  },
  sbm: {
    eyebrow: 'Resource shelf',
    headline: 'Curated links and resources for media distribution workflows.',
    description: 'Bookmark pages can collect tools, references, reports, publisher resources, and useful links for planning public announcements.',
    filterLabel: 'Filter resource category',
    secondaryNote: 'Curated resources should be easy to scan and return to later.',
    chips: ['Resources', 'Tools', 'References'],
  },
  profile: {
    eyebrow: 'Reputation profiles',
    headline: 'Profiles that support identity, credibility, and public visibility.',
    description: 'Profile pages make people, brands, agencies, and entities easier to discover alongside media updates and public releases.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Identity, role, and credibility cues should appear before the grid begins.',
    chips: ['Identity', 'Credibility', 'Brand presence'],
  },
  pdf: {
    eyebrow: 'Report library',
    headline: 'Documents, sample reports, and media distribution resources.',
    description: 'PDF pages can present sample reports, guides, campaign documents, release briefs, and downloadable media resources.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document surfaces need file context, download intent, and clear archive cues.',
    chips: ['Reports', 'Guides', 'Downloads'],
  },
  listing: {
    eyebrow: 'Publisher directory',
    headline: 'Business and publisher listings for discovery and comparison.',
    description: 'Listing pages support directories of companies, publishers, agencies, locations, and services connected to media visibility.',
    filterLabel: 'Filter listing category',
    secondaryNote: 'Prioritize comparison, trust cues, location, and direct action paths.',
    chips: ['Directory', 'Publishers', 'Services'],
  },
  image: {
    eyebrow: 'Visual coverage',
    headline: 'Image-led media posts, campaign visuals, and brand assets.',
    description: 'Image pages lead with visual impact for campaigns, launches, announcements, event coverage, and public brand moments.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Let visuals communicate momentum before long supporting text.',
    chips: ['Campaign visuals', 'Launch assets', 'Coverage'],
  },
} satisfies Record<TaskKey, TaskPageVoice>
