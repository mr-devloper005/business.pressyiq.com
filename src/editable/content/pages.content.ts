import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Press release distribution and media visibility',
      description: 'Distribute press releases, increase media exposure, improve brand visibility, and reach wider audiences through a clean media distribution experience.',
      openGraphTitle: 'Press release distribution and media visibility',
      openGraphDescription: 'Launch announcements, browse media updates, and explore public releases through a polished distribution-focused website.',
      keywords: ['press release distribution', 'media distribution', 'media exposure', 'brand visibility', 'online reputation', 'public announcements'],
    },
    hero: {
      badge: 'Press release distribution without the agency markup',
      title: ['Better coverage,', 'half the price.'],
      description: 'Distribute announcements to more outlets, increase visibility, and keep every release organized with simple reporting and support.',
      primaryCta: { label: 'Start free distribution', href: '/signup' },
      secondaryCta: { label: 'View pricing', href: '/media-distribution#pricing' },
      searchPlaceholder: 'Search releases, companies, outlets, and categories',
      focusLabel: 'Distribution focus',
      featureCardBadge: 'latest release rotation',
      featureCardTitle: 'Recent media updates keep the homepage active and relevant.',
      featureCardDescription: 'The newest posts, visuals, and public updates power the homepage while preserving all existing publishing behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for announcements that need reach, clarity, and momentum.',
      paragraphs: [
        'The site is organized around media distribution: press releases, company announcements, launch updates, public notices, and visibility-focused stories.',
        'Visitors can browse releases by category, discover related updates, and move from a headline to a full detail page without losing context.',
        'The experience keeps publishing practical: clear calls to action, searchable content, safe fallbacks for missing fields, and layouts that support text, images, listings, and documents.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Press release and media distribution messaging across the site.',
        'Category-led discovery for business, technology, finance, health, real estate, and more.',
        'Support for release summaries, images, documents, business listings, and related updates.',
        'Clear conversion paths for starting distribution or contacting support.',
      ],
      primaryLink: { label: 'Browse releases', href: '/media-distribution' },
      secondaryLink: { label: 'Contact support', href: '/contact' },
    },
    cta: {
      badge: 'Start distribution',
      title: 'Launch a release, build visibility, and keep the story moving.',
      description: 'Use the site to publish announcements, surface recent media updates, and guide visitors toward the right distribution path.',
      primaryCta: { label: 'Start Distribution', href: '/signup' },
      secondaryCta: { label: 'Contact Support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest media distribution posts in this section.',
    },
  },
  about: {
    badge: 'About',
    title: 'A clearer way to publish announcements and reach wider audiences.',
    description: `${slot4BrandConfig.siteName} presents press releases, media updates, and visibility-focused content in a format that is easy to browse, search, and share.`,
    paragraphs: [
      'The site is designed for users who want to distribute press releases, gain media exposure, improve online reputation, and make announcements easier to discover.',
      'Every page keeps the same practical rhythm: clear context, category-led browsing, readable detail pages, and direct paths to start or request support.',
    ],
    values: [
      {
        title: 'Distribution-first structure',
        description: 'Content is organized around release visibility, public updates, outlet-style discovery, and campaign momentum.',
      },
      {
        title: 'Readable public pages',
        description: 'Announcements, summaries, images, and details are presented in clean layouts that work even when optional fields are missing.',
      },
      {
        title: 'Support for visibility goals',
        description: 'The experience guides users toward publishing, reporting, category discovery, and broader media exposure.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Get help with distribution, publishing, or release details.',
    description: 'Tell us what you want to announce, which audience you want to reach, and whether you need help with formatting, timing, category selection, or reporting.',
    formTitle: 'Distribution request',
  },

  search: {
    metadata: {
      title: 'Search media updates',
      description: 'Search press releases, media distribution posts, business announcements, topics, and categories across the site.',
    },
    hero: {
      badge: 'Search the distribution archive',
      title: 'Find releases, companies, topics, and media updates faster.',
      description: 'Use keywords, categories, and content types to discover announcements and related public updates from every active section.',
      placeholder: 'Search by release, company, topic, category, or title',
    },
    resultsTitle: 'Latest searchable media updates',
  },
  create: {
    metadata: {
      title: 'Create a release',
      description: 'Create and submit press releases, company announcements, and media distribution posts.',
    },
    locked: {
      badge: 'Publisher access',
      title: 'Login to create a new release.',
      description: 'Use your account to open the publishing workspace and prepare a release, announcement, listing, document, or media update.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create distribution-ready content for the active site sections.',
      description: 'Choose the content type, add release details, include images or links, and prepare a clean post for public discovery.',
    },
    formTitle: 'Release details',
    submitLabel: 'Submit release',
    successTitle: 'Release submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for media distribution access.',
      badge: 'Publisher access',
      title: 'Welcome back to your distribution workspace.',
      description: 'Login to continue browsing, managing submissions, and creating public media updates from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for media distribution access.',
      badge: 'Start distribution',
      title: 'Create your account and prepare your first release.',
      description: 'Create an account to access the publishing workspace, save details, and submit media distribution content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related media updates',
      fallbackTitle: 'Media update details',
    },
    listing: {
      relatedTitle: 'Related business listings',
      fallbackTitle: 'Business listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Visual update details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile and reputation details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
