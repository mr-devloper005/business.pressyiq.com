import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Press release distribution and media visibility',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Press release distribution, media exposure, and brand visibility',
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Login', href: '/login' },
      { label: 'Register', href: '/signup' },
    ],
    actions: {
      primary: { label: 'Register', href: '/signup' },
      secondary: { label: 'Login', href: '/login' },
    },
  },
  footer: {
    tagline: 'Better distribution, clearer reach',
    description: 'A media distribution platform for press releases, company announcements, public updates, campaign visibility, and reputation-building content.',
    columns: [
      {
        title: 'Site Links',
        links: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        title: 'Account',
        links: [
          { label: 'Logout', href: '/' },
        ],
      },
    ],
    bottomNote: 'Built for fast release workflows, wider media reach, and easy reporting.',
  },
  commonLabels: {
    readMore: 'Read update',
    viewAll: 'View all updates',
    explore: 'Explore distribution',
    latest: 'Latest releases',
    related: 'Related updates',
    published: 'Published',
  },
} as const
