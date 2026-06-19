export type EditableCategory = { name: string; slug: string }

export const mediaDistributionCategories = {
  allowAnyCategoryFromMasterPanel: true,
  defaults: [
    { name: 'Press Release', slug: 'press-release' },
    { name: 'Media Coverage', slug: 'media-coverage' },
    { name: 'Brand Visibility', slug: 'brand-visibility' },
    { name: 'Business News', slug: 'business-news' },
    { name: 'Company Announcement', slug: 'company-announcement' },
    { name: 'Product Launch', slug: 'product-launch' },
    { name: 'Startup News', slug: 'startup-news' },
    { name: 'Technology', slug: 'technology' },
    { name: 'Finance', slug: 'finance' },
    { name: 'Health', slug: 'health' },
    { name: 'Real Estate', slug: 'real-estate' },
    { name: 'Entertainment', slug: 'entertainment' },
    { name: 'Lifestyle', slug: 'lifestyle' },
    { name: 'Travel', slug: 'travel' },
    { name: 'Education', slug: 'education' },
    { name: 'Reputation Management', slug: 'reputation-management' },
    { name: 'Agency White Label', slug: 'agency-white-label' },
    { name: 'Sample Reports', slug: 'sample-reports' },
  ] satisfies EditableCategory[],
} as const
